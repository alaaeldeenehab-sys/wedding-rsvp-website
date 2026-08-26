# 🚀 Deployment Guide / دليل النشر

## سريع - Quick Start

### الخطوة 1: إضافة GitHub Secrets

1. اذهب إلى المستودع على GitHub
2. اذهب إلى **Settings → Secrets and variables → Actions**
3. أضف السرار التالية:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD`

### الخطوة 2: تفعيل GitHub Pages

1. اذهب إلى **Settings → Pages**
2. اختر **Source**: Deploy from a branch
3. اختر **Branch**: main
4. انقر **Save**

### الخطوة 3: إنشاء GitHub Actions Workflow

أنشئ ملف `.github/workflows/deploy.yml` بالمحتوى التالي:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build project
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        VITE_ADMIN_PASSWORD: ${{ secrets.VITE_ADMIN_PASSWORD }}
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### الخطوة 4: Push to Main

```bash
git add .
git commit -m "Setup deployment"
git push origin main
```

GitHub Actions سيبني وينشر تلقائيًا!

---

## Local Build and Test

### بناء المشروع محليًا

```bash
npm run build
```

هذا سينشئ مجلد `dist` بملفات الموقع الجاهزة.

### معاينة البناء

```bash
npm run preview
```

هذا سيفتح الموقع المبني محليًا على `http://localhost:4173`

---

## النشر اليدوي (Manual Deployment)

إذا كنت تريد نشر يدويًا:

### الخيار 1: استخدام GitHub CLI

```bash
# تأكد من تثبيت GitHub CLI: https://cli.github.com

# بناء المشروع
npm run build

# نشر على gh-pages branch
gh release create --prerelease
```

### الخيار 2: استخدام Git مباشرة

```bash
# بناء المشروع
npm run build

# إضافة مجلد dist
git add dist

# إنشاء commit
git commit -m "Deploy to GitHub Pages"

# Push
git push origin main
```

---

## Deployment Troubleshooting

### ❌ الموقع لا يفتح على GitHub Pages

**الحل:**
1. تأكد من تفعيل GitHub Pages في Settings
2. تحقق من أن GitHub Actions عمل بنجاح
3. اذهب إلى Actions tab وتحقق من Workflow

### ❌ Build Failed

**الحل:**
1. تحقق من GitHub Actions logs
2. تأكد من أن جميع Environment Variables موجودة
3. حاول بناء محليًا: `npm run build`

### ❌ بيانات RSVP لا تحفظ

**الحل:**
1. تأكد من صحة Supabase URL و Keys
2. تحقق من console في المتصفح للأخطاء
3. تأكد من إنشاء الجدول في Supabase

### ❌ Admin Dashboard لا يعمل

**الحل:**
1. تأكد من كلمة المرور الصحيحة
2. تحقق من أن Supabase متصل
3. جرب في متصفح آخر

---

## أمان عند النشر

### ✅ ما يجب فعله:
- استخدم GitHub Secrets لجميع المفاتيح
- استخدم HTTPS دائمًا (GitHub Pages توفره تلقائيًا)
- غيّر كلمة المرور بشكل دوري
- لا تضع أبدًا مفاتيح سرية في الكود

### ❌ ما يجب تجنبه:
- لا تضع المفاتيح في `.env.local`
- لا تضع المفاتيح في `.gitignore` وترفعها
- لا تشاركم كلمة المرور Admin مع أشخاص غير موثوقين
- لا تستخدم كلمات مرور ضعيفة

---

## Monitoring و Maintenance

### تحقق من حالة الموقع

```bash
# جرب الموقع
curl https://alaaeldeenehab-sys.github.io/wedding-rsvp-website/

# يجب أن ترى HTML للموقع
```

### تحديث المشروع

```bash
# بناء جديد
npm run build

# commit
git add .
git commit -m "Update wedding website"

# push
git push origin main

# GitHub سيبني وينشر تلقائيًا!
```

---

## Export Data from Supabase

إذا أردت نسخ احتياطية من البيانات:

### الطريقة 1: CSV Export

في Supabase SQL Editor:

```sql
COPY (SELECT * FROM rsvp_responses ORDER BY created_at DESC) 
TO STDOUT WITH CSV HEADER;
```

### الطريقة 2: JSON Export

```sql
SELECT json_agg(row_to_json(t)) 
FROM rsvp_responses t;
```

### الطريقة 3: استخدام Supabase Dashboard

1. اذهب إلى **Table Editor**
2. اختر `rsvp_responses`
3. اختر **Download as CSV** أو **Download as JSON**

---

## Custom Domain (Optional)

إذا كنت تريد domain مخصص:

### الخطوة 1: اشتر Domain
من GoDaddy أو Namecheap أو أي مزود

### الخطوة 2: أضف CNAME Record

```
Type: CNAME
Name: @
Value: alaaeldeenehab-sys.github.io
```

### الخطوة 3: أضف Domain في GitHub

1. اذهب إلى **Settings → Pages**
2. أضف Custom domain
3. الانتظر حتى تتحقق DNS

---

## Performance Tips

### تسريع الموقع:

1. **تقليل حجم الصور**
   ```bash
   # استخدم imagemin أو TinyPNG
   ```

2. **تحسين CSS**
   ```bash
   npm run build  # Tailwind سيحذف CSS غير المستخدم
   ```

3. **تقليل البندلة**
   ```bash
   # استخدم Vite's built-in optimization
   npm run build
   ```

---

## Questions & Support

للمساعدة:
1. تحقق من GitHub Actions logs
2. اقرأ Supabase documentation
3. افتح Issue على GitHub

---

**Happy deploying! 🚀**
