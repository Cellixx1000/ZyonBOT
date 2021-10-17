const {
  MessageEmbed
} = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config.json')

module.exports = {
  run: async function (client, message, args) {
    try {
      //<!-- Coletamos o prefixo do servidor --!>
      let prefixoColeta = await database.ref(`Configurações/Servidores/${message.guild.id}/Prefixo`)
      let prefixoColeta2 = await prefixoColeta.once('value')
      let prefixo = prefixoColeta2.val().prefixo
      //<!-- Coletamos os dados do servidor --!>
      let ref = await database.ref(`Economia/Servidor/${message.guild.id}/Registros/Usuário/${message.author.id}`)
      let snap = await ref.once('value')
      //<!-- Se os dados não existirem, o Zyon vai criá-los --!>
      if (snap.val() == null) {
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
      if (!message.member.hasPermission('MANAGE_GUILD', {
          checkAdmin: true,
          checkOwner: true
        })) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui a permissão \`GERENCIAR SERVIDOR\`!`);
      if (!message.mentions.roles.first()) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve mencionar o cargo que deseja vender.`)
      if (!args[1]) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve me informar a classificação do cargo na hierarquia (1, 2, 3, 4 ou 5).`)
      if (!args[2]) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve me informar o valor do cargo.`)
      if (isNaN(args[2])) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, eu acredito fortemente que o que você tentou me informar não é um número.`)

      if (args[1] == "1") {
        const cargo = message.mentions.roles.first()
        database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
          .update({
            "cargo01": cargo.id,
            "valor01": parseInt(args[2])
          })
        return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, tudo certo! O cargo **${cargo.name}** foi adicionado a loja no valor de **R$${parseInt(args[2]).toLocaleString('pt-BR')}**.`)
      }
      if (args[1] == "2") {
        const cargo = message.mentions.roles.first()
        database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
          .update({
            "cargo02": cargo.id,
            "valor02": parseInt(args[2])
          })
        return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, tudo certo! O cargo **${cargo.name}** foi adicionado a loja no valor de **R$${parseInt(args[2]).toLocaleString('pt-BR')}**.`)
      }
      if (args[1] == "3") {
        const cargo = message.mentions.roles.first()
        database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
          .update({
            "cargo03": cargo.id,
            "valor03": parseInt(args[2])
          })
        return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, tudo certo! O cargo **${cargo.name}** foi adicionado a loja no valor de **R$${parseInt(args[2]).toLocaleString('pt-BR')}**.`)
      }
      if (args[1] == "4") {
        const cargo = message.mentions.roles.first()
        database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
          .update({
            "cargo04": cargo.id,
            "valor04": parseInt(args[2])
          })
        return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, tudo certo! O cargo **${cargo.name}** foi adicionado a loja no valor de **R$${parseInt(args[2]).toLocaleString('pt-BR')}**.`)
      }
      if (args[1] == "5") {
        const cargo = message.mentions.roles.first()
        database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
          .update({
            "cargo05": cargo.id,
            "valor05": parseInt(args[2])
          })
        return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, tudo certo! O cargo **${cargo.name}** foi adicionado a loja no valor de **R$${parseInt(args[2]).toLocaleString('pt-BR')}**.`)
      }
    } catch (e) {
      const erroCanal = client.channels.get('809515239480885269')
      message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
      erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`\``)
    }
  },
  conf: {},
  get help() {
    return {
      name: 'cargo-add'
    }
  }
}