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
            //<!-- Coletamos a pontuação do usuário --!>
            let pontosColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Pontos/Usuário/${message.author.id}`)
            let pontosColetou = await pontosColeta.once('value')
            let pontos = pontosColetou.val().pontos

            //<!-- Verificamos os argumentos --!>
            if (!args[0]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar qual emprego deseja desbloquear. Use \`${prefixo}empregos\` para ver quais você já pode resgatar!`)

            //<!-- Seguimos o comando para o desbloqueio dos empregos --!>
            else {
                //<!-- Se o argumento 1 for pescador, iremos desbloquear este emprego (ou não) --!>
                if (args[0] == "pescador") {
                   //<!-- Verificamos se o usuário tem os pontos suficientes para o emprego --!> 
                   if (pontos < 100) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você ainda não pode desbloquear este emprego. Verifique o comando \`${prefixo}empregos\`!`)
                   //<!-- Verificamos se o usuário já possui o emprego --!>
                   let coletaEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
                   let empregoColetou = await coletaEmprego.once('value')
                   let temEmprego = empregoColetou.val().cortador
                    if (temEmprego == true) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você já possui esse emprego!`)
                    if (temEmprego == 0) {
                        const mComprar = new MessageEmbed()
                            .setTitle("💼 Agência de Empregos")
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setDescription("Você desbloqueou um emprego com sucesso. Detalhes do emprego abaixo.")
                            .addField("🔓 Nome do emprego", "```cs\nPescador```", true)
                            .addField("🔹 Pontos requisitados", "```cs\n100```", true)
                            .setThumbnail(message.author.avatarURL({ dynamic: true }))
                            .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        message.channel.send(message.author, mComprar)
                        database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
                            .update({
                                cortador: true
                            })
                    }
                } else if (args[0] == "lenhador") {
                    //<!-- Verificamos se o usuário tem os pontos suficientes para o emprego --!> 
                    if (pontos < 250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você ainda não pode desbloquear este emprego. Verifique o comando \`${prefixo}empregos\`!`)
                    //<!-- Verificamos se o usuário já possui o emprego --!>
                    let coletaEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
                    let empregoColetou = await coletaEmprego.once('value')
                    let temEmprego = empregoColetou.val().algodoeiro
                    if (temEmprego == true) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você já possui esse emprego!`)
                    if (temEmprego == 0) {
                        const mComprar = new MessageEmbed()
                            .setTitle("💼 Agência de Empregos")
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setDescription("Você desbloqueou mais um emprego com sucesso. Detalhes do emprego abaixo.")
                            .addField("🔓 Nome do emprego", "```cs\nLenhador```", true)
                            .addField("🔹 Pontos requisitados", "```cs\n250```", true)
                            .setThumbnail(message.author.avatarURL({ dynamic: true }))
                            .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        message.channel.send(message.author, mComprar)
                        database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
                            .update({
                                algodoeiro: true
                            })
                    }
                } else if (args[0] == "cacador") {
                    //<!-- Verificamos se o usuário tem os pontos suficientes para o emprego --!> 
                    if (pontos < 400) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você ainda não pode desbloquear este emprego. Verifique o comando \`${prefixo}empregos\`!`)
                    //<!-- Verificamos se o usuário já possui o emprego --!>
                    let coletaEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
                    let empregoColetou = await coletaEmprego.once('value')
                    let temEmprego = empregoColetou.val().cafeicultor
                    if (temEmprego == true) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você já possui esse emprego!`)
                    if (temEmprego == 0) {
                        const mComprar = new MessageEmbed()
                            .setTitle("💼 Agência de Empregos")
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setDescription("Você desbloqueou mais um emprego com sucesso. Detalhes do emprego abaixo.")
                            .addField("🔓 Nome do emprego", "```cs\nCaçador```", true)
                            .addField("🔹 Pontos requisitados", "```cs\n400```", true)
                            .setThumbnail(message.author.avatarURL({ dynamic: true }))
                            .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        message.channel.send(message.author, mComprar)
                        database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
                            .update({
                                cafeicultor: true
                            })
                    }
                } else if (args[0] == "minerador") {
                   //<!-- Verificamos se o usuário tem os pontos suficientes para o emprego --!> 
                   if (pontos < 550) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você ainda não pode desbloquear este emprego. Verifique o comando \`${prefixo}empregos\`!`)
                   //<!-- Verificamos se o usuário já possui o emprego --!>
                   let coletaEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
                   let empregoColetou = await coletaEmprego.once('value')
                   let temEmprego = empregoColetou.val().minerador
                    if (temEmprego == true) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você já possui esse emprego!`)
                    if (temEmprego == 0) {
                        const mComprar = new MessageEmbed()
                            .setTitle("💼 Agência de Empregos")
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setDescription("Você desbloqueou mais um emprego com sucesso. Detalhes do emprego abaixo.")
                            .addField("🔓 Nome do emprego", "```cs\nMinerador```", true)
                            .addField("🔹 Pontos requisitados", "```cs\n550```", true)
                            .setThumbnail(message.author.avatarURL({ dynamic: true }))
                            .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        message.channel.send(message.author, mComprar)
                        database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
                            .update({
                                minerador: true
                            })
                    }
                } else if (args[0] == "policial") {
                    //<!-- Verificamos se o usuário tem os pontos suficientes para o emprego --!> 
                    if (pontos < 1000) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você ainda não pode desbloquear este emprego. Verifique o comando \`${prefixo}empregos\`!`)
                    //<!-- Verificamos se o usuário já possui o emprego --!>
                    let coletaEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
                    let empregoColetou = await coletaEmprego.once('value')
                    let temEmprego = empregoColetou.val().poeta
                    if (temEmprego == true) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você já possui esse emprego!`)
                    if (temEmprego == 0) {
                        const mComprar = new MessageEmbed()
                            .setTitle("💼 Agência de Empregos")
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setDescription("Você desbloqueou mais um emprego com sucesso. Detalhes do emprego abaixo.")
                            .addField("🔓 Nome do emprego", "```cs\nPolicial```", true)
                            .addField("🔹 Pontos requisitados", "```cs\n1,000```", true)
                            .setThumbnail(message.author.avatarURL({ dynamic: true }))
                            .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        message.channel.send(message.author, mComprar)
                        database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
                            .update({
                                poeta: true
                            })
                    }
                } else if (args[0] == "engenheiro") {
                    //<!-- Verificamos se o usuário tem os pontos suficientes para o emprego --!> 
                    if (pontos < 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você ainda não pode desbloquear este emprego. Verifique o comando \`${prefixo}empregos\`!`)
                    //<!-- Verificamos se o usuário já possui o emprego --!>
                    let coletaEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
                    let empregoColetou = await coletaEmprego.once('value')
                    let temEmprego = empregoColetou.val().arquiteto
                    if (temEmprego == true) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você já possui esse emprego!`)
                    if (temEmprego == 0) {
                        const mComprar = new MessageEmbed()
                            .setTitle("💼 Agência de Empregos")
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setDescription("Você desbloqueou mais um emprego com sucesso. Detalhes do emprego abaixo.")
                            .addField("🔓 Nome do emprego", "```cs\nEngenheiro```", true)
                            .addField("🔹 Pontos requisitados", "```cs\n1,250```", true)
                            .setThumbnail(message.author.avatarURL({ dynamic: true }))
                            .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        message.channel.send(message.author, mComprar)
                        database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
                            .update({
                                arquiteto: true
                            })
                    }
                } else if (args[0] == "programador") {
                    //<!-- Verificamos se o usuário tem os pontos suficientes para o emprego --!> 
                    if (pontos < 1550) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você ainda não pode desbloquear este emprego. Verifique o comando \`${prefixo}empregos\`!`)
                    //<!-- Verificamos se o usuário já possui o emprego --!>
                    let coletaEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
                    let empregoColetou = await coletaEmprego.once('value')
                    let temEmprego = empregoColetou.val().advogado
                    if (temEmprego == true) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você já possui esse emprego!`)
                    if (temEmprego == 0) {
                        const mComprar = new MessageEmbed()
                            .setTitle("💼 Agência de Empregos")
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setDescription("Você desbloqueou mais um emprego com sucesso. Detalhes do emprego abaixo.")
                            .addField("🔓 Nome do emprego", "```cs\nProgramador```", true)
                            .addField("🔹 Pontos requisitados", "```cs\n1,550```", true)
                            .setThumbnail(message.author.avatarURL({ dynamic: true }))
                            .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        message.channel.send(message.author, mComprar)
                        database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
                            .update({
                                advogado: true
                            })
                    }
                } else if (args[0] == "advogado") {
                    //<!-- Verificamos se o usuário tem os pontos suficientes para o emprego --!> 
                    if (pontos < 1750) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você ainda não pode desbloquear este emprego. Verifique o comando \`${prefixo}empregos\`!`)
                    //<!-- Verificamos se o usuário já possui o emprego --!>
                    let coletaEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
                    let empregoColetou = await coletaEmprego.once('value')
                    let temEmprego = empregoColetou.val().medico
                    if (temEmprego == true) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você já possui esse emprego!`)
                    if (temEmprego == 0) {
                        const mComprar = new MessageEmbed()
                            .setTitle("💼 Agência de Empregos")
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setDescription("Você desbloqueou mais um emprego com sucesso. Detalhes do emprego abaixo.")
                            .addField("🔓 Nome do emprego", "```cs\nAdvogado```", true)
                            .addField("🔹 Pontos requisitados", "```cs\n1,750```", true)
                            .setThumbnail(message.author.avatarURL({ dynamic: true }))
                            .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        message.channel.send(message.author, mComprar)
                        database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
                            .update({
                                medico: true
                            })
                    }
                }
            }

            //<!-- Aqui, definimos o nome do comando e suas configurações --!>
        } catch (e) {
            const erroCanal = client.channels.get('809515239480885269')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`desbloquear\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'desbloquear'
        }
    }
}