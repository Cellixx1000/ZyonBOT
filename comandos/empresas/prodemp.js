const { MessageEmbed } = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config.json')
const fs = require('fs')
const ms = require("parse-ms");
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
            } else {
                let user = message.author;
                let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${user.id}`)
                let snap2 = await ref2.once('value')
                let author = snap2.val().produção
                let timeout = 420000;

                if (author !== null && timeout - (Date.now() - author) > 0) {
                    let time = ms(timeout - (Date.now() - author));
                    let embedtempo = new MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                        .setTitle("⏰ Cooldown de uso")
                        .setDescription(`Olá ${message.author}, para utilizar este comando você deverá esperar mais um pouco!`)
                        .addField('⏱ Tempo restante para a liberação do comando', `\`\`\`cs\n${time.minutes} minuto(s) e ${time.seconds} segundos\`\`\``)
                        .setFooter("Zyon™ ® Oficial 2020", client.user.avatarURL());
                    return message.channel.send(embedtempo);
                }
                //<!-- Coletamos as empresas --!
                let coletaEmpresa21 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                let coletaEmpresa81 = await coletaEmpresa21.once('value')
                let Empresas212 = coletaEmpresa81.val().possuiEmpresa
                //-------------------------------
                if (Empresas212 == "Não") {
                    message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui uma empresa. Verifique se existe alguma à venda, use: \`${prefixo}empresas\`!`)
                }
                if (!args[0]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar o ID da sua empresa, caso não saiba, visite o comando \`${prefixo}empresas\`.`)
                else {
                    if (args[0] == "1") {
                        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        let coletaEmpresa = await coletaEmpresa1.once('value')
                        let Empresas = coletaEmpresa.val()
                        if (Empresas.usuario != message.author.id) {
                            return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                        }
                        //<!-- Pegamos alguns dados --!>
                        let produtoAtual = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        let produtoAtual1 = await produtoAtual.once('value')
                        let produto = produtoAtual1.val().produtos

                        let produtoCap1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        let produtoCap2 = await produtoCap1.once('value')
                        let produtoCap = produtoCap2.val().capacidade

                        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        let xpColeta2 = await xpColeta.once('value')
                        let xp = xpColeta2.val().xp

                        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        let levelColeta2 = await levelColeta.once('value')
                        let level = levelColeta2.val().nivel
                        let proximoNivel = level * 650

                        let ganhouXp = Math.floor(Math.random() * 25)
                        let ganhouProduto = Math.floor(Math.random() * 40) + 10
                        let verificaCap = ganhouProduto + produto
let totalProds = ganhouProduto + produto
                        if (verificaCap > produtoCap) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está em capacidade máxima. Venda alguns produtos ou visite a loja para comprar uma capacidade maior.`)
                        if (xp >= proximoNivel) {
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                                .update({
                                    nivel: level + 1,
                                    valor: Empresas.valor + 450
                                })
                            message.channel.send(`<a:clapclapclap:808197706321100810> |** ${message.author.username}**, a sua empresa subiu de nível! Veja em \`${prefixo}xpemp\`.`)
                        }
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                            .update({
                                xp: xp + ganhouXp
                            })
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                            .update({
                                produtos: produto + ganhouProduto
                            })
                        //<!-- Coletamos novamente, agora com os novos dados --!>
                        let produtoAtual2 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        let produtoAtual12 = await produtoAtual2.once('value')
                        let produto2 = produtoAtual12.val().produtos

                        let xpColeta223 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        let xpColeta22 = await xpColeta223.once('value')
                        let xp2 = xpColeta22.val().xp
                        //<!-- Algumas frases --!>
                        let frases = ['Sua empresa produziu cerca de 40% de sua média comum.', 'Sua empresa gerou uma quantia maior de produtos.']
                        let resultado = frases[Math.floor(Math.random() * frases.length)];
                        //<!-- Enviamos a embed final --!>
                        let mEmpresa01 = new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setTitle(`🏛 ${Empresas.nome}`)
                            .setThumbnail(`${Empresas.imagem}`)
                            .setDescription(`${resultado}`)
                            .addField(`<:db:809531358388682762> Produtos produzidos`, `\`\`\`js\n${ganhouProduto.toLocaleString()}\`\`\``, true)
                            .addField(`🏚 Armazém`, `\`\`\`js\n${totalProds.toLocaleString()}/${produtoCap.toLocaleString()}\`\`\``, true)
                            .addField(`💼 XP`, `\`\`\`js\n${ganhouXp.toLocaleString()}\`\`\``, true)
                            .setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                        message.channel.send(mEmpresa01)
                        database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                                produção: Date.now()
                            })
                    }
                    if (args[0] == "2") {
                        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        let coletaEmpresa = await coletaEmpresa1.once('value')
                        let Empresas = coletaEmpresa.val()
                        if (Empresas.usuario != message.author.id) {
                            return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                        }
                        //<!-- Pegamos alguns dados --!>
                        let produtoAtual = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        let produtoAtual1 = await produtoAtual.once('value')
                        let produto = produtoAtual1.val().produtos

                        let produtoCap1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        let produtoCap2 = await produtoCap1.once('value')
                        let produtoCap = produtoCap2.val().capacidade

                        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        let xpColeta2 = await xpColeta.once('value')
                        let xp = xpColeta2.val().xp

                        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        let levelColeta2 = await levelColeta.once('value')
                        let level = levelColeta2.val().nivel
                        let proximoNivel = level * 650

                        let ganhouXp = Math.floor(Math.random() * 25)
                        let ganhouProduto = Math.floor(Math.random() * 40) + 10
                        let verificaCap = ganhouProduto + produto
let totalProds = ganhouProduto + produto
                        if (verificaCap > produtoCap) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está em capacidade máxima. Venda alguns produtos ou visite a loja para comprar uma capacidade maior.`)
                        if (xp >= proximoNivel) {
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                                .update({
                                    nivel: level + 1,
                                    valor: Empresas.valor + 450
                                })
                            message.channel.send(`<a:clapclapclap:808197706321100810> |** ${message.author.username}**, a sua empresa subiu de nível! Veja em \`${prefixo}xpemp\`.`)
                        }
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                            .update({
                                xp: xp + ganhouXp
                            })
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                            .update({
                                produtos: produto + ganhouProduto
                            })
                        //<!-- Coletamos novamente, agora com os novos dados --!>
                        let produtoAtual2 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        let produtoAtual12 = await produtoAtual2.once('value')
                        let produto2 = produtoAtual12.val().produtos

                        let xpColeta223 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        let xpColeta22 = await xpColeta223.once('value')
                        let xp2 = xpColeta22.val().xp
                        //<!-- Algumas frases --!>
                        let frases = ['Sua empresa produziu cerca de 40% de sua média comum.', 'Sua empresa gerou uma quantia maior de produtos.']
                        let resultado = frases[Math.floor(Math.random() * frases.length)];
                        //<!-- Enviamos a embed final --!>
                        let mEmpresa01 = new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setTitle(`🏛 ${Empresas.nome}`)
                            .setThumbnail(`${Empresas.imagem}`)
                            .setDescription(`${resultado}`)
                            .addField(`<:db:809531358388682762> Produtos produzidos`, `\`\`\`js\n${ganhouProduto.toLocaleString()}\`\`\``, true)
                            .addField(`🏚 Armazém`, `\`\`\`js\n${totalProds.toLocaleString()}/${produtoCap.toLocaleString()}\`\`\``, true)
                            .addField(`💼 XP`, `\`\`\`js\n${ganhouXp.toLocaleString()}\`\`\``, true)
                            .setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                        message.channel.send(mEmpresa01)
                        database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                                produção: Date.now()
                            })
                    }
                    if (args[0] == "3") {
                        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        let coletaEmpresa = await coletaEmpresa1.once('value')
                        let Empresas = coletaEmpresa.val()
                        if (Empresas.usuario != message.author.id) {
                            return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                        }
                        //<!-- Pegamos alguns dados --!>
                        let produtoAtual = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        let produtoAtual1 = await produtoAtual.once('value')
                        let produto = produtoAtual1.val().produtos

                        let produtoCap1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        let produtoCap2 = await produtoCap1.once('value')
                        let produtoCap = produtoCap2.val().capacidade

                        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        let xpColeta2 = await xpColeta.once('value')
                        let xp = xpColeta2.val().xp

                        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        let levelColeta2 = await levelColeta.once('value')
                        let level = levelColeta2.val().nivel
                        let proximoNivel = level * 650

                        let ganhouXp = Math.floor(Math.random() * 25)
                        let ganhouProduto = Math.floor(Math.random() * 40) + 10
                        let verificaCap = ganhouProduto + produto
let totalProds = ganhouProduto + produto
                        if (verificaCap > produtoCap) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está em capacidade máxima. Venda alguns produtos ou visite a loja para comprar uma capacidade maior.`)

                        if (xp >= proximoNivel) {
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                                .update({
                                    nivel: level + 1,
                                    valor: Empresas.valor + 450
                                })
                            message.channel.send(`<a:clapclapclap:808197706321100810> |** ${message.author.username}**, a sua empresa subiu de nível! Veja em \`${prefixo}xpemp\`.`)
                        }
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                            .update({
                                xp: xp + ganhouXp
                            })
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                            .update({
                                produtos: produto + ganhouProduto
                            })
                        //<!-- Coletamos novamente, agora com os novos dados --!>
                        let produtoAtual2 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        let produtoAtual12 = await produtoAtual2.once('value')
                        let produto2 = produtoAtual12.val().produtos

                        let xpColeta223 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        let xpColeta22 = await xpColeta223.once('value')
                        let xp2 = xpColeta22.val().xp
                        //<!-- Algumas frases --!>
                        let frases = ['Sua empresa produziu cerca de 40% de sua média comum.', 'Sua empresa gerou uma quantia maior de produtos.']
                        let resultado = frases[Math.floor(Math.random() * frases.length)];
                        //<!-- Enviamos a embed final --!>
                        let mEmpresa01 = new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setTitle(`🏛 ${Empresas.nome}`)
                            .setThumbnail(`${Empresas.imagem}`)
                            .setDescription(`${resultado}`)
                            .addField(`<:db:809531358388682762> Produtos produzidos`, `\`\`\`js\n${ganhouProduto.toLocaleString()}\`\`\``, true)
                            .addField(`🏚 Armazém`, `\`\`\`js\n${totalProds.toLocaleString()}/${produtoCap.toLocaleString()}\`\`\``, true)
                            .addField(`💼 XP`, `\`\`\`js\n${ganhouXp.toLocaleString()}\`\`\``, true)
                            .setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                        message.channel.send(mEmpresa01)
                        database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                                produção: Date.now()
                            })
                    }
                    if (args[0] == "4") {
                        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        let coletaEmpresa = await coletaEmpresa1.once('value')
                        let Empresas = coletaEmpresa.val()
                        if (Empresas.usuario != message.author.id) {
                            return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                        }
                        //<!-- Pegamos alguns dados --!>
                        let produtoAtual = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        let produtoAtual1 = await produtoAtual.once('value')
                        let produto = produtoAtual1.val().produtos

                        let produtoCap1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        let produtoCap2 = await produtoCap1.once('value')
                        let produtoCap = produtoCap2.val().capacidade

                        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        let xpColeta2 = await xpColeta.once('value')
                        let xp = xpColeta2.val().xp

                        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        let levelColeta2 = await levelColeta.once('value')
                        let level = levelColeta2.val().nivel
                        let proximoNivel = level * 650

                        let ganhouXp = Math.floor(Math.random() * 25)
                        let ganhouProduto = Math.floor(Math.random() * 40) + 10
                        let verificaCap = ganhouProduto + produto
let totalProds = ganhouProduto + produto
                        if (verificaCap > produtoCap) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está em capacidade máxima. Venda alguns produtos ou visite a loja para comprar uma capacidade maior.`)

                        if (xp >= proximoNivel) {
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                                .update({
                                    nivel: level + 1,
                                    valor: Empresas.valor + 450
                                })
                            message.channel.send(`<a:clapclapclap:808197706321100810> |** ${message.author.username}**, a sua empresa subiu de nível! Veja em \`${prefixo}xpemp\`.`)
                        }
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                            .update({
                                xp: xp + ganhouXp
                            })
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                            .update({
                                produtos: produto + ganhouProduto
                            })
                        //<!-- Coletamos novamente, agora com os novos dados --!>
                        let produtoAtual2 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        let produtoAtual12 = await produtoAtual2.once('value')
                        let produto2 = produtoAtual12.val().produtos

                        let xpColeta223 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        let xpColeta22 = await xpColeta223.once('value')
                        let xp2 = xpColeta22.val().xp
                        //<!-- Algumas frases --!>
                        let frases = ['Sua empresa produziu cerca de 40% de sua média comum.', 'Sua empresa gerou uma quantia maior de produtos.']
                        let resultado = frases[Math.floor(Math.random() * frases.length)];
                        //<!-- Enviamos a embed final --!>
                        let mEmpresa01 = new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setTitle(`🏛 ${Empresas.nome}`)
                            .setThumbnail(`${Empresas.imagem}`)
                            .setDescription(`${resultado}`)
                            .addField(`<:db:809531358388682762> Produtos produzidos`, `\`\`\`js\n${ganhouProduto.toLocaleString()}\`\`\``, true)
                            .addField(`🏚 Armazém`, `\`\`\`js\n${totalProds.toLocaleString()}/${produtoCap.toLocaleString()}\`\`\``, true)
                            .addField(`💼 XP`, `\`\`\`js\n${ganhouXp.toLocaleString()}\`\`\``, true)
                            .setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                        message.channel.send(mEmpresa01)
                        database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                                produção: Date.now()
                            })
                    }
                    if (args[0] == "5") {
                        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        let coletaEmpresa = await coletaEmpresa1.once('value')
                        let Empresas = coletaEmpresa.val()
                        if (Empresas.usuario != message.author.id) {
                            return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                        }
                        //<!-- Pegamos alguns dados --!>
                        let produtoAtual = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        let produtoAtual1 = await produtoAtual.once('value')
                        let produto = produtoAtual1.val().produtos

                        let produtoCap1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        let produtoCap2 = await produtoCap1.once('value')
                        let produtoCap = produtoCap2.val().capacidade

                        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        let xpColeta2 = await xpColeta.once('value')
                        let xp = xpColeta2.val().xp

                        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        let levelColeta2 = await levelColeta.once('value')
                        let level = levelColeta2.val().nivel
                        let proximoNivel = level * 650

                        let ganhouXp = Math.floor(Math.random() * 25)
                        let ganhouProduto = Math.floor(Math.random() * 40) + 10
                        let verificaCap = ganhouProduto + produto
let totalProds = ganhouProduto + produto
                        if (verificaCap > produtoCap) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está em capacidade máxima. Venda alguns produtos ou visite a loja para comprar uma capacidade maior.`)

                        if (xp >= proximoNivel) {
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                                .update({
                                    nivel: level + 1,
                                    valor: Empresas.valor + 450
                                })
                            message.channel.send(`<a:clapclapclap:808197706321100810> |** ${message.author.username}**, a sua empresa subiu de nível! Veja em \`${prefixo}xpemp\`.`)
                        }
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                            .update({
                                xp: xp + ganhouXp
                            })
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                            .update({
                                produtos: produto + ganhouProduto
                            })
                        //<!-- Coletamos novamente, agora com os novos dados --!>
                        let produtoAtual2 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        let produtoAtual12 = await produtoAtual2.once('value')
                        let produto2 = produtoAtual12.val().produtos

                        let xpColeta223 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        let xpColeta22 = await xpColeta223.once('value')
                        let xp2 = xpColeta22.val().xp
                        //<!-- Algumas frases --!>
                        let frases = ['Sua empresa produziu cerca de 40% de sua média comum.', 'Sua empresa gerou uma quantia maior de produtos.']
                        let resultado = frases[Math.floor(Math.random() * frases.length)];
                        //<!-- Enviamos a embed final --!>
                        let mEmpresa01 = new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setTitle(`🏛 ${Empresas.nome}`)
                            .setThumbnail(`${Empresas.imagem}`)
                            .setDescription(`${resultado}`)
                            .addField(`<:db:809531358388682762> Produtos produzidos`, `\`\`\`js\n${ganhouProduto.toLocaleString()}\`\`\``, true)
                            .addField(`🏚 Armazém`, `\`\`\`js\n${totalProds.toLocaleString()}/${produtoCap.toLocaleString()}\`\`\``, true)
                            .addField(`💼 XP`, `\`\`\`js\n${ganhouXp.toLocaleString()}\`\`\``, true)
                            .setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                        message.channel.send(mEmpresa01)
                        database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                                produção: Date.now()
                            })
                    }
                    if (args[0] == "6") {
                        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        let coletaEmpresa = await coletaEmpresa1.once('value')
                        let Empresas = coletaEmpresa.val()
                        if (Empresas.usuario != message.author.id) {
                            return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                        }
                        //<!-- Pegamos alguns dados --!>
                        let produtoAtual = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        let produtoAtual1 = await produtoAtual.once('value')
                        let produto = produtoAtual1.val().produtos

                        let produtoCap1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        let produtoCap2 = await produtoCap1.once('value')
                        let produtoCap = produtoCap2.val().capacidade

                        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        let xpColeta2 = await xpColeta.once('value')
                        let xp = xpColeta2.val().xp

                        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        let levelColeta2 = await levelColeta.once('value')
                        let level = levelColeta2.val().nivel
                        let proximoNivel = level * 650

                        let ganhouXp = Math.floor(Math.random() * 25)
                        let ganhouProduto = Math.floor(Math.random() * 40) + 10
                        let verificaCap = ganhouProduto + produto
let totalProds = ganhouProduto + produto
                        if (verificaCap > produtoCap) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está em capacidade máxima. Venda alguns produtos ou visite a loja para comprar uma capacidade maior.`)

                        if (xp >= proximoNivel) {
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                                .update({
                                    nivel: level + 1,
                                    valor: Empresas.valor + 450
                                })
                            message.channel.send(`<a:clapclapclap:808197706321100810> |** ${message.author.username}**, a sua empresa subiu de nível! Veja em \`${prefixo}xpemp\`.`)
                        }
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                            .update({
                                xp: xp + ganhouXp
                            })
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                            .update({
                                produtos: produto + ganhouProduto
                            })
                        //<!-- Coletamos novamente, agora com os novos dados --!>
                        let produtoAtual2 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        let produtoAtual12 = await produtoAtual2.once('value')
                        let produto2 = produtoAtual12.val().produtos

                        let xpColeta223 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        let xpColeta22 = await xpColeta223.once('value')
                        let xp2 = xpColeta22.val().xp
                        //<!-- Algumas frases --!>
                        let frases = ['Sua empresa produziu cerca de 40% de sua média comum.', 'Sua empresa gerou uma quantia maior de produtos.']
                        let resultado = frases[Math.floor(Math.random() * frases.length)];
                        //<!-- Enviamos a embed final --!>
                        let mEmpresa01 = new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setTitle(`🏛 ${Empresas.nome}`)
                            .setThumbnail(`${Empresas.imagem}`)
                            .setDescription(`${resultado}`)
                            .addField(`<:db:809531358388682762> Produtos produzidos`, `\`\`\`js\n${ganhouProduto.toLocaleString()}\`\`\``, true)
                            .addField(`🏚 Armazém`, `\`\`\`js\n${totalProds.toLocaleString()}/${produtoCap.toLocaleString()}\`\`\``, true)
                            .addField(`💼 XP`, `\`\`\`js\n${ganhouXp.toLocaleString()}\`\`\``, true)
                            .setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                        message.channel.send(mEmpresa01)
                        database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                                produção: Date.now()
                            })
                    }
                    if (args[0] == "7") {
                        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        let coletaEmpresa = await coletaEmpresa1.once('value')
                        let Empresas = coletaEmpresa.val()
                        if (Empresas.usuario != message.author.id) {
                            return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                        }
                        //<!-- Pegamos alguns dados --!>
                        let produtoAtual = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        let produtoAtual1 = await produtoAtual.once('value')
                        let produto = produtoAtual1.val().produtos

                        let produtoCap1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        let produtoCap2 = await produtoCap1.once('value')
                        let produtoCap = produtoCap2.val().capacidade

                        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        let xpColeta2 = await xpColeta.once('value')
                        let xp = xpColeta2.val().xp

                        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        let levelColeta2 = await levelColeta.once('value')
                        let level = levelColeta2.val().nivel
                        let proximoNivel = level * 650

                        let ganhouXp = Math.floor(Math.random() * 25)
                        let ganhouProduto = Math.floor(Math.random() * 40) + 10
                        let verificaCap = ganhouProduto + produto
let totalProds = ganhouProduto + produto
                        if (verificaCap > produtoCap) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está em capacidade máxima. Venda alguns produtos ou visite a loja para comprar uma capacidade maior.`)

                        if (xp >= proximoNivel) {
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                                .update({
                                    nivel: level + 1,
                                    valor: Empresas.valor + 450
                                })
                            message.channel.send(`<a:clapclapclap:808197706321100810> |** ${message.author.username}**, a sua empresa subiu de nível! Veja em \`${prefixo}xpemp\`.`)
                        }
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                            .update({
                                xp: xp + ganhouXp
                            })
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                            .update({
                                produtos: produto + ganhouProduto
                            })
                        //<!-- Coletamos novamente, agora com os novos dados --!>
                        let produtoAtual2 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        let produtoAtual12 = await produtoAtual2.once('value')
                        let produto2 = produtoAtual12.val().produtos

                        let xpColeta223 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        let xpColeta22 = await xpColeta223.once('value')
                        let xp2 = xpColeta22.val().xp
                        //<!-- Algumas frases --!>
                        let frases = ['Sua empresa produziu cerca de 40% de sua média comum.', 'Sua empresa gerou uma quantia maior de produtos.']
                        let resultado = frases[Math.floor(Math.random() * frases.length)];
                        //<!-- Enviamos a embed final --!>
                        let mEmpresa01 = new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setTitle(`🏛 ${Empresas.nome}`)
                            .setThumbnail(`${Empresas.imagem}`)
                            .setDescription(`${resultado}`)
                            .addField(`<:db:809531358388682762> Produtos produzidos`, `\`\`\`js\n${ganhouProduto.toLocaleString()}\`\`\``, true)
                            .addField(`🏚 Armazém`, `\`\`\`js\n${totalProds.toLocaleString()}/${produtoCap.toLocaleString()}\`\`\``, true)
                            .addField(`💼 XP`, `\`\`\`js\n${ganhouXp.toLocaleString()}\`\`\``, true)
                            .setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                        message.channel.send(mEmpresa01)
                        database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                                produção: Date.now()
                            })
                    }
                }
            }
            //<!-- Aqui, definimos o nome do comando e suas configurações --!>
        } catch (e) {
            const erroCanal = client.channels.get('733875381131673661')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`prodemp\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'prodemp'
        }
    }
}