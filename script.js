/* ============================================
   VICE BREAKER - script.js
   Vanilla JS SPA — no frameworks
   ============================================ */

// ========== CONSTANTS ==========

const VICE_EMOJI = {
  smoking: '\u{1F525}', vaping: '\u2601\uFE0F', alcohol: '\u{1F377}',
  gambling: '\u{1F3B2}', drugs: '\u{1F48A}', sugar: '\u{1F368}',
  caffeine: '\u2615', social_media: '\u{1F4F1}', pornography: '\u{1F648}',
  general: '\u{1F6E1}\uFE0F', other: '\u2B55'
};

const VICE_CATALOG = [
  { id: 'smoking', label: 'Smoking', color: '#EF4444', healthMilestones: [
    { id:'sm1', title:'Blood pressure drops', description:'Your blood pressure and pulse rate begin to return to normal.', hoursAfterQuit:0.33, source:'American Heart Association' },
    { id:'sm2', title:'Carbon monoxide normalizes', description:'Carbon monoxide levels in your blood drop to normal.', hoursAfterQuit:12, source:'CDC' },
    { id:'sm3', title:'Heart attack risk drops', description:'Your risk of heart attack begins to decrease.', hoursAfterQuit:24, source:'American Heart Association' },
    { id:'sm4', title:'Nerve endings regenerate', description:'Nerve endings start to regrow, improving taste and smell.', hoursAfterQuit:48, source:'American Cancer Society' },
    { id:'sm5', title:'Breathing improves', description:'Lung function begins to improve. Walking becomes easier.', hoursAfterQuit:336, source:'American Lung Association' },
    { id:'sm6', title:'Circulation improves', description:'Your circulation has significantly improved.', hoursAfterQuit:720, source:'NHS' },
    { id:'sm7', title:'Coughing decreases', description:'Cilia in your lungs have recovered, reducing coughing and shortness of breath.', hoursAfterQuit:2160, source:'American Lung Association' },
    { id:'sm8', title:'Heart disease risk halved', description:'Your risk of coronary heart disease is half that of a smoker.', hoursAfterQuit:8760, source:'WHO' },
    { id:'sm9', title:'Stroke risk normalized', description:'Your stroke risk drops to that of a non-smoker.', hoursAfterQuit:43800, source:'American Heart Association' },
    { id:'sm10', title:'Lung cancer risk halved', description:'Your risk of lung cancer is about half that of a continuing smoker.', hoursAfterQuit:87600, source:'American Cancer Society' },
  ]},
  { id: 'vaping', label: 'Vaping', color: '#8B5CF6', healthMilestones: [
    { id:'vp1', title:'Nicotine levels drop', description:'Nicotine levels in your blood start to decrease.', hoursAfterQuit:1, source:'CDC' },
    { id:'vp2', title:'Heart rate normalizes', description:'Your heart rate begins to return to normal.', hoursAfterQuit:24, source:'American Heart Association' },
    { id:'vp3', title:'Nicotine leaves body', description:'Nicotine is almost completely eliminated from your body.', hoursAfterQuit:72, source:'NHS' },
    { id:'vp4', title:'Lung function improves', description:'Your airways begin to relax and breathing becomes easier.', hoursAfterQuit:720, source:'American Lung Association' },
    { id:'vp5', title:'Circulation improves', description:'Blood flow and circulation are noticeably better.', hoursAfterQuit:2160, source:'NHS' },
  ]},
  { id: 'alcohol', label: 'Alcohol', color: '#F59E0B', healthMilestones: [
    { id:'al1', title:'Blood sugar stabilizes', description:'Your blood sugar levels begin to normalize.', hoursAfterQuit:24, source:'NIAAA' },
    { id:'al2', title:'Sleep improves', description:'Sleep quality begins to improve without alcohol disruption.', hoursAfterQuit:168, source:'Sleep Foundation' },
    { id:'al3', title:'Liver begins repair', description:'Your liver begins to reduce excess fat and inflammation.', hoursAfterQuit:720, source:'American Liver Foundation' },
    { id:'al4', title:'Blood pressure improves', description:'Blood pressure starts to drop to healthier levels.', hoursAfterQuit:720, source:'American Heart Association' },
    { id:'al5', title:'Immune system strengthens', description:'Your immune system is notably stronger.', hoursAfterQuit:2160, source:'NIAAA' },
    { id:'al6', title:'Liver fat reduced', description:'Liver fat can reduce by up to 15% or more.', hoursAfterQuit:4320, source:'American Liver Foundation' },
    { id:'al7', title:'Cancer risk decreasing', description:'Your risk of alcohol-related cancers starts to decrease.', hoursAfterQuit:8760, source:'WHO' },
  ]},
  { id: 'gambling', label: 'Gambling', color: '#10B981', healthMilestones: [
    { id:'gb1', title:'Stress response calms', description:'The acute stress and anxiety from gambling begins to subside.', hoursAfterQuit:72, source:'NCPG' },
    { id:'gb2', title:'Sleep patterns improve', description:'Your sleep quality improves without the anxiety of losses.', hoursAfterQuit:168, source:'NCPG' },
    { id:'gb3', title:'Financial clarity', description:'You begin to regain control of your financial situation.', hoursAfterQuit:720, source:'GamCare' },
    { id:'gb4', title:'Relationships strengthen', description:'Trust and relationships begin to rebuild.', hoursAfterQuit:2160, source:'NCPG' },
    { id:'gb5', title:'Brain reward pathways heal', description:"Your brain's reward system starts returning to normal function.", hoursAfterQuit:4320, source:'NCPG' },
  ]},
  { id: 'drugs', label: 'Substances', color: '#EC4899', healthMilestones: [
    { id:'dr1', title:'Acute withdrawal passes', description:'The most intense physical withdrawal symptoms begin to ease.', hoursAfterQuit:168, source:'SAMHSA' },
    { id:'dr2', title:'Sleep improving', description:'Natural sleep patterns begin to re-establish.', hoursAfterQuit:720, source:'NIDA' },
    { id:'dr3', title:'Brain chemistry healing', description:'Neurotransmitter levels begin to rebalance.', hoursAfterQuit:2160, source:'NIDA' },
    { id:'dr4', title:'Cognitive function returns', description:'Memory, focus, and decision-making improve significantly.', hoursAfterQuit:4320, source:'NIDA' },
    { id:'dr5', title:'Emotional stability', description:'Your emotional regulation is much stronger.', hoursAfterQuit:8760, source:'SAMHSA' },
  ]},
  { id: 'sugar', label: 'Sugar', color: '#F472B6', healthMilestones: [
    { id:'su1', title:'Blood sugar stabilizes', description:'Your blood sugar levels become more stable.', hoursAfterQuit:48, source:'ADA' },
    { id:'su2', title:'Cravings reduce', description:'Sugar cravings begin to significantly diminish.', hoursAfterQuit:168, source:'Harvard Health' },
    { id:'su3', title:'Energy levels stabilize', description:'No more energy crashes \u2014 sustained energy throughout the day.', hoursAfterQuit:336, source:'Harvard Health' },
    { id:'su4', title:'Skin improves', description:'Reduced inflammation leads to clearer skin.', hoursAfterQuit:720, source:'AAD' },
    { id:'su5', title:'Taste buds reset', description:'Your taste buds become more sensitive \u2014 food tastes better.', hoursAfterQuit:720, source:'Harvard Health' },
  ]},
  { id: 'caffeine', label: 'Caffeine', color: '#78350F', healthMilestones: [
    { id:'ca1', title:'Withdrawal peaks', description:'Headaches and fatigue peak but will soon pass.', hoursAfterQuit:48, source:'Johns Hopkins' },
    { id:'ca2', title:'Sleep quality improves', description:'You fall asleep faster and sleep more deeply.', hoursAfterQuit:168, source:'Sleep Foundation' },
    { id:'ca3', title:'Anxiety decreases', description:'Baseline anxiety levels drop noticeably.', hoursAfterQuit:336, source:'Johns Hopkins' },
    { id:'ca4', title:'Blood pressure normalizes', description:'Blood pressure settles to a lower, healthier baseline.', hoursAfterQuit:720, source:'Mayo Clinic' },
    { id:'ca5', title:'Natural energy restored', description:'Your body produces energy naturally without caffeine dependency.', hoursAfterQuit:1440, source:'Johns Hopkins' },
  ]},
  { id: 'social_media', label: 'Social Media', color: '#3B82F6', healthMilestones: [
    { id:'so1', title:'FOMO fades', description:'The fear of missing out begins to weaken.', hoursAfterQuit:72, source:'APA' },
    { id:'so2', title:'Focus improves', description:'Your attention span and ability to concentrate improve.', hoursAfterQuit:168, source:'APA' },
    { id:'so3', title:'Sleep quality improves', description:'Less blue light exposure improves melatonin production.', hoursAfterQuit:336, source:'Sleep Foundation' },
    { id:'so4', title:'Self-esteem rises', description:'Less social comparison leads to improved self-image.', hoursAfterQuit:720, source:'APA' },
    { id:'so5', title:'Deeper connections', description:'Real-world relationships become richer and more meaningful.', hoursAfterQuit:2160, source:'APA' },
  ]},
  { id: 'pornography', label: 'Pornography', color: '#6366F1', healthMilestones: [
    { id:'po1', title:'Dopamine rebalancing begins', description:'Your brain starts to recalibrate its reward system.', hoursAfterQuit:168, source:'Your Brain on Porn' },
    { id:'po2', title:'Focus and motivation improve', description:'Mental clarity and drive begin to return.', hoursAfterQuit:336, source:'NCBI' },
    { id:'po3', title:'Emotional sensitivity returns', description:'Emotional depth and empathy increase.', hoursAfterQuit:720, source:'NCBI' },
    { id:'po4', title:'Relationship intimacy grows', description:'Real connections feel more fulfilling.', hoursAfterQuit:2160, source:'NCBI' },
  ]},
  { id: 'general', label: 'General', color: '#4ADE80', healthMilestones: [
    { id:'ge1', title:'First step taken', description:"You've made the decision to change. That takes courage.", hoursAfterQuit:0.01, source:'' },
    { id:'ge2', title:'Building new habits', description:'New neural pathways are forming with each day you stay strong.', hoursAfterQuit:168, source:'' },
    { id:'ge3', title:'Willpower strengthening', description:'Your self-control muscle is getting stronger every day.', hoursAfterQuit:720, source:'' },
    { id:'ge4', title:'New identity forming', description:"You're becoming the person you want to be.", hoursAfterQuit:2160, source:'' },
  ]},
  { id: 'other', label: 'Other', color: '#9CA3AF', healthMilestones: [
    { id:'ot1', title:'Journey started', description:'Every journey starts with a single step.', hoursAfterQuit:0.01, source:'' },
    { id:'ot2', title:'Habit loop breaking', description:'Your brain is rewiring itself away from the old habit.', hoursAfterQuit:168, source:'' },
    { id:'ot3', title:'New normal forming', description:'Life without this vice is becoming your new normal.', hoursAfterQuit:720, source:'' },
    { id:'ot4', title:'Transformation', description:"You're proving to yourself that you're stronger than your urges.", hoursAfterQuit:2160, source:'' },
  ]},
];

const PRESTIGE_TIERS = [
  { month:1, name:'Seedling', color:'#6B7280', description:'A small sprout breaks through the soil' },
  { month:2, name:'Bronze Garden', color:'#CD7F32', description:'Warm bronze leaves catch the light' },
  { month:3, name:'Iron Grove', color:'#71797E', description:'A sturdy sapling with dark metallic accents' },
  { month:4, name:'Silver Bloom', color:'#C0C0C0', description:'Silver-tipped flowers begin to bloom' },
  { month:5, name:'Emerald Canopy', color:'#50C878', description:'A lush emerald canopy glows with life' },
  { month:6, name:'Sapphire Oasis', color:'#0F52BA', description:'Crystal waters surround your sapphire garden' },
  { month:7, name:'Ruby Sanctuary', color:'#E0115F', description:'Deep crimson blooms create a warm sanctuary' },
  { month:8, name:'Amethyst Grove', color:'#9966CC', description:'A mystical purple forest comes alive' },
  { month:9, name:'Gold Garden', color:'#FFD700', description:'Golden leaves shimmer in warm light' },
  { month:10, name:'Platinum Forest', color:'#E5E4E2', description:'An elegant platinum landscape' },
  { month:11, name:'Diamond Realm', color:'#B9F2FF', description:'Crystalline trees sparkle with brilliance' },
  { month:12, name:'Obsidian Crown', color:'#1C1C1C', description:'The ultimate dark prestige achievement' },
  { month:13, name:'Celestial Dawn', color:'#FFE4B5', description:'A heavenly garden bathed in starlight' },
  { month:14, name:'Aurora Borealis', color:'#00CED1', description:'Northern lights dance above your garden' },
  { month:15, name:'Solar Flare', color:'#FF6347', description:'Blazing energy radiates from your grove' },
  { month:16, name:'Nebula Garden', color:'#9370DB', description:'Cosmic clouds swirl through your forest' },
  { month:17, name:'Void Blossom', color:'#2F4F4F', description:'Flowers bloom from the void itself' },
  { month:18, name:'Lunar Sanctuary', color:'#C0C0C0', description:'Moonlit serenity fills your garden' },
  { month:19, name:'Phoenix Grove', color:'#FF4500', description:'Eternal flames give rise to new life' },
  { month:20, name:'Crystal Infinity', color:'#E0FFFF', description:'An infinite crystalline paradise' },
  { month:21, name:'Shadow Crown', color:'#36454F', description:'Dark elegance at its finest' },
  { month:22, name:'Supernova', color:'#FFD700', description:'Explosive brilliance illuminates everything' },
  { month:23, name:'Eternal Bloom', color:'#98FB98', description:'A garden that transcends time' },
  { month:24, name:'Mythic Realm', color:'#DDA0DD', description:'Legendary status \u2014 truly mythic' },
];

const MILESTONE_BADGES = [
  { id:'ms_1d', title:'First Day', description:'24 hours clean.', icon:'\u2600\uFE0F', type:'milestone', thresholdDays:1 },
  { id:'ms_3d', title:'Three Day Warrior', description:'72 hours strong.', icon:'\u26A1', type:'milestone', thresholdDays:3 },
  { id:'ms_1w', title:'One Week Strong', description:'A full week!', icon:'\u{1F6E1}\uFE0F', type:'milestone', thresholdDays:7 },
  { id:'ms_2w', title:'Two Week Titan', description:'14 days. New habits forming.', icon:'\u{1F33F}', type:'milestone', thresholdDays:14 },
  { id:'ms_1m', title:'One Month Legend', description:'30 days. Cycle broken.', icon:'\u{1F3C6}', type:'milestone', thresholdDays:30 },
  { id:'ms_2m', title:'Two Month Hero', description:'60 days of strength.', icon:'\u2B50', type:'milestone', thresholdDays:60 },
  { id:'ms_3m', title:'Quarter Year Champion', description:'90 days. A full season.', icon:'\u{1F396}\uFE0F', type:'milestone', thresholdDays:90 },
  { id:'ms_6m', title:'Half Year Master', description:'180 days. Brain rewired.', icon:'\u{1F48E}', type:'milestone', thresholdDays:180 },
  { id:'ms_1y', title:'One Year Unstoppable', description:'365 days. Transformed.', icon:'\u{1FA90}', type:'milestone', thresholdDays:365 },
  { id:'ms_2y', title:'Two Year Veteran', description:'Two years free.', icon:'\u{1F680}', type:'milestone', thresholdDays:730 },
  { id:'ms_3y', title:'Three Year Legend', description:'This is who you are.', icon:'\u267E\uFE0F', type:'milestone', thresholdDays:1095 },
  { id:'ms_5y', title:'Five Year Immortal', description:'Half a decade. Extraordinary.', icon:'\u2728', type:'milestone', thresholdDays:1825 },
];

const WEEKLY_BADGES = Array.from({ length: 52 }, (_, i) => ({
  id: `wk_${i+1}`, title: `Week ${i+1}`, description: `${i+1} week${i>0?'s':''} of progress.`,
  icon: '\u2705', type: 'weekly', thresholdDays: (i+1)*7
}));

const ALL_BADGES = [...MILESTONE_BADGES, ...WEEKLY_BADGES].sort((a,b) => a.thresholdDays - b.thresholdDays);

const MOTIVATIONAL_QUOTES = [
  { text:"The secret of getting ahead is getting started.", author:"Mark Twain" },
  { text:"It does not matter how slowly you go as long as you do not stop.", author:"Confucius" },
  { text:"Strength does not come from winning. Your struggles develop your strengths.", author:"Arnold Schwarzenegger" },
  { text:"Fall seven times, stand up eight.", author:"Japanese Proverb" },
  { text:"The only person you are destined to become is the person you decide to be.", author:"Ralph Waldo Emerson" },
  { text:"You are not your addiction. You are the person who overcomes it.", author:"Unknown" },
  { text:"Recovery is not for people who need it. It's for people who want it.", author:"Unknown" },
  { text:"One day at a time. One hour at a time. One minute at a time.", author:"Unknown" },
  { text:"The best time to plant a tree was 20 years ago. The second best time is now.", author:"Chinese Proverb" },
  { text:"You don't have to see the whole staircase, just take the first step.", author:"Martin Luther King Jr." },
  { text:"What lies behind us and what lies before us are tiny matters compared to what lies within us.", author:"Ralph Waldo Emerson" },
  { text:"Every moment is a fresh beginning.", author:"T.S. Eliot" },
  { text:"Believe you can and you're halfway there.", author:"Theodore Roosevelt" },
  { text:"The greatest glory in living lies not in never falling, but in rising every time we fall.", author:"Nelson Mandela" },
  { text:"Courage isn't having the strength to go on \u2014 it is going on when you don't have strength.", author:"Napoleon Bonaparte" },
  { text:"Your present circumstances don't determine where you can go; they merely determine where you start.", author:"Nido Qubein" },
  { text:"It always seems impossible until it's done.", author:"Nelson Mandela" },
  { text:"The pain you feel today will be the strength you feel tomorrow.", author:"Unknown" },
  { text:"You are braver than you believe, stronger than you seem, and smarter than you think.", author:"A.A. Milne" },
  { text:"Don't let yesterday take up too much of today.", author:"Will Rogers" },
  { text:"Success is the sum of small efforts, repeated day in and day out.", author:"Robert Collier" },
  { text:"This craving is temporary. Your freedom is permanent.", author:"Unknown" },
  { text:"You've already survived 100% of your worst days.", author:"Unknown" },
  { text:"Progress, not perfection.", author:"Unknown" },
  { text:"The chains of habit are too light to be felt until they are too heavy to be broken.", author:"Warren Buffett" },
  { text:"Rock bottom became the solid foundation on which I rebuilt my life.", author:"J.K. Rowling" },
  { text:"I am not what happened to me. I am what I choose to become.", author:"Carl Jung" },
  { text:"Change is hard at first, messy in the middle, and gorgeous at the end.", author:"Robin Sharma" },
  { text:"The only way out is through.", author:"Robert Frost" },
  { text:"You were never created to live depressed, defeated, guilty, condemned, or unworthy.", author:"Joel Osteen" },
  { text:"Every strike brings me closer to the next home run.", author:"Babe Ruth" },
  { text:"What we achieve inwardly will change outer reality.", author:"Plutarch" },
  { text:"Sobriety is a journey, not a destination.", author:"Unknown" },
  { text:"The first step toward change is awareness. The second step is acceptance.", author:"Nathaniel Branden" },
  { text:"You don't drown by falling in the water; you drown by staying there.", author:"Edwin Louis Cole" },
  { text:"Nothing is impossible. The word itself says I'm possible.", author:"Audrey Hepburn" },
  { text:"Addiction is the only prison where the locks are on the inside.", author:"Unknown" },
  { text:"Recovery is something that you have to work on every single day.", author:"Demi Lovato" },
  { text:"The comeback is always stronger than the setback.", author:"Unknown" },
  { text:"Hardships often prepare ordinary people for an extraordinary destiny.", author:"C.S. Lewis" },
  { text:"You may have to fight a battle more than once to win it.", author:"Margaret Thatcher" },
  { text:"Our greatest weakness lies in giving up. The most certain way to succeed is to try just one more time.", author:"Thomas Edison" },
  { text:"When everything seems to be going against you, remember that the airplane takes off against the wind.", author:"Henry Ford" },
  { text:"With the new day comes new strength and new thoughts.", author:"Eleanor Roosevelt" },
  { text:"Stars can't shine without darkness.", author:"Unknown" },
  { text:"You are allowed to be both a masterpiece and a work in progress simultaneously.", author:"Sophia Bush" },
  { text:"Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author:"Roy T. Bennett" },
  { text:"Tough times never last, but tough people do.", author:"Robert H. Schuller" },
  { text:"The man who moves a mountain begins by carrying away small stones.", author:"Confucius" },
  { text:"Healing is not linear.", author:"Unknown" },
  { text:"You were given this life because you are strong enough to live it.", author:"Unknown" },
  { text:"No matter how hard the past, you can always begin again.", author:"Buddha" },
  { text:"Sometimes the smallest step in the right direction ends up being the biggest step of your life.", author:"Naeem Callaway" },
  { text:"Be patient with yourself. Self-growth is tender; it's holy ground.", author:"Stephen Covey" },
  { text:"We cannot solve our problems with the same thinking we used when we created them.", author:"Albert Einstein" },
  { text:"The only impossible journey is the one you never begin.", author:"Tony Robbins" },
  { text:"Strength grows in the moments when you think you can't go on but you keep going anyway.", author:"Unknown" },
  { text:"Broken crayons still color.", author:"Shelley Hitz" },
  { text:"I understood myself only after I destroyed myself. And only in the process of fixing myself did I know who I really was.", author:"Sade Andria Zabala" },
  { text:"Don't count the days. Make the days count.", author:"Muhammad Ali" },
  { text:"When you get into a tight place and everything goes against you, never give up, for that is just the time the tide will turn.", author:"Harriet Beecher Stowe" },
  { text:"Your addiction is not your identity. Your recovery is your superpower.", author:"Unknown" },
  { text:"Freedom is what you do with what's been done to you.", author:"Jean-Paul Sartre" },
  { text:"Out of suffering have emerged the strongest souls.", author:"Kahlil Gibran" },
  { text:"The only person who can pull me down is myself, and I'm not going to let myself pull me down anymore.", author:"C. JoyBell C." },
  { text:"There is no shame in beginning again, for you get a chance to build bigger and better than before.", author:"Leon Brown" },
  { text:"A river cuts through rock not because of its power, but because of its persistence.", author:"Jim Watkins" },
  { text:"When tempted, remember: every time you resist, you become stronger.", author:"Unknown" },
  { text:"Addiction begins with the hope that something out there can instantly fill the emptiness inside.", author:"Jean Kilbourne" },
  { text:"The greatest revenge is massive success over the things that once held you captive.", author:"Unknown" },
  { text:"People often say that motivation doesn't last. Neither does bathing. That's why we recommend it daily.", author:"Zig Ziglar" },
  { text:"Just because today is a terrible day doesn't mean tomorrow won't be the best day of your life.", author:"Unknown" },
  { text:"Discipline is choosing between what you want now and what you want most.", author:"Abraham Lincoln" },
  { text:"Every day in every way, I'm getting better and better.", author:"\u00C9mile Cou\u00E9" },
  { text:"Your life does not get better by chance, it gets better by change.", author:"Jim Rohn" },
  { text:"I am stronger than my addiction, and today I choose freedom.", author:"Unknown" },
  { text:"Relapse is not the end of recovery. Giving up is.", author:"Unknown" },
  { text:"The strongest people aren't those who show strength in front of us, but those who fight battles we know nothing about.", author:"Unknown" },
  { text:"You can't go back and change the beginning, but you can start where you are and change the ending.", author:"C.S. Lewis" },
  { text:"Recovery is an acceptance that your life is in shambles and you have to change it.", author:"Jamie Lee Curtis" },
  { text:"Life has a way of testing a person's will, either by having nothing happen at all or by having everything happen at once.", author:"Paulo Coelho" },
  { text:"The best view comes after the hardest climb.", author:"Unknown" },
  { text:"You are confined only by the walls you build yourself.", author:"Andrew Murphy" },
  { text:"Inhale courage, exhale fear.", author:"Unknown" },
  { text:"One small positive thought in the morning can change your whole day.", author:"Dalai Lama" },
  { text:"Do something today that your future self will thank you for.", author:"Sean Patrick Flanery" },
  { text:"Sometimes you don't realize your own strength until you come face to face with your greatest weakness.", author:"Susan Gale" },
  { text:"The struggle you're in today is developing the strength you need for tomorrow.", author:"Robert Tew" },
  { text:"Be gentle with yourself. You're doing the best you can.", author:"Unknown" },
  { text:"Difficult roads often lead to beautiful destinations.", author:"Zig Ziglar" },
  { text:"Don't let a bad day make you feel like you have a bad life.", author:"Unknown" },
  { text:"The moment you're ready to quit is usually the moment right before the miracle happens.", author:"Unknown" },
  { text:"What consumes your mind controls your life. Choose wisely.", author:"Unknown" },
  { text:"Sobriety was the greatest gift I ever gave myself.", author:"Rob Lowe" },
  { text:"Today I will do what others won't, so tomorrow I can do what others can't.", author:"Jerry Rice" },
  { text:"Quitting is not giving something up. It's letting go of something toxic.", author:"Unknown" },
  { text:"The only limit to our realization of tomorrow is our doubts of today.", author:"Franklin D. Roosevelt" },
  { text:"In the middle of difficulty lies opportunity.", author:"Albert Einstein" },
  { text:"You have survived every bad day so far. You're doing great.", author:"Unknown" },
];

const COMMON_TRIGGERS = [
  { id:'stress', label:'Stress', icon:'\u26A1' },
  { id:'boredom', label:'Boredom', icon:'\u23F0' },
  { id:'social', label:'Social pressure', icon:'\u{1F465}' },
  { id:'loneliness', label:'Loneliness', icon:'\u{1F464}' },
  { id:'anxiety', label:'Anxiety', icon:'\u26A0\uFE0F' },
  { id:'celebration', label:'Celebration', icon:'\u2728' },
  { id:'sadness', label:'Sadness', icon:'\u{1F614}' },
  { id:'anger', label:'Anger', icon:'\u{1F525}' },
  { id:'habit', label:'Habit/routine', icon:'\u{1F504}' },
  { id:'tiredness', label:'Tiredness', icon:'\u{1F319}' },
  { id:'hunger', label:'Hunger', icon:'\u{1F37D}\uFE0F' },
  { id:'environment', label:'Environment', icon:'\u{1F4CD}' },
];

const GENERAL_COPING = [
  { category:'Grounding Techniques', strategies:[
    { title:'5-4-3-2-1 Sensory Exercise', description:'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.', icon:'\u270B' },
    { title:'Cold Water Reset', description:'Run cold water over your wrists for 30 seconds. The temperature change disrupts the craving circuit.', icon:'\u{1F4A7}' },
    { title:'Body Scan', description:'Close your eyes. Slowly move your attention from your toes to the top of your head.', icon:'\u{1F9D8}' },
  ]},
  { category:'Cognitive Reframing', strategies:[
    { title:'The 15-Minute Rule', description:"This craving will pass in 15-20 minutes. Set a timer. Every craving you've survived has ended.", icon:'\u23F1\uFE0F' },
    { title:'Think Past the Moment', description:"Fast-forward to how you'll feel in 1 hour if you give in versus if you stay strong.", icon:'\u27A1\uFE0F' },
    { title:'Remember Your Why', description:"Why did you start this journey? Close your eyes and connect with that reason.", icon:'\u2764\uFE0F' },
  ]},
  { category:'Physical Alternatives', strategies:[
    { title:'Quick Movement', description:'Do 20 jumping jacks, 10 push-ups, or a brisk 5-minute walk.', icon:'\u{1F3CB}\uFE0F' },
    { title:'Stretch It Out', description:'Stand up and do a full-body stretch. Reach high, touch your toes, roll your shoulders.', icon:'\u{1F9D8}' },
    { title:'Change Your Environment', description:'Physically move to a different room or go outside. Break the environmental cue.', icon:'\u{1F6B6}' },
  ]},
];

const VICE_SPECIFIC_COPING = {
  smoking: { category:'For Smoking Cravings', strategies:[
    { title:'Keep Your Hands Busy', description:'Hold a pen, squeeze a stress ball, or fidget with something.', icon:'\u270B' },
    { title:'Chew or Sip', description:'Chew gum, eat a crunchy snack, or sip ice water through a straw.', icon:'\u{1F95C}' },
    { title:'Delay and Distract', description:"Tell yourself 'I'll wait 10 more minutes.' Then find something to do.", icon:'\u231B' },
  ]},
  vaping: { category:'For Vaping Cravings', strategies:[
    { title:'Deep Breathing Mimicry', description:'Take a slow, deep breath as if inhaling \u2014 but just breathe clean air.', icon:'\u2601\uFE0F' },
    { title:'Flavor Replacement', description:'Suck on a strong mint or chew flavored gum.', icon:'\u{1F95C}' },
    { title:'Hands-Free Zone', description:'Put your hands in your pockets or hold a water bottle.', icon:'\u270B' },
  ]},
  alcohol: { category:'For Alcohol Cravings', strategies:[
    { title:'Change the Scene', description:"If you're near alcohol, move to a different room or leave.", icon:'\u{1F6B6}' },
    { title:'Play the Tape Forward', description:'Think past the first drink. Remember the morning after.', icon:'\u{1F3AC}' },
    { title:'Drink Something Else', description:'Pour yourself sparkling water with lime or hot tea.', icon:'\u2615' },
  ]},
  gambling: { category:'For Gambling Urges', strategies:[
    { title:'Block Access', description:'Delete betting apps, self-exclude from sites.', icon:'\u{1F512}' },
    { title:'Calculate the Cost', description:"Write down exactly how much you've lost. Really look at that number.", icon:'\u{1F4B0}' },
    { title:'Redirect the Thrill', description:'Try a competitive video game, a sport, or a challenging puzzle.', icon:'\u{1F3AE}' },
  ]},
  drugs: { category:'For Substance Cravings', strategies:[
    { title:'Call Someone Now', description:"Pick up the phone and call your sponsor, a friend, or a helpline.", icon:'\u{1F4DE}' },
    { title:'HALT Check', description:'Are you Hungry, Angry, Lonely, or Tired? Address the root need.', icon:'\u2753' },
    { title:'Safe Space', description:"Go somewhere you feel safe and can't access your substance.", icon:'\u{1F3E0}' },
  ]},
  sugar: { category:'For Sugar Cravings', strategies:[
    { title:'Eat Protein or Fat', description:'A handful of nuts, cheese, or a boiled egg.', icon:'\u{1F95C}' },
    { title:'Sweet Swap', description:'Eat a piece of fruit. Natural sweetness satisfies the craving.', icon:'\u{1F34E}' },
    { title:'Brush Your Teeth', description:'The mint flavor makes sweet things taste terrible.', icon:'\u2728' },
  ]},
  caffeine: { category:'For Caffeine Cravings', strategies:[
    { title:'Hydrate First', description:'Drink a full glass of cold water.', icon:'\u{1F4A7}' },
    { title:'Get Moving', description:'A short walk or light exercise is a natural energy booster.', icon:'\u{1F6B6}' },
    { title:'Herbal Alternative', description:'Try herbal tea or warm lemon water.', icon:'\u2615' },
  ]},
  social_media: { category:'For Social Media Urges', strategies:[
    { title:'Put the Phone Down', description:'Physically put your phone in another room.', icon:'\u{1F4F1}' },
    { title:'Replace the Scroll', description:'Open a book, start a podcast, or do something with your hands.', icon:'\u{1F4D6}' },
    { title:'Real Connection', description:'Text or call a real friend.', icon:'\u{1F4AC}' },
  ]},
  pornography: { category:'For Pornography Urges', strategies:[
    { title:'Leave the Room', description:'Get up and go somewhere public.', icon:'\u{1F6B6}' },
    { title:'Cold Shower', description:'The shock of cold water breaks the urge.', icon:'\u{1F4A7}' },
    { title:'Exercise Intensely', description:'Channel the energy into physical activity.', icon:'\u{1F3CB}\uFE0F' },
  ]},
};

// ========== UTILITIES ==========

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random()*16|0; return (c==='x'?r:(r&0x3|0x8)).toString(16);
  });
}

function formatDate(d) {
  const date = new Date(d);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatDateTime(d) {
  const date = new Date(d);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let h = date.getHours(), ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const min = String(date.getMinutes()).padStart(2,'0');
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${h}:${min} ${ampm}`;
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

const _sessionQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
function getDailyQuote() {
  return _sessionQuote;
}

function getViceConfig(id) { return VICE_CATALOG.find(v => v.id === id); }
function getPrestigeTier(months) {
  const m = Math.max(1, Math.min(months, PRESTIGE_TIERS.length));
  return PRESTIGE_TIERS[m-1];
}
function getGrowthEmoji(stage) { return ['\u{1F331}','\u{1F33F}','\u{1F33A}','\u{1F333}'][stage-1] || '\u{1F331}'; }
function getGrowthSize(stage) { return [80, 100, 130, 160][stage-1] || 80; }

function formatHoursLabel(hours) {
  if (hours < 1) return 'Within minutes';
  if (hours < 24) return `${Math.round(hours)} hour${hours!==1?'s':''}`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days!==1?'s':''}`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} month${months!==1?'s':''}`;
  const years = Math.round(days / 365);
  return `${years} year${years!==1?'s':''}`;
}

// ========== STATE MANAGEMENT ==========

function createStore(key, initial) {
  let state = { ...initial };
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Handle Zustand format migration
      state = { ...initial, ...(parsed.state || parsed) };
    } catch(e) {}
  }
  const listeners = new Set();
  return {
    get() { return state; },
    set(updater) {
      const next = typeof updater === 'function' ? updater(state) : updater;
      state = { ...state, ...next };
      localStorage.setItem(key, JSON.stringify(state));
      listeners.forEach(fn => fn(state));
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  };
}

const userStore = createStore('vice-breaker-user', {
  profile: { id:'', name:'', vices:[], onboardingComplete:false, createdAt:'' }
});

const streakStore = createStore('vice-breaker-streaks', { streaks: {} });
const gardenStore = createStore('vice-breaker-garden', { gardens: {} });
const journalStore = createStore('vice-breaker-journal', { checkIns:[], entries:[] });
const cravingStore = createStore('vice-breaker-cravings', { logs:[] });
const settingsStore = createStore('vice-breaker-settings', {
  settings: { notificationsEnabled:true, notificationTime:'09:00' }
});

let _quoteIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
function cycleQuote(dir) {
  _quoteIndex = (_quoteIndex + dir + MOTIVATIONAL_QUOTES.length) % MOTIVATIONAL_QUOTES.length;
  const q = MOTIVATIONAL_QUOTES[_quoteIndex];
  const textEl = document.getElementById('home-quote-text');
  const authEl = document.getElementById('home-quote-author');
  if (textEl) textEl.textContent = `"${q.text}"`;
  if (authEl) authEl.textContent = `\u2014 ${q.author}`;
}

// Store helpers
function getDaysClean(viceId) {
  const s = streakStore.get().streaks[viceId];
  if (!s?.quitDate) return 0;
  return Math.max(0, Math.floor((Date.now() - new Date(s.quitDate).getTime()) / 86400000));
}
function getHoursClean(viceId) {
  const s = streakStore.get().streaks[viceId];
  if (!s?.quitDate) return 0;
  return Math.max(0, Math.floor((Date.now() - new Date(s.quitDate).getTime()) / 3600000));
}
function getTotalSaved(viceId) {
  const s = streakStore.get().streaks[viceId];
  if (!s?.dailySpend) return 0;
  return getDaysClean(viceId) * s.dailySpend;
}

// ========== ROUTER ==========

let currentScreen = null;
let currentTab = 'home';
let selectedVice = null;
let counterInterval = null;
let breatheInterval = null;
let breatheStart = null;

function showScreen(id) {
  if (currentScreen) document.getElementById(currentScreen)?.classList.remove('active');
  currentScreen = id;
  document.getElementById(id)?.classList.add('active');
}

let previousTab = 'home';
function switchTab(tabId) {
  if (currentTab && currentTab !== tabId) previousTab = currentTab;
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.getElementById('tab-' + tabId)?.classList.add('active');
  currentTab = tabId;
  renderTab(tabId);
}

function renderTab(tabId) {
  const renderers = { home: renderHome, garden: renderGarden, journal: renderJournal, settings: renderSettings };
  renderers[tabId]?.();
  if (tabId === 'home') startLiveCounter(); else stopLiveCounter();
}

function openPanic() {
  const modal = document.getElementById('panic-modal');
  modal.classList.add('open');
  setTimeout(() => renderPanicMenu(), 50);
}

function closePanic() {
  document.getElementById('panic-modal').classList.remove('open');
  stopBreathe();
  document.querySelectorAll('.panic-screen').forEach(s => s.classList.remove('active'));
}

function showPanicScreen(id) {
  document.querySelectorAll('.panic-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

// ========== LIVE COUNTER ==========

function startLiveCounter() {
  stopLiveCounter();
  counterInterval = setInterval(updateCounter, 1000);
  updateCounter();
}
function stopLiveCounter() { if (counterInterval) { clearInterval(counterInterval); counterInterval = null; } }

function updateCounter() {
  const vice = selectedVice;
  const s = streakStore.get().streaks[vice];
  if (!s?.quitDate) return;
  const totalSec = Math.max(0, Math.floor((Date.now() - new Date(s.quitDate).getTime()) / 1000));
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const sec = totalSec % 60;
  const el = document.getElementById('counter-days');
  if (el) {
    el.textContent = d;
    document.getElementById('counter-hours').textContent = String(h).padStart(2,'0');
    document.getElementById('counter-minutes').textContent = String(m).padStart(2,'0');
    document.getElementById('counter-seconds').textContent = String(sec).padStart(2,'0');
  }
}

// ========== RENDERERS ==========

function renderHome() {
  const vices = userStore.get().profile.vices;
  if (!selectedVice || !vices.includes(selectedVice)) selectedVice = vices[0] || 'general';
  const vice = selectedVice;
  const streak = streakStore.get().streaks[vice];
  const hasStarted = !!streak?.quitDate;
  const config = getViceConfig(vice);
  const hoursClean = getHoursClean(vice);
  const totalSaved = getTotalSaved(vice);
  const daysClean = getDaysClean(vice);
  const quote = getDailyQuote();

  let html = `<div class="header-row"><h3>Vice Breaker</h3></div>`;

  // Vice selector
  if (vices.length > 1) {
    html += `<div class="vice-selector">`;
    vices.forEach(v => {
      const vc = getViceConfig(v);
      html += `<button class="vice-selector-item${v===vice?' active':''}" data-action="select-vice" data-vice="${v}">${VICE_EMOJI[v]||''} ${vc?.label||v}</button>`;
    });
    html += `</div>`;
  }

  if (hasStarted) {
    // Live counter
    html += `<div class="counter-container">
      <div class="counter-digits">
        <div class="counter-unit"><div class="value" id="counter-days" style="color:${config?.color||'var(--primary)'}">0</div><div class="label">Days</div></div>
        <div class="counter-sep">:</div>
        <div class="counter-unit"><div class="value" id="counter-hours">00</div><div class="label">Hrs</div></div>
        <div class="counter-sep">:</div>
        <div class="counter-unit"><div class="value" id="counter-minutes">00</div><div class="label">Min</div></div>
        <div class="counter-sep">:</div>
        <div class="counter-unit"><div class="value" id="counter-seconds">00</div><div class="label">Sec</div></div>
      </div>
    </div>`;

    // Ratio
    const firstQuit = streak.relapses?.length > 0 ? streak.relapses[0].previousQuitDate : streak.quitDate;
    const totalDays = Math.max(1, Math.floor((Date.now() - new Date(firstQuit).getTime()) / 86400000));
    if (totalDays > daysClean && totalDays > 1) {
      html += `<p class="text-center text-sm text-muted" style="margin-bottom:12px">${daysClean} of ${totalDays} days clean</p>`;
    }

    // Savings
    if (totalSaved > 0) {
      html += `<div class="savings-card"><div class="savings-amount">$${totalSaved.toFixed(2)}</div><div class="savings-label">Money saved</div></div>`;
    }

    // Health timeline
    if (config?.healthMilestones?.length) {
      html += `<div class="timeline"><div class="timeline-title">Health Timeline</div>`;
      config.healthMilestones.forEach(ms => {
        const achieved = hoursClean >= ms.hoursAfterQuit;
        html += `<div class="timeline-item">
          <div class="timeline-dot ${achieved?'achieved':'pending'}"></div>
          <div class="timeline-content">
            <div class="title">${ms.title}</div>
            <div class="desc">${ms.description}</div>
            <div class="time-label">${achieved?'\u2705 Achieved':formatHoursLabel(ms.hoursAfterQuit)}</div>
          </div>
        </div>`;
      });
      html += `</div>`;
    }
  } else {
    html += `<div class="start-container">
      <div class="start-icon-wrap">\u23F1\uFE0F</div>
      <h2>Ready to start?</h2>
      <p class="subtitle" style="margin:12px 0 24px;line-height:1.6">Tap the button below to begin your streak.<br>Every second counts.</p>
      <button class="btn btn-primary btn-lg btn-full" data-action="start-timer">Start My Timer</button>
    </div>`;
  }

  // Daily quote with arrows
  html += `<div class="quote-card">
    <button class="quote-arrow quote-arrow-left" data-action="quote-prev">&#8249;</button>
    <div class="quote-body"><div class="quote-text" id="home-quote-text">"${quote.text}"</div><div class="quote-author" id="home-quote-author">\u2014 ${quote.author}</div></div>
    <button class="quote-arrow quote-arrow-right" data-action="quote-next">&#8250;</button>
  </div>`;

  document.getElementById('tab-home').innerHTML = html;
  if (hasStarted) updateCounter();
}

function renderGarden() {
  const vices = userStore.get().profile.vices;
  if (!selectedVice || !vices.includes(selectedVice)) selectedVice = vices[0] || 'general';
  const vice = selectedVice;
  const daysClean = getDaysClean(vice);
  const monthsClean = Math.max(1, Math.ceil(daysClean / 30));
  const daysInMonth = daysClean % 30 || (daysClean > 0 ? 30 : 0);
  const growthStage = daysClean === 0 ? 1 : (daysInMonth <= 7 ? 1 : daysInMonth <= 14 ? 2 : daysInMonth <= 21 ? 3 : 4);
  const tier = getPrestigeTier(monthsClean);
  const garden = gardenStore.get().gardens[vice] || { badges: [] };
  const earnedIds = new Set(garden.badges.map(b => b.id));

  // Auto-unlock new badges
  const newBadges = ALL_BADGES.filter(b => b.thresholdDays <= daysClean && !earnedIds.has(b.id));
  if (newBadges.length > 0) {
    const updatedBadges = [...garden.badges, ...newBadges.map(b => ({...b, earnedAt: new Date().toISOString()}))];
    const gardens = { ...gardenStore.get().gardens };
    gardens[vice] = { ...garden, viceId: vice, badges: updatedBadges, growthStage, prestigeTier: monthsClean, currentMonth: monthsClean };
    gardenStore.set({ gardens });
  }

  const currentGarden = gardenStore.get().gardens[vice] || { badges: [] };
  const allEarnedIds = new Set(currentGarden.badges.map(b => b.id));

  let html = `<div class="header-row"><h3>Garden</h3></div>`;

  // Vice selector
  if (vices.length > 1) {
    html += `<div class="vice-selector">`;
    vices.forEach(v => {
      const vc = getViceConfig(v);
      html += `<button class="vice-selector-item${v===vice?' active':''}" data-action="select-vice" data-vice="${v}">${VICE_EMOJI[v]||''} ${vc?.label||v}</button>`;
    });
    html += `</div>`;
  }

  // Plant display
  html += `<div class="garden-display">
    <div class="plant-visual" style="font-size:${getGrowthSize(growthStage)}px;text-shadow:0 0 40px ${tier.color}">${getGrowthEmoji(growthStage)}${growthStage===4?' \u2728':''}</div>
    <div class="tier-name" style="color:${tier.color}">${tier.name}</div>
    <div class="tier-desc">${tier.description}</div>
  </div>`;

  // Progress bar
  const progress = daysClean === 0 ? 0 : Math.round((daysInMonth / 30) * 100);
  html += `<div class="garden-progress">
    <div class="garden-progress-label"><span>Month ${monthsClean} Progress</span><span>Day ${daysInMonth}/30</span></div>
    <div class="progress-bar"><div class="progress-fill" style="width:${progress}%;background:${tier.color}"></div></div>
  </div>`;

  // Next badge
  const nextBadge = ALL_BADGES.find(b => b.thresholdDays > daysClean);
  if (nextBadge) {
    const remaining = nextBadge.thresholdDays - daysClean;
    html += `<div class="next-badge-card">
      <div class="next-badge-icon">${nextBadge.icon}</div>
      <div class="next-badge-info"><div class="title">${nextBadge.title}</div><div class="desc">${remaining} day${remaining!==1?'s':''} to go</div></div>
    </div>`;
  }

  // Badge grid
  const visibleBadges = ALL_BADGES.slice(0, 20);
  html += `<div class="badge-section"><div class="badge-section-title">Badges</div><div class="badge-grid">`;
  visibleBadges.forEach(b => {
    const earned = allEarnedIds.has(b.id);
    html += `<div class="badge-item ${earned?'earned':'locked'}"><div class="badge-icon">${b.icon}</div><div class="badge-title">${b.title}</div></div>`;
  });
  html += `</div></div>`;

  document.getElementById('tab-garden').innerHTML = html;
}

function renderJournal() {
  const vices = userStore.get().profile.vices;
  if (!selectedVice || !vices.includes(selectedVice)) selectedVice = vices[0] || 'general';
  const vice = selectedVice;
  const today = todayStr();
  const todayCheckIn = journalStore.get().checkIns.find(c => c.date === today && c.viceId === vice);
  const entries = [...journalStore.get().entries].filter(e => !e.viceId || e.viceId === vice).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  let html = `<div class="header-row"><h3>Journal</h3><button class="btn btn-outline btn-sm" data-action="show-insights">\u{1F4CA} Insights</button></div>`;

  // Check-in card
  if (!todayCheckIn) {
    html += `<div class="checkin-card" id="checkin-form">
      <div class="checkin-title">Daily Check-in</div>
      <div class="section-label">How are you feeling?</div>
      <div class="mood-row">
        <button class="mood-btn" data-mood="1">\u{1F623}</button>
        <button class="mood-btn" data-mood="2">\u{1F614}</button>
        <button class="mood-btn" data-mood="3">\u{1F610}</button>
        <button class="mood-btn" data-mood="4">\u{1F642}</button>
        <button class="mood-btn" data-mood="5">\u{1F60A}</button>
      </div>
      <div class="section-label">Craving level</div>
      <div class="craving-dots">
        ${Array.from({length:11},(_, i) => `<div class="craving-dot" data-level="${i}">${i}</div>`).join('')}
      </div>
      <div class="section-label">Triggers</div>
      <div class="trigger-chips">
        ${COMMON_TRIGGERS.map(t => `<span class="chip" data-trigger="${t.id}">${t.icon} ${t.label}</span>`).join('')}
      </div>
      <button class="btn btn-primary btn-full mt-md" data-action="submit-checkin">Save Check-in</button>
    </div>`;
  } else {
    const moods = ['\u{1F623}','\u{1F614}','\u{1F610}','\u{1F642}','\u{1F60A}'];
    html += `<div class="card mb-md"><div class="flex-between">
      <span>\u2705 Checked in today</span>
      <span>${moods[todayCheckIn.mood-1]} Craving: ${todayCheckIn.cravingLevel}/10</span>
    </div></div>`;
  }

  // New entry
  html += `<div class="mb-md">
    <div class="section-label">Write a journal entry</div>
    <textarea id="journal-entry-input" placeholder="What's on your mind today?"></textarea>
    <button class="btn btn-primary btn-sm mt-sm" data-action="save-entry">Add Entry</button>
  </div>`;

  // Past entries
  if (entries.length > 0) {
    html += `<div class="section-label">Past Entries</div>`;
    entries.slice(0, 10).forEach(e => {
      html += `<div class="journal-entry-card">
        <div class="entry-date">${formatDateTime(e.createdAt)}</div>
        <div class="entry-body">${e.body}</div>
      </div>`;
    });
  }

  document.getElementById('tab-journal').innerHTML = html;
}

function renderInsights() {
  const cravings = cravingStore.get().logs;
  const checkIns = journalStore.get().checkIns;
  const streaks = Object.values(streakStore.get().streaks);
  const insights = generateInsights(cravings, checkIns, streaks);

  let html = `<div class="header-row"><button class="btn btn-ghost" data-action="back-journal">\u2190 Back</button><h3>Insights</h3><div></div></div>`;

  html += `<div class="stats-row">
    <div class="stat-card"><div class="stat-value">${checkIns.length}</div><div class="stat-label">Check-ins</div></div>
    <div class="stat-card"><div class="stat-value">${cravings.length}</div><div class="stat-label">Cravings logged</div></div>
  </div>`;

  if (insights.length > 0) {
    insights.forEach(insight => {
      html += `<div class="insight-card"><div class="insight-title">${insight.title}</div><div class="insight-detail">${insight.detail}</div></div>`;
    });
  } else {
    html += `<div class="empty-state"><div class="empty-icon">\u{1F4CA}</div><p>Keep logging check-ins and using the panic button to unlock insights.<br>Need at least 7 check-ins and 5 craving logs.</p></div>`;
  }

  document.getElementById('tab-journal-insights').innerHTML = html;
}

function renderSettings() {
  const vices = userStore.get().profile.vices;
  const settings = settingsStore.get().settings;
  const theme = localStorage.getItem('vice-breaker-theme') || 'dark';

  let html = `<div class="settings-header"><button class="btn btn-ghost" data-action="settings-back">&larr; Back</button><h3>Settings</h3><div style="width:60px"></div></div>`;

  // Theme toggle
  html += `<div class="settings-section">
    <div class="settings-section-title">Appearance</div>
    <div class="setting-item">
      <div class="setting-icon">${theme==='light'?'\u2600\uFE0F':'\u{1F319}'}</div>
      <div class="setting-info"><div class="label">${theme==='light'?'Light':'Dark'} Mode</div><div class="desc">Toggle theme</div></div>
      <div class="toggle ${theme==='light'?'on':''}" data-action="toggle-theme"></div>
    </div>
  </div>`;

  // Daily spend per vice
  html += `<div class="settings-section"><div class="settings-section-title">Daily Spend <span class="help-icon" data-action="help-spend">?</span></div>`;
  vices.forEach(v => {
    const config = getViceConfig(v);
    const streak = streakStore.get().streaks[v];
    html += `<div class="setting-item">
      <div class="setting-icon">${VICE_EMOJI[v]||''}</div>
      <div class="setting-info"><div class="label">${config?.label||v}</div><div class="desc">$ per day</div></div>
      <input type="number" min="0" step="0.01" value="${streak?.dailySpend||''}" placeholder="0" data-action="set-spend" data-vice="${v}">
    </div>`;
  });
  html += `</div>`;

  // Relapse
  html += `<div class="settings-section"><div class="settings-section-title">Relapse</div>`;
  vices.forEach(v => {
    const config = getViceConfig(v);
    html += `<div class="setting-item">
      <div class="setting-icon">${VICE_EMOJI[v]||''}</div>
      <div class="setting-info"><div class="label">${config?.label||v}</div><div class="desc">Record a relapse</div></div>
      <button class="btn btn-danger btn-sm" data-action="record-relapse" data-vice="${v}">Relapse</button>
    </div>`;
  });
  html += `</div>`;

  // Buddy
  html += `<div class="settings-section">
    <div class="settings-section-title">Accountability Buddy</div>
    <div class="setting-item" style="flex-direction:column;align-items:stretch;gap:8px">
      <input class="input" type="text" placeholder="Buddy name" value="${settings.buddyName||''}" id="buddy-name">
      <input class="input" type="tel" placeholder="Phone number" value="${settings.buddyPhone||''}" id="buddy-phone">
      <button class="btn btn-primary btn-sm" data-action="save-buddy">Save Buddy</button>
    </div>
  </div>`;

  // Notifications
  html += `<div class="settings-section">
    <div class="settings-section-title">Notifications</div>
    <div class="setting-item">
      <div class="setting-icon">\u{1F514}</div>
      <div class="setting-info"><div class="label">Daily Reminders</div><div class="desc">Get reminded to check in</div></div>
      <div class="toggle ${settings.notificationsEnabled?'on':''}" data-action="toggle-notif"></div>
    </div>
  </div>`;

  // About & reset
  html += `<div class="settings-section">
    <div class="settings-section-title">About</div>
    <div class="setting-item"><div class="setting-info"><div class="label">Vice Breaker</div><div class="desc">Version 2.0 \u2022 Vanilla JS</div></div></div>
    <button class="btn btn-ghost btn-full mt-sm" style="color:var(--danger)" data-action="reset-all">Reset All Data</button>
  </div>`;

  document.getElementById('tab-settings').innerHTML = html;
}

// ========== PANIC RENDERERS ==========

function renderPanicMenu() {
  showPanicScreen('panic-menu');
  const buddy = settingsStore.get().settings.buddyPhone;
  document.getElementById('panic-menu').innerHTML = `
    <div class="panic-header"><h2>I Need Help</h2><button class="panic-close" data-action="close-panic">\u2716</button></div>
    <div class="panic-grid">
      <div class="panic-option" data-action="panic-breathe"><div class="option-icon">\u{1F4A8}</div><div class="option-label">Breathe</div></div>
      <div class="panic-option" data-action="panic-coping"><div class="option-icon">\u{1F4A1}</div><div class="option-label">Coping</div></div>
      <div class="panic-option" data-action="panic-quotes"><div class="option-icon">\u{1F4AC}</div><div class="option-label">Quotes</div></div>
      <div class="panic-option ${buddy?'':'locked'}" data-action="panic-call" style="${buddy?'':'opacity:0.4;pointer-events:none'}"><div class="option-icon">\u{1F4DE}</div><div class="option-label">Call Buddy</div></div>
    </div>
    <button class="btn btn-ghost btn-full" data-action="panic-history">\u{1F4CB} Craving History</button>
  `;
}

function renderBreathe() {
  showPanicScreen('panic-breathe');
  document.getElementById('panic-breathe').innerHTML = `
    <div class="panic-header"><button class="panic-close" data-action="panic-back">\u2190</button><h2>Breathing Exercise</h2><div></div></div>
    <div class="breathe-container">
      <div class="breathe-circle" id="breathe-circle" data-phase="inhale"></div>
      <div class="breathe-phase" id="breathe-phase">Breathe in...</div>
      <div class="breathe-cycles" id="breathe-cycles">Cycle: 0</div>
      <p class="text-sm text-muted">4 seconds in \u2022 7 seconds hold \u2022 8 seconds out</p>
      <button class="btn btn-primary" data-action="breathe-done">I Feel Better</button>
    </div>
  `;
  startBreathe();
}

function startBreathe() {
  stopBreathe();
  const INHALE = 4000, HOLD = 7000, EXHALE = 8000, CYCLE = INHALE + HOLD + EXHALE;
  breatheStart = Date.now();
  let cycles = 0;
  const circle = document.getElementById('breathe-circle');
  const phase = document.getElementById('breathe-phase');
  const cycleEl = document.getElementById('breathe-cycles');

  function tick() {
    const elapsed = (Date.now() - breatheStart) % CYCLE;
    const totalElapsed = Date.now() - breatheStart;
    const newCycles = Math.floor(totalElapsed / CYCLE);
    if (newCycles > cycles) { cycles = newCycles; if (cycleEl) cycleEl.textContent = `Cycle: ${cycles}`; }
    if (!circle) return;
    if (elapsed < INHALE) {
      if (circle.dataset.phase !== 'inhale') { circle.dataset.phase = 'inhale'; circle.style.animation = `breathe-in ${INHALE}ms ease-in-out forwards`; }
      if (phase) phase.textContent = 'Breathe in...';
    } else if (elapsed < INHALE + HOLD) {
      if (circle.dataset.phase !== 'hold') { circle.dataset.phase = 'hold'; circle.style.animation = 'none'; }
      if (phase) phase.textContent = 'Hold...';
    } else {
      if (circle.dataset.phase !== 'exhale') { circle.dataset.phase = 'exhale'; circle.style.animation = `breathe-out ${EXHALE}ms ease-in-out forwards`; }
      if (phase) phase.textContent = 'Breathe out...';
    }
  }
  tick();
  breatheInterval = setInterval(tick, 100);
}

function stopBreathe() { if (breatheInterval) { clearInterval(breatheInterval); breatheInterval = null; } }

function renderCoping() {
  showPanicScreen('panic-coping');
  const vice = selectedVice || userStore.get().profile.vices[0] || 'general';
  const specific = VICE_SPECIFIC_COPING[vice];
  const categories = specific ? [specific, ...GENERAL_COPING] : GENERAL_COPING;

  let html = `<div class="panic-header"><button class="panic-close" data-action="panic-back">\u2190</button><h2>Coping Strategies</h2><div></div></div><div class="scroll-y">`;
  categories.forEach(cat => {
    html += `<div class="coping-category"><div class="coping-category-title">${cat.category}</div>`;
    cat.strategies.forEach(s => {
      html += `<div class="coping-card"><div class="coping-icon">${s.icon}</div><div><div class="coping-title">${s.title}</div><div class="coping-desc">${s.description}</div></div></div>`;
    });
    html += `</div>`;
  });
  html += `</div>`;
  document.getElementById('panic-coping').innerHTML = html;
}

function renderQuotes() {
  showPanicScreen('panic-quotes');
  const shuffled = [...MOTIVATIONAL_QUOTES].sort(() => Math.random() - 0.5);
  let html = `<div class="panic-header"><button class="panic-close" data-action="panic-back">\u2190</button><h2>Motivation</h2><div></div></div>`;
  html += `<div class="quotes-carousel" id="quotes-carousel">`;
  shuffled.forEach((q, i) => {
    html += `<div class="quote-slide"><div class="big-quote">"${q.text}"</div><div class="big-author">\u2014 ${q.author}</div></div>`;
  });
  html += `</div>`;
  html += `<div class="quote-index" id="quote-index">1 / ${shuffled.length}</div>`;
  html += `<button class="btn btn-primary btn-full" data-action="quotes-done" style="margin:12px 0">I Feel Stronger</button>`;
  document.getElementById('panic-quotes').innerHTML = html;

  const carousel = document.getElementById('quotes-carousel');
  carousel?.addEventListener('scroll', () => {
    const idx = Math.round(carousel.scrollLeft / carousel.offsetWidth) + 1;
    const indexEl = document.getElementById('quote-index');
    if (indexEl) indexEl.textContent = `${idx} / ${shuffled.length}`;
  });
}

function renderPanicHistory() {
  showPanicScreen('panic-history');
  const logs = [...cravingStore.get().logs].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
  const resistCount = logs.filter(l => l.resisted).length;
  const actionIcons = { breathe:'\u{1F4A8}', coping:'\u{1F4A1}', quotes:'\u{1F4AC}', call_buddy:'\u{1F4DE}' };

  let html = `<div class="panic-header"><button class="panic-close" data-action="panic-back">\u2190</button><h2>Craving History</h2><div></div></div>`;
  html += `<div class="stat-card mb-lg"><div class="stat-value">${resistCount}</div><div class="stat-label">Cravings resisted</div></div>`;

  if (logs.length === 0) {
    html += `<div class="empty-state"><div class="empty-icon">\u{1F6E1}\uFE0F</div><p>No craving logs yet. Use the panic button when cravings hit.</p></div>`;
  } else {
    html += `<div class="scroll-y">`;
    logs.forEach(l => {
      html += `<div class="history-log">
        <div class="log-icon">${l.resisted?'\u{1F6E1}\uFE0F':'\u26A0\uFE0F'}</div>
        <div class="log-info">
          <div class="log-date">${formatDateTime(l.timestamp)}</div>
          <div class="log-detail">${l.panicAction ? (actionIcons[l.panicAction]||'') + ' ' + l.panicAction : 'Logged'} \u2022 Intensity: ${l.intensity}/10</div>
        </div>
      </div>`;
    });
    html += `</div>`;
  }
  document.getElementById('panic-history').innerHTML = html;
}

// ========== INSIGHTS ENGINE ==========

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const TIME_BUCKETS = ['Morning (6-10am)','Midday (10am-2pm)','Afternoon (2-6pm)','Evening (6-10pm)','Night (10pm-6am)'];

function getTimeBucket(ts) {
  const h = new Date(ts).getHours();
  if (h >= 6 && h < 10) return 0;
  if (h >= 10 && h < 14) return 1;
  if (h >= 14 && h < 18) return 2;
  if (h >= 18 && h < 22) return 3;
  return 4;
}

function generateInsights(cravings, checkIns, streaks) {
  const results = [];

  // Peak craving day
  if (cravings.length >= 5) {
    const counts = new Array(7).fill(0);
    cravings.forEach(c => counts[new Date(c.timestamp).getDay()]++);
    const avg = cravings.length / 7, maxC = Math.max(...counts), maxD = counts.indexOf(maxC);
    if (maxC >= avg * 1.5) {
      results.push({ id:uuid(), type:'peak_craving_day', title:`${DAY_NAMES[maxD]}s are your hardest day`,
        detail:`You experience ${Math.round((maxC/avg-1)*100)}% more cravings on ${DAY_NAMES[maxD]}s than average.`,
        confidence: Math.min(0.95, 0.5 + maxC/cravings.length), generatedAt: new Date().toISOString() });
    }
  }

  // Peak craving time
  if (cravings.length >= 5) {
    const counts = new Array(5).fill(0);
    cravings.forEach(c => counts[getTimeBucket(c.timestamp)]++);
    const avg = cravings.length / 5, maxC = Math.max(...counts), maxB = counts.indexOf(maxC);
    if (maxC >= avg * 1.3) {
      results.push({ id:uuid(), type:'peak_craving_time', title:`Cravings peak in the ${TIME_BUCKETS[maxB].split(' ')[0].toLowerCase()}`,
        detail:`Most of your cravings hit during ${TIME_BUCKETS[maxB]}.`,
        confidence: Math.min(0.9, 0.5 + maxC/cravings.length), generatedAt: new Date().toISOString() });
    }
  }

  // Top trigger
  const triggerCounts = {};
  const allEntries = cravings.length + checkIns.length;
  [...cravings.flatMap(c => c.triggers||[]), ...checkIns.flatMap(c => c.triggers||[])].forEach(t => triggerCounts[t] = (triggerCounts[t]||0)+1);
  const sorted = Object.entries(triggerCounts).sort((a,b) => b[1]-a[1]);
  if (sorted.length > 0 && allEntries >= 3) {
    const [top, cnt] = sorted[0];
    const pct = Math.round(cnt/allEntries*100);
    if (pct >= 20) {
      results.push({ id:uuid(), type:'top_trigger', title:`"${top}" is your #1 trigger`,
        detail:`It appears in ${pct}% of your logged cravings.`,
        confidence: Math.min(0.95, 0.5+pct/100), generatedAt: new Date().toISOString() });
    }
  }

  // Mood trend
  if (checkIns.length >= 7) {
    const moods = checkIns.map(c => c.mood);
    const half = Math.floor(moods.length/2);
    const avg1 = moods.slice(0,half).reduce((a,b)=>a+b,0)/half;
    const avg2 = moods.slice(half).reduce((a,b)=>a+b,0)/(moods.length-half);
    if (avg2 > avg1 + 0.3) {
      results.push({ id:uuid(), type:'mood_trend', title:'Your mood is improving',
        detail:`Average mood increased from ${avg1.toFixed(1)} to ${avg2.toFixed(1)}.`, confidence:0.75, generatedAt:new Date().toISOString() });
    } else if (avg1 > avg2 + 0.3) {
      results.push({ id:uuid(), type:'mood_trend', title:'Recent mood dip detected',
        detail:'This can be normal during recovery. Try the breathing exercise.', confidence:0.7, generatedAt:new Date().toISOString() });
    }
  }

  // Relapse pattern
  const allRelapses = streaks.flatMap(s => s.relapses||[]);
  if (allRelapses.length >= 2) {
    const lens = allRelapses.map(r => Math.floor((new Date(r.date)-new Date(r.previousQuitDate))/86400000));
    const avg = lens.reduce((a,b)=>a+b,0)/lens.length;
    results.push({ id:uuid(), type:'relapse_pattern', title:`Watch out around day ${Math.round(avg)}`,
      detail:`Your relapses tend to happen around the ${Math.round(avg)}-day mark.`, confidence:0.7, generatedAt:new Date().toISOString() });
  }

  return results.filter(r => r.confidence > 0.6);
}

// ========== ONBOARDING RENDERERS ==========

if (!window._addedVices) window._addedVices = [];

function renderPickVices() {
  const input = document.getElementById('vice-text-input');
  const continueBtn = document.getElementById('btn-vices-continue');
  if (!input || !continueBtn) return;
  input.value = '';
  updateViceTags();
  updateViceContinueBtn();
  input.addEventListener('input', () => {
    updateViceContinueBtn();
  });
}

function updateViceTags() {
  const container = document.getElementById('vice-tags');
  if (!container) return;
  container.innerHTML = window._addedVices.map((v, i) =>
    `<span class="vice-tag">${v} <button data-action="remove-vice" data-index="${i}">&times;</button></span>`
  ).join('');
}

function updateViceContinueBtn() {
  const input = document.getElementById('vice-text-input');
  const btn = document.getElementById('btn-vices-continue');
  if (!btn) return;
  btn.disabled = window._addedVices.length === 0 && (!input || input.value.trim().length === 0);
}

function renderQuitDates() {
  const vices = userStore.get().profile.vices;
  const container = document.getElementById('quit-date-list');
  if (!container) return;

  // Initialize quit dates state
  if (!window._quitDates) window._quitDates = {};
  vices.forEach(v => { if (!window._quitDates[v]) window._quitDates[v] = new Date().toISOString(); });

  container.innerHTML = vices.map(v => {
    const config = getViceConfig(v);
    const d = new Date(window._quitDates[v]);
    const isToday = todayStr() === `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const daysAgo = Math.floor((Date.now() - d.getTime()) / 86400000);
    return `<div class="quit-date-item">
      <div class="vice-emoji">${VICE_EMOJI[v]||''}</div>
      <div class="quit-date-info">
        <div class="label">${config?.label||v}</div>
        <div class="date-display">${isToday ? 'Today' : formatDate(d)}${daysAgo > 0 && !isToday ? ` (${daysAgo} days ago)` : ''}</div>
      </div>
      <div class="date-controls">
        <button data-action="date-back" data-vice="${v}">\u276E</button>
        <button data-action="date-forward" data-vice="${v}">\u276F</button>
      </div>
    </div>`;
  }).join('');
}

// ========== EVENT HANDLING ==========

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;

  // Onboarding
  if (action === 'start-onboarding') { window._addedVices = []; showScreen('onboarding-pick-vices'); renderPickVices(); }
  if (action === 'add-vice') {
    const input = document.getElementById('vice-text-input');
    const text = input ? input.value.trim() : '';
    if (!text) return;
    window._addedVices.push(text);
    input.value = '';
    input.focus();
    updateViceTags();
    updateViceContinueBtn();
  }
  if (action === 'remove-vice') {
    const idx = parseInt(btn.dataset.index);
    window._addedVices.splice(idx, 1);
    updateViceTags();
    updateViceContinueBtn();
  }
  if (action === 'vices-continue') {
    const input = document.getElementById('vice-text-input');
    const currentText = input ? input.value.trim() : '';
    if (currentText) window._addedVices.push(currentText);
    if (window._addedVices.length === 0) return;
    // Match each entry to catalog or use 'other'
    const typed = window._addedVices.map(s => s.trim().toLowerCase()).filter(Boolean);
    const selected = typed.map(t => {
      const match = VICE_CATALOG.find(v => v.label.toLowerCase() === t || v.id === t);
      return match ? match.id : 'other';
    });
    const unique = [...new Set(selected)];
    if (!window._customViceLabels) window._customViceLabels = {};
    typed.forEach(t => {
      const match = VICE_CATALOG.find(v => v.label.toLowerCase() === t || v.id === t);
      if (!match) window._customViceLabels[t] = t.charAt(0).toUpperCase() + t.slice(1);
    });
    userStore.set(s => ({ profile: { ...s.profile, vices: unique } }));
    showScreen('onboarding-quit-date');
    renderQuitDates();
  }
  if (action === 'vices-skip') {
    userStore.set(s => ({ profile: { ...s.profile, vices: ['general'] } }));
    showScreen('onboarding-quit-date');
    renderQuitDates();
  }
  if (action === 'quit-date-back') { showScreen('onboarding-pick-vices'); renderPickVices(); }
  if (action === 'settings-back') { switchTab(previousTab || 'home'); }
  if (action === 'quote-prev') { cycleQuote(-1); }
  if (action === 'quote-next') { cycleQuote(1); }
  if (action === 'help-spend') {
    const overlay = document.createElement('div');
    overlay.className = 'help-popup-overlay';
    overlay.innerHTML = `<div class="help-popup">
      <h4>Daily Spend</h4>
      <p>Enter how much you used to spend per day on each vice. This is used to calculate how much money you've saved since quitting.</p>
      <button data-action="close-help">Got it</button>
    </div>`;
    overlay.addEventListener('click', (e) => { if (e.target === overlay || e.target.dataset.action === 'close-help') overlay.remove(); });
    document.body.appendChild(overlay);
  }
  if (action === 'quit-date-continue') {
    const vices = userStore.get().profile.vices;
    vices.forEach(v => {
      const qd = window._quitDates?.[v] || new Date().toISOString();
      const streaks = { ...streakStore.get().streaks };
      streaks[v] = streaks[v] || { viceId:v, quitDate:qd, currency:'USD', relapses:[] };
      streaks[v].quitDate = qd;
      streakStore.set({ streaks });
    });
    showScreen('onboarding-ready');
  }
  if (action === 'complete-onboarding') {
    const vices = userStore.get().profile.vices;
    vices.forEach(v => {
      const streaks = { ...streakStore.get().streaks };
      if (!streaks[v]) { streaks[v] = { viceId:v, quitDate:new Date().toISOString(), currency:'USD', relapses:[] }; streakStore.set({ streaks }); }
      const gardens = { ...gardenStore.get().gardens };
      if (!gardens[v]) { gardens[v] = { viceId:v, growthStage:1, prestigeTier:1, currentMonth:1, badges:[], unlockedTips:[] }; gardenStore.set({ gardens }); }
    });
    userStore.set(s => ({ profile: { ...s.profile, id: s.profile.id||uuid(), onboardingComplete:true, createdAt: s.profile.createdAt||new Date().toISOString() } }));
    initMainApp();
  }

  // Vice card selection (legacy - no longer used)


  // Date controls
  if (action === 'date-back' || action === 'date-forward') {
    const v = btn.dataset.vice;
    if (!window._quitDates) window._quitDates = {};
    const current = new Date(window._quitDates[v] || Date.now());
    if (action === 'date-back') current.setDate(current.getDate() - 1);
    else {
      const tomorrow = new Date(current); tomorrow.setDate(tomorrow.getDate() + 1);
      if (tomorrow > new Date()) return; // No future dates
      current.setDate(current.getDate() + 1);
    }
    window._quitDates[v] = current.toISOString();
    renderQuitDates();
  }

  // Tab vice selector
  if (action === 'select-vice') {
    selectedVice = btn.dataset.vice;
    renderTab(currentTab);
  }

  // Home
  if (action === 'start-timer') {
    const vice = selectedVice || userStore.get().profile.vices[0];
    const now = new Date().toISOString();
    const streaks = { ...streakStore.get().streaks };
    streaks[vice] = { viceId:vice, quitDate:now, currency:'USD', relapses:[] };
    streakStore.set({ streaks });
    const gardens = { ...gardenStore.get().gardens };
    if (!gardens[vice]) { gardens[vice] = { viceId:vice, growthStage:1, prestigeTier:1, currentMonth:1, badges:[], unlockedTips:[] }; gardenStore.set({ gardens }); }
    renderHome();
    startLiveCounter();
  }

  // Journal
  if (action === 'submit-checkin') {
    const moodBtn = document.querySelector('.mood-btn.selected');
    const mood = moodBtn ? parseInt(moodBtn.dataset.mood) : 0;
    if (!mood) return;
    const filledDots = document.querySelectorAll('.craving-dot.filled');
    const cravingLevel = filledDots.length > 0 ? Math.max(...[...filledDots].map(d => parseInt(d.dataset.level))) : 0;
    const triggers = [...document.querySelectorAll('.trigger-chips .chip.selected')].map(c => c.dataset.trigger);
    const vice = selectedVice || userStore.get().profile.vices[0];
    const checkIns = [...journalStore.get().checkIns.filter(c => c.date !== todayStr() || c.viceId !== vice),
      { id:uuid(), date:todayStr(), mood, cravingLevel, triggers, viceId:vice }];
    journalStore.set({ checkIns, entries: journalStore.get().entries });
    renderJournal();
  }
  if (action === 'save-entry') {
    const input = document.getElementById('journal-entry-input');
    const body = input?.value?.trim();
    if (!body) return;
    const vice = selectedVice || userStore.get().profile.vices[0];
    const entries = [...journalStore.get().entries, { id:uuid(), date:todayStr(), body, viceId:vice, createdAt:new Date().toISOString() }];
    journalStore.set({ checkIns: journalStore.get().checkIns, entries });
    renderJournal();
  }
  if (action === 'show-insights') {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-journal-insights')?.classList.add('active');
    renderInsights();
  }
  if (action === 'back-journal') {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-journal')?.classList.add('active');
  }

  // Settings
  if (action === 'toggle-theme') {
    const current = localStorage.getItem('vice-breaker-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem('vice-breaker-theme', next);
    document.documentElement.setAttribute('data-theme', next === 'dark' ? '' : 'light');
    if (next === 'dark') document.documentElement.removeAttribute('data-theme');
    renderSettings();
  }
  if (action === 'toggle-notif') {
    const s = settingsStore.get().settings;
    settingsStore.set({ settings: { ...s, notificationsEnabled: !s.notificationsEnabled } });
    renderSettings();
  }
  if (action === 'save-buddy') {
    const name = document.getElementById('buddy-name')?.value || '';
    const phone = document.getElementById('buddy-phone')?.value || '';
    const s = settingsStore.get().settings;
    settingsStore.set({ settings: { ...s, buddyName: name, buddyPhone: phone } });
  }
  if (action === 'record-relapse') {
    const vice = btn.dataset.vice;
    if (!confirm(`Record a relapse for ${getViceConfig(vice)?.label || vice}? This will reset your current streak.`)) return;
    const streaks = { ...streakStore.get().streaks };
    const streak = streaks[vice];
    if (!streak) return;
    const relapse = { id:uuid(), date:new Date().toISOString(), previousQuitDate:streak.quitDate };
    streaks[vice] = { ...streak, quitDate:new Date().toISOString(), relapses:[...(streak.relapses||[]), relapse] };
    streakStore.set({ streaks });
    renderSettings();
    if (currentTab === 'home') renderHome();
  }
  if (action === 'reset-all') {
    if (!confirm('This will delete ALL your data. Are you sure?')) return;
    if (!confirm('Really? This cannot be undone.')) return;
    userStore.set({ profile:{ id:'', name:'', vices:[], onboardingComplete:false, createdAt:'' } });
    streakStore.set({ streaks:{} }); gardenStore.set({ gardens:{} });
    journalStore.set({ checkIns:[], entries:[] }); cravingStore.set({ logs:[] });
    settingsStore.set({ settings:{ notificationsEnabled:true, notificationTime:'09:00' } });
    location.reload();
  }

  // Panic
  if (action === 'close-panic') closePanic();
  if (action === 'panic-back') renderPanicMenu();
  if (action === 'panic-breathe') renderBreathe();
  if (action === 'panic-coping') { renderCoping(); logCraving('coping'); }
  if (action === 'panic-quotes') { renderQuotes(); logCraving('quotes'); }
  if (action === 'panic-history') renderPanicHistory();
  if (action === 'panic-call') {
    const phone = settingsStore.get().settings.buddyPhone;
    if (phone) { window.open(`tel:${phone}`); logCraving('call_buddy'); }
  }
  if (action === 'breathe-done') {
    const duration = breatheStart ? Math.floor((Date.now() - breatheStart) / 1000) : 0;
    stopBreathe();
    logCraving('breathe', duration);
    renderPanicMenu();
  }
  if (action === 'quotes-done') {
    renderPanicMenu();
  }
});

// Mood button selection
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('mood-btn')) {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
    e.target.classList.add('selected');
  }
  if (e.target.classList.contains('craving-dot')) {
    const level = parseInt(e.target.dataset.level);
    document.querySelectorAll('.craving-dot').forEach(d => {
      const l = parseInt(d.dataset.level);
      d.classList.toggle('filled', l <= level);
      d.classList.toggle('high', l <= level && level >= 7);
    });
  }
  if (e.target.closest('.trigger-chips .chip')) {
    e.target.closest('.chip').classList.toggle('selected');
  }
});

// Daily spend blur handler
document.addEventListener('change', (e) => {
  if (e.target.matches('[data-action="set-spend"]')) {
    const vice = e.target.dataset.vice;
    const amount = parseFloat(e.target.value) || 0;
    const streaks = { ...streakStore.get().streaks };
    if (streaks[vice]) { streaks[vice] = { ...streaks[vice], dailySpend: amount }; streakStore.set({ streaks }); }
  }
});

function logCraving(panicAction, duration) {
  const vice = selectedVice || userStore.get().profile.vices[0] || 'general';
  const log = {
    id: uuid(), viceId: vice, timestamp: new Date().toISOString(),
    intensity: 5, triggers: [], usedPanicButton: true,
    panicAction, durationSeconds: duration || 0, resisted: true
  };
  cravingStore.set({ logs: [...cravingStore.get().logs, log] });
}

// ========== INIT ==========

function initMainApp() {
  showScreen('main-app');
  selectedVice = userStore.get().profile.vices[0] || 'general';
  switchTab('home');
}

// Tab bar clicks
document.getElementById('tab-bar')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab-btn');
  if (btn) switchTab(btn.dataset.tab);
});

// Panic FAB
document.getElementById('panic-fab')?.addEventListener('click', openPanic);

// Settings FAB
document.getElementById('settings-fab')?.addEventListener('click', () => switchTab('settings'));

// Boot
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const theme = localStorage.getItem('vice-breaker-theme');
  if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');

  // Remove splash after animation
  setTimeout(() => {
    const splash = document.getElementById('splash-overlay');
    if (splash) splash.remove();
  }, 1800);

  // Check onboarding
  if (userStore.get().profile.onboardingComplete) {
    initMainApp();
  } else {
    showScreen('onboarding-welcome');
  }
});
