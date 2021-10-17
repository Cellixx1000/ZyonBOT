const { MessageEmbed } = require('discord.js')

module.exports = {
  run: async function (client, message, args) {
  const embed = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
  .setTitle(`📚 Ajuda - Comandos`)
  .setDescription(`Olá **${message.author.username}**, abaixo você econtrará a minha lista de comandos completa!`)
  .addField(`💰 | Economia`, `\`trabalhar\`, \`investir\`, \`crime\`, \`bonus\`, \`bitbonus\`, \`saldo\`, \`sacar\`, \`depositar\`, \`loja\`, \`blackjack\`, \`roubar\`,  \`inventario\`.`)
  .addField(`💼 | Empregos`, `\`empregos\`, \`pescar\`, \`lenhar\`, \`cacar\`, \`minerar\`, \`rondar\`, \`engenhar\`, \`programar\`, \`advogar\`.`)
  .addField(`🏛 | Empresas`, `\`empresas\`, \`infoemp\`, \`descemp\`, \`nemp\`, \`xpemp\`, \`rankemp\`, \`trabemp\`, \`prodemp\`, \`invemp\`, \`vprods\`, \`capemp\`, \`demp\`, \`semp\`, \`vemp\`.`)
  .addField(`📌 | Gerais`, `\`biografia\`, \`background\`, \`adicionar\`, \`info\`, \`infobot\`,  \`changelog\`, \`ping\`, \`suporte\`, \`site\`.`)
  .addField(`👑 | Staff`, `\`prefixo\`, \`canal\`, \`rcanal\`, \`cargo-add\`, \`cargo-remover\`, \`evento\`.\n:warning: Para os comandos de adicionar cargos, verifique se eu possuo a permissão \`GERENCIAR CARGOS\` e tenha certeza de que o meu cargo está acima do que foi escolhido.`)
  .addField(`🆕 | Novos comandos`, `\`cargo-add\`, \`cargo-remover\`.`)
  .setFooter('© Zyon™ 2020. Todos os Direitos Reservados.', client.user.avatarURL())
  .setThumbnail(client.user.avatarURL({ format: 'png', size: 512 }))
  message.channel.send(embed)

  },
  conf: {},
  get help () {
    return {
      name: 'ajuda',
      category: 'Geral',
      description: 'Comando de ajuda.',
      aliases: ['help'],
      usage: `ajuda`
    }
  }
}