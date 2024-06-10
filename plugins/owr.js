/* ⚠ POR FAVOR NO MODIFIQUES NADA DE AQUÍ ⚠ */

import { generateWAMessageFromContent } from '@adiwajshing/baileys'
import fs from 'fs'
let handler = async (m, { conn, usedPrefix, command }) => {
let name = await conn.getName(m.sender)
let donar =`
*┏ ┅ ━━━━━━━━━━━━━━━━━ ┅ ━*
*┇          「 المطور 」*
*┣ ┅ ━━━━━━━━━━━━━━━━━ ┅ ━*
*┃ مرحبا ${name}*
*┃ ➤اسم المطور:𝜜𝑴𝑹𝑶 𝑲𝑯𝜜𝑳𝑰𝑫*
*┃ 👉🏻 فيما يلي بعض البيانات التي تخص المطور*
*┃ في حالة دعمك :𝟹*
*┃*
*┃ ➤ رقم المطور:* 
*┃ +967774318278*
*┃ ➤ بلد: اليمن* 
*┃ ➤ يعمل البوت بنظام: لينكس* 
*┃ ➤ متاح: 24 ساعه*  
*┃ ➤ قروب الدعم: https://chat.whatsapp.com/EbzeqqSjqsMI2oDrjSdT3g*
*┃*
*┃ 👉🏻 اذا كان لديك مشكله راسلني علي رقمي*
*┃ تعال فقط اذا كان لديك مشكله فقط*
*┃ wa.me/+967774318278*
*┗ ┅ ━━━━━━━━━━━━━━━━━ ┅ ━*
`.trim()
let aa = { quoted: m, userJid: conn.user.jid }
let res = generateWAMessageFromContent (m.chat, {liveLocationMessage: {degreesLatitude: 0, degreesLongitude: 0, caption: donar, secuenceNumber: "0", contextInfo: {mentionedJid: conn.parseMention()}}}, aa)
conn.relayMessage(m.chat, res.message, {})
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^owner|مطور|ower$/i
export default handler
