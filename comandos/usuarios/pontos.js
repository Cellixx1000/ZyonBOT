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
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilze o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
    if(!message.mentions.members.first()) {
    let pontosColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Pontos/Usuário/${message.author.id}`)
    let pontos1 = await pontosColeta.once('value')
    let pontosTotais = pontos1.val().pontos
    message.channel.send(`🔹 | **${message.author.username}**, você possui **${pontosTotais.toLocaleString()}** pontos de atividade.`)
    }
    else {
    const author = client.users.cache.get(message.mentions.members.first().id)
    let pontosColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Pontos/Usuário/${author.id}`)
    let pontos1 = await pontosColeta.once('value')
    let pontosTotais = pontos1.val().pontos
    message.channel.send(`🔹 | **${message.author.username}**, o(a) usuário(a) **${author.username}** possui **${pontosTotais.toLocaleString()}** pontos de atividade.`)
    }
    //<!-- Aqui, definimos o nome do comando e suas configurações --!>
    } catch (e) {
        const erroCanal = client.channels.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'pontos'
      }
      }
    }