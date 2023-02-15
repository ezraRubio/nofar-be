import { Router, Request, Response } from "express";
import { Controller } from "../controller";
import { MailingListEntry } from "./mailing.list.model";
import { mailingListEntryValidator } from "./mailing.list.request.validator";
import { MailingListService } from "./mailing.list.service";

const mailingList = "/mailing-list";

export class MailingListController implements Controller {
  router = Router();

  constructor(private service: MailingListService) {
    this.router.post(mailingList, mailingListEntryValidator, (req: Request, res: Response) =>
      this.addNewEntry(req.body).then((r) => res.json(r))
    );
  }

  async addNewEntry(data: MailingListEntry) {
    const res = await this.service.addNewEntry(data);
    return res;
  }
}