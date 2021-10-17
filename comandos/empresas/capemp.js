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
                return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
            }
            if (args[0] == "1" && args[1] == "1250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            capacidade: 1250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] 1,250\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "1" && args[1] == "1450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 10
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            capacidade: 1450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "2" && args[1] == "1250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            capacidade: 1250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] 1,250\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "2" && args[1] == "1450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 10
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            capacidade: 1450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "3" && args[1] == "1250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            capacidade: 1250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] 1,250\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "3" && args[1] == "1450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 10
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            capacidade: 1450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "4" && args[1] == "1250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            capacidade: 1250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] 1,250\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "4" && args[1] == "1450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 10
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            capacidade: 1450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "5" && args[1] == "1250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            capacidade: 1250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] 1,250\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "5" && args[1] == "1450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 10
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            capacidade: 1450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "6" && args[1] == "1250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            capacidade: 1250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] 1,250\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "6" && args[1] == "1450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 10
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            capacidade: 1450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "7" && args[1] == "1250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            capacidade: 1250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] 1,250\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "7" && args[1] == "1450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 1450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 10
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 1450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            capacidade: 1450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            //<!-- Parte 2 do comando --!>
            if (args[0] == "1" && args[1] == "2250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 20
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            capacidade: 2250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "1" && args[1] == "2450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 30
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            capacidade: 2450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "1" && args[1] == "3000") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade == 3000) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 40
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 3000 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            capacidade: 3000
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "2" && args[1] == "2250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 20
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            capacidade: 2250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "2" && args[1] == "2450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 30
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            capacidade: 2450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "2" && args[1] == "3000") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade == 3000) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 40
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 3000 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            capacidade: 3000
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "3" && args[1] == "2250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 20
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            capacidade: 2250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "3" && args[1] == "2450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 30
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            capacidade: 2450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "3" && args[1] == "3000") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade == 3000) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 40
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 3000 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            capacidade: 3000
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                } 
            } if (args[0] == "4" && args[1] == "2250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 20
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            capacidade: 2250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "14" && args[1] == "2450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 30
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            capacidade: 2450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "4" && args[1] == "3000") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade == 3000) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 40
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 3000 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            capacidade: 3000
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "5" && args[1] == "2250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 20
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            capacidade: 2250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "5" && args[1] == "2450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 30
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            capacidade: 2450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "5" && args[1] == "3000") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade == 3000) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 40
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 3000 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            capacidade: 3000
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "6" && args[1] == "2250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 20
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            capacidade: 2250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "6" && args[1] == "2450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 30
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            capacidade: 2450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "6" && args[1] == "3000") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade == 3000) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 40
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 3000 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            capacidade: 3000
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "7" && args[1] == "2250") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2250) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 20
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2250 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            capacidade: 2250
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } if (args[0] == "7" && args[1] == "2450") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade > 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui uma capacidade superior, de **${Empresas.capacidade.toLocaleString()}** produtos.`)
                else if(Empresas.capacidade == 2450) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 30
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 2450 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            capacidade: 2450
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            if (args[0] == "7" && args[1] == "3000") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                if(Empresas.capacidade == 3000) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já possui essa capacidade.`)
                else {
                    let nivelF = 40
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let nivel = nivelF - Empresas.nivel
                    if (Empresas.nivel < nivelF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **${nivel.toLocaleString()}** níveis para comprar esta capacidade.`)
                    let valorF = 3000 * 5
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - Empresas.cofre
                    if (Empresas.cofre < valorF) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta capacidade.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            capacidade: 3000
                        })
                    const final = Empresas.cofre - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            cofre: final
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("<:db:809531358388682762> Aumento de capacidade")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("<:db:809531358388682762> Nova capacidade", `\`\`\`cs\n[Capacidade] ${valorF/5}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Novo saldo no cofre", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
        } catch (e) {
            const erroCanal = client.channels.get('733875381131673661')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`capemp\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'capemp'
        }
    }
}