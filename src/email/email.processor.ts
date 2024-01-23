import { MailGateway } from "@/utils/mailer/gateway";
import { Attachment } from "./email.model";
import { Mailer } from "../utils/mailer/mailer";

export class EmailProcessor {
  private _sender: string;
  private _gateway: MailGateway;

  constructor(sender: string, gateway: MailGateway) {
    this._sender = sender;
    this._gateway = gateway;
  }

  //TODO: getters for dif mailers
  private static getBasicMailer(): Mailer {
    return new Mailer(__dirname + "/mailers/main.ejs");
  }

  async sendMail(
    receivers: string[],
    attachment?: Attachment
  ) {
    const mailer = EmailProcessor.getBasicMailer();
    const html = await mailer.toHtmlString(undefined, {
      receivers,
      templatePath: mailer.path,
      ...mailer.attachmentsObject,
    });

    const attachments = [...mailer.attachments];
    if (attachment)
      attachments.push({
        filename: attachment.fileName,
        content: attachment.content,
      });

    const subject = "an email subject";

    await this._gateway.sendMail(
      this._sender,
      receivers.join(", "),
      subject,
      html,
      attachments
    );
  }
}
