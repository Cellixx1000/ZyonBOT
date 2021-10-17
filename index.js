if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.')

require('dotenv').config()

const Discord = require('discord.js')
const { readdirSync } = require('fs')
const Enmap = require('enmap')
const firebase = require('firebase')
const config = require('./config.json')
const client = new Discord.Client({
  disableEveryone: true
});

// Seus dados do firebase
var firebaseConfig = {
  
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
client.commands = new Enmap()
client.startTime = Date.now()
const cmdFiles = readdirSync('./comandos/empregos/')
const cmdFiles2 = readdirSync('./comandos/empresas/')
const cmdFiles3 = readdirSync('./comandos/gerais/')
const cmdFiles4 = readdirSync('./comandos/idealizadores/')
const cmdFiles5 = readdirSync('./comandos/configuraveis/')
const cmdFiles6 = readdirSync('./comandos/usuarios/')
const cmdFiles8 = readdirSync('./comandos/basicos/')
const cmdFiles9 = readdirSync('./comandos/desenvolvimento/')
const cmdFiles10 = readdirSync('./comandos/loja/')
const cmdFiles11 = readdirSync('./comandos/backgrounds/')
cmdFiles.forEach(f => {
  try {
    const props = require(`./comandos/empregos/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('[Empregos]:', `Lendo o comando "${props.help.name}".`)

    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  } catch (e) {
    console.log(`[Empregos]: Não foi possível carregar o comando "${f}". Erro: ${e}`)
  }
})
cmdFiles2.forEach(f => {
  try {
    const props = require(`./comandos/empresas/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('[Empresas]:', `Lendo o comando "${props.help.name}".`)

    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  } catch (e) {
    console.log(`[Empresas]: Não foi possível carregar o comando "${f}". Erro: ${e}`)
  }
})

cmdFiles3.forEach(f => {
  try {
    const props = require(`./comandos/gerais/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('[Gerais]:', `Lendo o comando "${props.help.name}".`)

    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  } catch (e) {
    console.log(`[Gerais]: Não foi possível carregar o comando "${f}". Erro: ${e}`)
  }
})

cmdFiles4.forEach(f => {
  try {
    const props = require(`./comandos/idealizadores/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('[Idealizadores]:', `Lendo o comando "${props.help.name}".`)

    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  } catch (e) {
    console.log(`[Idealizadores]: Não foi possível carregar o comando "${f}". Erro: ${e}`)
  }
})

cmdFiles5.forEach(f => {
  try {
    const props = require(`./comandos/configuraveis/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('[Configuraveis]:', `Lendo o comando "${props.help.name}".`)

    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  } catch (e) {
    console.log(`[Configuraveis]: Não foi possível carregar o comando "${f}". Erro: ${e}`)
  }
})

cmdFiles6.forEach(f => {
  try {
    const props = require(`./comandos/usuarios/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('[Usuarios]:', `Lendo o comando "${props.help.name}".`)

    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  } catch (e) {
    console.log(`[Usuarios]: Não foi possível carregar o comando "${f}". Erro: ${e}`)
  }
})

cmdFiles8.forEach(f => {
  try {
    const props = require(`./comandos/basicos/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('[Basicos]:', `Lendo o comando "${props.help.name}".`)

    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  } catch (e) {
    console.log(`[Basicos]: Não foi possível carregar o comando "${f}". Erro: ${e}`)
  }
})

cmdFiles9.forEach(f => {
  try {
    const props = require(`./comandos/desenvolvimento/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('[Desenvolvimento]:', `Lendo o comando "${props.help.name}".`)

    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  } catch (e) {
    console.log(`[Desenvolvimento]: Não foi possível carregar o comando "${f}". Erro: ${e}`)
  }
})
cmdFiles10.forEach(f => {
  try {
    const props = require(`./comandos/loja/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('[Loja]:', `Lendo o comando "${props.help.name}".`)

    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  } catch (e) {
    console.log(`[Loja]: Não foi possível carregar o comando "${f}". Erro: ${e}`)
  }
})
cmdFiles11.forEach(f => {
  try {
    const props = require(`./comandos/backgrounds/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('[Backgrounds]:', `Lendo o comando "${props.help.name}".`)

    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  } catch (e) {
    console.log(`[Backgrounds]: Não foi possível carregar o comando "${f}". Erro: ${e}`)
  }
})

const evtFiles = readdirSync('./events/')
const valor = cmdFiles.length + cmdFiles2.length + cmdFiles3.length + cmdFiles4.length + cmdFiles5.length + cmdFiles6.length + cmdFiles8.length + cmdFiles9.length
console.log('[Console]:', `Foram carregados cerca de ${valor} comandos.`)
console.log('[Console]:', `Localizando e carregando cerca de ${evtFiles.length} eventos.`)
evtFiles.forEach(f => {
  const eventName = f.split('.')[0]
  const event = require(`./events/${f}`)

  client.on(eventName, event.bind(null, client))
})
client.login(config.token)
