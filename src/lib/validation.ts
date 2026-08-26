/**
 * التحقق من صحة الاسم الكامل
 * يجب أن يكون الاسم ثنائي على الأقل (كلمتان أو أكثر)
 */
export const validateFullName = (name: string): boolean => {
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/).filter(part => part.length > 0);
  return parts.length >= 2 && trimmed.length >= 3;
};

/**
 * الحصول على رسالة خطأ للاسم
 */
export const getNameErrorMessage = (name: string): string => {
  if (!name.trim()) {
    return 'الرجاء إدخال اسمك الكامل';
  }
  if (name.trim().split(/\s+/).length < 2) {
    return 'الرجاء إدخال اسم ثنائي على الأقل (مثال: أحمد محمد)';
  }
  return '';
};

/**
 * التحقق من عدد الحضور
 */
export const validateGuestCount = (count: number): boolean => {
  return count >= 1 && count <= 10 && Number.isInteger(count);
};
