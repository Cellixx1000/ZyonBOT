const { MessageEmbed } = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config.json')

module.exports = {
    run: async function (client, message, args) {
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
                return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não pode sacar valores negativos.`)
            }
            if (!quantidade) return message.channel.send(`<a:erro:809516073799122945> | ${message.author}, você deve me informar qual é a quantidade que deseja sacar!`)
            if (isNaN(quantidade)) return message.channel.send(`<a:erro:809516073799122945> | ${message.author}, você só pode sacar valores em números!`)

            let coins = snap.val().dinheiro
            let banco = snap.val().banco

            if (quantidade > banco) {
                return message.channel.send(`<a:erro:809516073799122945> | ${message.author}, você não tem todo esse valor no banco!`)
            } else {

                let bancototal = parseInt(banco - quantidade);
                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        banco: bancototal
                    });

                let coinstotal = parseInt(coins + quantidade)

                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        dinheiro: coinstotal
                    });

                let coins2 = snap.val().dinheiro
                let banco2 = snap.val().banco

                const mSacar = new MessageEmbed()
                    .setTitle(`🏛 Extrato bancário de ` + message.author.username)
                    .setDescription('Valor sacado com sucesso, informações abaixo!')
                    .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .addField("💸 Novo saldo em mãos", `\`\`\`cs\nR$${coinstotal.toLocaleString()}\`\`\``, true)
                    .addField("💰 Novo saldo bancário", `\`\`\`cs\nR$${bancototal.toLocaleString()}\`\`\``, true)
                    .setTimestamp()
                message.channel.send(message.author, mSacar)

            }
        }
    },
    conf: {},
    get help() {
        return {
            name: 'sacar',
            aliases: ['sac']
        }
    }
}