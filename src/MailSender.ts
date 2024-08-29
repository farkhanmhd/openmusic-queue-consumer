import nodemailer from 'nodemailer';

export default class MailSender {
  private _transporter: nodemailer.Transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail(targetEmail: string, content: string) {
    const message: nodemailer.SendMailOptions = {
      from: 'Openmusic API',
      to: targetEmail,
      subject: 'Export Openmusic Playlist',
      text: 'Terlampir playlist dari Openmusic',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}
