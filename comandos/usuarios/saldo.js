const { MessageEmbed } = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config.json')
const fs = require('fs')
const ms = require("parse-ms");
module.exports = {
  run: async function (client, message, args) {
      //<!-- Coletamos o prefixo do servidor --!>
      let prefixoColeta = await database.ref(`Configurações/Servidores/${message.guild.id}/Prefixo`)
      let prefixoColeta2 = await prefixoColeta.once('value')
      let prefixo = prefixoColeta2.val().prefixo
      //<!-- Coletamos os dados do servidor --!>
      let ref = await database.ref(`Economia/Servidor/${message.guild.id}/Registros/Usuário/${message.author.id}`)
      let snap = await ref.once('value')
      if(snap.val() == null){
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
      if(message.mentions.members.first()) {
        const author = client.users.cache.get(message.mentions.members.first().id)
        let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${author.id}`)
        let snap2 = await ref2.once('value')
        let ref3 = await database.ref(`Economia/Global/Bitcoin/Usuário/${author.id}`)
        let snap3 = await ref3.once('value')

        let coins = snap2.val().dinheiro
        let banco = snap2.val().banco
        let bitcoin = snap3.val().bitcoin

        let moneyEmbed = new MessageEmbed()
          .setTitle(`💼 Saldo de ${author.username}`)
          .setFooter("© Zyon™ 2020", client.user.avatarURL())
          .setThumbnail(author.avatarURL({ dynamic: true }))
          .addField("💸 Saldo em mãos", `\`\`\`cs\nR$${coins.toLocaleString()}\`\`\``, true)
          .addField("💰 Saldo bancário", `\`\`\`cs\nR$${banco.toLocaleString()}\`\`\``, true)
          .addField(`<:bitcoin:809525329701371926> Saldo de BitCoin`, `\`\`\`cs\n₿${bitcoin.toLocaleString()}\`\`\``, true)
          .setTimestamp()
        message.channel.send(message.author, moneyEmbed)
      } else {
      let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
      let snap2 = await ref2.once('value')
      let ref3 = await database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
      let snap3 = await ref3.once('value')
      //<!-- Se os dados não existirem, o Zyon vai criá-los --!>
      if (snap.val() == null) {
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilze o comando \`${prefixo}registrar\` e use o comando de novo!`)
      } else {
        let coins = snap2.val().dinheiro
        let banco = snap2.val().banco
        let bitcoin = snap3.val().bitcoin

        let moneyEmbed = new MessageEmbed()
          .setTitle(`💼 Saldo de ${message.author.username}`)
          .setFooter("© Zyon™ 2020", client.user.avatarURL())
          .setThumbnail(message.author.avatarURL({ dynamic: true }))
          .addField("💸 Saldo em mãos", `\`\`\`cs\nR$${coins.toLocaleString()}\`\`\``, true)
          .addField("💰 Saldo bancário", `\`\`\`cs\nR$${banco.toLocaleString()}\`\`\``, true)
          .addField(`<:bitcoin:809525329701371926> Saldo de BitCoin`, `\`\`\`cs\n₿${bitcoin.toLocaleString()}\`\`\``, true)
          .addField(`🎁 Bonificações`, `Esta área mudou, verifique no comando \`${prefixo}tempo\`!`)
          .setTimestamp()
        message.channel.send(message.author, moneyEmbed)
      }
    }
  },
  conf: {},
  get help() {
    return {
      name: 'saldo'
    }
  }
}