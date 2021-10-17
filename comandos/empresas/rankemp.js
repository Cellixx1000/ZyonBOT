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
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
      var reac = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setTitle(`🏛 Empresas - Classificações`)
      .setThumbnail('https://i.imgur.com/5YbBfW5.png')
      .setDescription("Seja bem-vindo à classificação de empresas, aqui você verá todos os rankings de empresas!")
      .addField('💸 | Valorizadas', 'Quer saber qual empresa tá valendo mais? Aqui é o lugar certo!')
      .addField('💰 | Cofre', 'Veja as empresas que possuem o cofre mais cheio!')
      .addField("<:db:809531358388682762> | Produtos", "As empresas estão a todo vapor, veja as que mais produzem!")
      .addField("💠 | Nível", "Conheça as empresas com os maiores níveis do servidor!")
      .setFooter('Zyon™ ® Oficial 2020', client.user.avatarURL())
      .setTimestamp(Date.now());
    message.channel.send(reac).then(async reacm => {
      await reacm.react("💸");
      await reacm.react("💰");
      await reacm.react("740370975073501314");
      await reacm.react("💠");
      client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.id !== reacm.id) return;
        else {
          if (reaction.emoji.name === "💰" && user.id === message.author.id) {
            array = [];
  
      const pushdb = database.ref(`Economia/Servidor/${message.guild.id}/Empresas`);
      const db = await pushdb
        .orderByChild("cofre")
        .limitToLast(10)
        .once("value");
    
      await db.forEach(snap => {
        array.push({
          nome: snap.val().nome,
          cofre: snap.val().cofre
        });
      });
    
      array.sort((a, b) => b.cofre - a.cofre);
      
      if (array < 10) Usuáios = "Nenhuma empresa encontrada"
      const embed = new MessageEmbed()
      let Usuários = await array.map((a, posição) => {
          let emoji = ""
          if(posição == 0) emoji = `🥇 `
          if(posição == 1) emoji = `🥈 ` 
          if(posição == 2) emoji = `🥉 `
        return (
         `${emoji} **${posição + 1}.** \`${a.nome}\` • R$${a.cofre.toLocaleString()}`
        );
      });
        
        embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        embed.setTitle(`💰 Empresas mais ricas`)
        embed.setDescription(Usuários)
        embed.setThumbnail(client.user.avatarURL())
        embed.setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
        embed.setTimestamp();
        reacm.edit(embed);
        
          } else if (reaction.emoji.name === "💸" && user.id === message.author.id) {
            array = [];
  
      const pushdb = database.ref(`Economia/Servidor/${message.guild.id}/Empresas`);
      const db = await pushdb
        .orderByChild("valor")
        .limitToLast(10)
        .once("value");
    
      await db.forEach(snap => {
        array.push({
          nome: snap.val().nome,
          valor: snap.val().valor
        });
      });
    
      array.sort((a, b) => b.valor - a.valor);
      
      if (array < 10) Usuáios = "Nenhuma empresa encontrada"
      const embed = new MessageEmbed()
      let Usuários = await array.map((a, posição) => {
          let emoji = ""
          if(posição == 0) emoji = `🥇 `
          if(posição == 1) emoji = `🥈 ` 
          if(posição == 2) emoji = `🥉 `
        return (
         `${emoji} **${posição + 1}.** \`${a.nome}\` • R$${a.valor.toLocaleString()}`
        );
      });
        
        embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        embed.setTitle(`💸 Empresas mais valorizadas`)
        embed.setDescription(Usuários)
        embed.setThumbnail(client.user.avatarURL())
        embed.setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
        embed.setTimestamp();
        reacm.edit(embed);
        
          } else if (reaction.emoji.name === "💠" && user.id === message.author.id) {
            array = [];
  
      const pushdb = database.ref(`Economia/Servidor/${message.guild.id}/Empresas`);
      const db = await pushdb
        .orderByChild("nivel")
        .limitToLast(10)
        .once("value");
    
      await db.forEach(snap => {
        array.push({
          nome: snap.val().nome,
          nivel: snap.val().nivel
        });
      });
    
      array.sort((a, b) => b.nivel - a.nivel);
      
      if (array < 10) Usuáios = "Nenhuma empresa encontrada"
      const embed = new MessageEmbed()
      let Usuários = await array.map((a, posição) => {
          let emoji = ""
          if(posição == 0) emoji = `🥇 `
          if(posição == 1) emoji = `🥈 ` 
          if(posição == 2) emoji = `🥉 `
        return (
         `${emoji} **${posição + 1}.** \`${a.nome}\` • ${a.nivel.toLocaleString()}`
        );
      });
        
        embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        embed.setTitle(`💠 Empresas com maior nível`)
        embed.setDescription(Usuários)
        embed.setThumbnail(client.user.avatarURL())
        embed.setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
        embed.setTimestamp();
        reacm.edit(embed);
        
          } else if (reaction.emoji.id === "740370975073501314" && user.id === message.author.id) {
            array = [];
  
      const pushdb = database.ref(`Economia/Servidor/${message.guild.id}/Empresas`);
      const db = await pushdb
        .orderByChild("produtos")
        .limitToLast(10)
        .once("value");
    
      await db.forEach(snap => {
        array.push({
          nome: snap.val().nome,
          produtos: snap.val().produtos
        });
      });
    
      array.sort((a, b) => b.produtos - a.produtos);
      
      if (array < 10) Usuáios = "Nenhuma empresa encontrada"
      const embed = new MessageEmbed()
      let Usuários = await array.map((a, posição) => {
          let emoji = ""
          if(posição == 0) emoji = `🥇 `
          if(posição == 1) emoji = `🥈 ` 
          if(posição == 2) emoji = `🥉 `
        return (
         `${emoji} **${posição + 1}.** \`${a.nome}\` • ${a.produtos.toLocaleString()}`
        );
      });
        
        embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        embed.setTitle(`<:db:809531358388682762> Empresas com mais produtos`)
        embed.setDescription(Usuários)
        embed.setThumbnail(client.user.avatarURL())
        embed.setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
        embed.setTimestamp();
        reacm.edit(embed);
        
    }
        }
      });
    });
    } catch (e) {
        const erroCanal = client.channels.get('733875381131673661')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`rankemp\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'rankemp'
      }
      }
    }