const { MessageEmbed } = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config.json')
const ms = require('parse-ms')

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
            const guild = client.guilds.cache.get('633022281467166764') //Catetopolis
                    const USER_ID = `${message.author.id}`;

                    if(!guild.member(USER_ID)) {
                        const embed = new MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                        .setTitle(`<a:erro:809516073799122945> Oops! Encontrei um errinho!`)
                        .setDescription(`Olá ${message.author.username}, para resgatar o seu bônus de BitCoin você deve estar em meu servidor oficial.`)
                        .addField(`📨 Entre no servidor`, `[Clique para entrar](https://discord.gg/fZHZ6TpEwV)`, true)
                        .setFooter("Zyon ® Oficial 2021", client.user.avatarURL())
                        return message.channel.send(embed)
                    }
            if (!args[0]) {
                let user = message.author;
                let ref2 = await database.ref(`Economia/Global/Bitcoin/Cooldown/Usuário/${user.id}`)
                let snap2 = await ref2.once('value')
                let author = snap2.val().diarioBit
                let timeout = 86400000;

                if (author !== null && timeout - (Date.now() - author) > 0) {
                    let time = ms(timeout - (Date.now() - author));
                    let embedtempo = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                    .setTitle("⏰ Cooldown de uso") 
                    .setColor("#18dcff")
                    .setDescription(`Olá ${message.author}, para utilizar este comando você deverá esperar mais um pouco!`)
                    .addField('⏱ Tempo restante para a liberação do comando', `\`\`\`cs\n${time.hours} hora(s), ${time.minutes} minuto(s) e ${time.seconds} segundos\`\`\``)
                    // Removido
                    .setFooter("Zyon ® Oficial 2021", client.user.avatarURL());
                    message.channel.send(embedtempo);
                } else {
                    let amount = Math.floor(Math.random () * 3) +1
                    let dinheiroColeta = await database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                    let dinherioPegamos = await dinheiroColeta.once('value')
                    let saldo = dinherioPegamos.val().bitcoin
                    let novoSaldo = parseInt(saldo + amount)
                    database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                        .update({
                            bitcoin: novoSaldo
                        })

                    const mBonus = new MessageEmbed()
                        .setTitle(`<:bitcoin:809525329701371926> BitCoin diário`)
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                        .setDescription(`Bônus diário de BitCoin coletado com sucesso! Execute-o novamente em 24h.`)
                        .addField(`🎁 Resgatou`, `\`\`\`cs\n₿${amount}\`\`\``, true)
                        .addField(`💰 Seu novo saldo`, `\`\`\`cs\n₿${novoSaldo.toLocaleString()}\`\`\``, true)
// Removido    
                        .setFooter("Zyon ® Oficial 2021", client.user.avatarURL())
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setTimestamp()
                    message.channel.send(message.author, mBonus)
                    database.ref(`Economia/Global/Bitcoin/Cooldown/Usuário/${user.id}`)
                        .update({
                            diarioBit: Date.now()
                        })
                }
            }
            //<!-- Aqui, definimos o nome do comando e suas configurações --!>
    },
    conf: {},
    get help() {
        return {
            name: 'bitbonus'
        }
    }
}