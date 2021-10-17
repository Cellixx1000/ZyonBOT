const { MessageEmbed } = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()

module.exports = async (client, guild, member) => {
    const canal = client.channels.cache.get('794616195512795146')
    const mServidores = new MessageEmbed()
    .setTitle(`<:notify:800892028929703946> ${guild.name}`)
    .setDescription(`Esse servidor me removeu. O pai tá triste :pensive:`)
    .addField(`<a:loading:801259440765534248> Restaram`, `**${client.guilds.cache.size.toLocaleString('pt-BR')}** servidores!`, true)
    .addField(`<a:loading:801259440765534248> Membros`, `**${guild.memberCount.toLocaleString('pt-BR')}** usuários!`, true)
    .setThumbnail(guild.iconURL({ dynamic: true, format: 'png', size: 512 }))
    .setFooter(`© 2020. Zyon™ • Todos os direitos reservados.`, client.user.avatarURL())
    canal.send(mServidores)
    //<!-- Deletamos o canal do servidor --!>
    database.ref(`Configurações/Servidores/${guild.id}/Canal`)
        .update({
            canal: null
        })    
    //<!-- Deletamos todas as empresas --!>
    database.ref(`Economia/Servidor/${guild.id}/Empresas/Empresa 01`)
        .update({
            nome: null,
            descrição: null,
            dono: null,
            usuario: null,
            compradoEm: null,
            id: null,
            produtos: null,
            nivel: null,
            xp: null,
            capacidade: null,
            cofre: null,
            estaAvenda: null,
            valor: null,
            imagem: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Empresas/Empresa 02`)
        .update({
            nome: null,
            descrição: null,
            dono: null,
            usuario: null,
            compradoEm: null,
            id: null,
            produtos: null,
            nivel: null,
            xp: null,
            capacidade: null,
            cofre: null,
            estaAvenda: null,
            imagem: null,
            valor: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Empresas/Empresa 03`)
        .update({
            nome: null,
            descrição: null,
            dono: null,
            usuario: null,
            compradoEm: null,
            id: null,
            produtos: null,
            nivel: null,
            xp: null,
            capacidade: null,
            cofre: null,
            estaAvenda: null,
            imagem: null,
            valor: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Empresas/Empresa 04`)
        .update({
            nome: null,
            descrição: null,
            dono: null,
            usuario: null,
            compradoEm: null,
            id: null,
            produtos: null,
            nivel: null,
            xp: null,
            capacidade: null,
            cofre: null,
            estaAvenda: null,
            imagem: null,
            valor: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Empresas/Empresa 05`)
        .update({
            nome: null,
            descrição: null,
            dono: null,
            usuario: null,
            compradoEm: null,
            id: null,
            produtos: null,
            nivel: null,
            xp: null,
            capacidade: null,
            cofre: null,
            estaAvenda: null,
            imagem: null,
            valor: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Empresas/Empresa 06`)
        .update({
            nome: null,
            descrição: null,
            dono: null,
            usuario: null,
            compradoEm: null,
            id: null,
            produtos: null,
            nivel: null,
            xp: null,
            capacidade: null,
            cofre: null,
            estaAvenda: null,
            imagem: null,
            valor: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Empresas/Empresa 07`)
        .update({
            nome: null,
            descrição: null,
            dono: null,
            usuario: null,
            compradoEm: null,
            id: null,
            produtos: null,
            nivel: null,
            xp: null,
            capacidade: null,
            cofre: null,
            estaAvenda: null,
            imagem: null,
            valor: null
        })
    //<!-- Deletamos o usuário 0 (Zyon) --!>
    database.ref(`Economia/Servidor/${guild.id}/Saldo/Usuário/0`)
        .update({
            usuario: null,
            dinheiro: null,
            banco: null
        });
    //<!-- Deletamos o prefixo --!>
    database.ref(`Configurações/Servidores/${guild.id}/Prefixo`)
        .update({
            servidor: null,
            prefixo: null
        })
    //<!-- Deltetamos os demais dados --!>
    database.ref(`Economia/Servidor/${guild.id}/Arsenal`)
        .update({
            Usuário: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Coowldown`)
        .update({
            Usuário: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Empregos (Avançados)`)
        .update({
            Usuário: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Empregos (Comuns)`)
        .update({
            Usuário: null
        })
    database.ref(`Economia/Servidor/${guild.id}`)
        .update({
            "Empresas (Donos)": null
        })
    database.ref(`Economia/Servidor/${guild.id}/Itens de Empregos (Avançados)`)
        .update({
            Usuário: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Itens de Empregos (Comuns)`)
        .update({
            Usuário: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Pontos`)
        .update({
            Usuário: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Registros`)
        .update({
            Usuário: null
        })
    database.ref(`Economia/Servidor/${guild.id}/Saldo`)
        .update({
            Usuário: null
        })
    database.ref(`Loja/Servidor/${message.guild.id}/Cargos`)
        .update({
          "cargo01": null,
          "valor01": null,
          "cargo02": null,
          "valor02": null,
          "cargo03": null,
          "valor03": null,
          "cargo04": null,
          "valor04": null,
          "cargo05": null,
          "valor05": null
        })
}