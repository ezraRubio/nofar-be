import { ListEntry } from "../types";
import { MailingListEntry } from "./mailing.list.model";
import { MailingListRepository } from "./mailing.list.repository";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { v5 as uuid } from 'uuid';

dayjs.extend(utc);

export class MailingListService { 
    constructor (private mailingListRepository: MailingListRepository){}

    addNewEntry = async (entry:MailingListEntry): Promise<ListEntry> => {
        const exists = await this.mailingListRepository.exists({ email:entry.email });

        if (!exists) throw new Error;

        const newEntry: ListEntry = {
            ...entry,
            createdAt: dayjs.utc().toISOString(),
            internalId: uuid(),
        }

        const wasAcknowledged = await this.mailingListRepository.createListEntry(newEntry);

        return wasAcknowledged && newEntry;
    }
}