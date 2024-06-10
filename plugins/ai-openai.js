import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: global.openai_org_id,
  apiKey: global.openai_key
});
const openai = new OpenAIApi(configuration);

var handler = async (m, { conn, text, usedPrefix, command }) => {
  if (usedPrefix === 'a' || usedPrefix === 'A') return;
  if (!text) return conn.reply(m.chat, `*🎌 أدخل الطلب للرد عليك*\n\nمثال: !غوكو هات معلومات عن الأنمي\n\n❗ معلومة: إذا أرسل إليك المعلومات بالإنجليزية يمكنك ترجمتها عن طريق .ترجم ar`, m);

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    // ترجمة النص إلى العربية
    const translation = await translate(text, { from: 'en', to: 'ar' });
    const arabicText = translation.text;
    const prompt = `مطوري هو عمرو\n\n${arabicText}`;

    // استخدام ChatGPT للحصول على الرد
    const response = await openai.createChatCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150
    });

    const aiReply = response.data.choices[0].text.trim();
    await m.reply(aiReply);
  } catch (err) {
    console.error(err);
    try {
      // المحاولة الثانية للحصول على الرد من خدمة أخرى
      let ia2 = await fetch(`https://aemt.me/openai?text=${text}`);
      let resu2 = await ia2.json();
      m.reply(resu2.result.trim());
    } catch (err) {
      console.error(err);
      try {
        // المحاولة الثالثة للحصول على الرد من خدمة أخرى
        let tioress = await fetch(`https://api.lolhuman.xyz/api/openai-turbo?apikey=YOUR_API_KEY&text=${text}`);
        let hasill = await tioress.json();
        conn.reply(m.chat, `${hasill.result}`, m);
      } catch (err) {
        console.error(err);
        conn.reply(m.chat, '🚩 *حدث خطأ، يرجى المحاولة مرة أخرى لاحقًا*', m);
      }
    }
  }
};

handler.help = ['ia'];
handler.tags = ['ai'];
handler.command = ['عمرو', 'chatgpt', 'ia', 'بوت'];

export default handler;
