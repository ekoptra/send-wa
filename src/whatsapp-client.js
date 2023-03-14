import qrcode from 'qrcode-terminal';
import whatsappWeb from 'whatsapp-web.js';
import { loggerTerimaPesan } from './logger.js';

const { Client, LocalAuth } = whatsappWeb;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
    }
});

client.on('qr', qr => qrcode.generate(qr, { small: true }))

client.on('message', message => {
    loggerTerimaPesan.info(JSON.stringify({
        message: "Menerima pesan",
        from: message.from,
        message_body: message.body
    }));

    message.reply('Akun ini di manage oleh boot!');

});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

export default client;