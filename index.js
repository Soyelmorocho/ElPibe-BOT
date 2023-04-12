
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages], 
    partials: [User, Message, GuildMember, ThreadMember]
});

// Imprimir mensaje de inicio
console.log("Iniciando bot...");

const { loadEvents } = require("./Handlers/eventHandler");

client.config = require("./utils/config.json");
client.events = new Collection();
client.commands = new Collection();

loadEvents(client);

// Actualizar estado del bot
client.on('ready', () => {
    console.log(`Conectado como ${client.user.tag}!`);
    client.user.setPresence({
        activities: [{ name: '/Ayuda.' }],
        status: 'online'
    });
});

// Iniciar sesión del bot
client.login(client.config.token)
    .then(() => console.log("Bot iniciado correctamente!"))
    .catch(error => console.error("Error al iniciar el bot:", error));
