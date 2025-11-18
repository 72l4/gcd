import { ProjectPhase, Stakeholder, Risk, BudgetString } from '../types';

export const PROJECT_TITLE = "مشروع غذاؤك صحتك";
export const PROJECT_DESCRIPTION = "حملة توعوية مدرسية تهدف لرفع الوعي الصحي والتغذوي بين الطلاب وتعزيز السلوكيات الإيجابية.";

export const STAKEHOLDERS: Stakeholder[] = [
  { role: "إدارة المدرسة", responsibility: "اعتماد الفكرة والدعم اللوجستي" },
  { role: "المشرف التربوي", responsibility: "الإرشاد المهني وضمان التوافق مع المعايير" },
  { role: "الطلاب المشاركون", responsibility: "تنفيذ المهام الميدانية والإبداعية" },
  { role: "أولياء الأمور", responsibility: "المساندة وتشجيع الأبناء" },
  { role: "المجتمع المحلي", responsibility: "الاستفادة والمشاركة" },
];

export const PHASES: ProjectPhase[] = [
  {
    id: "initiation",
    title: "مرحلة البدء",
    description: "تحديد الاحتياجات والحصول على الموافقات",
    tasks: [
      { name: "تحديد العنوان والفكرة العامة", startDate: "2025/11/30", duration: 2, owner: "الفريق" },
      { name: "تشكيل اللجنة الإشرافية", startDate: "2025/12/02", duration: 1, owner: "إدارة المدرسة" },
      { name: "الحصول على الموافقة الرسمية", startDate: "2025/12/03", duration: 1, owner: "مدير المشروع" },
    ]
  },
  {
    id: "planning",
    title: "مرحلة التخطيط",
    description: "إعداد الخطط التفصيلية والجداول الزمنية",
    tasks: [
      { name: "إعداد خطة المشروع والموارد", startDate: "2025/12/04", duration: 1, owner: "مدير المشروع" },
      { name: "توزيع المهام بين الفرق", startDate: "2025/12/08", duration: 1, owner: "مدير المشروع" },
      { name: "إعداد الوسائط المتعددة", startDate: "2025/12/09", duration: 3, owner: "فريق الإعلام" },
    ]
  },
  {
    id: "execution",
    title: "مرحلة التنفيذ",
    description: "تطبيق الأنشطة والفعاليات",
    tasks: [
      { name: "إقامة ركن غذائي صحي", startDate: "2025/12/14", duration: 2, owner: "فريق التنظيم" },
      { name: "تنفيذ الإذاعة الصباحية", startDate: "2025/12/16", duration: 1, owner: "فريق الإعلام" },
      { name: "تنفيذ استبانة قياس الوعي", startDate: "2025/12/18", duration: 1, owner: "فريق التقييم" },
    ]
  },
  {
    id: "closing",
    title: "مرحلة الإنهاء",
    description: "التقييم والتوثيق",
    tasks: [
      { name: "جمع الملاحظات", startDate: "2025/12/21", duration: 1, owner: "مسؤول المتابعة" },
      { name: "تكريم الفرق المتميزة", startDate: "2025/12/22", duration: 1, owner: "إدارة المدرسة" },
      { name: "إعداد التقرير الختامي", startDate: "2025/12/23", duration: 1, owner: "مدير المشروع" },
    ]
  }
];

export const RISKS: Risk[] = [
  { risk: "عدم الالتزام بالضوابط الصحية", impact: "ملاحظات سلبية", mitigation: "إشراف مباشر وتوفير أدوات تعقيم" },
  { risk: "غياب أعضاء الفريق", impact: "تأخر التنفيذ", mitigation: "توزيع المهام على أكثر من عضو" },
  { risk: "أعطال تقنية", impact: "تعطل العروض", mitigation: "تجربة الأجهزة مسبقاً ونسخ احتياطية" },
];

export const BUDGET: BudgetString[] = [
  { item: "تجهيز الموقع", cost: 10, source: "المدرسة" },
  { item: "طباعة المواد", cost: 5, source: "المدرسة" },
  { item: "الجوائز", cost: 7, source: "مجلس الآباء" },
  { item: "التوثيق", cost: 5, source: "فريق الإعلام" },
];

export const VIDEO_PROMPT_TEMPLATE = `
Cinematic video of a school project named "Your Food Your Health" in an Omani school setting. 
Show Omani students in white dishdashas and kummas organizing a healthy food exhibition in a sunny school courtyard with arches. 
They are arranging baskets of fresh fruits, vegetables, and traditional Omani healthy dishes. 
Teachers and parents are interacting with students. 
The atmosphere is educational, bright, and positive. 
High resolution, photorealistic, 4k quality.
`;