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

     //<!-- Verificamos se o usuário mencionado está registrado --!>
    let usuario = message.mentions.users.first()
    if(message.mentions.users.first() == message.author) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não pode utilizar este comando em si mesmo.`)
    if(!usuario) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar para quem deseja transferir o dinheiro.`)

    let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Registros/Usuário/${usuario.id}`)
    let snap2 = await ref2.once('value') 
    //<!-- Se os dados não existirem, o Zyon vai criá-los --!>
    if(snap2.val() == null){
        return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, para que você possa transferir algum valor para **${usuario.username}**, ele(a) deve se registrar antes.`)
      }
    var quantidade = parseInt(args.splice(1).join(" "))
    let coins1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
    let coins2 = await coins1.once('value')
    let coins = coins2.val().dinheiro
    if(!quantidade) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar qual será o valor enviado para o usuário.`)
    if(isNaN(quantidade)) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um valor numérico!`)
    if(quantidade <= 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar um valor acima de 0!`)
    if(quantidade > coins) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não tem tudo isso em mãos!`)
    else {
      
      let recebedorTem1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${usuario.id}`)
      let recebedorTem2 = await recebedorTem1.once('value')
      let recebedorTem = recebedorTem2.val().dinheiro
      let recebeu = parseInt(recebedorTem + quantidade) 
      
      let pagadorTem1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
      let pagadorTem2 = await pagadorTem1.once('value')
      let pagadorTem = pagadorTem2.val().dinheiro
      let pagou = parseInt(pagadorTem - quantidade) 

      database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${usuario.id}`)
      .update({
        "dinheiro": recebeu
      })

      database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
      .update({
        "dinheiro": pagou
      })
      let recebedorTem7 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${usuario.id}`)
      let recebedorTem8 = await recebedorTem7.once('value')
      let recebedorTem9 = recebedorTem8.val().dinheiro
      
      let pagadorTem7 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
      let pagadorTem8 = await pagadorTem7.once('value')
      let pagadorTem9 = pagadorTem8.val().dinheiro
      let resultado = parseInt(pagadorTem9)
      let resultado2 = parseInt(recebedorTem9)

      const mTranferir = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true}))
      .setTitle(`🏛 Extrato de Transferência`)
      .setDescription(`**${message.author.username}**, a transferência para **${usuario.username}** foi bem sucedida.`)
      .addField(`💰 Seu novo saldo`, `\`\`\`js\nR$${resultado.toLocaleString('pt-BR')}\`\`\``, true)
      .addField(`💸 Novo saldo de ${usuario.username}`, `\`\`\`js\nR$${resultado2.toLocaleString('pt-BR')}\`\`\``, true)
      .setFooter(`Zyon ® Oficial 2021`, client.user.avatarURL())
      .setThumbnail(message.author.avatarURL({ format: 'png', size: 512}))
      message.channel.send(mTranferir)
    }
  },
    conf: {},
    get help () {
      return {
        name: 'transferir'
      }
      }
    }