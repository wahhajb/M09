import axios from 'axios';
import FormData from 'form-data';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

const textpro = async (conn, args, usedPrefix, command, name) => {
    if (args.length === 0) {
        await conn.reply(command.chatId, `استخدام: ${usedPrefix}textpro [النص]`, command.id);
        return;
    }

    const text = args.join(' ');

    const formData = new FormData();
    formData.append('key', 'textpro');
    formData.append('text', text);

    const response = await axios.post('https://textpro.me/create-text/?', formData, {
        headers: formData.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const result = $('div.btn-group > a').attr('href');

    if (result) {
        await conn.sendFile(command.chatId, result, 'textpro.jpg', '', command.id);
    } else {
        await conn.reply(command.chatId, 'لم يتمكن من إنشاء الصورة', command.id);
    }
};

export default textpro;
