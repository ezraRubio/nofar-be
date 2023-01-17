import express, { Router, Request, Response } from "express";
import { Controller } from "../controller";
import { MailingListEntry } from "./mailing.list.model";
import { MailingListService } from "./mailing.list.service";

const mailingList = "/mailing-list";

export class MailingListController implements Controller {
    router = Router();

    constructor(private service: MailingListService) {
        this.router.post(mailingList, (req: Request, res: Response)=>{})//this.addNewEntry().then()
    }

    addNewEntry(data: MailingListEntry){
        //return from service 
    }
}