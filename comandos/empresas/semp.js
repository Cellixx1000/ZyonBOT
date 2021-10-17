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
                return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
            } else {

                if (args[0] == "1") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    var quantidade = parseInt(args.splice(1).join(" "))
                    if (message.content.includes('-')) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não pode sacar valores negativos.`)
                    }
                    if (!quantidade) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar o valor que deseja sacar do seu cofre da empresa. Exemplo: \`${prefixo}demp 1 10\``)
                    if (isNaN(quantidade)) return message.channel.send(`<a:erro:809516073799122945> |**${message.author.username}**, você deve me informar o valor em número.`)

                    let coins = snap.val().dinheiro
                    let banco = Empresas.cofre

                    if (quantidade > banco) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui toda essa quantidade em cofre.`)
                    }


                    let bancototal = parseInt(banco - quantidade);
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            cofre: bancototal
                        });

                    let coinstotal = parseInt(coins + quantidade)

                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: coinstotal
                        });
                    const mDeposito = new MessageEmbed()
                        .setTitle(`🏛 Extrato bancário de ` + message.author.tag)
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setDescription('Valor sacado com sucesso, informações abaixo!')
                        .addField("💸 Novo saldo em mãos", "```cs\nR$" + coinstotal.toLocaleString() + "```", true)
                        .addField("💰 Novo saldo em cofre", "```cs\nR$" + bancototal.toLocaleString() + "```", true)
                        .setTimestamp()
                    message.channel.send(mDeposito)

                }if (args[0] == "2") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    var quantidade = parseInt(args.splice(1).join(" "))
                    if (message.content.includes('-')) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não pode sacar valores negativos.`)
                    }
                    if (!quantidade) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar o valor que deseja sacar do seu cofre da empresa. Exemplo: \`${prefixo}demp 1 10\``)
                    if (isNaN(quantidade)) return message.channel.send(`<a:erro:809516073799122945> |**${message.author.username}**, você deve me informar o valor em número.`)

                    let coins = snap.val().dinheiro
                    let banco = Empresas.cofre

                    if (quantidade > banco) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui toda essa quantidade em cofre.`)
                    }


                    let bancototal = parseInt(banco - quantidade);
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            cofre: bancototal
                        });

                    let coinstotal = parseInt(coins + quantidade)

                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: coinstotal
                        });
                    const mDeposito = new MessageEmbed()
                        .setTitle(`🏛 Extrato bancário de ` + message.author.tag)
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setDescription('Valor sacado com sucesso, informações abaixo!')
                        .addField("💸 Novo saldo em mãos", "```cs\nR$" + coinstotal.toLocaleString() + "```", true)
                        .addField("💰 Novo saldo em cofre", "```cs\nR$" + bancototal.toLocaleString() + "```", true)
                        .setTimestamp()
                    message.channel.send(mDeposito)

                } if (args[0] == "3") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    var quantidade = parseInt(args.splice(1).join(" "))
                    if (message.content.includes('-')) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não pode sacar valores negativos.`)
                    }
                    if (!quantidade) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar o valor que deseja sacar do seu cofre da empresa. Exemplo: \`${prefixo}demp 1 10\``)
                    if (isNaN(quantidade)) return message.channel.send(`<a:erro:809516073799122945> |**${message.author.username}**, você deve me informar o valor em número.`)

                    let coins = snap.val().dinheiro
                    let banco = Empresas.cofre

                    if (quantidade > banco) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui toda essa quantidade em cofre.`)
                    }


                    let bancototal = parseInt(banco - quantidade);
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            cofre: bancototal
                        });

                    let coinstotal = parseInt(coins + quantidade)

                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: coinstotal
                        });
                    const mDeposito = new MessageEmbed()
                        .setTitle(`🏛 Extrato bancário de ` + message.author.tag)
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setDescription('Valor sacado com sucesso, informações abaixo!')
                        .addField("💸 Novo saldo em mãos", "```cs\nR$" + coinstotal.toLocaleString() + "```", true)
                        .addField("💰 Novo saldo em cofre", "```cs\nR$" + bancototal.toLocaleString() + "```", true)
                        .setTimestamp()
                    message.channel.send(mDeposito)

                } if (args[0] == "4") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    var quantidade = parseInt(args.splice(1).join(" "))
                    if (message.content.includes('-')) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não pode sacar valores negativos.`)
                    }
                    if (!quantidade) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar o valor que deseja sacar do seu cofre da empresa. Exemplo: \`${prefixo}demp 1 10\``)
                    if (isNaN(quantidade)) return message.channel.send(`<a:erro:809516073799122945> |**${message.author.username}**, você deve me informar o valor em número.`)

                    let coins = snap.val().dinheiro
                    let banco = Empresas.cofre

                    if (quantidade > banco) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui toda essa quantidade em cofre.`)
                    }


                    let bancototal = parseInt(banco - quantidade);
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            cofre: bancototal
                        });

                    let coinstotal = parseInt(coins + quantidade)

                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: coinstotal
                        });
                    const mDeposito = new MessageEmbed()
                        .setTitle(`🏛 Extrato bancário de ` + message.author.tag)
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setDescription('Valor sacado com sucesso, informações abaixo!')
                        .addField("💸 Novo saldo em mãos", "```cs\nR$" + coinstotal.toLocaleString() + "```", true)
                        .addField("💰 Novo saldo em cofre", "```cs\nR$" + bancototal.toLocaleString() + "```", true)
                        .setTimestamp()
                    message.channel.send(mDeposito)

                } if (args[0] == "5") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    var quantidade = parseInt(args.splice(1).join(" "))
                    if (message.content.includes('-')) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não pode sacar valores negativos.`)
                    }
                    if (!quantidade) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar o valor que deseja sacar do seu cofre da empresa. Exemplo: \`${prefixo}demp 1 10\``)
                    if (isNaN(quantidade)) return message.channel.send(`<a:erro:809516073799122945> |**${message.author.username}**, você deve me informar o valor em número.`)

                    let coins = snap.val().dinheiro
                    let banco = Empresas.cofre

                    if (quantidade > banco) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui toda essa quantidade em cofre.`)
                    }


                    let bancototal = parseInt(banco - quantidade);
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            cofre: bancototal
                        });

                    let coinstotal = parseInt(coins + quantidade)

                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: coinstotal
                        });
                    const mDeposito = new MessageEmbed()
                        .setTitle(`🏛 Extrato bancário de ` + message.author.tag)
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setDescription('Valor sacado com sucesso, informações abaixo!')
                        .addField("💸 Novo saldo em mãos", "```cs\nR$" + coinstotal.toLocaleString() + "```", true)
                        .addField("💰 Novo saldo em cofre", "```cs\nR$" + bancototal.toLocaleString() + "```", true)
                        .setTimestamp()
                    message.channel.send(mDeposito)

                } if (args[0] == "6") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    var quantidade = parseInt(args.splice(1).join(" "))
                    if (message.content.includes('-')) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não pode sacar valores negativos.`)
                    }
                    if (!quantidade) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar o valor que deseja sacar do seu cofre da empresa. Exemplo: \`${prefixo}demp 1 10\``)
                    if (isNaN(quantidade)) return message.channel.send(`<a:erro:809516073799122945> |**${message.author.username}**, você deve me informar o valor em número.`)

                    let coins = snap.val().dinheiro
                    let banco = Empresas.cofre

                    if (quantidade > banco) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui toda essa quantidade em cofre.`)
                    }


                    let bancototal = parseInt(banco - quantidade);
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            cofre: bancototal
                        });

                    let coinstotal = parseInt(coins + quantidade)

                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: coinstotal
                        });
                    const mDeposito = new MessageEmbed()
                        .setTitle(`🏛 Extrato bancário de ` + message.author.tag)
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setDescription('Valor sacado com sucesso, informações abaixo!')
                        .addField("💸 Novo saldo em mãos", "```cs\nR$" + coinstotal.toLocaleString() + "```", true)
                        .addField("💰 Novo saldo em cofre", "```cs\nR$" + bancototal.toLocaleString() + "```", true)
                        .setTimestamp()
                    message.channel.send(mDeposito)

                } if (args[0] == "7") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    var quantidade = parseInt(args.splice(1).join(" "))
                    if (message.content.includes('-')) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não pode sacar valores negativos.`)
                    }
                    if (!quantidade) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar o valor que deseja sacar dp seu cofre da empresa. Exemplo: \`${prefixo}demp 1 10\``)
                    if (isNaN(quantidade)) return message.channel.send(`<a:erro:809516073799122945> |**${message.author.username}**, você deve me informar o valor em número.`)

                    let coins = snap.val().dinheiro
                    let banco = Empresas.cofre

                    if (quantidade > banco) {
                        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui toda essa quantidade em cofre.`)
                    }


                    let bancototal = parseInt(banco - quantidade);
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            cofre: bancototal
                        });

                    let coinstotal = parseInt(coins + quantidade)

                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: coinstotal
                        });
                    const mDeposito = new MessageEmbed()
                        .setTitle(`🏛 Extrato bancário de ` + message.author.tag)
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setDescription('Valor sacado com sucesso, informações abaixo!')
                        .addField("💸 Novo saldo em mãos", "```cs\nR$" + coinstotal.toLocaleString() + "```", true)
                        .addField("💰 Novo saldo em cofre", "```cs\nR$" + bancototal.toLocaleString() + "```", true)
                        .setTimestamp()
                    message.channel.send(mDeposito)

                }
            }
            
        } catch (e) {
            const erroCanal = client.channels.get('733875381131673661')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`demp\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'semp'
        }
    }
}