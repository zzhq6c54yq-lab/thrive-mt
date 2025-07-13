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
  // ANXIETY ASSESSMENTS
  {
    id: 'gad-7',
    title: 'Generalized Anxiety Disorder 7-item (GAD-7)',
    titleSpanish: 'Trastorno de Ansiedad Generalizada 7 ítems (GAD-7)',
    description: 'A validated screening tool for generalized anxiety disorder used widely by healthcare professionals.',
    descriptionSpanish: 'Una herramienta de detección validada para el trastorno de ansiedad generalizada ampliamente utilizada por profesionales de la salud.',
    category: 'Anxiety Assessment',
    categorySpanish: 'Evaluación de Ansiedad',
    duration: '3-5 minutes',
    durationSpanish: '3-5 minutos',
    difficulty: 'Beginner',
    difficultySpanish: 'Principiante',
    targetAudience: 'Adults experiencing anxiety symptoms',
    targetAudienceSpanish: 'Adultos que experimentan síntomas de ansiedad',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    questions: [
      {
        id: 'gad1',
        question: 'Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?',
        questionSpanish: 'En las últimas 2 semanas, ¿con qué frecuencia te has sentido molesto por sentirte nervioso, ansioso o al límite?',
        type: 'multiple-choice',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        optionsSpanish: ['Para nada', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'],
        required: true
      }
    ],
    scoring: {
      type: 'sum',
      ranges: [
        { min: 0, max: 4, level: 'Minimal', levelSpanish: 'Mínima', description: 'Minimal anxiety', descriptionSpanish: 'Ansiedad mínima' },
        { min: 5, max: 9, level: 'Mild', levelSpanish: 'Leve', description: 'Mild anxiety', descriptionSpanish: 'Ansiedad leve' },
        { min: 10, max: 14, level: 'Moderate', levelSpanish: 'Moderada', description: 'Moderate anxiety', descriptionSpanish: 'Ansiedad moderada' },
        { min: 15, max: 21, level: 'Severe', levelSpanish: 'Severa', description: 'Severe anxiety', descriptionSpanish: 'Ansiedad severa' }
      ]
    },
    resultInterpretations: [
      {
        scoreRange: { min: 0, max: 4 },
        title: 'Minimal Anxiety',
        titleSpanish: 'Ansiedad Mínima',
        description: 'Your responses suggest minimal anxiety symptoms.',
        descriptionSpanish: 'Tus respuestas sugieren síntomas mínimos de ansiedad.',
        severity: 'low'
      }
    ],
    recommendations: [
      'Practice regular stress management techniques',
      'Maintain a healthy lifestyle with exercise and good sleep',
      'Consider mindfulness or meditation practices'
    ],
    recommendationsSpanish: [
      'Practica técnicas regulares de manejo del estrés',
      'Mantén un estilo de vida saludable con ejercicio y buen sueño',
      'Considera prácticas de atención plena o meditación'
    ],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: true
  },

  // DEPRESSION ASSESSMENTS
  {
    id: 'phq-9',
    title: 'Patient Health Questionnaire-9 (PHQ-9)',
    titleSpanish: 'Cuestionario de Salud del Paciente-9 (PHQ-9)',
    description: 'The gold standard screening tool for depression severity used by healthcare professionals worldwide.',
    descriptionSpanish: 'La herramienta de detección estándar para la gravedad de la depresión utilizada por profesionales de la salud en todo el mundo.',
    category: 'Depression Assessment',
    categorySpanish: 'Evaluación de Depresión',
    duration: '5-8 minutes',
    durationSpanish: '5-8 minutos',
    difficulty: 'Beginner',
    difficultySpanish: 'Principiante',
    targetAudience: 'Adults experiencing depressive symptoms',
    targetAudienceSpanish: 'Adultos que experimentan síntomas depresivos',
    coverImage: 'https://images.unsplash.com/photo-1616006400265-7c4b8c26439d?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'sum', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Engage in regular physical activity', 'Maintain social connections', 'Consider professional counseling'],
    recommendationsSpanish: ['Participa en actividad física regular', 'Mantén conexiones sociales', 'Considera consejería profesional'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: true
  },

  // STRESS ASSESSMENTS
  {
    id: 'perceived-stress-scale',
    title: 'Perceived Stress Scale (PSS-10)',
    titleSpanish: 'Escala de Estrés Percibido (PSS-10)',
    description: 'Measures the degree to which situations in life are appraised as stressful.',
    descriptionSpanish: 'Mide el grado en que las situaciones de la vida se evalúan como estresantes.',
    category: 'Stress Assessment',
    categorySpanish: 'Evaluación de Estrés',
    duration: '4-6 minutes',
    durationSpanish: '4-6 minutos',
    difficulty: 'Beginner',
    difficultySpanish: 'Principiante',
    targetAudience: 'Adults experiencing stress',
    targetAudienceSpanish: 'Adultos que experimentan estrés',
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'sum', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Practice stress reduction techniques', 'Improve time management', 'Seek support from friends and family'],
    recommendationsSpanish: ['Practica técnicas de reducción del estrés', 'Mejora la gestión del tiempo', 'Busca apoyo de amigos y familia'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: false
  },

  // PTSD ASSESSMENTS
  {
    id: 'pcl-5',
    title: 'PTSD Checklist for DSM-5 (PCL-5)',
    titleSpanish: 'Lista de Verificación de TEPT para DSM-5 (PCL-5)',
    description: 'A widely used screening tool for post-traumatic stress disorder symptoms.',
    descriptionSpanish: 'Una herramienta de detección ampliamente utilizada para síntomas de trastorno de estrés postraumático.',
    category: 'PTSD Assessment',
    categorySpanish: 'Evaluación de TEPT',
    duration: '8-12 minutes',
    durationSpanish: '8-12 minutos',
    difficulty: 'Intermediate',
    difficultySpanish: 'Intermedio',
    targetAudience: 'Adults who have experienced trauma',
    targetAudienceSpanish: 'Adultos que han experimentado trauma',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'sum', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Consider trauma-informed therapy', 'Practice grounding techniques', 'Build a support network'],
    recommendationsSpanish: ['Considera terapia informada sobre trauma', 'Practica técnicas de conexión a tierra', 'Construye una red de apoyo'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: true
  },

  // BIPOLAR ASSESSMENTS
  {
    id: 'mdq',
    title: 'Mood Disorder Questionnaire (MDQ)',
    titleSpanish: 'Cuestionario de Trastorno del Estado de Ánimo (MDQ)',
    description: 'Screening tool for bipolar spectrum disorders and mood episodes.',
    descriptionSpanish: 'Herramienta de detección para trastornos del espectro bipolar y episodios del estado de ánimo.',
    category: 'Bipolar Assessment',
    categorySpanish: 'Evaluación Bipolar',
    duration: '6-10 minutes',
    durationSpanish: '6-10 minutos',
    difficulty: 'Intermediate',
    difficultySpanish: 'Intermedio',
    targetAudience: 'Adults with mood fluctuations',
    targetAudienceSpanish: 'Adultos con fluctuaciones del estado de ánimo',
    coverImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'complex', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Monitor mood patterns', 'Maintain regular sleep schedule', 'Consider professional evaluation'],
    recommendationsSpanish: ['Monitorea patrones del estado de ánimo', 'Mantén un horario de sueño regular', 'Considera evaluación profesional'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: true
  },

  // OCD ASSESSMENTS
  {
    id: 'oci-r',
    title: 'Obsessive-Compulsive Inventory-Revised (OCI-R)',
    titleSpanish: 'Inventario Obsesivo-Compulsivo-Revisado (OCI-R)',
    description: 'Assessment for obsessive-compulsive disorder symptoms and severity.',
    descriptionSpanish: 'Evaluación para síntomas y gravedad del trastorno obsesivo-compulsivo.',
    category: 'OCD Assessment',
    categorySpanish: 'Evaluación TOC',
    duration: '7-10 minutes',
    durationSpanish: '7-10 minutos',
    difficulty: 'Intermediate',
    difficultySpanish: 'Intermedio',
    targetAudience: 'Adults with repetitive thoughts or behaviors',
    targetAudienceSpanish: 'Adultos con pensamientos o comportamientos repetitivos',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'sum', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Practice exposure and response prevention', 'Learn mindfulness techniques', 'Consider specialized therapy'],
    recommendationsSpanish: ['Practica exposición y prevención de respuesta', 'Aprende técnicas de mindfulness', 'Considera terapia especializada'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: true
  },

  // ADHD ASSESSMENTS
  {
    id: 'asrs-v1-1',
    title: 'Adult ADHD Self-Report Scale (ASRS-v1.1)',
    titleSpanish: 'Escala de Autoinforme de TDAH en Adultos (ASRS-v1.1)',
    description: 'Screening tool for attention-deficit/hyperactivity disorder in adults.',
    descriptionSpanish: 'Herramienta de detección para trastorno por déficit de atención e hiperactividad en adultos.',
    category: 'ADHD Assessment',
    categorySpanish: 'Evaluación TDAH',
    duration: '5-8 minutes',
    durationSpanish: '5-8 minutos',
    difficulty: 'Beginner',
    difficultySpanish: 'Principiante',
    targetAudience: 'Adults with attention or hyperactivity concerns',
    targetAudienceSpanish: 'Adultos con preocupaciones de atención o hiperactividad',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'complex', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Develop organizational strategies', 'Practice focus techniques', 'Consider professional evaluation'],
    recommendationsSpanish: ['Desarrolla estrategias organizacionales', 'Practica técnicas de enfoque', 'Considera evaluación profesional'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: true
  },

  // PERSONALITY ASSESSMENTS
  {
    id: 'big-five',
    title: 'Big Five Personality Traits',
    titleSpanish: 'Cinco Grandes Rasgos de Personalidad',
    description: 'Comprehensive personality assessment based on the five-factor model.',
    descriptionSpanish: 'Evaluación integral de personalidad basada en el modelo de cinco factores.',
    category: 'Personality Assessment',
    categorySpanish: 'Evaluación de Personalidad',
    duration: '15-20 minutes',
    durationSpanish: '15-20 minutos',
    difficulty: 'Intermediate',
    difficultySpanish: 'Intermedio',
    targetAudience: 'Adults interested in personality insights',
    targetAudienceSpanish: 'Adultos interesados en conocimientos de personalidad',
    coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'average', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Embrace your personality strengths', 'Work on areas for growth', 'Apply insights to relationships'],
    recommendationsSpanish: ['Abraza las fortalezas de tu personalidad', 'Trabaja en áreas de crecimiento', 'Aplica conocimientos a las relaciones'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: false
  },

  // ATTACHMENT STYLES
  {
    id: 'attachment-style',
    title: 'Adult Attachment Style Assessment',
    titleSpanish: 'Evaluación de Estilo de Apego en Adultos',
    description: 'Identifies your attachment patterns in relationships.',
    descriptionSpanish: 'Identifica tus patrones de apego en las relaciones.',
    category: 'Relationship Assessment',
    categorySpanish: 'Evaluación de Relaciones',
    duration: '10-15 minutes',
    durationSpanish: '10-15 minutos',
    difficulty: 'Intermediate',
    difficultySpanish: 'Intermedio',
    targetAudience: 'Adults in relationships or seeking relationship insights',
    targetAudienceSpanish: 'Adultos en relaciones o que buscan conocimientos sobre relaciones',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'complex', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Understand your attachment needs', 'Communicate openly with partners', 'Work on emotional security'],
    recommendationsSpanish: ['Comprende tus necesidades de apego', 'Comunícate abiertamente con las parejas', 'Trabaja en la seguridad emocional'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: false
  },

  // EMOTIONAL INTELLIGENCE
  {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence Quotient (EQ)',
    titleSpanish: 'Cociente de Inteligencia Emocional (CE)',
    description: 'Measures your ability to understand and manage emotions.',
    descriptionSpanish: 'Mide tu capacidad para entender y manejar las emociones.',
    category: 'Emotional Assessment',
    categorySpanish: 'Evaluación Emocional',
    duration: '12-18 minutes',
    durationSpanish: '12-18 minutos',
    difficulty: 'Intermediate',
    difficultySpanish: 'Intermedio',
    targetAudience: 'Adults wanting to improve emotional skills',
    targetAudienceSpanish: 'Adultos que quieren mejorar habilidades emocionales',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'average', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Practice emotional awareness', 'Develop empathy skills', 'Work on emotion regulation'],
    recommendationsSpanish: ['Practica la conciencia emocional', 'Desarrolla habilidades de empatía', 'Trabaja en la regulación emocional'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: false
  },

  // SLEEP QUALITY
  {
    id: 'psqi',
    title: 'Pittsburgh Sleep Quality Index (PSQI)',
    titleSpanish: 'Índice de Calidad del Sueño de Pittsburgh (PSQI)',
    description: 'Comprehensive assessment of sleep quality and patterns.',
    descriptionSpanish: 'Evaluación integral de la calidad y patrones del sueño.',
    category: 'Sleep Assessment',
    categorySpanish: 'Evaluación del Sueño',
    duration: '8-12 minutes',
    durationSpanish: '8-12 minutos',
    difficulty: 'Beginner',
    difficultySpanish: 'Principiante',
    targetAudience: 'Adults with sleep concerns',
    targetAudienceSpanish: 'Adultos con preocupaciones del sueño',
    coverImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'complex', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Maintain consistent sleep schedule', 'Create relaxing bedtime routine', 'Optimize sleep environment'],
    recommendationsSpanish: ['Mantén un horario de sueño consistente', 'Crea una rutina relajante antes de dormir', 'Optimiza el ambiente del sueño'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: false
  },

  // SELF-ESTEEM
  {
    id: 'rosenberg-self-esteem',
    title: 'Rosenberg Self-Esteem Scale',
    titleSpanish: 'Escala de Autoestima de Rosenberg',
    description: 'Widely used measure of global self-worth and self-acceptance.',
    descriptionSpanish: 'Medida ampliamente utilizada del valor propio global y la autoaceptación.',
    category: 'Self-Esteem Assessment',
    categorySpanish: 'Evaluación de Autoestima',
    duration: '3-5 minutes',
    durationSpanish: '3-5 minutos',
    difficulty: 'Beginner',
    difficultySpanish: 'Principiante',
    targetAudience: 'Adults seeking self-worth insights',
    targetAudienceSpanish: 'Adultos que buscan conocimientos sobre el valor propio',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'sum', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Practice self-compassion', 'Challenge negative self-talk', 'Celebrate personal achievements'],
    recommendationsSpanish: ['Practica la autocompasión', 'Desafía el diálogo interno negativo', 'Celebra los logros personales'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: false
  },

  // RESILIENCE
  {
    id: 'connor-davidson',
    title: 'Connor-Davidson Resilience Scale',
    titleSpanish: 'Escala de Resistencia de Connor-Davidson',
    description: 'Measures psychological resilience and ability to cope with adversity.',
    descriptionSpanish: 'Mide la resistencia psicológica y la capacidad para enfrentar la adversidad.',
    category: 'Resilience Assessment',
    categorySpanish: 'Evaluación de Resistencia',
    duration: '8-12 minutes',
    durationSpanish: '8-12 minutos',
    difficulty: 'Intermediate',
    difficultySpanish: 'Intermedio',
    targetAudience: 'Adults facing challenges or stress',
    targetAudienceSpanish: 'Adultos que enfrentan desafíos o estrés',
    coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'sum', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Build support networks', 'Develop coping strategies', 'Practice stress management'],
    recommendationsSpanish: ['Construye redes de apoyo', 'Desarrolla estrategias de afrontamiento', 'Practica el manejo del estrés'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: false
  },

  // BURNOUT
  {
    id: 'maslach-burnout',
    title: 'Maslach Burnout Inventory',
    titleSpanish: 'Inventario de Agotamiento de Maslach',
    description: 'Assessment for work-related burnout and occupational stress.',
    descriptionSpanish: 'Evaluación para el agotamiento relacionado con el trabajo y el estrés ocupacional.',
    category: 'Workplace Assessment',
    categorySpanish: 'Evaluación Laboral',
    duration: '10-15 minutes',
    durationSpanish: '10-15 minutos',
    difficulty: 'Intermediate',
    difficultySpanish: 'Intermedio',
    targetAudience: 'Working adults experiencing job stress',
    targetAudienceSpanish: 'Adultos trabajadores que experimentan estrés laboral',
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'complex', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Set work-life boundaries', 'Practice stress reduction', 'Seek workplace support'],
    recommendationsSpanish: ['Establece límites entre trabajo y vida', 'Practica la reducción del estrés', 'Busca apoyo en el lugar de trabajo'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: false
  },

  // SOCIAL ANXIETY
  {
    id: 'liebowitz-social-anxiety',
    title: 'Liebowitz Social Anxiety Scale',
    titleSpanish: 'Escala de Ansiedad Social de Liebowitz',
    description: 'Comprehensive assessment of social anxiety in various situations.',
    descriptionSpanish: 'Evaluación integral de la ansiedad social en diversas situaciones.',
    category: 'Social Anxiety Assessment',
    categorySpanish: 'Evaluación de Ansiedad Social',
    duration: '12-18 minutes',
    durationSpanish: '12-18 minutos',
    difficulty: 'Intermediate',
    difficultySpanish: 'Intermedio',
    targetAudience: 'Adults with social fears or shyness',
    targetAudienceSpanish: 'Adultos con miedos sociales o timidez',
    coverImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'sum', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Practice gradual exposure', 'Learn social skills', 'Consider group therapy'],
    recommendationsSpanish: ['Practica exposición gradual', 'Aprende habilidades sociales', 'Considera terapia grupal'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: true
  },

  // EATING DISORDERS
  {
    id: 'eat-26',
    title: 'Eating Attitudes Test (EAT-26)',
    titleSpanish: 'Prueba de Actitudes Alimentarias (EAT-26)',
    description: 'Screening tool for eating disorder symptoms and attitudes.',
    descriptionSpanish: 'Herramienta de detección para síntomas y actitudes de trastornos alimentarios.',
    category: 'Eating Disorder Assessment',
    categorySpanish: 'Evaluación de Trastornos Alimentarios',
    duration: '8-12 minutes',
    durationSpanish: '8-12 minutos',
    difficulty: 'Intermediate',
    difficultySpanish: 'Intermedio',
    targetAudience: 'Adults with eating or body image concerns',
    targetAudienceSpanish: 'Adultos con preocupaciones alimentarias o de imagen corporal',
    coverImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'sum', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Practice body acceptance', 'Develop healthy eating habits', 'Seek specialized support'],
    recommendationsSpanish: ['Practica la aceptación corporal', 'Desarrolla hábitos alimentarios saludables', 'Busca apoyo especializado'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: true
  },

  // SUBSTANCE USE
  {
    id: 'audit',
    title: 'Alcohol Use Disorders Identification Test (AUDIT)',
    titleSpanish: 'Prueba de Identificación de Trastornos por Uso de Alcohol (AUDIT)',
    description: 'WHO-developed screening tool for alcohol use disorders.',
    descriptionSpanish: 'Herramienta de detección desarrollada por la OMS para trastornos por uso de alcohol.',
    category: 'Substance Use Assessment',
    categorySpanish: 'Evaluación de Uso de Sustancias',
    duration: '5-8 minutes',
    durationSpanish: '5-8 minutos',
    difficulty: 'Beginner',
    difficultySpanish: 'Principiante',
    targetAudience: 'Adults concerned about alcohol use',
    targetAudienceSpanish: 'Adultos preocupados por el uso de alcohol',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    questions: [],
    scoring: { type: 'sum', ranges: [] },
    resultInterpretations: [],
    recommendations: ['Monitor alcohol consumption', 'Develop healthy coping strategies', 'Consider professional support'],
    recommendationsSpanish: ['Monitorea el consumo de alcohol', 'Desarrolla estrategias de afrontamiento saludables', 'Considera apoyo profesional'],
    disclaimer: 'This assessment is for educational purposes only and does not replace professional medical advice.',
    disclaimerSpanish: 'Esta evaluación es solo para fines educativos y no reemplaza el consejo médico profesional.',
    professionalReferral: true
  }
];

// Assessment categories for filtering
export const assessmentCategories = [
  { id: 'all', name: 'All Assessments', nameSpanish: 'Todas las Evaluaciones' },
  { id: 'anxiety', name: 'Anxiety', nameSpanish: 'Ansiedad' },
  { id: 'depression', name: 'Depression', nameSpanish: 'Depresión' },
  { id: 'stress', name: 'Stress', nameSpanish: 'Estrés' },
  { id: 'ptsd', name: 'PTSD & Trauma', nameSpanish: 'TEPT y Trauma' },
  { id: 'personality', name: 'Personality', nameSpanish: 'Personalidad' },
  { id: 'relationships', name: 'Relationships', nameSpanish: 'Relaciones' },
  { id: 'workplace', name: 'Workplace', nameSpanish: 'Lugar de Trabajo' },
  { id: 'wellness', name: 'Wellness', nameSpanish: 'Bienestar' },
  { id: 'specialized', name: 'Specialized', nameSpanish: 'Especializadas' }
];