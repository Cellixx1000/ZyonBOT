/**
 * O Evento message é emitido toda vez que o bot recebe uma mensagem.
 * Podemos usar este evento como uma espécie de middleware para impedir vulnarabilidades ou outras coisas.
 */
const Discord = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../config.json')
const fs = require('fs')
const moment = require('moment')
moment.locale('pt-br')
const ms = require('parse-ms')
const votosZuraaa = require('../votosZuraaa.js');
module.exports = async (client, message) => {
  /* É uma boa pratica ignorar outros bots. isso faz o bot se auto-ignorar também.
   * E Também não entrara em um loop de spam...
   */
  if (message.author.bot) return;

  let prefixoColeta = await database.ref(`Configurações/Servidores/${message.guild.id}/Prefixo`)
  let prefixoColeta2 = await prefixoColeta.once('value')
  if (prefixoColeta2.val() == null) {
    database.ref(`Configurações/Servidores/${message.guild.id}/Prefixo`)
      .set({
        servidor: message.guild.id,
        prefixo: config.prefix
      })
   message.channel.send(`<:Zyon_databse:797312622571683871>  | Olá **${message.guild.name}**, muito obrigado por me adicionarem aqui. Agora o servidor está registrado em meu banco de dados!`)
  }
  let prefixoColeta3 = await database.ref(`Configurações/Servidores/${message.guild.id}/Prefixo`)
  let prefixoColeta4 = await prefixoColeta3.once('value')
  let prefixo = prefixoColeta4.val().prefixo
  if (message.mentions.has(client.user)) {
    if (message.author.bot) return;
    if (message.content.includes('@everyone')) return;
    if (message.content.includes('@here')) return;
    return message.channel.send(`Olá ${message.author}, o meu prefixo neste servidor é: \`${prefixo}\`!\nEstá com dúvida? Precisando de ajuda? Use: \`${prefixo}ajuda\`!`)
  }
  /** Outra boa pratica é ignorar qualquer mensagem que não começe com o prefixo escolhido do bot.
   * OBS: O PREFIXO E PEGO ATRAVES DAS CONFIGURAÇÕES EM client.settings.
   */
  if (message.content.indexOf('' + prefixo) !== 0) return;

  /** Então nós separamos o nome do comando de seus argumentos que são passados ao comando em si. */
  const args = message.content.slice('' + prefixo.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  //<!-- Coletamos o canal do servidor --!>
  var coletaCanal1 = await database.ref(`Configurações/Servidores/${message.guild.id}/Canal`)
  var coletaCanal = await coletaCanal1.once('value')
  var Canal = coletaCanal.val()
  if (Canal == null) {
    database.ref(`Configurações/Servidores/${message.guild.id}/Canal`)
      .update({
        canal: 0
      })
  }
  //Nós temos que colocar no evento message, pra registrar o membro automático e não dar aquele erro aksfj
  const coletaPegou = await database.ref(`M4-Halloween/Usuário/${message.author.id}`) //É MESSAGE E NÃO MESSA ASKFJIASJF
  const coletaPEgou2 = await coletaPegou.once('value')
  const coletaPEGou3 = coletaPEgou2.val()
  if (coletaPEGou3 == null) {
    database.ref(`M4-Halloween/Usuário/${message.author.id}`)
      .set({
        pegou: "não" // tudo ok agora kasfjks
      }) //depois eu vejo isso kkkkk
  }

  //<!-- Coletamos e setamos a database do sistema de cargos --!>
  let cargosS1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
  let cargosS2 = await cargosS1.once('value')
  let cargosS = cargosS2.val()
  if (cargosS === null) {
    database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
      .update({
        "cargo01": "0",
        "valor01": "0",
        "cargo02": "0",
        "valor02": "0",
        "cargo03": "0",
        "valor03": "0",
        "cargo04": "0",
        "valor04": "0",
        "cargo05": "0",
        "valor05": "0"
      })
  }
  //<!-- Coletamos e setamos a database do sistema de empresas --!>
  let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
  let coletaEmpresa = await coletaEmpresa1.once('value')
  let Empresas = coletaEmpresa.val()
  if (Empresas == null) {
    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
      .update({
        nome: "Empresa 1",
        descrição: "Essa empresa não possui uma descrição.",
        dono: "Ninguém",
        usuario: 0,
        compradoEm: "Nunca",
        id: 01,
        produtos: 0,
        nivel: 1,
        xp: 0,
        capacidade: 1000,
        cofre: 0,
        estaAvenda: "Sim",
        valor: 80000,
        imagem: "https://i.imgur.com/5YbBfW5.png"
      })
  }
  let coletaEmpresa2 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
  let coletaEmpresa3 = await coletaEmpresa2.once('value')
  let Empresas1 = coletaEmpresa3.val()
  if (Empresas1 == null) {
    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
      .update({
        nome: "Empresa 2",
        descrição: "Essa empresa não possui uma descrição.",
        dono: "Ninguém",
        usuario: 0,
        compradoEm: "Nunca",
        id: 02,
        produtos: 0,
        nivel: 1,
        xp: 0,
        capacidade: 1000,
        cofre: 0,
        estaAvenda: "Sim",
        imagem: "https://i.imgur.com/5YbBfW5.png",
        valor: 80000
      })
  }
  let coletaEmpresa15 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
  let coletaEmpresa4 = await coletaEmpresa15.once('value')
  let Empresas2 = coletaEmpresa4.val()
  if (Empresas2 == null) {
    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
      .update({
        nome: "Empresa 3",
        descrição: "Essa empresa não possui uma descrição.",
        dono: "Ninguém",
        usuario: 0,
        compradoEm: "Nunca",
        id: 03,
        produtos: 0,
        nivel: 1,
        xp: 0,
        capacidade: 1000,
        cofre: 0,
        estaAvenda: "Sim",
        imagem: "https://i.imgur.com/5YbBfW5.png",
        valor: 80000
      })
  }
  let coletaEmpresa17 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
  let coletaEmpresa5 = await coletaEmpresa17.once('value')
  let Empresas3 = coletaEmpresa5.val()
  if (Empresas3 == null) {
    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
      .update({
        nome: "Empresa 4",
        descrição: "Essa empresa não possui uma descrição.",
        dono: "Ninguém",
        usuario: 0,
        compradoEm: "Nunca",
        id: 04,
        produtos: 0,
        nivel: 1,
        xp: 0,
        capacidade: 1000,
        cofre: 0,
        estaAvenda: "Sim",
        imagem: "https://i.imgur.com/5YbBfW5.png",
        valor: 80000
      })
  }
  let coletaEmpresa18 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
  let coletaEmpresa6 = await coletaEmpresa18.once('value')
  let Empresas4 = coletaEmpresa6.val()
  if (Empresas4 == null) {
    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
      .update({
        nome: "Empresa 5",
        descrição: "Essa empresa não possui uma descrição.",
        dono: "Ninguém",
        usuario: 0,
        compradoEm: "Nunca",
        id: 05,
        produtos: 0,
        nivel: 1,
        xp: 0,
        capacidade: 1000,
        cofre: 0,
        estaAvenda: "Sim",
        imagem: "https://i.imgur.com/5YbBfW5.png",
        valor: 80000
      })
  }
  let coletaEmpresa19 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
  let coletaEmpresa7 = await coletaEmpresa19.once('value')
  let Empresas5 = coletaEmpresa7.val()
  if (Empresas5 == null) {
    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
      .update({
        nome: "Empresa 6",
        descrição: "Essa empresa não possui uma descrição.",
        dono: "Ninguém",
        usuario: 0,
        compradoEm: "Nunca",
        id: 06,
        produtos: 0,
        nivel: 1,
        xp: 0,
        capacidade: 1000,
        cofre: 0,
        estaAvenda: "Sim",
        imagem: "https://i.imgur.com/5YbBfW5.png",
        valor: 80000
      })
  }
  let coletaEmpresa20 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
  let coletaEmpresa8 = await coletaEmpresa20.once('value')
  let Empresas6 = coletaEmpresa8.val()
  if (Empresas6 == null) {
    database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
      .update({
        nome: "Empresa 7",
        descrição: "Essa empresa não possui uma descrição.",
        dono: "Ninguém",
        usuario: 0,
        compradoEm: "Nunca",
        id: 07,
        produtos: 0,
        nivel: 1,
        xp: 0,
        capacidade: 1000,
        cofre: 0,
        estaAvenda: "Sim",
        imagem: "https://i.imgur.com/5YbBfW5.png",
        valor: 80000
      })
  }
  //<!-- Definimos o usuário "0", que será o Zyon --!>
  let coletaUser01 = await database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/0`)
  let coletaUser0 = await coletaUser01.once('value')
  let User0 = coletaUser0.val()
  if (User0 == null) {
    database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário/0`)
      .update({
        dinheiro: 0,
        banco: 0
      });
  }
  votosZuraaa.verificaVotos(message, (user) => {
    const canal = client.channels.cache.get('797693458230804520')
    canal.send(`<:Zyon_plus:797693658823524393> | \`${user.tag}\` acabou de votar em mim no site zuraaa.com!`)
  })
  //<!-- Sistema de BlackList --!>
  let blPega1 = await database.ref(`Black List/Usuários/${message.author.id}`)
  let blPega2 = await blPega1.once('value')
  let blPega = blPega2.val()
  if (blPega == null) {
    database.ref(`Black List/Usuários/${message.author.id}`)
      .update({
        "listado": "0",
        "usuario": `${message.author.id}`
      })
  }
  let blPega3 = await database.ref(`Black List/Usuários/${message.author.id}`)
  let blPega4 = await blPega3.once('value')
  let blPega5 = blPega4.val()

  let canalPega3 = await database.ref(`Configurações/Servidores/${message.guild.id}/Canal`)
  let canalPega4 = await canalPega3.once('value')
  let canalPega5 = canalPega4.val()

  const cmd = client.commands.get(command)
  if (!cmd) return;
  if (blPega5.listado == 1) return;
  if (canalPega5.canal == 0) return cmd.run(client, message, args);
  if (message.channel.id != canalPega5.canal) return;
  cmd.run(client, message, args)
}