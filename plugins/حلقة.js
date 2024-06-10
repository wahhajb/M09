import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `*يرجى إدخال اسم الأنمي ورقم الحلقة المطلوبة.*`, m);
  
  try {
    const [animeName, episodeNumber] = text.split(' ');
    const response = await fetch(`https://anime-api.hisoka17.repl.co/anime/${animeName}/${episodeNumber}`);
    const data = await response.json();
    
    if (!data.success) {
      return conn.reply(m.chat, `*عذراً، لم يتم العثور على الحلقة المطلوبة.*`, m);
    }
    
    const episode = data.episode;
    const msg = `
*${animeName}* - الحلقة ${episodeNumber}
العنوان: ${episode.title}
تاريخ الإصدار: ${episode.airing_date}
الجودة: ${episode.quality}
الحجم: ${episode.size}
الرابط: ${episode.download_url}
    `;
    
    conn.reply(m.chat, msg, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `*حدث خطأ أثناء جلب المعلومات. يرجى المحاولة مرة أخرى لاحقًا.*`, m);
  }
};

handler.command = /^(episode|حلقه)$/i;

export default handler;
