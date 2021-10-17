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
      if(!message.member.hasPermission('MANAGE_GUILD', { checkAdmin: true, checkOwner: true })) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não possui a permissão \`GERENCIAR SERVIDOR\`!`);
      if(!args[0]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve mencionar o canal que deseja setar. Exemplo: \`${prefixo}canal #Zyon\`.`)
      const canalColetaa = message.mentions.channels.first()
      if(!canalColetaa) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve mencionar o canal que deseja setar. Exemplo: \`${prefixo}canal #Zyon\`.`)
      if(args > 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve mencionar o canal que deseja setar. Exemplo: \`${prefixo}canal #Zyon\`.`)
      else {
      const canal2 = canalColetaa.id
      database.ref(`Configurações/Servidores/${message.guild.id}/Canal`)
      .update({
          canal: canal2
      })
    let embedSucesso = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTitle('🎉 Canal setado com sucesso!')
    .setDescription(`Olá ${message.author}, o canal <#${canal2}> foi setado como o meu canal de comandos padrão!\n**OBS:** Meus comandos só serão aceitos nele!`)
    .setThumbnail(message.author.avatarURL({ dynamic: true }))
    .setFooter('Zyon™ ® Oficial 2021', client.user.avatarURL())  
    message.channel.send(embedSucesso)
      }
      //<!-- Aqui, definimos o nome do comando e suas configurações --!>
    } catch (e) {
        const erroCanal = client.channels.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`canal\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'canal'
      }
      }
    }