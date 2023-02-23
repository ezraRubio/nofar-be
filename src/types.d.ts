/**
 * Date
 * @format YYYY-MM-DDTHH-MM-SS.000Z
 * @isDateTime
 */
 export type IsoDateTime = string;

 export interface ListEntry {
    name: string;
    lastName: string;
    email: string;
    phone?: string;
    createdAt: IsoDateTime;
    internalId: string;
 }