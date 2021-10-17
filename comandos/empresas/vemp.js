const Discord = require('discord.js')
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
                return message.channel.send(`<a:erro:809516073799122945> | Olá ${message.author}, por gentileza, utilize o comando \`${prefixo}registrar\` e use o comando de novo!`)
            }
            if (args[0] == "1") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                else {
                    if (Empresas.estaAvenda == "Sim") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está à venda!`)
                    message.channel.send(`<a:carregando:522226811006877716> | **${message.author.username}**, você está prestes a colocar sua empresa à venda. Esta é uma ação irreversível.\n<:channel_nsfw:585783907660857354> **| Se você confirma a venda, digite "sim".**`).then(async i => {
                        const filter = m => m.content.toLowerCase().includes('sim');
                        const collector = message.channel.createMessageCollector(filter, {
                            time: 60000
                        });

                        collector.on('collect', m => {
                            if (m.author.id !== message.author.id) return;
                            i.delete()
                            collector.stop()
                            message.channel.send(`<a:Zyon_concluido:738140193168818339> | **${message.author.username}**, a sua empresa agora está à venda. Aguarde algum usuário comprar!`)
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                                .update({
                                    estaAvenda: "Sim"
                                })
                        });
                        collector.on("end", (coletado) => {
                            if (coletado.size == 0) {
                                i.delete()
                                message.channel.send(`<:cooldown:610984469188313100> | **${message.author.username}**, o tempo de espera para resposta acabou, a venda foi cancelada.`)
                            }
                        })
                    })
                }
            } if (args[0] == "2") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                else {
                    if (Empresas.estaAvenda == "Sim") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está à venda!`)
                    message.channel.send(`<a:carregando:522226811006877716> | **${message.author.username}**, você está prestes a colocar sua empresa à venda. Esta é uma ação irreversível.\n<:channel_nsfw:585783907660857354> **| Se você confirma a venda, digite "sim".**`).then(async i => {
                        const filter = m => m.content.toLowerCase().includes('sim');
                        const collector = message.channel.createMessageCollector(filter, {
                            time: 60000
                        });

                        collector.on('collect', m => {
                            if (m.author.id !== message.author.id) return;
                            i.delete()
                            collector.stop()
                            message.channel.send(`<a:Zyon_concluido:738140193168818339> | **${message.author.username}**, a sua empresa agora está à venda. Aguarde algum usuário comprar!`)
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                                .update({
                                    estaAvenda: "Sim"
                                })
                        });
                        collector.on("end", (coletado) => {
                            if (coletado.size == 0) {
                                i.delete()
                                message.channel.send(`<:cooldown:610984469188313100> | **${message.author.username}**, o tempo de espera para resposta acabou, a venda foi cancelada.`)
                            }
                        })
                    })
                }
            } if (args[0] == "3") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                else {
                    if (Empresas.estaAvenda == "Sim") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está à venda!`)
                    message.channel.send(`<a:carregando:522226811006877716> | **${message.author.username}**, você está prestes a colocar sua empresa à venda. Esta é uma ação irreversível.\n<:channel_nsfw:585783907660857354> **| Se você confirma a venda, digite "sim".**`).then(async i => {
                        const filter = m => m.content.toLowerCase().includes('sim');
                        const collector = message.channel.createMessageCollector(filter, {
                            time: 60000
                        });

                        collector.on('collect', m => {
                            if (m.author.id !== message.author.id) return;
                            i.delete()
                            collector.stop()
                            message.channel.send(`<a:Zyon_concluido:738140193168818339> | **${message.author.username}**, a sua empresa agora está à venda. Aguarde algum usuário comprar!`)
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                                .update({
                                    estaAvenda: "Sim"
                                })
                        });
                        collector.on("end", (coletado) => {
                            if (coletado.size == 0) {
                                i.delete()
                                message.channel.send(`<:cooldown:610984469188313100> | **${message.author.username}**, o tempo de espera para resposta acabou, a venda foi cancelada.`)
                            }
                        })
                    })
                }
            } if (args[0] == "4") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                else {
                    if (Empresas.estaAvenda == "Sim") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está à venda!`)
                    message.channel.send(`<a:carregando:522226811006877716> | **${message.author.username}**, você está prestes a colocar sua empresa à venda. Esta é uma ação irreversível.\n<:channel_nsfw:585783907660857354> **| Se você confirma a venda, digite "sim".**`).then(async i => {
                        const filter = m => m.content.toLowerCase().includes('sim');
                        const collector = message.channel.createMessageCollector(filter, {
                            time: 60000
                        });

                        collector.on('collect', m => {
                            if (m.author.id !== message.author.id) return;
                            i.delete()
                            collector.stop()
                            message.channel.send(`<a:Zyon_concluido:738140193168818339> | **${message.author.username}**, a sua empresa agora está à venda. Aguarde algum usuário comprar!`)
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                                .update({
                                    estaAvenda: "Sim"
                                })
                        });
                        collector.on("end", (coletado) => {
                            if (coletado.size == 0) {
                                i.delete()
                                message.channel.send(`<:cooldown:610984469188313100> | **${message.author.username}**, o tempo de espera para resposta acabou, a venda foi cancelada.`)
                            }
                        })
                    })
                }
            } if (args[0] == "5") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                else {
                    if (Empresas.estaAvenda == "Sim") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está à venda!`)
                    message.channel.send(`<a:carregando:522226811006877716> | **${message.author.username}**, você está prestes a colocar sua empresa à venda. Esta é uma ação irreversível.\n<:channel_nsfw:585783907660857354> **| Se você confirma a venda, digite "sim".**`).then(async i => {
                        const filter = m => m.content.toLowerCase().includes('sim');
                        const collector = message.channel.createMessageCollector(filter, {
                            time: 60000
                        });

                        collector.on('collect', m => {
                            if (m.author.id !== message.author.id) return;
                            i.delete()
                            collector.stop()
                            message.channel.send(`<a:Zyon_concluido:738140193168818339> | **${message.author.username}**, a sua empresa agora está à venda. Aguarde algum usuário comprar!`)
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                                .update({
                                    estaAvenda: "Sim"
                                })
                        });
                        collector.on("end", (coletado) => {
                            if (coletado.size == 0) {
                                i.delete()
                                message.channel.send(`<:cooldown:610984469188313100> | **${message.author.username}**, o tempo de espera para resposta acabou, a venda foi cancelada.`)
                            }
                        })
                    })
                }
            } if (args[0] == "6") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                else {
                    if (Empresas.estaAvenda == "Sim") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está à venda!`)
                    message.channel.send(`<a:carregando:522226811006877716> | **${message.author.username}**, você está prestes a colocar sua empresa à venda. Esta é uma ação irreversível.\n<:channel_nsfw:585783907660857354> **| Se você confirma a venda, digite "sim".**`).then(async i => {
                        const filter = m => m.content.toLowerCase().includes('sim');
                        const collector = message.channel.createMessageCollector(filter, {
                            time: 60000
                        });

                        collector.on('collect', m => {
                            if (m.author.id !== message.author.id) return;
                            i.delete()
                            collector.stop()
                            message.channel.send(`<a:Zyon_concluido:738140193168818339> | **${message.author.username}**, a sua empresa agora está à venda. Aguarde algum usuário comprar!`)
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                                .update({
                                    estaAvenda: "Sim"
                                })
                        });
                        collector.on("end", (coletado) => {
                            if (coletado.size == 0) {
                                i.delete()
                                message.channel.send(`<:cooldown:610984469188313100> | **${message.author.username}**, o tempo de espera para resposta acabou, a venda foi cancelada.`)
                            }
                        })
                    })
                }
            } if (args[0] == "7") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa \`${Empresas.nome}\`!`)
                else {
                    if (Empresas.estaAvenda == "Sim") return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, a sua empresa já está à venda!`)
                    message.channel.send(`<a:carregando:522226811006877716> | **${message.author.username}**, você está prestes a colocar sua empresa à venda. Esta é uma ação irreversível.\n<:channel_nsfw:585783907660857354> **| Se você confirma a venda, digite "sim".**`).then(async i => {
                        const filter = m => m.content.toLowerCase().includes('sim');
                        const collector = message.channel.createMessageCollector(filter, {
                            time: 60000
                        });

                        collector.on('collect', m => {
                            if (m.author.id !== message.author.id) return;
                            i.delete()
                            collector.stop()
                            message.channel.send(`<a:Zyon_concluido:738140193168818339> | **${message.author.username}**, a sua empresa agora está à venda. Aguarde algum usuário comprar!`)
                            database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                                .update({
                                    estaAvenda: "Sim"
                                })
                        });
                        collector.on("end", (coletado) => {
                            if (coletado.size == 0) {
                                i.delete()
                                message.channel.send(`<:cooldown:610984469188313100> | **${message.author.username}**, o tempo de espera para resposta acabou, a venda foi cancelada.`)
                            }
                        })
                    })
                }
            }
        } catch (e) {
            const erroCanal = client.channels.get('733875381131673661')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'vemp'
        }
    }
}