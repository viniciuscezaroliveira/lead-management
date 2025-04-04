"use client"

import { useState, useEffect } from 'react';
import LeadCardInvited from './LeadCardInveted';
import LeadCardAccepted from './LeadCardAccepted';
import { LeadStatus, LeadEntity } from '@/models/lead-entity';
import { LeadGateway } from '@/infrastructure/gateways/lead';
import { LeadAdd } from './LeadAdd';
import { Modal } from './Modal';

export default function LeadList() {
    const [activeTab, setActiveTab] = useState<LeadStatus>(LeadStatus.Invited);
    const [leads, setLeads] = useState<LeadEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchLeads();
    }, [activeTab]);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const leadGateway = new LeadGateway();
            const leads = await leadGateway.getLeads(activeTab);
            setLeads(leads as unknown as LeadEntity[]);
        } catch (error) {
            console.error('Error fetching leads:', error);
            setLeads([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (id: number) => {
        try {
            const leadGateway = new LeadGateway();
            await leadGateway.updateLeadStatus(LeadStatus.Accepted, id);
            fetchLeads();
        } catch (error) {
            console.error('Error accepting lead:', error);
        }
    };

    const handleDecline = async (id: number) => {
        try {
            const leadGateway = new LeadGateway();
            await leadGateway.updateLeadStatus(LeadStatus.Declined, id);
            fetchLeads();
        } catch (error) {
            console.error('Error accepting lead:', error);
        }
    };

    const tabs = [
        { key: LeadStatus.Invited, label: 'Invited' },
        { key: LeadStatus.Accepted, label: 'Accepted' }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex border-b">
                    {tabs.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`px-6 py-3 text-lg cursor-pointer font-medium transition-colors relative ${
                                activeTab === key
                                    ? 'text-gray-900'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {label}
                            {activeTab === key && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                            )}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    Add New Lead
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
                </div>
            ) : leads.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No leads found in this category
                </div>
            ) : (
                <div className="space-y-4">
                    {leads.map((lead) => (
                        activeTab === LeadStatus.Invited ? (
                            <LeadCardInvited
                                key={lead.id}
                                {...lead}
                                onAccept={handleAccept}
                                onDecline={handleDecline}
                            />
                        ) : (
                            <LeadCardAccepted
                                key={lead.id}
                                {...lead}
                            />
                        )
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Lead"
            >
                <LeadAdd onSuccess={() => {
                    setIsModalOpen(false);
                    fetchLeads();
                }} />
            </Modal>
        </div>
    );
} 