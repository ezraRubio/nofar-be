import { IsoDateTime } from "../types";

export interface MailingListEntry {
    name: string;
    lastName: string;
    email: string;
    phone?: string;
    createdAt: IsoDateTime;
}