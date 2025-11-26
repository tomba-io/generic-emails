/**
 * Batch Processing Example
 *
 * This example demonstrates how to efficiently process multiple emails,
 * generate reports, and perform bulk operations.
 */

const { GenericEmail } = require('../build/main/index.js')

/**
 * Process multiple emails in batch
 */
async function processBatch(emails) {
  const results = []

  for (const email of emails) {
    try {
      const result = await GenericEmail.isGeneric(email)
      results.push({
        email: result.email,
        isGeneric: result.isgeneric,
        department: result.department,
        position: result.position,
        seniority: result.seniority,
        status: 'success',
      })
    } catch (error) {
      results.push({
        email: email,
        isGeneric: null,
        department: null,
        position: null,
        seniority: null,
        status: 'error',
        error: error.message,
      })
    }
  }

  return results
}

/**
 * Generate a summary report from batch results
 */
function generateReport(results) {
  const report = {
    total: results.length,
    generic: 0,
    personal: 0,
    errors: 0,
    byDepartment: {},
    bySeniority: {},
    byPosition: {},
  }

  results.forEach((result) => {
    if (result.status === 'error') {
      report.errors++
      return
    }

    if (result.isGeneric) {
      report.generic++
    } else {
      report.personal++
    }

    // Count by department
    if (result.department) {
      report.byDepartment[result.department] =
        (report.byDepartment[result.department] || 0) + 1
    }

    // Count by seniority
    if (result.seniority) {
      report.bySeniority[result.seniority] =
        (report.bySeniority[result.seniority] || 0) + 1
    }

    // Count by position
    if (result.position) {
      report.byPosition[result.position] =
        (report.byPosition[result.position] || 0) + 1
    }
  })

  return report
}

/**
 * Filter results by criteria
 */
function filterResults(results, criteria) {
  return results.filter((result) => {
    if (
      criteria.isGeneric !== undefined &&
      result.isGeneric !== criteria.isGeneric
    ) {
      return false
    }
    if (criteria.department && result.department !== criteria.department) {
      return false
    }
    if (criteria.seniority && result.seniority !== criteria.seniority) {
      return false
    }
    return true
  })
}

/**
 * Export results to CSV format
 */
function exportToCSV(results) {
  const headers = [
    'Email',
    'Is Generic',
    'Department',
    'Position',
    'Seniority',
    'Status',
  ]
  const rows = results.map((r) => [
    r.email,
    r.isGeneric ? 'Yes' : 'No',
    r.department || '',
    r.position || '',
    r.seniority || '',
    r.status,
  ])

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n')

  return csv
}

/**
 * Group results by department
 */
function groupByDepartment(results) {
  const groups = {}

  results.forEach((result) => {
    const dept = result.department || 'unknown'
    if (!groups[dept]) {
      groups[dept] = []
    }
    groups[dept].push(result)
  })

  return groups
}

/**
 * Main execution
 */
async function main() {
  console.log('=== Batch Email Processing Example ===\n')

  // Sample email list
  const emailList = [
    'info@company.com',
    'sales@example.com',
    'support@business.org',
    'hr@corporation.net',
    'john.doe@personal.com',
    'admin@website.io',
    'contact@service.com',
    'billing@enterprise.com',
    'careers@startup.com',
    'newsletter@media.com',
    'webmaster@portal.com',
    'help@saas.com',
    'team@agency.com',
    'legal@lawfirm.com',
    'press@news.com',
  ]

  console.log(`Processing ${emailList.length} emails...\n`)

  // Process all emails
  const results = await processBatch(emailList)

  // Generate report
  const report = generateReport(results)

  console.log('=== Processing Report ===\n')
  console.log(`Total Emails Processed: ${report.total}`)
  console.log(`Generic Emails: ${report.generic}`)
  console.log(`Personal Emails: ${report.personal}`)
  console.log(`Errors: ${report.errors}`)
  console.log()

  // Show department breakdown
  console.log('=== Department Breakdown ===\n')
  Object.entries(report.byDepartment).forEach(([dept, count]) => {
    console.log(`  ${dept}: ${count}`)
  })
  console.log()

  // Show seniority breakdown
  if (Object.keys(report.bySeniority).length > 0) {
    console.log('=== Seniority Breakdown ===\n')
    Object.entries(report.bySeniority).forEach(([level, count]) => {
      console.log(`  ${level}: ${count}`)
    })
    console.log()
  }

  // Filter only generic emails
  console.log('=== Generic Emails Only ===\n')
  const genericOnly = filterResults(results, { isGeneric: true })
  genericOnly.forEach((result) => {
    console.log(`  ${result.email} - ${result.department || 'no department'}`)
  })
  console.log()

  // Filter by specific department
  console.log('=== Sales Department Emails ===\n')
  const salesEmails = filterResults(results, { department: 'sales' })
  if (salesEmails.length > 0) {
    salesEmails.forEach((result) => {
      console.log(`  ${result.email}`)
    })
  } else {
    console.log('  No sales emails found')
  }
  console.log()

  // Group by department
  console.log('=== Emails Grouped by Department ===\n')
  const grouped = groupByDepartment(results.filter((r) => r.isGeneric))
  Object.entries(grouped).forEach(([dept, emails]) => {
    console.log(`${dept} (${emails.length}):`)
    emails.forEach((e) => console.log(`  - ${e.email}`))
    console.log()
  })

  // Show CSV export sample
  console.log('=== CSV Export Sample (First 5 Rows) ===\n')
  const csv = exportToCSV(results)
  const csvLines = csv.split('\n').slice(0, 6)
  console.log(csvLines.join('\n'))
  console.log('...\n')

  // Performance statistics
  console.log('=== Statistics ===\n')
  console.log(
    `Generic Rate: ${((report.generic / report.total) * 100).toFixed(1)}%`
  )
  console.log(
    `Personal Rate: ${((report.personal / report.total) * 100).toFixed(1)}%`
  )
  console.log(
    `Success Rate: ${(
      ((report.total - report.errors) / report.total) *
      100
    ).toFixed(1)}%`
  )
  console.log()

  // Detailed results for first few emails
  console.log('=== Detailed Results (First 5) ===\n')
  results.slice(0, 5).forEach((result, index) => {
    console.log(`${index + 1}. ${result.email}`)
    console.log(`   Generic: ${result.isGeneric ? 'Yes' : 'No'}`)
    if (result.isGeneric) {
      console.log(`   Department: ${result.department || 'N/A'}`)
      console.log(`   Position: ${result.position || 'N/A'}`)
      console.log(`   Seniority: ${result.seniority || 'N/A'}`)
    }
    console.log()
  })
}

// Run the batch processing example
main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
