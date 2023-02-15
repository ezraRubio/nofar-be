import { Filter, InsertOneOptions, InsertOneResult } from "mongodb";
import { ListEntry } from "../types";
import { Mongo } from "../mongo/mongo";

export class MailingListRepository {
  exists = (filter: Filter<ListEntry>): Promise<boolean> =>
    Mongo.mailingList()
      .countDocuments({ email: filter.email })
      .then((count) => count > 0)

  createListEntry = (newEntry: ListEntry): Promise<boolean> =>
    Mongo.mailingList()
      .insertOne(newEntry)
      .then((result) => result.acknowledged);
}
