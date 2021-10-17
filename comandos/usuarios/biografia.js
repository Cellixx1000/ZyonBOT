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
            //<!-- Verificamos os argumentos --!>
            const biografia = args.join(" ")
            if (!biografia) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, digite a sua biografia em até 80 caracteres!\n• Uso correto: \`${prefixo}biografia <texto>\``)
            if (biografia.length > 80) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, você utilizou em sua biografia **${biografia.length}** caracteres, você deve usar apenas **80**. Reduza e tente novamente!`)
            if (biografia.length < 10) return message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, adicione pelo menos **10** caracteres, você usou apenas **${biografia.length}**. Sacanagem!`)
            botMsg = await message.channel.send(`<a:__:809531892150829086> | **${message.author.username}**, estou enviando a sua biografia para o comando \`${prefixo}info\`, aguarde 5 segundos!`);
            setTimeout(function () {
                botMsg.edit(`<a:certo:809528754412978216> | **${message.author.username}**, sua biografia foi alterada com sucesso! Use \`${prefixo}info\` para ver o resultado!`);
            }, 5000)
            database.ref(`Economia/Global/Biografia/Usuário/${message.author.id}`)
                .update({
                    biografia: biografia
                })

            //<!-- Aqui, definimos o nome do comando e suas configurações --!>
        } catch (e) {
            const erroCanal = client.channels.get('809515239480885269')
            message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
            erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`biografia\``)
        }
    },
    conf: {},
    get help() {
        return {
            name: 'biografia',
            aliases: ['bio', 'sobremim']
        }
    }
}