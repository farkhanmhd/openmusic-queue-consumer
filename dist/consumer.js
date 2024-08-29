"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const amqplib_1 = __importDefault(require("amqplib"));
const PlaylistsService_1 = __importDefault(require("./PlaylistsService"));
const MailSender_1 = __importDefault(require("./MailSender"));
const listener_1 = __importDefault(require("./listener"));
dotenv_1.default.config();
const init = async () => {
    const playlistsService = new PlaylistsService_1.default();
    const mailSender = new MailSender_1.default();
    const listener = new listener_1.default(playlistsService, mailSender);
    const connection = await amqplib_1.default.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue('export:playlists', { durable: true });
    channel.consume('export:playlists', listener.listen, { noAck: true });
    console.log('Consumer has been started');
};
init();
