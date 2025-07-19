Turkmen Code Lab's AI Bot 🌸💻🚀 Based on code SAAI-31
Welcome to the Turkmen Code Lab AI Bot, a powerful Telegram bot crafted with ❤️ in Mary, Turkmenistan by @merdanusa and the Turkmen Code Lab team. This bot empowers aspiring Computer Science and AI enthusiasts with tools to ask questions, search resources, and explore cutting-edge AI models. Built with passion, it aims to foster tech innovation in Turkmenistan and beyond! 🌍
About the Project
The Turkmen Code Lab AI Bot is an open-source Telegram bot designed to promote Computer Science education and AI exploration. Featuring a bilingual interface (Turkmen and English), it offers interactive commands like /ask and /search to engage users in learning and discovery. Inspired by the Turkmen flag’s crescent moon and five stars 🌙⭐, the bot reflects cultural pride while delivering a futuristic, cyber-powered experience.

Origin: Developed in Mary, Turkmenistan, a hub of cultural and technological growth.
Contributors: Led by @merdanusa with love and dedication from the Turkmen Code Lab team.
Mission: Inspire the next generation of coders and AI innovators in Turkmenistan and globally.

Features

Bilingual Support: Switch between Turkmen and English with /lang 🌐.
Interactive Commands:
/start: Begin your journey with the main menu 🎉.
/ask: Ask AI questions to deepen your CS knowledge 💬.
/search: Search for coding and AI resources 🔍.
/cancel: Stop the current session 🔙.
/help: Get guidance on using the bot 🗒.
/faq: Explore common questions about AI and coding ❓.
/license: View the MIT license details 📜.


AI Models: Choose from models like Gemini, Llama, DeepSeek, Kimi, or SAAI-31 🎛.
Session Persistence: Continue asking or searching until you cancel or restart.
Typing Animation: Enjoy a dynamic “typing” effect for a polished user experience ✍️.

Installation
To run the bot locally or deploy it, follow these steps:
Prerequisites

Node.js (v16 or higher)
npm (v8 or higher)
Telegram Bot Token (get one from @BotFather)

Steps

Clone the Repository:
git clone https://github.com/turkmen-code-lab/turkmen-ai-bot.git
cd turkmen-ai-bot


Install Dependencies:
npm install telegraf telegraf-session-local dotenv natural


Set Up Environment:

Create a .env file in the root directory.
Add your Telegram Bot Token:BOT_TOKEN=your-telegram-bot-token




Run the Bot:

For development with hot-reloading:npm install -g nodemon
nodemon bot.ts


For production:node bot.ts




Configure BotFather Commands:

Open Telegram, chat with @BotFather, and send /setcommands.
Paste:start - Begin your Computer Science journey with Turkmen Code Lab! 🌸🚀
lang - Switch between Turkmen and English 🌐
cancel - Stop the current session 🔙
help - Learn how to use the bot to boost your CS skills 🗒💻
faq - Explore common questions about AI and coding ❓
license - Discover the open-source spirit of our bot 📜❤️





Usage

Start the Bot:

Message your bot (e.g., @TurkmenCodeLabBot) with /start.
Choose a function (Search, Ask, Change AI Model) from the keyboard.


Example Commands:

Switch language: /lang 🌐
Ask a question: /ask What is Python? 💬
Search resources: /search JavaScript tutorials 🔍
Get help: /help 🗒
Cancel session: /cancel 🔙


Change AI Model:

Use /model or 🎛 Change AI Model to select from Gemini, Llama, DeepSeek, Kimi, or SAAI-31.



Contributing
We welcome contributions from the global and Turkmen tech communities! 🌍 To contribute:

Fork the Repository:

Click “Fork” on GitHub to create your own copy.


Create a Branch:
git checkout -b feature/your-feature


Make Changes:

Add features, fix bugs, or improve documentation.
Follow the code style in bot.ts and core/utils/tokenizer.ts.


Submit a Pull Request:

Push your changes and create a PR with a clear description.
Tag @merdanusa for review.


Guidelines:

Ensure code is TypeScript-compatible.
Test changes locally with nodemon bot.ts.
Add emojis 🌸💻 to keep the vibe engaging!



License
📜 This bot is licensed under the MIT License, crafted with ❤️ by Turkmen Code Lab in Mary, Turkmenistan (@merdanusa & contributors). Use, modify, and share it to inspire Computer Science growth! 🌸💻
Contact

Lead Developer: @merdanusa
Organization: Turkmen Code Lab
Location: Mary, Turkmenistan
GitHub: turkmen-code-lab
Issues: Report bugs or suggest features on GitHub Issues

Join us in building the future of AI and Computer Science in Turkmenistan! 🌸🚀
