type Lang = {
  tk: {
    start: string;
    choose: string;
    buttons: {
      search: string;
      ask: string;
      restart: string;
      changeModel: string;
      faq: string;
      help: string;
      cancel: string;
    };
    model: string;
    models: {
      gem: string;
      llama: string;
      deepSeek: string;
      kimi: string;
      saai31: string;
    };
    error: string;
    cancel: string;
    help: string; // Added help
    faq: string; // Added faq
    license: string; // Added license
  };
  en: {
    start: string;
    choose: string;
    buttons: {
      search: string;
      ask: string;
      restart: string;
      changeModel: string;
      faq: string;
      help: string;
      cancel: string;
    };
    model: string;
    models: {
      gem: string;
      llama: string;
      deepSeek: string;
      kimi: string;
      saai31: string;
    };
    error: string;
    cancel: string;
    help: string; // Added help
    faq: string; // Added faq
    license: string; // Added license
  };
};

const lang: Lang = {
  tk: {
    start: `Salam, nädip kömek edip bilern?!`,
    choose: `Gerekli Amal ýetirjini saýlap ulanyp bilersiňiz!`,
    buttons: {
      search: "🔍 Gözle",
      ask: "💬 Sora",
      restart: "🔄 Täzeden başlat",
      changeModel: "🎛 AI görnüşi çalyş",
      faq: "📞 FAQ",
      help: "🗒 Kömek",
      cancel: "🔙 Ýatyrmak",
    },
    model: "Haýsy AI görnüş esasy hökmünde bellemeli:",
    models: {
      gem: "Gemini",
      llama: "Llama",
      deepSeek: "DeepSeek",
      kimi: "Kimi",
      saai31: "SAAI - 31",
    },
    error: "Bir ýalňyşlyk boldy. Täzeden synanyşyň.",
    cancel: "Sessiýa ýatyryldy!",
    help: "Bu bot size soraglar soraýar ýa-da gözleg geçirýär! /ask ýa-da /search bilen başlaň, ýatyrmak üçin /cancel ulanyň.",
    faq: "Iň köp berilýän soraglar: 1) AI nädip ulanmaly? 2) Haýsy diller goldanylýar? 3) Netijeleri nädip ýokarlandyryp bolar?",
    license:
      "📜 Türkmenistanyň Mary şäherinde Türkmen Code Lab tarapyndan @merdanusa we közgalyşçylar bilen ❤️ bilen ýasaldy, bu bot Kompýuter Ylymlaryny ösdürmek üçin MIT lisenziýasy bilen işleýär! 🌸💻",
  },
  en: {
    start: `Hi, How can I help?!`,
    choose: `You choose and use one of these functions!`,
    buttons: {
      search: "🔍 Search",
      ask: "💬 Ask",
      restart: "🔄 Restart",
      changeModel: "🎛 Change AI Model",
      faq: "📞 FAQ",
      help: "🗒 Help",
      cancel: "🔙 Cancel",
    },
    model: "Which AI model would you like to set as default:",
    models: {
      gem: "Gemini",
      llama: "Llama",
      deepSeek: "DeepSeek",
      kimi: "Kimi",
      saai31: "SAAI - 31",
    },
    error: "Something went wrong. Please retry again!",
    cancel: "Session canceled!",
    help: "This bot can answer questions or perform searches! Start with /ask or /search, use /cancel to stop.",
    faq: "Frequently Asked Questions: 1) How to use the AI? 2) Which languages are supported? 3) How to improve results?",
    license:
      "📜 Crafted with ❤️ by Turkmen Code Lab in Mary, Turkmenistan (@merdanusa & contributors), this bot runs under the MIT license to inspire Computer Science growth! 🌸💻",
  },
};

export default lang;
