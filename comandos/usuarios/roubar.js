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
            return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
        }
        if(!args[0]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa informar a pessoal que deseja roubar. Uso correto: \`${prefixo}roubar @Usuário [arma]\`.`)
        if(!message.mentions.members.first()) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, mencione a pessoa que deseja roubar! Uso correto: \`${prefixo}roubar @Usuário [arma]\`.`)
        if(message.mentions.members.first().id == message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não pode roubar a si mesmo.`)
        if (!args[1]) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa informar a arma que usará para roubar. Uso correto: \`${prefixo}roubar @Usuário [arma]\`.`)
        //<!-- Verificamos a database "Coowldown" para ver se o usuário já executou este comando --!>
        let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
        let snap2 = await ref2.once('value')
        let author = snap2.val().roubar
        let timeout = 43200000
        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));
            let embedtempo = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                .setTitle("⏰ Cooldown de uso")
                .setDescription(`Olá ${message.author}, para utilizar este comando você deverá esperar mais um pouco!`)
                .addField('⏱ Tempo restante para a liberação do comando', `\`\`\`cs\n${time.hours} hora(s) ${time.minutes} minuto(s) e ${time.seconds} segundo(s)\`\`\``)
                .setFooter("Zyon™ ® Oficial 2020", client.user.avatarURL());
            message.channel.send(embedtempo);
        } else {
            if (args[1] == "pistola") {
                //<!-- Verificamos a database "Arsenal" --!>
                let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let pistola = arsenal.val().pistola
                if (pistola == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de uma pistola para executar este comando. Visite a \`${prefixo}loja\`!`)
                let target = message.mentions.users.first()
                let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                let snap2 = await ref2.once('value')
                try {
                    let dinero = snap2.val().dinheiro
                    if (dinero === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                } catch (e) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                }
                if (snap2.val().dinheiro == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                if (snap2.val().dinheiro < 200) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                else {
                    let target = message.mentions.users.first()
                    database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                              roubar: Date.now()
                            })
                    let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                    let snap2 = await ref2.once('value')
                    let dinero = snap2.val().dinheiro
                    if (dinero >= 500) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - 500
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + 500
                            })
                        return message.channel.send(`🏃‍♂️ | **${message.author.username}** roubou o(a) usuário(a) **${target.username}** e levou **R$500**.`)
                    } else if (dinero < 500) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - dinero
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + dinero
                            })
                        return message.channel.send(`🏃‍♂️ | **${message.author.username}** roubou o(a) usuário(a) **${target.username}** e levou **R$${dinero}**.`)
                    }
                }

            }
            if (args[1] == "revolver") {
                //<!-- Verificamos a database "Arsenal" --!>
                let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let pistola = arsenal.val().revólver
                if (pistola == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de um revólver para executar este comando. Visite a \`${prefixo}loja\`!`)
                let target = message.mentions.users.first()
                let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                let snap2 = await ref2.once('value')
                try {
                    let dinero = snap2.val().dinheiro
                    if (dinero === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                } catch (e) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                }
                if (snap2.val().dinheiro == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                if (snap2.val().dinheiro < 200) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                else {
                    let target = message.mentions.users.first()
                    database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                              roubar: Date.now()
                            })
                    let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                    let snap2 = await ref2.once('value')
                    let dinero = snap2.val().dinheiro
                    if (dinero >= 900) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - 900
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + 900
                            })
                        return message.channel.send(`🏃‍♂️ | **${message.author.username}** roubou o(a) usuário(a) **${target.username}** e levou **R$900**.`)
                    } else if (dinero < 900) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - dinero
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + dinero
                            })
                        return message.channel.send(`🏃‍♂️ | **${message.author.username}** roubou o(a) usuário(a) **${target.username}** e levou **R$${dinero}**.`)
                    }
                }

            }
            if (args[1] == "remington") {
                //<!-- Verificamos a database "Arsenal" --!>
                let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let pistola = arsenal.val().remington
                if (pistola == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de uma remington para executar este comando. Visite a \`${prefixo}loja\`!`)
                let target = message.mentions.users.first()
                let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                let snap2 = await ref2.once('value')
                try {
                    let dinero = snap2.val().dinheiro
                    if (dinero === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                } catch (e) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                }
                if (snap2.val().dinheiro == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                if (snap2.val().dinheiro < 200) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                else {
                    let target = message.mentions.users.first()
                    database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                              roubar: Date.now()
                            })
                    let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                    let snap2 = await ref2.once('value')
                    let dinero = snap2.val().dinheiro
                    if (dinero >= 1400) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - 1400
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + 1400
                            })
                        return message.channel.send(`🏃‍♂️ | **${message.author.username}** roubou o(a) usuário(a) **${target.username}** e levou **R$1,400**.`)
                    } else if (dinero < 1400) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - dinero
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + dinero
                            })
                        return message.channel.send(`🏃‍♂️ | **${message.author.username}** roubou o(a) usuário(a) **${target.username}** e levou **R$${dinero}**.`)
                    }
                }

            }
            if (args[1] == "ak-47") {
                //<!-- Verificamos a database "Arsenal" --!>
                let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let pistola = arsenal.val().ak47
                if (pistola == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de uma AK-47 para executar este comando. Visite a \`${prefixo}loja\`!`)
                let target = message.mentions.users.first()
                let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                let snap2 = await ref2.once('value')
                try {
                    let dinero = snap2.val().dinheiro
                    if (dinero === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                } catch (e) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                }
                if (snap2.val().dinheiro == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                if (snap2.val().dinheiro < 200) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                else {
                    let target = message.mentions.users.first()
                    database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                              roubar: Date.now()
                            })
                    let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                    let snap2 = await ref2.once('value')
                    let dinero = snap2.val().dinheiro
                    if (dinero >= 1400) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - 2000
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + 2000
                            })
                        return message.channel.send(`🏃‍♂️ | **${message.author.username}** roubou o(a) usuário(a) **${target.username}** e levou **R$2,000**.`)
                    } else if (dinero < 2000) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - dinero
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + dinero
                            })
                        return message.channel.send(`🏃‍♂️ | **${message.author.username}** roubou o(a) usuário(a) **${target.username}** e levou **R$${dinero}**.`)
                    }
                }

            }
            if (args[1] == "m4a1") {
                //<!-- Verificamos a database "Arsenal" --!>
                let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let pistola = arsenal.val().m4a1
                if (pistola == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de uma M4A1 para executar este comando. Visite a \`${prefixo}loja\`!`)
                let target = message.mentions.users.first()
                let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                let snap2 = await ref2.once('value')
                try {
                    let dinero = snap2.val().dinheiro
                    if (dinero === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                } catch (e) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                }
                if (snap2.val().dinheiro == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                if (snap2.val().dinheiro < 200) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                else {
                    let target = message.mentions.users.first()
                    database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                              roubar: Date.now()
                            })
                    let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                    let snap2 = await ref2.once('value')
                    let dinero = snap2.val().dinheiro
                    if (dinero >= 2600) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - 2600
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + 2600
                            })
                        return message.channel.send(`🏃‍♂️ | **${message.author.username}** roubou o(a) usuário(a) **${target.username}** e levou **R$2,600**.`)
                    } else if (dinero < 2600) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - dinero
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + dinero
                            })
                        return message.channel.send(`🏃‍♂️ | **${message.author.username}** roubou o(a) usuário(a) **${target.username}** e levou **R$${dinero}**.`)
                    }
                }

            } if (args[1] == "m4-h") {
                //<!-- Verificamos a database "Arsenal" --!>
                let arsenalRef = await database.ref(`Economia/Global/Bitcoin/Arsenal/Usuário/${message.author.id}`)
                let arsenal = await arsenalRef.once('value')
                let pistola = arsenal.val().m4a1S
                let arsenalRef2 = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                let arsenal2 = await arsenalRef2.once('value')
                let pistola2 = arsenal2.val().m4a1
                if (pistola2 == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa de uma M4A1 para executar este comando. Visite a \`${prefixo}loja\`!`)
                if (pistola == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você precisa ter a skin M4A1 Halloween para executar este comando. Visite a \`${prefixo}loja\`!`)
                let target = message.mentions.users.first()
                let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                let snap2 = await ref2.once('value')
                try {
                    let dinero = snap2.val().dinheiro
                    if (dinero === null) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                } catch (e) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter saldo em mãos.`)
                }
                if (snap2.val().dinheiro == 0) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                if (snap2.val().dinheiro < 200) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, o usuário **${target.tag}** deve ter pelo menos **R$200** em seu saldo nas mãos.`)
                else {
                    let target = message.mentions.users.first()
                    database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                            .update({
                              roubar: Date.now()
                            })
                    let ref2 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                    let snap2 = await ref2.once('value')
                    let dinero = snap2.val().dinheiro
                    if (dinero >= 4000) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - 4000
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + 4000
                            })
                        const embed = new MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                        .setTitle(`🏃‍♂️ Roubo à mão armada`)
                        .setDescription(`**${message.author.username}** roubou o(a) usuário(a) **${target.username}**`)
                        .addField(`💰 Valor saqueado`, `\`\`\`cs\nR$4,000\`\`\``, true)
                        .addField(`🔫 Arma utilizada`, `\`\`\`cs\nM4A1 Halloween\`\`\``, true)
                        .setImage(`https://media.discordapp.net/attachments/722227634422939738/772269778264915998/video-_15__1.gif`)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setFooter(`🎃 Roubo feito com a skin "M4A1 Halloween 2020".`, client.user.avatarURL())
                        return message.channel.send(embed)
                    } else if (dinero < 4000) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${target.id}`)
                            .update({
                                dinheiro: dinero - dinero
                            })
                        let ref4 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                        let snap4 = await ref4.once('value')
                        let dineroLadraum = snap4.val().dinheiro
                        database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                            .update({
                                dinheiro: dineroLadraum + dinero
                            })
                            const embed = new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                            .setTitle(`🏃‍♂️ Roubo à mão armada`)
                            .setDescription(`**${message.author.username}** roubou o(a) usuário(a) **${target.username}**`)
                            .addField(`💰 Valor saqueado`, `\`\`\`cs\nR$${dinero}\`\`\``, true)
                            .addField(`🔫 Arma utilizada`, `\`\`\`cs\nM4A1 Halloween\`\`\``, true)
                            .setImage(`https://media.discordapp.net/attachments/722227634422939738/772269778264915998/video-_15__1.gif`)
                            .setThumbnail(message.author.avatarURL({ dynamic: true }))
                            .setFooter(`🎃 Roubo feito com a skin "M4A1 Halloween 2020".`, client.user.avatarURL())
                        return message.channel.send(embed)
                    }
                }

            }
        }
    },
    conf: {},
    get help() {
        return {
            name: 'roubar',
            aliases: ['rb']
        }
    }
}