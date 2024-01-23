import { ObjectId } from "mongodb";

export interface Attachment {
    fileName: string;
    content: string;
}

export interface Email {
    _id?: ObjectId;
    // userId?: string;
    email?: string;
    mailingListType: MailingListType;
    createdAt: Date;
    // additionalData: unknown;
    isSent: boolean;
    // userType: UserTypes
}

export enum MailingListType {
    GENERAl = "general",
    WEBINAR = "webinar",
    CLIENT = "client",
}