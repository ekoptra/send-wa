import { loggerKirimPesan, createCustomLoggerFile } from './logger.js';
import client from './whatsapp-client.js';
import { excelRead } from './read-excel.js';

export const sendMessage = async (number, message, customLogger = null) => {
    const id = `${number}@c.us`;
    const isRegister = await client.isRegisteredUser(id)

    try {
        if (isRegister) {
            await client.sendMessage(id, message);

            const log = JSON.stringify({
                message: "Pesan terkirim",
                to: id,
                message_body: message,
            });

            loggerKirimPesan.info(log);
            if (customLogger) customLogger.info(log)
        }
        else {
            const log = JSON.stringify({
                message: "Pesan gagal terkirim",
                to: id,
                message_body: message,
                reason: "nomor tidak terdaftar"
            })

            loggerKirimPesan.error(log);
            if (customLogger) customLogger.error(log)
        }
    } catch (e) {
        const log = JSON.stringify({
            message: "Pesan gagal terkirim",
            to: id,
            message_body: message,
            reason: e.message
        });

        loggerKirimPesan.error(log);
        if (customLogger) customLogger.error(log);
    }
}

const getRandomNumber = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

export const sendMessageByExcel = async (pathFile, template, waNumberColumnName = "no_wa", log = true) => {
    const fileName = pathFile.split("/").pop().split(".")[0]

    const logger = createCustomLoggerFile(`./logger/${fileName}-${Date.now()}.log`);

    const data = await excelRead(pathFile);

    for (let i = 0; i < data.length; i++) {
        const row = data[i];

        const message = template(row);
        sendMessage(row[waNumberColumnName], message, logger);

        const random = getRandomNumber(12000, 20000);
        await sleep(random);
    }
}
