let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let videoUrl = 'https://telegra.ph/file/4a717e7678443cb885628.mp4'
  let { name } = global.db.data.users[who]
  m.react('💎')
let str = `                  ✥━─━⌬ 𝑮𝒐𝒌𝒖_𝒃𝒐𝒕 ⌬━─━✥
  *≼🎞≽ قـسـم الاديت+الصور≤🖼≥╿↶*
⋄━───═◞⬪⋇⬪◟═───━⋄
❐╎🎎❯ .طقم⌉
❐╎👨🏻‍💼❯ .طقم_اولاد⌉
❐╎👯‍♀️❯ .طقم_بنات⌉
❐╎🖼❯ .خلفيه⌉
❐╎🎁❯ .خلفيات⌉
❐╎🤣❯ .ميمز⌉
❐╎🧝🏻‍♀️❯ .بنت⌉
❐╎📹❯ .ايديت⌉
❐╎💃🏻❯ .ايديت1⌉
❐╎🚘❯ .ايديت2⌉
❐╎⚽❯ .ايديت3⌉
❐╎🪞❯ .ايديت4⌉
❐╎🗼❯ .ايديت5⌉
❐╎🫗❯ .ماء⌉
❐╎😂❯ .لصديق⌉
❐╎🎞❯ .ايديت-مختلط⌉
❐╎🎧❯ .ايديت-اغنيه⌉
❐╎😎❯ .دراغون-بول⌉
❐╎🎐❯ .بليتش⌉
                    ✥━─━⌬ 𝑮𝒐𝒌𝒖_𝒃𝒐𝒕 ⌬━─━✥
`
  conn.sendMessage(m.chat, {
           video: { url: videoUrl }, caption: str,
     mentions: [m.sender,global.conn.user.jid],
     gifPlayback: true,gifAttribution: 0
       }, { quoted: m });
   };

handler.help = ['main']
handler.tags = ['group']
handler.command = ['الايديت']

export default handler
