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
        return message.channel.send(`<:trix_errado:719330454875930777> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
    /*
    if(!message.member.hasPermission('MANAGE_GUILD', { checkAdmin: true, checkOwner: true })) return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, para utilizar este comando você deve possui a permissão \`GERENCIAR SERVIDOR\`.`)
    if(!args[0]) return message.channel.send(`<:Zyon_aviso:796998541133348864> | **${message.author.username}**, você deve escolher se irá \`ativar\` ou \`desativar\`!`)
    if(args[0] == "ativar") {
        let verificaA1 = await database.ref(`Eventos/Aniversário do Zyon/Servidores/${message.guild.id}`)
        let verificaA2 = await verificaA1.once('value')
        let verificaA = verificaA2.val()
        if(verificaA === null) {
            database.ref(`Eventos/Aniversário do Zyon/Servidores/${message.guild.id}`)
            .update({
                "ativado": true
            })
            const logs = client.channels.cache.get("797845747416301571")
            logs.send(`<:Zyon_ativado:797716521161195562> | **${message.guild.name}** (**${message.guild.memberCount.toLocaleString('pt-BR')}** membros) ativou o evento.`)
            return message.channel.send(`<:Zyon_ativado:797716521161195562> | **${message.author.username}**, o evento **Aniversário do Zyon:tm:** foi **ativado** no servidor!`)    
        }
        if(verificaA.ativado == true) return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, o evento já está ativado no servidor.`)
        database.ref(`Eventos/Aniversário do Zyon/Servidores/${message.guild.id}`)
        .update({
            "ativado": true
        })
        const logs = client.channels.cache.get("797845747416301571")
        logs.send(`<:Zyon_ativado:797716521161195562> | **${message.guild.name}** (**${message.guild.memberCount.toLocaleString('pt-BR')}** membros) ativou o evento.`)
        return message.channel.send(`<:Zyon_ativado:797716521161195562> | **${message.author.username}**, o evento **Aniversário do Zyon:tm:** foi **ativado** no servidor!`)
    }
    if(args[0] == "desativar") {
        let verificaA1 = await database.ref(`Eventos/Aniversário do Zyon/Servidores/${message.guild.id}`)
        let verificaA2 = await verificaA1.once('value')
        let verificaA = verificaA2.val()
        if(verificaA == null) return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, o evento já está **desativado** no servidor.`)
        if(verificaA.ativado == false) return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, o evento já está **desativado** no servidor.`)

        database.ref(`Eventos/Aniversário do Zyon/Servidores/${message.guild.id}`)
        .update({
            "ativado": false
        })
        const logs = client.channels.cache.get("797845747416301571")
        logs.send(`<:Zyon_desativado:797716521429630986> | **${message.guild.name}** (**${message.guild.memberCount.toLocaleString('pt-BR')}** membros) desativou o evento.`)
        return message.channel.send(`<:Zyon_desativado:797716521429630986> | **${message.author.username}**, o evento **Aniversário do Zyon:tm:** foi desativado no servidor!`)
    }*/
    message.channel.send(`😔 | ${message.author.username}, não há nenhum evento no momento...`)
    } catch (e) {
        const erroCanal = client.channels.cache.get('809515239480885269')
        message.channel.send(`<:trix_errado:719330454875930777> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`evento\``)
    }

},
    conf: {},
    get help () {
      return {
        name: 'evento'
      }
      }
    }