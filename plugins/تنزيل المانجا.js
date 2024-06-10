import fetch from 'node-fetch';
import axios from 'axios';
import fs from 'fs';

const handler = async (m, { conn, text, command }) => {
  if (!text) return conn.reply(m.chat, `*يُرجى إدخال اسم المانجا المطلوبة.*`, m);
  
  try {
    const mangaName = encodeURIComponent(text);
    const response = await fetch(`https://api.jikan.moe/v3/search/manga?q=${mangaName}&page=1`);
    const data = await response.json();
    
    if (data.results.length === 0) {
      return conn.reply(m.chat, `*عذراً، لم يتم العثور على المانجا المطلوبة.*`, m);
    }
    
    const manga = data.results[0];
    const msg = `
*${manga.title}*
التقييم: ${manga.score}
الحالة: ${manga.publishing ? 'مستمرة' : 'مكتملة'}
الفصول: ${manga.chapters}
المؤلف: ${manga.authors.map(author => author.name).join(', ')}
التصنيف: ${manga.genres.map(genre => genre.name).join(', ')}
الرابط: ${manga.url}
    `;
    
    conn.reply(m.chat, msg, m);
    
    // تنزيل المانجا بالإنجليزية
    const mangaId = manga.mal_id;
    const mangaInfoResponse = await axios.get(`https://api.jikan.moe/v3/manga/${mangaId}`);
    const mangaInfo = mangaInfoResponse.data;
    const chapterUrls = mangaInfo.chapters.map(chapter => chapter.chapter_link);
    
    // تنزيل كل فصل من المانجا
    chapterUrls.forEach(async (chapterUrl, index) => {
      const chapterResponse = await axios.get(chapterUrl, { responseType: 'arraybuffer' });
      fs.writeFileSync(`chapter${index + 1}.pdf`, chapterResponse.data);
      console.log(`تم تنزيل الفصل رقم ${index + 1}`);
    });
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `*حدث خطأ أثناء جلب المعلومات. يرجى المحاولة مرة أخرى لاحقًا.*`, m);
  }
};

handler.command = /^(manga1|تنزيل-مانجا)$/i;

export default handler;
