import fetch from 'node-fetch';
import axios from 'axios';
import instagramGetUrl from 'instagram-url-direct';
import { instagram } from '@xct007/frieren-scraper';
import { instagramdl } from '@bochilteam/scraper';

var handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) return conn.reply(m.chat, `🎌 *أدخل رابط الانستقرام*\n\nمثال: ${usedPrefix + command} https://www.instagram.com/reel/CuqAzGRAbZa/?igshid=MzRlODBiNWFlZA==`, m);

  conn.reply(m.chat, `⏰ *الرجاء الانتظار حين يتم تلبية طلبك، صل على نبينا محمد*`, m);

  const createShortUrl = async (url) => {
    try {
      const shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text();
      return shortUrl;
    } catch {
      return url; // في حالة حدوث خطأ، إعادة الرابط الأصلي
    }
  };

  try {
    let apiUrll = `https://api.betabotz.org/api/download/igdowloader?url=${encodeURIComponent(args[0])}&apikey=bot-secx3`;
    let responsel = await axios.get(apiUrll);
    let resultl = responsel.data;
    for (const item of resultl.message) {
      let shortUrl = await createShortUrl(item.thumbnail);
      let text = `👾 *رابط:* ${shortUrl}`.trim();
      await conn.sendFile(m.chat, item._url, null, text, m);
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  } catch (error1) {
    console.error(error1);
    try {
      let datTa = await instagram.v1(args[0]);
      for (const url of datTa) {
        let shortUrl = await createShortUrl(args[0]);
        let text = `👾 *رابط:* ${shortUrl}`.trim();
        await conn.sendFile(m.chat, url.url, 'error.mp4', text, m);
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    } catch (error2) {
      console.error(error2);
      try {
        let resultss = (await instagramGetUrl(args[0])).url_list[0];
        let shortUrl = await createShortUrl(args[0]);
        let text = `👾 *رابط:* ${shortUrl}`.trim();
        await conn.sendFile(m.chat, resultss, 'error.mp4', text, m);
      } catch (error3) {
        console.error(error3);
        try {
          let resultssss = await instagramdl(args[0]);
          let shortUrl = await createShortUrl(args[0]);
          let text = `👾 *رابط:* ${shortUrl}`.trim();
          for (const { url } of resultssss) {
            await conn.sendFile(m.chat, url, 'error.mp4', text, m);
          }
        } catch (error4) {
          console.error(error4);
          try {
            let human = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${lolkeysapi}&url=${args[0]}`);
            let json = await human.json();
            let videoig = json.result;
            let shortUrl = await createShortUrl(args[0]);
            let text = `👾 *رابط:* ${shortUrl}`.trim();
            await conn.sendFile(m.chat, videoig, 'error.mp4', text, m);
          } catch (error5) {
            console.error(error5);
            return conn.reply(m.chat, '🚩 *حدث فشل*', m);
          }
        }
      }
    }
  }
};

handler.help = ['ig'];
handler.tags = ['descargas'];
handler.command = /^(انستا|instagram|igdl|ig|instagramdl2|instagram2|igdl2|ig2|instagramdl3|instagram3|igdl3|ig3)$/i;
handler.limit = true;

export default handler;
