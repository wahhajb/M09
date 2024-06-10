let handler = async (m, { conn, command, text }) => {
let love = `‏

*✥━─━⌬〘𝑮𝒐𝒌𝒖_𝒃𝒐𝒕〙⌬━─━✥*

*⌬〘 مرحبا بك في بوت غوكو 〙⌬*

*⌬〘 اليك قائمه بسورس البوت 〙⌬*

*✥━─━⌬〘🔥〙⌬━─━✥*

*⌬〘 تم تطويري وبرمجتي 〙⌬*
*⌬〘 بواسطه 𝓐𝓜𝓡𝓞 𝓚𝓗𝓐𝓛𝓘𝓓〙⌬*
*⌬〘 هذا البوت يعمل بالخاص 〙⌬*
*⌬〘 ويعمل ايضاا بالمجموعات 〙⌬*
*⌬〘 اذا كنت تريد صناعه بوت 〙⌬*
*⌬〘 فعليك الانضمام الي جروبنا 〙⌬*

*✥━─━⌬〘🔥〙⌬━─━✥*

*⌬〘 واتساب 〙⌬*

*⏣⊰ https://chat.whatsapp.com/EbzeqqSjqsMI2oDrjSdT3g ⊱⏣*

*⌬〘 واتساب 〙⌬*

*⏣⊰ https://wa.me/+967774318278 ⊱⏣*

*⌬〘 الدعم 〙⌬*

*⏣⊰ https://chat.whatsapp.com/EbzeqqSjqsMI2oDrjSdT3g ⊱⏣*

*✥━─━⌬〘𝑮𝒐𝒌𝒖_𝒃𝒐𝒕〙⌬━─━✥*
 `.trim()
m.reply(love, null, { mentions: conn.parseMention(love) })}
handler.help = ['love']
handler.tags = ['fun']
handler.command = /^(السورس|سورس)$/i
export default handler
