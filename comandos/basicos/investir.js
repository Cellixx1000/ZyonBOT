
const { MessageEmbed } = require("discord.js");
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
                        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilze o comando \`${prefixo}registrar\` e use o comando de novo!`)
                    } else {
                        // ---- Código ---- //
                        let user = message.author;
                        let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${user.id}`)
                        let snap2 = await ref2.once('value')
                        let author = snap2.val().investir
                        let timeout = 120000;

                        if (author !== null && timeout - (Date.now() - author) > 0) {
                            let time = ms(timeout - (Date.now() - author));
                            let embedtempo = new MessageEmbed()
                                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                                .setTitle("⏰ Cooldown de uso")
                                .setDescription(`Olá ${message.author}, para utilizar este comando você deverá esperar mais um pouco!`)
                                .addField('⏱ Tempo restante para a liberação do comando', `\`\`\`cs\n${time.minutes} minuto(s) e ${time.seconds} segundos\`\`\``)
                                .setFooter("Zyon ® Oficial 2021", client.user.avatarURL());
                            message.channel.send(embedtempo);
                        } else {
                            let saldoEmMaos1 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${user.id}`)
                            let saldoEmMaos = await saldoEmMaos1.once('value')
                            let bal1 = saldoEmMaos.val().dinheiro
                            let bal2 = parseInt(bal1)
                            let pontosAtuais1 = await database.ref(`Economia/Servidor/${message.guild.id}/Pontos/Usuário/${user.id}`)
                            let pontosAtuais = await pontosAtuais1.once('value')
                            let ecopSeta = pontosAtuais.val().pontos

                            let amount = Math.floor(Math.random() * 100) + 1;
                            let ecop = Math.floor(Math.random() * 5) + 1;
                            let novoSaldo = parseInt(amount) + bal2  
                            let novoPonto = parseInt(ecop) + ecopSeta  

                            database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${user.id}`)
                                .update({
                                    dinheiro: novoSaldo
                                })
                            database.ref(`Economia/Servidor/${message.guild.id}/Pontos/Usuário/${user.id}`)
                                .update({
                                    pontos: novoPonto
                                })

                            let novoSaldo3 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${user.id}`)
                            let novoSaldo2 = await novoSaldo3.once('value')
                            let saldoNovo = novoSaldo2.val().dinheiro
                            let et1 = new MessageEmbed()
                                .setTitle("🚘 Concessionária de Veículos - Zyon:tm:")
                                .setThumbnail('https://i.imgur.com/x03uxTa.png')
                                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                                // Removido
                                .setDescription(`Você investiu em uma Concessionária de Veículos.`)
                                .addField('💰 Retorno do investimento', `${'```'}cs\nR$${amount.toLocaleString()}${'```'}`, true)
              .addField('💸 Seu novo saldo em mãos', `${'```'}cs\nR$${saldoNovo.toLocaleString()}${'```'}`, true)
              .setFooter('© Zyon 2021. Todos os direitos reservados.', client.user.avatarURL());
              
              let et2 = new MessageEmbed()
              .setTitle("🚇 Estação de Metrô - Zyon:tm:")
              .setThumbnail('https://i.imgur.com/1CFuZCw.png')
              .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
              // Removido
              .setDescription(`Você investiu na construção de uma Estação de Metrô.`)
              .addField('💰 Retorno do investimento', `${'```'}cs\nR$${amount.toLocaleString()}${'```'}`, true)
              .addField('💸 Seu novo saldo em mãos', `${'```'}cs\nR$${saldoNovo.toLocaleString()}${'```'}`, true)
              .setFooter('© Zyon 2021. Todos os direitos reservados.', client.user.avatarURL());
              
              let et3 = new MessageEmbed()
              .setTitle("🛍 Shopping - Zyon:tm:")
              .setThumbnail('https://i.imgur.com/UMlleaB.png')
              .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
              // Removido
              .setDescription(`Você investiu em um Shopping no centro da cidade.`)
              .addField('💰 Retorno do investimento', `${'```'}cs\nR$${amount.toLocaleString()}${'```'}`, true)
              .addField('💸 Seu novo saldo em mãos', `${'```'}cs\nR$${saldoNovo.toLocaleString()}${'```'}`, true)
              .setFooter('© Zyon 2021. Todos os direitos reservados.', client.user.avatarURL());
              
              let et4 = new MessageEmbed()
              .setTitle("🚍 Transporte Escolar - Zyon:tm:")
              .setThumbnail('https://i.imgur.com/ry98fiv.png')
              .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
              // Removido
              .setDescription(`Você investiu em veículos para transporte escolar.`)
              .addField('💰 Retorno do investimento', `${'```'}cs\nR$${amount.toLocaleString()}${'```'}`, true)
              .addField('💸 Seu novo saldo em mãos', `${'```'}cs\nR$${saldoNovo.toLocaleString()}${'```'}`, true)
              .setFooter('© Zyon 2021. Todos os direitos reservados.', client.user.avatarURL());
              
              let et5 = new MessageEmbed()
              .setTitle("🚖 Táxi - Zyon:tm:")
              .setThumbnail('https://i.imgur.com/fPyfyPp.png')
              .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
              // Removido
              .setDescription(`Você investiu em uma companhia de táxis.`)
              .addField('💰 Retorno do investimento', `${'```'}cs\nR$${amount.toLocaleString()}${'```'}`, true)
              .addField('💸 Seu novo saldo em mãos', `${'```'}cs\nR$${saldoNovo.toLocaleString()}${'```'}`, true)
              .setFooter('© Zyon 2021. Todos os direitos reservados.', client.user.avatarURL());
              
              let replies = [et1, et2, et3, et4, et5];

    let result = Math.floor(Math.random() * replies.length);
    database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
    .update({
      investir: Date.now()
    })
    message.channel.send(replies[result]);
} 
}
}catch (e) {
  const erroCanal = client.channels.get('809515239480885269')
  message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
  erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`investir\``)
}
  },
  conf: {},
  get help () {
    return {
      name: 'investir'
    }
  }
}