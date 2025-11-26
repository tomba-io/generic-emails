/**
 * Validation Example
 *
 * This example demonstrates email validation, department validation,
 * and seniority validation features.
 */

const { Emails, Department, Seniority } = require('../build/main/index.js')

console.log('=== Email Validation Examples ===\n')

// Example 1: Valid email addresses
const validEmails = [
  'user@example.com',
  'john.doe@company.co.uk',
  'support+info@business.org',
  'test_email@domain.io',
]

console.log('Testing valid email addresses:')
validEmails.forEach((email) => {
  try {
    const isValid = Emails.validate(email)
    console.log(`✓ ${email} - Valid`)
  } catch (error) {
    console.log(`✗ ${email} - Invalid: ${error.message}`)
  }
})

console.log()

// Example 2: Invalid email addresses
const invalidEmails = [
  'notanemail',
  '@example.com',
  'user@',
  'user @example.com',
  'user@.com',
]

console.log('Testing invalid email addresses:')
invalidEmails.forEach((email) => {
  try {
    const isValid = Emails.validate(email)
    console.log(`✓ ${email} - Valid`)
  } catch (error) {
    console.log(`✗ ${email} - Invalid: ${error.message}`)
  }
})

console.log('\n=== Department Validation Examples ===\n')

// Example 3: Valid departments
const validDepartments = [
  'engineering',
  'sales',
  'finance',
  'it',
  'hr',
  'marketing',
  'operations',
  'management',
  'executive',
  'legal',
  'support',
]

console.log('Supported departments:')
validDepartments.forEach((dept) => {
  const isValid = Department.validate(dept)
  console.log(`  ${isValid ? '✓' : '✗'} ${dept}`)
})

console.log('\n=== Seniority Validation Examples ===\n')

// Example 4: Valid seniority levels
const validSeniorities = [
  'junior',
  'senior',
  'executive',
  null, // null is also valid
]

console.log('Supported seniority levels:')
validSeniorities.forEach((level) => {
  const isValid = Seniority.validate(level)
  const display = level === null ? 'null (not specified)' : level
  console.log(`  ${isValid ? '✓' : '✗'} ${display}`)
})

console.log('\n=== Complete Validation Workflow ===\n')

// Example 5: Complete validation workflow
async function validateEmailComplete(email) {
  console.log(`Validating: ${email}`)
  console.log('─'.repeat(50))

  try {
    // Step 1: Validate email format
    Emails.validate(email)
    console.log('✓ Email format is valid')

    // Step 2: Check if generic
    const { GenericEmail } = require('../build/main/index.js')
    const result = await GenericEmail.isGeneric(email)

    console.log(`✓ Generic check: ${result.isgeneric ? 'Generic' : 'Personal'}`)

    // Step 3: Validate department if present
    if (result.department) {
      const deptValid = Department.validate(result.department)
      console.log(
        `✓ Department (${result.department}): ${
          deptValid ? 'Valid' : 'Invalid'
        }`
      )
    }

    // Step 4: Validate seniority if present
    if (result.seniority) {
      const seniorityValid = Seniority.validate(result.seniority)
      console.log(
        `✓ Seniority (${result.seniority}): ${
          seniorityValid ? 'Valid' : 'Invalid'
        }`
      )
    }

    console.log('\n✓ All validations passed!\n')
    return true
  } catch (error) {
    console.log(`\n✗ Validation failed: ${error.message}\n`)
    return false
  }
}

// Run complete validation examples
async function main() {
  await validateEmailComplete('sales@company.com')
  await validateEmailComplete('invalid-email')
  await validateEmailComplete('hr@business.org')
}

main()
