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
    if(snap.val() == null){
        return message.channel.send(`<:trix_errado:719330454875930777> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
    if(!args[0])  {
    const mBackground = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTitle(`🖼 Loja de Backgrounds`)
    .setDescription(`Olá ${message.author.username}, seja bem-vindo(a) à loja de backgrounds. Aqui você encontrará todos os backgrounds disponíveis para compra.`)
    .addField(`🧛‍♂️ | Background`, `Veja todos os backgrounds. Use: \`.bg Zyon [1, 2, 3]\``)
    .setFooter(`© 2021. Zyon • Todos os Direitos Reservados.`, client.user.avatarURL())
    .setThumbnail(message.author.avatarURL({ dynamic: true }))
    message.channel.send(mBackground)
  }

    if(args[0] == "Zyon" && args[1] == "1") {
        const mBackground = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setTitle(`🖼 Zyon BG: Darling in the FranXX (ID: 3)`)
        .setDescription(`Olá ${message.author.username}, este background custa **₿80**. Para comprar, utilize \`${prefixo}comprar bg 3\`.`)
        .setImage(`https://cdn.discordapp.com/attachments/809515908040884264/809519826598494208/cachorro.png`)
        .setFooter(`© 2021. Zyon • Todos os Direitos Reservados.`, client.user.avatarURL())
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
       return message.channel.send(mBackground)
    }
    if(args[0] == "Zyon" && args[1] == "2") {
        const mBackground = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setTitle(`🖼 Zyon BG: Code Geass (ID: 4)`)
        .setDescription(`Olá ${message.author.username}, este background custa **₿80**. Para comprar, utilize \`${prefixo}comprar bg 4\`.`)
        .setImage(`https://cdn.discordapp.com/attachments/809515908040884264/809522167393550376/orochi.png`)
        .setFooter(`© 2021. Zyon • Todos os Direitos Reservados.`, client.user.avatarURL())
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
       return message.channel.send(mBackground)
    }
    if(args[0] == "Zyon" && args[1] == "3") {
        const mBackground = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setTitle(`🖼 Zyon BG: Attack on Titan (ID: 5)`)
        .setDescription(`Olá ${message.author.username}, este background custa **₿80**. Para comprar, utilize \`${prefixo}comprar bg 5\`.`)
        .setImage(`https://cdn.discordapp.com/attachments/809515908040884264/809522588140830760/azideia.png`)
        .setFooter(`© 2021. Zyon • Todos os Direitos Reservados.`, client.user.avatarURL())
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        return message.channel.send(mBackground)
    }
    } catch (e) {
        const erroCanal = client.channels.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'background',
        aliases: ['bg', 'backgrounds', 'bgs']
      }
      }
    }