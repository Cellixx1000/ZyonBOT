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
                    let quimicoColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
                    let quimico1 = await quimicoColeta.once('value')
                    let quimico = quimico1.val().advogado
                    //<!-- Verifica se o usuário tem o item do emprego --!>:
                    let matlabColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                    let matlab1 = await matlabColeta.once('value')
                    let matlabItem = matlab1.val().envelopesItem
                    //<!-- Se ele não tiver, nós proibimos ele de usar o comando --!>
                    if (quimico == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui o emprego programador. Caso você já possua 1,550 pontos de atividade, use: \`${prefixo}desbloquear programador\`.`)
                    if (matlabItem == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, seus laptops acabaram. Visite a \`${prefixo}loja\` e compre mais alguns!`)
                    //<!-- Verificamos a database "Coowldown" para ver se o usuário já executou este comando --!>
                    let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                    let snap2 = await ref2.once('value')
                    let author = snap2.val().pesquisar
                    let timeout = 300000;

                    if (author !== null && timeout - (Date.now() - author) > 0) {
                        let time = ms(timeout - (Date.now() - author));
                        let embedtempo = new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
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
                        let amount = Math.floor(Math.random() * 2500) + 700;
                        let novoSaldo = parseInt(amount + bal2) 
                        let matlab = matlabItem - 1
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: novoSaldo
                            })
                            database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                            .update({
                                envelopesItem: matlab
                            })


                        let novoSaldo3 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let novoSaldo2 = await novoSaldo3.once('value')
                        let saldoNovo = novoSaldo2.val().dinheiro
                        let replies = ['Você programou um bot para Discord e vendeu na internet.', 'Você criou um aplicativo de monitoramento de corrida e vendeu na internet.', 'Você programou um site e vendeu para uma empresa multinacional.', 'Você criou um site de hospedagens em hotéis e vendeu para uma empresa privada.', 'Você programou um sistema de rastreamento de pessoas e vendeu para o governo.']

                        let result = Math.floor(Math.random() * replies.length);
                        const mLenhador = new MessageEmbed()
                            .setTitle("👨‍💻 Desktop de Programação - Zyon:tm:")
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
                            // Removido
                            .setThumbnail('https://i.imgur.com/c3OI5W3.png')
                            .setDescription(`${replies[result]}`)
                            .addField('💰 Valor ganho', `${'```'}cs\nR$${amount.toLocaleString()}${'```'}`, true)
                            .addField('💸 Seu novo saldo em mãos', `${'```'}cs\nR$${saldoNovo.toLocaleString()}${'```'}`, true)
                            .setFooter('© Zyon™ 2021. Todos os direitos reservados.', client.user.avatarURL());
                            message.channel.send(mLenhador);
                            database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                              pesquisar: Date.now()
                            })
    }
    //<!-- Aqui, definimos o nome do comando e suas configurações --!>
    } catch (e) {
        const erroCanal = client.channels.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`pesquisar\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'programar'
      }
      }
    }