const { MessageEmbed } = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config.json')

module.exports = {
   run: async function (client, message, args) {
    //<!-- Coletamos o prefixo do servidor --!>
    let prefixoColeta = await database.ref(`Configurações/Servidores/${message.guild.id}/Prefixo`)
    let prefixoColeta2 = await prefixoColeta.once('value')
    let prefixo = prefixoColeta2.val().prefixo
    //<!-- Coletamos os dados do servidor --!>
    let ref = await database.ref(`Economia/Servidor/${message.guild.id}/Registros/Usuário/${message.author.id}`)
    let snap = await ref.once('value') 
    //<!-- Se os dados não existirem, o Zyon vai criá-los --!>
    if(snap.val() == null){
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
//<!-- Coletamos algumas databases --!>
let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
let coletaEmpresa = await coletaEmpresa1.once('value')
let Empresas = coletaEmpresa.val()

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
//<!-- Enviamos a embed --!>
const mEmpresas = new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
.setTitle(`🏛 Empresas - ${message.guild.name}`)
.setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png?size=2048`)
.setDescription(`Abaixo você encontrará as **7** empresas do servidor e suas especificações.`)
.addField(`1️⃣ | ${Empresas.nome}`, `${Empresas.descrição}`)
.addField(`2️⃣ | ${Empresas1.nome}`, `${Empresas1.descrição}`)
.addField(`3️⃣ | ${Empresas2.nome}`, `${Empresas2.descrição}`)
.addField(`4️⃣ | ${Empresas3.nome}`, `${Empresas3.descrição}`)
.addField(`5️⃣ | ${Empresas4.nome}`, `${Empresas4.descrição}`)
.addField(`6️⃣ | ${Empresas5.nome}`, `${Empresas5.descrição}`)
.addField(`7️⃣ | ${Empresas6.nome}`, `${Empresas6.descrição}`)
.setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
message.channel.send(mEmpresas).then(async reacm => {
    await reacm.react("1️⃣");  
    await reacm.react("2️⃣");
    await reacm.react("3️⃣");   
    await reacm.react("4️⃣");
    await reacm.react("5️⃣");
    await reacm.react("6️⃣");
    await reacm.react("7️⃣");
   client.on('messageReactionAdd', (reaction, user) => {
       if(reaction.message.id !== reacm.id) return; 
       if (reaction.emoji.name === "1️⃣" && user.id === message.author.id){
           let mEmpresa01 = new MessageEmbed()
           .setTitle(`1️⃣ ${Empresas.nome} (ID: ${Empresas.id})`)
           .setDescription(`${Empresas.descrição}`)
           .setThumbnail(`${Empresas.imagem}`)
           .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
           .addField(`🏛 Dono da Empresa`, `\`\`\`${Empresas.dono}\`\`\``, true)
           .addField(`💼 Nível`, `\`\`\`${Empresas.nivel.toLocaleString()}\`\`\``, true)
           .addField(`<:db:809531358388682762> Produtos`, `\`\`\`js\n${Empresas.produtos.toLocaleString()}/${Empresas.capacidade.toLocaleString()}\`\`\``)
           .addField(`🔐 Cofre`, `\`\`\`js\nR$${Empresas.cofre.toLocaleString()}\`\`\``)
           .addField(`💰 Valor da empresa`, `\`\`\`js\nR$${Empresas.valor.toLocaleString()}\`\`\``, true)
           .addField(`🔐 Está à venda?`, `\`\`\`js\n${Empresas.estaAvenda.toLocaleString()}\`\`\``, true)
           .setFooter(`ATENÇÃO! Se a imagem desta empresa é contra os meus termos, use: ${prefixo}reportar!`)
           reacm.edit(mEmpresa01);
           
         }else { 
         if (reaction.emoji.name === "2️⃣" && user.id === message.author.id){
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
          reacm.edit(mEmpresa02);
           
         } else if (reaction.emoji.name === "3️⃣" && user.id === message.author.id){
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
          reacm.edit(mEmpresa03);
           
         }else if (reaction.emoji.name === "4️⃣" && user.id === message.author.id){
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
          reacm.edit(mEmpresa04);
           
         }else if (reaction.emoji.name === "5️⃣" && user.id === message.author.id){
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
          reacm.edit(mEmpresa05);
         
       }else if (reaction.emoji.name === "6️⃣" && user.id === message.author.id){
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
          reacm.edit(mEmpresa06);
       
     }else if (reaction.emoji.name === "7️⃣" && user.id === message.author.id){
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
        reacm.edit(mEmpresa07);
     
   }}});});

    //<!-- Aqui, definimos o nome do comando e suas configurações --!>
},
    conf: {},
    get help () {
      return {
        name: 'empresas'
      }
      }
    }