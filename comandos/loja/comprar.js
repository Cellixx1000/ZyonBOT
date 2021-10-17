const { MessageEmbed }= require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config.json')
const moment = require('moment')

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
                return message.channel.send(`<a:erro:809516073799122945>| Olá ${message.author}, por gentileza, utilze o comando \`${prefixo}registrar\` e use o comando de novo!`)
            }
            //<!-- Verificamos se existe um argumento --!>
            if (!args[0]) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve me informar qual produto deseja comprar. Visite a \`${prefixo}loja\` para ver os itens disponíveis.`)
            else if (args[0] == "vara") {
                //<!-- Verificamos a database do item  --!>
                let itensRef = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
                let itens = await itensRef.once('value')
                //<!-- Verificamos se tem um valor de itens --!>
                if (!args[1]) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa me informar a quantidade de varas de pesca que deseja comprar. Exemplo: \`${prefixo}comprar vara 12\`.`)
                if (isNaN(args[1])) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve me informar a quantidade em números! Exemplo: \`${prefixo}comprar vara 12\`.`)
                if (message.content.includes('-')) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você não pode comprar valores negativos!`)
                //<!-- Transformamos o argumento em valor --!>
                let valor = args.slice(1).join(' ')
                let valorF = 25 * valor
                let itensTotal = parseInt(valor) + itens.val().facaoItem
                //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                let saldo = valorF - snap.val().dinheiro
                if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este item.`)
                //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
                    .update({
                        "facaoItem": itensTotal
                    })
                const final = snap.val().dinheiro - valorF
                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        dinheiro: final
                    })
                const mComprar = new MessageEmbed()
                    .setTitle("📄 Nota fiscal - Zyon:tm:")
                    .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                    .addField("🏷 Nome do item", "```cs\n[Item] Vara de pesca```", true)
                    .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                    .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                message.channel.send(message.author, mComprar)
            } else if (args[0] == "machado") {
                //<!-- Verificamos a database do item  --!>
                let itensRef = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
                let itens = await itensRef.once('value')
                //<!-- Verificamos se tem um valor de itens --!>
                if (!args[1]) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa me informar a quantidade de machados que deseja comprar. Exemplo: \`${prefixo}comprar machado 12\`.`)
                if (isNaN(args[1])) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve me informar a quantidade em números! Exemplo: \`${prefixo}comprar machado 12\`.`)
                if (message.content.includes('-')) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você não pode comprar valores negativos!`)
                //<!-- Transformamos o argumento em valor --!>
                let valor = args.slice(1).join(' ')
                let valorF = 55 * valor
                let itensTotal = parseInt(valor) + itens.val().luvasItem
                //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                let saldo = valorF - snap.val().dinheiro
                if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este item.`)
                //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
                    .update({
                        luvasItem: itensTotal
                    })
                const final = snap.val().dinheiro - valorF
                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        dinheiro: final
                    })
                const mComprar = new MessageEmbed()
                    .setTitle("📄 Nota fiscal - Zyon:tm:")
                    .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                    .addField("🏷 Nome do item", "```cs\n[Item] Machado```", true)
                    .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                    .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                message.channel.send(message.author, mComprar)
            } else if (args[0] == "arco") {
                //<!-- Verificamos a database do item  --!>
                let itensRef = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
                let itens = await itensRef.once('value')
                //<!-- Verificamos se tem um valor de itens --!>
                if (!args[1]) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa me informar a quantidade de arcos que deseja comprar. Exemplo: \`${prefixo}comprar arco 12\`.`)
                if (isNaN(args[1])) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve me informar a quantidade em números! Exemplo: \`${prefixo}comprar arco 12\`.`)
                if (message.content.includes('-')) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você não pode comprar valores negativos!`)
                //<!-- Transformamos o argumento em valor --!>
                let valor = args.slice(1).join(' ')
                let valorF = 62 * valor
                let itensTotal = parseInt(valor) + itens.val().foiceItem
                //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                let saldo = valorF - snap.val().dinheiro
                if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este item.`)
                //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
                    .update({
                        foiceItem: itensTotal
                    })
                const final = snap.val().dinheiro - valorF
                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        dinheiro: final
                    })
                const mComprar = new MessageEmbed()
                    .setTitle("📄 Nota fiscal - Zyon:tm:")
                    .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                    .addField("🏷 Nome do item", "```cs\n[Item] Arco```", true)
                    .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                    .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                message.channel.send(message.author, mComprar)
            } else if (args[0] == "picareta") {
                //<!-- Verificamos a database do item  --!>
                let itensRef = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
                let itens = await itensRef.once('value')
                //<!-- Verificamos se tem um valor de itens --!>
                if (!args[1]) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa me informar a quantidade de picaretas que deseja comprar. Exemplo: \`${prefixo}comprar picareta 12\`.`)
                if (isNaN(args[1])) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve me informar a quantidade em números! Exemplo: \`${prefixo}comprar picareta 12\`.`)
                if (message.content.includes('-')) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você não pode comprar valores negativos!`)
                //<!-- Transformamos o argumento em valor --!>
                let valor = args.slice(1).join(' ')
                let valorF = 72 * valor
                let itensTotal = parseInt(valor) + itens.val().picaretaItem
                //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                let saldo = valorF - snap.val().dinheiro
                if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este item.`)
                //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
                    .update({
                        picaretaItem: itensTotal
                    })
                const final = snap.val().dinheiro - valorF
                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        dinheiro: final
                    })
                const mComprar = new MessageEmbed()
                    .setTitle("📄 Nota fiscal - Zyon:tm:")
                    .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                    .addField("🏷 Nome do item", "```cs\n[Item] Picareta```", true)
                    .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                    .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                message.channel.send(message.author, mComprar)
            } else if (args[0] == "viatura") {
                //<!-- Verificamos a database do item  --!>
                let itensRef = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                let itens = await itensRef.once('value')
                //<!-- Verificamos se tem um valor de itens --!>
                if (!args[1]) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa me informar a quantidade de viaturas que deseja comprar. Exemplo: \`${prefixo}comprar viatura 12\`.`)
                if (isNaN(args[1])) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve me informar a quantidade em números! Exemplo: \`${prefixo}comprar viatura 12\`.`)
                if (message.content.includes('-')) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você não pode comprar valores negativos!`)
                //<!-- Transformamos o argumento em valor --!>
                let valor = args.slice(1).join(' ')
                let valorF = 223 * valor
                let itensTotal = parseInt(valor) + itens.val().cadernoItem
                //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                let saldo = valorF - snap.val().dinheiro
                if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este item.`)
                //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                    .update({
                        cadernoItem: itensTotal
                    })
                const final = snap.val().dinheiro - valorF
                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        dinheiro: final
                    })
                const mComprar = new MessageEmbed()
                    .setTitle("📄 Nota fiscal - Zyon:tm:")
                    .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                    .addField("🏷 Nome do item", "```cs\n[Item] Viatura```", true)
                    .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                    .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                message.channel.send(message.author, mComprar)
            } else if (args[0] == "trator") {
                //<!-- Verificamos a database do item  --!>
                let itensRef = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                let itens = await itensRef.once('value')
                //<!-- Verificamos se tem um valor de itens --!>
                if (!args[1]) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa me informar a quantidade de tratores que deseja comprar. Exemplo: \`${prefixo}comprar trator 12\`.`)
                if (isNaN(args[1])) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve me informar a quantidade em números! Exemplo: \`${prefixo}comprar trator 12\`.`)
                if (message.content.includes('-')) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você não pode comprar valores negativos!`)
                //<!-- Transformamos o argumento em valor --!>
                let valor = args.slice(1).join(' ')
                let valorF = 327 * valor
                let itensTotal = parseInt(valor) + itens.val().lapisItem
                //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                let saldo = valorF - snap.val().dinheiro
                if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este item.`)
                //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                    .update({
                        lapisItem: itensTotal
                    })
                const final = snap.val().dinheiro - valorF
                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        dinheiro: final
                    })
                const mComprar = new MessageEmbed()
                    .setTitle("📄 Nota fiscal - Zyon:tm:")
                    .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                    .addField("🏷 Nome do item", "```cs\n[Item] Trator```", true)
                    .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                    .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                message.channel.send(message.author, mComprar)
            } else if (args[0] == "laptop") {
                //<!-- Verificamos a database do item  --!>
                let itensRef = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                let itens = await itensRef.once('value')
                //<!-- Verificamos se tem um valor de itens --!>
                if (!args[1]) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa me informar a quantidade de materiais de laboratório que deseja comprar. Exemplo: \`${prefixo}comprar matlab 12\`.`)
                if (isNaN(args[1])) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve me informar a quantidade em números! Exemplo: \`${prefixo}comprar matlab 12\`.`)
                if (message.content.includes('-')) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você não pode comprar valores negativos!`)
                //<!-- Transformamos o argumento em valor --!>
                let valor = args.slice(1).join(' ')
                let valorF = 492 * valor
                let itensTotal = parseInt(valor) + itens.val().envelopesItem
                //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                let saldo = valorF - snap.val().dinheiro
                if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este item.`)
                //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                    .update({
                        envelopesItem: itensTotal
                    })
                const final = snap.val().dinheiro - valorF
                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        dinheiro: final
                    })
                const mComprar = new MessageEmbed()
                    .setTitle("📄 Nota fiscal - Zyon:tm:")
                    .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                    .addField("🏷 Nome do item", "```cs\n[Item] Laptop```", true)
                    .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                    .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                message.channel.send(message.author, mComprar)
            }  else if (args[0] == "passagem") {
                //<!-- Verificamos a database do item  --!>
                let itensRef = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                let itens = await itensRef.once('value')
                //<!-- Verificamos se tem um valor de itens --!>
                if (!args[1]) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa me informar a quantidade de passagens que deseja comprar. Exemplo: \`${prefixo}comprar passagem 12\`.`)
                if (isNaN(args[1])) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você deve me informar a quantidade em números! Exemplo: \`${prefixo}comprar passagem 12\`.`)
                if (message.content.includes('-')) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você não pode comprar valores negativos!`)
                //<!-- Transformamos o argumento em valor --!>
                let valor = args.slice(1).join(' ')
                let valorF = 769 * valor
                let itensTotal = parseInt(valor) + itens.val().estetoscopioItem
                //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                let saldo = valorF - snap.val().dinheiro
                if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este item.`)
                //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                    .update({
                        estetoscopioItem: itensTotal
                    })
                const final = snap.val().dinheiro - valorF
                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        dinheiro: final
                    })
                const mComprar = new MessageEmbed()
                    .setTitle("📄 Nota fiscal - Zyon:tm:")
                    .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                    .addField("🏷 Nome do item", "```cs\n[Item] Passagem```", true)
                    .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                    .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                message.channel.send(message.author, mComprar)
            } else if (args[0] == "empresa" && args[1] == "1") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.estaAvenda == "Não") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a empresa \`${Empresas.nome}\` não está à venda no momento!`)
                let coletaEmpresa13 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                let coletaEmpresa3 = await coletaEmpresa13.once('value')
                let Empresas2 = coletaEmpresa3.val()
                if (Empresas2.possuiEmpresa == "Sim") return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma empresa (\`${Empresas2.nome}\`)!`)
                else {
                    //<!-- Transformamos o argumento em valor --!>
                    let valorF = Empresas.valor
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta empresa.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    let coletaDono1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                    let coletaDono = await coletaDono1.once('value')
                    let Dono = coletaDono.val()
                    const finalDono = Dono.dinheiro + valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                        .update({
                            dinheiro: finalDono
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${Empresas.usuario}`)
                        .update({
                            id: 0,
                            nome: 0,
                            possuiEmpresa: "Não",
                            usuario: Empresas.usuario
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            dono: message.author.tag,
                            estaAvenda: "Não",
                            nome: "Empresa de " + message.author.tag,
                            usuario: message.author.id,
                            descrição: "Hey " + message.author.username + "! Adicione uma descrição usando `" + prefixo + "descemp 1 <descrição>`!",
                            compradoEm: `${moment().format("LLLL")}`
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                        .update({
                            id: 1,
                            nome: "Empresa de " + message.author.tag,
                            possuiEmpresa: "Sim",
                            usuario: message.author.id
                        })

                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Empresa] ${Empresas.nome}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "empresa" && args[1] == "2") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.estaAvenda == "Não") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a empresa \`${Empresas.nome}\` não está à venda no momento!`)
                let coletaEmpresa13 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                let coletaEmpresa3 = await coletaEmpresa13.once('value')
                let Empresas2 = coletaEmpresa3.val()
                if (Empresas2.possuiEmpresa == "Sim") return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma empresa (\`${Empresas2.nome}\`)!`)
                else {
                    //<!-- Transformamos o argumento em valor --!>
                    let valorF = Empresas.valor
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta empresa.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    let coletaDono1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                    let coletaDono = await coletaDono1.once('value')
                    let Dono = coletaDono.val()
                    const finalDono = Dono.dinheiro + valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                        .update({
                            dinheiro: finalDono
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${Empresas.usuario}`)
                        .update({
                            id: 0,
                            nome: 0,
                            possuiEmpresa: "Não",
                            usuario: Empresas.usuario
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            dono: message.author.tag,
                            estaAvenda: "Não",
                            nome: "Empresa de " + message.author.tag,
                            usuario: message.author.id,
                            descrição: "Hey " + message.author.username + "! Adicione uma descrição usando `" + prefixo + "descemp 2 <descrição>`!",
                            compradoEm: `${moment().format("LLLL")}`
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                        .update({
                            id: 2,
                            nome: "Empresa de " + message.author.tag,
                            possuiEmpresa: "Sim",
                            usuario: message.author.id
                        })

                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Empresa] ${Empresas.nome}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "empresa" && args[1] == "3") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.estaAvenda == "Não") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a empresa \`${Empresas.nome}\` não está à venda no momento!`)
                let coletaEmpresa13 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                let coletaEmpresa3 = await coletaEmpresa13.once('value')
                let Empresas2 = coletaEmpresa3.val()
                if (Empresas2.possuiEmpresa == "Sim") return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma empresa (\`${Empresas2.nome}\`)!`)
                else {
                    //<!-- Transformamos o argumento em valor --!>
                    let valorF = Empresas.valor
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta empresa.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    let coletaDono1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                    let coletaDono = await coletaDono1.once('value')
                    let Dono = coletaDono.val()
                    const finalDono = Dono.dinheiro + valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                        .update({
                            dinheiro: finalDono
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${Empresas.usuario}`)
                        .update({
                            id: 0,
                            nome: 0,
                            possuiEmpresa: "Não",
                            usuario: Empresas.usuario
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            dono: message.author.tag,
                            estaAvenda: "Não",
                            nome: "Empresa de " + message.author.tag,
                            usuario: message.author.id,
                            descrição: "Hey " + message.author.username + "! Adicione uma descrição usando `" + prefixo + "descemp 3 <descrição>`!",
                            compradoEm: `${moment().format("LLLL")}`
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                        .update({
                            id: 3,
                            nome: "Empresa de " + message.author.tag,
                            possuiEmpresa: "Sim",
                            usuario: message.author.id
                        })

                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Empresa] ${Empresas.nome}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "empresa" && args[1] == "4") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.estaAvenda == "Não") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a empresa \`${Empresas.nome}\` não está à venda no momento!`)
                let coletaEmpresa13 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                let coletaEmpresa3 = await coletaEmpresa13.once('value')
                let Empresas2 = coletaEmpresa3.val()
                if (Empresas2.possuiEmpresa == "Sim") return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma empresa (\`${Empresas2.nome}\`)!`)
                else {
                    //<!-- Transformamos o argumento em valor --!>
                    let valorF = Empresas.valor
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta empresa.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    let coletaDono1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                    let coletaDono = await coletaDono1.once('value')
                    let Dono = coletaDono.val()
                    const finalDono = Dono.dinheiro + valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                        .update({
                            dinheiro: finalDono
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${Empresas.usuario}`)
                        .update({
                            id: 0,
                            nome: 0,
                            possuiEmpresa: "Não",
                            usuario: Empresas.usuario
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            dono: message.author.tag,
                            estaAvenda: "Não",
                            nome: "Empresa de " + message.author.tag,
                            usuario: message.author.id,
                            descrição: "Hey " + message.author.username + "! Adicione uma descrição usando `" + prefixo + "descemp 4 <descrição>`!",
                            compradoEm: `${moment().format("LLLL")}`
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                        .update({
                            id: 4,
                            nome: "Empresa de " + message.author.tag,
                            possuiEmpresa: "Sim",
                            usuario: message.author.id
                        })

                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Empresa] ${Empresas.nome}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "empresa" && args[1] == "5") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.estaAvenda == "Não") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a empresa \`${Empresas.nome}\` não está à venda no momento!`)
                let coletaEmpresa13 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                let coletaEmpresa3 = await coletaEmpresa13.once('value')
                let Empresas2 = coletaEmpresa3.val()
                if (Empresas2.possuiEmpresa == "Sim") return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma empresa (\`${Empresas2.nome}\`)!`)
                else {
                    //<!-- Transformamos o argumento em valor --!>
                    let valorF = Empresas.valor
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta empresa.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    let coletaDono1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                    let coletaDono = await coletaDono1.once('value')
                    let Dono = coletaDono.val()
                    const finalDono = Dono.dinheiro + valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                        .update({
                            dinheiro: finalDono
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${Empresas.usuario}`)
                        .update({
                            id: 0,
                            nome: 0,
                            possuiEmpresa: "Não",
                            usuario: Empresas.usuario
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            dono: message.author.tag,
                            estaAvenda: "Não",
                            nome: "Empresa de " + message.author.tag,
                            usuario: message.author.id,
                            descrição: "Hey " + message.author.username + "! Adicione uma descrição usando `" + prefixo + "descemp 5 <descrição>`!",
                            compradoEm: `${moment().format("LLLL")}`
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                        .update({
                            id: 5,
                            nome: "Empresa de " + message.author.tag,
                            possuiEmpresa: "Sim",
                            usuario: message.author.id
                        })

                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Empresa] ${Empresas.nome}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "empresa" && args[1] == "6") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.estaAvenda == "Não") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a empresa \`${Empresas.nome}\` não está à venda no momento!`)
                let coletaEmpresa13 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                let coletaEmpresa3 = await coletaEmpresa13.once('value')
                let Empresas2 = coletaEmpresa3.val()
                if (Empresas2.possuiEmpresa == "Sim") return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma empresa (\`${Empresas2.nome}\`)!`)
                else {
                    //<!-- Transformamos o argumento em valor --!>
                    let valorF = Empresas.valor
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta empresa.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    let coletaDono1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                    let coletaDono = await coletaDono1.once('value')
                    let Dono = coletaDono.val()
                    const finalDono = Dono.dinheiro + valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                        .update({
                            dinheiro: finalDono
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${Empresas.usuario}`)
                        .update({
                            id: 0,
                            nome: 0,
                            possuiEmpresa: "Não",
                            usuario: Empresas.usuario
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            dono: message.author.tag,
                            estaAvenda: "Não",
                            nome: "Empresa de " + message.author.tag,
                            usuario: message.author.id,
                            descrição: "Hey " + message.author.username + "! Adicione uma descrição usando `" + prefixo + "descemp 6 <descrição>`!",
                            compradoEm: `${moment().format("LLLL")}`
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                        .update({
                            id: 6,
                            nome: "Empresa de " + message.author.tag,
                            possuiEmpresa: "Sim",
                            usuario: message.author.id
                        })

                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Empresa] ${Empresas.nome}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "empresa" && args[1] == "7") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.estaAvenda == "Não") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a empresa \`${Empresas.nome}\` não está à venda no momento!`)
                let coletaEmpresa13 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                let coletaEmpresa3 = await coletaEmpresa13.once('value')
                let Empresas2 = coletaEmpresa3.val()
                if (Empresas2.possuiEmpresa == "Sim") return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma empresa (\`${Empresas2.nome}\`)!`)
                else {
                    //<!-- Transformamos o argumento em valor --!>
                    let valorF = Empresas.valor
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta empresa.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    let coletaDono1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                    let coletaDono = await coletaDono1.once('value')
                    let Dono = coletaDono.val()
                    const finalDono = Dono.dinheiro + valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${Empresas.usuario}`)
                        .update({
                            dinheiro: finalDono
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${Empresas.usuario}`)
                        .update({
                            id: 0,
                            nome: 0,
                            possuiEmpresa: "Não",
                            usuario: Empresas.usuario
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            dono: message.author.tag,
                            estaAvenda: "Não",
                            nome: "Empresa de " + message.author.tag,
                            usuario: message.author.id,
                            descrição: "Hey " + message.author.username + "! Adicione uma descrição usando `" + prefixo + "descemp 7 <descrição>`!",
                            compradoEm: `${moment().format("LLLL")}`
                        })
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                        .update({
                            id: 7,
                            nome: "Empresa de " + message.author.tag,
                            possuiEmpresa: "Sim",
                            usuario: message.author.id
                        })

                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Empresa] ${Empresas.nome}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "bg" && args[1] == "3") {
                let bg1 = await database.ref(`Background/BGS/Zyon 1/${message.author.id}`)
                let bg2 = await bg1.once('value')
                let bg = bg2.val()
                if(bg === null) {
                    database.ref(`Background/BGS/Zyon 2/${message.author.id}`)
                    .update({
                      possui: false,
                      usando: false,
                      link: `https://cdn.discordapp.com/attachments/809515908040884264/809522167393550376/orochi.png`,
                                          })
                    database.ref(`Background/BGS/Zyon 1/${message.author.id}`)
                    .update({
                      possui: false,
                      usando: false,
                      link: `https://cdn.discordapp.com/attachments/809515908040884264/809519826598494208/cachorro.png`,
                                          })
                    database.ref(`Background/BGS/Zyon 3/${message.author.id}`)
                    .update({
                      possui: false,
                      usando: false,
                      link: `https://cdn.discordapp.com/attachments/809515908040884264/809522588140830760/azideia.png`,
                                          })
                return message.channel.send(`<:Zyon_databse:797312622571683871> | **${message.author.username}**, você foi registrado na database \`background_anime\`. Execute o comando novamente!`)
                }
                else {
                    if(bg.possui == true) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você já possui este background!`)
                    //<!-- Pegamos o bitcoin --!>
                    let bit1 = await database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                    let bit2 = await bit1.once('value')
                    let bit = bit2.val().bitcoin
                    //<!-- Transformamos o argumento em valor --!>
                    let valorF = 80
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - bit
                    if (bit < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **₿${saldo.toLocaleString()}** para comprar este background.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = bit - valorF
                    database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                        .update({
                            bitcoin: final
                        })
                    database.ref(`Background/BGS/Zyon 1/${message.author.id}`)
                        .update({
                            possui: true,
                            usando: false,
                            link: `https://cdn.discordapp.com/attachments/809515908040884264/809519826598494208/cachorro.png`,
                                                    })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Background] Zyon 1\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\n₿${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\n₿ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "bg" && args[1] == "4") {
                let bg1 = await database.ref(`Background/BGS/Zyon 2/${message.author.id}`)
                let bg2 = await bg1.once('value')
                let bg = bg2.val()
                if(bg === null) {
                    database.ref(`Background/BGS/Zyon 2/${message.author.id}`)
                    .update({
                      possui: false,
                      usando: false,
                      link: `https://cdn.discordapp.com/attachments/809515908040884264/809522167393550376/orochi.png`,
                                          })
                    database.ref(`Background/BGS/Zyon 1/${message.author.id}`)
                    .update({
                      possui: false,
                      usando: false,
                      link: `https://cdn.discordapp.com/attachments/809515908040884264/809519826598494208/cachorro.png`,
                                          })
                    database.ref(`Background/BGS/Zyon 3/${message.author.id}`)
                    .update({
                      possui: false,
                      usando: false,
                      link: `https://cdn.discordapp.com/attachments/809515908040884264/809522588140830760/azideia.png`,
                                          })
                return message.channel.send(`<:Zyon_databse:797312622571683871> | **${message.author.username}**, você foi registrado na database \`background_anime\`. Execute o comando novamente!`)
                }
                else {
                    if(bg.possui == true) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você já possui este background!`)
                    //<!-- Pegamos o bitcoin --!>
                    let bit1 = await database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                    let bit2 = await bit1.once('value')
                    let bit = bit2.val().bitcoin
                    //<!-- Transformamos o argumento em valor --!>
                    let valorF = 80
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - bit
                    if (bit < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **₿${saldo.toLocaleString()}** para comprar este background.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = bit - valorF
                    database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                        .update({
                            bitcoin: final
                        })
                    database.ref(`Background/BGS/Zyon 2/${message.author.id}`)
                        .update({
                            possui: true,
                            usando: false,
                            link: `https://cdn.discordapp.com/attachments/809515908040884264/809522167393550376/orochi.png`,
                            direitos: "Todos os direitos de imagens ('backgrounds') reservados ao(s) criador(es): Sunrise."
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Background] Zyon 2\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\n₿${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\n₿ " + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "bg" && args[1] == "5") {
                    let bg1 = await database.ref(`Background/BGS/Zyon 3/${message.author.id}`)
                    let bg2 = await bg1.once('value')
                    let bg = bg2.val()
                    if(bg === null) {
                        database.ref(`Background/BGS/Zyon 2/${message.author.id}`)
                        .update({
                          possui: false,
                          usando: false,
                          link: `https://cdn.discordapp.com/attachments/809515908040884264/809522167393550376/orochi.png`,
                                                  })
                        database.ref(`Background/BGS/Zyon 1/${message.author.id}`)
                        .update({
                          possui: false,
                          usando: false,
                          link: `https://cdn.discordapp.com/attachments/809515908040884264/809519826598494208/cachorro.png`,
                                                  })
                        database.ref(`Background/BGS/Zyon 3/${message.author.id}`)
                        .update({
                          possui: false,
                          usando: false,
                          link: `https://cdn.discordapp.com/attachments/809515908040884264/809522588140830760/azideia.png`,
                                                  })
                    return message.channel.send(`<:database:809523872696107038> | **${message.author.username}**, você foi registrado na database \`background_anime\`. Execute o comando novamente!`)
                    }
                    else {
                        if(bg.possui == true) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você já possui este background!`)
                        //<!-- Pegamos o bitcoin --!>
                        let bit1 = await database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                        let bit2 = await bit1.once('value')
                        let bit = bit2.val().bitcoin
                        //<!-- Transformamos o argumento em valor --!>
                        let valorF = 80
                        //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                        let saldo = valorF - bit
                        if (bit < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **₿${saldo.toLocaleString()}** para comprar este background.`)
                        //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                        const final = bit - valorF
                        database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                            .update({
                                bitcoin: final
                            })
                        database.ref(`Background/BGS/Zyon 3/${message.author.id}`)
                            .update({
                                possui: true,
                                usando: false,
                                link: `https://cdn.discordapp.com/attachments/809515908040884264/809522588140830760/azideia.png`,
                                                            })
                        //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                        const mComprar = new MessageEmbed()
                            .setTitle("📄 Nota fiscal - Zyon:tm:")
                            .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                            .addField("🏷 Nome do item", `\`\`\`cs\n[Background] Zyon 3\`\`\``, true)
                            .addField("⛔ Valor cobrado", `\`\`\`cs\n₿${valorF.toLocaleString()}\`\`\``, true)
                            .addField("💸 Seu novo saldo", "```cs\n₿ " + final.toLocaleString() + "```", true)
                            .setThumbnail(message.author.avatarURL({ dynamic: true }))
                            .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                        message.channel.send(message.author, mComprar)
                        }
            } //<!-- Iniciamos as armas... --!>
            else if (args[0] == "m4a1") {
                let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let m4a1 = arsenal.val().m4a1
                if(m4a1 == true) return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma **M4A1**!`)
                else {
                    let valorF = 32000
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta arma.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                        database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                        .update({
                            m4a1: true
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Arma] M4A1\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$" + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "ak47") {
                let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let ak47 = arsenal.val().ak47
                if(ak47 == true) return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma **AK-47**!`)
                else {
                    let valorF = 25000
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta arma.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                        database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                        .update({
                            ak47: true
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Arma] AK-47\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$" + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }else if (args[0] == "m4-H") {
                let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let m4a1 = arsenal.val().m4a1S
                if(m4a1 == true) return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui a skin **M4A1 Halloween**!`)
                else {
                    let valorF = 70
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let bit1 = await database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                    let bit2 = await bit1.once('value')
                    let bit = bit2.val().bitcoin
                    let saldo = valorF - bit
                    if (bit < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **₿${saldo.toLocaleString()}** para comprar esta skin.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = bit - valorF
                    database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                        .update({
                            bitcoin: final
                        })
                        database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                        .update({
                            m4a1S: true
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Arma] M4A1 Halloween\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\n₿${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\n₿" + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }else if (args[0] == "m4-h") {
                let arsenalRef = await database.ref(`Economia/Global/Bitcoin/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let m4a1 = arsenal.val().m4a1S
                if(m4a1 == true) return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui a skin **M4A1 Halloween**!`)
                else {
                    let valorF = 70
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let bit1 = await database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                    let bit2 = await bit1.once('value')
                    let bit = bit2.val().bitcoin
                    let saldo = valorF - bit
                    if (bit < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **₿${saldo.toLocaleString()}** para comprar esta skin.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = bit - valorF
                    database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                        .update({
                            bitcoin: final
                        })
                        database.ref(`Economia/Global/Bitcoin/Arsenal/Usuário/${message.author.id}`)
                        .update({
                            m4a1S: true
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Arma] M4A1 Halloween\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\n₿${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\n₿" + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "remington") {
                let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let remington = arsenal.val().remington
                if(remington == true) return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma **Remington**!`)
                else {
                    let valorF = 18000
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta arma.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                        database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                        .update({
                            remington: true
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Arma] Remington\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$" + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "revolver") {
                let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let revolver = arsenal.val().revólver
                if(revolver == true) return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma **Revólver**!`)
                else {
                    let valorF = 10000
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta arma.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                        database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                        .update({
                            revólver: true
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Arma] Revólver\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$" + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            } else if (args[0] == "pistola") {
                let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let pistola = arsenal.val().pistola
                if(pistola == true) return message.channel.send(`<a:erro:809516073799122945>| ${message.author.username}, você já possui uma **Pistola**!`)
                else {
                    let valorF = 2500
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar esta arma.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                        database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                        .update({
                            pistola: true
                        })
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Arma] Pistola\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString()}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$" + final.toLocaleString() + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            //<!-- Loja de Cargos --!>
            else if(args[0] == "cargo" && args[1] == "1") {
                let dbCargos1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
                let dbCargos2 = await dbCargos1.once('value')
                let dbCargos = dbCargos2.val()
                if(dbCargos.cargo01 == "0") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a administração do servidor ainda não escolheu um cargo para esse slot.`)
                if(message.member.roles.cache.get(dbCargos.cargo01)) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você já possui esse cargo.`)
                else {
                    let valorF = parseInt(dbCargos.valor01)
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este cargo.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    message.member.roles.add(dbCargos.cargo01)
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Cargo] ${message.guild.roles.cache.get(dbCargos.cargo01).name}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$" + final.toLocaleString('pt-BR') + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            else if(args[0] == "cargo" && args[1] == "2") {
                let dbCargos1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
                let dbCargos2 = await dbCargos1.once('value')
                let dbCargos = dbCargos2.val()
                if(dbCargos.cargo02 == "0") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a administração do servidor ainda não escolheu um cargo para esse slot.`)
                if(message.member.roles.cache.get(dbCargos.cargo02)) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você já possui esse cargo.`)
                else {
                    let valorF = parseInt(dbCargos.valor02)
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este cargo.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    message.member.roles.add(dbCargos.cargo02)
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Cargo] ${message.guild.roles.cache.get(dbCargos.cargo02).name}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$" + final.toLocaleString('pt-BR') + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            else if(args[0] == "cargo" && args[1] == "3") {
                let dbCargos1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
                let dbCargos2 = await dbCargos1.once('value')
                let dbCargos = dbCargos2.val()
                if(dbCargos.cargo03 == "0") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a administração do servidor ainda não escolheu um cargo para esse slot.`)
                if(message.member.roles.cache.get(dbCargos.cargo03)) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você já possui esse cargo.`)
                else {
                    let valorF = parseInt(dbCargos.valor03)
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este cargo.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    message.member.roles.add(dbCargos.cargo03)
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Cargo] ${message.guild.roles.cache.get(dbCargos.cargo03).name}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$" + final.toLocaleString('pt-BR') + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            else if(args[0] == "cargo" && args[1] == "4") {
                let dbCargos1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
                let dbCargos2 = await dbCargos1.once('value')
                let dbCargos = dbCargos2.val()
                if(dbCargos.cargo04 == "0") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a administração do servidor ainda não escolheu um cargo para esse slot.`)
                if(message.member.roles.cache.get(dbCargos.cargo04)) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você já possui esse cargo.`)
                else {
                    let valorF = parseInt(dbCargos.valor04)
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este cargo.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    message.member.roles.add(dbCargos.cargo04)
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Cargo] ${message.guild.roles.cache.get(dbCargos.cargo04).name}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$" + final.toLocaleString('pt-BR') + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
            else if(args[0] == "cargo" && args[1] == "5") {
                let dbCargos1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
                let dbCargos2 = await dbCargos1.once('value')
                let dbCargos = dbCargos2.val()
                if(dbCargos.cargo05 == "0") return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, a administração do servidor ainda não escolheu um cargo para esse slot.`)
                if(message.member.roles.cache.get(dbCargos.cargo05)) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você já possui esse cargo.`)
                else {
                    let valorF = parseInt(dbCargos.valor05)
                    //<!-- Verifica se o usuário possui o dinheiro necessário --!>
                    let saldo = valorF - snap.val().dinheiro
                    if (snap.val().dinheiro < valorF) return message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, você precisa de mais **R$${saldo.toLocaleString()}** para comprar este cargo.`)
                    //<!-- Se ele tiver o dinheiro e não tiver a empresa, nós vendemos ela --!>
                    const final = snap.val().dinheiro - valorF
                    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        .update({
                            dinheiro: final
                        })
                    message.member.roles.add(dbCargos.cargo05)
                    //<!-- Finalizamos enviando a mensagem de confirmação da compra --!>
                    const mComprar = new MessageEmbed()
                        .setTitle("📄 Nota fiscal - Zyon:tm:")
                        .setDescription("Sua compra foi finalizada com sucesso. Obrigado e volte sempre! Detalhes da compra abaixo.")
                        .addField("🏷 Nome do item", `\`\`\`cs\n[Cargo] ${message.guild.roles.cache.get(dbCargos.cargo05).name}\`\`\``, true)
                        .addField("⛔ Valor cobrado", `\`\`\`cs\nR$${valorF.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField("💸 Seu novo saldo", "```cs\nR$" + final.toLocaleString('pt-BR') + "```", true)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                    message.channel.send(message.author, mComprar)
                }
            }
        } catch (e) {
            const erroCanal = client.channels.cache.get('757039620054712400')
            message.channel.send(`<a:erro:809516073799122945>| **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`comprar\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'comprar'
        }
    }
}