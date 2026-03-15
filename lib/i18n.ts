export type Locale = 'en' | 'ar';

const translations = {
  en: {
    'app.title': 'Greeting Card Generator',
    'app.description': 'Create beautiful personalized greeting cards. Upload an image, add your message, and share it with anyone.',
    'app.createCard': 'Create a Card',

    'steps.design.title': 'Design',
    'steps.design.desc': 'Upload an image, and style the recipient name.',
    'steps.share.title': 'Share',
    'steps.share.desc': 'Publish your card and get a unique link to share with anyone.',
    'steps.download.title': 'Download',
    'steps.download.desc': 'Recipients enter their name and download a personalized card.',

    'nav.home': 'Home',
    'nav.createCard': 'Create Card',
    'nav.yourCard': 'Your Greeting Card',

    'create.bgImage': 'Background Image',
    'create.clickOrDrag': 'Click or drag to upload',
    'create.fileHint': 'PNG, JPG up to 10MB',
    'create.clickToChange': 'Click to change',
    'create.nameTextStyle': 'Name Text Style',
    'create.customFont': 'Custom Font',
    'create.uploadFont': 'Upload .ttf, .woff, .woff2, .otf',
    'create.loadingFont': 'Loading font...',
    'create.fontFamily': 'Font Family',
    'create.latinFonts': 'Latin Fonts',
    'create.arabicFonts': 'Arabic Fonts',
    'create.customFontGroup': 'Custom Font',
    'create.rtlHint': 'RTL font selected -- text will render right-to-left',
    'create.fontSize': 'Font Size',
    'create.textColor': 'Text Color',
    'create.livePreview': 'Live Preview',
    'create.repositionHint': '(click on the image to reposition the name)',
    'create.placeholderName': 'Your Name Here',
    'create.placeholderNameAr': 'اسمك هنا',
    'create.publishCard': 'Publish Card',
    'create.uploadImageFirst': 'Please upload a background image first.',
    'create.clickToPlaceName': 'Click to place name position',

    'create.fontUnsupported': 'Unsupported format. Use .ttf, .woff, .woff2, or .otf',
    'create.fontTooLarge': 'Font file is too large. Maximum 5MB.',
    'create.fontCorrupted': 'Failed to load font. The file may be corrupted.',

    'publish.cardPublished': 'Card published!',
    'publish.shareLink': 'Share this link with your recipients:',
    'publish.copy': 'Copy',
    'publish.copied': 'Copied',
    'publish.openCard': 'Open card page',

    'card.received': "You've received a greeting!",
    'card.enterName': 'Enter your name below to personalize your card',
    'card.fullNameLabel': 'Enter your full name',
    'card.placeholder': 'John Doe',
    'card.generate': 'Generate My Card',
    'card.update': 'Update My Card',
    'card.download': 'Download Card',
    'card.downloading': 'Preparing download...',

    'card.notFound': 'Card Not Found',
    'card.notFoundDesc': "This card doesn't exist or may have been removed. Make sure you have the correct link.",
    'card.goHome': 'Go to homepage',
  },
  ar: {
    'app.title': 'مولد بطاقات التهنئة',
    'app.description': 'أنشئ بطاقات تهنئة مخصصة وجميلة. ارفع صورة، ونسّق اسم المستلم، وشاركها مع أي شخص.',
    'app.createCard': 'إنشاء بطاقة',

    'steps.design.title': 'تصميم',
    'steps.design.desc': 'ارفع صورة، ونسّق اسم المستلم.',
    'steps.share.title': 'مشاركة',
    'steps.share.desc': 'انشر بطاقتك واحصل على رابط فريد لمشاركته مع أي شخص.',
    'steps.download.title': 'تحميل',
    'steps.download.desc': 'يدخل المستلمون أسمائهم ويحملون بطاقة مخصصة.',

    'nav.home': 'الرئيسية',
    'nav.createCard': 'إنشاء بطاقة',
    'nav.yourCard': 'بطاقة التهنئة الخاصة بك',

    'create.bgImage': 'صورة الخلفية',
    'create.clickOrDrag': 'انقر أو اسحب للرفع',
    'create.fileHint': 'PNG, JPG حتى 10 ميغابايت',
    'create.clickToChange': 'انقر للتغيير',
    'create.nameTextStyle': 'نمط نص الاسم',
    'create.customFont': 'خط مخصص',
    'create.uploadFont': 'ارفع .ttf, .woff, .woff2, .otf',
    'create.loadingFont': 'جاري تحميل الخط...',
    'create.fontFamily': 'نوع الخط',
    'create.latinFonts': 'خطوط لاتينية',
    'create.arabicFonts': 'خطوط عربية',
    'create.customFontGroup': 'خط مخصص',
    'create.rtlHint': 'تم اختيار خط RTL -- سيُعرض النص من اليمين لليسار',
    'create.fontSize': 'حجم الخط',
    'create.textColor': 'لون النص',
    'create.livePreview': 'معاينة مباشرة',
    'create.repositionHint': '(انقر على الصورة لتغيير موضع الاسم)',
    'create.placeholderName': 'اسمك هنا',
    'create.placeholderNameAr': 'اسمك هنا',
    'create.publishCard': 'نشر البطاقة',
    'create.uploadImageFirst': 'يرجى رفع صورة خلفية أولاً.',
    'create.clickToPlaceName': 'انقر لتحديد موضع الاسم',

    'create.fontUnsupported': 'صيغة غير مدعومة. استخدم .ttf, .woff, .woff2, أو .otf',
    'create.fontTooLarge': 'ملف الخط كبير جداً. الحد الأقصى 5 ميغابايت.',
    'create.fontCorrupted': 'فشل تحميل الخط. قد يكون الملف تالفاً.',

    'publish.cardPublished': 'تم نشر البطاقة!',
    'publish.shareLink': 'شارك هذا الرابط مع المستلمين:',
    'publish.copy': 'نسخ',
    'publish.copied': 'تم النسخ',
    'publish.openCard': 'فتح صفحة البطاقة',

    'card.received': 'لقد تلقيت تهنئة!',
    'card.enterName': 'أدخل اسمك أدناه لتخصيص بطاقتك',
    'card.fullNameLabel': 'أدخل اسمك الكامل',
    'card.placeholder': 'محمد أحمد',
    'card.generate': 'إنشاء بطاقتي',
    'card.update': 'تحديث بطاقتي',
    'card.download': 'تحميل البطاقة',
    'card.downloading': 'جاري التحضير...',

    'card.notFound': 'البطاقة غير موجودة',
    'card.notFoundDesc': 'هذه البطاقة غير موجودة أو ربما تمت إزالتها. تأكد من أن لديك الرابط الصحيح.',
    'card.goHome': 'الذهاب للرئيسية',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations.en[key] || key;
}
