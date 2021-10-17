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
                        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
                    }
                    //<!-- Verificamos se o usuário tem o emprego --!>
                    let lenhadorColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
                    let lenhador1 = await lenhadorColeta.once('value')
                    let lenhador = lenhador1.val().algodoeiro
                    //<!-- Verifica se o usuário tem o item do emprego --!>:
                    let machadoColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
                    let machado1 = await machadoColeta.once('value')
                    let machadoTora = machado1.val().luvasItem
                    //<!-- Se ele não tiver, nós proibimos ele de usar o comando --!>
                    if (lenhador == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui o emprego lenhador. Caso você já possua 250 pontos de atividade, use: \`${prefixo}desbloquear lenhador\`.`)
                    if (machadoTora == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, seus machados acabaram. Visite a \`${prefixo}loja\` e compre mais alguns!`)
                    //<!-- Verificamos a database "Coowldown" para ver se o usuário já executou este comando --!>
                    let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                    let snap2 = await ref2.once('value')
                    let author = snap2.val().lenhar
                    let timeout = 180000;

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
                        let lenhou = Math.floor(Math.random() * 64) + 1;
                        let horas = Math.floor(Math.random() * 12) + 5;
                        //<!-- Aqui vamos atualizar as informações do jogador --!>
                        let saldoEmMaos1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let saldoEmMaos = await saldoEmMaos1.once('value')
                        let bal1 = saldoEmMaos.val().dinheiro
                        let bal2 = parseInt(bal1)

                        let amount = Math.floor(Math.random() * 300) + 50;
                        let valorganho = parseInt(amount)
                        let novoSaldo = parseInt(amount + bal2) 
                        let machado = machadoTora - 1
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                "dinheiro": novoSaldo
                            })
                            database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
                            .update({
                                "luvasItem": machado
                            })


                        let novoSaldo3 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let novoSaldo2 = await novoSaldo3.once('value')
                        let saldoNovo = novoSaldo2.val().dinheiro
                        let saldof = parseInt(saldoNovo)

                        const mLenhador = new MessageEmbed()
                            .setTitle("👨🏻‍🌾 Madereira - Zyon:tm:")
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            // Removido
                            .setThumbnail('https://i.imgur.com/o2tp4NM.png')
                            .setDescription(`Você cortou toras de madeira durante ${horas} horas e conseguiu coletar ${lenhou}<:madeira:682752888593711109>.`)
                            .addField('💰 Valor ganho', `${'```'}cs\nR$${valorganho.toLocaleString('pt-BR')}${'```'}`, true)
                            .addField('💸 Seu novo saldo em mãos', `${'```'}cs\nR$${saldof.toLocaleString('pt-BR')}${'```'}`, true)
                            .setFooter('© Zyon™ 2021. Todos os direitos reservados.', client.user.avatarURL());
                            message.channel.send(mLenhador);
                            database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                              lenhar: Date.now()
                            })
    }
    //<!-- Aqui, definimos o nome do comando e suas configurações --!>
    } catch (e) {
        const erroCanal = client.channels.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`lenhar\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'lenhar'
      }
      }
    }