import { comprehensiveTraumaAssessment } from './traumaAssessment';
import anxietyImage from '@/assets/assessment-anxiety.jpg';
import depressionImage from '@/assets/assessment-depression.jpg';
import stressImage from '@/assets/assessment-stress.jpg';

export interface MentalHealthAssessment {
  id: string;
  title: string;
  titleSpanish: string;
  description: string;
  descriptionSpanish: string;
  category: string;
  categorySpanish: string;
  duration: string;
  durationSpanish: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  difficultySpanish: 'Principiante' | 'Intermedio' | 'Avanzado';
  targetAudience: string;
  targetAudienceSpanish: string;
  coverImage: string;
  questions: AssessmentQuestion[];
  scoring: ScoringSystem;
  resultInterpretations: ResultInterpretation[];
  recommendations: string[];
  recommendationsSpanish: string[];
  disclaimer: string;
  disclaimerSpanish: string;
  professionalReferral: boolean;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  questionSpanish: string;
  type: 'multiple-choice' | 'scale' | 'yes-no' | 'text';
  options?: string[];
  optionsSpanish?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: string[];
  scaleLabelsSpanish?: string[];
  required: boolean;
  section?: string;
  sectionSpanish?: string;
}

export interface ScoringSystem {
  type: 'sum' | 'average' | 'complex';
  ranges: ScoreRange[];
}

export interface ScoreRange {
  min: number;
  max: number;
  level: string;
  levelSpanish: string;
  description: string;
  descriptionSpanish: string;
}

export interface ResultInterpretation {
  scoreRange: { min: number; max: number };
  title: string;
  titleSpanish: string;
  description: string;
  descriptionSpanish: string;
  severity: 'low' | 'moderate' | 'high' | 'severe';
}

export const mentalHealthAssessments: MentalHealthAssessment[] = [
  // GAD-7 - Complete 7 Questions
  {
    id: 'gad-7',
    title: 'Generalized Anxiety Disorder 7-item (GAD-7)',
    titleSpanish: 'Trastorno de Ansiedad Generalizada 7 ítems (GAD-7)',
    description: 'A validated screening tool for generalized anxiety disorder used widely by healthcare professionals. This clinically proven assessment helps identify anxiety symptoms.',
    descriptionSpanish: 'Una herramienta de detección validada para el trastorno de ansiedad generalizada ampliamente utilizada por profesionales de la salud. Esta evaluación clínicamente probada ayuda a identificar síntomas de ansiedad.',
    category: 'Anxiety Assessment',
    categorySpanish: 'Evaluación de Ansiedad',
    duration: '5-7 minutes',
    durationSpanish: '5-7 minutos',
    difficulty: 'Beginner',
    difficultySpanish: 'Principiante',
    targetAudience: 'Adults experiencing anxiety symptoms',
    targetAudienceSpanish: 'Adultos que experimentan síntomas de ansiedad',
    coverImage: anxietyImage,
    questions: [
      {
        id: 'gad1',
        question: 'Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por sentirte nervioso, ansioso o al límite?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'gad2',
        question: 'Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por no poder detener o controlar la preocupación?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'gad3',
        question: 'Over the last 2 weeks, how often have you been bothered by worrying too much about different things?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por preocuparte demasiado por diferentes cosas?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'gad4',
        question: 'Over the last 2 weeks, how often have you been bothered by trouble relaxing?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por tener problemas para relajarte?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'gad5',
        question: 'Over the last 2 weeks, how often have you been bothered by being so restless that it\'s hard to sit still?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por estar tan inquieto que es difícil quedarse quieto?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'gad6',
        question: 'Over the last 2 weeks, how often have you been bothered by becoming easily annoyed or irritable?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por molestarte o irritarte fácilmente?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'gad7',
        question: 'Over the last 2 weeks, how often have you been bothered by feeling afraid as if something awful might happen?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por tener miedo como si algo terrible pudiera pasar?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      }
    ],
    scoring: {
      type: 'sum',
      ranges: [
        { min: 0, max: 4, level: 'Minimal Anxiety', levelSpanish: 'Ansiedad Mínima', description: 'Little to no anxiety symptoms', descriptionSpanish: 'Pocos o ningún síntoma de ansiedad' },
        { min: 5, max: 9, level: 'Mild Anxiety', levelSpanish: 'Ansiedad Leve', description: 'Mild anxiety symptoms', descriptionSpanish: 'Síntomas leves de ansiedad' },
        { min: 10, max: 14, level: 'Moderate Anxiety', levelSpanish: 'Ansiedad Moderada', description: 'Moderate anxiety symptoms', descriptionSpanish: 'Síntomas moderados de ansiedad' },
        { min: 15, max: 21, level: 'Severe Anxiety', levelSpanish: 'Ansiedad Severa', description: 'Severe anxiety symptoms', descriptionSpanish: 'Síntomas severos de ansiedad' }
      ]
    },
    resultInterpretations: [
      {
        scoreRange: { min: 0, max: 4 },
        title: 'Minimal Anxiety',
        titleSpanish: 'Ansiedad Mínima',
        description: 'Your responses suggest minimal anxiety symptoms. Continue maintaining good mental health practices.',
        descriptionSpanish: 'Tus respuestas sugieren síntomas mínimos de ansiedad. Continúa manteniendo buenas prácticas de salud mental.',
        severity: 'low'
      },
      {
        scoreRange: { min: 5, max: 9 },
        title: 'Mild Anxiety',
        titleSpanish: 'Ansiedad Leve',
        description: 'Your responses suggest mild anxiety. Consider stress management techniques and self-care practices.',
        descriptionSpanish: 'Tus respuestas sugieren ansiedad leve. Considera técnicas de manejo del estrés y prácticas de autocuidado.',
        severity: 'low'
      },
      {
        scoreRange: { min: 10, max: 14 },
        title: 'Moderate Anxiety',
        titleSpanish: 'Ansiedad Moderada',
        description: 'Your responses suggest moderate anxiety. Consider speaking with a mental health professional for support.',
        descriptionSpanish: 'Tus respuestas sugieren ansiedad moderada. Considera hablar con un profesional de salud mental para obtener apoyo.',
        severity: 'moderate'
      },
      {
        scoreRange: { min: 15, max: 21 },
        title: 'Severe Anxiety',
        titleSpanish: 'Ansiedad Severa',
        description: 'Your responses suggest severe anxiety. We strongly recommend consulting with a mental health professional.',
        descriptionSpanish: 'Tus respuestas sugieren ansiedad severa. Recomendamos encarecidamente consultar con un profesional de salud mental.',
        severity: 'severe'
      }
    ],
    recommendations: [
      'Practice deep breathing exercises daily',
      'Engage in regular physical activity',
      'Maintain a consistent sleep schedule',
      'Consider mindfulness or meditation practices',
      'Limit caffeine and alcohol intake',
      'Connect with supportive friends and family',
      'If symptoms persist, consult a mental health professional'
    ],
    recommendationsSpanish: [
      'Practica ejercicios de respiración profunda diariamente',
      'Participa en actividad física regular',
      'Mantén un horario de sueño consistente',
      'Considera prácticas de atención plena o meditación',
      'Limita el consumo de cafeína y alcohol',
      'Conéctate con amigos y familia que te apoyen',
      'Si los síntomas persisten, consulta a un profesional de salud mental'
    ],
    disclaimer: 'This screening tool is for educational purposes only and does not provide a clinical diagnosis. If you are experiencing severe anxiety, please consult a healthcare professional. In case of emergency, call 988 (Suicide & Crisis Lifeline).',
    disclaimerSpanish: 'Esta herramienta de detección es solo para fines educativos y no proporciona un diagnóstico clínico. Si experimentas ansiedad severa, consulta a un profesional de la salud. En caso de emergencia, llama al 988 (Línea de Vida para Suicidio y Crisis).',
    professionalReferral: true
  },

  // PHQ-9 - Complete 9 Questions
  {
    id: 'phq-9',
    title: 'Patient Health Questionnaire-9 (PHQ-9)',
    titleSpanish: 'Cuestionario de Salud del Paciente-9 (PHQ-9)',
    description: 'The gold standard screening tool for depression severity used by healthcare professionals worldwide. This clinically validated assessment measures depressive symptoms.',
    descriptionSpanish: 'La herramienta de detección estándar para la gravedad de la depresión utilizada por profesionales de la salud en todo el mundo. Esta evaluación clínicamente validada mide síntomas depresivos.',
    category: 'Depression Assessment',
    categorySpanish: 'Evaluación de Depresión',
    duration: '7-10 minutes',
    durationSpanish: '7-10 minutos',
    difficulty: 'Beginner',
    difficultySpanish: 'Principiante',
    targetAudience: 'Adults experiencing depressive symptoms',
    targetAudienceSpanish: 'Adultos que experimentan síntomas depresivos',
    coverImage: depressionImage,
    questions: [
      {
        id: 'phq1',
        question: 'Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por tener poco interés o placer en hacer cosas?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'phq2',
        question: 'Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por sentirte decaído, deprimido o sin esperanza?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'phq3',
        question: 'Over the last 2 weeks, how often have you been bothered by trouble falling or staying asleep, or sleeping too much?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por problemas para conciliar el sueño, permanecer dormido o dormir demasiado?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'phq4',
        question: 'Over the last 2 weeks, how often have you been bothered by feeling tired or having little energy?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por sentirte cansado o tener poca energía?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'phq5',
        question: 'Over the last 2 weeks, how often have you been bothered by poor appetite or overeating?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por falta de apetito o comer en exceso?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'phq6',
        question: 'Over the last 2 weeks, how often have you been bothered by feeling bad about yourself - or that you are a failure or have let yourself or your family down?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por sentirte mal contigo mismo, o que eres un fracaso o has decepcionado a ti mismo o a tu familia?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'phq7',
        question: 'Over the last 2 weeks, how often have you been bothered by trouble concentrating on things, such as reading the newspaper or watching television?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por problemas para concentrarte en cosas, como leer el periódico o ver televisión?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'phq8',
        question: 'Over the last 2 weeks, how often have you been bothered by moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por moverte o hablar tan lentamente que otras personas podrían haberlo notado? ¿O lo contrario: estar tan inquieto o agitado que te has estado moviendo mucho más de lo habitual?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      },
      {
        id: 'phq9',
        question: 'Over the last 2 weeks, how often have you been bothered by thoughts that you would be better off dead, or of hurting yourself in some way?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por pensamientos de que estarías mejor muerto, o de hacerte daño de alguna manera?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      }
    ],
    scoring: {
      type: 'sum',
      ranges: [
        { min: 0, max: 4, level: 'Minimal Depression', levelSpanish: 'Depresión Mínima', description: 'Little to no depression', descriptionSpanish: 'Poca o ninguna depresión' },
        { min: 5, max: 9, level: 'Mild Depression', levelSpanish: 'Depresión Leve', description: 'Mild depression symptoms', descriptionSpanish: 'Síntomas leves de depresión' },
        { min: 10, max: 14, level: 'Moderate Depression', levelSpanish: 'Depresión Moderada', description: 'Moderate depression symptoms', descriptionSpanish: 'Síntomas moderados de depresión' },
        { min: 15, max: 19, level: 'Moderately Severe Depression', levelSpanish: 'Depresión Moderadamente Severa', description: 'Moderately severe depression', descriptionSpanish: 'Depresión moderadamente severa' },
        { min: 20, max: 27, level: 'Severe Depression', levelSpanish: 'Depresión Severa', description: 'Severe depression symptoms', descriptionSpanish: 'Síntomas severos de depresión' }
      ]
    },
    resultInterpretations: [
      {
        scoreRange: { min: 0, max: 4 },
        title: 'Minimal Depression',
        titleSpanish: 'Depresión Mínima',
        description: 'Your responses suggest minimal or no depression. Continue with healthy lifestyle practices.',
        descriptionSpanish: 'Tus respuestas sugieren depresión mínima o nula. Continúa con prácticas de estilo de vida saludable.',
        severity: 'low'
      },
      {
        scoreRange: { min: 5, max: 9 },
        title: 'Mild Depression',
        titleSpanish: 'Depresión Leve',
        description: 'Your responses suggest mild depression. Consider self-care strategies and monitoring your mood.',
        descriptionSpanish: 'Tus respuestas sugieren depresión leve. Considera estrategias de autocuidado y monitoreo de tu estado de ánimo.',
        severity: 'low'
      },
      {
        scoreRange: { min: 10, max: 14 },
        title: 'Moderate Depression',
        titleSpanish: 'Depresión Moderada',
        description: 'Your responses suggest moderate depression. We recommend consulting with a mental health professional.',
        descriptionSpanish: 'Tus respuestas sugieren depresión moderada. Recomendamos consultar con un profesional de salud mental.',
        severity: 'moderate'
      },
      {
        scoreRange: { min: 15, max: 19 },
        title: 'Moderately Severe Depression',
        titleSpanish: 'Depresión Moderadamente Severa',
        description: 'Your responses suggest moderately severe depression. Professional treatment is strongly recommended.',
        descriptionSpanish: 'Tus respuestas sugieren depresión moderadamente severa. Se recomienda encarecidamente tratamiento profesional.',
        severity: 'high'
      },
      {
        scoreRange: { min: 20, max: 27 },
        title: 'Severe Depression',
        titleSpanish: 'Depresión Severa',
        description: 'Your responses suggest severe depression. Immediate professional help is strongly recommended.',
        descriptionSpanish: 'Tus respuestas sugieren depresión severa. Se recomienda encarecidamente ayuda profesional inmediata.',
        severity: 'severe'
      }
    ],
    recommendations: [
      'Seek professional mental health support',
      'Engage in regular physical activity',
      'Maintain social connections',
      'Establish a consistent sleep routine',
      'Practice self-compassion',
      'Consider therapy or counseling',
      'If you answered "Nearly every day" to question 9, please seek immediate help - Call 988 (Suicide & Crisis Lifeline)'
    ],
    recommendationsSpanish: [
      'Busca apoyo profesional de salud mental',
      'Participa en actividad física regular',
      'Mantén conexiones sociales',
      'Establece una rutina de sueño consistente',
      'Practica la autocompasión',
      'Considera terapia o consejería',
      'Si respondiste "Casi todos los días" a la pregunta 9, busca ayuda inmediata - Llama al 988 (Línea de Vida para Suicidio y Crisis)'
    ],
    disclaimer: 'This screening tool is for educational purposes only and does not provide a clinical diagnosis. If you are experiencing severe depression or suicidal thoughts, please seek immediate help. Call 988 (Suicide & Crisis Lifeline) or visit your nearest emergency room.',
    disclaimerSpanish: 'Esta herramienta de detección es solo para fines educativos y no proporciona un diagnóstico clínico. Si experimentas depresión severa o pensamientos suicidas, busca ayuda inmediata. Llama al 988 (Línea de Vida para Suicidio y Crisis) o visita la sala de emergencias más cercana.',
    professionalReferral: true
  },

  // PSS-10 - Complete 10 Questions
  {
    id: 'perceived-stress-scale',
    title: 'Perceived Stress Scale (PSS-10)',
    titleSpanish: 'Escala de Estrés Percibido (PSS-10)',
    description: 'A widely used psychological instrument for measuring the degree to which situations in your life are appraised as stressful. Questions assess thoughts and feelings during the last month.',
    descriptionSpanish: 'Un instrumento psicológico ampliamente utilizado para medir el grado en que las situaciones de tu vida se evalúan como estresantes. Las preguntas evalúan pensamientos y sentimientos durante el último mes.',
    category: 'Stress Assessment',
    categorySpanish: 'Evaluación de Estrés',
    duration: '6-8 minutes',
    durationSpanish: '6-8 minutos',
    difficulty: 'Beginner',
    difficultySpanish: 'Principiante',
    targetAudience: 'Adults experiencing stress',
    targetAudienceSpanish: 'Adultos que experimentan estrés',
    coverImage: stressImage,
    questions: [
      {
        id: 'pss1',
        question: 'In the last month, how often have you been upset because of something that happened unexpectedly?',
        questionSpanish: 'En el último mes, ¿con qué frecuencia te has sentido molesto por algo que sucedió inesperadamente?',
        type: 'multiple-choice',
        options: ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often'],
        optionsSpanish: ['Nunca', 'Casi nunca', 'A veces', 'Bastante a menudo', 'Muy a menudo'],
        required: true
      },
      {
        id: 'pss2',
        question: 'In the last month, how often have you felt that you were unable to control the important things in your life?',
        questionSpanish: 'En el último mes, ¿con qué frecuencia has sentido que no podías controlar las cosas importantes en tu vida?',
        type: 'multiple-choice',
        options: ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often'],
        optionsSpanish: ['Nunca', 'Casi nunca', 'A veces', 'Bastante a menudo', 'Muy a menudo'],
        required: true
      },
      {
        id: 'pss3',
        question: 'In the last month, how often have you felt nervous and stressed?',
        questionSpanish: 'En el último mes, ¿con qué frecuencia te has sentido nervioso y estresado?',
        type: 'multiple-choice',
        options: ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often'],
        optionsSpanish: ['Nunca', 'Casi nunca', 'A veces', 'Bastante a menudo', 'Muy a menudo'],
        required: true
      },
      {
        id: 'pss4',
        question: 'In the last month, how often have you felt confident about your ability to handle your personal problems?',
        questionSpanish: 'En el último mes, ¿con qué frecuencia te has sentido seguro de tu capacidad para manejar tus problemas personales?',
        type: 'multiple-choice',
        options: ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often'],
        optionsSpanish: ['Nunca', 'Casi nunca', 'A veces', 'Bastante a menudo', 'Muy a menudo'],
        required: true
      },
      {
        id: 'pss5',
        question: 'In the last month, how often have you felt that things were going your way?',
        questionSpanish: 'En el último mes, ¿con qué frecuencia has sentido que las cosas iban a tu manera?',
        type: 'multiple-choice',
        options: ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often'],
        optionsSpanish: ['Nunca', 'Casi nunca', 'A veces', 'Bastante a menudo', 'Muy a menudo'],
        required: true
      },
      {
        id: 'pss6',
        question: 'In the last month, how often have you found that you could not cope with all the things that you had to do?',
        questionSpanish: 'En el último mes, ¿con qué frecuencia has encontrado que no podías hacer frente a todas las cosas que tenías que hacer?',
        type: 'multiple-choice',
        options: ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often'],
        optionsSpanish: ['Nunca', 'Casi nunca', 'A veces', 'Bastante a menudo', 'Muy a menudo'],
        required: true
      },
      {
        id: 'pss7',
        question: 'In the last month, how often have you been able to control irritations in your life?',
        questionSpanish: 'En el último mes, ¿con qué frecuencia has podido controlar las irritaciones en tu vida?',
        type: 'multiple-choice',
        options: ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often'],
        optionsSpanish: ['Nunca', 'Casi nunca', 'A veces', 'Bastante a menudo', 'Muy a menudo'],
        required: true
      },
      {
        id: 'pss8',
        question: 'In the last month, how often have you felt that you were on top of things?',
        questionSpanish: 'En el último mes, ¿con qué frecuencia has sentido que estabas al tanto de las cosas?',
        type: 'multiple-choice',
        options: ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often'],
        optionsSpanish: ['Nunca', 'Casi nunca', 'A veces', 'Bastante a menudo', 'Muy a menudo'],
        required: true
      },
      {
        id: 'pss9',
        question: 'In the last month, how often have you been angered because of things that happened that were outside of your control?',
        questionSpanish: 'En el último mes, ¿con qué frecuencia te has enojado por cosas que sucedieron fuera de tu control?',
        type: 'multiple-choice',
        options: ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often'],
        optionsSpanish: ['Nunca', 'Casi nunca', 'A veces', 'Bastante a menudo', 'Muy a menudo'],
        required: true
      },
      {
        id: 'pss10',
        question: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',
        questionSpanish: 'En el último mes, ¿con qué frecuencia has sentido que las dificultades se acumulaban tan alto que no podías superarlas?',
        type: 'multiple-choice',
        options: ['Never', 'Almost never', 'Sometimes', 'Fairly often', 'Very often'],
        optionsSpanish: ['Nunca', 'Casi nunca', 'A veces', 'Bastante a menudo', 'Muy a menudo'],
        required: true
      }
    ],
    scoring: {
      type: 'sum',
      ranges: [
        { min: 0, max: 13, level: 'Low Stress', levelSpanish: 'Estrés Bajo', description: 'Low perceived stress', descriptionSpanish: 'Estrés percibido bajo' },
        { min: 14, max: 26, level: 'Moderate Stress', levelSpanish: 'Estrés Moderado', description: 'Moderate perceived stress', descriptionSpanish: 'Estrés percibido moderado' },
        { min: 27, max: 40, level: 'High Stress', levelSpanish: 'Estrés Alto', description: 'High perceived stress', descriptionSpanish: 'Estrés percibido alto' }
      ]
    },
    resultInterpretations: [
      {
        scoreRange: { min: 0, max: 13 },
        title: 'Low Perceived Stress',
        titleSpanish: 'Estrés Percibido Bajo',
        description: 'Your responses suggest low levels of perceived stress. You appear to be coping well with life\'s demands.',
        descriptionSpanish: 'Tus respuestas sugieren niveles bajos de estrés percibido. Pareces estar manejando bien las demandas de la vida.',
        severity: 'low'
      },
      {
        scoreRange: { min: 14, max: 26 },
        title: 'Moderate Perceived Stress',
        titleSpanish: 'Estrés Percibido Moderado',
        description: 'Your responses suggest moderate levels of perceived stress. Consider implementing stress reduction techniques.',
        descriptionSpanish: 'Tus respuestas sugieren niveles moderados de estrés percibido. Considera implementar técnicas de reducción del estrés.',
        severity: 'moderate'
      },
      {
        scoreRange: { min: 27, max: 40 },
        title: 'High Perceived Stress',
        titleSpanish: 'Estrés Percibido Alto',
        description: 'Your responses suggest high levels of perceived stress. Consider seeking support from a mental health professional.',
        descriptionSpanish: 'Tus respuestas sugieren niveles altos de estrés percibido. Considera buscar apoyo de un profesional de salud mental.',
        severity: 'high'
      }
    ],
    recommendations: [
      'Practice stress-reduction techniques like deep breathing',
      'Improve time management skills',
      'Set realistic goals and priorities',
      'Engage in regular physical exercise',
      'Get adequate sleep (7-9 hours per night)',
      'Connect with supportive friends and family',
      'Consider mindfulness or meditation',
      'Take breaks throughout the day'
    ],
    recommendationsSpanish: [
      'Practica técnicas de reducción del estrés como respiración profunda',
      'Mejora habilidades de gestión del tiempo',
      'Establece metas y prioridades realistas',
      'Participa en ejercicio físico regular',
      'Duerme lo suficiente (7-9 horas por noche)',
      'Conéctate con amigos y familia que te apoyen',
      'Considera mindfulness o meditación',
      'Toma descansos durante el día'
    ],
    disclaimer: 'This assessment measures perceived stress, not clinical stress disorder. It is for educational purposes only. If you are experiencing overwhelming stress, please consult a healthcare professional.',
    disclaimerSpanish: 'Esta evaluación mide el estrés percibido, no el trastorno de estrés clínico. Es solo para fines educativos. Si experimentas estrés abrumador, consulta a un profesional de la salud.',
    professionalReferral: false
  },

  // Add comprehensive trauma assessment
  comprehensiveTraumaAssessment,
];

export interface AssessmentCategory {
  id: string;
  name: string;
  nameSpanish: string;
}

export const assessmentCategories: AssessmentCategory[] = [
  { id: 'all', name: 'All Assessments', nameSpanish: 'Todas las Evaluaciones' },
  { id: 'anxiety', name: 'Anxiety Assessment', nameSpanish: 'Evaluación de Ansiedad' },
  { id: 'depression', name: 'Depression Assessment', nameSpanish: 'Evaluación de Depresión' },
  { id: 'stress', name: 'Stress Assessment', nameSpanish: 'Evaluación de Estrés' },
  { id: 'ptsd', name: 'PTSD Assessment', nameSpanish: 'Evaluación de TEPT' },
  { id: 'trauma', name: 'Trauma Assessment', nameSpanish: 'Evaluación de Trauma' },
  { id: 'bipolar', name: 'Bipolar Assessment', nameSpanish: 'Evaluación Bipolar' },
  { id: 'ocd', name: 'OCD Assessment', nameSpanish: 'Evaluación TOC' },
  { id: 'adhd', name: 'ADHD Assessment', nameSpanish: 'Evaluación TDAH' },
  { id: 'personality', name: 'Personality Assessment', nameSpanish: 'Evaluación de Personalidad' },
  { id: 'relationship', name: 'Relationship Assessment', nameSpanish: 'Evaluación de Relaciones' },
  { id: 'emotional', name: 'Emotional Assessment', nameSpanish: 'Evaluación Emocional' }
];
