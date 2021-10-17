const { MessageEmbed } = require('discord.js');

module.exports = {
  run: async function (client, message, args) {
    if (message.author.id != "796125693447635027" && message.author.id != "")
      return;
      
  const content = message.content.split(" ").slice(1).join(" ");
  const result = new Promise((resolve) => resolve(eval(content)));
      
  return result.then((output) => {
    if(typeof output !== "string"){
      output = require("util").inspect(output, { depth: 0 });
    }
    message.channel.send(output, {
      code: "js"
    });
  }).catch((err) => {
    err = err.toString();
    message.channel.send(err, {
      code: "js"
    });
  });
},
conf: {},
get help () {
  return {
    name: 'eval'
  }
  }
}
