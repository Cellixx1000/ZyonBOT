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
                    //<!-- Verificamos se o usuário tem o emprego --!>
                    let engenheiroColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
                    let engenheiro1 = await engenheiroColeta.once('value')
                    let engenheiro = engenheiro1.val().arquiteto
                    //<!-- Verifica se o usuário tem o item do emprego --!>:
                    let tratorColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                    let trator1 = await tratorColeta.once('value')
                    let tratorItem = trator1.val().lapisItem
                    //<!-- Se ele não tiver, nós proibimos ele de usar o comando --!>
                    if (engenheiro == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui o emprego engenheiro rural. Caso você já possua 1,250 pontos de atividade, use: \`${prefixo}desbloquear engenheiro\`.`)
                    if (tratorItem == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, seus tratores acabaram. Visite a \`${prefixo}loja\` e compre mais alguns!`)
                    //<!-- Verificamos a database "Coowldown" para ver se o usuário já executou este comando --!>
                    let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                    let snap2 = await ref2.once('value')
                    let author = snap2.val().engenhar
                    let timeout = 300000;

                    if (author !== null && timeout - (Date.now() - author) > 0) {
                        let time = ms(timeout - (Date.now() - author));
                        let embedtempo = new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setTitle("⏰ Cooldown de uso")
                            .setDescription(`Olá ${message.author}, para utilizar este comando você deverá esperar mais um pouco!`)
                            .addField('⏱ Tempo restante para a liberação do comando', `\`\`\`cs\n${time.minutes} minuto(s) e ${time.seconds} segundo(s)\`\`\``)
                            .setFooter("Zyon™ ® Oficial 2020", client.user.avatarURL());
                        message.channel.send(embedtempo);
                    } else {
                        //<!-- Definição de algumas variáveis --!>
                        let rondou = Math.floor(Math.random() * 64) + 1;
                        let horas = Math.floor(Math.random() * 12) + 5;
                        //<!-- Aqui vamos atualizar as informações do jogador --!>
                        let saldoEmMaos1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let saldoEmMaos = await saldoEmMaos1.once('value')
                        let bal1 = saldoEmMaos.val().dinheiro
                        let bal2 = parseInt(bal1)
                        let amount = Math.floor(Math.random() * 2000) + 600;
                        let novoSaldo = parseInt(amount + bal2) 
                        let trator = tratorItem - 1
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: novoSaldo
                            })
                            database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                            .update({
                                lapisItem: trator
                            })
                        let novoSaldo3 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let novoSaldo2 = await novoSaldo3.once('value')
                        let saldoNovo = novoSaldo2.val().dinheiro

                        const mLenhador = new MessageEmbed()
                            .setTitle("👨‍🌾 Engenharia - Zyon:tm:")
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            // Removido
                            .setThumbnail('https://i.imgur.com/o2tp4NM.png')
                            .setDescription(`Você criou um sistema de irrigação para uma fazenda.`)
                            .addField('💰 Valor ganho', `${'```'}cs\nR$${amount.toLocaleString()}${'```'}`, true)
                            .addField('💸 Seu novo saldo em mãos', `${'```'}cs\nR$${saldoNovo.toLocaleString()}${'```'}`, true)
                            .setFooter('© Zyon™ 2021. Todos os direitos reservados.', client.user.avatarURL());
                            message.channel.send(mLenhador);
                            database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                              engenhar: Date.now()
                            })
    }
    //<!-- Aqui, definimos o nome do comando e suas configurações --!>
    } catch (e) {
        const erroCanal = client.channels.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`engenhar\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'engenhar'
      }
      }
    }