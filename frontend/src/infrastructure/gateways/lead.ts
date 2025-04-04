import { LeadEntity, LeadStatus } from "@/models/lead-entity";
import { IApi } from "../interfaces/i-api";
import { api } from "../config/api";


export class LeadGateway {
    private readonly api: IApi;

    constructor() {
        this.api = api;
    }

    async getLeads(status: LeadStatus): Promise<LeadEntity[]> {
        const leads = await this.api.get<LeadEntity[]>(`/lead?status=${status}`);
        return leads;
    }

    async updateLeadStatus(status: LeadStatus, id: number): Promise<void> {
        await this.api.put<{[key: string]: LeadStatus}>(`/lead/${id}/status`, { status });
    }

    async updateLead(lead: LeadEntity): Promise<void> {
         await this.api.put<LeadEntity>(`/lead/${lead.id}`, lead);
    }

    async createLead(lead: LeadEntity): Promise<{id: number}> {
        const createdLead = await this.api.post<LeadEntity>('/lead', lead);
        return { id: Number(createdLead as unknown as string) };
    }
}