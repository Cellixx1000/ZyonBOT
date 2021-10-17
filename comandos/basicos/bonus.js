const { MessageEmbed } = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config.json')
const ms = require('parse-ms')

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
                return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilze o comando \`${prefixo}registrar\` e use o comando de novo!`)
            }
            if (!args[0]) {
                let user = message.author;
                let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${user.id}`)
                let snap2 = await ref2.once('value')
                let author = snap2.val().diario
                let timeout = 86400000;

                if (author !== null && timeout - (Date.now() - author) > 0) {
                    let time = ms(timeout - (Date.now() - author));
                    let embedtempo = new MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                        .setTitle("⏰ Cooldown de uso")
                        .setDescription(`Olá ${message.author}, para utilizar este comando você deverá esperar mais um pouco!`)
                        .addField('⏱ Tempo restante para a liberação do comando', `\`\`\`cs\n${time.hours} hora(s), ${time.minutes} minuto(s) e ${time.seconds} segundos\`\`\``)
                        // Removido
                        .setFooter("Zyon ® Oficial 2021", client.user.avatarURL());
                    message.channel.send(embedtempo);
                } else {
                    let amount = 800;
                    let dinheiroColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    let dinherioPegamos = await dinheiroColeta.once('value')
                    let saldo = dinherioPegamos.val().dinheiro
                    let novoSaldo = parseInt(saldo + amount)
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: novoSaldo
                        })

                    const mBonus = new MessageEmbed()
                        .setTitle(`📆 Bônus diário`)
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                        .setDescription(`Bônus diário coletado com sucesso! Execute-o novamente em 24h.`)
                        .addField(`🎁 Resgatou`, `\`\`\`cs\nR$${amount}\`\`\``, true)
                        .addField(`💸 Seu novo saldo em mãos`, `\`\`\`cs\nR$${novoSaldo.toLocaleString()}\`\`\``, true)
                        // Removido
                        .setFooter("Zyon ® Oficial 2021", client.user.avatarURL())
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setTimestamp()
                    message.channel.send(message.author, mBonus)
                    database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                        .update({
                            diario: Date.now()
                        })
                }
            }
            if (args[0] == "semanal") {
                let user = message.author;
                let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${user.id}`)
                let snap2 = await ref2.once('value')
                let weekly = snap2.val().semanal
                let timeout = 604800000;
                let amount = 2000;

                if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
                    let time = ms(timeout - (Date.now() - weekly));
                    let embedtempo = new MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                        .setTitle("⏰ Cooldown de uso")
                        .setDescription(`Olá ${message.author}, para utilizar este comando você deverá esperar mais um pouco!`)
                        .addField('⏱ Tempo restante para a liberação do comando', `\`\`\`cs\n${time.days} dia(s), ${time.hours} hora(s), ${time.minutes} minuto(s) e ${time.seconds} segundos\`\`\``)
                        //Removido
                        .setFooter("Zyon ® Oficial 2021", client.user.avatarURL());
                    message.channel.send(embedtempo);
                } else {
                    let dinheiroColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                let dinherioPegamos = await dinheiroColeta.once('value')
                let saldo = dinherioPegamos.val().dinheiro
                let novoSaldo = parseInt(saldo + amount)
                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        dinheiro: novoSaldo
                    })

                    const mBonus = new MessageEmbed()
                        .setTitle(`📅 Bônus semanal`)
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                        .setDescription(`Bônus semanal coletado com sucesso! Execute-o novamente em 7d.`)
                        .addField(`🎁 Resgatou`, `\`\`\`cs\nR$${amount.toLocaleString()}\`\`\``, true)
                        .addField(`💸 Seu novo saldo em mãos`, `\`\`\`cs\nR$${novoSaldo.toLocaleString()}\`\`\``, true)
                        //Removido
                        .setFooter("Zyon ® Oficial 2021", client.user.avatarURL())
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setTimestamp()
                    message.channel.send(message.author, mBonus)
                    database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                        .update({
                            semanal: Date.now()
                        })
                }
            }
            //<!-- Aqui, definimos o nome do comando e suas configurações --!>
        } catch (e) {
            const erroCanal = client.channels.get('809515239480885269')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`bonus\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'bonus'
        }
    }
}