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
      if(message.author.id != "796125693447635027" && message.author.id != "") return message.channel.send(`🤯 | **${message.author.username}**, acho que você não é o meu criador!`)
      if(!args[0]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa me informar se irá \`iniciar\` ou \`finalizar\`.`)
      else {
        if(args[0] == "iniciar") {
        const motivo = args.splice(1).join(" ")
        if(!motivo) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa me informar o motivo da manutenção.`)
        const mStatus = new MessageEmbed()
        .setAuthor(`Iniciada por ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .setTitle(`<a:__:809531892150829086> Atualização de Status`)
        .setThumbnail(`https://i.imgur.com/tubpud4.png`)
        .setDescription(`Olá usuários, estarei passando por uma manutenção em meu sistema. Voltarei em alguns minutos, informações abaixo.`)
        .addField(`<:setazyon:809535885661962241> | Motivo`, `${motivo}`)
        .addField(`<:setazyon:809535885661962241> | Previsão de volta`, `em 10 minutos`)
        .setFooter('© Zyon™ 2021. Todos os Direitos Reservados.', client.user.avatarURL())
        message.delete(message.author)
        message.channel.send(`<@&796125693447635027>`, mStatus).then(async reacm => {
          await reacm.react("✅");
        })
        }
        if(args[0] == "finalizar") {
          const mStatus = new MessageEmbed()
          .setAuthor(`Finalizada por ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
          .setTitle(`<a:__:809531892150829086> Atualização de Status`)
          .setThumbnail(`https://i.imgur.com/tubpud4.png`)
          .setDescription(`Olá usuários, a minha mantenção foi finalizada e completa. Agradeço a paciência!`) 
          .setFooter('© Zyon™ 2021. Todos os Direitos Reservados.', client.user.avatarURL())
          message.delete(message.author)
          message.channel.send(`<@&796125693447635027>`, mStatus).then(async reacm => {
            await reacm.react("✅");
          })
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
        name: 'status'
      }
      }
    }