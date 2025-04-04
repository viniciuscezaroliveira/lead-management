

export interface LeadEntity {
    id: number;
    contactFirstName: string;
    contactLastName: string;
    contactPhoneNumber: string;
    contactEmail: string;
    suburb: string;
    category: string;
    description: string;
    price: number;
    status: LeadStatus;
    dateCreated: string;
    dateUpdated: string;
}

export enum LeadStatus {
    Invited = 0,
    Accepted = 1,
    Declined = 2
}


