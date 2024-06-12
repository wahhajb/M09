const handler = async (m, {conn, usedprefix}) => {
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/blur', {
    avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/d1e32c48ec245ba4e8943.jpg'),
  }), 'hornycard.png', '*[ ✔ ] تم تنفيذ طلبك*', m);
};
handler.help = ['blur', 'difuminar2'];
handler.tags = ['maker'];
handler.command = /^(بلور|difuminar2)$/i;
export default handler;
