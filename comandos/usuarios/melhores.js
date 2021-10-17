const { MessageEmbed } = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const config = require('../../config.json')

module.exports = {
  run: async function (client, message, args) {
    /*//<!-- Coletamos o prefixo do servidor --!>
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
    try {
      var reac = new MessageEmbed()
        .setTitle("🏆 Melhores Classificados - Menu Principal")
        .setThumbnail(client.user.avatarURL())
        .setDescription("Olá " + message.author + ", este é o meu menu de classificações, aqui ficam todas as páginas de categorias dos melhores membros. Para visitar uma categoria basta reagir com o seu respectivo emoji.")
        .addField("💰 | Dinheiro", "Membros com maior saldo em mãos.")
        .addField("🏛 | Banco", "Membros que possuem maior saldo bancário.")
        .addField("💵 | BitCoin", 'Membros que possuem maior saldo em BitCoin.')
        .addField("🔹 | Pontos de atividade", "Membros com a maior quantidade de pontos dentro do servidor.")
        //.addField("👥 | Comandos executados - Usuários", 'Membros que mais executam comandos.')
        //.addField("🌍 | Comandos executados - Servidores", "Servidores que mais executam comandos.")
        .addField(`🙋‍♂️ | Votadores`, `Saiba quem são os membros que mais votam em mim!`)
        .setFooter("Zyon ® Oficial 2020", client.user.avatarURL())
        ////Removido
        .setTimestamp(Date.now());
      message.channel.send(reac).then(async reacm => {
        await reacm.react("💰");
        await reacm.react("🏛");
        await reacm.react("💵")
        await reacm.react("🔹");
        //await reacm.react("👥");
        //await reacm.react("🌍");
        await reacm.react("🙋‍♂️");
        client.on('messageReactionAdd', async (reaction, user) => {
          if (reaction.message.id !== reacm.id) return;
          if (reaction.emoji.name === "💰" && user.id === message.author.id) {
            array = [];

            const pushdb = database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário`);
            const db = await pushdb
              .orderByChild("dinheiro")
              .limitToLast(10)
              .once("value");

            await db.forEach(snap => {
              array.push({
                usuario: snap.val().usuario,
                dinheiro: snap.val().dinheiro
              });
            });

            array.sort((a, b) => b.dinheiro - a.dinheiro);

            if (array < 10) Usuáios = "Nenhum usuário encontrado."
            const embed = new MessageEmbed()
            let Usuários = await array.map((a, posição) => {
              let user = client.users.cache.get(a.usuario)
              if (typeof user === "undefined") user = "Desconhecido";
              let emoji = ""
              if (posição == 0) emoji = `🥇 `
              if (posição == 1) emoji = `🥈 `
              if (posição == 2) emoji = `🥉 `
              return (
                `**${emoji} ${posição + 1}.** ${user} • R$${a.dinheiro.toLocaleString()}`
              );
            });
            //<!-- Pegamos todos os usuários --!>
            array2 = [];

            const pushdb2 = database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário`);
            const db2 = await pushdb2
              .orderByChild("dinheiro")
              .once("value");

            await db2.forEach(snap => {
              array2.push({
                usuario: snap.val().usuario,
                dinheiro: snap.val().dinheiro
              });
            });

            array2.sort((a, b) => b.dinheiro - a.dinheiro);

            if (array2 < 10) Usuáios = "Nenhum usuário encontrado."
            const embed2 = new MessageEmbed()
            let Usuários2 = await array2.map((a, posição) => {
              let user = client.users.cache.get(a.usuario)
              if (typeof user === "undefined") user = "Desconhecido";
              let emoji = ""
              if (posição == 0) emoji = `🥇 `
              if (posição == 1) emoji = `🥈 `
              if (posição == 2) emoji = `🥉 `
              return (
                `${emoji} **${posição + 1}.** ${user} • ₿${a.dinheiro.toLocaleString()}`
              );
            });
            //-----------------------------------
            let user =
              message.guild.members.cache.get(args[0]) ||
              message.mentions.users.first() ||
              message.author;
            var arr = [];
            var counter = 0;
            var pos = 1;
            require("firebase")
              .database()
              .ref()
              .child(`Economia/Servidor/${message.guild.id}/Saldo/Usuário`)
              .once("value", snapshot => {
                snapshot.forEach(v => {
                  arr.push({
                    usuario: v.key,
                    dinheiro: v.val().dinheiro
                  });

                  counter++;
                  if (counter === snapshot.numChildren()) {
                    arr.sort(function (a, b) {
                      return b.dinheiro - a.dinheiro;
                    });
                    var msgArr = [];
                    var testee = [];
                    arr.forEach(u => {
                      let abc = pos++;
                      if (u.usuario !== `${user.id ? user.id : user}`) return;

                      msgArr.push(abc);
                    });

                    const mapping = {
                      "0": "0",
                      "1": "1",
                      "2": "2",
                      "3": "3",
                      "4": "4",
                      "5": "5",
                      "6": "6",
                      "7": "7",
                      "8": "8",
                      "9": "9"
                    };

                    "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
                      mapping[c] = mapping[
                        c.toUpperCase()
                      ] = ` :regional_indicator_${c}:`;
                    });
                    embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                    embed.setTitle(`🏆 Melhores: Dinheiro`)
                    embed.setDescription(`• Usuários nessa categoria: ${Usuários2.length.toLocaleString()}\n• Sua posição: #${msgArr.join(" ").split("").map(c => mapping[c] || c).join("")}`)
                    embed.addField(`🏆 | Membros & Posições`, Usuários)
                    embed.setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                    embed.setTimestamp();
                    embed.setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png?size=2048`)
                    reacm.edit(embed);
                    
                  }
                })
              })
          } else {
            if (reaction.emoji.name === "🔹" && user.id === message.author.id) {
              array = [];

              const pushdb = database.ref(`Economia/Servidor/${message.guild.id}/Pontos/Usuário`);
              const db = await pushdb
                .orderByChild("pontos")
                .limitToLast(10)
                .once("value");

              await db.forEach(snap => {
                array.push({
                  usuario: snap.val().usuario,
                  pontos: snap.val().pontos
                });
              });

              array.sort((a, b) => b.pontos - a.pontos);

              if (array < 10) Usuáios = "Nenhum usuário encontrado."
              const embed = new MessageEmbed()
              let Usuários = await array.map((a, posição) => {
                let user = client.users.cache.get(a.usuario)
                if (typeof user === "undefined") user = "Desconhecido";
                let emoji = ""
                if (posição == 0) emoji = `🥇 `
                if (posição == 1) emoji = `🥈 `
                if (posição == 2) emoji = `🥉 `
                return (
                  `${emoji} **${posição + 1}.** ${user} • ${a.pontos.toLocaleString()}`
                );
              });
              //<!-- Pegamos todos os usuários --!>
              array2 = [];

              const pushdb2 = database.ref(`Economia/Servidor/${message.guild.id}/Pontos/Usuário`);
              const db2 = await pushdb
                .orderByChild("pontos")
                .once("value");

              await db2.forEach(snap => {
                array2.push({
                  usuario: snap.val().usuario,
                  pontos: snap.val().pontos
                });
              });

              array2.sort((a, b) => b.pontos - a.pontos);

              if (array2 < 10) Usuáios = "Nenhum usuário encontrado."
              const embed2 = new MessageEmbed()
              let Usuários2 = await array2.map((a, posição) => {
                let user = client.users.cache.get(a.usuario)
                if (typeof user === "undefined") user = "Desconhecido";
                let jogador = user.tag
                if (typeof jogador === "undefined") jogador = "Desconhecido";
                let emoji = ""
                if (posição == 0) emoji = `🥇 `
                if (posição == 1) emoji = `🥈 `
                if (posição == 2) emoji = `🥉 `
                return (
                  `${emoji} **${posição + 1}.** \`${jogador}\` • ₿${a.pontos.toLocaleString()}`
                );
              });
              //-----------------------------------
              let user =
                message.guild.members.cache.get(args[0]) ||
                message.mentions.users.first() ||
                message.author;
              var arr = [];
              var counter = 0;
              var pos = 1;
              require("firebase")
                .database()
                .ref()
                .child(`Economia/Servidor/${message.guild.id}/Pontos/Usuário`)
                .once("value", snapshot => {
                  snapshot.forEach(v => {
                    arr.push({
                      usuario: v.key,
                      pontos: v.val().pontos
                    });

                    counter++;
                    if (counter === snapshot.numChildren()) {
                      arr.sort(function (a, b) {
                        return b.pontos - a.pontos;
                      });
                      var msgArr = [];
                      var testee = [];
                      arr.forEach(u => {
                        let abc = pos++;
                        if (u.usuario !== `${user.id ? user.id : user}`) return;

                        msgArr.push(abc);
                      });

                      const mapping = {
                        "0": "0",
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8",
                        "9": "9"
                      };

                      "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
                        mapping[c] = mapping[
                          c.toUpperCase()
                        ] = ` :regional_indicator_${c}:`;
                      });
                      embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                      embed.setTitle(`🏆 Melhores: Pontos de atividade`)
                      embed.setDescription(`• Usuários nessa categoria: ${Usuários2.length.toLocaleString()}\n• Sua posição: #${msgArr.join(" ").split("").map(c => mapping[c] || c).join("")}`)
                      embed.addField(`🏆 | Membros & Posições`, Usuários)
                      embed.setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png?size=2048`)
                      embed.setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                      embed.setTimestamp();
                      reacm.edit(embed);
                      
                    }
                  })
                })
            } else {
                if (reaction.emoji.name === "💵" && user.id === message.author.id) {
                  array = [];

                  const pushdb = database.ref(`Economia/Global/Bitcoin/Usuário`);
                  const db = await pushdb
                    .orderByChild("bitcoin")
                    .limitToLast(10)
                    .once("value");

                  await db.forEach(snap => {
                    array.push({
                      usuario: snap.val().usuario,
                      bitcoin: snap.val().bitcoin
                    });
                  });

                  array.sort((a, b) => b.bitcoin - a.bitcoin);

                  if (array < 10) Usuáios = "Nenhum usuário encontrado."
                  const embed = new MessageEmbed()
                  let Usuários = await array.map((a, posição) => {
                    let user = client.users.cache.get(a.usuario)
                    if (typeof user === "undefined") user = "Desconhecido";
                    let emoji = ""
                    if (posição == 0) emoji = `🥇 `
                    if (posição == 1) emoji = `🥈 `
                    if (posição == 2) emoji = `🥉 `
                    return (
                      `${emoji} **${posição + 1}.** ${user} • ₿${a.bitcoin.toLocaleString()}`
                    );
                  });
                  //<!-- Pegamos todos os usuários --!>
                  array2 = [];

                  const pushdb2 = database.ref(`Economia/Global/Bitcoin/Usuário`);
                  const db2 = await pushdb2
                    .orderByChild("bitcoin")
                    .once("value");

                  await db2.forEach(snap => {
                    array2.push({
                      usuario: snap.val().usuario,
                      bitcoin: snap.val().bitcoin
                    });
                  });

                  array2.sort((a, b) => b.bitcoin - a.bitcoin);

                  if (array2 < 10) Usuáios = "Nenhum usuário encontrado."
                  const embed2 = new MessageEmbed()
                  let Usuários2 = await array2.map((a, posição) => {
                    let user = client.users.cache.get(a.usuario)
                    if (typeof user === "undefined") user = "Desconhecido";
                    let emoji = ""
                    if (posição == 0) emoji = `🥇 `
                    if (posição == 1) emoji = `🥈 `
                    if (posição == 2) emoji = `🥉 `
                    return (
                      `${emoji} **${posição + 1}.** ${user} • ₿${a.bitcoin.toLocaleString()}`
                    );
                  });
                  //-----------------------------------
                  let user =
                    message.guild.members.cache.get(args[0]) ||
                    message.mentions.users.first() ||
                    message.author;
                  var arr = [];
                  var counter = 0;
                  var pos = 1;
                  require("firebase")
                    .database()
                    .ref()
                    .child(`Economia/Global/Bitcoin/Usuário`)
                    .once("value", snapshot => {
                      snapshot.forEach(v => {
                        arr.push({
                          usuario: v.key,
                          bitcoin: v.val().bitcoin
                        });

                        counter++;
                        if (counter === snapshot.numChildren()) {
                          arr.sort(function (a, b) {
                            return b.bitcoin - a.bitcoin;
                          });
                          var msgArr = [];
                          var testee = [];
                          arr.forEach(u => {
                            let abc = pos++;
                            if (u.usuario !== `${user.id ? user.id : user}`) return;

                            msgArr.push(abc);
                          });

                          const mapping = {
                            "0": "0",
                            "1": "1",
                            "2": "2",
                            "3": "3",
                            "4": "4",
                            "5": "5",
                            "6": "6",
                            "7": "7",
                            "8": "8",
                            "9": "9"
                          };

                          "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
                            mapping[c] = mapping[
                              c.toUpperCase()
                            ] = ` :regional_indicator_${c}:`;
                          });
                          embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                          embed.setTitle(`🏆 Melhores: BitCoin`)
                          embed.setDescription(`• Usuários nessa categoria: ${Usuários2.length.toLocaleString()}\n• Sua posição: #${msgArr.join(" ").split("").map(c => mapping[c] || c).join("")}`)
                          embed.addField(`🏆 | Membros & Posições`, Usuários)
                          embed.setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                          embed.setThumbnail(client.user.avatarURL())
                          embed.setTimestamp();
                          reacm.edit(embed);
                          
                        }
                      })
                    })
                } else {
                  if (reaction.emoji.name === "🏛" && user.id === message.author.id) {
                    array = [];

                    const pushdb = database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário`);
                    const db = await pushdb
                      .orderByChild("banco")
                      .limitToLast(10)
                      .once("value");

                    await db.forEach(snap => {
                      array.push({
                        usuario: snap.val().usuario,
                        banco: snap.val().banco
                      });
                    });

                    array.sort((a, b) => b.banco - a.banco);

                    if (array < 10) Usuáios = "Nenhum usuário encontrado."
                    const embed = new MessageEmbed()
                    let Usuários = await array.map((a, posição) => {
                      let user = client.users.cache.get(a.usuario)
                      if (typeof user === "undefined") user = "Desconhecido";
                      let emoji = ""
                      if (posição == 0) emoji = `🥇 `
                      if (posição == 1) emoji = `🥈 `
                      if (posição == 2) emoji = `🥉 `
                      return (
                        `${emoji} **${posição + 1}.** ${user} • R$${a.banco.toLocaleString()}`
                      );
                    });
                    //<!-- Pegamos todos os usuários --!>
                    array2 = [];

                    const pushdb2 = database.ref(`Economia/Servidor/${message.guild.id}/Saldo/Usuário`);
                    const db2 = await pushdb2
                      .orderByChild("banco")
                      .once("value");

                    await db2.forEach(snap => {
                      array2.push({
                        usuario: snap.val().usuario,
                        banco: snap.val().banco
                      });
                    });

                    array2.sort((a, b) => b.banco - a.banco);

                    if (array2 < 10) Usuáios = "Nenhum usuário encontrado."
                    const embed2 = new MessageEmbed()
                    let Usuários2 = await array2.map((a, posição) => {
                      let user = client.users.cache.get(a.usuario)
                      if (typeof user === "undefined") user = "Desconhecido";
                      let emoji = ""
                      if (posição == 0) emoji = `🥇 `
                      if (posição == 1) emoji = `🥈 `
                      if (posição == 2) emoji = `🥉 `
                      return (
                        `${emoji} **${posição + 1}.** ${user} • ₿${a.banco.toLocaleString()}`
                      );
                    });
                    //-----------------------------------
                    let user =
                      message.guild.members.cache.get(args[0]) ||
                      message.mentions.users.first() ||
                      message.author;
                    var arr = [];
                    var counter = 0;
                    var pos = 1;
                    require("firebase")
                      .database()
                      .ref()
                      .child(`Economia/Servidor/${message.guild.id}/Saldo/Usuário`)
                      .once("value", snapshot => {
                        snapshot.forEach(v => {
                          arr.push({
                            usuario: v.key,
                            banco: v.val().banco
                          });

                          counter++;
                          if (counter === snapshot.numChildren()) {
                            arr.sort(function (a, b) {
                              return b.banco - a.banco;
                            });
                            var msgArr = [];
                            var testee = [];
                            arr.forEach(u => {
                              let abc = pos++;
                              if (u.usuario !== `${user.id ? user.id : user}`) return;

                              msgArr.push(abc);
                            });

                            const mapping = {
                              "0": "0",
                              "1": "1",
                              "2": "2",
                              "3": "3",
                              "4": "4",
                              "5": "5",
                              "6": "6",
                              "7": "7",
                              "8": "8",
                              "9": "9"
                            };

                            "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
                              mapping[c] = mapping[
                                c.toUpperCase()
                              ] = ` :regional_indicator_${c}:`;
                            });
                            embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                            embed.setTitle(`🏆 Melhores: Banco`)
                            embed.setDescription(`• Usuários nessa categoria: ${Usuários2.length.toLocaleString()}\n• Sua posição: #${msgArr.join(" ").split("").map(c => mapping[c] || c).join("")}`)
                            embed.addField(`🏆 | Membros & Posições`, Usuários)
                            embed.setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png?size=2048`)
                            embed.setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                            embed.setTimestamp();
                            reacm.edit(embed);
                            
                          }
                        })
                      })
                  } else {
                      if (reaction.emoji.name === "🙋‍♂️" && user.id === message.author.id) {
                        array = [];

                        const pushdb = database.ref(`Votos/Jogadores`);
                        const db = await pushdb
                          .orderByChild("votos")
                          .limitToLast(10)
                          .once("value");

                        await db.forEach(snap => {
                          array.push({
                            usuario: snap.val().usuario,
                            votos: snap.val().votos
                          });
                        });

                        array.sort((a, b) => b.votos - a.votos);

                        if (array < 10) Usuáios = "Nenhum usuário encontrado."
                        const embed = new MessageEmbed()
                        let Usuários = await array.map((a, posição) => {
                          let user = client.users.cache.get(a.usuario)
                          if (typeof user === "undefined") user = "Desconhecido";
                          let emoji = ""
                          if (posição == 0) emoji = `🥇 `
                          if (posição == 1) emoji = `🥈 `
                          if (posição == 2) emoji = `🥉 `
                          return (
                            `**${emoji} ${posição + 1}.** ${user} • ${a.votos.toLocaleString()}`
                          );
                        });
                        //<!-- Pegamos todos os usuários --!>
                        array2 = [];

                        const pushdb2 = database.ref(`Votos/Jogadores`);
                        const db2 = await pushdb2
                          .orderByChild("votos")
                          .once("value");

                        await db2.forEach(snap => {
                          array2.push({
                            usuario: snap.val().usuario,
                            votos: snap.val().votos
                          });
                        });

                        array2.sort((a, b) => b.votos - a.votos);

                        if (array2 < 10) Usuáios = "Nenhum usuário encontrado."
                        const embed2 = new MessageEmbed()
                        let Usuários2 = await array2.map((a, posição) => {
                          let user = client.users.cache.get(a.usuario)
                          if (typeof user === "undefined") user = "Desconhecido";
                          let emoji = ""
                          if (posição == 0) emoji = `🥇 `
                          if (posição == 1) emoji = `🥈 `
                          if (posição == 2) emoji = `🥉 `
                          return (
                            `${emoji} **${posição + 1}.** ${user} • ₿${a.votos.toLocaleString()}`
                          );
                        });
                        //-----------------------------------
                        let user =
                          message.guild.members.cache.get(args[0]) ||
                          message.mentions.users.first() ||
                          message.author;
                        var arr = [];
                        var counter = 0;
                        var pos = 1;
                        require("firebase")
                          .database()
                          .ref()
                          .child(`Votos/Jogadores`)
                          .once("value", snapshot => {
                            snapshot.forEach(v => {
                              arr.push({
                                usuario: v.key,
                                votos: v.val().votos
                              });

                              counter++;
                              if (counter === snapshot.numChildren()) {
                                arr.sort(function (a, b) {
                                  return b.votos - a.votos;
                                });
                                var msgArr = [];
                                var testee = [];
                                arr.forEach(u => {
                                  let abc = pos++;
                                  if (u.usuario !== `${user.id ? user.id : user}`) return;

                                  msgArr.push(abc);
                                });

                                const mapping = {
                                  "0": "0",
                                  "1": "1",
                                  "2": "2",
                                  "3": "3",
                                  "4": "4",
                                  "5": "5",
                                  "6": "6",
                                  "7": "7",
                                  "8": "8",
                                  "9": "9"
                                };

                                "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
                                  mapping[c] = mapping[
                                    c.toUpperCase()
                                  ] = ` :regional_indicator_${c}:`;
                                });
                                embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                                embed.setTitle(`🏆 Melhores: Votadores`)
                                embed.setDescription(`• Usuários nessa categoria: ${Usuários2.length.toLocaleString()}\n• Sua posição: #${msgArr.join(" ").split("").map(c => mapping[c] || c).join("")}`)
                                embed.addField(`🏆 | Membros & Posições`, Usuários)
                                embed.setFooter(`Zyon™ ® Oficial 2020`, client.user.avatarURL())
                                embed.setTimestamp();
                                embed.setThumbnail(client.user.avatarURL())
                                reacm.edit(embed);
                                
                              }
                            })
                          })
                      }
                    }
                  }
                }
              }
        })
      })
    } catch (e) {
      const erroCanal = client.channels.get('809515239480885269')
      message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, encontrei um erro neste comando e minha equipe foi acionada!`)
      erroCanal.send(`**Erro encontrado:**\n\`${e}\`\n• Servidor: ${message.guild.name} (${message.guild.id})\n• Comando: \`\``)
    }*/
    message.channel.send(`<a:erro:809516073799122945> | **${message.author.username}**, este comando foi **desativado** e não tem previsão de volta.`)
  },
  conf: {},
  get help() {
    return {
      name: 'mlh',
      aliases: ['melhores', 'rank', 'top']
    }
  }
}