
import React from 'react';
import { FileText, Download } from 'lucide-react';
import { PROJECT_TITLE, PROJECT_DESCRIPTION, PHASES, STAKEHOLDERS, RISKS, BUDGET } from '../utils/data';

export const ReportButton: React.FC = () => {
  const handleDownload = () => {
    // Team members string
    const teamMembers = "لؤي بن سعيد الهنائي / محمد بن سعيد الشكيلي / الخليل بن سيف الهنائي";

    // Constructing the HTML content compliant with Word
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40' dir='rtl'>
      <head>
        <meta charset='utf-8'>
        <title>${PROJECT_TITLE}</title>
        <style>
          body { font-family: 'Arial', sans-serif; font-size: 12pt; line-height: 1.5; }
          h1 { font-size: 24pt; color: #2E5C86; text-align: center; margin-bottom: 10px; }
          h2 { font-size: 18pt; color: #2E5C86; border-bottom: 2px solid #2E5C86; padding-bottom: 5px; margin-top: 20px; }
          h3 { font-size: 14pt; color: #444; margin-top: 15px; }
          p { margin-bottom: 10px; text-align: justify; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
          th { background-color: #f0f0f0; font-weight: bold; border: 1px solid #000; padding: 8px; text-align: right; }
          td { border: 1px solid #000; padding: 8px; text-align: right; }
          .header-info { text-align: center; margin-bottom: 30px; font-weight: bold; color: #555; }
          .footer { margin-top: 50px; text-align: center; font-size: 10pt; color: #777; border-top: 1px solid #ccc; pt: 10px; }
        </style>
      </head>
      <body>
        <!-- Title Page -->
        <h1>${PROJECT_TITLE}</h1>
        <div class="header-info">
          <p>( عمل الفريق الثاني )</p>
          <p>إعداد الطلاب: ${teamMembers}</p>
        </div>
        
        <h2>نبذة عن المشروع</h2>
        <p>${PROJECT_DESCRIPTION}</p>

        <h2>أصحاب المصلحة (Stakeholders)</h2>
        <table>
          <thead>
            <tr>
              <th>الدور</th>
              <th>المسؤولية</th>
            </tr>
          </thead>
          <tbody>
            ${STAKEHOLDERS.map(s => `
              <tr>
                <td>${s.role}</td>
                <td>${s.responsibility}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>الجدول الزمني والمراحل</h2>
        ${PHASES.map(phase => `
          <h3>${phase.title}: ${phase.description}</h3>
          <table>
            <thead>
              <tr>
                <th>المهمة</th>
                <th>تاريخ البدء</th>
                <th>المدة (أيام)</th>
                <th>المسؤول</th>
              </tr>
            </thead>
            <tbody>
              ${phase.tasks.map(task => `
                <tr>
                  <td>${task.name}</td>
                  <td>${task.startDate}</td>
                  <td>${task.duration}</td>
                  <td>${task.owner}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `).join('')}

        <h2>سجل المخاطر</h2>
        <table>
          <thead>
            <tr>
              <th>الخطر</th>
              <th>الأثر المتوقع</th>
              <th>إجراءات الوقاية / التخفيف</th>
            </tr>
          </thead>
          <tbody>
            ${RISKS.map(r => `
              <tr>
                <td>${r.risk}</td>
                <td>${r.impact}</td>
                <td>${r.mitigation}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>الميزانية التقديرية</h2>
        <table>
          <thead>
            <tr>
              <th>البند</th>
              <th>المصدر</th>
              <th>التكلفة (ر.ع)</th>
            </tr>
          </thead>
          <tbody>
            ${BUDGET.map(b => `
              <tr>
                <td>${b.item}</td>
                <td>${b.source}</td>
                <td>${b.cost}</td>
              </tr>
            `).join('')}
            <tr>
              <td><strong>الإجمالي</strong></td>
              <td></td>
              <td><strong>${BUDGET.reduce((acc, curr) => acc + curr.cost, 0)}</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <p>تم إنشاء هذا التقرير آلياً عبر منصة إدارة المشاريع المدرسية</p>
        </div>
      </body>
      </html>
    `;

    // Create a Blob with the HTML content
    const blob = new Blob(['\ufeff', content], {
      type: 'application/msword'
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `تقرير_${PROJECT_TITLE.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm text-sm font-medium"
      title="تحميل تقرير المشروع (Word)"
    >
      <FileText size={16} />
      <span className="hidden sm:inline">تحميل التقرير</span>
      <Download size={14} className="opacity-70" />
    </button>
  );
};
