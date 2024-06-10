import fetch from 'node-fetch';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  // التحقق من وجود النص أو الرد المقتبس
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `*عيون سيلفي وش السالفة*`;
  }

  // الحصول على النص من الرسالة المقتبسة إذا لم يكن النص موجودًا
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    // إرسال رسالة الانتظار
    const { key } = await conn.sendMessage(m.chat, {
      image: { url: 'https://telegra.ph/file/ffe1bb51bfa1b5c224bc9.jpg' },
      caption: 'جار الكتابة....'
    }, { quoted: m });

    // تحديث حالة الكتابة
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);

    // عنوان API الأول
    const guru1 = `${gurubot}/chatgpt?text=${prompt}&lang=ar`;

    try {
      let response = await fetch(guru1);
      let data = await response.json();
      let result = data.result;

      if (!result) {
        throw new Error('حدث خطأ');
      }

      await conn.sendMessage(m.chat, {
        image: { url: 'https://telegra.ph/file/ffe1bb51bfa1b5c224bc9.jpg' },
        caption: result,
      }, { quoted: m });

    } catch (error) {
      console.error('خطأ في API الأول:', error);

      // عنوان API الثاني كبديل
      const guru2 = `https://ultimetron.guruapi.tech/gpt3?prompt=${prompt}`;

      try {
        let response = await fetch(guru2);
        let data = await response.json();
        let result = data.completion;

        await conn.sendMessage(m.chat, {
          image: { url: 'https://telegra.ph/file/ffe1bb51bfa1b5c224bc9.jpg' },
          caption: result,
        }, { quoted: m });

      } catch (error) {
        console.error('خطأ في API الثاني:', error);
        throw `*حدث خطأ أثناء جلب المعلومات.*`;
      }
    }

  } catch (error) {
    console.error('Error:', error);
    throw `*خطأ أثناء تنفيذ العملية.*`;
  }
};

handler.help = ['chatgpt'];
handler.tags = ['AI'];
handler.command = ['سيلفي', 'chatgpt', 'ai', 'gpt'];

export default handler;
