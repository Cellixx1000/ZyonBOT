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
                    //<!-- Verificamos a database do item  --!>
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let empresasRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                    let empresas = await empresasRef.once('value')
                    if (empresas.produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                    const valor = args.splice(1).join(" ")
                    if (!valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar a quantidade de produtos que deseja vender.`)
                    if (valor < 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um valor positivo.`)
                    if(isNaN(valor)) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um número!`)
                    else {
                        let produtosRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        let produtos1 = await produtosRef.once('value')
                        let produtos = produtos1.val().produtos
                        if(produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                        if(produtos < valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa possui somente **${produtos.toLocaleString()}** produtos.`)  
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            produtos: produtos - valor
                        })
                        let cofreRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        let cofre1 = await cofreRef.once('value')
                        let cofre = cofre1.val().cofre
                        let total = valor * 3
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                        .update({
                            cofre: cofre + total
                        })
                        const mProds = new MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .setTitle(`🏛 ${Empresas.nome}`)
                        .setThumbnail(`${Empresas.imagem}`)
                        .setDescription(`Sua empresa vendeu produtos com sucesso. Informações abaixo!`)
                        .addField(`<:db:809531358388682762> Produtos vendidos`, `\`\`\`js\n${valor.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`🏚️ Armazém`, `\`\`\`js\n${parseInt(produtos - valor).toLocaleString('pt-BR')}/${Empresas.capacidade.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`💰 Valor`, `\`\`\`js\nR$${parseInt(total).toLocaleString('pt-BR')}\`\`\``, true)
                        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
                        message.channel.send(mProds)
                    }
                }
                if (args[0] == "2") {
                    //<!-- Verificamos a database do item  --!>
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let empresasRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                    let empresas = await empresasRef.once('value')
                    if (empresas.produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                    const valor = args.splice(1).join(" ")
                    if (!valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar a quantidade de produtos que deseja vender.`)
                    if (valor < 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um valor positivo.`)
                    if(isNaN(valor)) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um número!`)
                    else {
                        let produtosRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        let produtos1 = await produtosRef.once('value')
                        let produtos = produtos1.val().produtos
                        if(produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                        if(produtos < valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa possui somente **${produtos.toLocaleString()}** produtos.`)  
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            produtos: produtos - valor
                        })
                        let cofreRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        let cofre1 = await cofreRef.once('value')
                        let cofre = cofre1.val().cofre
                        let total = valor * 3
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                        .update({
                            cofre: cofre + total
                        })
                        const mProds = new MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .setTitle(`🏛 ${Empresas.nome}`)
                        .setThumbnail(`${Empresas.imagem}`)
                        .setDescription(`Sua empresa vendeu produtos com sucesso. Informações abaixo!`)
                        .addField(`<:db:809531358388682762> Produtos vendidos`, `\`\`\`js\n${valor.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`🏚️ Armazém`, `\`\`\`js\n${parseInt(produtos - valor).toLocaleString('pt-BR')}/${Empresas.capacidade.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`💰 Valor`, `\`\`\`js\nR$${parseInt(total).toLocaleString('pt-BR')}\`\`\``, true)
                        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
                        message.channel.send(mProds)
                    }
                } if (args[0] == "3") {
                    //<!-- Verificamos a database do item  --!>
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let empresasRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                    let empresas = await empresasRef.once('value')
                    if (empresas.produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                    const valor = args.splice(1).join(" ")
                    if (!valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar a quantidade de produtos que deseja vender.`)
                    if (valor < 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um valor positivo.`)
                    if(isNaN(valor)) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um número!`)
                    else {
                        let produtosRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        let produtos1 = await produtosRef.once('value')
                        let produtos = produtos1.val().produtos
                        if(produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                        if(produtos < valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa possui somente **${produtos.toLocaleString()}** produtos.`)  
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            produtos: produtos - valor
                        })
                        let cofreRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        let cofre1 = await cofreRef.once('value')
                        let cofre = cofre1.val().cofre
                        let total = valor * 3
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                        .update({
                            cofre: cofre + total
                        })
                        const mProds = new MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .setTitle(`🏛 ${Empresas.nome}`)
                        .setThumbnail(`${Empresas.imagem}`)
                        .setDescription(`Sua empresa vendeu produtos com sucesso. Informações abaixo!`)
                        .addField(`<:db:809531358388682762> Produtos vendidos`, `\`\`\`js\n${valor.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`🏚️ Armazém`, `\`\`\`js\n${parseInt(produtos - valor).toLocaleString('pt-BR')}/${Empresas.capacidade.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`💰 Valor`, `\`\`\`js\nR$${parseInt(total).toLocaleString('pt-BR')}\`\`\``, true)
                        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
                        message.channel.send(mProds)
                    }
                } if (args[0] == "4") {
                    //<!-- Verificamos a database do item  --!>
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let empresasRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                    let empresas = await empresasRef.once('value')
                    if (empresas.produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                    const valor = args.splice(1).join(" ")
                    if (!valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar a quantidade de produtos que deseja vender.`)
                    if (valor < 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um valor positivo.`)
                    if(isNaN(valor)) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um número!`)
                    else {
                        let produtosRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        let produtos1 = await produtosRef.once('value')
                        let produtos = produtos1.val().produtos
                        if(produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                        if(produtos < valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa possui somente **${produtos.toLocaleString()}** produtos.`)  
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            produtos: produtos - valor
                        })
                        let cofreRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        let cofre1 = await cofreRef.once('value')
                        let cofre = cofre1.val().cofre
                        let total = valor * 3
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                        .update({
                            cofre: cofre + total
                        })
                        const mProds = new MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .setTitle(`🏛 ${Empresas.nome}`)
                        .setThumbnail(`${Empresas.imagem}`)
                        .setDescription(`Sua empresa vendeu produtos com sucesso. Informações abaixo!`)
                        .addField(`<:db:809531358388682762> Produtos vendidos`, `\`\`\`js\n${valor.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`🏚️ Armazém`, `\`\`\`js\n${parseInt(produtos - valor).toLocaleString('pt-BR')}/${Empresas.capacidade.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`💰 Valor`, `\`\`\`js\nR$${parseInt(total).toLocaleString('pt-BR')}\`\`\``, true)
                        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
                        message.channel.send(mProds)
                    }
                } if (args[0] == "5") {
                    //<!-- Verificamos a database do item  --!>
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let empresasRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                    let empresas = await empresasRef.once('value')
                    if (empresas.produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                    const valor = args.splice(1).join(" ")
                    if (!valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar a quantidade de produtos que deseja vender.`)
                    if (valor < 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um valor positivo.`)
                    if(isNaN(valor)) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um número!`)
                    else {
                        let produtosRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        let produtos1 = await produtosRef.once('value')
                        let produtos = produtos1.val().produtos
                        if(produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                        if(produtos < valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa possui somente **${produtos.toLocaleString()}** produtos.`)  
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            produtos: produtos - valor
                        })
                        let cofreRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        let cofre1 = await cofreRef.once('value')
                        let cofre = cofre1.val().cofre
                        let total = valor * 3
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                        .update({
                            cofre: cofre + total
                        })
                        const mProds = new MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .setTitle(`🏛 ${Empresas.nome}`)
                        .setThumbnail(`${Empresas.imagem}`)
                        .setDescription(`Sua empresa vendeu produtos com sucesso. Informações abaixo!`)
                        .addField(`<:db:809531358388682762> Produtos vendidos`, `\`\`\`js\n${valor.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`🏚️ Armazém`, `\`\`\`js\n${parseInt(produtos - valor).toLocaleString('pt-BR')}/${Empresas.capacidade.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`💰 Valor`, `\`\`\`js\nR$${parseInt(total).toLocaleString('pt-BR')}\`\`\``, true)
                        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
                        message.channel.send(mProds)
                    }
                } if (args[0] == "6") {
                    //<!-- Verificamos a database do item  --!>
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let empresasRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                    let empresas = await empresasRef.once('value')
                    if (empresas.produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                    const valor = args.splice(1).join(" ")
                    if (!valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar a quantidade de produtos que deseja vender.`)
                    if (valor < 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um valor positivo.`)
                    if(isNaN(valor)) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um número!`)
                    else {
                        let produtosRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        let produtos1 = await produtosRef.once('value')
                        let produtos = produtos1.val().produtos
                        if(produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                        if(produtos < valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa possui somente **${produtos.toLocaleString()}** produtos.`)  
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            produtos: produtos - valor
                        })
                        let cofreRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        let cofre1 = await cofreRef.once('value')
                        let cofre = cofre1.val().cofre
                        let total = valor * 3
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                        .update({
                            cofre: cofre + total
                        })
                        const mProds = new MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .setTitle(`🏛 ${Empresas.nome}`)
                        .setThumbnail(`${Empresas.imagem}`)
                        .setDescription(`Sua empresa vendeu produtos com sucesso. Informações abaixo!`)
                        .addField(`<:db:809531358388682762> Produtos vendidos`, `\`\`\`js\n${valor.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`🏚️ Armazém`, `\`\`\`js\n${parseInt(produtos - valor).toLocaleString('pt-BR')}/${Empresas.capacidade.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`💰 Valor`, `\`\`\`js\nR$${parseInt(total).toLocaleString('pt-BR')}\`\`\``, true)
                        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
                        message.channel.send(mProds)
                    }
                } if (args[0] == "7") {
                    //<!-- Verificamos a database do item  --!>
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let empresasRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                    let empresas = await empresasRef.once('value')
                    if (empresas.produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                    const valor = args.splice(1).join(" ")
                    if (!valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar a quantidade de produtos que deseja vender.`)
                    if (valor < 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um valor positivo.`)
                    if(isNaN(valor)) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um número!`)
                    else {
                        let produtosRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        let produtos1 = await produtosRef.once('value')
                        let produtos = produtos1.val().produtos
                        if(produtos == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa não possui produtos.`)
                        if(produtos < valor) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa possui somente **${produtos.toLocaleString()}** produtos.`)  
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            produtos: produtos - valor
                        })
                        let cofreRef = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        let cofre1 = await cofreRef.once('value')
                        let cofre = cofre1.val().cofre
                        let total = valor * 3
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                        .update({
                            cofre: cofre + total
                        })
                        const mProds = new MessageEmbed()
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .setTitle(`🏛 ${Empresas.nome}`)
                        .setThumbnail(`${Empresas.imagem}`)
                        .setDescription(`Sua empresa vendeu produtos com sucesso. Informações abaixo!`)
                        .addField(`<:db:809531358388682762> Produtos vendidos`, `\`\`\`js\n${valor.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`🏚️ Armazém`, `\`\`\`js\n${parseInt(produtos - valor).toLocaleString('pt-BR')}/${Empresas.capacidade.toLocaleString('pt-BR')}\`\`\``, true)
                        .addField(`💰 Valor`, `\`\`\`js\nR$${parseInt(total).toLocaleString('pt-BR')}\`\`\``, true)
                        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
                        message.channel.send(mProds)
                    }
                }
            }
            //<!-- Aqui, definimos o nome do comando e suas configurações --!>
        } catch (e) {
            const erroCanal = client.channels.cache.get('757039620054712400')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`vprods\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'vprods'
        }
    }
}