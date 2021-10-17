const { MessageEmbed } = require('discord.js')
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
    if(snap.val() == null){
        return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
      }
    //<!-- Verificamos se o usuário é um idealizador --!>
    if(message.author.id != "796125693447635027" && message.author.id != "") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é um dos meus criadores!`)
    //<!-- Verificamos os argumentos --!>
    if(!args[0]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar o ID do usuário!`)
    if(!args[1]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você deve me informar a quantidade de votos que ele deu!`)
    else {
        let user = client.users.cache.get(`${args[0]}`).id
        let tag = client.users.cache.get(`${args[0]}`)
        const quantidade = parseInt(args.splice(1).join(" "))
        //<!-- Coletamos a database de votos --!>
        let votosDB = await database.ref(`Votos/Jogadores/${user}`)
        let votos = await votosDB.once('value')
        let votosF = votos.val().votos
        let bitDB = await database.ref(`Economia/Global/Bitcoin/Usuário/${user}`)
        let bits = await bitDB.once('value')
        let bitF = bits.val().bitcoin
        message.delete(message.author)
        message.channel.send(`<a:__:809531892150829086> | **${message.author.username}**, você tem certeza que deseja setar **${quantidade} votos** para **${tag.tag}**?`).then(async i => {
            const filter = m => m.content.toLowerCase().includes('sim')
            const collector = message.channel.createMessageCollector(filter, {
                time: 30000
            });

            collector.on('collect', async m => {
                if (m.author.id !== message.author.id) return;
                m.delete(m.author)
                i.delete()
                collector.stop()
                let novoVoto = parseInt(votosF) + quantidade
                database.ref(`Votos/Jogadores/${user}`)
                    .update({
                        usuario: user,
                        votos: novoVoto
                    })
                    let novoBit = parseInt(bitF) + quantidade
                    database.ref(`Economia/Global/Bitcoin/Usuário/${user}`)
                    .update({
                        bitcoin: novoBit
                    })
                //<!-- Coletamos o saldo do indivíduo --!>
                let ref3 = await database.ref(`Economia/Global/Bitcoin/Usuário/${user}`)
                let snap3 = await ref3.once('value')
                let bitcoin = snap3.val().bitcoin
                let ref4 = await database.ref(`Votos/Jogadores/${user}`)
                let snap4 = await ref4.once('value')
                let votos2 = snap4.val().votos
                //----------------------------------------
                message.channel.send(`<a:empNivel:768164295468122123> | **${message.author.username}** resgatou **${quantidade} votos** de **${tag.username}**, que agora possui **${novoVoto} votos**.`)
                const embed = new MessageEmbed()
                .setAuthor(`Resgatado por ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                .setTitle(`💖 Obrigado pelo seu apoio!`)
                .setDescription(`Olá ${tag.username}! Muitíssimo obrigado por ter votado em mim! Como uma forma de te agradecer por isso, te dei um bônus. Se liga ⬇`)
                .addField(`🎁 Bônus por votar`, `\`\`\`cs\n₿${quantidade}\`\`\``, true)
                .addField(`<:bitcoin:809525329701371926> Saldo de BitCoin`, `\`\`\`cs\n₿${bitcoin}\`\`\``, true)
                .addField(`🙋‍♂️ Seus votos`, `\`\`\`cs\n${votos2}\`\`\``, true)
                .setFooter(`© 2020. Zyon™ • Todos os direitos reservados.`, client.user.avatarURL())
                .setThumbnail(tag.avatarURL({ dynamic: true }))
                tag.send(embed)
            });
            collector.on("end", (coletado) => {
                if (coletado.size == 0) {
                    i.delete()
                    message.delete(message.author)
                    message.channel.send(`<:cooldown:610984469188313100> | **${message.author.username}**, o tempo de espera para resposta acabou, o resgate foi cancelado.`)
                }
            })
        })
    }
    //<!-- Aqui, definimos o nome do comando e suas configurações --!>
},
    conf: {},
    get help () {
      return {
        name: 'resgatar'
      }
      }
    }