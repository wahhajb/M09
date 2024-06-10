import fetch from "node-fetch";

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw "*اكتب نص لاستطيع الرد عليه\n°°°°°°°°°°°°°°°°°\n" + global.veeeee;
  }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }
  try {
    conn.sendPresenceUpdate("composing", m.chat);
    const prompt = encodeURIComponent(text);
    const url = "https://gurugpt.cyclic.app/chat?prompt=" + prompt + "&model=" + "llama";
    const response = await fetch(url);
    const json = await response.json();
    const replyText = json.data;
    await conn.sendMessage(m.chat, { text: "🤖", key: m.key });
    m.reply(replyText);
  } catch (error) {
    console.error("Error:", error);
    throw "*خطأ*";
  }
};

handler.help = ["vvvoonn"];
handler.command = ["سيري"];
export default handler;
