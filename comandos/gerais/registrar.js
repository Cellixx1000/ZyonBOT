const Discord = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const fs = require('fs')
const config = require('../../config.json')
const moment = require("moment");
moment.locale('pt-br')

module.exports = {
    run: async function (client, message, args) {
        try {
            //<!-- Coletamos o prefixo do servidor --!>
            let prefixoColeta = await database.ref(`Configurações/Servidores/${message.guild.id}/Prefixo`)
            let prefixoColeta2 = await prefixoColeta.once('value')
            let prefixo = prefixoColeta2.val().prefixo
            let ref = await database.ref(`Economia/Servidor/${message.guild.id}/Registros/Usuário/${message.author.id}`)
            let snap = await ref.once('value')
            let ref2 = await database.ref(`Zyon/Jogadores/${message.author.id}`)
            let snap2 = await ref2.once('value')
            let ref3 = await database.ref(`Zyon/Jogadores/${message.author.id}`)
            let snap3 = await ref3.once('value')
            //<!-- Coletamos os votos do jogador --!>
            let votosDB = await database.ref(`Votos/Jogadores/${message.author.id}`)
            let votos = await votosDB.once('value')
            let votosF = votos.val()
            if (votosF == null) {
                database.ref(`Votos/Jogadores/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        votos: 0
                    })
            }
            if (snap3.val() == null) {
                database.ref(`Economia/Global/Biografia/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        biografia: "Olá! Eu sou um jogador do Zyon™!"
                    })
                database.ref(`Economia/Global/Bitcoin/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        bitcoin: 0
                    })
                database.ref(`Economia/Global/Bitcoin/Cooldown/Usuário/${message.author.id}`)
                    .update({
                        diarioBit: 0
                    })
                database.ref(`Economia/Global/Insígnias/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        idealizador: 0,
                        programador: 0,
                        designer: 0,
                        equipeZyon: 0,
                        doador: 0,
                        cincoMilcomandos: 0,
                        cacadorBugs: 0
                    })
            }

            if (snap2.val() == null) {
                database.ref(`Zyon/Jogadores/${message.author.id}`)
                    .update({
                        registro: `${moment().format('LLLL')}`
                    });
            }

            if (snap.val() == null) {

                database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        dinheiro: 0,
                        banco: 0
                    });
                database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Comuns)/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        luvasItem: 0,
                        foiceItem: 0,
                        facaoItem: 0,
                        picaretaItem: 0
                    });
                database.ref(`Economia/Servidor/${message.guild.id}/Itens de Empregos (Avançados)/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        estetoscopioItem: 0,
                        envelopesItem: 0,
                        cadernoItem: 0,
                        lapisItem: 0
                    });
                database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Comuns)/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        cortador: 0,
                        algodoeiro: 0,
                        cafeicultor: 0,
                        minerador: 0
                    });
                database.ref(`Economia/Servidor/${message.guild.id}/Empregos (Avançados)/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        poeta: 0,
                        arquiteto: 0,
                        advogado: 0,
                        medico: 0
                    });
                database.ref(`Economia/Servidor/${message.guild.id}/Pontos/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        pontos: 0
                    });
                database.ref(`Economia/Servidor/${message.guild.id}/Coowldown/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        trabalho: 0,
                        investir: 0,
                        crime: 0,
                        cultivarAlgodao: 0,
                        cultivarCafe: 0,
                        cultivarCana: 0,
                        minerar: 0,
                        poetizar: 0,
                        arquitetar: 0,
                        plantao: 0,
                        advogar: 0,
                        diario: 0,
                        semanal: 0,
                        diarioBit: 0
                    });
                database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        pistola: 0,
                        revólver: 0,
                        remington: 0,
                        ak47: 0,
                        m4a1: 0
                    });
                database.ref(`Economia/Servidor/${message.guild.id}/Registros/Usuário/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        registro: `${moment().format("LLLL")}`
                    });
                database.ref(`Economia/Servidor/${message.guild.id}/Empresas (Donos)/${message.author.id}`)
                    .update({
                        usuario: message.author.id,
                        nome: 0,
                        id: 0,
                        possuiEmpresa: "Não"
                    });
                message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, você foi registrado com sucesso, agora possui acesso à todos os meus comandos!`);
            } else {
                return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você já está registrado em meu banco de dados!`)
            }
        } catch (e) {
            const erroCanal = client.channels.get('809515239480885269')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`registrar\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'registrar'
        }
    }
}