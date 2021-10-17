const { MessageEmbed } = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const { readdirSync } = require('fs')
const config = require('../../config.json')
let emojiMap = {
  nuvem: "798791694325252116",
  gerais: "798792150258810920"
  //etc
};
function getEmoji(name) {
  return `<:${name}:${emojiMap[name]}>`;
}
const os = require("os");
                  const cpuTotal = os.cpus().length
                  const memTotal = os.totalmem();
                  const memLivre = os.freemem()
                  const plataforma = os.platform()
                  const arquitetura = os.arch()
                  const hostname = os.hostname()
let {
  version
} = require("discord.js");
const moment = require('moment')
moment.locale('pt-br')

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
        }
        //<!-- Pegamos a informação de quantos jogadores temos --!>
        array = [];

        const pushdb = database.ref(`Zyon/Jogadores`);
        const db = await pushdb
          .orderByChild("registro")
          .once("value");

        await db.forEach(snap => {
          array.push({
            registro: snap.val().registro
          });
        });

        array.sort((a, b) => b.registro - a.registro);

        if (array < 10) Usuáios = "Nenhum usuário encontrado."
        const embed = new MessageEmbed()
        let Usuários = await array.map((a, posição) => {
          return (
            `${a.registro}`
          );
        });

        //<!-- Pegamos a informação de quantos servidores estão registrados --!>
        array = [];

        const pushdb2 = database.ref(`Configurações/Servidores`);
        const db2 = await pushdb2
          .orderByChild("canal")
          .once("value");

        await db2.forEach(snap => {
          array.push({
            canal: snap.val().canal
          });
        });

        array.sort((a, b) => b.canal - a.canal);

        if (array < 10) Usuáios = "Nenhum usuário encontrado."
        const embed2 = new MessageEmbed()
        let Usuários2 = await array.map((a, posição) => {
          return (
            `${a.canal}`
          );
        });

        //<!-- Enviamos a embed com todas as informações --!>
        let embed4 = new MessageEmbed()
          .setTitle("📑 Informações - Zyon:tm:")
          .setColor()
          .setThumbnail(client.user.avatarURL())
          .setTimestamp()
          .setImage('https://media.discordapp.net/attachments/723990250325540915/723991028230651964/Zyon-1.png')
          .setDescription(`Olá **${message.author.username}**, este é o comando de informações sobre mim.`)
          .addField(`🙋‍♂️ | Meu nome`, client.user.tag)
          .addField(`💖 | Fui criado com muito carinho por`, `<:IconnDanizoka:721862149223219268> Katarina#6002\n<:IconnMavelindo:721862148023648336> Maverick#6002`)
          .addField(`🌟 | Atualmente, sou usado por`, `${client.guilds.cache.size.toLocaleString()} servidores e ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).toLocaleString()} usuários.`)
          .addField(`🎏 | Estou trabalhando na versão`, `${config.versao}`)
          .addField(`⏱ | Acordei fazem`, moment().to(client.startTime, true))
          .addField(`📆 | Projetado em`, moment(client.user.createdAt).format('LLLL'))
          .setFooter('© Zyon™ 2020. Todos os Direitos Reservados.', client.user.avatarURL())
        message.channel.send(embed4).then(async reacm => {
            await reacm.react("⬅");
            await reacm.react("➡");
            client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.message.id !== reacm.id) return;
                if (reaction.emoji.name === "➡" && user.id === message.author.id) {
                  const cmdFiles = readdirSync('./comandos/empregos/')
                  const cmdFiles2 = readdirSync('./comandos/empresas/')
                  const cmdFiles3 = readdirSync('./comandos/gerais/')
                  const cmdFiles4 = readdirSync('./comandos/idealizadores/')
                  const cmdFiles5 = readdirSync('./comandos/configuraveis/')
                  const cmdFiles6 = readdirSync('./comandos/usuarios/')
                  const cmdFiles7 = readdirSync('./comandos/jogos/')
                  const cmdFiles8 = readdirSync('./comandos/basicos/')
                  const cmdFiles9 = readdirSync('./comandos/desenvolvimento/')
                  const valor = cmdFiles.length + cmdFiles2.length + cmdFiles3.length + cmdFiles4.length + cmdFiles5.length + cmdFiles6.length + cmdFiles7.length + cmdFiles8.length + cmdFiles9.length
                     const evtFiles = readdirSync('./events/')
                      let mod = new MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                        .setTitle(":orange_book: Informações gerais")
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`Olá ${message.author}, estas são as minhas informações mais aprofundadas e resumidas. Abaixo tudo o que você deseja saber!`)
                        .addField(`${getEmoji("nuvem")} Estatísticas em nuvem`, `Há **${Usuários2.length.toLocaleString()}** servidores registrados em meus dados, existem também **${Usuários.length.toLocaleString()}** jogadores atualmente.`)
                        .addField(`${getEmoji("gerais")} Estatísticas gerais`, `Estou em **${client.guilds.cache.size.toLocaleString()}** servidores, com **${client.channels.cache.size.toLocaleString()}** canais e **${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).toLocaleString()}** usuários. Acordei a **${moment().to(client.startTime, true)}**!`)
                        .addField('<:Zyon_maquina:798791834276069396> Estatísticas da máquina', `• Hostname: \`${hostname}\`\n• Plataforma: \`${plataforma} (${arquitetura})\`\n• Memória: \`${(memLivre / 1024 / 1024).toFixed(2)}MB/${(memTotal/ 1024 / 1024).toFixed(2)}MB\`\n• Número de CPUs: \`${cpuTotal}\`\n• Banco de dados: [\`Firebase\`](https://firebase.google.com/)\n• Número total de comandos: \`${valor}\`\n• Número total de eventos: \`${evtFiles.length}\``)
                        .setFooter("© Zyon™ 2020. Todos os Direitos Reservados.", client.user.avatarURL())
                        .setTimestamp(Date.now());
                      reacm.edit(mod);
                      
                  }
                  else {
                    if (reaction.emoji.name === "⬅" && user.id === message.author.id) {
                      let mod = new MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                        .setTitle("📑 Informações - Zyon:tm:")
                        .setColor()
                        .setThumbnail(client.user.avatarURL())
                        .setTimestamp()
                        .setImage('https://media.discordapp.net/attachments/723990250325540915/723991028230651964/Zyon-1.png')
                        .setDescription(`Olá **${message.author.username}**, este é o comando de informações sobre mim.`)
                        .addField(`🙋‍♂️ | Meu nome`, client.user.tag)
                        .addField(`💖 | Fui criado com muito carinho por`, `<:IconnDanizoka:721862149223219268> Katarina#6002\n<:IconnMavelindo:721862148023648336> Maverick#6002`)
                        .addField(`🌟 | Atualmente, sou usado por`, `${client.guilds.cache.size.toLocaleString()} servidores e ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).toLocaleString()} usuários.`)
                        .addField(`🎏 | Estou trabalhando na versão`, `${config.versao}`)
                        .addField(`⏱ | Acordei fazem`, moment().to(client.startTime, true))
                        .addField(`📆 | Projetado em`, moment(client.user.createdAt).format('LLLL'))
                        .setFooter('© Zyon™ 2020. Todos os Direitos Reservados.', client.user.avatarURL())
                      reacm.edit(mod);
                      
                    }
                  }
                })
            })
          //<!-- Aqui, definimos o nome do comando e suas configurações --!>
        }
        catch (e) {
          const erroCanal = client.channels.cache.get('757039620054712400')
          message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
          erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`infobot\``)
        }
      },
      conf: {},
        get help() {
          return {
            name: 'infobot'
          }
        }
    }