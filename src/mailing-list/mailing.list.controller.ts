import { Router, Request, Response } from "express";
import { MailingListEntry } from "./mailing.list.model";
import { mailingListEntryValidator } from "./mailing.list.request.validator";
import { MailingListService } from "./mailing.list.service";

const mailingList = "/mailing-list";

export class MailingListController{
  router = Router();

  constructor(private service: MailingListService) {
    this.router.post(mailingList, mailingListEntryValidator, (req: Request, res: Response) =>
      this.addNewEntry(req.body).then((r) => res.json(r))
    );
  }

  addNewEntry(data: MailingListEntry) {
      return this.service.addNewEntry(data);
  }
}
