const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ban")
      .setDescription("Baneare a un usuario que eligas")
      .addUserOption((option) =>
        option
          .setName(`target`)
          .setDescription(`Usuario a Banear`)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option.setName(`motivo`).setDescription(`¿Motivo del ban?`)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
      const user = interaction.options.getUser(`target`);
      const { guild } = interaction;
  
      let motivo = interaction.options.getString(`motivo`);
      const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);
  
      if (!motivo) motivo = "No hay motivo";
      if (user.id === interaction.user.id)
        return interaction.reply({
          content: `No puedes banearte a ti mismo`,
          ephemeral: true,
        });
      if (user.id === client.user.id)
        return interaction.reply({
          content: `No puedes banearme a mi`,
          ephemeral: true,
        });
      if (
        member.roles.highest.position >= interaction.member.roles.highest.postion
      )
        return interaction.reply({
          content: `No puedes banear a alguien con un rol igual o superior al tuyo`,
          ephemeral: true,
        });
      if (!member.kickable)
        return interaction.reply({
          content: `No puedo banear a alguien con un rol superior al mio`,
          ephemeral: true,
        });
  
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${guild.name}`,
          iconURL: `${
            guild.iconURL({ dynamic: true }) ||
            "https://cdn.discordapp.com/attachments/1053464482095050803/1053464952607875072/PRywUXcqg0v5DD6s7C3LyQ.png"
          }`,
        })
        .setTitle(`Usuario __${user.tag}__ ha sido **__BANEADO__** 🔨`)
        .setColor(`#FF0000`)
        .setTimestamp()
        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
        .addFields({ name: `💬┆ Motivo`, value: `${motivo}`, inline:true })
        .addFields({ name: `👤┆ Baneado por`, value: `${interaction.user.tag}`, inline: true}); 
      await member
        .ban({ deleteMessageSeconds: 0, reason: motivo })
        .catch(console.error);
  
      interaction.reply({ embeds: [embed] });
    },
  };