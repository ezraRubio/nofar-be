import { ListEntry } from "../types";
import { MailingListEntry } from "./mailing.list.model";
import { MailingListRepository } from "./mailing.list.repository";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { v4 as uuid } from "uuid";
import { DuplicateEntryError } from "../error/error.module";

dayjs.extend(utc);

export class MailingListService {
  constructor(private mailingListRepository: MailingListRepository) {}

  addNewEntry = async (entry: MailingListEntry): Promise<ListEntry> => {
    const exists = await this.mailingListRepository.exists({
      email: entry.email,
    });

    if (exists) throw new DuplicateEntryError();

    const newEntry: ListEntry = {
      ...entry,
      createdAt: dayjs.utc().toISOString(),
      internalId: uuid(),
    };

    const wasAcknowledged = await this.mailingListRepository.createListEntry(
      newEntry
    );

    return wasAcknowledged && newEntry;
  };
}
