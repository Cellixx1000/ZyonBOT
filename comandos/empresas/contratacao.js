const {
    MessageEmbed
} = require('discord.js')
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
            if(!args[0]) return message.channel.send(`<a:__:809531892150829086> | **${message.author.username}**, você deve me informar o ID da sua empresa.`)
            if (args[0] == "1") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                }
                if(!args[1]) return message.channel.send(`<a:__:809531892150829086> | **${message.author.username}**, você deve escolher \`on\` ou \`off\`.`)
                if(args[1] == "on") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                    }
                    if(contratosON.contratando == "on")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está contratando!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                }
                if(args[1] == "off") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    if(contratosON.contratando == "off")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "off"
                    })
                    return message.channel.send(`<:Zyon_desativado:797716521429630986> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos desativados.`)
                }
            }
            if (args[0] == "2") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                }
                if(!args[1]) return message.channel.send(`<a:__:809531892150829086> | **${message.author.username}**, você deve escolher \`on\` ou \`off\`.`)
                if(args[1] == "on") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                    }
                    if(contratosON.contratando == "on")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está contratando!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                }
                if(args[1] == "off") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    if(contratosON.contratando == "off")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "off"
                    })
                    return message.channel.send(`<:Zyon_desativado:797716521429630986> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos desativados.`)
                }
            }
            if (args[0] == "3") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                }
                if(!args[1]) return message.channel.send(`<a:__:809531892150829086> | **${message.author.username}**, você deve escolher \`on\` ou \`off\`.`)
                if(args[1] == "on") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                    }
                    if(contratosON.contratando == "on")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está contratando!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                }
                if(args[1] == "off") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    if(contratosON.contratando == "off")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "off"
                    })
                    return message.channel.send(`<:Zyon_desativado:797716521429630986> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos desativados.`)
                }
            }
            if (args[0] == "4") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                }
                if(!args[1]) return message.channel.send(`<a:__:809531892150829086> | **${message.author.username}**, você deve escolher \`on\` ou \`off\`.`)
                if(args[1] == "on") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                    }
                    if(contratosON.contratando == "on")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está contratando!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                }
                if(args[1] == "off") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    if(contratosON.contratando == "off")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "off"
                    })
                    return message.channel.send(`<:Zyon_desativado:797716521429630986> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos desativados.`)
                }
            }
            if (args[0] == "5") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                }
                if(!args[1]) return message.channel.send(`<a:__:809531892150829086> | **${message.author.username}**, você deve escolher \`on\` ou \`off\`.`)
                if(args[1] == "on") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                    }
                    if(contratosON.contratando == "on")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está contratando!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                }
                if(args[1] == "off") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    if(contratosON.contratando == "off")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "off"
                    })
                    return message.channel.send(`<:Zyon_desativado:797716521429630986> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos desativados.`)
                }
            }
            if (args[0] == "6") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                }
                if(!args[1]) return message.channel.send(`<a:__:809531892150829086> | **${message.author.username}**, você deve escolher \`on\` ou \`off\`.`)
                if(args[1] == "on") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                    }
                    if(contratosON.contratando == "on")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está contratando!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                }
                if(args[1] == "off") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    if(contratosON.contratando == "off")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "off"
                    })
                    return message.channel.send(`<:Zyon_desativado:797716521429630986> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos desativados.`)
                }
            }
            if (args[0] == "7") {
                let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
                let coletaEmpresa = await coletaEmpresa1.once('value')
                let Empresas = coletaEmpresa.val()
                if (Empresas.usuario != message.author.id) {
                    return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você não é dono da empresa **\`${Empresas.nome}\`**!`)
                }
                if(!args[1]) return message.channel.send(`<a:__:809531892150829086> | **${message.author.username}**, você deve escolher \`on\` ou \`off\`.`)
                if(args[1] == "on") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) {
                        database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                    }
                    if(contratosON.contratando == "on")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está contratando!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "on"
                    })
                    return message.channel.send(`<a:certo:809528754412978216> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos ativos.`)
                }
                if(args[1] == "off") {
                    let contratosON1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07/Sistema de contratações`)
                    let contratosON2 = await contratosON1.once('value')
                    let contratosON = contratosON2.val()
                    if(contratosON === null) return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    if(contratosON.contratando == "off")  return message.channel.send(`<:Zyon_erro:796998540936609812> | **${message.author.username}**, a empresa **${Empresas.nome}** já está com a contratação desativada!`)
                    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01/Sistema de contratações`)
                    .update({
                        "contratando": "off"
                    })
                    return message.channel.send(`<:Zyon_desativado:797716521429630986> | **${message.author.username}**, agora a empresa **${Empresas.nome}** está com os contratos desativados.`)
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
            name: 'contratacao'
        }
    }
}