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
    if(message.author.id != "" && message.author.id != "796125693447635027") return message.channel.send(`😔 | Você não pode executar este comando.`)

		let i0 = 0;
		let i1 = 15;
		let page = 1;

		let description = 
        `**Página:** ${page}/${Math.ceil(client.guilds.cache.size/15)}\n**Servidores:** ${client.guilds.cache.size.toLocaleString('pt-BR')}\n\n`+
		client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
			.map((r, i) => `\`${i + 1}º.\` ${r.name} (**${r.memberCount.toLocaleString('pt-BR')}** membros)`)
			.slice(0, 15)
			.join("\n");

		const embed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setFooter(`© 2021. Zyon™ • Todos os Direitos Reservados.`, client.user.avatarURL())
            .setThumbnail(client.user.avatarURL({ format: 'png', size: 512 }))
			.setTitle(`Listagem de servidores de Zyon:tm:`)
			.setDescription(`Olá ${message.author.username}, este é o meu painel de servidores. Aqui você verá todos os meus servidores rankeados por número de membros!\n`+description);

		const msg = await message.channel.send(embed);
        
		await msg.react("⬅");
		await msg.react("➡");
		await msg.react("❌");

		const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

		collector.on("collect", async(reaction) => {

			if(reaction._emoji.name === "⬅") {

				// Updates variables
				i0 = i0-15;
				i1 = i1-15;
				page = page-1;
                
				// if there is no guild to display, delete the message
				if(i0 < 0){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}
                
				description = `**Página:** ${page}/${Math.ceil(client.guilds.cache.size/15)}\n**Servidores:** ${client.guilds.cache.size.toLocaleString('pt-BR')}\n\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `\`${i + 1}º.\` ${r.name} (**${r.memberCount.toLocaleString('pt-BR')}** membros)`)
					.slice(i0, i1)
					.join("\n");

				// Update the embed with new informations
				embed.setTitle(`Listagem de servidores de Zyon:tm:`)
					.setDescription(description);
            
				// Edit the message 
				msg.edit(embed);
            
			}

			if(reaction._emoji.name === "➡"){

				// Updates variables
				i0 = i0+15;
				i1 = i1+15;
				page = page+1;

				// if there is no guild to display, delete the message
				if(i1 > client.guilds.cache.size + 15){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}

				description = `**Página:** ${page}/${Math.ceil(client.guilds.cache.size/15)}\n**Servidores:** ${client.guilds.cache.size.toLocaleString('pt-BR')}\n\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `\`${i + 1}º.\` ${r.name} (**${r.memberCount.toLocaleString('pt-BR')}** membros)`)
					.slice(i0, i1)
					.join("\n");

				// Update the embed with new informations
				embed.setTitle(`Listagem de servidores de Zyon:tm:`)
					.setDescription(description);
            
				// Edit the message 
				msg.edit(embed);

			}

			if(reaction._emoji.name === "❌"){
				return msg.delete(); 
			}

			// Remove the reaction when the user react to the message
			await reaction.users.remove(message.author.id);

		});
    } catch (e) {
        const erroCanal = client.channels.cache.get('809515239480885269')
        message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
        erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`\``)
    }
},
    conf: {},
    get help () {
      return {
        name: 'servidores'
      }
      }
    }