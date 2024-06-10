import fg from 'api-dylux';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) throw `أدخل اسم الشخص الذي تريد البحث عنه\n\n🐦مثال: ${usedPrefix + command} fcbarcalona.Moyt`;
    
    try {
        let res = await fg.igStalk(args[0]);
        if (!res || !res.username) throw 'لم يتم العثور على معلومات عن المستخدم.';

        let te = `
*┐────【 المعلومات كلها 】────┌*
⇠ *الرقم 👑:* ${res.name}
⇠ *الاسم 💫:* ${res.username}
⇠ *المتابعين 💌:* ${res.followersH}
⇠ *الي بيتابع حسابتهم ❤️‍🔥:* ${res.followingH}
⇠ *الوصف🗿:* ${res.description || 'لا يوجد وصف'}
⇠ *المنشورات🐣:* ${res.postsH}

⇠ *🔗 الرابط* : https://instagram.com/${res.username.replace(/^@/, '')}
*┘─────【 المعلومات كلها 】────└*`;

        await conn.sendFile(m.chat, res.profilePic, 'profile.jpg', te, m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'حدث خطأ أثناء جلب معلومات المستخدم. يرجى التأكد من صحة الاسم والمحاولة مرة أخرى.', m);
    }
};

handler.help = ['igstalk'];
handler.tags = ['dl'];
handler.command = ['انستغرام'];

export default handler;
