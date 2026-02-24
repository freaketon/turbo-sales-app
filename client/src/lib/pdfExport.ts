// PDF export utility for call summaries
import { jsPDF } from 'jspdf';
import { salesFlow } from './salesFlow';

interface GradeCategory {
  name: string;
  score: number;
  notes: string;
}

interface CallGrading {
  overallGrade: string;
  overallScore: number;
  categories: GradeCategory[];
  strengths: string[];
  improvements: string[];
  summary: string;
}

interface ExportData {
  prospectInfo: {
    name: string;
    company: string;
    email: string;
  };
  answers: Record<string, string>;
  outcome: 'qualified' | 'disqualified' | 'in-progress';
  grading?: CallGrading;
  fullTranscript?: string;
}

export function exportCallToPDF(data: ExportData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  let yPosition = margin;

  // Helper to add new page if needed
  const checkPageBreak = (neededSpace: number = 10) => {
    if (yPosition + neededSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('OUTLIER SALES CALL SUMMARY', margin, yPosition);
  yPosition += 12;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, yPosition);
  yPosition += 10;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Prospect Information
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('PROSPECT INFORMATION', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  if (data.prospectInfo.name) {
    doc.text(`Name: ${data.prospectInfo.name}`, margin + 5, yPosition);
    yPosition += lineHeight;
  }
  if (data.prospectInfo.company) {
    doc.text(`Company: ${data.prospectInfo.company}`, margin + 5, yPosition);
    yPosition += lineHeight;
  }
  if (data.prospectInfo.email) {
    doc.text(`Email: ${data.prospectInfo.email}`, margin + 5, yPosition);
    yPosition += lineHeight;
  }
  yPosition += 5;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // SELLER PERFORMANCE GRADE
  if (data.grading && data.grading.overallGrade !== 'N/A') {
    checkPageBreak(60);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('SELLER PERFORMANCE GRADE', margin, yPosition);
    yPosition += 10;

    // Overall grade badge
    const gradeColor = data.grading.overallScore >= 8 ? [0, 150, 0] :
                       data.grading.overallScore >= 6 ? [200, 150, 0] :
                       [200, 0, 0];
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(gradeColor[0], gradeColor[1], gradeColor[2]);
    doc.text(data.grading.overallGrade, margin + 5, yPosition);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`(${data.grading.overallScore}/10 avg)`, margin + 40, yPosition);
    yPosition += 12;

    // Summary
    if (data.grading.summary) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(60, 60, 60);
      const summaryLines = doc.splitTextToSize(data.grading.summary, pageWidth - margin * 2 - 10);
      summaryLines.forEach((line: string) => {
        checkPageBreak(8);
        doc.text(line, margin + 5, yPosition);
        yPosition += lineHeight - 1;
      });
      yPosition += 5;
    }

    // Category scores
    checkPageBreak(20);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Category Scores:', margin + 5, yPosition);
    yPosition += 8;

    for (const cat of data.grading.categories) {
      checkPageBreak(16);

      const barWidth = 80;
      const barHeight = 4;
      const filledWidth = (cat.score / 10) * barWidth;
      const scoreColor = cat.score >= 8 ? [0, 150, 0] :
                         cat.score >= 6 ? [200, 150, 0] :
                         [200, 0, 0];

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${cat.name}`, margin + 5, yPosition);
      doc.text(`${cat.score}/10`, margin + 5 + barWidth + 15, yPosition);

      yPosition += 2;
      doc.setFillColor(230, 230, 230);
      doc.rect(margin + 5, yPosition, barWidth, barHeight, 'F');
      doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
      doc.rect(margin + 5, yPosition, filledWidth, barHeight, 'F');
      yPosition += barHeight + 2;

      if (cat.notes) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        const noteLines = doc.splitTextToSize(cat.notes, pageWidth - margin * 2 - 15);
        noteLines.forEach((line: string) => {
          doc.text(line, margin + 8, yPosition);
          yPosition += lineHeight - 2;
        });
      }
      yPosition += 3;
    }

    // Strengths
    if (data.grading.strengths.length > 0) {
      checkPageBreak(20);
      yPosition += 3;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 130, 0);
      doc.text('Strengths:', margin + 5, yPosition);
      yPosition += 7;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      for (const s of data.grading.strengths) {
        checkPageBreak(10);
        const sLines = doc.splitTextToSize(`+ ${s}`, pageWidth - margin * 2 - 15);
        sLines.forEach((line: string) => {
          doc.text(line, margin + 8, yPosition);
          yPosition += lineHeight - 1;
        });
      }
    }

    // Improvements
    if (data.grading.improvements.length > 0) {
      checkPageBreak(20);
      yPosition += 3;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(200, 100, 0);
      doc.text('Areas to Improve:', margin + 5, yPosition);
      yPosition += 7;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      for (const imp of data.grading.improvements) {
        checkPageBreak(10);
        const iLines = doc.splitTextToSize(`- ${imp}`, pageWidth - margin * 2 - 15);
        iLines.forEach((line: string) => {
          doc.text(line, margin + 8, yPosition);
          yPosition += lineHeight - 1;
        });
      }
    }

    yPosition += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  }

  // COST ANALYSIS
  const editors = data.answers['cost-editors'] ? parseInt(data.answers['cost-editors']) : null;
  const hoursPerWeek = data.answers['cost-hours'] === '3-5' ? 4
    : data.answers['cost-hours'] === '6-10' ? 8
    : data.answers['cost-hours'] === '10+' ? 12
    : null;
  const ratePerHour = data.answers['cost-rate'] ? parseInt(data.answers['cost-rate']) : null;

  if (editors && hoursPerWeek && ratePerHour) {
    checkPageBreak(40);
    const annualCost = editors * hoursPerWeek * ratePerHour * 48;
    const monthlyCost = annualCost / 12;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('COST ANALYSIS', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Editors: ${editors}`, margin + 5, yPosition);
    yPosition += lineHeight;
    doc.text(`Hours per week searching: ${hoursPerWeek}`, margin + 5, yPosition);
    yPosition += lineHeight;
    doc.text(`Hourly rate: $${ratePerHour}`, margin + 5, yPosition);
    yPosition += lineHeight + 2;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Annual Cost of Inaction: $${annualCost.toLocaleString()}`, margin + 5, yPosition);
    yPosition += lineHeight;
    doc.text(`Monthly Cost: $${monthlyCost.toLocaleString()}`, margin + 5, yPosition);
    yPosition += lineHeight + 2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Cost Agreement: ${data.answers['cost-agreement'] || 'Not answered'}`, margin + 5, yPosition);
    yPosition += 10;

    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  }

  // Qualification Status
  checkPageBreak(20);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('QUALIFICATION STATUS', margin, yPosition);
  yPosition += 8;

  doc.setFontSize(12);
  if (data.outcome === 'qualified') {
    doc.setTextColor(0, 150, 0);
    doc.text('\u2713 QUALIFIED', margin + 5, yPosition);
  } else if (data.outcome === 'disqualified') {
    doc.setTextColor(200, 0, 0);
    doc.text('\u2717 DISQUALIFIED', margin + 5, yPosition);
  } else {
    doc.setTextColor(100, 100, 100);
    doc.text('\u25CB IN PROGRESS (Call ended early)', margin + 5, yPosition);
  }
  yPosition += 10;

  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Call Q&A
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('CALL ANSWERS BY SECTION', margin, yPosition);
  yPosition += 10;

  salesFlow.forEach(step => {
    if (!step.questions) return;

    const stepAnswers = step.questions
      .map(question => {
        const answer = data.answers[question.id];
        if (!answer) return null;
        const option = question.options?.find(opt => opt.value === answer);
        const displayAnswer = option?.label || answer;
        const isDisqualifying = option?.isDisqualifying || false;
        return { questionText: question.text, answer: displayAnswer, isDisqualifying };
      })
      .filter(Boolean);

    if (stepAnswers.length === 0) return;

    checkPageBreak(30);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(step.title.toUpperCase(), margin, yPosition);
    yPosition += 8;

    stepAnswers.forEach(answerData => {
      if (!answerData) return;
      checkPageBreak(20);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(60, 60, 60);
      const questionLines = doc.splitTextToSize(`Q: ${answerData.questionText}`, pageWidth - margin * 2 - 10);
      questionLines.forEach((line: string) => {
        doc.text(line, margin + 5, yPosition);
        yPosition += lineHeight - 1;
      });

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const answerText = `A: ${answerData.answer}${answerData.isDisqualifying ? ' [DISQUALIFYING]' : ''}`;
      const answerLines = doc.splitTextToSize(answerText, pageWidth - margin * 2 - 10);
      answerLines.forEach((line: string) => {
        doc.text(line, margin + 5, yPosition);
        yPosition += lineHeight - 1;
      });
      yPosition += 3;
    });
    yPosition += 5;
  });

  // FULL TRANSCRIPT APPENDIX
  if (data.fullTranscript && data.fullTranscript.trim()) {
    doc.addPage();
    yPosition = margin;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('APPENDIX: FULL CALL TRANSCRIPT', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);

    const transcriptLines = doc.splitTextToSize(data.fullTranscript, pageWidth - margin * 2);
    transcriptLines.forEach((line: string) => {
      checkPageBreak(8);
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });
  }

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${totalPages} | OUTLIER Sales Call Guide`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Download
  const fileName = `outlier-sales-${data.prospectInfo.company.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
}
