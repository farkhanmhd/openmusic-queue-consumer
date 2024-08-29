import dotenv from 'dotenv';
import amqp from 'amqplib';
import PlaylistsService from './PlaylistsService';
import MailSender from './MailSender';
import Listener from './listener';

dotenv.config();

const init = async () => {
  const playlistsService = new PlaylistsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER as string);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', { durable: true });

  channel.consume('export:playlists', listener.listen, { noAck: true });

  console.log('Consumer has been started');
};

init();
