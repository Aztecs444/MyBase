module.exports = {
commands: ["test"],
cooldown: 5,
isSewa: false, 
isPrivate: true,
isDevoloper: false, 
isOwner: false, 
isPremium: false,
isGroup: false,
isAdmin: false,
isBotAdmin: false,
isWait: false, 
isLimit: false,
callback: async (sock, m, chatUpdate, store, { text, command }) => {
sock.sendMessage(m.chat, { text: "Success" }, { quoted: m }) 
}
}