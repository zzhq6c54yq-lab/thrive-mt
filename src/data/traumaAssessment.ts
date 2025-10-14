import { MentalHealthAssessment } from './mentalHealthAssessments';
import traumaImage from '@/assets/assessment-trauma.jpg';

// Comprehensive Trauma & Adverse Childhood Experiences Assessment
export const comprehensiveTraumaAssessment: MentalHealthAssessment = {
  id: 'comprehensive-trauma',
  title: 'Comprehensive Trauma & Adverse Experiences Assessment',
  titleSpanish: 'Evaluación Integral de Trauma y Experiencias Adversas',
  description: 'A thorough assessment covering Adverse Childhood Experiences (ACEs), adult trauma exposure, and current trauma impact. This evidence-based tool helps identify trauma history and its effects on mental health.',
  descriptionSpanish: 'Una evaluación exhaustiva que cubre Experiencias Adversas en la Infancia (ACEs), exposición a trauma en adultos e impacto actual del trauma. Esta herramienta basada en evidencia ayuda a identificar el historial de trauma y sus efectos en la salud mental.',
  category: 'Trauma Assessment',
  categorySpanish: 'Evaluación de Trauma',
  duration: '20-25 minutes',
  durationSpanish: '20-25 minutos',
  difficulty: 'Advanced',
  difficultySpanish: 'Avanzado',
  targetAudience: 'Adults who have experienced traumatic events or adverse childhood experiences',
  targetAudienceSpanish: 'Adultos que han experimentado eventos traumáticos o experiencias adversas en la infancia',
  coverImage: traumaImage,
  questions: [
    // SECTION 1: Adverse Childhood Experiences (ACEs) - 10 questions
    {
      id: 'ace1',
      section: 'Adverse Childhood Experiences (Before Age 18)',
      sectionSpanish: 'Experiencias Adversas en la Infancia (Antes de los 18 años)',
      question: 'Did a parent or other adult in the household often or very often swear at you, insult you, put you down, or humiliate you? Or act in a way that made you afraid that you might be physically hurt?',
      questionSpanish: '¿Un padre u otro adulto en el hogar a menudo o muy a menudo te insultaba, te menospreciaba o te humillaba? ¿O actuaba de una manera que te hacía temer que podrías ser lastimado físicamente?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'ace2',
      section: 'Adverse Childhood Experiences (Before Age 18)',
      sectionSpanish: 'Experiencias Adversas en la Infancia (Antes de los 18 años)',
      question: 'Did a parent or other adult in the household often or very often push, grab, slap, or throw something at you? Or ever hit you so hard that you had marks or were injured?',
      questionSpanish: '¿Un padre u otro adulto en el hogar a menudo o muy a menudo te empujaba, agarraba, abofeteaba o te lanzaba algo? ¿O alguna vez te golpeó tan fuerte que tenías marcas o estabas herido?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'ace3',
      section: 'Adverse Childhood Experiences (Before Age 18)',
      sectionSpanish: 'Experiencias Adversas en la Infancia (Antes de los 18 años)',
      question: 'Did an adult or person at least 5 years older than you ever touch or fondle you or have you touch their body in a sexual way? Or attempt or actually have oral, anal, or vaginal intercourse with you?',
      questionSpanish: '¿Un adulto o persona al menos 5 años mayor que tú alguna vez te tocó o acarició o hizo que tocaras su cuerpo de manera sexual? ¿O intentó o realmente tuvo relaciones orales, anales o vaginales contigo?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'ace4',
      section: 'Adverse Childhood Experiences (Before Age 18)',
      sectionSpanish: 'Experiencias Adversas en la Infancia (Antes de los 18 años)',
      question: 'Did you often or very often feel that no one in your family loved you or thought you were important or special? Or your family didn\'t look out for each other, feel close to each other, or support each other?',
      questionSpanish: '¿A menudo o muy a menudo sentiste que nadie en tu familia te amaba o pensaba que eras importante o especial? ¿O tu familia no se cuidaba mutuamente, se sentía cerca o se apoyaba?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'ace5',
      section: 'Adverse Childhood Experiences (Before Age 18)',
      sectionSpanish: 'Experiencias Adversas en la Infancia (Antes de los 18 años)',
      question: 'Did you often or very often feel that you didn\'t have enough to eat, had to wear dirty clothes, and had no one to protect you? Or your parents were too drunk or high to take care of you or take you to the doctor if you needed it?',
      questionSpanish: '¿A menudo o muy a menudo sentiste que no tenías suficiente comida, tenías que usar ropa sucia y no tenías a nadie que te protegiera? ¿O tus padres estaban demasiado ebrios o drogados para cuidarte o llevarte al médico si lo necesitabas?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'ace6',
      section: 'Adverse Childhood Experiences (Before Age 18)',
      sectionSpanish: 'Experiencias Adversas en la Infancia (Antes de los 18 años)',
      question: 'Were your parents ever separated or divorced?',
      questionSpanish: '¿Tus padres alguna vez estuvieron separados o divorciados?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'ace7',
      section: 'Adverse Childhood Experiences (Before Age 18)',
      sectionSpanish: 'Experiencias Adversas en la Infancia (Antes de los 18 años)',
      question: 'Was your mother or stepmother often or very often pushed, grabbed, slapped, or had something thrown at her? Or sometimes, often, or very often kicked, bitten, hit with a fist, or hit with something hard? Or ever repeatedly hit over at least a few minutes or threatened with a gun or knife?',
      questionSpanish: '¿Tu madre o madrastra a menudo o muy a menudo fue empujada, agarrada, abofeteada o le lanzaron algo? ¿O a veces, a menudo o muy a menudo fue pateada, mordida, golpeada con un puño o golpeada con algo duro? ¿O alguna vez fue golpeada repetidamente durante al menos unos minutos o amenazada con una pistola o cuchillo?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'ace8',
      section: 'Adverse Childhood Experiences (Before Age 18)',
      sectionSpanish: 'Experiencias Adversas en la Infancia (Antes de los 18 años)',
      question: 'Did you live with anyone who was a problem drinker or alcoholic, or who used street drugs?',
      questionSpanish: '¿Viviste con alguien que tenía problemas con la bebida o era alcohólico, o que usaba drogas callejeras?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'ace9',
      section: 'Adverse Childhood Experiences (Before Age 18)',
      sectionSpanish: 'Experiencias Adversas en la Infancia (Antes de los 18 años)',
      question: 'Was a household member depressed or mentally ill, or did a household member attempt suicide?',
      questionSpanish: '¿Un miembro del hogar estaba deprimido o mentalmente enfermo, o un miembro del hogar intentó suicidarse?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'ace10',
      section: 'Adverse Childhood Experiences (Before Age 18)',
      sectionSpanish: 'Experiencias Adversas en la Infancia (Antes de los 18 años)',
      question: 'Did a household member go to prison?',
      questionSpanish: '¿Un miembro del hogar fue a prisión?',
      type: 'yes-no',
      required: true
    },

    // SECTION 2: Adult Trauma Exposure - 15 questions
    {
      id: 'trauma1',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you experienced a natural disaster (earthquake, flood, hurricane, tornado, etc.)?',
      questionSpanish: '¿Has experimentado un desastre natural (terremoto, inundación, huracán, tornado, etc.)?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma2',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you experienced a fire or explosion?',
      questionSpanish: '¿Has experimentado un incendio o explosión?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma3',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you experienced a transportation accident (car, boat, train, plane)?',
      questionSpanish: '¿Has experimentado un accidente de transporte (auto, barco, tren, avión)?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma4',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you experienced a serious accident at work, home, or during recreational activity?',
      questionSpanish: '¿Has experimentado un accidente grave en el trabajo, en casa o durante una actividad recreativa?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma5',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you been exposed to toxic substances (dangerous chemicals, radiation)?',
      questionSpanish: '¿Has estado expuesto a sustancias tóxicas (productos químicos peligrosos, radiación)?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma6',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you experienced physical assault (attacked, hit, slapped, kicked, beaten)?',
      questionSpanish: '¿Has experimentado asalto físico (atacado, golpeado, abofeteado, pateado, golpeado)?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma7',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you been assaulted with a weapon (shot, stabbed, threatened, kidnapped)?',
      questionSpanish: '¿Has sido asaltado con un arma (disparado, apuñalado, amenazado, secuestrado)?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma8',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you experienced sexual assault (rape, attempted rape, made to perform sexual acts)?',
      questionSpanish: '¿Has experimentado asalto sexual (violación, intento de violación, obligado a realizar actos sexuales)?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma9',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you experienced other unwanted or uncomfortable sexual experiences?',
      questionSpanish: '¿Has experimentado otras experiencias sexuales no deseadas o incómodas?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma10',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you been in combat or exposed to a war-zone (as a military member or civilian)?',
      questionSpanish: '¿Has estado en combate o expuesto a una zona de guerra (como miembro militar o civil)?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma11',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you been held captive, tortured, or kidnapped?',
      questionSpanish: '¿Has sido mantenido cautivo, torturado o secuestrado?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma12',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you experienced a life-threatening illness or injury?',
      questionSpanish: '¿Has experimentado una enfermedad o lesión que pone en peligro la vida?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma13',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you experienced severe human suffering?',
      questionSpanish: '¿Has experimentado sufrimiento humano severo?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma14',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you experienced the sudden, unexpected death of someone close to you?',
      questionSpanish: '¿Has experimentado la muerte repentina e inesperada de alguien cercano a ti?',
      type: 'yes-no',
      required: true
    },
    {
      id: 'trauma15',
      section: 'Adult Trauma Exposure (Age 18 and Older)',
      sectionSpanish: 'Exposición a Trauma en Adultos (18 años y mayores)',
      question: 'Have you experienced serious injury, harm, or death you caused to someone else?',
      questionSpanish: '¿Has experimentado lesiones graves, daño o muerte que causaste a otra persona?',
      type: 'yes-no',
      required: true
    },

    // SECTION 3: Current Trauma Impact - 20 questions
    {
      id: 'impact1',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Repeated, disturbing, and unwanted memories of the stressful experience?',
      questionSpanish: '¿Recuerdos repetidos, perturbadores y no deseados de la experiencia estresante?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact2',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Repeated, disturbing dreams of the stressful experience?',
      questionSpanish: '¿Sueños repetidos y perturbadores de la experiencia estresante?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact3',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?',
      questionSpanish: '¿Sentir o actuar repentinamente como si la experiencia estresante estuviera sucediendo de nuevo (como si realmente estuvieras allí reviviéndola)?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact4',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Feeling very upset when something reminded you of the stressful experience?',
      questionSpanish: '¿Sentirse muy molesto cuando algo te recordó la experiencia estresante?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact5',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Having strong physical reactions when something reminded you of the stressful experience (heart pounding, trouble breathing, sweating)?',
      questionSpanish: '¿Tener reacciones físicas fuertes cuando algo te recordó la experiencia estresante (corazón acelerado, dificultad para respirar, sudoración)?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact6',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Avoiding memories, thoughts, or feelings related to the stressful experience?',
      questionSpanish: '¿Evitar recuerdos, pensamientos o sentimientos relacionados con la experiencia estresante?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact7',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Avoiding external reminders of the stressful experience (people, places, conversations, activities, objects, situations)?',
      questionSpanish: '¿Evitar recordatorios externos de la experiencia estresante (personas, lugares, conversaciones, actividades, objetos, situaciones)?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact8',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Trouble remembering important parts of the stressful experience?',
      questionSpanish: '¿Problemas para recordar partes importantes de la experiencia estresante?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact9',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)?',
      questionSpanish: '¿Tener creencias negativas fuertes sobre ti mismo, otras personas o el mundo (por ejemplo, tener pensamientos como: soy malo, hay algo seriamente mal conmigo, nadie puede ser confiable, el mundo es completamente peligroso)?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact10',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Blaming yourself or someone else for the stressful experience or what happened after it?',
      questionSpanish: '¿Culparte a ti mismo o a alguien más por la experiencia estresante o lo que sucedió después?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact11',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Having strong negative feelings such as fear, horror, anger, guilt, or shame?',
      questionSpanish: '¿Tener sentimientos negativos fuertes como miedo, horror, ira, culpa o vergüenza?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact12',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Loss of interest in activities that you used to enjoy?',
      questionSpanish: '¿Pérdida de interés en actividades que solías disfrutar?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact13',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Feeling distant or cut off from other people?',
      questionSpanish: '¿Sentirse distante o desconectado de otras personas?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact14',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)?',
      questionSpanish: '¿Problemas para experimentar sentimientos positivos (por ejemplo, no poder sentir felicidad o tener sentimientos de amor por personas cercanas a ti)?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact15',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Irritable behavior, angry outbursts, or acting aggressively?',
      questionSpanish: '¿Comportamiento irritable, arrebatos de ira o actuar agresivamente?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact16',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Taking too many risks or doing things that could cause you harm?',
      questionSpanish: '¿Tomar demasiados riesgos o hacer cosas que podrían causarte daño?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact17',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Being "superalert" or watchful or on guard?',
      questionSpanish: '¿Estar "súper alerta" o vigilante o en guardia?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact18',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Feeling jumpy or easily startled?',
      questionSpanish: '¿Sentirse nervioso o asustarse fácilmente?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact19',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Having difficulty concentrating?',
      questionSpanish: '¿Tener dificultad para concentrarse?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    },
    {
      id: 'impact20',
      section: 'Current Impact (Past Month)',
      sectionSpanish: 'Impacto Actual (Último Mes)',
      question: 'Trouble falling or staying asleep?',
      questionSpanish: '¿Problemas para conciliar el sueño o permanecer dormido?',
      type: 'multiple-choice',
      options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit', 'Extremely'],
      optionsSpanish: ['Para nada', 'Un poco', 'Moderadamente', 'Bastante', 'Extremadamente'],
      required: true
    }
  ],
  scoring: {
    type: 'complex',
    ranges: [
      { min: 0, max: 25, level: 'Low Risk', levelSpanish: 'Riesgo Bajo', description: 'Low trauma exposure and minimal current impact', descriptionSpanish: 'Baja exposición al trauma e impacto actual mínimo' },
      { min: 26, max: 50, level: 'Moderate Risk', levelSpanish: 'Riesgo Moderado', description: 'Moderate trauma exposure with some current symptoms', descriptionSpanish: 'Exposición moderada al trauma con algunos síntomas actuales' },
      { min: 51, max: 75, level: 'High Risk', levelSpanish: 'Riesgo Alto', description: 'Significant trauma history with notable current impact', descriptionSpanish: 'Historial de trauma significativo con impacto actual notable' },
      { min: 76, max: 115, level: 'Severe Risk', levelSpanish: 'Riesgo Severo', description: 'Extensive trauma exposure with severe current symptoms', descriptionSpanish: 'Exposición extensa al trauma con síntomas actuales severos' }
    ]
  },
  resultInterpretations: [
    {
      scoreRange: { min: 0, max: 25 },
      title: 'Low Trauma Impact',
      titleSpanish: 'Impacto de Trauma Bajo',
      description: 'Your responses suggest minimal trauma exposure and low current impact. Continue with healthy coping strategies.',
      descriptionSpanish: 'Tus respuestas sugieren exposición mínima al trauma y bajo impacto actual. Continúa con estrategias de afrontamiento saludables.',
      severity: 'low'
    },
    {
      scoreRange: { min: 26, max: 50 },
      title: 'Moderate Trauma Impact',
      titleSpanish: 'Impacto de Trauma Moderado',
      description: 'Your responses suggest moderate trauma exposure with some current symptoms. Consider trauma-informed support and self-care practices.',
      descriptionSpanish: 'Tus respuestas sugieren exposición moderada al trauma con algunos síntomas actuales. Considera apoyo informado sobre trauma y prácticas de autocuidado.',
      severity: 'moderate'
    },
    {
      scoreRange: { min: 51, max: 75 },
      title: 'Significant Trauma Impact',
      titleSpanish: 'Impacto de Trauma Significativo',
      description: 'Your responses suggest significant trauma history with notable current impact. We strongly recommend consulting with a trauma-informed mental health professional.',
      descriptionSpanish: 'Tus respuestas sugieren un historial de trauma significativo con impacto actual notable. Recomendamos encarecidamente consultar con un profesional de salud mental informado sobre trauma.',
      severity: 'high'
    },
    {
      scoreRange: { min: 76, max: 115 },
      title: 'Severe Trauma Impact',
      titleSpanish: 'Impacto de Trauma Severo',
      description: 'Your responses suggest extensive trauma exposure with severe current symptoms. Immediate professional help from a trauma specialist is strongly recommended.',
      descriptionSpanish: 'Tus respuestas sugieren exposición extensa al trauma con síntomas actuales severos. Se recomienda encarecidamente ayuda profesional inmediata de un especialista en trauma.',
      severity: 'severe'
    }
  ],
  recommendations: [
    'Seek trauma-informed therapy (EMDR, CPT, or Trauma-Focused CBT)',
    'Practice grounding techniques for flashbacks and emotional distress',
    'Build a strong support network of trusted individuals',
    'Prioritize self-care and stress management',
    'Consider joining a trauma support group',
    'Develop healthy coping strategies to manage triggers',
    'Educate yourself about trauma and its effects',
    'Be patient and compassionate with yourself in the healing process',
    'If experiencing severe symptoms or crisis, call 988 (Suicide & Crisis Lifeline) or visit your nearest emergency room'
  ],
  recommendationsSpanish: [
    'Busca terapia informada sobre trauma (EMDR, CPT o TCC enfocada en trauma)',
    'Practica técnicas de conexión a tierra para flashbacks y angustia emocional',
    'Construye una red de apoyo sólida de personas de confianza',
    'Prioriza el autocuidado y el manejo del estrés',
    'Considera unirte a un grupo de apoyo para trauma',
    'Desarrolla estrategias de afrontamiento saludables para manejar desencadenantes',
    'Edúcate sobre el trauma y sus efectos',
    'Sé paciente y compasivo contigo mismo en el proceso de curación',
    'Si experimentas síntomas severos o crisis, llama al 988 (Línea de Vida para Suicidio y Crisis) o visita la sala de emergencias más cercana'
  ],
  disclaimer: 'This comprehensive trauma assessment is for educational and screening purposes only and does not provide a clinical diagnosis. Trauma is complex and requires professional evaluation. If you are experiencing severe trauma symptoms, dissociation, suicidal thoughts, or are in crisis, please seek immediate help. Call 988 (Suicide & Crisis Lifeline), text "HELLO" to 741741 (Crisis Text Line), or visit your nearest emergency room. You deserve support and healing.',
  disclaimerSpanish: 'Esta evaluación integral de trauma es solo para fines educativos y de detección y no proporciona un diagnóstico clínico. El trauma es complejo y requiere evaluación profesional. Si experimentas síntomas severos de trauma, disociación, pensamientos suicidas o estás en crisis, busca ayuda inmediata. Llama al 988 (Línea de Vida para Suicidio y Crisis), envía un mensaje de texto "HELLO" al 741741 (Línea de Texto de Crisis) o visita la sala de emergencias más cercana. Mereces apoyo y curación.',
  professionalReferral: true
};
