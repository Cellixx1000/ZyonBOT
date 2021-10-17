const { MessageEmbed } = require('discord.js')

module.exports = {
  run: async function (client, message, args) {
    const mConvite = new MessageEmbed()
    .setTitle("💖 Convite - Zyon:tm:")
    .setThumbnail(client.user.avatarURL())
    // Removido
    .setDescription(`Olá ${message.author}, obrigado por utilizar este comando! Abaixo você verá todos os meus links de convite!`)
    .addField("📩 | Me adicione no seu servidor!", `Para me adicionar em seu servidor, clique [aqui](https://discord.com/api/oauth2/authorize?client_id=808189291372871730&permissions=8&scope=bot)!`)
    .addField("• Links rápidos", `[Suporte](https://discord.gg/SeHB3ZJ9NS)`)
    .setFooter('Zyon™ © Todos os direitos reservados')
    message.channel.send(mConvite)
  },
  conf: {},
  get help () {
    return {
      name: 'adicionar',
      category: 'Geral',
      description: 'Comando para convidar o bot',
      aliases: ['convite', 'convidar', 'add'],
      usage: `adicionar`
    }
  }
}