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
            //<!-- Coletamos algumas databases --!>
let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
let coletaEmpresa = await coletaEmpresa1.once('value')
let Empresas0 = coletaEmpresa.val()

let coletaEmpresa2 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
let coletaEmpresa3 = await coletaEmpresa2.once('value')
let Empresas1 = coletaEmpresa3.val()

let coletaEmpresa15 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
let coletaEmpresa4 = await coletaEmpresa15.once('value')
let Empresas2 = coletaEmpresa4.val()

let coletaEmpresa17 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
let coletaEmpresa5 = await coletaEmpresa17.once('value')
let Empresas3 = coletaEmpresa5.val()

let coletaEmpresa18 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
let coletaEmpresa6 = await coletaEmpresa18.once('value')
let Empresas4 = coletaEmpresa6.val()

let coletaEmpresa19 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
let coletaEmpresa7 = await coletaEmpresa19.once('value')
let Empresas5 = coletaEmpresa7.val()

let coletaEmpresa20 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
let coletaEmpresa8 = await coletaEmpresa20.once('value')
let Empresas6 = coletaEmpresa8.val()
            if (args[0] == "1") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                let mEmpresa01 = new MessageEmbed()
                    .setTitle(`1️⃣ ${Empresas0.nome} (ID: ${Empresas0.id})`)
                    .setDescription(`${Empresas0.descrição}`)
                    .setThumbnail(`${Empresas0.imagem}`)
                    .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                    .addField(`🏛 Dono da Empresa`, `\`\`\`${Empresas0.dono}\`\`\``, true)
                    .addField(`💼 Nível`, `\`\`\`${Empresas0.nivel.toLocaleString()}\`\`\``, true)
                    .addField(`<:db:809531358388682762> Produtos`, `\`\`\`js\n${Empresas0.produtos.toLocaleString()}/${Empresas.capacidade.toLocaleString()}\`\`\``)
                    .addField(`🔐 Cofre`, `\`\`\`js\nR$${Empresas0.cofre.toLocaleString()}\`\`\``)
                    .addField(`💰 Valor da empresa`, `\`\`\`js\nR$${Empresas0.valor.toLocaleString()}\`\`\``, true)
                    .addField(`🔐 Está à venda?`, `\`\`\`js\n${Empresas0.estaAvenda.toLocaleString()}\`\`\``, true)
                    .setFooter(`ATENÇÃO! Se a imagem desta empresa é contra os meus termos, use: ${prefixo}reportar!`)
                message.channel.send(mEmpresa01);
            } else {
                if (args[0] == "2") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let mEmpresa02 = new MessageEmbed()
                        .setTitle(`2️⃣ ${Empresas1.nome} (ID: ${Empresas1.id})`)
                        .setDescription(`${Empresas1.descrição}`)
                        .setThumbnail(`${Empresas1.imagem}`)
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .addField(`🏛 Dono da Empresa`, `\`\`\`${Empresas1.dono}\`\`\``, true)
                        .addField(`💼 Nível`, `\`\`\`${Empresas1.nivel.toLocaleString()}\`\`\``, true)
                        .addField(`<:db:809531358388682762> Produtos`, `\`\`\`js\n${Empresas1.produtos.toLocaleString()}/${Empresas1.capacidade.toLocaleString()}\`\`\``)
                        .addField(`🔐 Cofre`, `\`\`\`js\nR$${Empresas1.cofre.toLocaleString()}\`\`\``)
                        .addField(`💰 Valor da empresa`, `\`\`\`js\nR$${Empresas1.valor.toLocaleString()}\`\`\``, true)
                        .addField(`🔐 Está à venda?`, `\`\`\`js\n${Empresas1.estaAvenda.toLocaleString()}\`\`\``, true)
                        .setFooter(`ATENÇÃO! Se a imagem desta empresa é contra os meus termos, use: ${prefixo}reportar!`)
                    message.channel.send(mEmpresa02);
                } else if (args[0] == "3") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let mEmpresa03 = new MessageEmbed()
                        .setTitle(`3️⃣ ${Empresas2.nome} (ID: ${Empresas2.id})`)
                        .setDescription(`${Empresas2.descrição}`)
                        .setThumbnail(`${Empresas2.imagem}`)
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .addField(`🏛 Dono da Empresa`, `\`\`\`${Empresas2.dono}\`\`\``, true)
                        .addField(`💼 Nível`, `\`\`\`${Empresas2.nivel.toLocaleString()}\`\`\``, true)
                        .addField(`<:db:809531358388682762> Produtos`, `\`\`\`js\n${Empresas2.produtos.toLocaleString()}/${Empresas2.capacidade.toLocaleString()}\`\`\``)
                        .addField(`🔐 Cofre`, `\`\`\`js\nR$${Empresas2.cofre.toLocaleString()}\`\`\``)
                        .addField(`💰 Valor da empresa`, `\`\`\`js\nR$${Empresas2.valor.toLocaleString()}\`\`\``, true)
                        .addField(`🔐 Está à venda?`, `\`\`\`js\n${Empresas2.estaAvenda.toLocaleString()}\`\`\``, true)
                        .setFooter(`ATENÇÃO! Se a imagem desta empresa é contra os meus termos, use: ${prefixo}reportar!`)
                    message.channel.send(mEmpresa03);
                } else if (args[0] == "4") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let mEmpresa04 = new MessageEmbed()
                        .setTitle(`4️⃣ ${Empresas3.nome} (ID: ${Empresas3.id})`)
                        .setDescription(`${Empresas3.descrição}`)
                        .setThumbnail(`${Empresas3.imagem}`)
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .addField(`🏛 Dono da Empresa`, `\`\`\`${Empresas3.dono}\`\`\``, true)
                        .addField(`💼 Nível`, `\`\`\`${Empresas3.nivel.toLocaleString()}\`\`\``, true)
                        .addField(`<:db:809531358388682762> Produtos`, `\`\`\`js\n${Empresas3.produtos.toLocaleString()}/${Empresas3.capacidade.toLocaleString()}\`\`\``)
                        .addField(`🔐 Cofre`, `\`\`\`js\nR$${Empresas3.cofre.toLocaleString()}\`\`\``)
                        .addField(`💰 Valor da empresa`, `\`\`\`js\nR$${Empresas3.valor.toLocaleString()}\`\`\``, true)
                        .addField(`🔐 Está à venda?`, `\`\`\`js\n${Empresas3.estaAvenda.toLocaleString()}\`\`\``, true)
                        .setFooter(`ATENÇÃO! Se a imagem desta empresa é contra os meus termos, use: ${prefixo}reportar!`)
                    message.channel.send(mEmpresa04);
                } else if (args[0] == "5") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let mEmpresa05 = new MessageEmbed()
                        .setTitle(`5️⃣ ${Empresas4.nome} (ID: ${Empresas4.id})`)
                        .setDescription(`${Empresas4.descrição}`)
                        .setThumbnail(`${Empresas4.imagem}`)
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .addField(`🏛 Dono da Empresa`, `\`\`\`${Empresas4.dono}\`\`\``, true)
                        .addField(`💼 Nível`, `\`\`\`${Empresas4.nivel.toLocaleString()}\`\`\``, true)
                        .addField(`<:db:809531358388682762> Produtos`, `\`\`\`js\n${Empresas4.produtos.toLocaleString()}/${Empresas4.capacidade.toLocaleString()}\`\`\``)
                        .addField(`🔐 Cofre`, `\`\`\`js\nR$${Empresas4.cofre.toLocaleString()}\`\`\``)
                        .addField(`💰 Valor da empresa`, `\`\`\`js\nR$${Empresas4.valor.toLocaleString()}\`\`\``, true)
                        .addField(`🔐 Está à venda?`, `\`\`\`js\n${Empresas4.estaAvenda.toLocaleString()}\`\`\``, true)
                        .setFooter(`ATENÇÃO! Se a imagem desta empresa é contra os meus termos, use: ${prefixo}reportar!`)
                    message.channel.send(mEmpresa05);
                } else if (args[0] == "6") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let mEmpresa06 = new MessageEmbed()
                        .setTitle(`6️⃣ ${Empresas5.nome} (ID: ${Empresas5.id})`)
                        .setDescription(`${Empresas5.descrição}`)
                        .setThumbnail(`${Empresas5.imagem}`)
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .addField(`🏛 Dono da Empresa`, `\`\`\`${Empresas5.dono}\`\`\``, true)
                        .addField(`💼 Nível`, `\`\`\`${Empresas5.nivel.toLocaleString()}\`\`\``, true)
                        .addField(`<:db:809531358388682762> Produtos`, `\`\`\`js\n${Empresas5.produtos.toLocaleString()}/${Empresas5.capacidade.toLocaleString()}\`\`\``)
                        .addField(`🔐 Cofre`, `\`\`\`js\nR$${Empresas5.cofre.toLocaleString()}\`\`\``)
                        .addField(`💰 Valor da empresa`, `\`\`\`js\nR$${Empresas5.valor.toLocaleString()}\`\`\``, true)
                        .addField(`🔐 Está à venda?`, `\`\`\`js\n${Empresas5.estaAvenda.toLocaleString()}\`\`\``, true)
                        .setFooter(`ATENÇÃO! Se a imagem desta empresa é contra os meus termos, use: ${prefixo}reportar!`)
                    message.channel.send(mEmpresa06);
                } else if (args[0] == "7") {
                    let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                    let coletaEmpresa = await coletaEmpresa1.once('value')
                    let Empresas = coletaEmpresa.val()
                    if (Empresas.usuario != message.author.id) {
                       return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                    }
                    let mEmpresa07 = new MessageEmbed()
                        .setTitle(`7️⃣ ${Empresas6.nome} (ID: ${Empresas6.id})`)
                        .setDescription(`${Empresas6.descrição}`)
                        .setThumbnail(`${Empresas6.imagem}`)
                        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .addField(`🏛 Dono da Empresa`, `\`\`\`${Empresas6.dono}\`\`\``, true)
                        .addField(`💼 Nível`, `\`\`\`${Empresas6.nivel.toLocaleString()}\`\`\``, true)
                        .addField(`<:db:809531358388682762> Produtos`, `\`\`\`js\n${Empresas6.produtos.toLocaleString()}/${Empresas6.capacidade.toLocaleString()}\`\`\``)
                        .addField(`🔐 Cofre`, `\`\`\`js\nR$${Empresas6.cofre.toLocaleString()}\`\`\``)
                        .addField(`💰 Valor da empresa`, `\`\`\`js\nR$${Empresas6.valor.toLocaleString()}\`\`\``, true)
                        .addField(`🔐 Está à venda?`, `\`\`\`js\n${Empresas6.estaAvenda.toLocaleString()}\`\`\``, true)
                        .setFooter(`ATENÇÃO! Se a imagem desta empresa é contra os meus termos, use: ${prefixo}reportar!`)
                    message.channel.send(mEmpresa07);
                }
            }
}
catch (e) {
    const erroCanal = client.channels.get('733875381131673661')
    message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
    erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`\``)
}
},
conf: {},
    get help() {
        return {
            name: 'infoemp'
        }
    }
}