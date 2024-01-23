import { Mongo } from "@/mongo/mongo";
import { Email } from "./email.model";

export class EmailRepository {
  create = (email: Email) => Mongo.mails().insertOne(email);
}
