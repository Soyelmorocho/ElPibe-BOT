const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("kick")
      .setDescription("Kickeare a un usuario que eligas")
      .addUserOption((option) =>
        option
          .setName(`target`)
          .setDescription(`Usuario a kickear`)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option.setName(`motivo`).setDescription(`¿Motivo del kickeo?`)
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
          content: `No puedes kickearte a ti mismo`,
          ephemeral: true,
        });
      if (user.id === client.user.id)
        return interaction.reply({
          content: `No puedes kickearme a mi`,
          ephemeral: true,
        });
      if (
        member.roles.highest.position >= interaction.member.roles.highest.postion
      )
        return interaction.reply({
          content: `No puedes kickear a alguien con un rol igual o superior al tuyo`,
          ephemeral: true,
        });
      if (!member.kickable)
        return interaction.reply({
          content: `No puedo kickear a alguien con un rol superior al mio`,
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
        .setTitle(`Usuario __${user.tag}__ ha sido **__KICKEADO__**`) 
        .setColor(`#FF0000`)
        .setTimestamp()
        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
        .addFields({ name: `💬┆ Motivo`, value: `${motivo}`, inline:true })
        .addFields({ name: `👤┆ Kickeado por`, value: `${interaction.user.tag}`, inline: true});
  
      await member.kick(motivo).catch(console.error);
  
      interaction.reply({ embeds: [embed] });
    },
  };