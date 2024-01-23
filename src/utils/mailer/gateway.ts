import nodemailer from "nodemailer";

export class MailGateway {
  private _transporter: nodemailer.Transporter;

  constructor(transporter: unknown) {
    this._transporter = nodemailer.createTransport(transporter);
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
