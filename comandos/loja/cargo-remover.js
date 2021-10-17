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
        if (!args[0]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar a classificação do cargo na hierarquia (1, 2, 3, 4 ou 5).`)
  
        if (args[0] == "1") {
          const cargo = message.mentions.roles.first()
          let cName1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
          let cName2 = await cName1.once('value')
          let cName = message.guild.roles.cache.get(cName2.val().cargo01)
          if(typeof cName === "undefined") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, esse cargo não existe na loja.`)
          if(cName === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, esse cargo não existe na loja.`)
          database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
            .update({
              "cargo01": "0",
              "valor01": "0"
            })
          return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, tudo certo! O cargo **${cName.name}** foi removido da loja.`)
        }
        if (args[0] == "2") {
          const cargo = message.mentions.roles.first()
          let cName1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
          let cName2 = await cName1.once('value')
          let cName = message.guild.roles.cache.get(cName2.val().cargo02)
          if(typeof cName === "undefined") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, esse cargo não existe na loja.`)
          if(cName === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, esse cargo não existe na loja.`)
          database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
            .update({
              "cargo02": "0",
              "valor02": "0"
            })
          return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, tudo certo! O cargo **${cName.name}** foi removido da loja.`)
        }
        if (args[0] == "3") {
          const cargo = message.mentions.roles.first()
          let cName1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
          let cName2 = await cName1.once('value')
          let cName = message.guild.roles.cache.get(cName2.val().cargo03)
          if(typeof cName === "undefined") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, esse cargo não existe na loja.`)
          if(cName === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, esse cargo não existe na loja.`)

          database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
            .update({
              "cargo03": "0",
              "valor03": "0"
            })
          return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, tudo certo! O cargo **${cName.name}** foi removido da loja.`)
        }
        if (args[0] == "4") {
          const cargo = message.mentions.roles.first()
          let cName1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
          let cName2 = await cName1.once('value')
          let cName = message.guild.roles.cache.get(cName2.val().cargo04)
          if(typeof cName === "undefined") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, esse cargo não existe na loja.`)
          if(cName === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, esse cargo não existe na loja.`)

          database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
            .update({
              "cargo04": "0",
              "valor04": "0"
            })
          return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, tudo certo! O cargo **${cName.name}** foi removido da loja.`)
        }
        if (args[0] == "5") {
          const cargo = message.mentions.roles.first()
          let cName1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
          let cName2 = await cName1.once('value')
          let cName = message.guild.roles.cache.get(cName2.val().cargo05)
          if(typeof cName === "undefined") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, esse cargo não existe na loja.`)
          if(cName === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, esse cargo não existe na loja.`)

          database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
            .update({
              "cargo05": "0",
              "valor05": "0"
            })
          return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, tudo certo! O cargo **${cName.name}** foi removido da loja.`)
        }
      } catch (e) {
        const erroCanal = client.channels.cache.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`cargo-remover\``)
      }
    },
    conf: {},
    get help() {
      return {
        name: 'cargo-remover'
      }
    }
  }