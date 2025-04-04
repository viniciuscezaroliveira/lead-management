"use client"

import { format } from 'date-fns';

interface LeadCardProps {
    id: number;
    contactFirstName: string;
    suburb: string;
    category: string;
    description: string;
    price: number;
    dateCreated: string;
    onAccept: (id: number) => void;
    onDecline: (id: number) => void;
}

export default function LeadCardInvited({
    id,
    contactFirstName,
    suburb,
    category,
    description,
    price,
    dateCreated,
    onAccept,
    onDecline
}: LeadCardProps) {
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
                            <h3 className="text-lg font-semibold text-gray-800">{contactFirstName}</h3>
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
                    </div>

                    
                    <p className="mt-4 text-gray-700">{description}</p>

                    
                    <div className="mt-4 flex items-center gap-4">
                        <button
                            onClick={() => onAccept(id)}
                            className="cursor-pointer px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => onDecline(id)}
                            className="cursor-pointer px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Decline
                        </button>
                        <div className="ml-10">
                            <span className="text-lg font-semibold text-gray-800">${price.toFixed(2)}</span>
                            <span className="text-gray-500 ml-2">Lead Invitation</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 