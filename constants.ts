

import { Category, CategoryId, LiarQuestionPair } from './types';

// Georgian Translations and UI Text
export const UI_TEXT = {
  title: "იმპოსტერი",
  startGame: "თამაშის დაწყება",
  playersConfig: "მოთამაშეები",
  category: "კატეგორია",
  timeConfig: "დრო (წუთი)",
  tapToReveal: "დააჭირე სანახავად",
  hideCard: "ბარათის დამალვა",
  passPhone: "გადაეცი ტელეფონი შემდეგ მოთამაშეს",
  youAre: "შენ ხარ",
  theImposter: "იმპოსტერი!",
  secretWord: "საიდუმლო სიტყვა:",
  tryToBlendIn: "შეეცადე არ გამოგაშკარავონ!",
  describeWord: "აღწერე სიტყვა, მაგრამ არ თქვა პირდაპირ!",
  timeRemaining: "დარჩენილი დრო",
  voteTitle: "ვინ არის იმპოსტერი?",
  voteSubtitle: "დააჭირე მოთამაშეს ხმის მისაცემად",
  citizensWin: "მოქალაქეებმა მოიგეს!",
  imposterWins: "იმპოსტერმა მოიგო!",
  imposterWas: "იმპოსტერი იყო:",
  wordWas: "სიტყვა იყო:",
  playAgain: "თავიდან თამაში",
  menu: "მენიუ",
  continue: "გაგრძელება",
  removeAds: "რეკლამის გათიშვა",
  aiGenerate: "AI სიტყვების გენერაცია",
  loadingAi: "AI ფიქრობს...",
  aiPromptPlaceholder: "მაგ: ფეხბურთი, კოსმოსი...",
  playerDefaultName: "მოთამაშე",
  enterNames: "სახელების შეყვანა",
  chooseCategory: "აირჩიე კატეგორია",
  settings: "პარამეტრები",
  impostors: "იმპოსტერი",
  hints: "მინიშნებები",
  hint: "მინიშნება",
  hintForImposter: "მინიშნება იმპოსტერს",
  hintLabel: "კატეგორია:",
  timeLimit: "დროის ლიმიტი",
  duration: "ხანგრძლივობა",
  minutesShort: "წთ",
  save: "შენახვა",
  back: "უკან",
  rules: "წესები",
  rulesText: "თამაშის წესები: ყველა იღებს ბარათს სიტყვით, გარდა ერთი 'იმპოსტერისა'. აღწერეთ სიტყვა რიგრიგობით. იმპოსტერმა უნდა გამოიცნოს სიტყვა ან თავი მოაჩვენოს რომ იცის. მოქალაქეებმა უნდა იპოვონ იმპოსტერი!",
  gameSettings: "თამაშის პარამეტრები",
  addPlayer: "მოთამაშის დამატება",
  stopGame: "გსურთ თამაშის შეწყვეტა?",
  yes: "დიახ",
  no: "არა"
};

export const LIAR_UI_TEXT = {
    title: "ვინ არის მატყუარა?",
    liars: "მატყუარები",
    tapToFlip: "დააჭირე გასახსნელად",
    yourAnswer: "შენი პასუხი",
    submit: "დადასტურება",
    question: "შეკითხვა",
    passPhoneTo: "გადაეცი ტელეფონი:",
    revealLiars: "მატყუარას გამოჩენა",
    restart: "თავიდან",
    youAreLiar: "შენ გაქვს განსხვავებული კითხვა!",
    youAreTruth: "უპასუხე კითხვას გულწრფელად!",
    player: "მოთამაშე",
    typeAnswer: "ჩაწერე პასუხი...",
    truthQuestionWas: "სიმართლის კითხვა:",
    liarQuestionWas: "მატყუარას კითხვა:",
    description: "ყველა მოთამაშე პასუხობს კითხვას, მაგრამ ერთს აქვს განსხვავებული დავალება. იპოვე მატყუარა პასუხების მიხედვით!",
    rules: "წესები",
    rulesText: "თამაშის წესები: ყველა მოთამაშე იღებს კითხვას და წერს პასუხს. 'მატყუარას' მოსდის სრულიად განსხვავებული კითხვა. პასუხების გამოჩენის შემდეგ, მოთამაშეებმა უნდა იმსჯელონ და იპოვონ ის, ვისი პასუხიც არ ერგება საერთო კონტექსტს."
};

export const KALAKOBANA_UI_TEXT = {
  title: "ქალაქობანა",
  categories: "კატეგორიები",
  letter: "ასო",
  startRound: "რაუნდის დაწყება",
  stop: "სტოპ!",
  finish: "დასრულება",
  calculate: "დათვლა",
  totalScore: "ჯამური ქულა",
  enterCategory: "ჩაწერე კატეგორია...",
  spinLetter: "ასოს არჩევა",
  yourAnswers: "შენი პასუხები",
  rules: "წესები",
  rulesText: "დააჭირეთ 'ასოს გენერაციას'. შეავსეთ ველები ამ ასოზე დაწყებული სიტყვებით. ვინც პირველი მორჩება იძახის 'სტოპ'. შემდეგ ხელით მიანიჭეთ ქულები: 5 (ემთხვევა სხვას), 10 (უნიკალურია), 20 (მხოლოდ შენ დაწერე).",
  score0: "0",
  score5: "5",
  score10: "10",
  score20: "20",
  gameDescription: "ტრადიციული ქალაქობანა: აირჩიე ასო, შეავსე კატეგორიები და დააგროვე ქულები.",
  randomLetter: "დაწყება / შექმნა",
  randomLetterGenerator: "ასოს გენერაცია",
  enterLetter: "ასოს მითითება",
  typeLetter: "ჩაწერე ასო",
  sessionScore: "სესიის ქულა",
  resetScore: "ქულის განულება"
};

export const GEORGIAN_ALPHABET = [
  'ა', 'ბ', 'გ', 'დ', 'ე', 'ვ', 'ზ', 'თ', 'ი', 'კ', 'ლ', 'მ', 'ნ', 'ო', 'პ', 'ჟ', 'რ', 'ს', 'ტ', 'უ', 'ფ', 'ქ', 'ღ', 'ყ', 'შ', 'ჩ', 'ც', 'ძ', 'წ', 'ჭ', 'ხ', 'ჯ', 'ჰ'
];

export const DEFAULT_KALAKOBANA_CATEGORIES = [
  "ქალაქი",
  "სოფელი",
  "სახელი",
  "გვარი",
  "ცხოველი",
  "მცენარე",
  "ნივთი"
];

export const CATEGORIES: Category[] = [
  {
    id: CategoryId.EASY,
    label: "ადვილი",
    color: "bg-green-500",
    icon: "🌱",
    words: [
      { word: "ვაშლი", hint: "ხილი" },
      { word: "სახლი", hint: "ნაგებობა" },
      { word: "მზე", hint: "ასტრონომია" },
      { word: "მანქანა", hint: "ტრანსპორტი" },
      { word: "ძაღლი", hint: "ცხოველი" },
      { word: "ზღვა", hint: "გეოგრაფია" },
      { word: "ბურთი", hint: "სპორტი" },
      { word: "კატა", hint: "ცხოველი" },
      { word: "სკამი", hint: "ავეჯი" },
      { word: "წიგნი", hint: "ნივთი" },
      { word: "მეტრო", hint: "ტრანსპორტი" },
      { word: "ავტობუსი", hint: "ტრანსპორტი" },
      { word: "სკოლა", hint: "შენობა" },
      { word: "საავადმყოფო", hint: "დაწესებულება" },
      { word: "ბანკი", hint: "დაწესებულება" },
      { word: "აეროპორტი", hint: "შენობა" },
      { word: "მარშრუტკა", hint: "ტრანსპორტი" },
      { word: "პარკი", hint: "ადგილი" },
      { word: "კინოთეატრი", hint: "გართობა" },
      { word: "სტადიონი", hint: "სპორტი" },
      { word: "ლეპტოპი", hint: "ტექნიკა" },
      { word: "ყურსასმენი", hint: "ტექნიკა" },
      { word: "მაცივარი", hint: "საოჯახო ნივთი" },
      { word: "სარეცხი მანქანა", hint: "საოჯახო ნივთი" },
      { word: "დანა", hint: "ჭურჭელი" },
      { word: "ჭიქა", hint: "ჭურჭელი" },
      { word: "სათვალე", hint: "აქსესუარი" },
      { word: "ბალიში", hint: "საძინებელი" },
      { word: "საპონი", hint: "ჰიგიენა" },
      { word: "გასაღები", hint: "ნივთი" },
      { word: "ხინკალი", hint: "კერძი" },
      { word: "ხაჭაპური", hint: "ცომეული" },
      { word: "მწვადი", hint: "ხორცი" },
      { word: "ჩურჩხელა", hint: "ტკბილეული" },
      { word: "ლობიო", hint: "კერძი" },
      { word: "საცივი", hint: "საახალწლო სუფრა" },
      { word: "გოზინაყი", hint: "ტკბილეული" },
      { word: "ღვინო", hint: "სასმელი" },
      { word: "ტყემალი", hint: "სოუსი" },
      { word: "ტელეფონი", hint: "ტექნიკა" },
      { word: "მაგიდა", hint: "ავეჯი" },
      { word: "ხე", hint: "ბუნება" },
      { word: "პური", hint: "საკვები" },
      { word: "წყალი", hint: "სითხე" },
      { word: "ფეხბურთი", hint: "სპორტი" },
      { word: "თვითმფრინავი", hint: "ტრანსპორტი" },
      { word: "კალამი", hint: "ნივთი" },
      { word: "საათი", hint: "აქსესუარი" },
      { word: "სარკე", hint: "ნივთი" },
      { word: "ფეხსაცმელი", hint: "ტანსაცმელი" },
      { word: "კბილის ჯაგრისი", hint: "ჰიგიენა" },
      { word: "ლოგინი", hint: "ავეჯი" },
      { word: "მთვარე", hint: "ასტრონომია" },
      { word: "ყვავილი", hint: "მცენარე" },
      // Abstract & Concepts
      { word: "სიზმარი", hint: "ღამე" },
      { word: "ჩრდილი", hint: "სინათლე" },
      { word: "ხმაური", hint: "ქალაქი" },
      { word: "სიჩუმე", hint: "მშვიდობა" },
      { word: "შიმშილი", hint: "კუჭი" },
      { word: "შიში", hint: "ემოცია" },

      // Objects with Functional Hints
      { word: "სავარცხელი", hint: "ვარცხნილობა" },
      { word: "ასანთი", hint: "ნაპერწკალი" },
      { word: "ნემსი", hint: "კერვა" },
      { word: "ღილაკი", hint: "თითი" },
      { word: "ბოქლომი", hint: "უსაფრთხოება" },
      { word: "საფულე", hint: "ჯიბე" },
      { word: "ხალიჩა", hint: "იატაკი" },

      // Nature & Science
      { word: "ნისლი", hint: "ხედვა" },
      { word: "ცეცხლი", hint: "სითბო" },
      { word: "ყინული", hint: "დნობა" },
      { word: "ფესვები", hint: "მიწა" },
      { word: "ობობა", hint: "ქსელი" },
      { word: "ვარსკვლავი", hint: "ცა" },

      // Places & Infrastructure
      { word: "ხიდი", hint: "გადაკვეთა" },
      { word: "გვირაბი", hint: "სიბნელე" },
      { word: "ლიფტი", hint: "სართული" },
      { word: "აივანი", hint: "ჰაერი" },
      { word: "სარდაფი", hint: "ქვემოთ" },
      { word: "სახურავი", hint: "ზემოთ" },

      // Activities & Culture
      { word: "ცეკვა", hint: "რიტმი" },
      { word: "ჭადრაკი", hint: "სტრატეგია" },
      { word: "ნარდი", hint: "კამათელი" },
      { word: "თამადა", hint: "სუფრა" },
      { word: "სადღეგრძელო", hint: "სიტყვები" },

      // Anatomy & Body
      { word: "გული", hint: "ფეთქვა" },
      { word: "ტვინი", hint: "აზროვნება" },
      { word: "სისხლი", hint: "წითელი" },
      { word: "კბილი", hint: "ღიმილი" },
      { word: "თვალი", hint: "ხედვა" },

      // Household & Daily Life
      { word: "მტვერსასრუტი", hint: "დასუფთავება" },
      { word: "უთო", hint: "ტანსაცმელი" },
      { word: "შამპუნი", hint: "აბაზანა" },
      { word: "ტაფა", hint: "შეწვა" },
      { word: "ჩაიდანი", hint: "დუღილი" },

      { word: "ექიმი", hint: "მკურნალობა" },
      { word: "მასწავლებელი", hint: "სკოლა" },
      { word: "მეხანძრე", hint: "ცეცხლი" },
      { word: "პოლიციელი", hint: "უსაფრთხოება" },
      { word: "მზარეული", hint: "სამზარეულო" },
      { word: "მძღოლი", hint: "მართვა" },
      { word: "მშენებელი", hint: "მშენებლობა" },
      { word: "მევაჭრე", hint: "ბაზარი" },
      { word: "მეკვლე", hint: "დღესასწაული" },
      { word: "მხატვარი", hint: "ნახატი" },

      { word: "ჩაქუჩი", hint: "ლურსმანი" },
      { word: "ხრახნდამჭერი", hint: "ხრახნი" },
      { word: "სახრახნისი", hint: "მოტრიალება" },
      { word: "სახერხი", hint: "ჭრა" },
      { word: "საზომი ლენტი", hint: "სიგრძე" },
      { word: "ფანარი", hint: "ბნელში" },
      { word: "მაკრატელი", hint: "ქაღალდი" },
      { word: "კალათამ", hint: "ნაგავი" },
      { word: "ვედრო", hint: "წყალი" },
      { word: "საწმენდი ჯაგრისი", hint: "დასუფთავება" },
      
      { word: "სიხარული", hint: "ღიმილი" },
      { word: "გაბრაზება", hint: "ემოცია" },
      { word: "დაღლა", hint: "ძილი" },
      { word: "სიყვარული", hint: "გული" },
      { word: "მოტივაცია", hint: "ენერგია" },
      { word: "იმედი", hint: "მომავალი" },
      { word: "მარტოობა", hint: "სიმარტოვე" },
      { word: "ნდობა", hint: "ურთიერთობა" },
      { word: "ეჭვი", hint: "კითხვა" },
      { word: "გაოცება", hint: "სიურპრიზი" },
      
      { word: "კარტი", hint: "თამაში" },
      { word: "დომინო", hint: "ქვები" },
      { word: "ლოტო", hint: "ციფრები" },
      { word: "კონსოლი", hint: "ვიდეოთამაში" },
      { word: "ჯოისტიკი", hint: "მართვა" },
      { word: "ფაზლი", hint: "აწყობა" },
      { word: "ლაბირინთი", hint: "გზა" },
      { word: "თოჯინა", hint: "სათამაშო" },
      { word: "ბურთულები", hint: "სათამაშო" },
      { word: "ბატუტი", hint: "ხტომა" },
      
      { word: "წვიმა", hint: "ღრუბელი" },
      { word: "ქარი", hint: "ქროლვა" },
      { word: "ქარიშხალი", hint: "სტიქია" },
      { word: "ელვა", hint: "ცაზე" },
      { word: "ჭექა-ქუხილი", hint: "ხმაური" },
      { word: "მზე ამოდის", hint: "დილა" },
      { word: "დასავლეთი", hint: "მზე ჩადის" },
      { word: "მდინარე", hint: "დინება" },
      { word: "ტბა", hint: "წყალი" },
      { word: "მთა", hint: "სიმაღლე" },
      
      // Food & Objects (Hard)
      { word: "ვაშლი", hint: "დაცემა" },          // ნიუტონი, ცოდნა
      { word: "ხინკალი", hint: "შიგნით" },        // შიგთავსი
      { word: "ყავა", hint: "გაღვიძება" },
      { word: "ღვინო", hint: "სუფრა" },
      { word: "შოკოლადი", hint: "ცდუნება" },
      { word: "პური", hint: "დღიური" },
      { word: "ნაყინი", hint: "დნობა" },
      
      // Places (Hard)
      { word: "სკოლა", hint: "ზარი" },
      { word: "საავადმყოფო", hint: "მორიგეობა" },
      { word: "ბანკი", hint: "ნდობა" },
      { word: "აეროპორტი", hint: "დალოდება" },
      { word: "კინოთეატრი", hint: "ბნელში" },
      { word: "სტადიონი", hint: "ხმაური" },
      { word: "პარკი", hint: "ჩრდილი" },
      
      // Transport (Hard)
      { word: "მანქანა", hint: "საცობი" },
      { word: "მეტრო", hint: "ქვემოთ" },
      { word: "თვითმფრინავი", hint: "დროის სხვაობა" },
      { word: "ველოსიპედი", hint: "ბალანსი" },
      { word: "მარშრუტკა", hint: "სივიწროვე" },
      
      // Animals & Nature (Hard)
      { word: "ძაღლი", hint: "ერთგულება" },
      { word: "კატა", hint: "დამოუკიდებლობა" },
      { word: "ობობა", hint: "ხაფანგი" },
      { word: "თევზი", hint: "სიჩუმე" },
      { word: "ხე", hint: "ფესვები" },
      { word: "ყვავილი", hint: "წამიერი" },
      
      // Objects (Hard)
      { word: "სარკე", hint: "თავი" },
      { word: "საათი", hint: "ლოდინი" },
      { word: "გასაღები", hint: "წვდომა" },
      { word: "კარი", hint: "გადაწყვეტილება" },
      { word: "ტელეფონი", hint: "შეტყობინება" },
      { word: "ყურსასმენი", hint: "იზოლაცია" },
      
      // Abstract / Concepts (Hard)
      { word: "შიში", hint: "თავდაცვა" },
      { word: "სიზმარი", hint: "რეალობისგან გაქცევა" },
      { word: "იმედი", hint: "ხვალ" },
      { word: "სიჩუმე", hint: "დაძაბულობა" },
      { word: "ხმაური", hint: "დაკარგვა" },
      { word: "დრო", hint: "არ ბრუნდება" },
      
      // Activities (Hard)
      { word: "ცეკვა", hint: "სხეულის ენა" },
      { word: "ჭადრაკი", hint: "ერთი ნაბიჯით ადრე" },
      { word: "ფეხბურთი", hint: "ერთადერთი გოლი" },
      { word: "ხატვა", hint: "შიდა ხმა" },
      { word: "წერა", hint: "წაშლა" },
      
      // Body (Hard)
      { word: "გული", hint: "რიტმი" },
      { word: "თვალი", hint: "შეხვედრა" },
      { word: "ტვინი", hint: "შეცდომები" },
      { word: "ხელი", hint: "მიცემა" },
      { word: "სისხლი", hint: "კავშირი" },
      
      { word: "კარი", hint: "ორი მხარე" },
      { word: "მთვარე", hint: "სესხებული შუქი" },
      { word: "მზე", hint: "უსასყიდლო ენერგია" },
      { word: "სარკე", hint: "სხვისი თვალით ნახვა" },
      { word: "სახლი", hint: "დაბრუნება" },
      { word: "მდინარე", hint: "ერთხელვე არა" },
      { word: "დრო", hint: "ყველაზე ძვირი ვალუტა" },
      { word: "ჩრდილი", hint: "შენ გვერდით" },
      { word: "ცეცხლი", hint: "მეგობარიც და მტერიც" },
      { word: "ყინული", hint: "დროებით" },
    ]
  },
  {
    id: CategoryId.HARD,
    label: "რთული",
    color: "bg-red-600",
    icon: "🔥",
    words: [
      { word: "ფილოსოფია", hint: "მეცნიერება" },
      { word: "სინქროფაზოტრონი", hint: "ფიზიკა" },
      { word: "პარადოქსი", hint: "ლოგიკა" },
      { word: "მეტაფორა", hint: "ლიტერატურა" },
      { word: "ინსომნია", hint: "მდგომარეობა" },
      { word: "კარმა", hint: "რწმენა" },
      { word: "ნოსტალგია", hint: "გრძნობა" },
      { word: "ირონია", hint: "იუმორი" },

      // Food & Objects (Hard)
      { word: "ვაშლი", hint: "დაცემა" },        
      { word: "ხინკალი", hint: "შიგნით" },        
      { word: "ყავა", hint: "გაღვიძება" },
      { word: "ღვინო", hint: "სუფრა" },
      { word: "შოკოლადი", hint: "ცდუნება" },
      { word: "პური", hint: "დღიური" },
      { word: "ნაყინი", hint: "დნობა" },
      
      // Places (Hard)
      { word: "სკოლა", hint: "ზარი" },
      { word: "საავადმყოფო", hint: "მორიგეობა" },
      { word: "ბანკი", hint: "ნდობა" },
      { word: "აეროპორტი", hint: "დალოდება" },
      { word: "კინოთეატრი", hint: "ბნელში" },
      { word: "სტადიონი", hint: "ხმაური" },
      { word: "პარკი", hint: "ჩრდილი" },
      
      // Transport (Hard)
      { word: "მანქანა", hint: "საცობი" },
      { word: "მეტრო", hint: "ქვემოთ" },
      { word: "თვითმფრინავი", hint: "დროის სხვაობა" },
      { word: "ველოსიპედი", hint: "ბალანსი" },
      { word: "მარშრუტკა", hint: "სივიწროვე" },
      
      // Animals & Nature (Hard)
      { word: "ძაღლი", hint: "ერთგულება" },
      { word: "კატა", hint: "დამოუკიდებლობა" },
      { word: "ობობა", hint: "ხაფანგი" },
      { word: "თევზი", hint: "სიჩუმე" },
      { word: "ხე", hint: "ფესვები" },
      { word: "ყვავილი", hint: "წამიერი" },
      
      // Objects (Hard)
      { word: "სარკე", hint: "თავი" },
      { word: "საათი", hint: "ლოდინი" },
      { word: "გასაღები", hint: "წვდომა" },
      { word: "კარი", hint: "გადაწყვეტილება" },
      { word: "ტელეფონი", hint: "შეტყობინება" },
      { word: "ყურსასმენი", hint: "იზოლაცია" },
      
      // Abstract / Concepts (Hard)
      { word: "შიში", hint: "თავდაცვა" },
      { word: "სიზმარი", hint: "რეალობისგან გაქცევა" },
      { word: "იმედი", hint: "ხვალ" },
      { word: "სიჩუმე", hint: "დაძაბულობა" },
      { word: "ხმაური", hint: "დაკარგვა" },
      { word: "დრო", hint: "არ ბრუნდება" },
      
      // Activities (Hard)
      { word: "ცეკვა", hint: "სხეულის ენა" },
      { word: "ჭადრაკი", hint: "ერთი ნაბიჯით ადრე" },
      { word: "ფეხბურთი", hint: "ერთადერთი გოლი" },
      { word: "ხატვა", hint: "შიდა ხმა" },
      { word: "წერა", hint: "წაშლა" },
      
      // Body (Hard)
      { word: "გული", hint: "რიტმი" },
      { word: "თვალი", hint: "შეხვედრა" },
      { word: "ტვინი", hint: "შეცდომები" },
      { word: "ხელი", hint: "მიცემა" },
      { word: "სისხლი", hint: "კავშირი" },
      
      { word: "კარი", hint: "ორი მხარე" },
      { word: "მთვარე", hint: "სესხებული შუქი" },
      { word: "მზე", hint: "უსასყიდლო ენერგია" },
      { word: "სარკე", hint: "სხვისი თვალით ნახვა" },
      { word: "სახლი", hint: "დაბრუნება" },
      { word: "მდინარე", hint: "ერთხელვე არა" },
      { word: "დრო", hint: "ყველაზე ძვირი ვალუტა" },
      { word: "ჩრდილი", hint: "შენ გვერდით" },
      { word: "ცეცხლი", hint: "მეგობარიც და მტერიც" },
      { word: "ყინული", hint: "დროებით" },
    ]
  },
  {
    id: CategoryId.FUNNY,
    label: "სასაცილო",
    color: "bg-yellow-500",
    icon: "🤪",
    words: [
      { word: "წინდა", hint: "ტანსაცმელი" },
      { word: "ბაბუაწვერა", hint: "მცენარე" },
      { word: "პიჟამო", hint: "ტანსაცმელი" },
      { word: "ღიპი", hint: "სხეული" },
      { word: "ქათამი", hint: "ფრინველი" },
      { word: "ბანანი", hint: "ხილი" },
      { word: "ტუალეტი", hint: "ოთახი" },
      { word: "ზებრა", hint: "ცხოველი" }
    ]
  },
  {
    id: CategoryId.KIDS,
    label: "ბავშვები",
    color: "bg-blue-400",
    icon: "🧸",
    words: [
      { word: "თოჯინა", hint: "სათამაშო" },
      { word: "ნაყინი", hint: "ტკბილეული" },
      { word: "ცირკი", hint: "გართობა" },
      { word: "პარკი", hint: "ადგილი" },
      { word: "სკოლა", hint: "შენობა" },
      { word: "მულტფილმი", hint: "ეკრანი" },
      { word: "შოკოლადი", hint: "ტკბილეული" },
      { word: "რობოტი", hint: "ტექნიკა" }
    ]
  },
  {
    id: CategoryId.ADULT,
    label: "18+",
    color: "bg-purple-600",
    icon: "🔞",
    words: [
      { word: "პრეზერვატივი", hint: "აფთიაქი" },
      { word: "სექსი", hint: "ქმედება" },
      { word: "ხელბორკილი", hint: "აქსესუარი" },
      { word: "სტრიპტიზი", hint: "ცეკვა" },
      { word: "ორგაზმი", hint: "სიამოვნება" },
      { word: "ვისკი", hint: "სასმელი" },
      { word: "პოკერი", hint: "თამაში" }
    ]
  },
  {
    id: CategoryId.AI_GEN,
    label: "AI გენერატორი",
    color: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    icon: "✨",
    words: [] // Populated dynamically
  }
];

export const LIAR_GAME_CATEGORIES = [
    { id: 'ALL', label: 'ყველა', icon: '🎲' },
    { id: 'NUMBERS', label: 'რიცხვები', icon: '🔢' },
    { id: 'PERSONAL', label: 'პიროვნული', icon: '👤' },
    { id: 'FUN', label: 'გასართობი', icon: '🎪' }
];

export const LIAR_QUESTIONS: LiarQuestionPair[] = [
    // ID 1 - harder
{ 
  id: '1',
  truthQuestion: "რამდენჯერ იბან ფეხებს კვირაში?",
  liarQuestion: "რამდენჯერ იბან ხელებს კვირაში?",
  category: "NUMBERS"
},

// ID 5 - harder
{ 
  id: '5',
  truthQuestion: "რამდენი ლარი გაქვს საფულეში?",
  liarQuestion: "რამდენი ლარი გაქვს ჯიბეში?",
  category: "NUMBERS"
},

// ID 4 - harder
{ 
  id: '4',
  truthQuestion: "სად გძინავს ხოლმე?",
  liarQuestion: "სად ისვენებ ხოლმე ყველაზე ხშირად?",
  category: "PERSONAL"
},

// ID 7 - harder
{ 
  id: '7',
  truthQuestion: "რა არის შენი საყვარელი სასმელი?",
  liarQuestion: "რა არის შენი საყვარელი ცხელი სასმელი?",
  category: "FUN"
},

// ID 23 - harder
{ 
  id: '23',
  truthQuestion: "სად დაიმალებოდი ზომბების აპოკალიფსის დროს?",
  liarQuestion: "სად დაიმალებოდი ქარიშხლის დროს?",
  category: "FUN"
},
{ id: '61', truthQuestion: "რამდენი შეტყობინება გაქვს unread?", liarQuestion: "რამდენი ზარი გაქვს გამოტოვებული?", category: "NUMBERS" },
{ id: '62', truthQuestion: "რამდენი პროცენტია ტელეფონი ახლა?", liarQuestion: "რამდენი პროცენტით გაქვს ხმის დონე?", category: "NUMBERS" },
{ id: '63', truthQuestion: "რამდენი ნაბიჯი გადაგიდგამს დღეს (დაახლოებით)?", liarQuestion: "რამდენი წუთი იარე დღეს (დაახლოებით)?", category: "NUMBERS" },
{ id: '64', truthQuestion: "რამდენი აპლიკაცია გაქვს ტელეფონში (დაახლოებით)?", liarQuestion: "რამდენი ფოტო გაქვს ტელეფონში (დაახლოებით)?", category: "NUMBERS" },
{ id: '65', truthQuestion: "რამდენი ჭიქა წყალს სვამ დღეში?", liarQuestion: "რამდენი ჭიქა ჩაი/ყავას სვამ დღეში?", category: "NUMBERS" },
{ id: '66', truthQuestion: "რამდენი საათი გძინავს ღამით?", liarQuestion: "რამდენი საათი გძინავს 24 საათში მთლიანად?", category: "NUMBERS" },
{ id: '67', truthQuestion: "რამდენი მეგობარი გყავს ტელეფონში შენახული?", liarQuestion: "რამდენი კონტაქტი გყავს ტელეფონში?", category: "NUMBERS" },
{ id: '68', truthQuestion: "რამდენი ლარი გიფიქსირდება ბარათზე (დაახლოებით)?", liarQuestion: "რამდენი ლარი გაქვს ნაღდი (დაახლოებით)?", category: "NUMBERS" },
{ id: '69', truthQuestion: "რამდენჯერ ჭამ დღეში?", liarQuestion: "რამდენჯერ სვამ რამეს დღეში?", category: "NUMBERS" },
{ id: '70', truthQuestion: "რამდენი კილომეტრი გივლია ამ თვეში (დაახლოებით)?", liarQuestion: "რამდენი კილომეტრი გივლია ამ კვირაში (დაახლოებით)?", category: "NUMBERS" },

{ id: '71', truthQuestion: "რომელი სიტყვა გიხასიათებს ყველაზე მეტად?", liarQuestion: "რომელი სიტყვა გაღიზიანებს ყველაზე მეტად?", category: "PERSONAL" },
{ id: '72', truthQuestion: "რა გააკეთე ბოლო დროს პირველად?", liarQuestion: "რა გააკეთე ბოლო დროს მეორედ?", category: "PERSONAL" },
{ id: '73', truthQuestion: "ვინ გწერს ყველაზე ხშირად?", liarQuestion: "ვის წერ ყველაზე ხშირად?", category: "PERSONAL" },
{ id: '74', truthQuestion: "რა გაბედე ბოლოს?", liarQuestion: "რა ვერ გაბედე ბოლოს?", category: "PERSONAL" },
{ id: '75', truthQuestion: "რა გიყვარს ბავშვობიდან?", liarQuestion: "რა გიყვარდა ბავშვობაში ყველაზე მეტად?", category: "PERSONAL" },
{ id: '76', truthQuestion: "სად იყავი ბოლოს გასეირნებაზე?", liarQuestion: "სად იქნებოდი ახლა რომ შეგეძლოს?", category: "PERSONAL" },
{ id: '77', truthQuestion: "რას აკეთებ როცა ნერვიულობ?", liarQuestion: "რას აკეთებ როცა გაბრაზებული ხარ?", category: "PERSONAL" },
{ id: '78', truthQuestion: "რა არის შენი ყველაზე ძლიერი მხარე?", liarQuestion: "რა არის შენი ყველაზე სუსტი მხარე?", category: "PERSONAL" },
{ id: '79', truthQuestion: "რის გამო გემადლიერებიან ხოლმე?", liarQuestion: "რის გამო გეჩხუბებიან ხოლმე?", category: "PERSONAL" },
{ id: '80', truthQuestion: "ვინ იყო ბოლო ადამიანი ვისთანაც ილაპარაკე?", liarQuestion: "ვინ იყო პირველი ადამიანი ვისთანაც ილაპარაკე დღეს?", category: "PERSONAL" },

{ id: '81', truthQuestion: "რომელ ფილმში ისურვებდი ცხოვრებას?", liarQuestion: "რომელ ფილმში ვერ იცხოვრებდი ვერასდროს?", category: "FUN" },
{ id: '82', truthQuestion: "რა გაგრძნობინებს თავს ძლიერად?", liarQuestion: "რა გაგრძნობინებს თავს სუსტად?", category: "FUN" },
{ id: '83', truthQuestion: "რა სუპერძალას აირჩევდი?", liarQuestion: "რა სუპერძალა გეცოდინებოდა ცუდად?", category: "FUN" },
{ id: '84', truthQuestion: "რომელი ნივთი გახსოვს ბავშვობიდან?", liarQuestion: "რომელი სუნი გახსოვს ბავშვობიდან?", category: "FUN" },
{ id: '85', truthQuestion: "რომელი ცხოველი იქნებოდი?", liarQuestion: "რომელი ცხოველი გეყოლებოდა?", category: "FUN" },
{ id: '86', truthQuestion: "რა არის შენი 'გილטי პლეზური'?", liarQuestion: "რა არის შენი ყველაზე უტყუარი გემო?", category: "FUN" },
{ id: '87', truthQuestion: "რომელი თამაში მოგწონს ყველაზე მეტად?", liarQuestion: "რომელი თამაში გეზარება ყველაზე მეტად?", category: "FUN" },
{ id: '88', truthQuestion: "რა შეგრცხვებოდა საზოგადოებაში?", liarQuestion: "რა გაგაცინებდა საზოგადოებაში?", category: "FUN" },
{ id: '89', truthQuestion: "რას გააკეთებდი რომ ერთ დღეში მილიონერი გახდე?", liarQuestion: "რას გააკეთებდი რომ ერთ დღეში გაქრეს ფული?", category: "FUN" },
{ id: '90', truthQuestion: "სად წახვიდოდი მარტო?", liarQuestion: "სად წახვიდოდი მეგობრებთან ერთად?", category: "FUN" },

{ id: '91', truthQuestion: "რა ჭამე ბოლოს?", liarQuestion: "რა დალიე ბოლოს?", category: "FUN" },
{ id: '92', truthQuestion: "სად ხარ ახლა?", liarQuestion: "სად იყავი 1 საათის წინ?", category: "PERSONAL" },
{ id: '93', truthQuestion: "ვინ მოგენატრა?", liarQuestion: "ვინ გაგახსენდა?", category: "PERSONAL" },
{ id: '94', truthQuestion: "რა გინდა ახლა?", liarQuestion: "რა გინდოდა დილით?", category: "PERSONAL" },
{ id: '95', truthQuestion: "რა გესიზმრა ბოლოს?", liarQuestion: "რა გახსოვს ბავშვობიდან ბოლოს?", category: "FUN" },
];

export const DEFAULT_PLAYER_COUNT = 3;
export const DEFAULT_TIMER_MINUTES = 3;