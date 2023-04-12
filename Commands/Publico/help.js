const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
  } = require(`discord.js`);
  const Discord = require(`discord.js`);
  const fs = require(`fs`);
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ayuda")
      .setDescription("Mira mis comandos"),
  
    async execute(interaction) {
      const cmp = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder().setCustomId("Menu").setPlaceholder("Haz una selección").addOptions([
          {
            label: "INFORMACION",
            description: "Información sobre EL PIBE",
            value: "informacion",
            emoji: "📚",
          },
          {
            label: "ECONOMIA",
            description: "Comandos de Economía",
            value: "economia",
            emoji: "💵"
          },
          {
            label: "MODERACIÓN",
            description: "Comandos para Moderadores",
            value: "moderacion",
            emoji: "🔨",
          },
          {
            label: "MUSICA",
            description: "Comandos para Música",
            value: "musica",
            emoji: "🎧",
          },
        ])
      );
      const user = interaction.user;
      
      const embed1 = new EmbedBuilder()
        .setTitle("¡Bienvenid@!")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/1079239838898864199/1089426621397729330/C13573A8-ED17-42F8-A798-FAD98F65A385.png"
        )
        .setColor(`Red`)
        .setDescription("¡Hola! Soy **ELPIBE**, un bot diseñado para ayudarte con la moderación y la diversión en tu servidor. Me puedes encontrar en Discord con el username `EL PIBE#5369`.\n\nCon mi amplio conjunto de comandos, puedes mantener tu servidor seguro y divertido. Mis comandos de moderación incluyen `/ban`, `/kick`, `/silenciar` y `/clear`, para ayudarte a mantener un ambiente respetuoso en tu servidor.\n\nTambién tengo comandos de economía, como `/work`, `/daily`, `/bet` y `/balance`, para que tus miembros puedan ganar dinero en el servidor. Y no olvides mis comandos de música, como `/play`, `/filtros`, `/volume` y `/skip`, para poner música y divertirse con tus amigos.\n\n¡No dudes en usar mi ayuda en cualquier momento! Usa el comando `/ayuda` para ver una lista completa de mis comandos.");
  
      let mensaje = await interaction.reply({
        embeds: [embed1],
        components: [cmp],
      });
  
      const filtro = (i) => i.user.id === interaction.user.id;
      user.id;
  
      let collector = interaction.channel.createMessageComponentCollector({
        filter: filtro,
      }); 

      const embed2 = new EmbedBuilder()
        .setTitle("💵| Comandos de Economia")
        .setDescription("¡Haz crecer tu fortuna en el servidor con estos comandos de economía! Usa `/work` para conseguir dinero trabajando, o arriésgalo todo con `/bet` en un juego de azar. Comprueba tu saldo con `/balance`, mira quién es el más rico con `/leaderboard`, y protege tus ganancias con `/deposit` y `/withdraw`. Pero ten cuidado, ¡también puedes caer en la tentación del delito con `/crime` o ser víctima de un robo con `/rob`! ¡Usa estos comandos sabiamente y conviértete en el más rico del servidor!")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/1079239838898864199/1089426621397729330/C13573A8-ED17-42F8-A798-FAD98F65A385.png"
        )
        .setFooter({ text: "© desarrollado por SoyElMorocho#4368 | 2023" })
        .setTimestamp()
        .setColor(`Red`);

      const embed3 = new EmbedBuilder()
        .setTitle("🔨| Comandos de Moderación")
        .setDescription(
          "Estos son los comandos de moderación disponibles para el personal del **STAFF**:\n\n🔴 `/ban @usuario (motivo)`: banea a un usuario del servidor.\n\n🟠 `/silenciar @usuario (tiempo) (motivo)`: silencia a un usuario por un tiempo determinado.\n\n🟡 `/kick @usuario (motivo)`: expulsa a un usuario del servidor.\n\n🟢 `/clear (numero)`: elimina un número determinado de mensajes.\n\n¡Usa estos comandos con responsabilidad y solo en casos necesarios!"
        )
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/1079239838898864199/1089426621397729330/C13573A8-ED17-42F8-A798-FAD98F65A385.png"
        )
        .setFooter({ text: "© desarrollado por SoyElMorocho#4368 | 2023" })
        .setTimestamp()
        .setColor(`Red`);
      
  
      const embed4 = new EmbedBuilder()
        .setTitle("🎧| Comandos de Musica")
        .setDescription("¡Haz que la fiesta nunca pare con estos comandos de música! Usa `/play` para reproducir tus canciones favoritas, o agrega efectos de sonido y filtros con `/filtros`. Si necesitas cambiar la lista de reproducción, usa `/remover`, `/stop`, `/pausar`, `/lista`, `/mover` o `/continuar`. Si quieres pasar a la siguiente canción, usa `/skip`. Y si quieres escuchar de nuevo una canción, usa `/replay`. ¡También puedes ajustar el volumen con `/volume` y ver quién está en la lista de reproducción con `/lista`! ¡Asegúrate de tener tus auriculares a mano y disfruta de la música!")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/1079239838898864199/1089426621397729330/C13573A8-ED17-42F8-A798-FAD98F65A385.png"
        )
        .setFooter({ text: "© desarrollado por SoyElMorocho#4368 | 2023" })
        .setTimestamp()
        .setColor(`Red`);

  





      collector.on("collect", async (i) => {
        if (i.values[0] === "informacion") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed1], components: [cmp] });
        }
      });

      collector.on("collect", async (i) => {
        if (i.values[0] === "economia") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed2], components: [cmp] });
        }
      });
  
      collector.on("collect", async (i) => {
        if (i.values[0] === "moderacion") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed3], components: [cmp] });
        }
      });
  
      collector.on("collect", async (i) => {
        if (i.values[0] === "musica") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed4], components: [cmp] });
        }
      });
    },
  };