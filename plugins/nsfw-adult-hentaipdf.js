importimport fetch from 'node-fetch';
import PDFDocument from 'pdfkit';
import { extractImageThumb } from '@whiskeysockets/baileys';
import { nhentaiScraper } from './nhentaiScraper'; // استيراد الدالة nhentaiScraper من ملف خارجي

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
  if (!db.data.chats[m.chat].modohorny && m.isGroup) throw '*[❗خطأ]* يجب تفعيل وضع "modohorny" لاستخدام هذا الأمر في المجموعة.';
  if (!text) throw `*[❗] يرجى إدخال اسم الكاتب أو عنوان المانجا المراد البحث عنه، مثال: ${usedPrefix + command} miku*`;
  try {
    m.reply(global.wait);
    const res = await fetch(`https://api.lolhuman.xyz/api/nhentaisearch?apikey=${lolkeysapi}&query=${text}`);
    const json = await res.json();
    const aa = json.result[0].id;
    const data = await nhentaiScraper(aa); // استدعاء الدالة nhentaiScraper لاسترداد بيانات المانجا
    const pages = [];
    const thumb = `https://t.nhentai.net/galleries/${data.media_id}/thumb.jpg`;
    data.images.pages.map((v, i) => {
      const ext = new URL(v.t).pathname.split('.')[1];
      pages.push(`https://i7.nhentai.net/galleries/${data.media_id}/${i + 1}.${ext}`);
    });
    const buffer = await (await fetch(thumb)).buffer();
    const jpegThumbnail = await extractImageThumb(buffer);
    const imagepdf = await toPDF(pages);
    await conn.sendMessage(m.chat, { document: imagepdf, jpegThumbnail, fileName: data.title.english + '.pdf', mimetype: 'application/pdf' }, { quoted: m });
  } catch {
    throw `*[❗] حدث خطأ، يرجى المحاولة مرة أخرى أو التحقق من صحة البحث.*`;
  }
};

handler.command = /^(hentaipdf)$/i;
export default handler;

async function toPDF(images, opt = {}) {
  return new Promise(async (resolve, reject) => {
    if (!Array.isArray(images)) images = [images];
    const buffs = [];
    const doc = new PDFDocument({ margin: 0, size: 'A4' });
    for (let x = 0; x < images.length; x++) {
      if (/.webp|.gif/.test(images[x])) continue;
      try {
        const data = await (await fetch(images[x], { responseType: 'arraybuffer', ...opt })).arrayBuffer();
        doc.image(data, 0, 0, { fit: [595.28, 841.89], align: 'center', valign: 'center' });
        if (images.length != x + 1) doc.addPage();
      } catch (error) {
        console.log('Error fetching image:', error);
      }
    }
    doc.on('data', (chunk) => buffs.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffs)));
    doc.on('error', (err) => reject(err));
    doc.end();
  });
      }
