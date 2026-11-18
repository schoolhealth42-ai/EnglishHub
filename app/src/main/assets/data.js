/* English Hub — built-in content. Feeds/channels are resolved live when the app runs. */
const DATA = {
  levels: { beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' },

  podcasts: [
    { id: 'bbc6', name: '6 Minute English', by: 'BBC Learning English', level: 'intermediate', accent: 'UK',
      feed: 'https://podcasts.files.bbci.co.uk/p02pc9tn.rss', itunes: 262026947,
      desc: 'حلقات من 6 دقائق عن مواضيع شيقة مع مفردات مفيدة ونص كامل للحلقة.' },
    { id: 'bbcconv', name: 'Learning English Conversations', by: 'BBC Learning English', level: 'beginner', accent: 'UK',
      feed: 'https://podcasts.files.bbci.co.uk/p02pc9zn.rss',
      desc: 'تعابير يومية ومحادثات حقيقية تسهّل عليك الكلام بالإنجليزية.' },
    { id: 'wespeak', name: 'The English We Speak', by: 'BBC Learning English', level: 'beginner', accent: 'UK',
      term: 'The English We Speak BBC',
      desc: 'تعبير عامي أو اصطلاحي واحد في كل حلقة قصيرة.' },
    { id: 'bbcnews', name: 'Learning English from the News', by: 'BBC Learning English', level: 'intermediate', accent: 'UK',
      term: 'Learning English from the News BBC',
      desc: 'تعلّم لغة الأخبار من خلال قصص إخبارية حقيقية.' },
    { id: 'voa', name: 'VOA Learning English', by: 'Voice of America', level: 'beginner', accent: 'US',
      term: 'VOA Learning English',
      desc: 'إنجليزية أمريكية بطيئة وواضحة مع أخبار ومواضيع متنوعة.' },
    { id: 'allears', name: 'All Ears English', by: 'Lindsay & Michelle', level: 'intermediate', accent: 'US',
      term: 'All Ears English Podcast',
      desc: 'إنجليزية حقيقية للمحادثة والتواصل الطبيعي مع الناس.' },
    { id: 'curious', name: 'English Learning for Curious Minds', by: 'Leonardo English', level: 'intermediate', accent: 'UK',
      term: 'English Learning for Curious Minds',
      desc: 'قصص وتاريخ وثقافة بإنجليزية واضحة لمحبّي المعرفة.' },
    { id: 'easystories', name: 'Easy Stories in English', by: 'Ariel Goodbody', level: 'beginner', accent: 'UK',
      term: 'Easy Stories in English',
      desc: 'قصص مسموعة سهلة مصنّفة حسب المستوى.' },
    { id: 'culips', name: 'Culips English Podcast', by: 'Culips', level: 'intermediate', accent: 'CA',
      term: 'Culips English Podcast',
      desc: 'محادثات طبيعية بين متحدثين أصليين مع شرح التعابير.' },
    { id: 'luke', name: "Luke's English Podcast", by: 'Luke Thompson', level: 'advanced', accent: 'UK',
      itunes: 312059190, term: "Luke's English Podcast",
      desc: 'بودكاست طويل ممتع بإنجليزية بريطانية طبيعية كما يتكلّمها الناس.' },
    { id: 'ielts', name: 'IELTS Energy', by: 'All Ears English', level: 'advanced', accent: 'US',
      term: 'IELTS Energy English Podcast',
      desc: 'نصائح واستراتيجيات للنجاح في اختبار الآيلتس.' },
    { id: 'bizpod', name: 'Business English Pod', by: 'BEP', level: 'advanced', accent: 'US',
      term: 'Business English Pod',
      desc: 'إنجليزية الأعمال: الاجتماعات، العروض، التفاوض والمقابلات.' }
  ],

  channels: [
    { id: 'UCHaHD477h-FeBbVh9Sh7syA', name: 'BBC Learning English', handle: '@bbclearningenglish', level: 'intermediate', accent: 'UK', desc: 'دروس يومية، أخبار، نطق ومفردات.' },
    { id: 'UCz4tgANd4yy8Oe0iXCdSWfA', name: 'English with Lucy', handle: '@englishwithlucy', level: 'intermediate', accent: 'UK', desc: 'نطق ومفردات وقواعد بأسلوب ممتع.' },
    { id: 'UCKyTokYo0nK2OA-az-sDijA', name: 'VOA Learning English', handle: '@voalearningenglish', level: 'beginner', accent: 'US', desc: 'أخبار بطيئة مع ترجمة نصية ودروس للمبتدئين.' },
    { id: 'UCvn_XCl_mgQmt3sD753zdJA', name: "Rachel's English", handle: '@rachelsenglish', level: 'intermediate', accent: 'US', desc: 'أفضل قناة لتعلّم النطق الأمريكي.' },
    { id: 'UCrRiVfHqBIIvSgKmgnSY66g', name: 'mmmEnglish', handle: '@mmmenglish_emma', level: 'intermediate', accent: 'AU', desc: 'تقنية التقليد لتحسين الطلاقة والثقة.' },
    { id: 'UCxJGMJbjokfnr2-s4_RXPxQ', name: 'Speak English With Vanessa', handle: '@SpeakEnglishWithVanessa', level: 'intermediate', accent: 'US', desc: 'إنجليزية المحادثة اليومية الطبيعية.' },
    { id: 'UCKgpamMlm872zkGDcBJHYDg', name: 'Learn English with TV Series', handle: '@LearnEnglishWithTVSeries', level: 'intermediate', accent: 'US', desc: 'تعلّم من مقاطع الأفلام والمسلسلات.' },
    { id: '', name: 'Learn English with Papa Teach Me', handle: '@papateachme', level: 'advanced', accent: 'UK', desc: 'تعابير وإنجليزية طبيعية متقدمة.' },
    { id: '', name: 'Oxford Online English', handle: '@OxfordOnlineEnglish', level: 'intermediate', accent: 'UK', desc: 'دروس منظمة في المحادثة والقواعد.' },
    { id: '', name: 'English Speaking Course (Kevin & Liza)', handle: '@EnglishforEveryonewithKevinandLiza', level: 'beginner', accent: 'US', desc: 'محادثات بطيئة جداً للمبتدئين.' }
  ],

  radios: [
    { id: 'r_bbcws', name: 'BBC World Service', q: 'BBC World Service', desc: 'أخبار وبرامج عالمية بالإنجليزية على مدار الساعة' },
    { id: 'r_npr', name: 'NPR News', q: 'NPR', desc: 'إذاعة أمريكية عامة — أخبار وحوارات' },
    { id: 'r_bbc4', name: 'BBC Radio 4', q: 'BBC Radio 4', desc: 'حوارات ودراما وبرامج ثقافية بريطانية' },
    { id: 'r_lbc', name: 'LBC', q: 'LBC', desc: 'إذاعة حوارية بريطانية — استماع لإنجليزية طبيعية' },
    { id: 'r_abc', name: 'ABC News Radio (AU)', q: 'ABC News', desc: 'أخبار أسترالية — للتعرّف على لكنات مختلفة' },
    { id: 'r_cbc', name: 'CBC Radio One', q: 'CBC Radio One', desc: 'إذاعة كندية — حوارات وبرامج متنوعة' }
  ],

  dialogues: [
    { id: 'd1', level: 'beginner', icon: '👋', title: 'Meeting someone new', ar: 'التعارف على شخص جديد', roles: ['Sara', 'Tom'], lines: [
      ['A', "Hi! I don't think we've met. I'm Sara.", 'مرحباً! لا أظن أننا التقينا من قبل. أنا سارة.'],
      ['B', "Hi Sara, I'm Tom. Nice to meet you.", 'أهلاً سارة، أنا توم. سعيد بلقائك.'],
      ['A', 'Nice to meet you too. Where are you from?', 'وأنا أيضاً سعيدة بلقائك. من أين أنت؟'],
      ['B', "I'm from Canada, but I live here now. How about you?", 'أنا من كندا، لكني أعيش هنا الآن. وأنتِ؟'],
      ['A', "I'm from Jeddah. What do you do?", 'أنا من جدة. ماذا تعمل؟'],
      ['B', "I'm a software engineer. And you?", 'أنا مهندس برمجيات. وأنتِ؟'],
      ['A', "I'm a nurse. I work at the city hospital.", 'أنا ممرضة. أعمل في مستشفى المدينة.'],
      ['B', "That's great. Well, I hope to see you again soon!", 'رائع. حسناً، أتمنى أن أراكِ مجدداً قريباً!']
    ]},
    { id: 'd2', level: 'beginner', icon: '☕', title: 'Ordering at a café', ar: 'الطلب في المقهى', roles: ['Barista', 'Customer'], lines: [
      ['A', 'Good morning! What can I get for you?', 'صباح الخير! ماذا أحضر لك؟'],
      ['B', "Hi, can I have a medium latte, please?", 'مرحباً، هل يمكنني الحصول على لاتيه وسط من فضلك؟'],
      ['A', 'Sure. Would you like it hot or iced?', 'بالتأكيد. هل تريده ساخناً أم مثلجاً؟'],
      ['B', 'Iced, please. And could I get a croissant too?', 'مثلج من فضلك. وهل يمكنني أخذ كرواسون أيضاً؟'],
      ['A', 'Of course. For here or to go?', 'طبعاً. هنا أم سفري؟'],
      ['B', 'To go, please. How much is that?', 'سفري من فضلك. كم المبلغ؟'],
      ['A', "That's eight dollars fifty.", 'المبلغ ثمانية دولارات وخمسون سنتاً.'],
      ['B', 'Here you go. Thank you!', 'تفضل. شكراً لك!']
    ]},
    { id: 'd3', level: 'beginner', icon: '🧭', title: 'Asking for directions', ar: 'السؤال عن الاتجاهات', roles: ['Tourist', 'Local'], lines: [
      ['A', 'Excuse me, could you help me? I think I\'m lost.', 'عفواً، هل يمكنك مساعدتي؟ أظن أنني تائه.'],
      ['B', 'Sure. Where are you trying to go?', 'بالتأكيد. إلى أين تريد الذهاب؟'],
      ['A', "I'm looking for the train station.", 'أبحث عن محطة القطار.'],
      ['B', "Go straight ahead and turn left at the traffic lights.", 'امشِ مستقيماً ثم انعطف يساراً عند الإشارة.'],
      ['A', 'Is it far from here?', 'هل هي بعيدة من هنا؟'],
      ['B', "No, it's about a five-minute walk. It's next to the bank.", 'لا، تبعد حوالي خمس دقائق مشياً. بجانب البنك.'],
      ['A', 'Thank you so much!', 'شكراً جزيلاً!'],
      ['B', "You're welcome. Have a nice day!", 'على الرحب والسعة. يوماً سعيداً!']
    ]},
    { id: 'd4', level: 'beginner', icon: '📅', title: 'Making plans with a friend', ar: 'ترتيب موعد مع صديق', roles: ['Ali', 'Mark'], lines: [
      ['A', 'Hey Mark, are you free this weekend?', 'مرحباً مارك، هل أنت متفرغ نهاية هذا الأسبوع؟'],
      ['B', "I'm busy on Saturday, but Sunday works for me. Why?", 'أنا مشغول السبت، لكن الأحد مناسب. لماذا؟'],
      ['A', 'How about going to the new mall?', 'ما رأيك أن نذهب إلى المول الجديد؟'],
      ['B', 'Sounds good! What time should we meet?', 'فكرة جيدة! في أي وقت نلتقي؟'],
      ['A', "Let's meet at four in the afternoon.", 'لنلتقِ الساعة الرابعة عصراً.'],
      ['B', 'Perfect. Should I pick you up?', 'ممتاز. هل آتي لأقلّك؟'],
      ['A', "That would be great, thanks!", 'سيكون ذلك رائعاً، شكراً!'],
      ['B', "No problem. See you on Sunday!", 'لا مشكلة. أراك الأحد!']
    ]},
    { id: 'd5', level: 'beginner', icon: '👕', title: 'Shopping for clothes', ar: 'التسوق لشراء الملابس', roles: ['Assistant', 'Customer'], lines: [
      ['A', 'Hello! Are you looking for anything in particular?', 'مرحباً! هل تبحث عن شيء محدد؟'],
      ['B', "Yes, I'm looking for a jacket.", 'نعم، أبحث عن سترة.'],
      ['A', 'What size are you?', 'ما مقاسك؟'],
      ['B', "Medium, I think. Can I try this one on?", 'متوسط على ما أظن. هل يمكنني تجربة هذه؟'],
      ['A', 'Of course. The fitting rooms are over there.', 'بالطبع. غرف القياس هناك.'],
      ['B', "It's a bit tight. Do you have it in a larger size?", 'إنها ضيقة قليلاً. هل لديك مقاس أكبر؟'],
      ['A', 'Yes, here\'s a large. It\'s also on sale today.', 'نعم، هذا مقاس كبير. وعليه تخفيض اليوم أيضاً.'],
      ['B', "Great, I'll take it. Can I pay by card?", 'رائع، سآخذها. هل يمكنني الدفع بالبطاقة؟']
    ]},
    { id: 'd6', level: 'intermediate', icon: '✈️', title: 'Airport check-in', ar: 'إجراءات السفر في المطار', roles: ['Agent', 'Passenger'], lines: [
      ['A', 'Good afternoon. May I see your passport and ticket, please?', 'مساء الخير. هل يمكنني رؤية جوازك وتذكرتك من فضلك؟'],
      ['B', 'Here you are.', 'تفضل.'],
      ['A', 'Thank you. Are you checking in any bags today?', 'شكراً. هل ستشحن أي حقائب اليوم؟'],
      ['B', 'Just one suitcase. Is there a weight limit?', 'حقيبة واحدة فقط. هل هناك حد للوزن؟'],
      ['A', "Yes, twenty-three kilos. Let me weigh it... it's twenty-one, so you're fine.", 'نعم، ثلاثة وعشرون كيلو. دعني أزنها... واحد وعشرون، إذن لا مشكلة.'],
      ['B', 'Great. Could I have a window seat, please?', 'رائع. هل يمكنني الحصول على مقعد بجانب النافذة؟'],
      ['A', "Sure. Here's your boarding pass. Boarding starts at gate twelve at 3:15.", 'بالتأكيد. هذه بطاقة الصعود. يبدأ الصعود من البوابة 12 الساعة 3:15.'],
      ['B', 'Thank you very much.', 'شكراً جزيلاً.']
    ]},
    { id: 'd7', level: 'intermediate', icon: '🏨', title: 'Hotel check-in', ar: 'تسجيل الدخول في الفندق', roles: ['Receptionist', 'Guest'], lines: [
      ['A', 'Welcome! Do you have a reservation?', 'أهلاً بك! هل لديك حجز؟'],
      ['B', 'Yes, I booked a double room for three nights under the name Khalid.', 'نعم، حجزت غرفة مزدوجة لثلاث ليالٍ باسم خالد.'],
      ['A', "Let me check... Yes, here it is. Could I see your ID, please?", 'دعني أتحقق... نعم، ها هو. هل أرى هويتك من فضلك؟'],
      ['B', 'Sure. Is breakfast included?', 'بالتأكيد. هل الإفطار مشمول؟'],
      ['A', "Yes, breakfast is served from 6:30 to 10 in the restaurant.", 'نعم، يُقدَّم الإفطار من 6:30 حتى 10 في المطعم.'],
      ['B', 'And what time is check-out?', 'ومتى موعد المغادرة؟'],
      ['A', "Check-out is at noon. Here's your key card. Your room is on the fifth floor.", 'المغادرة الساعة 12 ظهراً. هذه بطاقة الغرفة. غرفتك في الطابق الخامس.'],
      ['B', 'Thanks. What\'s the Wi-Fi password?', 'شكراً. ما كلمة مرور الواي فاي؟'],
      ['A', "It's written on the back of the card. Enjoy your stay!", 'مكتوبة خلف البطاقة. نتمنى لك إقامة ممتعة!']
    ]},
    { id: 'd8', level: 'intermediate', icon: '🩺', title: "At the doctor's", ar: 'عند الطبيب', roles: ['Doctor', 'Patient'], lines: [
      ['A', 'Hello, please have a seat. What seems to be the problem?', 'مرحباً، تفضل بالجلوس. ما المشكلة؟'],
      ['B', "I've had a sore throat and a headache since yesterday.", 'أعاني من التهاب في الحلق وصداع منذ الأمس.'],
      ['A', 'Do you have a fever?', 'هل لديك حرارة؟'],
      ['B', 'Yes, a slight one last night.', 'نعم، حرارة خفيفة الليلة الماضية.'],
      ['A', "Let me take a look. Open your mouth and say 'ah'.", 'دعني ألقي نظرة. افتح فمك وقل "آه".'],
      ['B', 'Is it serious?', 'هل الأمر خطير؟'],
      ['A', "No, it looks like a common cold. Drink plenty of fluids and get some rest.", 'لا، يبدو أنها نزلة برد عادية. اشرب الكثير من السوائل وخذ قسطاً من الراحة.'],
      ['B', 'Should I take any medicine?', 'هل يجب أن آخذ أي دواء؟'],
      ['A', "Follow the pharmacist's advice, and come back if you don't feel better in a few days.", 'اتبع نصيحة الصيدلي، وعُد إذا لم تتحسن خلال أيام.']
    ]},
    { id: 'd9', level: 'intermediate', icon: '📞', title: 'Booking an appointment by phone', ar: 'حجز موعد عبر الهاتف', roles: ['Receptionist', 'Caller'], lines: [
      ['A', 'Good morning, Smile Dental Clinic. How can I help you?', 'صباح الخير، عيادة سمايل للأسنان. كيف أساعدك؟'],
      ['B', "Hi, I'd like to make an appointment for a check-up.", 'مرحباً، أود حجز موعد للفحص.'],
      ['A', 'Sure. Have you visited us before?', 'بالتأكيد. هل زرتنا من قبل؟'],
      ['B', "No, this is my first time.", 'لا، هذه أول مرة.'],
      ['A', "We have an opening on Tuesday at ten or Wednesday at two.", 'لدينا موعد متاح الثلاثاء الساعة العاشرة أو الأربعاء الساعة الثانية.'],
      ['B', 'Wednesday at two works better for me.', 'الأربعاء الساعة الثانية أنسب لي.'],
      ['A', 'Great. Can I have your name and phone number?', 'رائع. هل لي باسمك ورقم هاتفك؟'],
      ['B', "Sure, it's Noura Ahmed, and my number is 0501234567.", 'بالتأكيد، نورة أحمد، ورقمي 0501234567.'],
      ['A', "You're all set. Please arrive ten minutes early.", 'تم الحجز. يرجى الحضور قبل الموعد بعشر دقائق.']
    ]},
    { id: 'd10', level: 'intermediate', icon: '🍽️', title: 'At a restaurant', ar: 'في المطعم', roles: ['Waiter', 'Customer'], lines: [
      ['A', 'Good evening. Are you ready to order?', 'مساء الخير. هل أنت مستعد للطلب؟'],
      ['B', 'Almost. What do you recommend?', 'تقريباً. ماذا تنصح؟'],
      ['A', 'The grilled salmon is very popular tonight.', 'السلمون المشوي مطلوب جداً الليلة.'],
      ['B', "I'll have that, with a side salad, please.", 'سآخذه، مع سلطة جانبية من فضلك.'],
      ['A', 'Anything to drink?', 'هل تريد شيئاً للشرب؟'],
      ['B', 'Just water, thanks.', 'ماء فقط، شكراً.'],
      ['A', 'How is everything?', 'كيف الطعام؟'],
      ['B', "It's delicious, but I think the fish is a little undercooked.", 'لذيذ، لكن أظن أن السمك غير ناضج تماماً.'],
      ['A', "I'm so sorry about that. I'll take it back to the kitchen right away.", 'أعتذر جداً عن ذلك. سأعيده للمطبخ فوراً.'],
      ['B', 'Thank you. Could we also have the bill afterwards?', 'شكراً. وهل يمكن أن نحصل على الفاتورة بعد ذلك؟']
    ]},
    { id: 'd11', level: 'intermediate', icon: '💬', title: 'Small talk at work', ar: 'دردشة خفيفة في العمل', roles: ['Emma', 'You'], lines: [
      ['A', 'Morning! How was your weekend?', 'صباح الخير! كيف كانت عطلة نهاية الأسبوع؟'],
      ['B', 'It was relaxing, thanks. I went to the beach with my family. How about yours?', 'كانت مريحة، شكراً. ذهبت إلى الشاطئ مع عائلتي. وعطلتك؟'],
      ['A', 'Pretty quiet. I mostly caught up on some reading.', 'هادئة جداً. أغلب الوقت قرأت بعض الكتب.'],
      ['B', 'Oh nice! Anything good?', 'جميل! هل قرأتِ شيئاً جيداً؟'],
      ['A', 'Yes, a novel about time travel. I could lend it to you.', 'نعم، رواية عن السفر عبر الزمن. يمكنني إعارتها لك.'],
      ['B', "I'd love that. By the way, are you ready for the meeting later?", 'يسعدني ذلك. بالمناسبة، هل أنتِ مستعدة للاجتماع لاحقاً؟'],
      ['A', "Almost. I just need to finish a couple of slides.", 'تقريباً. فقط أحتاج إنهاء شريحتين.'],
      ['B', 'Let me know if you need a hand.', 'أخبريني إن احتجتِ مساعدة.']
    ]},
    { id: 'd12', level: 'advanced', icon: '💼', title: 'Job interview', ar: 'مقابلة عمل', roles: ['Interviewer', 'Candidate'], lines: [
      ['A', 'Thanks for coming in. Could you start by telling me a little about yourself?', 'شكراً لحضورك. هل تبدأ بالحديث قليلاً عن نفسك؟'],
      ['B', "Certainly. I have five years of experience in marketing, mainly in digital campaigns.", 'بالتأكيد. لدي خمس سنوات خبرة في التسويق، خاصة الحملات الرقمية.'],
      ['A', 'What would you say is your greatest strength?', 'ما هي أكبر نقطة قوة لديك برأيك؟'],
      ['B', "I'm very good at analyzing data and turning it into practical decisions.", 'أنا جيد جداً في تحليل البيانات وتحويلها إلى قرارات عملية.'],
      ['A', 'Can you tell me about a challenge you faced and how you handled it?', 'هل تحدثني عن تحدٍّ واجهته وكيف تعاملت معه؟'],
      ['B', "Last year our budget was cut by thirty percent, so I focused on the channels with the best return, and we still reached our targets.", 'العام الماضي خُفضت ميزانيتنا بنسبة 30%، فركزت على القنوات الأعلى عائداً، وحققنا أهدافنا رغم ذلك.'],
      ['A', 'Impressive. Why do you want to work for us?', 'مثير للإعجاب. لماذا تريد العمل معنا؟'],
      ['B', "I admire your company's focus on innovation, and I believe my skills match this role well.", 'أُقدّر تركيز شركتكم على الابتكار، وأعتقد أن مهاراتي تناسب هذا الدور.'],
      ['A', 'Do you have any questions for us?', 'هل لديك أي أسئلة لنا؟'],
      ['B', 'Yes. What would a typical day look like in this position?', 'نعم. كيف يبدو اليوم المعتاد في هذه الوظيفة؟']
    ]},
    { id: 'd13', level: 'advanced', icon: '🤝', title: 'Disagreeing politely in a meeting', ar: 'الاعتراض بلباقة في اجتماع', roles: ['Manager', 'You'], lines: [
      ['A', "I think we should launch the product next month.", 'أعتقد أنه يجب أن نطلق المنتج الشهر القادم.'],
      ['B', "I see your point, but I'm not sure we're ready yet.", 'أفهم وجهة نظرك، لكني لست متأكداً أننا جاهزون بعد.'],
      ['A', 'What makes you say that?', 'لماذا تقول ذلك؟'],
      ['B', "The testing phase isn't finished, and we've found a few bugs that could affect users.", 'مرحلة الاختبار لم تنتهِ، ووجدنا بعض الأخطاء التي قد تؤثر على المستخدمين.'],
      ['A', 'Fair enough. What would you suggest?', 'معك حق. ماذا تقترح؟'],
      ['B', "How about delaying it by two weeks? That would give us enough time to fix everything.", 'ما رأيك أن نؤجله أسبوعين؟ سيمنحنا ذلك وقتاً كافياً لإصلاح كل شيء.'],
      ['A', "That makes sense. Let's discuss it with the team tomorrow.", 'هذا منطقي. لنناقشه مع الفريق غداً.']
    ]}
  ],

  phrases: [
    { cat: 'التحية والتعارف', icon: '👋', items: [
      ['How are you doing?', 'كيف حالك؟'], ["Long time no see!", 'لم أرك منذ زمن!'], ["What do you do for a living?", 'ماذا تعمل؟'],
      ["It was nice talking to you.", 'سعدت بالحديث معك.'], ["Let's keep in touch.", 'لنبقَ على تواصل.'], ['Take care!', 'اعتنِ بنفسك!'],
      ["What brings you here?", 'ما الذي أتى بك إلى هنا؟'] ]},
    { cat: 'طلب التوضيح', icon: '❓', items: [
      ['Could you say that again, please?', 'هل يمكنك تكرار ذلك من فضلك؟'], ['Could you speak a bit more slowly?', 'هل يمكنك التحدث ببطء أكثر قليلاً؟'],
      ['What do you mean by that?', 'ماذا تقصد بذلك؟'], ['How do you spell that?', 'كيف تتهجّى ذلك؟'], ["Sorry, I didn't catch that.", 'آسف، لم أفهم ما قلت.'],
      ["What's the word for this in English?", 'ما اسم هذا بالإنجليزية؟'], ['Does that make sense?', 'هل هذا مفهوم؟'] ]},
    { cat: 'إبداء الرأي', icon: '💭', items: [
      ['In my opinion, ...', 'برأيي، ...'], ['As far as I know, ...', 'على حد علمي، ...'], ['I strongly believe that ...', 'أؤمن بشدة أن ...'],
      ["If you ask me, ...", 'إن سألتني، ...'], ["To be honest, ...", 'بصراحة، ...'], ["It seems to me that ...", 'يبدو لي أن ...'],
      ["I'm not sure, but I think ...", 'لست متأكداً، لكن أظن ...'] ]},
    { cat: 'الموافقة والاعتراض', icon: '⚖️', items: [
      ['I totally agree.', 'أوافق تماماً.'], ["That's a good point.", 'هذه نقطة جيدة.'], ["You're absolutely right.", 'معك حق تماماً.'],
      ["I see what you mean, but ...", 'أفهم ما تقصد، لكن ...'], ["I'm afraid I disagree.", 'أخشى أنني لا أوافق.'],
      ["That's not always true.", 'هذا ليس صحيحاً دائماً.'], ['I see it differently.', 'أرى الأمر بشكل مختلف.'] ]},
    { cat: 'الطلبات والعروض', icon: '🙏', items: [
      ['Could you do me a favor?', 'هل تسدي لي معروفاً؟'], ['Would you mind helping me?', 'هل تمانع مساعدتي؟'], ['Do you need a hand?', 'هل تحتاج مساعدة؟'],
      ["Can I ask you something?", 'هل يمكنني أن أسألك شيئاً؟'], ["Let me know if you need anything.", 'أخبرني إن احتجت أي شيء.'],
      ["I was wondering if you could ...", 'كنت أتساءل إن كان بإمكانك ...'], ["Would you like me to ...?", 'هل تريد أن أقوم بـ ...؟'] ]},
    { cat: 'الشكر والاعتذار', icon: '💐', items: [
      ['Thanks a lot, I really appreciate it.', 'شكراً جزيلاً، أقدّر ذلك حقاً.'], ["That's very kind of you.", 'هذا لطف كبير منك.'],
      ["I'm sorry for the inconvenience.", 'أعتذر عن الإزعاج.'], ['My apologies, it was my fault.', 'أعتذر، كان خطئي.'],
      ["No worries!", 'لا تقلق!'], ["Don't mention it.", 'لا شكر على واجب.'], ["Sorry I'm late.", 'آسف على التأخير.'] ]},
    { cat: 'السفر', icon: '🧳', items: [
      ['Where is the nearest pharmacy?', 'أين أقرب صيدلية؟'], ['How much does it cost?', 'كم يكلف؟'], ["I'd like to book a table for two.", 'أود حجز طاولة لشخصين.'],
      ['Can you call me a taxi?', 'هل يمكنك طلب سيارة أجرة لي؟'], ['Which platform does the train leave from?', 'من أي رصيف يغادر القطار؟'],
      ['Is there Wi-Fi here?', 'هل يوجد واي فاي هنا؟'], ["I've lost my bag.", 'لقد أضعت حقيبتي.'] ]},
    { cat: 'تعابير طبيعية', icon: '✨', items: [
      ['It depends.', 'يعتمد على الظروف.'], ["I'm on my way.", 'أنا في الطريق.'], ['It slipped my mind.', 'نسيت تماماً.'],
      ["Let's call it a day.", 'لنكتفِ بهذا اليوم.'], ["It's up to you.", 'القرار لك.'], ['Never mind.', 'لا يهم / انسَ الأمر.'],
      ["I'll figure it out.", 'سأجد حلاً.'], ['Fingers crossed!', 'أتمنى أن يتحقق!'] ]},
    { cat: 'العمل والاجتماعات', icon: '💼', items: [
      ["Let's get started.", 'لنبدأ.'], ['Can we move on to the next point?', 'هل ننتقل للنقطة التالية؟'], ["I'll get back to you on that.", 'سأعود إليك بخصوص ذلك.'],
      ["Could you send me the details by email?", 'هل ترسل لي التفاصيل بالبريد؟'], ["What's the deadline?", 'ما الموعد النهائي؟'],
      ["Let's touch base next week.", 'لنتواصل الأسبوع القادم.'], ["Just to clarify, ...", 'للتوضيح فقط، ...'] ]}
  ],

  words: [
    ['achieve', 'يحقق', 'She worked hard to achieve her goals.'], ['afford', 'يستطيع تحمّل التكلفة', "I can't afford a new car right now."],
    ['appreciate', 'يقدّر', 'I really appreciate your help.'], ['available', 'متاح', 'Is the manager available today?'],
    ['avoid', 'يتجنب', 'Try to avoid driving at rush hour.'], ['aware', 'مُدرك', 'Are you aware of the new rules?'],
    ['brief', 'موجز', 'Let me give you a brief summary.'], ['challenge', 'تحدٍّ', 'Learning a language is a great challenge.'],
    ['confident', 'واثق', 'She feels confident speaking English now.'], ['convenient', 'مناسب', 'Is Monday convenient for you?'],
    ['curious', 'فضولي', 'Children are naturally curious.'], ['deadline', 'موعد نهائي', 'The deadline for the report is Friday.'],
    ['decrease', 'ينخفض', 'Prices decreased last month.'], ['efficient', 'فعّال', 'This is a more efficient way to work.'],
    ['encourage', 'يشجّع', 'My teacher encouraged me to keep trying.'], ['essential', 'ضروري', 'Water is essential for life.'],
    ['estimate', 'يقدّر تقريباً', 'Can you estimate the cost?'], ['familiar', 'مألوف', 'This song sounds familiar.'],
    ['flexible', 'مرن', 'My working hours are flexible.'], ['generous', 'كريم', 'He is very generous with his time.'],
    ['habit', 'عادة', 'Reading every day is a good habit.'], ['improve', 'يحسّن', 'Listening daily will improve your English.'],
    ['include', 'يشمل', 'Does the price include breakfast?'], ['journey', 'رحلة', 'The journey took six hours.'],
    ['knowledge', 'معرفة', 'Knowledge is power.'], ['likely', 'مرجّح', "It's likely to rain tomorrow."],
    ['maintain', 'يحافظ على', 'It is important to maintain a healthy diet.'], ['mention', 'يذكر', "Don't mention it to anyone."],
    ['negotiate', 'يتفاوض', 'We need to negotiate a better price.'], ['obvious', 'واضح', 'The answer was obvious.'],
    ['opportunity', 'فرصة', 'This job is a great opportunity.'], ['patient', 'صبور', 'Be patient — progress takes time.'],
    ['prefer', 'يفضّل', 'I prefer tea to coffee.'], ['previous', 'سابق', 'In my previous job, I worked in sales.'],
    ['purpose', 'هدف / غرض', 'What is the purpose of your visit?'], ['recommend', 'يوصي', 'Can you recommend a good book?'],
    ['reliable', 'موثوق', 'This car is very reliable.'], ['remind', 'يذكّر', 'Please remind me to call him.'],
    ['require', 'يتطلّب', 'This job requires good communication skills.'], ['schedule', 'جدول', "What's your schedule for today?"],
    ['suggest', 'يقترح', 'I suggest we take a short break.'], ['suitable', 'مناسب', 'This film is suitable for children.'],
    ['support', 'يدعم', 'My family always supports me.'], ['tend to', 'يميل إلى', 'I tend to wake up early.'],
    ['therefore', 'لذلك', 'It was raining; therefore, we stayed home.'], ['thorough', 'شامل / دقيق', 'The doctor did a thorough check-up.'],
    ['valuable', 'قيّم', 'Thank you for your valuable advice.'], ['various', 'متنوع', 'We discussed various topics.'],
    ['willing', 'مستعد / راغب', "I'm willing to learn new things."], ['worth', 'يستحق', 'This museum is worth visiting.'],
    ['although', 'على الرغم من', 'Although it was late, we kept talking.'], ['eventually', 'في النهاية', 'Eventually, he found a job he loved.'],
    ['figure out', 'يكتشف / يفهم', "I can't figure out this problem."], ['look forward to', 'يتطلّع إلى', 'I look forward to hearing from you.'],
    ['run out of', 'ينفد', "We've run out of milk."], ['get used to', 'يعتاد على', "You'll get used to the accent."],
    ['come up with', 'يبتكر / يأتي بفكرة', 'She came up with a great idea.'], ['put off', 'يؤجّل', "Don't put off until tomorrow what you can do today."]
  ],

  tips: [
    'استمع يومياً ولو 10 دقائق — الاستمرارية أهم من المدة الطويلة.',
    'جرّب تقنية "الظل" (Shadowing): كرّر الجملة بعد المتحدث مباشرة بنفس النبرة والسرعة.',
    'استمع للحلقة نفسها مرتين: الأولى للفهم العام، والثانية مع النص.',
    'لا تترجم كل كلمة؛ حاول فهم المعنى من السياق.',
    'احفظ عبارات كاملة بدل كلمات منفردة — أسهل للاستخدام في المحادثة.',
    'سجّل صوتك وقارنه بالمتحدث الأصلي لتكتشف أخطاء النطق.',
    'غيّر لغة هاتفك إلى الإنجليزية لتتعلم مفردات يومية بدون جهد.',
    'شاهد الفيديو مع ترجمة إنجليزية (وليس عربية) لربط الصوت بالكلمة.',
    'استخدم ميزة إبطاء السرعة (0.75x) في البداية ثم ارفعها تدريجياً.',
    'تحدّث مع نفسك بالإنجليزية عن يومك — طريقة مجانية وفعّالة للطلاقة.',
    'اختر محتوى تحبه — الاهتمام بالموضوع يضاعف التعلّم.',
    'راجع كلماتك المحفوظة يومياً بالبطاقات التعليمية.',
    'لا تخف من الأخطاء؛ كل خطأ خطوة نحو الطلاقة.',
    'ابحث عن شريك محادثة في تطبيقات تبادل اللغات مثل Tandem أو HelloTalk.',
    'استخدم ميزة التكرار A-B لتكرار جملة صعبة حتى تفهمها تماماً.'
  ],

  links: [
    { group: 'مواقع تعليمية مجانية', items: [
      ['BBC Learning English', 'https://www.bbc.co.uk/learningenglish', 'دروس مجانية بكل المستويات من BBC'],
      ['British Council LearnEnglish', 'https://learnenglish.britishcouncil.org', 'دروس وتمارين من المجلس الثقافي البريطاني'],
      ['VOA Learning English', 'https://learningenglish.voanews.com', 'أخبار ودروس بإنجليزية مبسطة'],
      ['ELLLO', 'https://www.elllo.org', 'آلاف مقاطع الاستماع بلكنات مختلفة مع النص'],
      ['Breaking News English', 'https://breakingnewsenglish.com', 'دروس من الأخبار بسبعة مستويات'],
      ['News in Levels', 'https://www.newsinlevels.com', 'الخبر نفسه بثلاثة مستويات صعوبة'] ]},
    { group: 'النطق والقواميس', items: [
      ['YouGlish', 'https://youglish.com', 'اسمع أي كلمة في آلاف مقاطع يوتيوب حقيقية'],
      ['Cambridge Dictionary (EN–AR)', 'https://dictionary.cambridge.org/dictionary/english-arabic/', 'قاموس كامبريدج إنجليزي–عربي'],
      ["Oxford Learner's Dictionaries", 'https://www.oxfordlearnersdictionaries.com', 'قاموس أكسفورد للمتعلمين مع النطق'],
      ['Forvo', 'https://forvo.com', 'نطق الكلمات بأصوات متحدثين أصليين'] ]},
    { group: 'المحادثة مع الناس', items: [
      ['Tandem', 'https://www.tandem.net', 'تبادل لغوي مع متحدثين أصليين (مجاني)'],
      ['HelloTalk', 'https://www.hellotalk.com', 'محادثة نصية وصوتية مع متعلمين من العالم'],
      ['Cambly', 'https://www.cambly.com', 'محادثة مباشرة مع معلمين أصليين (مدفوع)'],
      ['italki', 'https://www.italki.com', 'دروس خاصة مع معلمين (مدفوع)'] ]},
    { group: 'اختبارات وكتابة', items: [
      ['EF SET', 'https://www.efset.org', 'اختبار مستوى مجاني معتمد على CEFR'],
      ['Write & Improve (Cambridge)', 'https://writeandimprove.com', 'تصحيح مجاني لكتاباتك من كامبريدج'],
      ['IELTS Official', 'https://ielts.org', 'الموقع الرسمي لاختبار الآيلتس'] ]},
    { group: 'تعلّم بالمتعة', items: [
      ['LyricsTraining', 'https://lyricstraining.com', 'تعلّم من الأغاني بملء الفراغات'],
      ['TED Talks', 'https://www.ted.com/talks', 'محاضرات ملهمة مع نصوص وترجمات'],
      ['Duolingo', 'https://www.duolingo.com', 'تمارين يومية قصيرة'] ]}
  ]
};
