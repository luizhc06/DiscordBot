import discord
import openai
from dotenv import load_dotenv
from discord.ext import commands
import os

load_dotenv()
DISCORD_BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

intents = discord.Intents.default()
intents.messages = True
bot = commands.Bot(command_prefix="!", intents=intents)

openai.api_key = OPENAI_API_KEY

async def buscar_historico_canal(canal, limit=1):
    messages_list = []
    async for message in canal.history(limit=limit, oldest_first=True):
        messages_list.append(
            {
                "role": "user" if message.author.id != bot.user.id else "system",
                "content": message.content
            }
        )
    messages_list.reverse()
    return messages_list

def ask_gpt(mensagens):
    response = openai.ChatCompletion.create(
        messages=mensagens,
        model="gpt-3.5-turbo-16k",
        max_tokens=300, //aqui voce pode alterar o valor
        temperature=0,9 //aqui voce pode alterar o valor tbm
    )
    return response.choices[0].message.content

@bot.event
async def on_ready():
    print(f"O {bot.user.name} está ligado!")

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    
    async with message.channel.typing():
        mensagens = await buscar_historico_canal(message.channel)
        resposta = ask_gpt(mensagens)
    
        await message.reply(resposta)
    
    await bot.process_commands(message)

bot.run(DISCORD_BOT_TOKEN)
