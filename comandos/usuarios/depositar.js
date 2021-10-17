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
            let ref = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
            let snap = await ref.once('value')
            let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Registros/Usuário/${message.author.id}`)
            let snap2 = await ref2.once('value')
            //<!-- Se os dados não existirem, o Zyon vai criá-los --!>
            if (snap2.val() == null) {
                return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilze o comando \`${prefixo}registrar\` e use o comando de novo!`)
            } else {

                var quantidade = parseInt(args.join(' '))
                if (message.content.includes('-')) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não pode depositar valores negativos.`)
                }
                if (!quantidade) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar o valor que deseja depositar no banco. Exemplo: \`${prefixo}depositar 10\``)
                if (isNaN(quantidade)) return message.channel.send(`<a:erro:809516073799122945> |**${message.author.username}**, você deve me informar o valor em número.`)

                let coins = snap.val().dinheiro
                let banco = snap.val().banco

                if (quantidade > coins) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui toda essa quantidade em mãos. Verifique o seu saldo!`)
                } else {

                    let bancototal = parseInt(banco + quantidade);
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            banco: bancototal
                        });

                    let coinstotal = parseInt(coins - quantidade)

                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: coinstotal
                        });
                    const mDeposito = new MessageEmbed()
                        .setTitle(`🏛 Extrato bancário de ` + message.author.tag)
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setDescription('Valor depositado com sucesso, informações abaixo!')
                        .addField("💸 Novo saldo em mãos", "```cs\nR$" + coinstotal.toLocaleString() + "```", true)
                        .addField("💰 Novo saldo bancário", "```cs\nR$" + bancototal.toLocaleString() + "```", true)
                        .setTimestamp()
                    message.channel.send(mDeposito)

                }
            }
        } catch (e) {
            const erroCanal = client.channels.get('809515239480885269')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`depositar\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'depositar',
            aliases: ['dep']
        }
    }
}