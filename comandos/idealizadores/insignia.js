const { MessageEmbed } = require('discord.js')
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
        return message.channel.send(`<a:erro:809516073799122945>| Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
      if(message.author.id != "796125693447635027" && message.author.id != "") return message.channel.send(`🤯 | **${message.author.username}**, acho que você não é o meu criador!`)
      else {
          if(!args[0]) {
            const mInsignia = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setTitle(`<:cnfg:809536862720229376> Insígnias Especiais`)
            .setThumbnail(`https://i.imgur.com/zn8ARsd.png`)
            .setDescription(`Olá ${message.author.username}, bem-vindo(a) ao painel de Insígnias Especiais. Aqui você encontrará todas as informações necessárias para utilizar o sistema.`)
            .addField(`<a:__:809531892150829086> | Comandos do sistema`, `• \`insignia add <usuário ID> <ID>\`\n• \`insiginia remover <usuário ID> <ID>\``)
            .addField(`<a:__:809531892150829086> | Insígnias Especiais disponíveis`, `Padrão: \`[ID] [Ícone] - Nome\`\n[01] [🛠️] - Dono\n[02] [<:javascript:809537188927766578>] - Programador\n[03] [✒] - Designer\n[04] [<:cnfg:809536862720229376>] - Equipe Zyon:tm:\n[05] [🕵️‍♀️] - Caçador(a) de Bugs`)
            .setFooter('© Zyon™ 2021. Todos os Direitos Reservados.', client.user.avatarURL())
            message.channel.send(mInsignia)
          }
          if(args[0] == "add") {
            const motivo = args.splice(2).join(" ")
            if(!args[1]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa me informar o ID do usuário que será recompensado com uma insígnia especial.`)
            if(isNaN(args[1])) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o ID deve ser de um usuário válido.`)
            if(!motivo) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa me informar o ID da insígnia especial.`)
            else {   
                database.ref(`Economia/Global/Insígnias/Usuário/${client.users.cache.get(args[1]).id}`)
                .update({
                    "cacadorBugs": true
                })
                message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, o usuário **${client.users.cache.get(args[1]).username}** recebeu a insígnia especial "Caçador(a) de bugs".`)
                const usuário = client.users.cache.get(args[1])
                usuário.send(`:tada: | **${usuário.username}**, você recebeu a insígnia especial "Caçador(a) de Bugs". Verifique o seu \`.info\`!`)
        }}
      }
    
    } catch (e) {
        const erroCanal = client.channels.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'insignia'
      }
      }
    }