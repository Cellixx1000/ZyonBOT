const { MessageEmbed } = require('discord.js')

module.exports = async (client, guild, member) => {
   const canal = client.channels.cache.get('808212908730220544')
   const mServidores = new MessageEmbed()
   .setTitle(`<:notify:800892028929703946> ${guild.name}`)
   .setDescription(`Mais um servidor chegou para conquistar!`)
   .addField(`<a:loading:801259440765534248> Número`, `**${client.guilds.cache.size.toLocaleString('pt-BR')}º** servidor!`, true)
   .addField(`<a:loading:801259440765534248> Membros`, `**${guild.memberCount.toLocaleString('pt-BR')}** usuários!`, true)
   .setThumbnail(guild.iconURL({ dynamic: true, format: 'png', size: 512 }))
   .setFooter(`© 2020. Zyon™ • Todos os direitos reservados.`, client.user.avatarURL())
   canal.send(mServidores)
}