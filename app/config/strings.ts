export const STRINGS = {
    paycheck: 'משכורת',
    'opening a bank account': 'פתיחת חשבון בנק',
    'making income': 'יצירת הכנסות',
    saving: 'חיסכון',
    investments: 'השקעות',
    'employment rights': 'זכויות עובד',
    subjectsScreenTitle: 'אז במה מתמקדים היום?',
    read: 'לקרוא',
    watch: 'לצפות',
    listen: 'להקשיב',
    play: 'להתנסות',
    "What's Missing?": 'מה חסר?',
    'Find the Error': 'חפש את התעות',
    'Paycheck Structure Explanation': 'הסבר על מבנה התלוש',
    "Paycheck Day Arrived. What's next?": 'הגיע התלוש. מה עושים עכשיו?',
    'What to do if the Paycheck is Broken?': 'מה עושים אם התלוש תקול?',
    'Missing Video Source': 'מקור וידאו חסר',
} as const;

export type StringKey = keyof typeof STRINGS;
