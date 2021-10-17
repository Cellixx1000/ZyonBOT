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
      if (!args[0]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar o ID da sua empresa, caso não saiba, use \`${prefixo}empresas\`!`)
      if (args[0] == "1") {
        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
        let coletaEmpresa = await coletaEmpresa1.once('value')
        let Empresas = coletaEmpresa.val()
        if (Empresas.usuario != message.author.id) {
          return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
        }
        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
        let xpColeta2 = await xpColeta.once('value')
        let xp = xpColeta2.val().xp

        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
        let levelColeta2 = await levelColeta.once('value')
        let level = levelColeta2.val().nivel
        let proximoNivel = level * 650

        const mXP = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .setTitle(`🏛 Experiência da Empresa`)
        .setThumbnail(`${Empresas.imagem}`)
        .setDescription(`Informações sobre o nível da empresa **${Empresas.nome}**!`)
        .addField(`💼 Nível`, `\`\`\`js\n${level}\`\`\``, true)
        .addField(`🔸 XP`, `\`\`\`js\n${xp.toLocaleString('pt-BR')}/${proximoNivel.toLocaleString('pt-BR')}\`\`\``, true)
        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
        message.channel.send(mXP)
      } if (args[0] == "2") {
        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
        let coletaEmpresa = await coletaEmpresa1.once('value')
        let Empresas = coletaEmpresa.val()
        if (Empresas.usuario != message.author.id) {
          return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
        }
        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
        let xpColeta2 = await xpColeta.once('value')
        let xp = xpColeta2.val().xp

        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
        let levelColeta2 = await levelColeta.once('value')
        let level = levelColeta2.val().nivel
        let proximoNivel = level * 650

        const mXP = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .setTitle(`🏛 Experiência da Empresa`)
        .setThumbnail(`${Empresas.imagem}`)
        .setDescription(`Informações sobre o nível da empresa **${Empresas.nome}**!`)
        .addField(`💼 Nível`, `\`\`\`js\n${level}\`\`\``, true)
        .addField(`🔸 XP`, `\`\`\`js\n${xp.toLocaleString('pt-BR')}/${proximoNivel.toLocaleString('pt-BR')}\`\`\``, true)
        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
        message.channel.send(mXP)
      } if (args[0] == "3") {
        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
        let coletaEmpresa = await coletaEmpresa1.once('value')
        let Empresas = coletaEmpresa.val()
        if (Empresas.usuario != message.author.id) {
          return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
        }
        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
        let xpColeta2 = await xpColeta.once('value')
        let xp = xpColeta2.val().xp

        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
        let levelColeta2 = await levelColeta.once('value')
        let level = levelColeta2.val().nivel
        let proximoNivel = level * 650

        const mXP = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .setTitle(`🏛 Experiência da Empresa`)
        .setThumbnail(`${Empresas.imagem}`)
        .setDescription(`Informações sobre o nível da empresa **${Empresas.nome}**!`)
        .addField(`💼 Nível`, `\`\`\`js\n${level}\`\`\``, true)
        .addField(`🔸 XP`, `\`\`\`js\n${xp.toLocaleString('pt-BR')}/${proximoNivel.toLocaleString('pt-BR')}\`\`\``, true)
        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
        message.channel.send(mXP)
      } if (args[0] == "4") {
        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
        let coletaEmpresa = await coletaEmpresa1.once('value')
        let Empresas = coletaEmpresa.val()
        if (Empresas.usuario != message.author.id) {
          return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
        }
        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
        let xpColeta2 = await xpColeta.once('value')
        let xp = xpColeta2.val().xp

        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
        let levelColeta2 = await levelColeta.once('value')
        let level = levelColeta2.val().nivel
        let proximoNivel = level * 650

        const mXP = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .setTitle(`🏛 Experiência da Empresa`)
        .setThumbnail(`${Empresas.imagem}`)
        .setDescription(`Informações sobre o nível da empresa **${Empresas.nome}**!`)
        .addField(`💼 Nível`, `\`\`\`js\n${level}\`\`\``, true)
        .addField(`🔸 XP`, `\`\`\`js\n${xp.toLocaleString('pt-BR')}/${proximoNivel.toLocaleString('pt-BR')}\`\`\``, true)
        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
        message.channel.send(mXP)
      } if (args[0] == "5") {
        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
        let coletaEmpresa = await coletaEmpresa1.once('value')
        let Empresas = coletaEmpresa.val()
        if (Empresas.usuario != message.author.id) {
          return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
        }
        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
        let xpColeta2 = await xpColeta.once('value')
        let xp = xpColeta2.val().xp

        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
        let levelColeta2 = await levelColeta.once('value')
        let level = levelColeta2.val().nivel
        let proximoNivel = level * 650

        const mXP = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .setTitle(`🏛 Experiência da Empresa`)
        .setThumbnail(`${Empresas.imagem}`)
        .setDescription(`Informações sobre o nível da empresa **${Empresas.nome}**!`)
        .addField(`💼 Nível`, `\`\`\`js\n${level}\`\`\``, true)
        .addField(`🔸 XP`, `\`\`\`js\n${xp.toLocaleString('pt-BR')}/${proximoNivel.toLocaleString('pt-BR')}\`\`\``, true)
        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
        message.channel.send(mXP)
      } if (args[0] == "6") {
        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
        let coletaEmpresa = await coletaEmpresa1.once('value')
        let Empresas = coletaEmpresa.val()
        if (Empresas.usuario != message.author.id) {
          return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
        }
        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
        let xpColeta2 = await xpColeta.once('value')
        let xp = xpColeta2.val().xp

        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
        let levelColeta2 = await levelColeta.once('value')
        let level = levelColeta2.val().nivel
        let proximoNivel = level * 650

        const mXP = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .setTitle(`🏛 Experiência da Empresa`)
        .setThumbnail(`${Empresas.imagem}`)
        .setDescription(`Informações sobre o nível da empresa **${Empresas.nome}**!`)
        .addField(`💼 Nível`, `\`\`\`js\n${level}\`\`\``, true)
        .addField(`🔸 XP`, `\`\`\`js\n${xp.toLocaleString('pt-BR')}/${proximoNivel.toLocaleString('pt-BR')}\`\`\``, true)
        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
        message.channel.send(mXP)
      } if (args[0] == "7") {
        let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
        let coletaEmpresa = await coletaEmpresa1.once('value')
        let Empresas = coletaEmpresa.val()
        if (Empresas.usuario != message.author.id) {
          return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
        }
        let xpColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
        let xpColeta2 = await xpColeta.once('value')
        let xp = xpColeta2.val().xp

        let levelColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
        let levelColeta2 = await levelColeta.once('value')
        let level = levelColeta2.val().nivel
        let proximoNivel = level * 650

        const mXP = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .setTitle(`🏛 Experiência da Empresa`)
        .setThumbnail(`${Empresas.imagem}`)
        .setDescription(`Informações sobre o nível da empresa **${Empresas.nome}**!`)
        .addField(`💼 Nível`, `\`\`\`js\n${level}\`\`\``, true)
        .addField(`🔸 XP`, `\`\`\`js\n${xp.toLocaleString('pt-BR')}/${proximoNivel.toLocaleString('pt-BR')}\`\`\``, true)
        .setFooter(`© Zyon™ 2021. Todos os Direitos Reservados.`, client.user.avatarURL())
        message.channel.send(mXP)
      }
      //<!-- Aqui, definimos o nome do comando e suas configurações --!>
    } catch (e) {
      const erroCanal = client.channels.get('733875381131673661')
      message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
      erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`\``)
    }
  },
  conf: {},
  get help() {
    return {
      name: 'xpemp'
    }
  }
}