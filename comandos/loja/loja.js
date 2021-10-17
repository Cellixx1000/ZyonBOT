var {
  MessageEmbed
} = require("discord.js");
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config.json')
const fs = require('fs')

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
      return message.channel.send(`<a:erro:809516073799122945>> | Olá ${message.author}, por gentileza, utilze o comando \`${prefixo}registrar\` e use o comando de novo!`)
    } else {
      // --- ID da Loja --- //
      const randomID = Math.floor(Math.random() * 9999)
      //<!-- Coletamso as empresas --!>
      //<!-- Coletamos algumas databases --!>
      let coletaEmpresa1 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 01`)
      let coletaEmpresa = await coletaEmpresa1.once('value')
      let Empresas = coletaEmpresa.val()

      let coletaEmpresa2 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 02`)
      let coletaEmpresa3 = await coletaEmpresa2.once('value')
      let Empresas1 = coletaEmpresa3.val()

      let coletaEmpresa15 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 03`)
      let coletaEmpresa4 = await coletaEmpresa15.once('value')
      let Empresas2 = coletaEmpresa4.val()

      let coletaEmpresa17 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 04`)
      let coletaEmpresa5 = await coletaEmpresa17.once('value')
      let Empresas3 = coletaEmpresa5.val()

      let coletaEmpresa18 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 05`)
      let coletaEmpresa6 = await coletaEmpresa18.once('value')
      let Empresas4 = coletaEmpresa6.val()

      let coletaEmpresa19 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 06`)
      let coletaEmpresa7 = await coletaEmpresa19.once('value')
      let Empresas5 = coletaEmpresa7.val()

      let coletaEmpresa20 = await database.ref(`Economia/Servidor/${message.guild.id}/Empresas/Empresa 07`)
      let coletaEmpresa8 = await coletaEmpresa20.once('value')
      let Empresas6 = coletaEmpresa8.val()
      //<!-- Verificamos a database "Arsenal" --!>
      let arsenalRef = await database.ref(`Economia/Servidor/${message.guild.id}/Arsenal/Usuário/${message.author.id}`)
      let arsenal = await arsenalRef.once('value')
      //<!-- M4A1 --!>
      let m4a1 = arsenal.val().m4a1
      if (m4a1 == 0) m4a1 = `Esta arma custa **R$32,000**, para comprá-la use: \`${prefixo}comprar m4a1\`!`
      if (m4a1 == true) m4a1 = `Você comprou todo o estoque dessa arma!`
      //------[ SKIN ESPECIAL HALLOWEEN ]------//
      let arsenalRef2 = await database.ref(`Economia/Global/Bitcoin/Arsenal/Usuário/${message.author.id}`)
      let arsenal2 = await arsenalRef2.once('value')
      let m4a1S = arsenal2.val()
      if (m4a1S == null) {
        database.ref(`Economia/Global/Bitcoin/Arsenal/Usuário/${message.author.id}`)
          .update({
            m4a1S: 0
          })
        return message.channel.send(`<:trix_certo:719330454930587689> | **${message.author.username}**, você foi registrado na loja de armas. Digite o comando novamente.`)
      }
      if (m4a1S.m4a1S == 0) m4a1S = `Esta arma custa **₿70**, para comprá-la use: \`${prefixo}comprar m4-h\`!`
      if (m4a1S.m4a1S == true) m4a1S = `Você comprou todo o estoque dessa arma!`
      //<!-- AK-47 --!>
      let ak47 = arsenal.val().ak47
      if (ak47 == 0) ak47 = `Esta arma custa **R$25,000**, para comprá-la use: \`${prefixo}comprar ak47\`!`
      if (ak47 == true) ak47 = `Você comprou todo o estoque dessa arma!`
      //<!-- Remington --!>
      let remington = arsenal.val().remington
      if (remington == 0) remington = `Esta arma custa **R$18,000**, para comprá-la use: \`${prefixo}comprar remington\`!`
      if (remington == true) remington = `Você comprou todo o estoque dessa arma!`
      //<!-- Revólver --!>
      let revolver = arsenal.val().revólver
      if (revolver == 0) revolver = `Esta arma custa **R$10,000**, para comprá-la use: \`${prefixo}comprar revolver\`!`
      if (revolver == true) revolver = `Você comprou todo o estoque dessa arma!`
      //<!-- Pistola --!>
      let pistola = arsenal.val().pistola
      if (pistola == 0) pistola = `Esta arma custa **R$2,500**, para comprá-la use: \`${prefixo}comprar pistola\`!`
      if (pistola == true) pistola = `Você comprou todo o estoque dessa arma!`

      //<!-- Cargos do servidor --!>
      let cargosS1 = await database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
      let cargosS2 = await cargosS1.once('value')
      let cargosS = cargosS2.val()

      var reac = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({
          dynamic: true
        }))
        .setTitle(`🛍 Loja 24/7 #${randomID}`)
        .setThumbnail('https://i.imgur.com/2wM2WSs.png')
        .setDescription("Seja bem-vindo(a) à minha loja! Clique nos emojis para abrir as categorias!")
        .addField('💼 | Empregos Comuns', 'O emprego não está funcionando? Compre aqui o seu item!')
        .addField('⚖️ | Empregos Avançados', 'Emprego avançado faltando itens? Compra aqui!')
        .addField("🏢 | Corretora de Empresas", "Avance mais um patamar em sua trajetória, compre uma empresa!")
        .addField("🔫 | Ammu-Nation", "Arrisque um pouco e compre novas armas!")
        .addField("⚙ | Produção", "A capacidade de produtos chegou no máximo? Olha essa página aqui!")
        .addField("<:setazyon:809535885661962241> | Cargos", `Quer um cargo especial do servidor? Vem aqui nessa página!`)
        .setFooter('Zyon™ ® Oficial 2020', client.user.avatarURL())
        .setTimestamp(Date.now());
      message.channel.send(reac).then(async reacm => {
        await reacm.react("💼");
        await reacm.react("⚖️")
        await reacm.react("🏢");
        await reacm.react("🔫"); // Mudar depois
        await reacm.react("⚙");
        await reacm.react("809528754412978216");
        client.on('messageReactionAdd', (reaction, user) => {
          if (reaction.message.id !== reacm.id) return;
          else {
            if (reaction.emoji.name === "🏢" && user.id === message.author.id) {
              let mod = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({
                  dynamic: true
                }))
                .setTitle("🏢 Corretora de empresas")
                .setThumbnail('https://i.imgur.com/UQTor8k.png')
                .setDescription("Olá, seja muito bem-vindo(a) à minha Corretora de Empresas, fique a vontade e escolha (com sabedoria) a sua empresa!")
                .addField(`1️⃣ ${Empresas.nome} | Dono: ${Empresas.dono}`, `Esta empresa custa **R$${Empresas.valor.toLocaleString()}**. Caso ela esteja à venda, use \`${prefixo}comprar empresa 1\`!`)
                .addField(`2️⃣ ${Empresas1.nome} | Dono: ${Empresas1.dono}`, `Esta empresa custa **R$${Empresas1.valor.toLocaleString()}**. Caso ela esteja à venda, use \`${prefixo}comprar empresa 2\`!`)
                .addField(`3️⃣ ${Empresas2.nome} | Dono: ${Empresas2.dono}`, `Esta empresa custa **R$${Empresas2.valor.toLocaleString()}**. Caso ela esteja à venda, use \`${prefixo}comprar empresa 3\`!`)
                .addField(`4️⃣ ${Empresas3.nome} | Dono: ${Empresas3.dono}`, `Esta empresa custa **R$${Empresas3.valor.toLocaleString()}**. Caso ela esteja à venda, use \`${prefixo}comprar empresa 4\`!`)
                .addField(`5️⃣ ${Empresas4.nome} | Dono: ${Empresas4.dono}`, `Esta empresa custa **R$${Empresas4.valor.toLocaleString()}**. Caso ela esteja à venda, use \`${prefixo}comprar empresa 5\`!`)
                .addField(`6️⃣ ${Empresas5.nome} | Dono: ${Empresas5.dono}`, `Esta empresa custa **R$${Empresas5.valor.toLocaleString()}**. Caso ela esteja à venda, use \`${prefixo}comprar empresa 6\`!`)
                .addField(`7️⃣ ${Empresas6.nome} | Dono: ${Empresas6.dono}`, `Esta empresa custa **R$${Empresas6.valor.toLocaleString()}**. Caso ela esteja à venda, use \`${prefixo}comprar empresa 7\`!`)
                .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                .setTimestamp(Date.now());
              reacm.edit(mod);

            } else if (reaction.emoji.name === "🔫" && user.id === message.author.id) {
              let lojadearmas = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({
                  dynamic: true
                }))
                .setTitle("🔫 Ammu-Nation")
                .setThumbnail('https://i.imgur.com/m0q9H1a.png')
                .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                .setDescription("Olá, seja bem-vindo(a) à Ammu-Nation, fique a vontade e escolha uma arma de seu gosto!")
                .addField("🎃 | M4A1 Halloween", `${m4a1S}`)
                .addField("<:m4a1_Zyon:745242473256714240> | M4A1", `${m4a1}`)
                .addField("<:ak47_Zyon:745242473277947924> | Ak-47", `${ak47}`)
                .addField("<:remington_Zyon:745243548911272088> | Remington", `${remington}`)
                .addField("<:revolver_Zyon:745242471579123772> | Revólver", `${revolver}`)
                .addField("<:pistola_Zyon:745242471226802177> | Desert Eagle", `${pistola}`)
                .setTimestamp(Date.now());
              reacm.edit(lojadearmas);

            } else if (reaction.emoji.name === "💼" && user.id === message.author.id) {
              let lojadearmas = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({
                  dynamic: true
                }))
                .setTitle("💼 Empregos Comuns")
                .setThumbnail('https://i.imgur.com/dYEgzhZ.png')
                .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                .setDescription("Olá, seja bem-vindo(a) à minha loja de itens para **empregos comuns**, fique a vontade para escolher!")
                .addField("🎣 | Vara de Pesca", `Este item custa **R$25** por unidade, para comprá-lo use: \`${prefixo}comprar vara <quantidade>\``)
                .addField("🪓 | Machado", `Este item custa **R$55** por unidade, para comprá-lo use: \`${prefixo}comprar machado <quantidade>\``)
                .addField("🏹 | Arco", `Este item custa **R$62** por unidade, para comprá-lo use: \`${prefixo}comprar arco <quantidade>\``)
                .addField("⛏️ | Picareta", `Este item custa **R$72** por unidade, para comprá-lo use: \`${prefixo}comprar picareta <quantidade>\``)
                //.addField("🔍 | Kit Investigativo", `Este item custa **R$520** por unidade, para comprá-lo use: \`${prefixo}comprar kit <quantidade>\``)
                .setTimestamp(Date.now());
              reacm.edit(lojadearmas);

            } else if (reaction.emoji.name === "⚖️" && user.id === message.author.id) {
              let lojadearmas = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({
                  dynamic: true
                }))
                .setTitle("⚖️ Empregos Avançados")
                .setThumbnail('https://i.imgur.com/LnGtqOJ.png')
                .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                .setDescription("Olá, seja bem-vindo(a) à minha loja de itens para **empregos avançados**, fique a vontade para escolher!")
                .addField("🚔 | Viatura", `Este item custa **R$223** por unidade, para comprá-lo use: \`${prefixo}comprar viatura <quantidade>\``)
                .addField("🚜 | Trator", `Este item custa **R$327** por unidade, para comprá-lo use: \`${prefixo}comprar trator <quantidade>\``)
                .addField("💻 | Laptop", `Este item custa **R$492** por unidade, para comprá-lo use: \`${prefixo}comprar laptop <quantidade>\``)
                //.addField("💻 | Laptop", `Este item custa **R$1,020** por unidade, para comprá-lo use: \`${prefixo}comprar laptop <quantidade>\``)
                .addField("🗺️ | Passagem Aérea", `Este item custa **R$769** por unidade, para comprá-lo use: \`${prefixo}comprar passagem <quantidade>\``)
                .setTimestamp(Date.now());
              reacm.edit(lojadearmas);

            } else if (reaction.emoji.name === "⚙" && user.id === message.author.id) {
              let lojadearmas = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({
                  dynamic: true
                }))
                .setTitle("⚙ Capacidade de produtos")
                .setThumbnail('https://i.imgur.com/9XbwrCo.png')
                .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                .setDescription("Olá, seja bem-vindo(a) à minha loja de aumento de capacidade de produtos, fique a vontade para escolher!")
                .addField("💠 | 3,000 produtos", `Esta capacidade requer que a sua empresa seja nível **40**, para comprá-la use: \`${prefixo}capemp <id da empresa> 3000\``)
                .addField("🔶 | 2,450 produtos", `Esta capacidade requer que a sua empresa seja nível **30**, para comprá-la use: \`${prefixo}capemp <id da empresa> 2450\``)
                .addField("🔸 | 2,250 produtos", `Esta capacidade requer que a sua empresa seja nível **20**, para comprá-la use: \`${prefixo}capemp <id da empresa> 2250\``)
                .addField("🔷 | 1,450 produtos", `Esta capacidade requer que a sua empresa seja nível **10**, para comprá-la use: \`${prefixo}capemp <id da empresa> 1450\``)
                .addField("🔹 | 1,250 produtos", `Esta capacidade requer que a sua empresa seja nível **5**, para comprá-la use: \`${prefixo}capemp <id da empresa> 1250\``)
                .setTimestamp(Date.now());
              reacm.edit(lojadearmas);

            }
            if (reaction.emoji.id === "798359401781919774" && user.id === message.author.id) {
              let cargo01 = message.guild.roles.cache.get(cargosS.cargo01)
              if (typeof cargo01 === "undefined") cargo01 = "**Nenhum**"
              else if (typeof cargo01 != "undefined") cargo01 = cargo01
              let cargo02 = message.guild.roles.cache.get(cargosS.cargo02)
              if (typeof cargo02 === "undefined") cargo02 = "**Nenhum**"
              else if (typeof cargo02 != "undefined") cargo02 = cargo02
              let cargo03 = message.guild.roles.cache.get(cargosS.cargo03)
              if (typeof cargo03 === "undefined") cargo03 = "**Nenhum**"
              else if (typeof cargo03 != "undefined") cargo03 = cargo03
              let cargo04 = message.guild.roles.cache.get(cargosS.cargo04)
              if (typeof cargo04 === "undefined") cargo04 = "**Nenhum**"
              else if (typeof cargo04 != "undefined") cargo04 = cargo04
              let cargo05 = message.guild.roles.cache.get(cargosS.cargo05)
              if (typeof cargo05 === "undefined") cargo05 = "**Nenhum**"
              else if (typeof cargo05 != "undefined") cargo05 = cargo05

              let valor01 = cargosS.valor01
              if (valor01 === "0") mensagem1 = `Os administradores ainda não definiram um cargo!`
              else mensagem1 = `Este cargo custa **R$${valor01.toLocaleString('pt-BR')}**. Para comprar, use \`${prefixo}comprar cargo 1\`!`
              if (valor01 != "0") mensagem1 = mensagem1
              let valor02 = cargosS.valor02
              if (valor02 === "0") mensagem2 = `Os administradores ainda não definiram um cargo!`
              else mensagem2 = `Este cargo custa **R$${valor02.toLocaleString('pt-BR')}**. Para comprar, use \`${prefixo}comprar cargo 2\`!`
              if (valor02 != "0") mensagem2 = mensagem2
              let valor03 = cargosS.valor03
              if (valor03 === "0") mensagem3 = `Os administradores ainda não definiram um cargo!`
              else mensagem3 = `Este cargo custa **R$${valor03.toLocaleString('pt-BR')}**. Para comprar, use \`${prefixo}comprar cargo 3\`!`
              if (valor03 != "0") mensagem3 = mensagem3
              let valor04 = cargosS.valor04
              if (valor04 === "0") mensagem4 = `Os administradores ainda não definiram um cargo!`
              else mensagem4 = `Este cargo custa **R$${valor04.toLocaleString('pt-BR')}**. Para comprar, use \`${prefixo}comprar cargo 4\`!`
              if (valor04 != "0") mensagem4 = mensagem4
              let valor05 = cargosS.valor05
              if (valor05 === "0") mensagem5 = `Os administradores ainda não definiram um cargo!`
              else mensagem5 = `Este cargo custa **R$${valor05.toLocaleString('pt-BR')}**. Para comprar, use \`${prefixo}comprar cargo 5\`!`
              if (valor05 != "0") mensagem5 = mensagem5

              let mod = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({
                  dynamic: true
                }))
                .setTitle("<a:__:809531892150829086> Cargos")
                .setThumbnail('https://i.imgur.com/RRC4w6h.png')
                .setDescription(`Olá, seja muito bem-vindo(a) aos cargos do servidor, fique a vontade e escolha (com sabedoria) o seu cargo!\n\n1️⃣ ${cargo01}\n${mensagem1}\n\n2️⃣ ${cargo02}\n${mensagem2}\n\n3️⃣ ${cargo03}\n${mensagem3}\n\n4️⃣ ${cargo04}\n${mensagem4}\n\n5️⃣ ${cargo05}\n${mensagem5}`)
                .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
                .setTimestamp(Date.now());
              reacm.edit(mod);

            }
          }
        });
      });
    }
  },
  conf: {},
  get help() {
    return {
      name: 'loja'
    }
  }
}