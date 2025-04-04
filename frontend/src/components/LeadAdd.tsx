"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {  LeadStatus } from '@/models/lead-entity';
import { LeadGateway } from '@/infrastructure/gateways/lead';

const leadSchema = z.object({
    contactFirstName: z.string().min(1, 'First name is required'),
    contactLastName: z.string().min(1, 'Last name is required'),
    contactPhoneNumber: z.string().min(1, 'Phone number is required'),
    contactEmail: z.string().email('Invalid email address'),
    suburb: z.string().min(1, 'Suburb is required'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().min(0, 'Price must be positive')
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadAddProps {
    onSuccess?: () => void;
}

export function LeadAdd({ onSuccess }: LeadAddProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<LeadFormData>({
        resolver: zodResolver(leadSchema)
    });

    const onSubmit = async (data: LeadFormData) => {
        try {
            const leadGateway = new LeadGateway();
            await leadGateway.createLead({
                ...data,
                status: LeadStatus.Invited,
                id: 0,
                dateCreated: new Date().toISOString(),
                dateUpdated: new Date().toISOString()
            });
            reset();
            onSuccess?.();
        } catch (error) {
            console.error('Error creating lead:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg text-orange-500 text-gray-800">
            <h2 className="text-2xl font-semibold mb-6">Add New Lead</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            {...register('contactFirstName')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        />
                        {errors.contactFirstName && (
                            <p className="mt-1 text-sm text-red-600">{errors.contactFirstName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            {...register('contactLastName')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        />
                        {errors.contactLastName && (
                            <p className="mt-1 text-sm text-red-600">{errors.contactLastName.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            {...register('contactPhoneNumber')}
                            type="tel"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        />
                        {errors.contactPhoneNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.contactPhoneNumber.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            {...register('contactEmail')}
                            type="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        />
                        {errors.contactEmail && (
                            <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Suburb</label>
                    <input
                        {...register('suburb')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                    {errors.suburb && (
                        <p className="mt-1 text-sm text-red-600">{errors.suburb.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        {...register('category')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                    {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        {...register('description')}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        {...register('price', { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                    {errors.price && (
                        <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 cursor-pointer bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Lead'}
                    </button>
                </div>
            </form>
        </div>
    );
}