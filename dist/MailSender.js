"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailSender {
    constructor() {
        this._transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        this.sendEmail = this.sendEmail.bind(this);
    }
    sendEmail(targetEmail, content) {
        const message = {
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
exports.default = MailSender;
