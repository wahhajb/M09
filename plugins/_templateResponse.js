// @type {import('@whiskeysockets/baileys')}

const { proto, generatorWAMessage, areJidsSameUser, decryptPollVote, } = (await import('@whiskeysockets/baileys')).default;
تصدير وظيفة غير متزامنة الكل (م، chatUpdate) {
إذا (م.isBaileys) {
يعود
}
إذا (! م.رسالة) {
يعود
}
إذا (!(m.message.buttonsResponseMessage || m.message.templateButtonReplyMessage || m.message.listResponseMessage || m.message.interactiveResponseMessage)) {
يعود
}
اسمحوا معرف
إذا (m.message.buttonsResponseMessage) {
المعرف = m.message.buttonsResponseMessage.selectedButtonId
} وإلا إذا (m.message.templateButtonReplyMessage) {
المعرف = m.message.templateButtonReplyMessage.selectedId
} وإلا إذا (m.message.listResponseMessage) {
id = m.message.listResponseMessage.singleSelectReply?.selectedRowId;
} وإلا إذا (m.message.interactiveResponseMessage) {
المعرف = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id
}
نص ثابت = m.message.buttonsResponseMessage?.selectedDisplayText || m.message.templateButtonReplyMessage?.selectedDisplayText || m.message.listResponseMessage?.title
دع isIdMessage = خطأ
دع usePrefix
لـ (اسم ثابت في global.plugins) {
البرنامج المساعد const = global.plugins[name]
إذا (! البرنامج المساعد) {
يكمل
}
إذا (البرنامج المساعد. معطل) {
يكمل
}
إذا (! يختار ['تقييد']) {
إذا (plugin.tags && plugin.tags.includes('admin')) {
يكمل
}}
إذا (نوع البرنامج المساعد!== 'وظيفة') {
يكمل
}
إذا (! البرنامج المساعد.command) {
يكمل
}
const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
const _prefix = plugin.customPrefix؟ plugin.customPrefix : هذه البادئة؟ this.prefix : global.prefix
const match = (_prefix مثيل RegExp ? [[_prefix.exec(id), _prefix]] : Array.isArray(_prefix) ? _prefix.map((p) => {
const re = p مثيل RegExp؟ ع : جديد RegExp(str2Regex(p));
إرجاع [re.exec(id)، إعادة]
}):
typeof _prefix === 'سلسلة'؟
[[new RegExp(str2Regex(_prefix)).exec(id)، new RegExp(str2Regex(_prefix))]] :
[[[]، RegExp الجديد]]
).العثور على((ع) => ص[1])
إذا ((usedPrefix = (match[0] || '')[0])) {
const noPrefix = id.replace(usedPrefix, '')
دع [command] = noPrefix.trim().split` `.filter((v) => v)
الأمر = (الأمر || '').toLowerCase()
const isId = plugin.command مثيل RegExp؟
plugin.command.test(الأمر):
Array.isArray(plugin.command) ؟
plugin.command.some((cmd) => cmd مثيل RegExp ؟
cmd.test(الأمر):
كمد === الأمر،
) :
نوع plugin.command === "سلسلة"؟
plugin.command === الأمر :
خطأ شنيع
إذا (! هو معرف) {
يكمل
}
isIdMessage = صحيح
}}
رسائل ثابتة = انتظار إنشاء WMessage(m.chat, {text: isIdMessage ? id : text, notifications: m.mentionedJid}, {
معرف المستخدم: this.user.id،
مقتبس: m.quoted && m.quoted.fakeObj،
})
messages.key.fromMe = areJidsSameUser(m.sender, this.user.id)
messages.key.id = m.key.id
messages.pushName = m.name
إذا (م.isGroup) {
messages.key.participant = messages.participant = m.sender
}
رسالة ثابتة = {
...تحديث الدردشة،
الرسائل: [proto.WebMessageInfo.fromObject(messages)].map((v) => (v.conn = this, v))،
النوع: "إلحاق"،
}
this.ev.emit('messages.upsert', msg)
}
