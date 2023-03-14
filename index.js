import client from './src/whatsapp-client.js';
import { sendMessage, sendMessageByExcel } from './src/helpers.js';

const templateMessage = (data) => {
    // data.nama_bank means that there is a column named "nama_bank" in the excel file
    return `Kepada Yth.
Bapak/Ibu *${data.nama}*
di tempat

Berikut disampaikan bahwa biaya *${data.transaksi}* sudah ditransfer pada hari ${data.hari} tanggal ${data.tanggal} dengan besaran sebagai berikut:
Jumlah ditransfer: ${data.jumlah}
Nama Bank: ${data.nama_bank}
Nomor Rekening: ${data.no_rekening}

Dimohon Bapak/Ibu untuk mengecek rekening masing-masing. Apabila ternyata jumlah uang yang ditransfer berbeda, silahkan dikomunikasikan ke Sub Fungsi Keuangan.
Demikian, atas perhatian dan kerjasamanya diucapkan terima kasih.

Salam,
Tim Keuangan`
}

client.on("ready", async () => {
    // to send one message
    // sendMessage("62....", "cobaaa")

    // no_wa is a column in the excel file that contains the recipient's WhatsApp number
    await sendMessageByExcel('./data/coba.xlsx', templateMessage, "no_wa", true);
    client.destroy();
});







