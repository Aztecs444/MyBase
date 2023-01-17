const chalk = require("chalk") 
const fs = require("fs")
const i18n = require("i18n")
const moment = require("moment-timezone")
module.exports = async(sock, m, chatUpdate, store) => {
try{
//=========================[ FUNCTION BOT ]=========================\\
const timeWib = moment().tz("Asia/Jakarta").format("HH:mm:ss")
const timeWit = moment().tz("Asia/Makassar").format("HH:mm:ss")
const timeWita = moment().tz("Asia/Jayapura").format("HH:mm:ss")
const content = JSON.stringify(m.message)
const body = m.mtype === "conversation"? m.message.conversation: m.mtype == "imageMessage"? m.message.imageMessage.caption: m.mtype == "videoMessage"? m.message.videoMessage.caption: m.mtype == "extendedTextMessage"? m.message.extendedTextMessage.text: m.mtype == "buttonsResponseMessage"? m.message.buttonsResponseMessage.selectedButtonId: m.mtype == "listResponseMessage"? m.message.listResponseMessage.singleSelectReply.selectedRowId: m.mtype == "templateButtonReplyMessage"? m.message.templateButtonReplyMessage.selectedId: m.mtype === "messageContextInfo"? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId: ""
const budy = m.mtype === "conversation" ? m.message.conversation : m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text : ""
const messagesC = budy.slice(0).trim()
const args = body.trim().split(/ +/).slice(1)
const botNumber = sock.decodeJid(sock.user.id)
/*
const devoloper = `${devoloperNumber}@s.whatsapp.net`
const isDevoloper = [`${devoloperNumber}@s.whatsapp.net`].includes(m.sender)
const isCreator = [`${devoloperNumber}@s.whatsapp.net`,`${ownerNumber}@s.whatsapp.net`, ...Object.keys(db.data.vip)].includes(m.sender)
const isOwner = [`${devoloperNumber}@s.whatsapp.net`,`${ownerNumber}@s.whatsapp.net`, ...Object.keys(db.data.vip), ...Object.keys(db.data.owner)].includes(m.sender)
const isPremium = isOwner? true : Object.keys(db.data.premium).includes(m.sender)
const isSewa = [botNumber].includes(m.sender)? true : isPremium? true : Object.keys(db.data.sewa).includes(m.chat)
*/
const listblock = await sock.fetchBlocklist()
const text = q = args.join(" ")
const numberQuery = text.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"        
const quoted = m.quoted ? m.quoted : m
const mentionByTag = m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
const Input = mentionByTag[0] ? mentionByTag[0] : mentionByReply ? mentionByReply : q ? numberQuery : false
const setPrefix = "prefix"
//=========================[ SECURITY GROUP ]=========================\\
const groupMetadata = m.isGroup? await sock.groupMetadata(m.chat).catch(e => {}) : ""
const groupName = m.isGroup? groupMetadata.subject : ""
const participants = m.isGroup? await groupMetadata.participants : ""
const groupAdmins = m.isGroup? await participants.filter(v => v.admin !== null).map(v => v.id) : ""
const groupOwner = m.isGroup? groupMetadata.owner : ""
const groupMembers = m.isGroup? groupMetadata.participants : ""
const isBotGroupAdmins = m.isGroup? groupAdmins.includes(botNumber) : false
const isGroupAdmins = m.isGroup? groupAdmins.includes(m.sender) : false
//=========================[ FUNCTION PREFIX ]=========================\\
if (setPrefix == "prefix") {
var thePrefix = "MULTI-PREFIX"
var prefix = /^#.!?|\\^/.test(body) ? body.match(/^#.!?|\\^/gi) : "."
var isCmd = body.startsWith(prefix)
var command = isCmd? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : ""
} else if (setPrefix == "noprefix") {
var thePrefix = "NO-PREFIX"
var prefix = ""
var isCmd = body.startsWith(prefix)
var command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
} else if (setPrefix == "allprefix") {
var thePrefix = "ALL-PREFIX"
var prefix = /^#.!?|\\^/.test(body) ? body.match(/^#.!?|\\^/gi) : "."
var isCmd = body.startsWith(prefix)
var command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
}
//=========================[ FUNCTION RESPON ]=========================\\
let pathdir = fs.readdirSync("./commands")
pathdir.forEach(async (res) => {
const commands = fs.readdirSync("./commands/" + res).filter((file) => file.endsWith(".js"))
for (let file of commands) {
const cmdOptions = require(`../commands/${res}/${file}`)
if (cmdOptions.commands.includes(command)) {
//=========================[ RESPON (ONLY PRIVATE) ]=========================\\
if (cmdOptions.isPrivate) {
if (m.isGroup) return sock.sendMessage(m.chat, { text: i18n.__("message.private_only") }, { quoted: m })
}
//=========================[ RESPON (ONLY GROUP) ]=========================\\
if (cmdOptions.isGroup) {
if (!m.isGroup) return sock.sendMessage(m.chat, { text: i18n.__("message.group_only") }, { quoted: m })
}






try{
await cmdOptions.callback(sock, m, chatUpdate, store, { text, command })
} catch (e) {
console.log(e) 
}






}
}
})


/*const cmdOptions = {
commands: [""],
cooldown: 5,
isSewa: false, 
isDevoloper: false, 
isOwner: false, 
isPremium: false,
isGroup: false,
isAdmin: false,
isBotAdmin: false,
isPrivate: false,
isQuery: false,
isWait: false, 
isLimit: false,
callback: () => {}
}

*/

            
console.log(body)




if (budy.startsWith(">")) {
//if (!isOwner && !m.key.fromMe) return onlyOwner()
try{
let evaled = await eval(budy.slice(2))
if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
sock.sendMessage(m.chat, { text: `${evaled}` }, { quoted: m }) 
} catch (err) {
sock.sendMessage(m.chat, { text: `${err}` }, { quoted: m }) 
}
}

if (budy.startsWith("$")){
//if (!isOwner && !m.key.fromMe) return onlyOwner()
exec(text, (err, stdout) => {
if (err) return sock.sendMessage(m.chat, { text: `${err}` }, { quoted: m }) 
if (stdout) {
sock.sendMessage(m.chat, { text: `${stdout}` }, { quoted: m }) 
}
})
}




} catch (e) {
console.log(e) 
}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})