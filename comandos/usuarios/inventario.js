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
                return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilze o comando \`${prefixo}registrar\` e use o comando de novo!`)
            }
           //<!-- Coletamos os itens de empregos comuns --!>
            //<!-- Pescador --!>
            let vara1 = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
            let vara2 = await vara1.once('value')
            let vara = vara2.val().facaoItem
            //<!-- Lenhador --!>
            let machado1 = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
            let machado2 = await machado1.once('value')
            let machado = machado2.val().luvasItem
            //<!-- Caçador --!>
            let arco1 = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
            let arco2 = await arco1.once('value')
            let arco = arco2.val().foiceItem
            //<!-- Minerador --!>
            let picareta1 = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
            let picareta2 = await picareta1.once('value')
            let picareta = picareta2.val().picaretaItem

            //<!-- Coletamos os itens de empregos avançados --!>
            //<!-- Policial --!>
            let viatura1 = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
            let viatura2 = await viatura1.once('value')
            let viatura = viatura2.val().cadernoItem
            //<!-- Engenheiro Rural --!>
            let trator1 = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
            let trator2 = await trator1.once('value')
            let trator = trator2.val().lapisItem
            //<!-- Químico --!>
            let matlab1 = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
            let matlab2 = await matlab1.once('value')
            let matlab = matlab2.val().envelopesItem
            //<!-- AdvoGADO --!>
            let laptop1 = await database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
            let laptop2 = await laptop1.once('value')
            let laptop = laptop2.val().estetoscopioItem

            //<!-- Prosseguimos o código enviando a embed para o usuário --!>
            const mInventario = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                .setTitle(`<:Inventario:731240196154327060> Inventário de ${message.author.tag}`)
                .setDescription(`Este é o seu inventário, abaixo estarão todos os itens que você precisa ter para os empregos e as quantidades de cada um.`)
                .addField(':fishing_pole_and_fish: | Vara de pesca', `Você possui **${vara.toLocaleString()}** vara(s) de pesca.`)
                .addField(':axe: | Machado', `Você possui **${machado.toLocaleString()}** machado(s).`)
                .addField(':bow_and_arrow: | Arco', `Você possui **${arco.toLocaleString()}** arco(s).`)
                .addField(':pick: | Picareta', `Você possui **${picareta.toLocaleString()}** picareta(s).`)
                // Removido
                .setFooter('© Zyon™ 2021. Todos os direitos reservados.', client.user.avatarURL())
            message.channel.send(mInventario).then(async reacm => {
                await reacm.react("⬅️");
                await reacm.react("➡️");
                client.on('messageReactionAdd', (reaction, user) => {
                    if (reaction.message.id !== reacm.id) return;
                    if (reaction.emoji.name === "➡️" && user.id === message.author.id) {
                        const mInventario2 = new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setTitle(`<:Inventario:731240196154327060> Inventário de ${message.author.tag}`)
                            .setDescription(`Este é o seu inventário, abaixo estarão todos os itens que você precisa ter para os empregos e as quantidades de cada um.`)
                            .addField('🚔 | Viatura', `Você possui **${viatura.toLocaleString()}** viatura(s).`)
                            .addField('🚜 | Trator', `Você possui **${trator.toLocaleString()}** trator(es).`)
                            .addField('💻 | Laptop', `Você possui **${matlab.toLocaleString()}** laptops.`)
                            .addField('🗺️ | Passagem Aérea', `Você possui **${laptop.toLocaleString()}** passagem(s) aérea(s).`)
                            // Removido
                            .setFooter('© Zyon™ 2021. Todos os direitos reservados.', client.user.avatarURL())
                        reacm.edit(mInventario2);
                        
                    } else {
                        if (reaction.emoji.name === "⬅️" && user.id === message.author.id) {
                            const mInventario3 = new MessageEmbed()
                                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                                .setTitle(`<:Inventario:731240196154327060> Inventário de ${message.author.tag}`)
                                .setDescription(`Este é o seu inventário, abaixo estarão todos os itens que você precisa ter para os empregos e as quantidades de cada um.`)
                                .addField(':fishing_pole_and_fish: | Vara de pesca', `Você possui **${vara.toLocaleString()}** vara(s) de pesca.`)
                                .addField(':axe: | Machado', `Você possui **${machado.toLocaleString()}** machado(s).`)
                                .addField(':bow_and_arrow: | Arco', `Você possui **${arco.toLocaleString()}** arco(s).`)
                                .addField(':pick: | Picareta', `Você possui **${picareta.toLocaleString()}** picareta(s).`)
                                .setImage(`https://media.discordapp.net/attachments/722227634422939738/797935172463886346/ademir-ativa-o-evento-ae.png`)
                                .setFooter('© Zyon™ 2021. Todos os direitos reservados.', client.user.avatarURL())
                            reacm.edit(mInventario3);
                            
                        }
                    }
                })
            })

            //<!-- Aqui, definimos o nome do comando e suas configurações --!>
        } catch (e) {
            const erroCanal = client.channels.get('809515239480885269')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`inventario\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'inventario',
            aliases: ['inv']
        }
    }
}