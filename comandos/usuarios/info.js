const { MessageEmbed } = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config')
const moment = require('moment')
moment.locale('pt-br')

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
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilze o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
      let target = message.mentions.users.first() || message.author
      let bg12 = await database.ref(`Background/Bimestral: Brasil Império (Rio de Janeiro)/${target.id}`)
      let bg23 = await bg12.once('value')
      let bg43 = bg23.val()
      //<!-- Coletamos as databases --!>
      //<!-- Biografia --!>
      let coletaBiografia1 = await database.ref(`Economia/Global/Biografia/Usuário/${target.id}`)
      let coletaBiografia2 = await coletaBiografia1.once('value')
      let biografia = coletaBiografia2.val().biografia
      //<!-- Empresas --!>
      let coletaNome = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${target.id}`)
      let coletaNome2 = await coletaNome.once('value')
      let EmpresaNome = coletaNome2.val().nome
      let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${target.id}`)
      let coletaEmpresa2 = await coletaEmpresa1.once('value')
      let Empresario = coletaEmpresa2.val().possuiEmpresa
      if(Empresario == "Não") Empresario = "Não é empresário!"
      if(Empresario == "Sim") Empresario = `Dono(a) da empresa **${EmpresaNome}**`
      //<!-- Insígnias --!>
      let coletaComnadoI1 = await database.ref(`Economia/Global/Insígnias/Usuário/${target.id}`)
      let coletaComnadoI2 = await coletaComnadoI1.once('value')
      let cincoMilComandos = coletaComnadoI2.val().cincoMilcomandos
      if(cincoMilComandos == true) cincoMilComandos = '🏆 '
      if(cincoMilComandos == 0) cincoMilComandos = ''

      let coletaIdealizador1 = await database.ref(`Economia/Global/Insígnias/Usuário/${target.id}`)
      let coletaIdealizador2 = await coletaIdealizador1.once('value')
      let Idealizador = coletaIdealizador2.val().idealizador
      if(Idealizador == true) Idealizador = '🛠️ '
      if(Idealizador == 0) Idealizador = ''

      let coletaProgramador1 = await database.ref(`Economia/Global/Insígnias/Usuário/${target.id}`)
      let coletaProgramador2 = await coletaProgramador1.once('value')
      let Programador = coletaProgramador2.val().programador
      if(Programador == true) Programador = '<:javaScript1:723372111686664232> '
      if(Programador == 0) Programador = ''

      let coletaDesigner1 = await database.ref(`Economia/Global/Insígnias/Usuário/${target.id}`)
      let coletaDesigner2 = await coletaDesigner1.once('value')
      let Designer = coletaDesigner2.val().designer
      if(Designer == true) Designer = '✒ '
      if(Designer == 0) Designer = ''

      let coletaEquipeZyon1 = await database.ref(`Economia/Global/Insígnias/Usuário/${target.id}`)
      let coletaEquipeZyon2 = await coletaEquipeZyon1.once('value')
      let EquipeZyon = coletaEquipeZyon2.val().equipeZyon
      if(EquipeZyon == true) EquipeZyon = '<:Zyon_staff:718594759626588172> '
      if(EquipeZyon == 0) EquipeZyon = ''

      let coletaDoador1 = await database.ref(`Economia/Global/Insígnias/Usuário/${target.id}`)
      let coletaDoador2 = await coletaDoador1.once('value')
      let Doador = coletaDoador2.val().doador
      if(Doador == true) Doador = '💳 '
      if(Doador == 0) Doador = ''

      let coletaCacador1 = await database.ref(`Economia/Global/Insígnias/Usuário/${target.id}`)
      let coletaCacador2 = await coletaCacador1.once('value')
      let Cacador = coletaCacador2.val().cacadorBugs
      if(Cacador == true) Cacador = '🕵️‍♀️ '
      if(Cacador == 0) Cacador = ''
      if(Cacador == null) Cacador = ''

      let coletaNiver1 = await database.ref(`Economia/Global/Insígnias/Usuário/${target.id}`)
      let coletaNiver2 = await coletaNiver1.once('value')
      let Niver = coletaNiver2.val().niverZyon1ano
      if(Niver == true) Niver = '🎁 '
      if(Niver == 0) Niver = ''
      if(Niver == null) Niver = ''
      //<!-- BitCoin --!>
      let coletaBitcoin1 = await database.ref(`Economia/Global/Bitcoin/Usuário/${target.id}`)
      let coletaBitcoin2 = await coletaBitcoin1.once('value')
      let Bitcoin = coletaBitcoin2.val().bitcoin

      //<!-- Coletamos todas as insígnias --!>
      let insignias = Idealizador + Doador + cincoMilComandos + EquipeZyon + Designer + Programador + Cacador + Niver
      if(!insignias) insignias = 'Shhh! Não encontrei nada aqui!'
      //<!-- Coletamos o background --!>
      let background;
      let direitos = `© 2021. Zyon™ • Todos os Direitos Reservados.`;
      let bg133 = await database.ref(`Background/Bimestral: Brasil Império (Rio de Janeiro)/${target.id}`)
      let bg222 = await bg133.once('value')
      let bg66 = bg222.val()
      if(bg66 === null) {
        database.ref(`Background/Bimestral: Brasil Império (Rio de Janeiro)/${target.id}`)
        .update({
          possui: false,
          link: `https://i.imgur.com/xJuaPBV.png`,
          infoExpor: 0,
          direitos: "Todos os direitos de imagens ('backgrounds') reservados ao(s) criador(es): Studio Tringger e A-1 Pictures."
        })
        if(target.id != message.author.id) return message.channel.send(`<:Zyon_databse:797312622571683871> | **${target.username}** foi registrado na dabatase \`backgrounds_anime@0\`. Execute o comando novamente!`)
        else if(target.id == message.author.id) return message.channel.send(`<:Zyon_databse:797312622571683871> | **${target.username}**, você foi registrado na database \`backgrounds_anime@0\`. Execute o comando novamente!`)
      }
      if(bg66.infoExpor === null) bg66 = ""
      if(bg66.infoExpor == 0) bg66 = ""
      if(bg66.infoExpor != 0) background = bg66.infoExpor
      //<!-- Background de anime #1 --!>
      let bg122 = await database.ref(`Background/Animes/Code Geass/${target.id}`)
      let bg22 = await bg122.once('value')
      let bg400 = bg22.val()
      if(bg400 === null) {
        database.ref(`Background/Animes/Code Geass/${target.id}`)
        .update({
          possui: false,
          usando: false,
          link: `https://i.imgur.com/nBMZUqA.png`,
          direitos: "Todos os direitos de imagens ('backgrounds') reservados ao(s) criador(es): Studio Tringger e A-1 Pictures."
        })
        database.ref(`Background/Animes/Darling in the FranXX/${target.id}`)
        .update({
          possui: false,
          usando: false,
          link: `https://i.imgur.com/xJuaPBV.png`,
          direitos: "Todos os direitos de imagens ('backgrounds') reservados ao(s) criador(es): Studio Tringger e A-1 Pictures."
        })
        database.ref(`Background/Animes/Attack on Titan/${target.id}`)
        .update({
          possui: false,
          usando: false,
          link: `https://i.imgur.com/CsUnrTJ.png`,
          direitos: "Todos os direitos de imagens ('backgrounds') reservados ao(s) criador(es): Studio Tringger e A-1 Pictures."
        })
        if(target.id != message.author.id) return message.channel.send(`<:Zyon_databse:797312622571683871> | **${target.username}** foi registrado na dabatase \`backgrounds_anime\`. Execute o comando novamente!`)
        else if(target.id == message.author.id) return message.channel.send(`<:Zyon_databse:797312622571683871> | **${target.username}**, você foi registrado na database \`backgrounds_anime\`. Execute o comando novamente!`)
      }
      if(bg400.usando == true) background = `${bg400.link}`
      if(bg400.usando == true) direitos = `${bg400.direitos}`
      //<!-- Background de anime #2 --!>
      let bgAnime1 = await database.ref(`Background/Animes/Darling in the FranXX/${target.id}`)
      let bgAnime2 = await bgAnime1.once('value')
      let bgAnime = bgAnime2.val()
      if(bgAnime === null) {
        database.ref(`Background/Animes/Darling in the FranXX/${target.id}`)
        .update({
          possui: false,
          usando: false,
          link: `https://i.imgur.com/xJuaPBV.png`,
          direitos: "Todos os direitos de imagens ('backgrounds') reservados ao(s) criador(es): Studio Tringger e A-1 Pictures."
        })
        if(target.id != message.author.id) return message.channel.send(`<:Zyon_databse:797312622571683871> | **${target.username}** foi registrado na dabatase \`backgrounds_anime@2\`. Execute o comando novamente!`)
        else if(target.id == message.author.id) return message.channel.send(`<:Zyon_databse:797312622571683871> | **${target.username}**, você foi registrado na database \`backgrounds_anime@2\`. Execute o comando novamente!`)
      }
      if(bgAnime.usando == true) background = `${bgAnime.link}`
      if(bgAnime.usando == true) direitos = `${bgAnime.direitos}`
      //<!-- Background de anime #3 --!>
      let bgAnime11 = await database.ref(`Background/Animes/Attack on Titan/${target.id}`)
      let bgAnime22 = await bgAnime11.once('value')
      let bgAnime21 = bgAnime22.val()
      if(bgAnime21 === null) {
        database.ref(`Background/Animes/Attack on Titan/${target.id}`)
        .update({
          possui: false,
          usando: false,
          link: `https://i.imgur.com/CsUnrTJ.png`,
          direitos: "Todos os direitos de imagens ('backgrounds') reservados ao(s) criador(es): Studio Tringger e A-1 Pictures."
        })
        if(target.id != message.author.id) return message.channel.send(`<:Zyon_databse:797312622571683871> | **${target.username}** foi registrado na dabatase \`bbackgrounds_anime@3\`. Execute o comando novamente!`)
        else if(target.id == message.author.id) return message.channel.send(`<:Zyon_databse:797312622571683871> | **${target.username}**, você foi registrado na database \`backgrounds_anime@3\`. Execute o comando novamente!`)
      }
      if(bgAnime21.usando == true) background = `${bgAnime21.link}`
      if(bgAnime21.usando == true) direitos = `${bgAnime21.direitos}`
      //<!-- Coletamos o registro --!>
      let registroPegamos1 = await database.ref(`Zyon/Jogadores/${target.id}`)
      let registroPegamos2 = await registroPegamos1.once('value')
      let registroPegamos = registroPegamos2.val().registro
      //<!-- Coletamos o voto --!>
      let votosPega1 = await database.ref(`Votos/Jogadores/${target.id}`)
      let votosPega2 = await votosPega1.once('value')
      let votos = votosPega2.val().votos

      let inline = true
      const status = {
        online: '<:online2:556683591682228224> Online',
        idle: '<:idle:556678338031255572> Ausente',
        dnd: '<:dnd2:556683837283893248> Não pertubar',
        offline: '<:offline2:556683727929868289> Offline'
      }
      let embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setThumbnail((target.avatarURL({ dynamic: true })))
        .setTitle(`📕 Perfil Informativo`)
        .setDescription(`**Biografia de ${target.tag}:**\n${biografia}`)
        .addField('📑 | Nome', `${target.tag}`, inline)
        .addField(`<:Zyon_calendario:797552889421365289> | Registrou-se em`, `${registroPegamos}`)
        .addField(`<:Zyon_usuario:797553773487587378> | Empresário(a)`, `${Empresario}`)
        .addField('<:bitcoins:723396086303162439> | BitCoin', `₿${Bitcoin.toLocaleString('pt-BR')}`, inline)
        .addField('<:Zyon_coracao:797007025820663838> | Votos resgatados', `${votos.toLocaleString('pt-BR')}`, inline)
        .addField('🌟 | Insígnias especiais', `${insignias}`)
        .setFooter(direitos, client.user.avatarURL())
        .setImage(background)
		    .setColor(`${bg43.corInfo}`)
        .setTimestamp()
      message.channel.send(embed)
      //<!-- Aqui, definimos o nome do comando e suas configurações --!>
  },
  conf: {},
  get help() {
    return {
      name: 'info'
    }
  }
}