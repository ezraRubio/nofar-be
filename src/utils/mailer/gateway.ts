import config from "../../config";
import nodemailer from "nodemailer";

export class MailGateway {
  private _transporter: nodemailer.Transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      service: config.SERVICE,
      auth: {
        user: config.USER,
        pass: config.PASS,
      }
    });
  }

  async sendMail(
    from: string,
    to: string,
    subject: string,
    html: string,
    attachments: { [key: string]: string }[],
    bcc?: string,
    replyTo?: string
  ) {
    try {
      await this._transporter.sendMail({
        from,
        to,
        bcc,
        subject,
        replyTo,
        html,
        attachments: attachments,
      });
    } catch (error) {
        //make better error handling
        console.log("error sending mail", error)
    }
  }
}
