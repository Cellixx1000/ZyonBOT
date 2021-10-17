const Discord = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config.json')
const moment = require('moment')
moment.locale('pt-br')
module.exports = {
   run: async function (client, message, args) {
    const AsciiTable = require('ascii-table'),
	// Defina um título se quiser, se não, deixe vazio ().
	table = new AsciiTable('Zyon™ Shards'),
	unit = ['', 'K', 'M', 'G', 'T', 'P']

    // Arrow Function que converterá os Byts usados em "KB (Kilobytes), MB (Megabyte), GB (Gigabyte), TB (Terabyte), PB (Petabyte)"
let bytesToSize = (input, precision) => {

	let index = Math.floor(Math.log(input) / Math.log(1024))
	if (unit >= unit.length) return input + 'B'
	return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + unit[index] + 'B'
}
	/* 
	* Título da COLUNA;
	* São suportados 6 colunas por tabela;
	* Se quiser, pode por paginação.
	*/
	table.setHeading('SID', 'Online', 'Letencia', 'Uso (RAM)', 'Servidores', 'Usuarios')

	// Necessário para centralizar o Row na tabela
	table.setAlign(0, AsciiTable.CENTER)
	table.setAlign(1, AsciiTable.CENTER)
	table.setAlign(2, AsciiTable.CENTER)
	table.setAlign(3, AsciiTable.CENTER)
	table.setAlign(4, AsciiTable.CENTER)
	table.setAlign(5, AsciiTable.CENTER)

	// Não é necessário essa próxima linha, a tabela já vem pronta.
	table.setBorder('|', '-', '+', '+')

	// Busca por algumas informações, para preencher a tabela.
	const uptime = await client.shard.broadcastEval('this.uptime'),
        ping = await client.shard.broadcastEval('Math.round(this.ws.ping).toString()'),
		ram = await client.shard.broadcastEval(`process.memoryUsage().rss`),
		guilds = await client.shard.fetchClientValues('guilds.cache.size'),
		channels = await client.shard.fetchClientValues('channels.cache.size'),

		// Note que não fiz o tratamento de remover os bots da contagem, no caso é o total de usuários + bots.
		users = await client.shard.fetchClientValues('users.cache.size')

	/* 
	* Para que seja criado os Rows (linhas da tabela), é necessário o FOR, passando o parâmetro com o máx '< (menor que) shardCount'.
	* Para que crie exatamente a quantidade correta de Rows.
	*/
	for (let i = 0; i < client.options.shardCount; i++) {

		// Cada coluna é preenchida com uma informação, então cada informação deve estar no lugar correto, pode separar as colunas por ',' (vírgula).
		table.addRow(i, moment().to(client.startTime, true), '~' + Math.round(ping[i]) + 'ms', bytesToSize(ram[i], 2), guilds[i], users[i])
	}

	//O reduce busca reduzir um array. Ele iterará por cada elemento dessa lista com o objetivo de ao final gerar um único valor.
	const botGuilds = guilds.reduce((prev, val) => prev + val),
		botUsers = users.reduce((prev, val) => prev + val),
		ramTotal = ram.reduce((prev, val) => prev + val),
		ping_media = ping.reduce((prev, val) => prev + val),
		media = ping_media / client.options.shardCount
	
	// Aqui definimos um Row vazio ou complementado por algum simbolo.
	table.addRow('______', '______', '______', '______', '______', '______')

	// Essa é a última linha da TABELA, então seria o resultado da soma ou média dos valores mostrados las linhas anteriores.
	table.addRow('TOTAL', '-', '~' + Math.round(media) + 'ms', bytesToSize(ramTotal, 2), botGuilds, botUsers)

	/* 
	*Essa parte é a mais esperada, que envia de fato a TABELA, no canal onde foi usado o comando. 
	*NOTA: "Eu particularmente, tentei por em embed, não funciona bem, fica quebrado."
	* O "prolog", nada mais é que um Markdown (Markdown é uma linguagem simples de marcação originalmente criada por John Gruber e Aaron Swartz. Markdown converte seu texto em HTML válido)  
	*/
	message.channel.send(`\`\`\`prolog
${table.toString()}\`\`\``)

	// É necessário limpar os Rows, sempre, depois de usar o comando, caso não limpe, as informações ficam se sobrepondo.
	table.clearRows()
},
    conf: {},
    get help () {
      return {
        name: 'shards'
      }
      }
    }