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
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }

    //<!-- Verificamos se é o criador --!>
    if(message.author.id != "796125693447635027") return message.channel.send(`🤯 | **${message.author.username}**, acho que você não é o meu criador!`)
    //<!-- Se for, seguimos... --!>
    if(!args[0]) {
            const mBlacklist = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setTitle(`<a:__:809531892150829086> Black List`)
            .setThumbnail(`https://i.imgur.com/zn8ARsd.png`)
            .setDescription(`Olá ${message.author.username}, bem-vindo(a) ao painel de Black List. Aqui você encontrará todas as informações necessárias para utilizar o sistema.`)
            .addField(`<:setazyon:809535885661962241> | Comandos do sistema`, `• \`blacklist add <usuário ID>\`\n• \`blacklist remover <usuário ID>\``)
            .addField(`<a:loading:801259440765534248> | Usuários na lista`, `Ufa! Nenhum até o momento.`)
            .setFooter('© Zyon™ 2021. Todos os Direitos Reservados.', client.user.avatarURL())
            message.channel.send(mBlacklist)
    }
    if(args[0] == "add") {
        const motivo = args.splice(2).join(" ")
        if(!args[1]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa me informar o ID do usuário que será adicionado na Black List.`)
        if(isNaN(args[1])) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o ID deve ser de um usuário válido.`)
        if(!motivo) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa me informar o motivo do porquê do usuário entrar na Black List.`)
        else {
            database.ref(`Black List/Usuários/${client.users.cache.get(args[1]).id}`)
            .update({
                "listado": "1",
                "motivo": `${motivo}`
            })
            message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, o usuário **${client.users.cache.get(args[1]).username}** foi adicionado com sucesso a Black List, o motivo foi **${motivo}**.`)
            const usuário = client.users.cache.get(args[1])
            usuário.send(`:no_entry_sign: | **${usuário.username}**, você foi adicionado a minha Black List e está impedido de executar meus comandos.`)
            usuário.send(`<:setazyon:809535885661962241> | Se você achou essa punição injusta, você tem todo o direito de pedir uma revisão para o meu criador, Polar#0005!`)
        }
    }
    if(args[0] == "remover") {
        const motivo = args.splice(2).join(" ")
        if(!args[1]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa me informar o ID do usuário que irá ser removido da Black List.`)
        if(isNaN(args[1])) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o ID deve ser de um usuário válido.`)
        if(!motivo) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa me informar o motivo do porquê do usuário sair na Black List.`)
        else {
            database.ref(`Black List/Usuários/${client.users.cache.get(args[1]).id}`)
            .update({
                "listado": "0",
                "motivo": `${motivo}`
            })
            message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, o usuário **${client.users.cache.get(args[1]).username}** foi removido com sucesso a Black List, o motivo foi **${motivo}**.`)
            const usuário = client.users.cache.get(args[1])
            usuário.send(`<:setazyon:809535885661962241> | **${usuário.username}**, você foi removido da minha Black List e está liberado para executar comandos novamente.`)
        }
    }
} catch (e) {
        const erroCanal = client.channels.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'blacklist'
      }
      }
    }