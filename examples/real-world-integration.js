/**
 * Real-World Integration Example
 *
 * This example demonstrates practical integration scenarios including:
 * - Contact form validation
 * - Lead scoring system
 * - Email list segmentation
 * - CRM data enrichment
 */

const { GenericEmail } = require('../build/main/index.js')

/**
 * Scenario 1: Contact Form Validation
 * Encourage users to provide personal emails instead of generic ones
 */
async function validateContactForm(formData) {
  console.log('=== Contact Form Validation ===\n')

  const { name, email, company, message } = formData
  const warnings = []
  const errors = []

  try {
    // Check if email is generic
    const result = await GenericEmail.isGeneric(email)

    console.log(`Validating submission from: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Company: ${company}`)

    if (result.isgeneric) {
      warnings.push({
        field: 'email',
        message:
          'Generic email detected. For better service, please provide your personal work email.',
        suggestion: `Try using your name, like ${name
          .toLowerCase()
          .replace(' ', '.')}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      })
    }

    console.log('\nValidation Result:')
    console.log(`  Errors: ${errors.length}`)
    console.log(`  Warnings: ${warnings.length}`)

    if (warnings.length > 0) {
      console.log('\nWarnings:')
      warnings.forEach((w) => console.log(`  - ${w.message}`))
    }

    return {
      valid: errors.length === 0,
      warnings,
      errors,
      canSubmit: errors.length === 0,
    }
  } catch (error) {
    errors.push({
      field: 'email',
      message: 'Invalid email format',
    })
    return { valid: false, warnings, errors, canSubmit: false }
  }
}

/**
 * Scenario 2: Lead Scoring System
 * Assign scores based on email quality and type
 */
async function calculateLeadScore(lead) {
  console.log('\n=== Lead Scoring System ===\n')

  const { email, company, jobTitle, industry } = lead
  let score = 50 // Base score
  const scoreFactors = []

  const result = await GenericEmail.isGeneric(email)

  console.log(`Scoring lead: ${email}`)

  // Personal email gets higher score
  if (!result.isgeneric) {
    score += 30
    scoreFactors.push('Personal email (+30)')
  } else {
    score -= 10
    scoreFactors.push('Generic email (-10)')
  }

  // Executive emails get bonus
  if (result.seniority === 'executive') {
    score += 25
    scoreFactors.push('Executive level (+25)')
  } else if (result.seniority === 'senior') {
    score += 15
    scoreFactors.push('Senior level (+15)')
  }

  // Decision-maker departments get bonus
  const decisionMakerDepts = ['executive', 'management', 'finance']
  if (decisionMakerDepts.includes(result.department)) {
    score += 20
    scoreFactors.push(`Decision maker dept: ${result.department} (+20)`)
  }

  // Cap score at 100
  score = Math.min(score, 100)

  console.log(`\nFinal Score: ${score}/100`)
  console.log('Score Breakdown:')
  scoreFactors.forEach((factor) => console.log(`  - ${factor}`))

  // Categorize lead quality
  let quality
  if (score >= 80) quality = 'Hot Lead 🔥'
  else if (score >= 60) quality = 'Warm Lead 🌡️'
  else if (score >= 40) quality = 'Cold Lead ❄️'
  else quality = 'Low Quality Lead'

  console.log(`Quality Rating: ${quality}\n`)

  return {
    score,
    quality,
    factors: scoreFactors,
    emailData: result,
  }
}

/**
 * Scenario 3: Email List Segmentation
 * Segment contacts for targeted campaigns
 */
async function segmentEmailList(contacts) {
  console.log('=== Email List Segmentation ===\n')

  const segments = {
    executives: [],
    sales: [],
    technical: [],
    support: [],
    generic: [],
    personal: [],
  }

  console.log(`Segmenting ${contacts.length} contacts...\n`)

  for (const contact of contacts) {
    const result = await GenericEmail.isGeneric(contact.email)

    if (!result.isgeneric) {
      segments.personal.push({ ...contact, ...result })
    } else {
      segments.generic.push({ ...contact, ...result })

      // Further segment by department
      if (result.seniority === 'executive') {
        segments.executives.push({ ...contact, ...result })
      } else if (result.department === 'sales') {
        segments.sales.push({ ...contact, ...result })
      } else if (
        ['engineering', 'it', 'software'].includes(result.department)
      ) {
        segments.technical.push({ ...contact, ...result })
      } else if (result.department === 'support') {
        segments.support.push({ ...contact, ...result })
      }
    }
  }

  console.log('Segmentation Results:')
  console.log(`  Personal contacts: ${segments.personal.length}`)
  console.log(`  Generic contacts: ${segments.generic.length}`)
  console.log(`  - Executives: ${segments.executives.length}`)
  console.log(`  - Sales team: ${segments.sales.length}`)
  console.log(`  - Technical team: ${segments.technical.length}`)
  console.log(`  - Support team: ${segments.support.length}`)
  console.log()

  return segments
}

/**
 * Scenario 4: CRM Data Enrichment
 * Enrich existing CRM data with email metadata
 */
async function enrichCRMData(crmRecord) {
  console.log('=== CRM Data Enrichment ===\n')

  const { id, name, email, company } = crmRecord

  console.log(`Enriching record: ${id}`)
  console.log(`Contact: ${name}`)
  console.log(`Email: ${email}`)

  const result = await GenericEmail.isGeneric(email)

  const enrichedData = {
    ...crmRecord,
    emailType: result.isgeneric ? 'generic' : 'personal',
    department: result.department,
    position: result.position,
    seniority: result.seniority,
    lastEnriched: new Date().toISOString(),
    confidence: result.isgeneric ? 'high' : 'medium',
  }

  console.log('\nEnriched Fields:')
  console.log(`  Email Type: ${enrichedData.emailType}`)
  console.log(`  Department: ${enrichedData.department || 'Unknown'}`)
  console.log(`  Position: ${enrichedData.position || 'Unknown'}`)
  console.log(`  Seniority: ${enrichedData.seniority || 'Unknown'}`)
  console.log(`  Confidence: ${enrichedData.confidence}`)
  console.log()

  return enrichedData
}

/**
 * Scenario 5: Smart Email Router
 * Route emails to appropriate departments automatically
 */
async function smartEmailRouter(incomingEmail) {
  console.log('=== Smart Email Router ===\n')

  const { from, subject, body } = incomingEmail
  console.log(`Routing email from: ${from}`)

  const result = await GenericEmail.isGeneric(from)

  let routeTo = 'general'
  let priority = 'normal'
  let reason = ''

  if (!result.isgeneric) {
    // Personal emails might be more important
    priority = 'high'
    reason = 'Personal email - potential important contact'
  } else if (result.department) {
    // Route based on sender's department
    routeTo = result.department
    reason = `Sender from ${result.department} department`
  }

  // Executive emails get highest priority
  if (result.seniority === 'executive') {
    priority = 'urgent'
    reason = 'Executive level contact'
  }

  console.log(`\nRouting Decision:`)
  console.log(`  Route to: ${routeTo}`)
  console.log(`  Priority: ${priority}`)
  console.log(`  Reason: ${reason}`)
  console.log()

  return {
    routeTo,
    priority,
    reason,
    emailData: result,
  }
}

/**
 * Main function to run all scenarios
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════╗')
  console.log('║     Generic Emails - Real-World Integration Demo      ║')
  console.log('╚════════════════════════════════════════════════════════╝\n')

  // Scenario 1: Contact Form
  await validateContactForm({
    name: 'John Smith',
    email: 'info@techcorp.com',
    company: 'TechCorp',
    message: 'Interested in your product',
  })

  // Scenario 2: Lead Scoring
  await calculateLeadScore({
    email: 'cfo@enterprise.com',
    company: 'Enterprise Inc',
    jobTitle: 'CFO',
    industry: 'Technology',
  })

  await calculateLeadScore({
    email: 'contact@startup.io',
    company: 'Startup IO',
    jobTitle: 'Unknown',
    industry: 'SaaS',
  })

  // Scenario 3: List Segmentation
  const sampleContacts = [
    { email: 'ceo@company.com', name: 'Alice Johnson' },
    { email: 'sales@business.com', name: 'Sales Team' },
    { email: 'bob.smith@corp.com', name: 'Bob Smith' },
    { email: 'support@service.com', name: 'Support' },
    { email: 'dev@tech.io', name: 'Dev Team' },
  ]
  await segmentEmailList(sampleContacts)

  // Scenario 4: CRM Enrichment
  await enrichCRMData({
    id: 'CRM-12345',
    name: 'Marketing Team',
    email: 'marketing@client.com',
    company: 'Client Corp',
  })

  // Scenario 5: Email Router
  await smartEmailRouter({
    from: 'ceo@partner.com',
    subject: 'Partnership Opportunity',
    body: 'We would like to discuss...',
  })

  console.log('╔════════════════════════════════════════════════════════╗')
  console.log('║              All Scenarios Completed!                  ║')
  console.log('╚════════════════════════════════════════════════════════╝')
}

// Run all scenarios
main().catch((error) => {
  console.error('Error running scenarios:', error)
  process.exit(1)
})
