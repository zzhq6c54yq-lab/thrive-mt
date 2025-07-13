export interface PositivePrompt {
  id: string;
  english: string;
  spanish: string;
}

export interface MoodPrompts {
  [key: string]: PositivePrompt[];
}

export const positivePrompts: MoodPrompts = {
  happy: [
    {
      id: "happy_1",
      english: "Share your joy with someone who needs a smile today. Your happiness has the power to brighten their entire world.",
      spanish: "Comparte tu alegría con alguien que necesite una sonrisa hoy. Tu felicidad tiene el poder de iluminar todo su mundo."
    },
    {
      id: "happy_2", 
      english: "Take a moment to dance to your favorite song. Let your body express the joy that's flowing through you right now.",
      spanish: "Tómate un momento para bailar tu canción favorita. Deja que tu cuerpo exprese la alegría que fluye a través de ti ahora mismo."
    },
    {
      id: "happy_3",
      english: "Write down three things that made you smile today. Create a collection of these happy moments to revisit whenever you need them.",
      spanish: "Escribe tres cosas que te hicieron sonreír hoy. Crea una colección de estos momentos felices para revisarlos cuando los necesites."
    },
    {
      id: "happy_4",
      english: "Plan something special for yourself this week. Your happiness deserves to be celebrated and nurtured.",
      spanish: "Planifica algo especial para ti esta semana. Tu felicidad merece ser celebrada y nutrida."
    },
    {
      id: "happy_5",
      english: "Call someone you love and tell them how much they mean to you. Spread the love that's overflowing from your heart.",
      spanish: "Llama a alguien que amas y dile lo mucho que significa para ti. Extiende el amor que desborda de tu corazón."
    },
    {
      id: "happy_6",
      english: "Go outside and soak up some sunshine. Let nature amplify the positive energy you're already radiating.",
      spanish: "Sal afuera y absorbe un poco de sol. Deja que la naturaleza amplifique la energía positiva que ya estás irradiando."
    },
    {
      id: "happy_7",
      english: "Create something beautiful today - draw, write, cook, or craft. Channel your joy into something tangible.",
      spanish: "Crea algo hermoso hoy - dibuja, escribe, cocina o hazlo a mano. Canaliza tu alegría en algo tangible."
    },
    {
      id: "happy_8",
      english: "Treat yourself to something that brings you pure delight. You deserve to celebrate this wonderful feeling.",
      spanish: "Date un gusto con algo que te traiga pura alegría. Mereces celebrar este sentimiento maravilloso."
    },
    {
      id: "happy_9",
      english: "Start a gratitude jar today. Write down what you're grateful for and watch it fill up with blessings.",
      spanish: "Comienza un frasco de gratitud hoy. Escribe lo que agradeces y míralo llenarse de bendiciones."
    },
    {
      id: "happy_10",
      english: "Capture this moment with a photo or selfie. Let your happiness shine through and create a memory to treasure.",
      spanish: "Captura este momento con una foto o selfie. Deja que tu felicidad brille y crea un recuerdo para atesorar."
    }
  ],
  ok: [
    {
      id: "ok_1",
      english: "Take five deep breaths and acknowledge your steady strength. Even 'okay' days are victories worth celebrating.",
      spanish: "Toma cinco respiraciones profundas y reconoce tu fuerza constante. Incluso los días 'regulares' son victorias que vale la pena celebrar."
    },
    {
      id: "ok_2",
      english: "Do one small thing that brings you comfort today. Sometimes the gentlest self-care creates the biggest shifts.",
      spanish: "Haz una cosa pequeña que te traiga comodidad hoy. A veces el autocuidado más suave crea los cambios más grandes."
    },
    {
      id: "ok_3",
      english: "Set one achievable goal for today. Small progress is still progress, and you're exactly where you need to be.",
      spanish: "Establece una meta alcanzable para hoy. El progreso pequeño sigue siendo progreso, y estás exactamente donde necesitas estar."
    },
    {
      id: "ok_4",
      english: "Text someone you care about just to check in. Connection has a way of lifting both hearts.",
      spanish: "Envía un mensaje a alguien que te importa solo para ver cómo está. La conexión tiene una manera de elevar ambos corazones."
    },
    {
      id: "ok_5",
      english: "Look out the window and find one beautiful thing in nature. Let it remind you of life's simple wonders.",
      spanish: "Mira por la ventana y encuentra algo hermoso en la naturaleza. Deja que te recuerde las maravillas simples de la vida."
    },
    {
      id: "ok_6",
      english: "Listen to a song that always makes you feel better. Music has the power to shift our entire energy.",
      spanish: "Escucha una canción que siempre te hace sentir mejor. La música tiene el poder de cambiar toda nuestra energía."
    },
    {
      id: "ok_7",
      english: "Make yourself a warm drink and savor each sip mindfully. Find peace in these simple, nurturing moments.",
      spanish: "Prepárate una bebida caliente y saborea cada sorbo conscientemente. Encuentra paz en estos momentos simples y nutritivos."
    },
    {
      id: "ok_8",
      english: "Write down one thing you're proud of accomplishing recently. Acknowledge your growth and resilience.",
      spanish: "Escribe una cosa de la que te sientes orgulloso de haber logrado recientemente. Reconoce tu crecimiento y resistencia."
    },
    {
      id: "ok_9",
      english: "Take a gentle walk, even if it's just around your space. Movement can help energy flow more freely.",
      spanish: "Da un paseo suave, aunque sea solo alrededor de tu espacio. El movimiento puede ayudar a que la energía fluya más libremente."
    },
    {
      id: "ok_10",
      english: "Organize one small area of your space. Creating external order often helps create internal calm.",
      spanish: "Organiza un área pequeña de tu espacio. Crear orden externo a menudo ayuda a crear calma interna."
    }
  ],
  neutral: [
    {
      id: "neutral_1",
      english: "Use this calm energy to plan something you're looking forward to. Your balanced state is perfect for thoughtful decisions.",
      spanish: "Usa esta energía calmada para planificar algo que esperes con ansias. Tu estado equilibrado es perfecto para decisiones reflexivas."
    },
    {
      id: "neutral_2",
      english: "Practice mindful meditation for 5 minutes. This centered feeling is an ideal foundation for inner exploration.",
      spanish: "Practica meditación consciente por 5 minutos. Este sentimiento centrado es una base ideal para la exploración interior."
    },
    {
      id: "neutral_3",
      english: "Journal about your current thoughts and feelings. Clarity often emerges from this peaceful mental space.",
      spanish: "Escribe en tu diario sobre tus pensamientos y sentimientos actuales. La claridad a menudo emerge de este espacio mental pacífico."
    },
    {
      id: "neutral_4",
      english: "Reach out to a friend for a calm, genuine conversation. Your centered energy creates space for meaningful connection.",
      spanish: "Contacta a un amigo para una conversación calmada y genuina. Tu energía centrada crea espacio para una conexión significativa."
    },
    {
      id: "neutral_5",
      english: "Learn something new today - read an article, watch a tutorial, or explore a hobby. Your mind is open and receptive.",
      spanish: "Aprende algo nuevo hoy - lee un artículo, mira un tutorial o explora un pasatiempo. Tu mente está abierta y receptiva."
    },
    {
      id: "neutral_6",
      english: "Create a peaceful environment around you. Light a candle, play soft music, or arrange some flowers.",
      spanish: "Crea un ambiente pacífico a tu alrededor. Enciende una vela, pon música suave o arregla algunas flores."
    },
    {
      id: "neutral_7",
      english: "Take photos of things that catch your eye today. Your calm perspective helps you notice beauty others might miss.",
      spanish: "Toma fotos de cosas que llamen tu atención hoy. Tu perspectiva calmada te ayuda a notar belleza que otros podrían pasar por alto."
    },
    {
      id: "neutral_8",
      english: "Organize your thoughts by making a to-do list or setting gentle priorities. Use this clarity to move forward purposefully.",
      spanish: "Organiza tus pensamientos haciendo una lista de tareas o estableciendo prioridades suaves. Usa esta claridad para avanzar con propósito."
    },
    {
      id: "neutral_9",
      english: "Spend time in nature, even if it's just sitting by a window. Let the natural world mirror your inner calm.",
      spanish: "Pasa tiempo en la naturaleza, aunque sea solo sentado junto a una ventana. Deja que el mundo natural refleje tu calma interior."
    },
    {
      id: "neutral_10",
      english: "Practice gratitude by acknowledging the stability you feel right now. This peace is a gift worth recognizing.",
      spanish: "Practica la gratitud reconociendo la estabilidad que sientes ahora mismo. Esta paz es un regalo que vale la pena reconocer."
    }
  ],
  down: [
    {
      id: "down_1",
      english: "Do one tiny thing that usually makes you smile - watch a funny video, pet an animal, or text a friend who cares.",
      spanish: "Haz una cosita que normalmente te hace sonreír - mira un video gracioso, acaricia un animal o envía un mensaje a un amigo que se preocupa."
    },
    {
      id: "down_2",
      english: "Wrap yourself in something soft and comforting. Give yourself the gentle care you'd offer a dear friend.",
      spanish: "Envuélvete en algo suave y reconfortante. Date el cuidado gentil que le ofrecerías a un querido amigo."
    },
    {
      id: "down_3",
      english: "Write down one thing you're grateful for, no matter how small. Light exists even in darker moments.",
      spanish: "Escribe una cosa por la que estés agradecido, sin importar cuán pequeña sea. La luz existe incluso en los momentos más oscuros."
    },
    {
      id: "down_4",
      english: "Take a warm shower or bath. Let the water wash away the heaviness you're carrying today.",
      spanish: "Toma una ducha o baño caliente. Deja que el agua se lleve la pesadez que cargas hoy."
    },
    {
      id: "down_5",
      english: "Listen to music that speaks to your soul. Sometimes we need to honor our feelings before we can transform them.",
      spanish: "Escucha música que hable a tu alma. A veces necesitamos honrar nuestros sentimientos antes de poder transformarlos."
    },
    {
      id: "down_6",
      english: "Step outside for fresh air, even if it's just for two minutes. Nature has a gentle way of reminding us we're not alone.",
      spanish: "Sal afuera por aire fresco, aunque sea solo por dos minutos. La naturaleza tiene una manera gentil de recordarnos que no estamos solos."
    },
    {
      id: "down_7",
      english: "Make yourself something nourishing to eat or drink. Feeding your body is an act of self-love.",
      spanish: "Prepárate algo nutritivo para comer o beber. Alimentar tu cuerpo es un acto de amor propio."
    },
    {
      id: "down_8",
      english: "Reach out to someone you trust. You don't have to carry this feeling alone - connection can lighten the load.",
      spanish: "Contacta a alguien en quien confíes. No tienes que cargar este sentimiento solo - la conexión puede aliviar la carga."
    },
    {
      id: "down_9",
      english: "Do some gentle movement - stretch, walk slowly, or just move your arms. Your body holds wisdom for healing.",
      spanish: "Haz algún movimiento suave - estírate, camina lentamente o simplemente mueve los brazos. Tu cuerpo tiene sabiduría para sanar."
    },
    {
      id: "down_10",
      english: "Remember: this feeling is temporary. You've overcome difficult moments before, and your strength is still there, waiting to emerge.",
      spanish: "Recuerda: este sentimiento es temporal. Has superado momentos difíciles antes, y tu fuerza sigue ahí, esperando emerger."
    }
  ],
  sad: [
    {
      id: "sad_1",
      english: "Honor your feelings by crying if you need to. Tears are the heart's way of releasing what it can no longer hold.",
      spanish: "Honra tus sentimientos llorando si lo necesitas. Las lágrimas son la manera del corazón de liberar lo que ya no puede sostener."
    },
    {
      id: "sad_2",
      english: "Call someone who loves you unconditionally. Sometimes we need to borrow strength from others' love for us.",
      spanish: "Llama a alguien que te ame incondicionalmente. A veces necesitamos tomar prestada la fuerza del amor que otros sienten por nosotros."
    },
    {
      id: "sad_3",
      english: "Create a memory box or write a letter to someone you miss. Love doesn't end; it transforms into beautiful memories.",
      spanish: "Crea una caja de recuerdos o escribe una carta a alguien que extrañas. El amor no termina; se transforma en hermosos recuerdos."
    },
    {
      id: "sad_4",
      english: "Watch the sunrise or sunset today. Let nature remind you that beauty persists even through transitions and endings.",
      spanish: "Mira el amanecer o atardecer hoy. Deja que la naturaleza te recuerde que la belleza persiste incluso a través de transiciones y finales."
    },
    {
      id: "sad_5",
      english: "Make yourself a comfort meal or treat. Nourish your body with the same kindness you'd show a grieving friend.",
      spanish: "Prepárate una comida reconfortante o un antojo. Nutre tu cuerpo con la misma bondad que mostrarías a un amigo en duelo."
    },
    {
      id: "sad_6",
      english: "Listen to music that matches your mood, then gradually shift to something more hopeful. Music can guide us through emotional transitions.",
      spanish: "Escucha música que coincida con tu estado de ánimo, luego cambia gradualmente a algo más esperanzador. La música puede guiarnos a través de transiciones emocionales."
    },
    {
      id: "sad_7",
      english: "Write in a journal about what you're feeling. Sometimes putting emotions into words helps us understand and process them.",
      spanish: "Escribe en un diario sobre lo que sientes. A veces poner las emociones en palabras nos ayuda a entenderlas y procesarlas."
    },
    {
      id: "sad_8",
      english: "Hug a pet, a pillow, or yourself. Physical comfort can be deeply healing when our hearts are hurting.",
      spanish: "Abraza a una mascota, una almohada o a ti mismo. El consuelo físico puede ser profundamente sanador cuando nuestros corazones están doliendo."
    },
    {
      id: "sad_9",
      english: "Do one small act of kindness for someone else. Sometimes helping others helps us remember our own strength and purpose.",
      spanish: "Haz un pequeño acto de bondad por alguien más. A veces ayudar a otros nos ayuda a recordar nuestra propia fuerza y propósito."
    },
    {
      id: "sad_10",
      english: "Plant a seed or care for a plant. Let the cycle of growth remind you that new life emerges even after difficult seasons.",
      spanish: "Planta una semilla o cuida una planta. Deja que el ciclo de crecimiento te recuerde que nueva vida emerge incluso después de temporadas difíciles."
    }
  ],
  overwhelmed: [
    {
      id: "overwhelmed_1",
      english: "Take 10 deep breaths and write down just three priorities for today. You don't have to do everything right now.",
      spanish: "Toma 10 respiraciones profundas y escribe solo tres prioridades para hoy. No tienes que hacer todo ahora mismo."
    },
    {
      id: "overwhelmed_2",
      english: "Step away from your tasks for 15 minutes. Take a walk, stretch, or just sit quietly. Perspective often comes with distance.",
      spanish: "Aléjate de tus tareas por 15 minutos. Camina, estírate o simplemente siéntate en silencio. La perspectiva a menudo viene con la distancia."
    },
    {
      id: "overwhelmed_3",
      english: "Break one big task into tiny, manageable steps. Focus only on the very next small action you can take.",
      spanish: "Divide una tarea grande en pasos pequeños y manejables. Enfócate solo en la siguiente acción pequeña que puedes tomar."
    },
    {
      id: "overwhelmed_4",
      english: "Call or text someone who calms you. Sometimes we need another person's peace to remember our own.",
      spanish: "Llama o envía un mensaje a alguien que te calme. A veces necesitamos la paz de otra persona para recordar la nuestra."
    },
    {
      id: "overwhelmed_5",
      english: "Create a 'not today' list of things you can postpone. Give yourself permission to be human and have limits.",
      spanish: "Crea una lista de 'no hoy' de cosas que puedes posponer. Date permiso de ser humano y tener límites."
    },
    {
      id: "overwhelmed_6",
      english: "Put on your favorite comfort music and just breathe. Let the rhythm help regulate your nervous system.",
      spanish: "Pon tu música reconfortante favorita y solo respira. Deja que el ritmo ayude a regular tu sistema nervioso."
    },
    {
      id: "overwhelmed_7",
      english: "Do something with your hands - knead dough, play with clay, or do a puzzle. Physical activity can calm mental chaos.",
      spanish: "Haz algo con tus manos - amasa, juega con arcilla o haz un rompecabezas. La actividad física puede calmar el caos mental."
    },
    {
      id: "overwhelmed_8",
      english: "Set a gentle timer for 25 minutes and work on just one thing. Give yourself permission to do less, but do it mindfully.",
      spanish: "Pon un temporizador suave por 25 minutos y trabaja en solo una cosa. Date permiso de hacer menos, pero hazlo conscientemente."
    },
    {
      id: "overwhelmed_9",
      english: "Look up at the sky and remember how vast the world is. Your current challenges, while real, are just one part of a bigger picture.",
      spanish: "Mira hacia el cielo y recuerda cuán vasto es el mundo. Tus desafíos actuales, aunque reales, son solo una parte de un panorama más grande."
    },
    {
      id: "overwhelmed_10",
      english: "Practice saying 'no' to one new request today. Protecting your energy is an act of wisdom, not selfishness.",
      spanish: "Practica decir 'no' a una nueva solicitud hoy. Proteger tu energía es un acto de sabiduría, no de egoísmo."
    }
  ]
};

// Utility functions for prompt management
export const getRandomPrompt = (mood: string, usedPromptIds: string[] = []): PositivePrompt | null => {
  const moodPrompts = positivePrompts[mood];
  if (!moodPrompts) return null;
  
  const availablePrompts = moodPrompts.filter(prompt => !usedPromptIds.includes(prompt.id));
  
  // If all prompts have been used, reset and use all prompts
  if (availablePrompts.length === 0) {
    const randomIndex = Math.floor(Math.random() * moodPrompts.length);
    return moodPrompts[randomIndex];
  }
  
  const randomIndex = Math.floor(Math.random() * availablePrompts.length);
  return availablePrompts[randomIndex];
};

export const saveUsedPrompt = (mood: string, promptId: string): void => {
  const storageKey = `usedPrompts_${mood}`;
  const existingIds = JSON.parse(localStorage.getItem(storageKey) || '[]');
  
  if (!existingIds.includes(promptId)) {
    existingIds.push(promptId);
    localStorage.setItem(storageKey, JSON.stringify(existingIds));
  }
};

export const resetUsedPrompts = (mood: string): void => {
  const storageKey = `usedPrompts_${mood}`;
  localStorage.removeItem(storageKey);
};

export const getUsedPrompts = (mood: string): string[] => {
  const storageKey = `usedPrompts_${mood}`;
  return JSON.parse(localStorage.getItem(storageKey) || '[]');
};