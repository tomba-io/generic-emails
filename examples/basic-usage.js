/**
 * Basic Usage Example
 *
 * This example demonstrates the basic functionality of checking
 * whether an email address is generic or personal.
 */

const { GenericEmail } = require('../build/main/index.js')

async function basicExample() {
  console.log('=== Basic Generic Email Checking ===\n')

  // Example 1: Check a generic email
  console.log('Example 1: Checking info@company.com')
  const result1 = await GenericEmail.isGeneric('info@company.com')
  console.log('Result:', JSON.stringify(result1, null, 2))
  console.log('Is Generic:', result1.isgeneric ? 'Yes ✓' : 'No ✗')
  console.log()

  // Example 2: Check a sales email
  console.log('Example 2: Checking sales@example.com')
  const result2 = await GenericEmail.isGeneric('sales@example.com')
  console.log('Result:', JSON.stringify(result2, null, 2))
  console.log('Department:', result2.department || 'N/A')
  console.log()

  // Example 3: Check an HR email
  console.log('Example 3: Checking hr@company.org')
  const result3 = await GenericEmail.isGeneric('hr@company.org')
  console.log('Result:', JSON.stringify(result3, null, 2))
  console.log('Department:', result3.department || 'N/A')
  console.log()

  // Example 4: Check a support email
  console.log('Example 4: Checking support@business.com')
  const result4 = await GenericEmail.isGeneric('support@business.com')
  console.log('Result:', JSON.stringify(result4, null, 2))
  console.log()

  // Example 5: Check a personal email (likely not generic)
  console.log('Example 5: Checking john.doe@company.com')
  const result5 = await GenericEmail.isGeneric('john.doe@company.com')
  console.log('Result:', JSON.stringify(result5, null, 2))
  console.log('Is Generic:', result5.isgeneric ? 'Yes ✓' : 'No ✗')
  console.log()

  // Example 6: Using just the local part (before @)
  console.log('Example 6: Checking just the local part - "contact"')
  const result6 = await GenericEmail.isGeneric('contact')
  console.log('Result:', JSON.stringify(result6, null, 2))
  console.log()
}

// Helper function to check and display results
async function checkAndDisplay(email) {
  const result = await GenericEmail.isGeneric(email)

  console.log(`\nEmail: ${email}`)
  console.log('─'.repeat(50))
  console.log(`Generic: ${result.isgeneric ? '✓ Yes' : '✗ No'}`)

  if (result.isgeneric) {
    console.log(`Department: ${result.department || 'Not specified'}`)
    console.log(`Position: ${result.position || 'Not specified'}`)
    console.log(`Seniority: ${result.seniority || 'Not specified'}`)
  }
}

// Run examples
async function main() {
  try {
    await basicExample()

    console.log('\n=== Batch Check Multiple Emails ===\n')

    const emailsToCheck = [
      'admin@company.com',
      'webmaster@site.com',
      'billing@service.com',
      'careers@business.com',
      'newsletter@media.com',
    ]

    for (const email of emailsToCheck) {
      await checkAndDisplay(email)
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

main()
