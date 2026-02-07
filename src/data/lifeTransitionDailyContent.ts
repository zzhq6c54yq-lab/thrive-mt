// Daily content for Life Transition programs
// Each week has 7 days, each day has an exercise, encouragement, and task

export interface DayContent {
  day: number;
  title: string;
  exercise: {
    name: string;
    duration: string;
    description: string;
    steps: string[];
  };
  encouragement: string;
  task: {
    name: string;
    description: string;
  };
  reflection?: {
    name: string;
    duration: string;
    prompts: string[];
  };
  deepDive?: {
    name: string;
    duration: string;
    description: string;
    steps: string[];
  };
}

export interface WeekContent {
  week: number;
  title: string;
  description: string;
  days: DayContent[];
}

export interface ProgramContent {
  slug: string;
  weeks: WeekContent[];
}

const createDay = (
  day: number,
  title: string,
  exerciseName: string,
  exerciseDuration: string,
  exerciseDesc: string,
  exerciseSteps: string[],
  encouragement: string,
  taskName: string,
  taskDesc: string
): DayContent => ({
  day,
  title,
  exercise: { name: exerciseName, duration: exerciseDuration, description: exerciseDesc, steps: exerciseSteps },
  encouragement,
  task: { name: taskName, description: taskDesc },
});

const rawProgramContent: Record<string, ProgramContent> = {
  'grief-healing': {
    slug: 'grief-healing',
    weeks: [
      {
        week: 1, title: 'Understanding Grief', description: 'Learning about the grief process and giving yourself permission to feel.',
        days: [
          createDay(1, 'What Grief Looks Like', '5-Minute Body Scan', '5 min', 'Notice where grief lives in your body without trying to change it.', ['Find a quiet space', 'Close your eyes and breathe deeply', 'Scan from head to toe, noticing tension', 'Acknowledge each sensation with compassion', 'Gently release'], 'Grief is not a sign of weakness. It is the price of love.', 'Name Your Feelings', 'Write down 3 emotions you felt today. No judgment—just name them.'),
          createDay(2, 'The Waves of Grief', 'Breath Anchoring', '5 min', 'Use breath as your anchor when waves of grief feel overwhelming.', ['Inhale for 4 counts', 'Hold for 4 counts', 'Exhale for 6 counts', 'Repeat 5 times', 'Notice how the wave passes'], 'Grief comes in waves. You don\'t have to fight them—just let them carry you until they pass.', 'Wave Journal', 'Note one wave of grief today—when it came, how long it lasted, and what helped.'),
          createDay(3, 'Permission to Grieve', 'Compassion Meditation', '7 min', 'Direct loving-kindness toward yourself in your grief.', ['Sit comfortably', 'Place hand on heart', 'Say: "May I be gentle with myself"', 'Say: "May I allow this pain"', 'Say: "May I find peace in time"'], 'You don\'t need anyone\'s permission to grieve. Your loss is real, and your pain is valid.', 'Permission Letter', 'Write a short letter giving yourself permission to grieve at your own pace.'),
          createDay(4, 'Grief Is Not Linear', 'Gentle Stretching', '10 min', 'Move grief through your body with gentle, mindful stretching.', ['Neck rolls—5 each direction', 'Shoulder shrugs—hold 5 seconds', 'Side stretches—hold 15 seconds each', 'Forward fold—hold 30 seconds', 'Rest in stillness for 1 minute'], 'Healing doesn\'t happen in a straight line. Some days you\'ll feel okay, then suddenly you won\'t. Both are normal.', 'Today\'s Check-In', 'Rate your grief from 1-10 today. There\'s no right answer.'),
          createDay(5, 'Common Myths About Grief', 'Mindful Walking', '10 min', 'Take a slow walk, focusing on each step and the sensation of the ground.', ['Walk slowly and deliberately', 'Feel each foot touch the ground', 'Notice 5 things you see', 'Notice 3 things you hear', 'End with 3 deep breaths'], 'There is no "right" way to grieve. There is only YOUR way, and it is enough.', 'Myth Busting', 'Write down one thing someone said about grief that didn\'t feel true for you.'),
          createDay(6, 'Your Grief Story', 'Journaling Prompt', '15 min', 'Write freely about your relationship with the person or thing you\'ve lost.', ['Set a timer for 15 minutes', 'Write about a favorite memory', 'Write what you miss most', 'Write what you wish you could say', 'Close with gratitude'], 'Your grief story is unique. No one else has lost what you lost in the way you lost it.', 'Share or Save', 'Share your writing with someone you trust, or save it in a safe place for yourself.'),
          createDay(7, 'Week 1 Reflection', 'Gratitude & Grief', '10 min', 'Hold both grief and gratitude in your heart simultaneously.', ['List 3 things you\'re grieving', 'List 3 things you\'re grateful for', 'Notice: both can coexist', 'Sit with this truth for 2 minutes', 'Write one insight from this week'], 'You made it through the first week. That takes incredible courage.', 'Weekly Reflection', 'Write 3 things you learned about yourself and your grief this week.'),
        ]
      },
      {
        week: 2, title: 'Honoring Your Feelings', description: 'Allowing yourself to feel without judgment.',
        days: [
          createDay(1, 'Anger in Grief', 'Release Breathing', '5 min', 'Use forceful exhales to release anger without harming yourself or others.', ['Inhale deeply through nose', 'Exhale forcefully through mouth', 'Let your jaw drop', 'Release sound if needed', 'Repeat 10 times'], 'Anger is grief\'s bodyguard. It\'s protecting your tender heart.', 'Anger Letter', 'Write an unsent letter expressing your anger about your loss. You can tear it up after.'),
          createDay(2, 'Guilt and "What Ifs"', 'Self-Forgiveness Practice', '7 min', 'Release the burden of guilt through intentional self-forgiveness.', ['Name one guilt you carry', 'Ask: "Was this in my control?"', 'Say: "I forgive myself for being human"', 'Place hand on heart', 'Breathe compassion inward'], 'You did the best you could with what you knew at the time. That is enough.', 'Release the What-Ifs', 'Write down 3 "what ifs" and beside each, write "I release this."'),
          createDay(3, 'Sadness as a Teacher', 'Crying Meditation', '10 min', 'Allow tears to come without stopping them. Crying is healing.', ['Find a private space', 'Hold something comforting', 'Think of your loved one', 'Let tears come naturally', 'Rest afterward without judgment'], 'Tears are not weakness. They are the body\'s way of releasing pain too heavy for the heart to hold.', 'Comfort Collection', 'Gather 3 comforting items (photo, blanket, scent) and create a small grief comfort kit.'),
          createDay(4, 'Fear of Forgetting', 'Memory Anchoring', '10 min', 'Create sensory anchors to preserve precious memories.', ['Choose a specific memory', 'What did you see?', 'What did you hear?', 'What did you feel?', 'Write it down in detail'], 'You will never forget. Love leaves fingerprints on the soul that time cannot erase.', 'Memory Jar', 'Write a favorite memory on a slip of paper. Start a memory jar you can add to over time.'),
          createDay(5, 'Numbness and Disconnection', 'Grounding Exercise', '5 min', 'Use the 5-4-3-2-1 technique to reconnect with the present.', ['Name 5 things you see', 'Name 4 things you can touch', 'Name 3 things you hear', 'Name 2 things you smell', 'Name 1 thing you taste'], 'Feeling numb doesn\'t mean you don\'t care. It means your heart needs rest.', 'Reconnection Moment', 'Do one thing today that engages your senses: cook, garden, take a bath, or listen to music.'),
          createDay(6, 'Joy Without Guilt', 'Laughter Permission', '5 min', 'Allow yourself moments of joy without guilt.', ['Watch something funny', 'Let yourself laugh', 'Notice any guilt that arises', 'Remind yourself: joy honors your loved one', 'They would want you to smile'], 'Finding moments of joy is not a betrayal of your grief. It is a testament to the fullness of life.', 'Joy Moment', 'Do one thing today purely for joy. No guilt allowed.'),
          createDay(7, 'Week 2 Reflection', 'Emotional Inventory', '10 min', 'Take stock of all the emotions you\'ve encountered this week.', ['List every emotion you felt', 'Circle the hardest one', 'Star the one that surprised you', 'Write what you learned', 'Set an intention for next week'], 'You are learning the language of your own grief. That is profound work.', 'Share Your Journey', 'Tell someone you trust one thing you learned about yourself this week.'),
        ]
      },
      {
        week: 3, title: 'Memory and Legacy', description: 'Preserving memories and creating meaning from loss.',
        days: [
          createDay(1, 'Celebrating Their Life', 'Photo Meditation', '10 min', 'Spend time with a photo, letting memories flow naturally.', ['Choose a beloved photo', 'Study every detail', 'What story does it tell?', 'Smile if it comes naturally', 'Thank them silently'], 'The people we love become a part of us. They live on in every kindness we show.', 'Memory Share', 'Share a favorite memory of your loved one with someone today.'),
          createDay(2, 'Creating Rituals', 'Candle Lighting', '5 min', 'Light a candle in remembrance and sit with the flame.', ['Light a candle', 'Watch the flame dance', 'Say their name aloud', 'Share a memory or message', 'Let the candle burn as long as you wish'], 'Rituals give our grief a home. They say: I remember, and it matters.', 'Create Your Ritual', 'Design a simple daily or weekly ritual to honor your loved one.'),
          createDay(3, 'Letters to Them', 'Writing Connection', '15 min', 'Write a letter to your loved one as if they could read it.', ['Start with "Dear..."', 'Tell them about your day', 'Share what you miss', 'Share what you\'re learning', 'End with love'], 'Some conversations don\'t need both people present. Your words still reach them.', 'The Letter', 'Write a letter you\'ve been wanting to write. Keep it or let it go—your choice.'),
          createDay(4, 'Legacy Project', 'Creative Expression', '20 min', 'Express your grief through any creative medium.', ['Choose: drawing, writing, music, crafting', 'Create without judgment', 'Let emotion guide you', 'Don\'t worry about quality', 'Title your creation'], 'What we create from our grief becomes their legacy. Your art carries their memory forward.', 'Legacy Brainstorm', 'Write 3 ways you could honor their memory (charity, tradition, creative project).'),
          createDay(5, 'Things Left Unsaid', 'Empty Chair Technique', '10 min', 'Speak to an empty chair as if your loved one were sitting there.', ['Place a chair across from you', 'Imagine them sitting there', 'Say what\'s in your heart', 'Pause and listen with your heart', 'Close with what you need to say most'], 'It\'s never too late to say what needs to be said. Love transcends time.', 'Final Words', 'Write down the one thing you most wish you could tell them.'),
          createDay(6, 'Finding Meaning', 'Values Reflection', '10 min', 'Explore what your loved one taught you about what matters most.', ['What did they value most?', 'What did they teach you?', 'How did they change you?', 'What would they want for you?', 'How can you carry this forward?'], 'Meaning doesn\'t replace loss—it grows alongside it. Both can be true.', 'Carry It Forward', 'Do one thing today that your loved one would be proud of.'),
          createDay(7, 'Week 3 Reflection', 'Memory Collage', '15 min', 'Create a mental or physical collage of your favorite memories.', ['Close your eyes', 'Let memories come naturally', 'Choose 5 favorites', 'Write each one down briefly', 'Read them aloud with love'], 'You are building a bridge between grief and gratitude. Keep walking.', 'Legacy Statement', 'Write one sentence about what your loved one\'s life taught you.'),
        ]
      },
      {
        week: 4, title: 'Daily Coping', description: 'Managing daily life while grieving.',
        days: [
          createDay(1, 'Morning Routines', 'Intentional Start', '5 min', 'Create a gentle morning routine that honors your current capacity.', ['Upon waking, take 3 breaths', 'Say: "I will be gentle with myself today"', 'Drink water mindfully', 'Choose one small goal for the day', 'Move your body for 2 minutes'], 'You don\'t have to conquer the day. You just have to begin it.', 'Morning Anchor', 'Choose one thing to do every morning that helps you start gently.'),
          createDay(2, 'Triggers and Holidays', 'Trigger Mapping', '10 min', 'Identify your grief triggers so they don\'t catch you off guard.', ['List places that trigger grief', 'List songs, smells, dates', 'List situations or conversations', 'For each, write a coping strategy', 'Share your trigger map with someone'], 'Knowing your triggers doesn\'t prevent the pain, but it helps you prepare for it.', 'Trigger Plan', 'Write a plan for the next holiday or anniversary. What will help you through it?'),
          createDay(3, 'Energy Management', 'Spoon Theory Check', '5 min', 'Assess your emotional energy and plan accordingly.', ['Rate your energy 1-10', 'List today\'s demands', 'What can you delegate?', 'What can wait?', 'Protect your remaining energy'], 'You don\'t owe anyone your energy. Rest is productive when your soul is healing.', 'Energy Budget', 'Write 3 things you\'ll say no to this week to protect your energy.'),
          createDay(4, 'Grief and Work', 'Workplace Boundaries', '10 min', 'Create strategies for managing grief in professional settings.', ['Identify safe spaces at work', 'Plan responses for "How are you?"', 'Know when to step away', 'Set realistic expectations', 'Communicate needs to your manager'], 'You don\'t have to be "fine" at work. You just have to be present, and that\'s enough.', 'Work Strategy', 'Write down 3 things that would make work easier right now. Ask for one of them.'),
          createDay(5, 'Grief and Sleep', 'Sleep Hygiene', '10 min', 'Create a bedtime routine that helps with grief-related sleep issues.', ['Screen-free 30 min before bed', 'Write worries in a journal', 'Progressive muscle relaxation', 'Listen to calming sounds', 'Keep a comfort item nearby'], 'Even rest is part of healing. Let yourself sleep without guilt.', 'Bedtime Ritual', 'Create a 15-minute bedtime routine focused on calming your nervous system.'),
          createDay(6, 'Asking for Help', 'Support Mapping', '10 min', 'Identify who can help you and how.', ['List 5 people who care about you', 'Next to each, write what they\'re good at', 'Match needs to people', 'Practice saying: "I need help with..."', 'Reach out to one person today'], 'Asking for help is not weakness. It is the bravest kind of strength.', 'One Ask', 'Ask one person for one specific thing today. Even something small.'),
          createDay(7, 'Week 4 Reflection', 'Progress Check', '10 min', 'Reflect on how your daily coping has evolved.', ['What\'s easier now than week 1?', 'What\'s still hard?', 'What coping tools work best?', 'What do you need more of?', 'Set 2 goals for next week'], 'Look how far you\'ve come. Four weeks of showing up for yourself. That\'s remarkable.', 'Coping Toolkit', 'Write your top 5 coping strategies on a card and keep it in your wallet or phone.'),
        ]
      },
      {
        week: 5, title: 'Finding Support', description: 'Connecting with others who understand.',
        days: [
          createDay(1, 'You\'re Not Alone', 'Connection Meditation', '7 min', 'Meditate on the truth that millions of people share your experience.', ['Sit quietly', 'Think: "Others have walked this path"', 'Feel the connection to shared humanity', 'Send compassion to others grieving', 'Receive compassion in return'], 'Grief can feel isolating, but you are part of a vast community of love and loss.', 'Reach Out', 'Send a message to someone who\'s also experienced loss. Just say: "I\'m thinking of you."'),
          createDay(2, 'Support Groups', 'Research & Explore', '15 min', 'Find support groups or communities for people experiencing similar loss.', ['Search local grief support groups', 'Look for online communities', 'Check with hospitals/hospices', 'Read reviews or testimonials', 'Choose one to try'], 'In sharing our stories, we lighten each other\'s loads.', 'Take the Step', 'Sign up for or attend one support meeting this week—in person or virtual.'),
          createDay(3, 'Helping Others Grieve', 'Empathy Practice', '10 min', 'Practice being a supportive presence for others in grief.', ['Think of someone else who\'s hurting', 'What would you want to hear?', 'Write a kind message to them', 'Send it with no expectation', 'Notice how helping feels'], 'Sometimes the best way to heal is to help someone else heal.', 'Be the Support', 'Reach out to someone else who\'s grieving. Offer to listen without fixing.'),
          createDay(4, 'Professional Support', 'Therapy Exploration', '10 min', 'Consider whether professional support might help your journey.', ['Write down your biggest challenges', 'Research grief counselors', 'Check your insurance coverage', 'Write 3 questions for a therapist', 'Schedule a consultation if ready'], 'Seeking professional support is not failure—it\'s wisdom.', 'Explore Options', 'Look into one professional support option: therapy, counseling, or grief coaching.'),
          createDay(5, 'Setting Boundaries', 'Boundary Practice', '10 min', 'Learn to set boundaries with people who don\'t understand your grief.', ['Identify who drains your energy', 'Practice: "I appreciate your concern, but I need..."', 'It\'s okay to walk away from conversations', 'You don\'t owe explanations', 'Protect your healing space'], 'Boundaries are not walls. They are doors that you control.', 'One Boundary', 'Set one boundary this week. Write it down and commit to honoring it.'),
          createDay(6, 'The Gift of Presence', 'Mindful Listening', '10 min', 'Practice being fully present with someone you love.', ['Choose someone to spend time with', 'Put away your phone', 'Listen without planning your response', 'Make eye contact', 'Be fully there'], 'Sometimes the greatest gift we can give each other is simply being present.', 'Present Moment', 'Spend 20 uninterrupted minutes with someone you care about today.'),
          createDay(7, 'Week 5 Reflection', 'Support Network Map', '10 min', 'Map out your support network and identify gaps.', ['Draw a circle with you at center', 'Add inner circle: closest supports', 'Add outer circle: wider community', 'Identify gaps', 'Plan to fill one gap this week'], 'Your support network is growing. Every connection is a thread of healing.', 'Gratitude for Support', 'Thank one person who has supported you through your grief this week.'),
        ]
      },
      {
        week: 6, title: 'Moving Through Grief', description: 'Finding hope and continuing to heal.',
        days: [
          createDay(1, 'Grief Changes Shape', 'Then and Now', '10 min', 'Notice how your grief has changed over these 6 weeks.', ['Write how grief felt in week 1', 'Write how grief feels now', 'Notice: it hasn\'t disappeared, but it\'s different', 'Grief doesn\'t end—it transforms', 'Honor the transformation'], 'Grief doesn\'t go away. It becomes a part of you—a testament to love.', 'Transformation Journal', 'Write about how your grief has changed shape, even slightly, since you began.'),
          createDay(2, 'Living with Loss', 'Integration Practice', '10 min', 'Practice carrying your grief alongside your daily life.', ['Notice grief and joy coexisting', 'Say: "I can hold both"', 'Do something that brings joy', 'Notice: joy doesn\'t erase grief', 'Both are welcome'], 'You are not "getting over" your loss. You are learning to carry it with grace.', 'Both/And', 'Write about a moment today where you felt both grief and something positive simultaneously.'),
          createDay(3, 'New Beginnings', 'Vision Meditation', '10 min', 'Envision your life going forward with your loved one\'s memory as a guide.', ['Close your eyes', 'Imagine 6 months from now', 'What does a good day look like?', 'How do you honor their memory?', 'What new growth has emerged?'], 'New beginnings don\'t mean forgetting. They mean growing around the grief.', 'Future Letter', 'Write a letter to yourself 6 months from now. What do you hope for?'),
          createDay(4, 'Continuing Bonds', 'Ongoing Connection', '10 min', 'Explore ways to maintain a continuing bond with your loved one.', ['How do you still feel connected?', 'What traditions will you keep?', 'What new traditions will you create?', 'How do they live on through you?', 'Write a commitment to continue the bond'], 'Death ends a life, not a relationship. Your bond continues in new ways.', 'Continuing Bond', 'Choose one way you will continue your bond going forward. Write it as a commitment.'),
          createDay(5, 'Giving Back', 'Service Reflection', '10 min', 'Consider how your grief journey could help others.', ['What have you learned?', 'Who else might benefit?', 'Could you volunteer?', 'Could you share your story?', 'What would your loved one think of this?'], 'Your pain can become someone else\'s lighthouse. Your story matters.', 'Pay It Forward', 'Do one thing today to help someone else, in memory of your loved one.'),
          createDay(6, 'Celebrating Your Courage', 'Self-Recognition', '10 min', 'Celebrate the incredible courage it took to walk this journey.', ['List 5 ways you\'ve grown', 'Name 3 hard things you survived', 'Acknowledge your strength', 'Thank yourself', 'You are remarkable'], 'You have done one of the hardest things a human being can do. And you\'re still here. That is everything.', 'Self-Celebration', 'Do something kind for yourself today. You\'ve earned it.'),
          createDay(7, 'Program Completion', 'Closing Ceremony', '15 min', 'Create a personal closing ceremony for your 6-week journey.', ['Light a candle', 'Read your week 1 journal entry', 'Read today\'s reflection', 'Notice the difference', 'Blow out the candle with love and hope'], 'This is not the end. It is a new beginning. You carry their love, and your own incredible strength, forward.', 'Final Reflection', 'Write a final reflection on your 6-week grief journey. What will you carry forward?'),
        ]
      },
    ]
  },

  'divorce-recovery': {
    slug: 'divorce-recovery',
    weeks: [
      {
        week: 1, title: 'Processing Your Emotions', description: 'Understanding and accepting the range of emotions during this transition.',
        days: [
          createDay(1, 'Acknowledging the Change', 'Body Scan Meditation', '5 min', 'Notice how this life change feels in your body.', ['Find a quiet space', 'Breathe deeply', 'Scan from head to toe', 'Notice tension areas', 'Send breath to those areas'], 'Every ending is also a beginning. Give yourself permission to feel everything.', 'Feelings Check', 'Write down every emotion you felt today without judging any of them.'),
          createDay(2, 'Riding the Emotional Waves', 'Wave Breathing', '5 min', 'Visualize emotions as ocean waves that rise and fall.', ['Inhale: wave rises', 'Pause: wave crests', 'Exhale: wave falls', 'Feel the rhythm', 'You survive every wave'], 'You are stronger than any wave of emotion. Each one you survive proves it.', 'Wave Log', 'Note one emotional wave today—what triggered it and how you rode it out.'),
          createDay(3, 'Releasing Anger', 'Physical Release', '10 min', 'Release anger through safe physical movement.', ['Go for a brisk walk', 'Punch a pillow if needed', 'Scream into a cushion', 'Dance to loud music', 'End with deep breathing'], 'Anger is energy that needs to move through you. Let it move.', 'Anger Letter', 'Write an unsent letter expressing your anger. Tear it up when done.'),
          createDay(4, 'Grief for What Was', 'Mourning Meditation', '7 min', 'Allow yourself to mourn the relationship and the life you planned.', ['Sit with what you\'re losing', 'Let tears come if they do', 'This is a real loss', 'You\'re allowed to grieve it', 'Breathe through it'], 'Grieving a marriage is grieving a future that won\'t happen. That pain is real.', 'What I\'m Mourning', 'List 3 specific things you\'re mourning. Acknowledge each one.'),
          createDay(5, 'Hope Amid Pain', 'Gratitude Finding', '5 min', 'Find tiny sparks of gratitude even in difficult times.', ['Name 1 thing you\'re grateful for', 'Name 1 person who supports you', 'Name 1 thing you learned from the marriage', 'Name 1 hope for the future', 'Hold onto these'], 'Pain and hope can coexist. Both are honest.', 'Gratitude Spark', 'Text someone who has supported you and say thank you.'),
          createDay(6, 'Emotional First Aid', 'Self-Soothing Kit', '15 min', 'Create a personal emotional first-aid toolkit.', ['Choose a calming playlist', 'Select a comforting scent', 'Identify a safe person to call', 'Write 3 affirmations on cards', 'Keep these accessible'], 'You are learning to become your own safe harbor. That is powerful.', 'Build Your Kit', 'Assemble your emotional first-aid kit in a box, bag, or phone folder.'),
          createDay(7, 'Week 1 Reflection', 'Progress Journaling', '10 min', 'Reflect on your first week of intentional healing.', ['How do you feel compared to Day 1?', 'What surprised you?', 'What was hardest?', 'What tool helped most?', 'Set an intention for Week 2'], 'One week down. You\'re already braver than you know.', 'Weekly Summary', 'Write 3 insights from this week that you want to remember.'),
        ]
      },
      {
        week: 2, title: 'Building Your Support System', description: 'Identifying and strengthening your support network.',
        days: [
          createDay(1, 'Who\'s in Your Corner?', 'Support Mapping', '10 min', 'Map out the people who genuinely support you.', ['List family members', 'List friends', 'List professionals', 'List community connections', 'Rate each on reliability and comfort'], 'You don\'t need a crowd. You need a few people who really see you.', 'Reach Out', 'Contact one person from your support map today. Just say hello.'),
          createDay(2, 'Asking for What You Need', 'Needs Assessment', '10 min', 'Identify what you actually need from others.', ['Do you need someone to listen?', 'Do you need practical help?', 'Do you need distraction?', 'Do you need professional guidance?', 'Practice asking for one'], 'Most people want to help. They just need you to tell them how.', 'One Ask', 'Ask one person for one specific thing today.'),
          createDay(3, 'Setting Boundaries with Your Ex', 'Boundary Scripting', '10 min', 'Write scripts for common difficult interactions.', ['What topics are off-limits?', 'What communication method works best?', 'Script: "I need us to discuss..."', 'Script: "That topic isn\'t helpful right now"', 'Practice saying them aloud'], 'Boundaries aren\'t mean. They\'re how you protect your peace.', 'Boundary Script', 'Write 2 scripts for conversations with your ex and practice them.'),
          createDay(4, 'Protecting Your Children', 'Child-Focused Meditation', '10 min', 'If you have children, center yourself in their needs.', ['Think about each child', 'What do they need most right now?', 'How can you provide stability?', 'What should they not see or hear?', 'Commit to shielding them from conflict'], 'The greatest gift you can give your children is your own healing.', 'Kids First Plan', 'Write 3 commitments for protecting your children\'s emotional well-being.'),
          createDay(5, 'Finding Your People', 'Community Research', '15 min', 'Find support groups or communities for people going through divorce.', ['Search for local divorce support groups', 'Find online communities', 'Look for single-parent networks', 'Check with your therapist or counselor', 'Choose one to try'], 'There are people who understand exactly what you\'re going through. Find them.', 'Join One', 'Sign up for or attend one support group or community this week.'),
          createDay(6, 'Releasing Toxic Connections', 'Energy Audit', '10 min', 'Identify relationships that drain rather than support you.', ['Who leaves you feeling worse?', 'Who gossips about your situation?', 'Who takes sides unhelpfully?', 'Who respects your boundaries?', 'Create distance from draining people'], 'Not everyone in your life deserves a front-row seat to your healing.', 'Distance Plan', 'Identify one draining relationship and write how you\'ll create healthy distance.'),
          createDay(7, 'Week 2 Reflection', 'Support Gratitude', '10 min', 'Appreciate the support system you\'re building.', ['Who helped you most this week?', 'What boundary felt good to set?', 'What community did you find?', 'How does connection feel?', 'Thank someone specifically'], 'Your support system is like a garden. Tend to it, and it will sustain you.', 'Thank Someone', 'Write or send a thank-you note to someone who supported you this week.'),
        ]
      },
      {
        week: 3, title: 'Self-Care Foundations', description: 'Establishing healthy routines and self-care practices.',
        days: [
          createDay(1, 'Basic Needs First', 'Needs Checklist', '5 min', 'Ensure you\'re meeting your basic physical needs.', ['Are you eating regularly?', 'Are you hydrating?', 'Are you sleeping enough?', 'Are you moving your body?', 'Pick one to improve today'], 'Before you can heal your heart, you need to take care of your body.', 'Basic Care', 'Drink 8 glasses of water today and eat 3 meals, even small ones.'),
          createDay(2, 'Movement as Medicine', 'Gentle Exercise', '15 min', 'Move your body in a way that feels good—not punishing.', ['Choose: walk, yoga, dance, swim', 'Move for 15 minutes minimum', 'Notice how your body feels', 'Don\'t push—just move', 'Cool down with stretching'], 'Movement isn\'t about burning calories. It\'s about burning off stress.', 'Move Today', 'Do 15 minutes of movement you actually enjoy. No gym required.'),
          createDay(3, 'Sleep Sanctuary', 'Sleep Reset', '10 min', 'Create a sleep environment that supports healing.', ['Make your bed a peaceful space', 'Remove screens from bedroom', 'Try lavender or calming scents', 'Write worries in a journal before bed', 'Practice progressive relaxation'], 'Sleep is when your brain processes pain. Give it the best conditions.', 'Sleep Upgrade', 'Make one change to your sleep environment tonight.'),
          createDay(4, 'Nourishing Your Body', 'Mindful Eating', '10 min', 'Practice eating one meal with complete attention.', ['Prepare food with care', 'Sit down to eat', 'Notice colors, smells, textures', 'Chew slowly', 'Express gratitude for nourishment'], 'Feeding yourself well is an act of self-love, especially when life is hard.', 'Cook for You', 'Prepare one meal today that you genuinely enjoy. Set the table nicely.'),
          createDay(5, 'Joy Inventory', 'Pleasure List', '10 min', 'Rediscover activities that bring you genuine pleasure.', ['List 10 things that make you happy', 'How many have you done recently?', 'Circle 3 you can do this week', 'Schedule them like appointments', 'Protect that time'], 'You deserve joy, even now—especially now.', 'Schedule Joy', 'Put 2 joy activities on your calendar this week. Keep those appointments.'),
          createDay(6, 'Digital Detox', 'Social Media Check', '10 min', 'Evaluate whether your digital habits support your healing.', ['How much time on social media?', 'Does it help or hurt?', 'Unfollow/mute triggering accounts', 'Set time limits', 'Replace scroll time with self-care'], 'Scrolling through someone else\'s highlight reel won\'t heal your heart.', 'Digital Boundary', 'Set a daily social media limit and stick to it today.'),
          createDay(7, 'Week 3 Reflection', 'Self-Care Assessment', '10 min', 'Assess how your self-care has improved this week.', ['Rate sleep, nutrition, movement 1-10', 'What improved?', 'What needs more attention?', 'What self-care non-negotiables will you keep?', 'Write your commitment'], 'You are learning to put yourself first. This isn\'t selfish—it\'s survival.', 'Self-Care Pledge', 'Write 3 self-care non-negotiables you\'ll maintain going forward.'),
        ]
      },
      {
        week: 4, title: 'Practical Life Management', description: 'Managing finances, logistics, and daily responsibilities.',
        days: [
          createDay(1, 'Financial Overview', 'Money Check-In', '15 min', 'Get a clear picture of your financial situation.', ['List all income sources', 'List all expenses', 'Identify what\'s changing', 'Check joint accounts', 'Make a simple budget'], 'Financial clarity reduces anxiety. Knowledge is power.', 'Money Snapshot', 'Write down your monthly income and expenses. Knowledge before action.'),
          createDay(2, 'Legal Preparedness', 'Document Organization', '15 min', 'Organize important documents and understand your legal standing.', ['Gather financial documents', 'Find insurance policies', 'Locate property deeds', 'Collect tax returns', 'Store securely'], 'Being organized isn\'t about control—it\'s about protecting yourself.', 'Document Folder', 'Create a folder (physical or digital) with copies of all important documents.'),
          createDay(3, 'New Routines', 'Routine Design', '10 min', 'Create new daily routines that work for your new life.', ['Design a morning routine', 'Plan weekday evenings', 'Plan weekends', 'Include self-care', 'Include social connection'], 'New routines create new neural pathways. You\'re literally rewiring your brain.', 'Try Your Routine', 'Follow your new morning routine tomorrow. Adjust as needed.'),
          createDay(4, 'Home as Haven', 'Space Reclaiming', '15 min', 'Make your living space feel like YOUR space.', ['Rearrange one room', 'Add something new that\'s just yours', 'Remove things that cause pain', 'Add comfort: plants, candles, art', 'Make it feel safe'], 'Your space should reflect who you\'re becoming, not who you were.', 'One Change', 'Make one change to your living space that makes it feel more like yours.'),
          createDay(5, 'Simplify and Prioritize', 'Life Audit', '10 min', 'Simplify your life by identifying what truly matters.', ['List all commitments', 'Rate each: essential, important, optional', 'Drop 2 optional commitments', 'Say no to one new request', 'Create margin in your schedule'], 'You don\'t have to do everything. You just have to do what matters most.', 'Let Go of One', 'Drop one non-essential commitment today. Feel the relief.'),
          createDay(6, 'Planning Ahead', 'Future Vision', '10 min', 'Start thinking about what you want your future to look like.', ['Where do you want to live?', 'What career goals do you have?', 'What kind of relationship do you want (eventually)?', 'What adventures await?', 'Write one exciting possibility'], 'Your future is unwritten. That\'s terrifying AND beautiful.', 'Vision Board', 'Start a simple vision board—digital or physical—for your future.'),
          createDay(7, 'Week 4 Reflection', 'Practical Progress', '10 min', 'Assess how you\'re managing the practical side of this transition.', ['What\'s more organized now?', 'What\'s still overwhelming?', 'What help do you need?', 'What are you proud of?', 'Celebrate one practical win'], 'You\'re handling hard things. Give yourself credit for every step.', 'Celebrate', 'Treat yourself to something small for managing all of this. You deserve it.'),
        ]
      },
      {
        week: 5, title: 'Rediscovering Yourself', description: 'Exploring your identity and who you\'re becoming.',
        days: [
          createDay(1, 'Who Am I Now?', 'Identity Meditation', '10 min', 'Explore who you are outside of your marriage.', ['Who were you before the relationship?', 'What dreams did you set aside?', 'What makes you, YOU?', 'What do you want to be known for?', 'Write "I am..." 10 times'], 'You didn\'t lose yourself. You just need to remember who you\'ve always been.', 'I Am Statements', 'Write 10 "I am..." statements that have nothing to do with your ex.'),
          createDay(2, 'Forgotten Dreams', 'Dream Recovery', '10 min', 'Revisit dreams and goals you may have put on hold.', ['What did you dream about as a teenager?', 'What hobbies did you abandon?', 'What adventures called to you?', 'Which could you revisit now?', 'Choose one to explore'], 'The dreams you tucked away are still alive. They\'re waiting for you.', 'One Dream', 'Take one small step toward a forgotten dream today.'),
          createDay(3, 'Try Something New', 'Courage Practice', '15 min', 'Do something you\'ve never done before.', ['List 5 things you\'ve always wanted to try', 'Choose the one that scares you least', 'Do it today or schedule it this week', 'Notice how it feels to try something new', 'Celebrate your courage'], 'Growth happens outside your comfort zone. Take one step.', 'New Thing', 'Try one new thing today—even something tiny like a new recipe or route.'),
          createDay(4, 'Reclaiming Your Time', 'Time Freedom', '10 min', 'Explore the freedom of owning your own time.', ['What do you want to do with your evenings?', 'What would a perfect Saturday look like?', 'What compromises are you free from?', 'How will you fill this time?', 'Plan something just for you'], 'Your time is yours now. Spend it on things that make you come alive.', 'My Time', 'Do something tonight purely because YOU want to. No compromises.'),
          createDay(5, 'Building Confidence', 'Strength Inventory', '10 min', 'Take stock of your strengths and accomplishments.', ['List 10 things you\'re good at', 'List 5 challenges you\'ve overcome', 'List 3 compliments people have given you', 'Read them aloud', 'Own them'], 'You are more capable than you know. Look at what you\'ve already survived.', 'Power List', 'Carry your strength inventory with you this week. Read it when doubt creeps in.'),
          createDay(6, 'Social Rediscovery', 'Connection Experiment', '15 min', 'Explore new social connections and activities.', ['Try a class, club, or meetup', 'Reconnect with an old friend', 'Go somewhere alone and enjoy it', 'Start a new conversation', 'Be open to unexpected connections'], 'You are free to build exactly the social life you want. Start fresh.', 'Social Step', 'Do one social thing today that\'s just for you—not for anyone else.'),
          createDay(7, 'Week 5 Reflection', 'Identity Update', '10 min', 'Reflect on who you\'re becoming.', ['How has your self-image changed?', 'What have you discovered?', 'What excites you about your future?', 'What do you still want to explore?', 'Write a letter to your future self'], 'You are not who you were. You are who you\'re becoming. And she/he is incredible.', 'Future Self Letter', 'Write a letter to yourself one year from now. Seal it and date it.'),
        ]
      },
      {
        week: 6, title: 'Moving Forward with Purpose', description: 'Creating a vision for your future and maintaining momentum.',
        days: [
          createDay(1, 'Your New Chapter', 'Chapter Writing', '10 min', 'If your life were a book, write the opening of your new chapter.', ['Title your new chapter', 'What\'s the setting?', 'Who are the main characters?', 'What\'s the theme?', 'What happens first?'], 'This isn\'t the end of your story. It\'s the beginning of the best chapter.', 'Chapter Title', 'Choose a title for this new chapter of your life and write it somewhere visible.'),
          createDay(2, 'Lessons Learned', 'Wisdom Harvest', '10 min', 'Extract wisdom from your marriage and divorce.', ['What did the marriage teach you?', 'What did the divorce teach you?', 'What will you do differently?', 'What patterns will you break?', 'What values will you protect?'], 'Every experience—even painful ones—carries wisdom. Claim yours.', 'Wisdom List', 'Write your top 5 lessons learned. These are your guidelines going forward.'),
          createDay(3, 'Forgiveness Work', 'Forgiveness Meditation', '10 min', 'Begin the process of forgiveness—for yourself and your ex.', ['Forgiveness is for YOU, not them', 'Say: "I release this burden"', 'Forgive yourself for any mistakes', 'This doesn\'t mean condoning', 'This means freeing yourself'], 'Forgiveness doesn\'t mean it was okay. It means you refuse to carry the weight anymore.', 'Release Statement', 'Write: "I forgive myself for..." Complete it 3 times. Breathe after each one.'),
          createDay(4, 'Setting New Goals', 'Goal Framework', '15 min', 'Set meaningful goals for the next 3-6 months.', ['Set a personal growth goal', 'Set a career/financial goal', 'Set a health/wellness goal', 'Set a relationship/social goal', 'Make each SMART and achievable'], 'You are free to dream new dreams. Let them be YOUR dreams this time.', 'Action Plan', 'Choose your most important goal and write 3 action steps to start this week.'),
          createDay(5, 'Celebrating Your Transformation', 'Transformation Timeline', '15 min', 'Create a timeline of your growth from Day 1 to now.', ['Write where you started', 'Note key turning points', 'List breakthroughs', 'Acknowledge setbacks you overcame', 'See how far you\'ve come'], 'Look at you. Six weeks ago you were surviving. Now you\'re starting to thrive.', 'Share Your Growth', 'Tell one person about your growth journey. Your story could inspire them.'),
          createDay(6, 'Ongoing Support Plan', 'Sustainability Plan', '10 min', 'Create a plan for maintaining your progress after this program.', ['What daily practices will you keep?', 'Who will you stay connected to?', 'What triggers will you watch for?', 'When will you check in with yourself?', 'What\'s your emergency self-care plan?'], 'This program ends, but your growth doesn\'t. You have everything you need.', 'Maintenance Plan', 'Write your post-program self-care maintenance plan. Review it monthly.'),
          createDay(7, 'Program Completion', 'Closing Ceremony', '15 min', 'Honor your journey through this program.', ['Read your Day 1 journal entry', 'Read today\'s reflection', 'Notice the transformation', 'Write a graduation letter to yourself', 'Celebrate. You did this.'], 'You walked through fire and came out gold. This is just the beginning.', 'Graduation Celebration', 'Do something special to celebrate completing this program. You earned it.'),
        ]
      },
    ]
  },

  'job-loss': {
    slug: 'job-loss',
    weeks: [
      {
        week: 1, title: 'Processing the Loss', description: 'Understanding and accepting job loss emotions.',
        days: [
          createDay(1, 'Acknowledging the Shock', 'Grounding Exercise', '5 min', 'Ground yourself in the present moment after the shock.', ['Feel your feet on the ground', 'Name 5 things you see', 'Take 3 deep breaths', 'Say: "I am safe right now"', 'Release tension from your shoulders'], 'Losing a job is a grief. Give yourself permission to feel it all.', 'Feelings Inventory', 'Write down every emotion you\'re feeling right now without censoring.'),
          createDay(2, 'Identity Beyond Work', 'Values Reflection', '10 min', 'Separate your identity from your job title.', ['List 10 things you are besides your job title', 'What roles do you play in life?', 'What values define you?', 'What would people say about your character?', 'You are more than a job'], 'You are not your job. You never were. You are so much more.', 'I Am List', 'Write "I am..." 10 times without mentioning any job or career.'),
          createDay(3, 'Allowing Anger', 'Physical Release', '10 min', 'Release anger about the situation through safe physical activity.', ['Go for a power walk', 'Do jumping jacks or pushups', 'Hit a pillow', 'Write an angry letter (don\'t send)', 'End with deep breathing'], 'Your anger is valid. The way you were treated matters. Feel it, then channel it.', 'Anger Expression', 'Write freely about what made you angry about losing your job. Hold nothing back.'),
          createDay(4, 'Financial First Aid', 'Money Assessment', '15 min', 'Take stock of your financial situation with clear eyes.', ['List savings and resources', 'List monthly essential expenses', 'Calculate runway', 'Identify what to cut temporarily', 'Research unemployment benefits'], 'Financial clarity reduces panic. You can handle this when you can see it clearly.', 'Budget Snapshot', 'Create a bare-bones budget for the next 3 months.'),
          createDay(5, 'Telling Your Story', 'Narrative Practice', '10 min', 'Develop a healthy narrative about your job loss.', ['What happened? (facts only)', 'What did you learn?', 'How are you growing?', 'What\'s your elevator pitch?', 'Practice telling it without shame'], 'How you tell your story determines how you feel about it. Tell it with dignity.', 'Your Narrative', 'Write a 2-minute version of your story that feels honest and empowering.'),
          createDay(6, 'Routine Recovery', 'Daily Structure', '10 min', 'Create a daily routine to replace the structure work provided.', ['Set a consistent wake-up time', 'Include morning self-care', 'Block time for job search', 'Block time for skill building', 'Include social connection and rest'], 'Structure creates stability when everything feels uncertain.', 'Tomorrow\'s Plan', 'Write out a detailed schedule for tomorrow that includes self-care.'),
          createDay(7, 'Week 1 Reflection', 'Progress Check', '10 min', 'Reflect on how you\'ve processed this major change.', ['How do you feel compared to Day 1?', 'What coping tools helped most?', 'What surprised you?', 'What do you need more of?', 'Set an intention for Week 2'], 'You survived the first week. That\'s not nothing—that\'s everything.', 'Weekly Insights', 'Write 3 key insights from your first week of intentional healing.'),
        ]
      },
      {
        week: 2, title: 'Skills & Strengths Discovery', description: 'Identifying your unique value and transferable skills.',
        days: [
          createDay(1, 'Skills Inventory', 'Strength Mapping', '15 min', 'Create a comprehensive map of your skills and abilities.', ['List hard skills (technical)', 'List soft skills (interpersonal)', 'List transferable skills', 'Ask 3 friends what they see as your strengths', 'Combine into a master list'], 'You have more skills than you realize. Start seeing them clearly.', 'Master Skills List', 'Write your comprehensive skills list—include everything, even skills you take for granted.'),
          createDay(2, 'What Energizes You?', 'Energy Mapping', '10 min', 'Identify work activities that give you energy vs. drain you.', ['List tasks you loved in past jobs', 'List tasks you dreaded', 'What are the patterns?', 'What does this tell you?', 'Your next role should lean toward energy'], 'Follow the energy. Work that energizes you is work worth pursuing.', 'Energy Profile', 'Write your top 5 energizing work activities and top 5 draining ones.'),
          createDay(3, 'Achievements Gallery', 'Win Documentation', '15 min', 'Document your professional achievements and wins.', ['List 10 career accomplishments', 'What impact did each have?', 'What skills did each demonstrate?', 'Quantify where possible', 'These are your proof of value'], 'Your track record speaks for itself. Make sure you remember it clearly.', 'Achievement Stories', 'Write 3 detailed achievement stories using the STAR method (Situation, Task, Action, Result).'),
          createDay(4, 'Feedback Mining', 'Review Reflection', '10 min', 'Extract useful information from past performance reviews and feedback.', ['What do reviewers consistently praise?', 'What themes emerge?', 'What do colleagues thank you for?', 'What unique value do you bring?', 'Compile the positive patterns'], 'Other people often see our strengths more clearly than we do.', 'Strength Themes', 'Write the top 3 themes from feedback you\'ve received. These are your superpowers.'),
          createDay(5, 'Skills Gap Analysis', 'Growth Areas', '10 min', 'Identify skills you want to develop for your next role.', ['Research job listings in your field', 'What skills appear most?', 'Which do you have?', 'Which could you learn?', 'Prioritize 2-3 to develop'], 'Gaps aren\'t weaknesses. They\'re opportunities waiting to be filled.', 'Learning Plan', 'Choose one skill gap and find a free resource to start learning it today.'),
          createDay(6, 'Your Unique Value', 'Personal Brand', '15 min', 'Define what makes you uniquely valuable in your field.', ['What combination of skills is unique to you?', 'What perspective do you bring?', 'What problems can you solve?', 'How would a colleague describe you?', 'Write your personal value statement'], 'There is no one else with your exact combination of experience, skills, and perspective.', 'Value Statement', 'Write a 2-sentence personal value statement. Memorize it.'),
          createDay(7, 'Week 2 Reflection', 'Confidence Check', '10 min', 'Assess how your confidence has grown through self-discovery.', ['Rate your confidence 1-10 vs last week', 'What new strengths did you discover?', 'How does it feel to see your value?', 'What will you do with this knowledge?', 'Celebrate your growth'], 'You are far more valuable than any job title. The evidence is right in front of you.', 'Confidence Boost', 'Share one thing you discovered about yourself with someone who supports you.'),
        ]
      },
      {
        week: 3, title: 'Exploring New Paths', description: 'Researching industries and career opportunities.',
        days: [
          createDay(1, 'Career Curiosity', 'Exploration Research', '15 min', 'Research industries and roles that align with your values and skills.', ['List 5 industries that interest you', 'Research growth trends', 'Find roles matching your skills', 'Read about people who made transitions', 'Keep an open mind'], 'Your next chapter doesn\'t have to look like the last one.', 'Industry Shortlist', 'Narrow to 3 industries or roles you want to explore further.'),
          createDay(2, 'Informational Interviews', 'Connection Outreach', '15 min', 'Reach out to people in roles or industries you\'re curious about.', ['Identify 5 people to talk to', 'Write a brief, respectful outreach message', 'Prepare 5 thoughtful questions', 'Send 2 messages today', 'Follow up graciously'], 'Every conversation opens a door. You just have to knock.', 'Send Two', 'Send 2 outreach messages for informational conversations.'),
          createDay(3, 'Side Hustle Exploration', 'Entrepreneurship Check', '10 min', 'Consider whether freelancing or self-employment could work for you.', ['What services could you offer?', 'Is there a market for your skills?', 'What\'s your risk tolerance?', 'Could you start small while job searching?', 'Research platforms for freelancers'], 'Sometimes the best job is the one you create for yourself.', 'Freelance Test', 'Research one freelancing platform in your field. Create a profile if it fits.'),
          createDay(4, 'Education & Training', 'Upskilling Research', '15 min', 'Explore education and training opportunities.', ['Research online courses (Coursera, LinkedIn Learning)', 'Check local community college programs', 'Look for industry certifications', 'Find free workshops and webinars', 'Choose one to start this week'], 'Investing in yourself always pays the highest returns.', 'Enroll', 'Sign up for one free course or webinar related to your career goals.'),
          createDay(5, 'Networking Strategy', 'Network Building', '10 min', 'Develop a strategic approach to professional networking.', ['Update LinkedIn profile', 'Join 2 professional groups', 'Attend one virtual event', 'Reconnect with former colleagues', 'Offer help to your network'], 'Networking isn\'t about using people. It\'s about building genuine connections.', 'Network Action', 'Do one networking activity today: attend an event, post on LinkedIn, or reconnect.'),
          createDay(6, 'The Pivot Mindset', 'Flexibility Practice', '10 min', 'Practice being open to unexpected opportunities.', ['What would you do if money weren\'t an issue?', 'What roles have you never considered?', 'What skills translate to surprising fields?', 'Are you limiting yourself unnecessarily?', 'Open one new door today'], 'The best opportunities often come from the most unexpected places.', 'Open Door', 'Apply for or explore one opportunity that\'s outside your usual scope.'),
          createDay(7, 'Week 3 Reflection', 'Path Assessment', '10 min', 'Evaluate the paths you\'ve explored and where your energy leads.', ['Which path excites you most?', 'Which feels most realistic?', 'What did the conversations teach you?', 'Where do you want to focus?', 'Narrow your focus for Week 4'], 'You\'re not lost. You\'re exploring. And explorers always find something.', 'Direction Statement', 'Write a one-paragraph statement about where you\'re heading and why.'),
        ]
      },
      {
        week: 4, title: 'Building Your Brand', description: 'Resume, LinkedIn, and personal branding.',
        days: [
          createDay(1, 'Resume Refresh', 'Resume Rewrite', '20 min', 'Update your resume to reflect your value and target roles.', ['Start with a strong summary', 'Use achievement-based bullet points', 'Quantify results where possible', 'Tailor for target roles', 'Get a second pair of eyes'], 'Your resume is your story on paper. Make it compelling.', 'Resume Draft', 'Complete a first draft of your updated resume.'),
          createDay(2, 'LinkedIn Optimization', 'Profile Update', '15 min', 'Optimize your LinkedIn profile for maximum visibility.', ['Write a compelling headline', 'Update your summary/about section', 'Add skills and get endorsements', 'Use a professional photo', 'Set to "Open to Work" if comfortable'], 'LinkedIn is your digital handshake. Make it count.', 'Profile Polish', 'Update your LinkedIn headline and about section today.'),
          createDay(3, 'Cover Letter Template', 'Letter Crafting', '15 min', 'Create a strong cover letter template you can customize.', ['Open with something memorable', 'Show you researched the company', 'Connect your value to their needs', 'Express genuine interest', 'End with a clear call to action'], 'A great cover letter shows who you are, not just what you\'ve done.', 'Template Ready', 'Write a cover letter template with brackets for customization.'),
          createDay(4, 'Online Presence', 'Digital Audit', '10 min', 'Audit and clean up your online presence.', ['Google your name', 'Review social media profiles', 'Remove anything unprofessional', 'Consider a personal website', 'Ensure consistency across platforms'], 'Your online presence IS your first impression. Make it intentional.', 'Clean Up', 'Fix one thing about your online presence today.'),
          createDay(5, 'Portfolio Development', 'Work Samples', '15 min', 'Gather and organize work samples or a portfolio.', ['Collect best work examples', 'Write brief case studies', 'Create a simple portfolio (even a PDF)', 'Include measurable results', 'Make it easy to share'], 'Show, don\'t just tell. Your work speaks for itself.', 'Portfolio Start', 'Organize 3-5 of your best work examples into a shareable format.'),
          createDay(6, 'Elevator Pitch', 'Pitch Practice', '10 min', 'Develop and practice your 30-second elevator pitch.', ['Who are you?', 'What do you do best?', 'What are you looking for?', 'What value do you bring?', 'Practice until it\'s natural'], 'When someone asks "What do you do?", your answer should make them want to hear more.', 'Pitch Perfect', 'Practice your elevator pitch with someone and get feedback.'),
          createDay(7, 'Week 4 Reflection', 'Brand Check', '10 min', 'Review your personal brand across all touchpoints.', ['Is your messaging consistent?', 'Does your brand reflect your value?', 'What feedback have you received?', 'What needs refinement?', 'Celebrate your progress'], 'You now have a professional brand that represents the real you. That\'s powerful.', 'Brand Review', 'Ask one trusted person to review your resume and LinkedIn. Incorporate feedback.'),
        ]
      },
      {
        week: 5, title: 'Interview Mastery', description: 'Mastering the interview and negotiation process.',
        days: [
          createDay(1, 'Interview Preparation', 'Research Method', '15 min', 'Develop a systematic approach to interview preparation.', ['Research the company thoroughly', 'Understand the role requirements', 'Prepare 5 STAR stories', 'Prepare thoughtful questions', 'Practice with a friend'], 'Preparation breeds confidence. Leave nothing to chance.', 'Prep Template', 'Create an interview prep checklist you can use for every interview.'),
          createDay(2, 'Behavioral Questions', 'STAR Practice', '15 min', 'Practice answering behavioral interview questions.', ['Prepare stories for: challenge, teamwork, leadership', 'Use STAR: Situation, Task, Action, Result', 'Keep answers under 2 minutes', 'Focus on YOUR contribution', 'Practice out loud'], 'The best interview answers are specific stories, not general claims.', 'Five Stories', 'Write out 5 STAR stories covering different competencies.'),
          createDay(3, 'Tough Questions', 'Confidence Building', '10 min', 'Prepare for difficult interview questions with confidence.', ['Why did you leave? (frame positively)', 'What\'s your weakness? (genuine + growth)', 'Tell me about a failure (what you learned)', 'Where do you see yourself? (aligned + ambitious)', 'Practice until natural'], 'There are no trick questions—only opportunities to show your self-awareness.', 'Tough Q Answers', 'Write confident answers to the 5 toughest interview questions.'),
          createDay(4, 'Virtual Interview Skills', 'Tech & Presence', '10 min', 'Master the unique challenges of virtual interviews.', ['Test your technology', 'Optimize lighting and background', 'Make eye contact with the camera', 'Minimize distractions', 'Dress fully professional'], 'In virtual interviews, the little things make the biggest difference.', 'Setup Test', 'Do a test video call with a friend to check your setup and presence.'),
          createDay(5, 'Salary Negotiation', 'Negotiation Prep', '15 min', 'Prepare to negotiate your compensation with confidence.', ['Research market salary ranges', 'Know your minimum and target', 'Practice saying your number', 'Prepare counterarguments', 'Remember: negotiation is expected'], 'You are worth what you bring to the table. Know your number and own it.', 'Salary Research', 'Research salary ranges for your target roles on Glassdoor and LinkedIn.'),
          createDay(6, 'Follow-Up Strategy', 'Post-Interview Plan', '10 min', 'Create a professional follow-up strategy.', ['Send thank-you email within 24 hours', 'Reference specific conversation points', 'Reaffirm your interest', 'Follow up after 1 week if no response', 'Stay professional and patient'], 'The interview doesn\'t end when you hang up. Your follow-up can seal the deal.', 'Thank-You Template', 'Write a thank-you email template you can customize after interviews.'),
          createDay(7, 'Week 5 Reflection', 'Readiness Assessment', '10 min', 'Assess your interview readiness and confidence.', ['Rate your confidence 1-10', 'What\'s your strongest preparation area?', 'What needs more practice?', 'How many applications have you sent?', 'Celebrate your preparation'], 'You are prepared. You are capable. The right opportunity is looking for you too.', 'Application Push', 'Send out 3 applications this week and follow up on any pending ones.'),
        ]
      },
      {
        week: 6, title: 'Moving Forward Strong', description: 'Building resilience and maintaining momentum.',
        days: [
          createDay(1, 'Resilience Building', 'Resilience Reflection', '10 min', 'Strengthen your resilience muscles for the journey ahead.', ['List 5 hardships you\'ve overcome', 'What did each teach you?', 'What inner resources do you have?', 'How will you handle rejection?', 'You are more resilient than you know'], 'Resilience isn\'t about not falling. It\'s about how you rise.', 'Resilience Plan', 'Write your plan for handling rejection: who to call, what to do, how to recover.'),
          createDay(2, 'Rejection as Redirection', 'Perspective Shift', '10 min', 'Reframe rejection as valuable information and redirection.', ['Every "no" gets you closer to "yes"', 'What can rejection teach you?', 'How can you use feedback?', 'The right fit matters more than any fit', 'Keep going'], 'Rejection is the universe saying: "Not this one. Something better is coming."', 'Rejection Reframe', 'Write about a past rejection that led to something better. Trust the process.'),
          createDay(3, 'Maintaining Momentum', 'Routine Refinement', '10 min', 'Refine your daily routine for sustained job search energy.', ['Review what\'s working', 'Adjust what\'s not', 'Ensure balance: search + self-care', 'Set weekly targets (not just daily)', 'Build in rewards'], 'Consistency beats intensity. Show up every day, even just a little.', 'Weekly Targets', 'Set 3 specific, achievable targets for this week.'),
          createDay(4, 'Network Nurturing', 'Relationship Building', '15 min', 'Deepen the professional relationships you\'ve been building.', ['Follow up with informational interview contacts', 'Share helpful articles with your network', 'Congratulate others on their wins', 'Offer to help someone', 'Stay visible and valuable'], 'Relationships built during hard times are often the strongest.', 'Give First', 'Help someone in your network today—share a resource, make an introduction.'),
          createDay(5, 'Celebrating Progress', 'Win Collection', '10 min', 'Celebrate everything you\'ve accomplished in 6 weeks.', ['Count interviews, applications, connections', 'Note skills learned', 'Acknowledge personal growth', 'Write yourself a congratulations letter', 'You\'ve done remarkable work'], 'Six weeks ago you were in shock. Look at you now—organized, prepared, resilient.', 'Victory Lap', 'Share your progress with your support system. Let them celebrate you.'),
          createDay(6, 'Ongoing Strategy', 'Sustainability Plan', '10 min', 'Create a sustainable plan for continuing your search.', ['What daily habits will you maintain?', 'Who will hold you accountable?', 'How will you manage stress?', 'When will you reassess your strategy?', 'What\'s your Plan B and Plan C?'], 'The search continues, but you\'re now searching from a place of strength.', 'Strategy Document', 'Write your ongoing job search strategy with weekly milestones.'),
          createDay(7, 'Program Completion', 'Closing Ceremony', '15 min', 'Honor your journey and step into your future with confidence.', ['Read your Day 1 journal entry', 'Compare it to who you are now', 'Write a mission statement for your career', 'Set 3 goals for the next 30 days', 'Celebrate this completion'], 'You didn\'t just survive job loss. You transformed it into fuel for your future.', 'Launch Statement', 'Write a personal mission statement for the next chapter of your career.'),
        ]
      },
    ]
  },

  'new-parent': {
    slug: 'new-parent',
    weeks: generateGenericProgram('New Parent Journey', [
      { title: 'Preparing Your Mind', desc: 'Mental and emotional preparation for the new arrival.' },
      { title: 'Self-Care as a Parent', desc: 'Maintaining your wellbeing while caring for a baby.' },
      { title: 'Strengthening Your Partnership', desc: 'Keeping your relationship strong during transition.' },
      { title: 'Building Daily Routines', desc: 'Creating sustainable patterns for your new life.' },
      { title: 'Managing Parenting Stress', desc: 'Coping strategies for the unique pressures of parenthood.' },
      { title: 'Finding Your Village', desc: 'Building your support community as a new parent.' },
    ])
  },

  'retirement': {
    slug: 'retirement',
    weeks: generateGenericProgram('Retirement Transition', [
      { title: 'Identity Beyond Work', desc: 'Exploring who you are outside your career.' },
      { title: 'Creating Daily Purpose', desc: 'Finding meaningful activities and routines.' },
      { title: 'Social Connections', desc: 'Maintaining and building relationships in retirement.' },
      { title: 'Health & Wellness Focus', desc: 'Prioritizing physical and mental health.' },
      { title: 'Financial Peace of Mind', desc: 'Managing finances with confidence.' },
      { title: 'Embracing the Journey', desc: 'Living your best retirement life.' },
    ])
  },

  'chronic-illness': {
    slug: 'chronic-illness',
    weeks: generateGenericProgram('Living with Chronic Illness', [
      { title: 'Acceptance & Adjustment', desc: 'Coming to terms with your diagnosis.' },
      { title: 'Energy Management', desc: 'Pacing yourself and setting boundaries.' },
      { title: 'Communication & Advocacy', desc: 'Talking to loved ones and healthcare providers.' },
      { title: 'Mental Wellness', desc: 'Addressing anxiety and depression alongside illness.' },
      { title: 'Building Your Support Team', desc: 'Finding community and resources.' },
      { title: 'Living Fully', desc: 'Finding joy and purpose with your condition.' },
    ])
  },
};

// Helper to generate daily content for programs with less detailed content
function generateGenericProgram(programName: string, weeks: { title: string; desc: string }[]): WeekContent[] {
  const exercises = [
    { name: 'Mindful Breathing', duration: '10 min', steps: ['Find a quiet, comfortable space and set a timer for 10 minutes', 'Close your eyes and take 3 deep, slow breaths to settle in', 'Inhale for 4 counts, hold for 4, exhale for 6—repeat 10 times', 'Notice any thoughts arising without judgment, returning focus to breath', 'Scan your body for tension and send each exhale to release it', 'For the remaining time, breathe naturally while observing your inner state', 'End by placing a hand on your heart and setting an intention for the day'] },
    { name: 'Body Scan Meditation', duration: '12 min', steps: ['Lie down or sit comfortably. Close your eyes and take 5 deep breaths', 'Starting at the crown of your head, notice any sensations—pressure, warmth, tingling', 'Move attention slowly through your face, jaw (release clenching), neck, and shoulders', 'Scan down through your arms to your fingertips, noticing temperature and tension', 'Continue through your chest and belly—observe your breathing from this vantage point', 'Move through your hips, legs, and all the way to your toes', 'Return awareness to your whole body as one integrated system. Rest here for 2 minutes'] },
    { name: 'Gratitude & Meaning Practice', duration: '10 min', steps: ['Set a timer and begin by writing 5 things you\'re genuinely grateful for today', 'For each one, write WHY it matters to you—go deeper than the surface', 'Identify one person who contributed to your gratitude today', 'Write them a short mental or physical thank-you note', 'Reflect: How does this gratitude connect to the person you\'re becoming?', 'Close your eyes, hold the warmth of gratitude in your chest for 1 minute', 'Carry one gratitude intention into the rest of your day'] },
    { name: 'Gentle Movement & Stretching', duration: '12 min', steps: ['Stand with feet hip-width apart. Take 3 centering breaths', 'Slow neck rolls—5 each direction, feeling each vertebra', 'Shoulder shrugs—hold 10 seconds at the top, release with an exhale', 'Side body stretches—reach overhead and lean, hold 20 seconds each side', 'Forward fold—let your head hang, bend knees slightly, hold 30 seconds', 'Gentle spinal twists—seated or standing, hold 15 seconds each side', 'End in mountain pose or seated stillness for 2 minutes of integration'] },
    { name: 'Walking Meditation', duration: '15 min', steps: ['Choose a quiet path or even a room where you can walk slowly', 'Begin by standing still, feeling your weight on the earth through your feet', 'Walk at half your normal speed, feeling the heel-to-toe roll of each step', 'Count 10 steps, then pause. Notice 3 things you see around you', 'Resume walking. For the next 10 steps, focus entirely on sounds', 'Walk 10 more steps focusing on the feeling of air on your skin', 'Continue alternating senses for the remaining time. End standing still for 1 minute'] },
    { name: 'Expressive Journaling', duration: '15 min', steps: ['Set a timer for 15 minutes and gather your writing materials', 'Write your current emotional state in one sentence at the top', 'Begin writing freely—no editing, no crossing out, no judgment', 'If you get stuck, write "I\'m stuck because..." and keep going', 'Halfway through, pause and read what you\'ve written. Notice themes', 'Continue writing, this time responding to what emerged', 'End by circling one insight and writing one action step based on it'] },
    { name: 'Progressive Muscle Relaxation', duration: '12 min', steps: ['Lie down or sit comfortably. Close your eyes and take 5 deep breaths', 'Tense your feet tightly for 7 seconds, then release completely. Notice the difference', 'Move to calves, thighs, glutes—tensing each for 7 seconds, then fully releasing', 'Tense your stomach, chest, and back muscles. Hold, then melt', 'Make fists, tense your arms and shoulders. Hold, then let everything go', 'Scrunch your entire face tightly. Hold, then release with a sigh', 'Lie in complete relaxation for 3 minutes, scanning for any remaining tension'] },
  ];

  const encouragements = [
    'Every step forward, no matter how small, is progress worth celebrating. You chose to show up today—that matters enormously.',
    'You are doing something incredibly brave by showing up for yourself today. Most people never take this step.',
    'Healing isn\'t linear. Give yourself grace on the difficult days. They are part of the journey, not a departure from it.',
    'You have survived 100% of your worst days. That\'s an incredible track record of resilience.',
    'The fact that you\'re here, doing this work, shows tremendous strength. Many people wish they could do what you\'re doing right now.',
    'Be gentle with yourself. You\'re doing the best you can with what you have, and that is always enough.',
    'Growth happens in the quiet moments when you choose to keep going despite the difficulty. This is one of those moments.',
  ];

  const reflectionPromptSets = [
    ['What does this week\'s theme mean to you personally? Write freely for 5 minutes.', 'How has your relationship with this topic changed over time?', 'What would your life look like if you fully embraced this week\'s lesson?', 'Write a letter to yourself from one year in the future, looking back on this moment.'],
    ['What emotions came up during today\'s exercise? Name each one without judgment.', 'What resistance did you notice? What might it be protecting you from?', 'Describe a moment from today where you felt genuinely present.', 'What would you tell a friend going through the same experience?'],
    ['How does today\'s practice connect to a pattern in your life?', 'What is one belief about yourself that this work is challenging?', 'Write about a time you showed resilience in a similar situation.', 'What small victory can you celebrate from today, even if it seems insignificant?'],
    ['What part of today\'s lesson do you want to carry forward permanently?', 'How might applying today\'s insights improve one specific relationship?', 'Write about the gap between where you are and where you want to be. What bridges it?', 'If today were the first day of a new chapter, what would the opening paragraph say?'],
    ['What surprised you about today\'s practice? What did you expect vs. what happened?', 'Who in your life would benefit from hearing about your experience today?', 'What is one fear that this week\'s work is helping you face?', 'Describe your emotional landscape right now using a weather metaphor.'],
    ['How has your perspective on this topic shifted since the beginning of this program?', 'What tools or insights from today will you reach for during difficult moments?', 'Write about what self-compassion looks like for you at this stage of your journey.', 'What are you most proud of accomplishing this week?'],
    ['Looking back at this week, what was the most meaningful moment?', 'What would you like to remember most from this week\'s work?', 'How has your inner dialogue changed since beginning this program?', 'Set three intentions for the coming week that honor your growth.'],
  ];

  const deepDiveActivities = [
    { name: 'Values Clarification', steps: ['Write down 10 values that matter to you (e.g., authenticity, connection, growth, peace)', 'Rank them from most to least important in your current life', 'For your top 3, write a specific example of how you\'ve honored each this week', 'For your top 3, write one way you could honor them MORE deeply', 'Identify any conflicts between your values—which ones create tension?', 'Create a "values compass" statement: "I am guided by... because..."', 'Commit to one value-aligned action for tomorrow'] },
    { name: 'Emotional Mapping', steps: ['Draw a simple timeline of your past 24 hours', 'Above the line, note positive emotions at the times they occurred', 'Below the line, note challenging emotions at the times they occurred', 'Look for patterns: What triggered shifts? What sustained good feelings?', 'Identify your emotional "default"—where do you spend most of your time?', 'Choose one challenging emotion and write what it\'s trying to tell you', 'Design one "emotional reset" technique you\'ll try when overwhelmed'] },
    { name: 'Future Self Dialogue', steps: ['Close your eyes and imagine yourself 5 years from now, thriving', 'What does your future self look like? Where are they? Who is with them?', 'Write a conversation between your current self and future self', 'Ask your future self: "What should I focus on right now?"', 'Ask: "What should I let go of?"', 'Ask: "What gave you the strength to get where you are?"', 'Write one insight from this dialogue as a reminder on your phone'] },
    { name: 'Boundary Exploration', steps: ['List 5 situations where you feel your energy being drained', 'For each, identify what boundary is being crossed', 'Write the ideal boundary statement for each: "I need... because..."', 'Practice saying one boundary statement out loud 3 times', 'Identify what fears come up when you think about setting boundaries', 'Write a counter-thought for each fear', 'Choose one boundary to honor this week and plan specifically how'] },
    { name: 'Strength Mining', steps: ['Write about 3 difficult situations you navigated in the past year', 'For each, identify what personal strengths helped you cope', 'Ask yourself: Are these strengths I recognize and value in myself?', 'Write about a strength someone else sees in you that you dismiss', 'How might owning this strength change how you approach current challenges?', 'Create a "strength statement" you can read when self-doubt creeps in', 'Share one strength discovery with someone you trust today'] },
    { name: 'Compassion Practice', steps: ['Think of someone you care about who is struggling right now', 'Write what you would say to comfort and encourage them', 'Now read those same words back to yourself—slowly and deliberately', 'Notice any resistance to receiving your own compassion. Name it', 'Write: "I deserve the same kindness I give to others because..."', 'Place your hand on your heart and repeat your compassion statement 3 times', 'Commit to speaking to yourself with compassion for the rest of today'] },
    { name: 'Integration & Synthesis', steps: ['Review your notes and reflections from this week', 'Identify the 3 most important insights or breakthroughs', 'For each insight, write a specific action step to integrate it into daily life', 'Create a "Weekly Wisdom" summary in one paragraph', 'Identify what still feels unresolved—write it down without trying to solve it', 'Set 3 specific, measurable intentions for next week', 'End by writing one thing you want to celebrate about your effort this week'] },
  ];

  return weeks.map((week, weekIndex) => ({
    week: weekIndex + 1,
    title: week.title,
    description: week.desc,
    days: Array.from({ length: 7 }, (_, dayIndex) => {
      const exercise = exercises[(weekIndex * 7 + dayIndex) % exercises.length];
      const dayTitles = ['Foundation', 'Deepening', 'Practice', 'Integration', 'Connection', 'Growth', 'Reflection'];
      const reflectionPrompts = reflectionPromptSets[dayIndex % reflectionPromptSets.length];
      const deepDive = deepDiveActivities[dayIndex % deepDiveActivities.length];

      return {
        day: dayIndex + 1,
        title: `${dayTitles[dayIndex]}: ${week.title}`,
        exercise: {
          name: exercise.name,
          duration: exercise.duration,
          description: `A ${exercise.name.toLowerCase()} practice to support your ${week.title.toLowerCase()} journey.`,
          steps: exercise.steps,
        },
        encouragement: encouragements[(weekIndex * 7 + dayIndex) % encouragements.length],
        task: {
          name: `Daily Practice: ${week.title}`,
          description: `Spend 5-10 minutes applying today\'s lesson to ${week.title.toLowerCase()}. Write one key takeaway and one action step you will take in the next 24 hours.`,
        },
        reflection: {
          name: 'Guided Reflection',
          duration: '10 min',
          prompts: reflectionPrompts,
        },
        deepDive: {
          name: deepDive.name,
          duration: '10 min',
          description: `A deeper exploration connecting ${week.title.toLowerCase()} with self-awareness and personal growth.`,
          steps: deepDive.steps,
        },
      };
    }),
  }));
}

// Enrich every day in every program with reflection and deepDive if not already present
function enrichDay(day: DayContent, weekTitle: string): DayContent {
  if (day.reflection && day.deepDive) return day;

  const reflectionPromptsByTheme: string[] = [
    `Sit quietly for a moment after completing today's exercise ("${day.exercise.name}"). What emotions, memories, or insights surfaced? Write freely for 5 minutes without editing.`,
    `How does today's theme of "${day.title}" connect to patterns in your life? Are there recurring feelings or situations this brings up?`,
    `Imagine explaining today's experience to someone who deeply cares about you. What would you want them to understand about where you are right now?`,
    `What is one thing you discovered about yourself through today's practice that you didn't expect? How might this change how you move through tomorrow?`,
  ];

  const deepDiveSteps: string[] = [
    `Find a comfortable, quiet space and set a timer for 10 minutes`,
    `Begin by rereading or recalling the core of today's exercise: "${day.exercise.description}"`,
    `Close your eyes and take 5 slow breaths. With each exhale, release one worry or distraction`,
    `Visualize yourself fully embodying today's lesson—what does that look like in your daily life? Be specific about one situation`,
    `Notice any resistance, doubt, or fear that arises. Instead of pushing it away, write it down and ask: "What are you trying to protect me from?"`,
    `Write a specific, actionable commitment related to today's theme. Start with: "Tomorrow I will..."`,
    `Read your commitment aloud, take 3 more deep breaths, and close by placing your hand over your heart for 30 seconds`,
  ];

  return {
    ...day,
    reflection: day.reflection || {
      name: 'Guided Reflection',
      duration: '10 min',
      prompts: reflectionPromptsByTheme,
    },
    deepDive: day.deepDive || {
      name: `Deep Dive: ${weekTitle}`,
      duration: '10 min',
      description: `A deeper, contemplative practice building on today's exercise to strengthen understanding of ${weekTitle.toLowerCase()}.`,
      steps: deepDiveSteps,
    },
  };
}

// Apply enrichment to all programs
const enrichedProgramContent: Record<string, ProgramContent> = {};
for (const [key, program] of Object.entries(rawProgramContent)) {
  enrichedProgramContent[key] = {
    ...program,
    weeks: program.weeks.map(week => ({
      ...week,
      days: week.days.map(day => enrichDay(day, week.title)),
    })),
  };
}

export const programContent = enrichedProgramContent;
export default enrichedProgramContent;
