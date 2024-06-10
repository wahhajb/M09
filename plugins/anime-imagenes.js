import fetch from 'node-fetch'
import fetch from 'node-fetch';

const handler = async (m, { conn, command }) => {
    const lolkeysapi = 'YOUR_API_KEY_HERE'; // قم بتعيين مفتاح الواجهة البرمجية الخاص بك هنا

    if (command == 'فانرت') {
        let fanart = await fetch(`https://api.lolhuman.xyz/api/random/art?apikey=${lolkeysapi}`);
        conn.sendMessage(m.chat, { image: await fanart.buffer(), caption: '*🧧 فانرت*' }, { quoted: m });
        m.react('🧧');
    }

    if (command == 'هوسبو') {
        let husbu = await fetch(`https://api.lolhuman.xyz/api/random/husbu?apikey=${lolkeysapi}`);
        conn.sendMessage(m.chat, { image: await husbu.buffer(), caption: '*🚩 هوسبو*' }, { quoted: m });
        m.react('🚩');
    }

    if (command == 'كانا') {
        let kanna = await fetch(`https://api.lolhuman.xyz/api/random/kanna?apikey=${lolkeysapi}`);
        conn.sendMessage(m.chat, { image: await kanna.buffer(), caption: '*🍧 كانا*' }, { quoted: m });
        m.react('🍧');
    }

if (command == 'ميغومين') {
let megumin = await fetch(`https://api.lolhuman.xyz/api/random/megumin?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, {image: megumin, caption: `*🍂 ميغومين*`.trim()}, {quoted: m})
m.react('🍂')
}

if (command == 'نيكو') {
let neko = await fetch(`https://api.lolhuman.xyz/api/random/neko?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, {image: neko, caption: `*😻 نيكو*`.trim()}, {quoted: m})
m.react('😻')
}

if (command == 'شوتا') {
let neko = await fetch(`https://api.lolhuman.xyz/api/random/shota?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, {image: neko, caption: `*⚡ شوتا*`.trim()}, {quoted: m})
m.react('⚡')
}

if (command == 'وايف') {
let waifu = await fetch(`https://api.lolhuman.xyz/api/random/waifu?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, {image: waifu, caption: `*🍭 وايف*`.trim()}, {quoted: m})
m.react('🍭')
}

if (command == 'الينا') {
let elaina = await fetch(`https://api.lolhuman.xyz/api/random/neko?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, {image: elaina, caption: `*🍚 الينا*`.trim()}, {quoted: m})
m.react('🍚')
}

}
handler.command = /^(فانرت|هوسبو|كانا|ميغومين|نيكو|شوتا|وايف|الينا)$/i
handler.tags = ['anime']
handler.help = ['فانرت', 'هوسبو', 'كانا', 'ميغومين', 'نيكو', 'شوتا', 'وايف', 'الينا']

handler.limit = true

export default handler
                 
