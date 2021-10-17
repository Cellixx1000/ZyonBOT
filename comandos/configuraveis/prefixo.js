const Discord = require('discord.js')
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
    if(snap.val() == null){
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
      if(!args[0]) return message.channel.send(`<:terminal_Zyon:746405419479728219> | **${message.author.username}**, meu prefixo neste servidor é: \`${prefixo}\`!`)
      if(!message.member.hasPermission('MANAGE_GUILD', { checkAdmin: true, checkOwner: true })) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui a permissão \`GERENCIAR SERVIDOR\`!`);
      if(args[0].length > 2) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o prefixo deve conter somente **2** caracteres!`)
      if(args > 1) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o prefixo deve conter somente **1** argumento!`)
      if(message.content.includes(`-`)) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o prefixo \`-\` está proibido de ser utilizado pelos servidores para evitarmos conflitos com outros comandos.`)
      else {
     let novoPrefixo = args[0]
      database.ref(`Configurações/Servidores/${message.guild.id}/Prefixo`)
      .update({
          prefixo: novoPrefixo
      })
    let prefixoColeta4 = await database.ref(`Configurações/Servidores/${message.guild.id}/Prefixo`)
    let prefixoColeta5 = await prefixoColeta4.once('value')
    let prefixo2 = prefixoColeta5.val().prefixo
    message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, o meu prefixo neste servidor, agora, é: \`${prefixo2}\`!`)
    }
    //<!-- Aqui, definimos o nome do comando e suas configurações --!>
    } catch (e) {
        const erroCanal = client.channels.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`prefixo\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'prefixo'
      }
      }
    }