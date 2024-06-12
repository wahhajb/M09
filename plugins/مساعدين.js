const dir = [
'https://telegra.ph/file/d1e32c48ec245ba4e8943.jpg',

];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dado.webp','╭━━━[ *مساعدين المطور* ]━━━━⬣
'لا يوجد احد يساعد غـــوكــو🥹💔'
'╰━━━〔 *🛡️ 1.4.9* 〕━━━━━⬣', m)
}
handler.help = ['dado']
handler.tags = ['game']
handler.command = ['مساعدين', 'المساعدين'] 

export default handler
