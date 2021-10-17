const moment = require('moment')
moment.locale('pt-br')

module.exports = async (client) => {
  console.log(`[Console]: Carregamento total do projeto concluído. Aplicação online em ${client.guilds.cache.size} servidores com ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} usuários.`)
  client.user.setActivity({ status: 'idle', type: 'WATCHING', name: 'Ligando...' })
        function change(gg) {
            //PLAYING
            //STREAMING
            //LISTENING
            //WATCHING
            const sn = [
                { game: `Entre em meu servidor, use: .suporte!`, type: 'PLAYING' },
                { game: `#FiqueEmCasa e #SalveVidas`, type: 'PLAYING' },
                { game: `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).toLocaleString('pt-BR')} usuários!`, type: 'WATCHING' },
                { game: `${client.guilds.cache.size.toLocaleString('pt-BR')} servidores!`, type: 'PLAYING' },
			    { game: `#FiqueEmCasa e jogue #Comigo`, type: 'PLAYING' },
			    { game: `Fui programado por: Cellixx#1100`, type: 'PLAYING' }
            ]
            const rand = sn[Math.floor(Math.random() * (sn.length))]
    
            client.user.setActivity({ status: 'dnd', name:  rand.game , type: rand.type, url: 'http://spacemodmenu.epizy.com' })
        }
        client.setInterval(change, 20000, '') 


}