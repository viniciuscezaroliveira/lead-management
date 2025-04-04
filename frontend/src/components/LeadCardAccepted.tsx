"use client"

import { LeadEntity } from '@/models/lead-entity';
import { format } from 'date-fns';


export default function LeadCardAccepted({
    id,
    contactFirstName,
    suburb,
    contactEmail,
    
    price,
    dateCreated,
    contactPhoneNumber,
    category,
    contactLastName,

}: LeadEntity) {
    const formattedDate = format(new Date(dateCreated), 'MMM d @ h:mm aaa');
    const initial = contactFirstName[0].toUpperCase();

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white text-xl font-semibold">
                    {initial}
                </div>

                
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800"> {contactLastName} {contactFirstName} </h3>
                            <p className="text-gray-500 text-sm">{formattedDate}</p>
                        </div>
                    </div>

                    
                    <div className="mt-4 flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{suburb}</span>
                        </div>
                        <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2zm4 4V4h-4v2h4zM4 10v10h16V10H4z"/>
                        </svg>  

                            <span>{category}</span>
                            
                        </div>
                        <div className="flex items-center gap-1">
                            <span>Job ID: {id}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>${price.toFixed(2)} Lead Invitation</span>
                        </div>
                    </div>

                    
                    <div className='flex items-center gap-4 mt-4'>
                        <div className='flex items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.3 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1v3.6a1 1 0 0 1-1 1A18 18 0 0 1 2 5a1 1 0 0 1 1-1h3.6a1 1 0 0 1 1 1c0 1.2.2 2.4.6 3.6a1 1 0 0 1-.3 1L6.6 10.8z"/>
                        </svg>
                        <p className="text-orange-500">{contactPhoneNumber}</p>
                        </div>

                        <div className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 4v10h16V8l-8 5-8-5zm8 3 8-5H4l8 5z"/>
                        </svg>

                        <p className="text-orange-500">{contactEmail}</p>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-4">
                    <span className='text-gray-500 text-md'>There is a two storey building at the front of the main house thats about 10x5 that would like to convert into self contained living area.</span>

                    </div>
                </div>
            </div>
        </div>
    );
} 