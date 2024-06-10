let handler = async (m, { conn, text }) => {
    let [, link] = text.match(/(https?|tg):\/\/(\S+)/) || []
    if (!link) throw '❌ الرجاء إدخال رابط صالح.'
    let res = (await conn.url(link)).headers || {}
    let type = res['content-type']
    let size = res['content-length']
    m.reply(`🔗 نوع الرابط: ${type || 'غير معروف'}\n📏 حجم الرابط: ${size ? (Number(size) / 1024).toFixed(2) + ' KB' : 'غير معروف'}`)
}
handler.help = ['فحص الرابط']
handler.tags = ['tools']
handler.command = /^(فحص-الرابط)$/i
handler.limit = true

module.exports = handler
