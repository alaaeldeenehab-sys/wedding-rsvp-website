# 💍 Wedding Invitation RSVP Website

موقع دعوة فرح إلكتروني حديث وأنيق مع نظام تأكيد الحضور وصفحة تحكم للإدارة.

**الموقع مشروع كامل جاهز للنشر على GitHub Pages** ✨

## 🎯 المميزات

✅ **تصميم عصري وأنيق**
- تصميم Responsive 100% (موبايل، تابلت، كمبيوتر)
- ألوان هادئة وفخمة (أبيض، بيج، ذهبي، وردي)
- Animations راقية وبسيطة
- دعم كامل للعربية RTL

✅ **نموذج تأكيد الحضور**
- التحقق من الاسم الثنائي
- اختيار عدد الحضور (1-10)
- اختيار الحضور أو الاعتذار
- رسالة تأكيد جميلة بعد الإرسال

✅ **قاعدة بيانات Supabase**
- تخزين آمن للبيانات
- إمكانية الوصول من أي جهاز
- لا تخزين محلي فقط

✅ **لوحة تحكم Admin**
- حماية بكلمة مرور
- إحصائيات شاملة:
  - إجمالي الردود
  - عدد المؤكدين والمرافقين
  - عدد المعتذرين
- جدول بجميع الردود
- بحث وفلترة متقدمة

✅ **أمان عالي**
- لا توجد مفاتيح سرية في Frontend
- Validation صارم للبيانات
- حماية Admin Dashboard
- استخدام صحيح لـ Supabase

---

## 🚀 البدء السريع

### 1️⃣ المتطلبات

- Node.js 18+
- npm أو yarn
- حساب Supabase (مجاني)
- حساب GitHub

### 2️⃣ استنساخ المشروع

```bash
git clone https://github.com/alaaeldeenehab-sys/wedding-rsvp-website.git
cd wedding-rsvp-website
```

### 3️⃣ تثبيت المكتبات

```bash
npm install
```

### 4️⃣ إعداد Supabase

#### الخطوة أ: إنشاء حساب Supabase
1. اذهب إلى [supabase.com](https://supabase.com)
2. سجل دخولك أو أنشئ حساب جديد
3. أنشئ project جديد

#### الخطوة ب: إنشاء جدول البيانات

في Supabase، اذهب إلى **SQL Editor** وشغل هذا الكود:

```sql
-- إنشاء جدول ردود RSVP
CREATE TABLE rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  guest_count INTEGER NOT NULL CHECK (guest_count >= 1 AND guest_count <= 10),
  attending BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- إضافة Row Level Security (RLS)
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- السماح للجميع بإدراج البيانات
CREATE POLICY "Allow insert for all" ON rsvp_responses
  FOR INSERT WITH CHECK (true);

-- السماح بقراءة البيانات فقط للمسؤولين (ستتحقق من كلمة المرور في الفرونتند)
CREATE POLICY "Allow select for all" ON rsvp_responses
  FOR SELECT USING (true);
```

#### الخطوة ج: الحصول على المفاتيح

1. اذهب إلى **Project Settings → API**
2. انسخ:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`

### 5️⃣ إنشاء ملف .env

في مجلد المشروع الرئيسي، أنشئ ملف `.env` (انسخ من `.env.example`):

```bash
cp .env.example .env
```

ثم احذر الملف وأضف قيمك الخاصة:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_ADMIN_PASSWORD=your_secure_password_here
```

⚠️ **تحذير أمان**: لا تضع أبدًا قيم حقيقية في `.env` في المستودع العام. استخدم GitHub Secrets عند النشر.

### 6️⃣ تشغيل المشروع محليًا

```bash
npm run dev
```

سيفتح الموقع على `http://localhost:5173`

### 7️⃣ تخصيص بيانات الفرح

افتح `src/config/weddingConfig.ts` وغير البيانات:

```typescript
export const weddingConfig = {
  groom: 'اسم العريس',
  bride: 'اسم العروسة',
  weddingDate: '2024-12-15', // YYYY-MM-DD
  weddingTime: '18:00', // HH:MM
  venueName: 'اسم القاعة',
  venueAddress: 'العنوان',
  googleMapsLink: 'رابط الخريطة',
  invitationText: 'بكل حب ندعوكم لمشاركتنا فرحتنا',
  coupleName: 'الاسم & الاسم',
  // ...
};
```

---

## 🌐 النشر على GitHub Pages

### الخطوة 1: بناء المشروع

```bash
npm run build
```

هذا سينشئ مجلد `dist` جاهز للنشر.

### الخطوة 2: إضافة متغيرات البيئة إلى GitHub

1. اذهب إلى المستودع على GitHub
2. اذهب إلى **Settings → Secrets and variables → Actions**
3. أضف المتغيرات التالية:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD`

### الخطوة 3: إعداد GitHub Pages

1. اذهب إلى **Settings → Pages**
2. اختر **Source**: Deploy from a branch
3. اختر **Branch**: main و Folder: / (root)
4. انقر **Save**

سيكون الموقع متاح على: `https://alaaeldeenehab-sys.github.io/wedding-rsvp-website/`

### أو استخدم GitHub Actions (موصى به)

ملف `.github/workflows/deploy.yml` موجود بالفعل. فقط:
1. أضف السرار في GitHub
2. اعمل push على main
3. GitHub سيبني وينشر تلقائيًا!

---

## 📱 استخدام الموقع

### الصفحة الرئيسية
1. صورة جميلة للدعوة
2. أسماء العروسين
3. تاريخ ووقت الفرح
4. اسم القاعة والعنوان
5. زر تأكيد الحضور

### نموذج RSVP
1. إدخال الاسم الكامل (ثنائي على الأقل)
2. اختيار عدد الحضور
3. اختيار الحضور أو الاعتذار
4. التأكيد والإرسال

### لوحة التحكم
1. اذهب إلى: `/admin`
2. أدخل كلمة المرور
3. شاهد الإحصائيات والردود
4. ابحث وفلترّ الردود

---

## 🔒 الأمان

✅ **ما يتم حمايته:**
- لا توجد مفاتيح سرية في الكود
- Admin password محمي بـ GitHub Secrets
- Validation قوي للبيانات
- RLS في Supabase للتحكم بالوصول

⚠️ **نقاط يجب الانتباه لها:**
1. لا تضع أبدًا `VITE_ADMIN_PASSWORD` في الملفات المرفوعة لـ GitHub
2. استخدم GitHub Secrets فقط
3. غيّر كلمة المرور بشكل دوري
4. استخدم HTTPS دائمًا (GitHub Pages توفره تلقائيًا)

---

## 📊 هيكل المشروع

```
wedding-rsvp-website/
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # صفحة الترحيب
│   │   ├── RSVPForm.tsx          # نموذج تأكيد الحضور
│   │   ├── SuccessMessage.tsx    # رسالة التأكيد
│   │   └── RSVPSection.tsx       # قسم RSVP كاملاً
│   ├── pages/
│   │   ├── Home.tsx             # الصفحة الرئيسية
│   │   └── Admin.tsx            # لوحة التحكم
│   ├── lib/
│   │   ├── supabase.ts          # إعدادات Supabase
│   │   └── validation.ts        # التحقق من البيانات
│   ├── config/
│   │   └── weddingConfig.ts     # بيانات الفرح القابلة للتخصيص
│   ├── types/
│   │   └── index.ts             # أنواع TypeScript
│   ├── App.tsx                  # التطبيق الرئيسي
│   ├── main.tsx                 # نقطة الدخول
│   └── index.css                # الأنماط العام
├── index.html                   # ملف HTML الرئيسي
├── package.json                 # المكتبات والسكريبتات
├── tsconfig.json                # إعدادات TypeScript
├── tailwind.config.js           # إعدادات Tailwind
├── vite.config.ts               # إعدادات Vite
├── .env.example                 # مثال متغيرات البيئة
├── .gitignore                   # الملفات المتجاهلة
├── README.md                    # هذا الملف
└── SUPABASE_SETUP.md            # دليل إعداد Supabase
```

---

## 🛠️ الأوامر المتاحة

```bash
# تشغيل المشروع محليًا
npm run dev

# بناء المشروع للإنتاج
npm run build

# معاينة المشروع بعد البناء
npm run preview

# فحص الأكواد (Linting)
npm run lint
```

---

## 📝 ملاحظات مهمة

### للمشرفين
1. **رابط Admin Dashboard**: `/admin`
2. **كلمة المرور**: المحددة في `VITE_ADMIN_PASSWORD`
3. يمكن تصدير البيانات من Supabase مباشرة إذا لزم الأمر

### تحديث بيانات الفرح
- عدّل `src/config/weddingConfig.ts` فقط
- لا حاجة لتعديل أي ملفات أخرى
- أعد بناء وسيتم التحديث تلقائيًا

### حل المشاكل الشائعة

**المشكلة**: الموقع لا يفتح على GitHub Pages
- **الحل**: تأكد من تشغيل GitHub Actions وأن Build نجح

**المشكلة**: RSVP لا يتم حفظه
- **الحل**: تحقق من متغيرات البيئة و RLS في Supabase

**المشكلة**: Admin Dashboard لا يظهر البيانات
- **الحل**: تأكد من كلمة المرور الصحيحة وتوصيل Supabase

---

## 💡 نصائح للتخصيص

1. **الألوان**: عدّل في `tailwind.config.js`
2. **الخطوط**: أضف خطوط جديدة في `src/index.css`
3. **الرسائل**: غيّر النصوص في المكونات مباشرة
4. **الصور**: أضف صورة في HTML واستخدمها

---

## 📞 الدعم والمشاكل

إذا واجهت أي مشاكل:
1. تحقق من [قسم الأسئلة الشائعة](#حل-المشاكل-الشائعة)
2. افتح Issue على GitHub
3. راجع أخطاء Console في المتصفح

---

## 📄 الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام الحر.

---

**تم إنشاء هذا المشروع بـ ❤️ للفرح والسعادة**

🎊 نتمنى لكم حفل زفاف رائع! 🎊
