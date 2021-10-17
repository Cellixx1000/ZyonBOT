const {
    MessageEmbed
  } = require('discord.js')
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
      if (snap.val() == null) {
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
      //<!-- Database dos backgrounds --!>
      let bg1DITF = await database.ref(`Background/BGS/Zyon 1/${message.author.id}`)
      let bg2DITF = await bg1DITF.once('value')
      let bgDITF = bg2DITF.val()
      let possuiBG1 = `🔐 Zyon 1`
      if (bgDITF.possui == true && bgDITF.usando == true) possuiBG1 = `🔓 Zyon 1: Para remover, digite \`${prefixo}remover-bg 3\`.`
      if (bgDITF.possui == true && bgDITF.usando == false) possuiBG1 = `🔓 Zyon 1 não está em uso!`
  
      let bg1CG = await database.ref(`Background/BGS/Zyon 2/${message.author.id}`)
      let bg2CG = await bg1CG.once('value')
      let bgCG = bg2CG.val()
      let possuiBG2 = `🔐 Zyon 2`
      if (bgCG.possui == true && bgCG.usando == true) possuiBG2 = `🔓 Zyon 2: Para remover, digite \`${prefixo}remover-bg 4\`.`
      if (bgCG.possui == true && bgCG.usando == false) possuiBG2 = `🔓 Zyon 2 não está em uso!`
  
      let bg1 = await database.ref(`Background/BGS/Zyon 3/${message.author.id}`)
      let bg2 = await bg1.once('value')
      let bg = bg2.val()
      let possuiBG3 = `🔐 Zyon 3`
      if (bg.possui == true && bg.usando == true) possuiBG3 = `🔓 Zyon 3: Para remover, digite \`${prefixo}remover-bg 5\`.`
      if (bg.possui == true && bg.usando == false) possuiBG3 = `🔓 Zyon 3 não está em uso!`
      if (!args[0]) {
        const mEmbed = new MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({
            dynamic: true
          }))
          .setTitle(`🖼 Painel de Backgrounds`)
          .setDescription(`${message.author.username}, aqui estão todos os seus backgrounds. Para removê-los siga o que diz abaixo.`)
          .addField(`🧛‍♂️ | Backgrounds`, `${possuiBG1}\n${possuiBG2}\n${possuiBG3}`)
          .setThumbnail(message.author.avatarURL({
            dynamic: true
          }))
        message.channel.send(mEmbed)
      }
      if (args[0] == "3") {
        //<!-- Verificamos se o usuário está utilizando algum dos outros três backgrounds --!>
        let bgDITF1 = await database.ref(`Background/BGS/Zyon 1/${message.author.id}`)
        let bgDITF2 = await bgDITF1.once('value')
        let bgDITF = bgDITF2.val()
        if (bgDITF === null) {
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
        let bg1 = await database.ref(`Background/BGS/Zyon 1/${message.author.id}`)
        let bg2 = await bg1.once('value')
        let bg = bg2.val()
        if (bg === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui este background.`)
        if (bg.possui === false) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui este background.`)
        else {
            if(bg.usando == false) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, este background já está desativado.`)
          database.ref(`Background/BGS/Zyon 1/${message.author.id}`)
            .update({
              "usando": false
            })
  
          const mEmbed2 = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({
              dynamic: true
            }))
            .setTitle(`🖼 Remoção de Background`)
            .setDescription(`${message.author.username}, você removeu o background do anime "Zyon 1"! Verifique o seu \`${prefixo}info\`.`)
            .setImage(`https://cdn.discordapp.com/attachments/809515908040884264/809519826598494208/cachorro.png`)
            .setFooter(`© 2021. Zyon • Todos os Direitos Reservados.`)
          message.channel.send(mEmbed2)
        }
      }
      if (args[0] == "4") {
        //<!-- Verificamos se o usuário está utilizando algum dos outros três backgrounds --!>
        let bg12 = await database.ref(`Background/BGS/Zyon 1/${message.author.id}`)
        let bg22 = await bg12.once('value')
        let bg2211121 = bg22.val()
        if (bg2211121 === null) {
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
        let bg1 = await database.ref(`Background/BGS/Zyon 2/${message.author.id}`)
        let bg2 = await bg1.once('value')
        let bg = bg2.val()
        if (bg === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui este background.`)
        if (bg.possui === false) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui este background.`)
        else {
            if(bg.usando == false) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, este background já está desativado.`)
          database.ref(`Background/BGS/Zyon 2/${message.author.id}`)
            .update({
              "usando": false
            })
  
          const mEmbed3 = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({
              dynamic: true
            }))
            .setTitle(`🖼 Remoção de Background`)
            .setDescription(`${message.author.username}, você removeu o background do anime "Zyon 2"! Verifique o seu \`${prefixo}info\`.`)
            .setImage(`https://cdn.discordapp.com/attachments/809515908040884264/809522167393550376/orochi.png`)
            .setFooter(`© 2021. Zyon • Todos os Direitos Reservados.`)
          message.channel.send(mEmbed3)
        }
      }
      if (args[0] == "5") {
        //<!-- Verificamos se o usuário está utilizando algum dos outros três backgrounds --!>
        let bg12 = await database.ref(`Background/BGS/Zyon 1/${message.author.id}`)
        let bg22 = await bg12.once('value')
        let bgAnime40 = bg22.val()
        if (bgAnime40 === null) {
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
        let bg1 = await database.ref(`Background/BGS/Zyon 3/${message.author.id}`)
        let bg2 = await bg1.once('value')
        let bg = bg2.val()

        if (bg === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui este background.`)
        if (bg.possui === false) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui este background.`)
        else {
            if(bg.usando == false) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, este background já está desativado.`)
          database.ref(`Background/BGS/Zyon 3/${message.author.id}`)
            .update({
              "usando": false
            })
          const mEmbed4 = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({
              dynamic: true
            }))
            .setTitle(`🖼 Remoção de Background`)
            .setDescription(`${message.author.username}, você removeu o background do anime "Zyon 3"! Verifique o seu \`${prefixo}info\`.`)
            .setImage(`https://cdn.discordapp.com/attachments/809515908040884264/809522167393550376/orochi.png`)
            .setFooter(`© 2021. Zyon • Todos os Direitos Reservados.`)
          message.channel.send(mEmbed4)
        }
      }
    },
    conf: {},
    get help() {
      return {
        name: 'remover-bg'
      }
    }
  }