import fetch from 'node-fetch';

var handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, 'يرجى إدخال اسم الكتاب', m)
    
    try {
        let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(text)}&langRestrict=ar&printType=books`)
        let data = await response.json()
        let book = data.items[0]
        
        if (!book) return conn.reply(m.chat, 'لم يتم العثور على الكتاب', m)
        
        let pdfLink = book.accessInfo.pdf.downloadLink
        let title = book.volumeInfo.title
        let author = book.volumeInfo.authors[0]
        
        conn.sendFile(m.chat, pdfLink, `${title}.pdf`, `*عنوان الكتاب*: ${title}\n*المؤلف*: ${author}`, m)
    } catch (error) {
        console.log(error)
        conn.reply(m.chat, 'حدث خطأ أثناء جلب الكتاب', m)
    }
}

handler.command = /^(pdf|تحميل-كتاب)$/i
handler.help = ['تحميل كتاب [اسم الكتاب]']
handler.tags = ['كتب']
handler.group = true
handler.register = true
handler.limit = true

export default handler
