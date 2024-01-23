import config from "./config";
import { Controller } from "./controller";
import { EmailProcessor } from "./email/email.processor";
import { EmailRepository } from "./email/email.repository";
import { EmailService } from "./email/email.service";
import { HealthController } from "./health/health.controller";
import { MailingListController } from "./mailing-list/mailing.list.controller";
import { MailingListRepository } from "./mailing-list/mailing.list.repository";
import { MailingListService } from "./mailing-list/mailing.list.service";
import { MailGateway } from "./utils/mailer/gateway";


//Repositories: 
const mailingListRepository = new MailingListRepository();
const emailRepository = new EmailRepository();

//Services:
const emailService = new EmailService(new EmailProcessor(config.MAIL_SENDER, new MailGateway()), emailRepository)
const mailingListService = new MailingListService(mailingListRepository, emailService);

//Controllers:
const mailingListController = new MailingListController(mailingListService);
const healthController = new HealthController();

export const UnprotectedControllers = [
    mailingListController,
    healthController,
].map((c: Controller) => c.router);