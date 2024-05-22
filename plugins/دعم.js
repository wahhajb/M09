let handler = async (m, { conn, command, text }) => {
let love = `
*لدعم البوت تستطيع ان تفعل:-*
*1_تستطيع دخول قروب دعم البوت لدعمه.↯↯*
**

*2_وتستطيع ان تتابع البوت على الانستا:-*
*https://www.instagram.com/mrwbryh?igsh=MWxwZ2o4N2NkMHN5YQ==* 

*3_وتستطيع دعم المطور من هنا:-*
*+967774318278*

*وشكرا لكم يا افضل مستخدمين 👾👑*
`.trim()
m.reply(love, null, { mentions: conn.parseMention(love) })}
handler.help = ['estupidez']
handler.tags = ['fun']
handler.command = /^(الدعم|دعم)$/i
export default handler
