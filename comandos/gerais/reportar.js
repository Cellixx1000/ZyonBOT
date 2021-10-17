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
            if (snap.val() == null) {
                return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilze o comando \`${prefixo}registrar\` e use o comando de novo!`)
            }
            var description = args.join(' ');
            if (!description) return message.channel.send(message.author + ", você deve adicionar uma descrição sobre o bug encontrado!")
            if (!description[5]) return message.channel.send(message.author + ", a sua descrição está muito curta, tente ser mais claro!")
            let user = message.author
            const mReport = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                .setTitle("📩 Novo report!")
                .setDescription("Um novo report foi enviado para análise, verifiquem!")
                .addField('👥 Usuário:', `\`\`\`${message.author.tag} || ID: ${message.author.id}\`\`\``)
                .addField('🌍 Servidor:', `\`\`\`${message.guild.name}\`\`\``)
                .addField('📑 Descrição:', `\`\`\`${description}\`\`\``)
                .setFooter('Zyon Oficial ® 2020', client.user.avatarURL())
                .setThumbnail(message.author.avatarURL({ dynamic: true }))
            message.channel.send(message.author + ", muito obrigado por nos enviar o seu report, ele foi enviado para os meus desenvolvedores e será analisado!")
            const server = client.guilds.get('808196827161296922').channels.cache.get('809534412211486740')
            server.send(`<@&796125693447635027>`, mReport)
            //<!-- Aqui, definimos o nome do comando e suas configurações --!>
        } catch (e) {
            const erroCanal = client.channels.get('809515239480885269')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'reportar'
        }
    }
}