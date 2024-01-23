import { Email, MailingListType } from "./email.model";
import { EmailProcessor } from "./email.processor";
import { EmailRepository } from "./email.repository";

export class EmailService {
  private _processor: EmailProcessor;
  private _repository: EmailRepository;

  constructor(processor: EmailProcessor, repository: EmailRepository) {
    this._processor = processor;
    this._repository = repository;
  }

  sendEmail = async (receiver: string) => {
    const newEmail: Email = {
      mailingListType: MailingListType.GENERAL,
      createdAt: new Date(),
      isSent: false,
    };

    try {
      await this._processor.sendMail([receiver]);
      newEmail.isSent = true;
      await this._repository.create(newEmail);
    } catch (error) {
        console.log("error sending email", error);
    }
  };
}
