import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath, pathToFileURL } from 'url'

global.owner = [['212601064446', '🌩️ ẉa.me/AFROTO‖.peị!‽ 👑', true], 
 ['201067999523', '🌩️ ẉa.me/AFROTO‖.peị!‽ 👑', true],  ['212601064446'], ['201067999523'], ['212601064446'], ['201067999523'], ['201067999523'], ['201067999523'], ['212601064446'], ['201067999523'], ['212601064446']]

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = '' //Ejemplo: +59309090909
global.confirmCode = ''

global.animxscans = ['212601064446']
global.suittag = ['212601064446']
global.mods = []
global.prems = []

global.packname = '『 201067999523 』'
global.author = '『 غوكـو بــ☠️ـوت 』'
global.wm = '『غـوكـو بــ🐍ـؤؤت 』'
global.wm2 = '『 غــوكـو بــ💎ـوت 』'
global.azami = '『غـوكو بــ💀وت 』'
global.cb = '『 غــوكــو بــ👾ـوت 』'

global.vs = 'V2 • 1.0.5'
global.library = 'Baileys'
global.baileys = '@whiskeysockets/baileys'
global.lenguaje = 'Español'
global.KMA = '╰━━━〔 *🛡️ 1.7.9* 〕━━━━━⬣'
global.menudi = ['⛶','❏','⫹⫺']
global.dev = '© 𝑮𝒐𝒌𝒖_BOT'
global.devnum = '212601064446'

let file = fileURLToPath(import.meta.url)
watchFile(file, () => { unwatchFile(file)
console.log(chalk.yellow('Se actualizo el archivo config.js'))
import(`${file}?update=${Date.now()}`)
})
