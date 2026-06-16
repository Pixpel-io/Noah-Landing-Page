'use client'

import { FileDown } from 'lucide-react'
import type { DashboardData } from '@/lib/dashboard/metrics'

export function PdfReportButton({ data }: { data: DashboardData }) {
  const generate = async () => {
    const { jsPDF } = await import('jspdf')
    const autoTable = (await import('jspdf-autotable')).default

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Header
    doc.setFillColor(15, 23, 42) // slate-900
    doc.rect(0, 0, pageWidth, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('Noah AI — Dashboard Report', 14, 22)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(
      `Generated: ${new Date(data.generatedAt).toLocaleString()}`,
      14,
      32,
    )

    let y = 52

    // Summary section
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Executive Summary', 14, y)
    y += 8
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(71, 85, 105) // slate-500
    const summary = `This report provides a snapshot of Noah AI's key performance indicators. Data is sourced from production Supabase tables (read-only). Metrics marked as "Pending" are not yet synced to the server.`
    const summaryLines = doc.splitTextToSize(summary, pageWidth - 28)
    doc.text(summaryLines, 14, y)
    y += summaryLines.length * 5 + 10

    // Key metrics table
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Key Metrics Overview', 14, y)
    y += 4

    const metricsRows = [
      ['Total Users', formatValue(data.totalUsers.value), data.totalUsers.status, data.totalUsers.source],
      ['New Users (30 days)', formatValue(data.newUsers30d.value), data.newUsers30d.status, data.newUsers30d.source],
      ['Active Users', formatValue(data.activeUsers.value), data.activeUsers.status, data.activeUsers.source],
      ['Conversation Messages', formatValue(data.conversationsMessages.value), data.conversationsMessages.status, data.conversationsMessages.source],
      ['Interaction Time', `${formatValue(data.interactionMinutes.value)} min`, data.interactionMinutes.status, data.interactionMinutes.source],
      ['Medication Reminders', formatValue(data.medicationReminders.value), data.medicationReminders.status, data.medicationReminders.source],
      ['Medications Tracked', formatValue(data.medicationsTracked.value), data.medicationsTracked.status, data.medicationsTracked.source],
      ['Emergency Contacts', formatValue(data.emergencyContacts.value), data.emergencyContacts.status, data.emergencyContacts.source],
    ]

    autoTable(doc, {
      startY: y,
      head: [['Metric', 'Value', 'Status', 'Source']],
      body: metricsRows,
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42], textColor: 255, fontSize: 9, font: 'helvetica' },
      bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 40 },
        1: { cellWidth: 25, halign: 'center' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 'auto' },
      },
      margin: { left: 14, right: 14 },
    })

    y = (doc as any).lastAutoTable.finalY + 14

    // Pending metrics section
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Pending Metrics (Not Yet Synced)', 14, y)
    y += 4

    const pendingRows = [
      ['Appointments Scheduled', data.appointmentsScheduled.source],
      ['Consultations Recorded', data.consultationsRecorded.source],
      ['Emergency Calls Triggered', data.emergencyCallsTriggered.source],
      ['New Subscriptions', data.newSubscriptions.source],
      ['Ended Subscriptions', data.endedSubscriptions.source],
      ['Sales', data.sales.source],
    ]

    autoTable(doc, {
      startY: y,
      head: [['Metric', 'Reason Pending']],
      body: pendingRows,
      theme: 'grid',
      headStyles: { fillColor: [234, 179, 8], textColor: [15, 23, 42], fontSize: 9 },
      bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 50 },
        1: { cellWidth: 'auto' },
      },
      margin: { left: 14, right: 14 },
    })

    y = (doc as any).lastAutoTable.finalY + 14

    // Trends section
    if (y > 240) {
      doc.addPage()
      y = 20
    }
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Growth Trends — Signups by Day', 14, y)
    y += 4

    const signupRows = data.signupsByDay.slice(-15).map((point) => {
      const cumulative = data.signupsByDay
        .filter((p) => p.date <= point.date)
        .reduce((sum, p) => sum + p.count, 0)
      return [point.date, String(point.count), String(cumulative)]
    })

    autoTable(doc, {
      startY: y,
      head: [['Date', 'New Signups', 'Cumulative Total']],
      body: signupRows,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246], textColor: 255, fontSize: 9 },
      bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 35, halign: 'center' },
      },
      margin: { left: 14, right: 14 },
    })

    y = (doc as any).lastAutoTable.finalY + 14

    // Messages by day
    if (y > 220) {
      doc.addPage()
      y = 20
    }
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Message Volume — Last 15 Days', 14, y)
    y += 4

    const msgRows = data.messagesByDay.slice(-15).map((point) => [
      point.date,
      String(point.count),
    ])

    autoTable(doc, {
      startY: y,
      head: [['Date', 'Messages']],
      body: msgRows,
      theme: 'striped',
      headStyles: { fillColor: [16, 185, 129], textColor: 255, fontSize: 9 },
      bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 30, halign: 'center' },
      },
      margin: { left: 14, right: 14 },
    })

    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(148, 163, 184)
      doc.text(
        `Noah AI Dashboard Report — Page ${i} of ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' },
      )
      doc.text(
        'Read-only report — production database is never modified.',
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 6,
        { align: 'center' },
      )
    }

    doc.save(`noah-dashboard-report-${new Date().toISOString().slice(0, 10)}.pdf`)
  }

  return (
    <button
      type="button"
      onClick={generate}
      className="group inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg active:scale-95"
    >
      <FileDown className="size-4 transition-transform group-hover:-translate-y-0.5" />
      Download Report
    </button>
  )
}

function formatValue(value: number | null): string {
  if (value === null) return '—'
  return value.toLocaleString()
}
