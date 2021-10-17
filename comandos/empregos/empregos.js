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
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilze o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
    //<!-- Coletamos os pontos do jogador --!>
    let pontosColeta = await database.ref(`Economia/Servidor/${message.guild.id}/Pontos/Usuário/${message.author.id}`)
    let pontosColetou = await pontosColeta.once('value')
    let pontos = pontosColetou.val().pontos  

    //<!-- Coletamos as informações dos empregos comuns --!>
    //<!-- Pescador --!>
    let pescadorEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
    let pescadorColetou = await pescadorEmprego.once('value')
    let pescadorPega = pescadorColetou.val().cortador
    if(pescadorPega == 0) pescadorPega = `[${pontos}/100] 🔐`
    if(pescadorPega == true) pescadorPega = `desbloqueado! 🔓`
    else if(pontos > 100) pescadorPega = `[${pontos}/100] Use: \`${prefixo}desbloquear pescador\`! 🔒`
    //<!-- Lenhador --!>
    let lenhadorEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
    let lenhadorColetou = await lenhadorEmprego.once('value')
    let lenhadorPega = lenhadorColetou.val().algodoeiro
    if(lenhadorPega == 0) lenhadorPega = `[${pontos}/250] 🔐`
    if(lenhadorPega == true) lenhadorPega = `desbloqueado! 🔓`
    else if(pontos > 250) lenhadorPega = `[${pontos}/250] Use: \`${prefixo}desbloquear lenhador\`! 🔒`
    //<!-- Caçador --!>
    let cacadorEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
    let cacadorColetou = await cacadorEmprego.once('value')
    let cacadorPega = cacadorColetou.val().cafeicultor
    if(cacadorPega == 0) cacadorPega = `[${pontos}/400] 🔐`
    if(cacadorPega == true) cacadorPega = `desbloqueado! 🔓`
    else if(pontos > 400) cacadorPega = `[${pontos}/400] Use: \`${prefixo}desbloquear cacador\`! 🔒`
    //<!-- Minerador --!>
    let mineradorEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
    let mineradorColetou = await mineradorEmprego.once('value')
    let mineradorPega = mineradorColetou.val().minerador
    if(mineradorPega == 0) mineradorPega = `[${pontos}/550] 🔐`
    if(mineradorPega == true) mineradorPega = `desbloqueado! 🔓`
    else if(pontos > 550) mineradorPega = `[${pontos}/550] Use: \`${prefixo}desbloquear minerador\`! 🔒`
    //<!-- Coletamos os empregos avançados --!>
    //<!-- Policial --!>
    let policialEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
    let policialColetou = await policialEmprego.once('value')
    let policialPega = policialColetou.val().poeta
    if(policialPega == 0) policialPega = `[${pontos}/1,000] 🔐`
    if(policialPega == true) policialPega = `desbloqueado! 🔓`
    else if(pontos > 1000) policialPega = `[${pontos}/1,000] Use: \`${prefixo}desbloquear policial\`! 🔒`
    //<!-- Engenheiro --!>
    let engenheiroEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
    let engenheiroColetou = await engenheiroEmprego.once('value')
    let engenheiroPega = engenheiroColetou.val().arquiteto
    if(engenheiroPega == 0) engenheiroPega = `[${pontos}/1,250] 🔐`
    if(engenheiroPega == true) engenheiroPega = `desbloqueado! 🔓`
    else if(pontos > 1250) engenheiroPega = `[${pontos}/1,250] Use: \`${prefixo}desbloquear engenheiro\`! 🔒`
    //<!-- Químico --!>
    let quimicoEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
    let quimicoColetou = await quimicoEmprego.once('value')
    let quimicoPega = quimicoColetou.val().advogado
    if(quimicoPega == 0) quimicoPega = `[${pontos}/1,550] 🔐`
    if(quimicoPega == true) quimicoPega = `desbloqueado! 🔓`
    else if(pontos > 1550) quimicoPega = `[${pontos}/1,550] Use: \`${prefixo}desbloquear programador\`! 🔒`
    //<!-- AdvoGADO --!>
    let advogadoEmprego = await database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
    let advogadoColetou = await advogadoEmprego.once('value')
    let advogadoPega = advogadoColetou.val().medico
    if(advogadoPega == 0) advogadoPega = `[${pontos}/1,750] 🔐`
    if(advogadoPega == true) advogadoPega = `desbloqueado! 🔓`
    else if(pontos > 1750) advogadoPega = `[${pontos}/1,750] Use: \`${prefixo}desbloquear advogado\`! 🔒`

    //<!-- Enviamos a embed --!>
    var reac = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTitle("💼 Agência de Empregos - Zyon:tm:")
    .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
    .setThumbnail(message.author.avatarURL({ dynamic: true }))
    //Removido
    .setDescription("Olá **" + message.author.username + "**, esta é a minha agência de empregos. Aqui você encontrará todos os empregos que existem em meu sistema.")
    .addField("🏆 | Empregos Iniciais", "Aqui ficam os seus empregos iniciais, são os mais fáceis de conseguir!")
    .addField("⚖ | Empregos Avançados", "Os avançados são empregos mais difícieis de conseguir, mas você conseguirá, acredite!")
    .addField("✨ | Dica de ouro da equipe Zyon:tm:", "Utilize os comandos `"+prefixo+"trabalhar`, `"+prefixo+"crime` e `"+prefixo+"investir`. Eles irão te dar pontos de atividade!")
    .setTimestamp(Date.now());
    message.channel.send(reac).then(async reacm => {
     await reacm.react("🏆");
     await reacm.react("⚖");   
     client.on('messageReactionAdd', (reaction, user) => {
         if(reaction.message.id !== reacm.id) return;
           if (reaction.emoji.name === "🏆" && user.id === message.author.id){
              let mod = new MessageEmbed()
              .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
              .setTitle("🏆 Empregos Iniciais")
              .setThumbnail(message.author.avatarURL({ dynamic: true }))
              .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
              .setDescription("Os empregos iniciais são aqueles mais fáceis de conseguir e também são os mais utilizados pelos usuários. Veja-os abaixo:")
             // .addField("🕵️‍♂️ | Detetive", "Este emprego é desbloqueado com **700** pontos de atividade.\n**Seu progresso:** "+detetivePega+"")
              .addField("👷🏻 | Minerador", "Com **550** pontos de atividade minere minérios valiosos.\n**Seu progresso:** "+ mineradorPega+ "")
              .addField("🦌 | Caçador", "Chegue aos **400** pontos de atividade e casse alguns animais.\n**Seu progresso:** "+cacadorPega+"")  
              .addField("👨🏻‍🌾 | Lenhador", "Comece a cortar toras de madeira com **250** pontos de atividade.\n**Seu progresso:** "+lenhadorPega+"")      
              .addField("🎣 | Pescador", "Pesque alguns peixes no Rio Monopólis ao chegar em **100** pontos de atividade.\n**Seu progresso:** "+pescadorPega+"")      
              .setTimestamp(Date.now());
             reacm.edit(mod);
             
        }else { 
           if (reaction.emoji.name === "⚖" && user.id === message.author.id){
              let mod = new MessageEmbed()
              .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
              .setTitle("⚖ Empregos Avançados")
              .setThumbnail(message.author.avatarURL({ dynamic: true }))
              .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
              .setDescription("Os empregos avançados são aqueles que te dão mais dinheiro que os comuns, são mais difíceis de conseguir.")
              .addField("👨‍⚖️ | Advogado", "Chegou a sua vez de ir à Vara do Juiz, consiga **1,750** pontos de atividade.\n**Seu progresso:** "+advogadoPega+"")
              .addField("👨‍💻 | Programador", "Chegue aos **1,550** pontos de atividade para começar a mexer em códigos.\n**Seu progresso:** "+quimicoPega+"")
              .addField("👨‍🌾 | Engenheiro Rural", "Aos **1,250** pontos de atividade, ajude fazendas a melhorarem suas estruturas.\n**Seu progresso:** "+engenheiroPega+"")
              .addField("👮‍♂️ | Policial", "Inicie suas rondas com **1,000** pontos de atividade.\n**Seu progresso:** "+policialPega+"")
              .setTimestamp(Date.now());
             reacm.edit(mod);
             /* */
           }}});});

    //<!-- Aqui, definimos o nome do comando e suas configurações --!>
    } catch (e) {
        const erroCanal = client.channels.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`empregos\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'empregos'
      }
      }
    }