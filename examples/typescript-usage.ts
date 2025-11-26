/**
 * TypeScript Usage Example
 *
 * This example demonstrates how to use the generic-emails library
 * with TypeScript, including type-safe interfaces and type definitions.
 */

import { GenericEmail, GenericData, Email, Generic } from '../src/index'

import { Departmentname } from '../src/lib/validation/department'
import { Seniorityname } from '../src/lib/validation/seniority'

/**
 * Example 1: Basic usage with type annotations
 */
async function basicTypeSafeExample(): Promise<void> {
  console.log('=== TypeScript Basic Example ===\n')

  const email: string = 'info@company.com'
  const result: GenericData = await GenericEmail.isGeneric(email)

  console.log(`Email: ${result.email}`)
  console.log(`Is Generic: ${result.isgeneric}`)
  console.log(`Department: ${result.department || 'N/A'}`)
  console.log(`Position: ${result.position || 'N/A'}`)
  console.log(`Seniority: ${result.seniority || 'N/A'}`)
  console.log()
}

/**
 * Example 2: Using typed department names
 */
function useDepartmentTypes(): void {
  console.log('=== Department Type Examples ===\n')

  // Type-safe department names
  const departments: Departmentname[] = [
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
    'communication',
    null,
  ]

  console.log('Valid department types:')
  departments.forEach((dept) => {
    console.log(`  - ${dept === null ? 'null (unspecified)' : dept}`)
  })
  console.log()
}

/**
 * Example 3: Using typed seniority levels
 */
function useSeniorityTypes(): void {
  console.log('=== Seniority Type Examples ===\n')

  // Type-safe seniority levels
  const seniorities: Seniorityname[] = ['junior', 'senior', 'executive', null]

  console.log('Valid seniority types:')
  seniorities.forEach((level) => {
    console.log(`  - ${level === null ? 'null (unspecified)' : level}`)
  })
  console.log()
}

/**
 * Example 4: Type-safe email checking function
 */
async function checkEmailWithTypes(emailAddress: string): Promise<GenericData> {
  const result: GenericData = await GenericEmail.isGeneric(emailAddress)
  return result
}

/**
 * Example 5: Creating a custom interface that extends GenericData
 */
interface ExtendedEmailData extends GenericData {
  timestamp: Date
  source: string
}

async function createExtendedEmailData(
  email: string,
  source: string
): Promise<ExtendedEmailData> {
  const result: GenericData = await GenericEmail.isGeneric(email)

  return {
    ...result,
    timestamp: new Date(),
    source,
  }
}

/**
 * Example 6: Processing multiple emails with type safety
 */
async function processEmailBatch(emails: string[]): Promise<GenericData[]> {
  const results: GenericData[] = []

  for (const email of emails) {
    const result = await GenericEmail.isGeneric(email)
    results.push(result)
  }

  return results
}

/**
 * Example 7: Filtering generic emails with type guards
 */
function isGenericEmail(data: GenericData): boolean {
  return data.isgeneric === true
}

async function filterGenericEmails(
  emails: string[]
): Promise<{ generic: GenericData[]; personal: GenericData[] }> {
  const results = await processEmailBatch(emails)

  const generic = results.filter(isGenericEmail)
  const personal = results.filter((result) => !isGenericEmail(result))

  return { generic, personal }
}

/**
 * Example 8: Department-based filtering
 */
async function filterByDepartment(
  emails: string[],
  targetDepartment: Departmentname
): Promise<GenericData[]> {
  const results = await processEmailBatch(emails)

  return results.filter((result) => result.department === targetDepartment)
}

/**
 * Example 9: Complete typed workflow
 */
interface EmailAnalysis {
  email: string
  isGeneric: boolean
  metadata: {
    department: string | null
    position: string | null
    seniority: string | null
  }
  analyzedAt: Date
}

async function analyzeEmail(email: string): Promise<EmailAnalysis> {
  const result: GenericData = await GenericEmail.isGeneric(email)

  return {
    email: result.email || email,
    isGeneric: result.isgeneric || false,
    metadata: {
      department: result.department || null,
      position: result.position || null,
      seniority: result.seniority || null,
    },
    analyzedAt: new Date(),
  }
}

/**
 * Main function to run all examples
 */
async function main(): Promise<void> {
  try {
    // Run basic example
    await basicTypeSafeExample()

    // Show department types
    useDepartmentTypes()

    // Show seniority types
    useSeniorityTypes()

    // Example with custom interface
    console.log('=== Extended Email Data Example ===\n')
    const extendedData = await createExtendedEmailData(
      'support@company.com',
      'user-input'
    )
    console.log('Extended Data:', JSON.stringify(extendedData, null, 2))
    console.log()

    // Batch processing example
    console.log('=== Batch Processing Example ===\n')
    const emails = [
      'info@company.com',
      'sales@example.com',
      'john.doe@business.com',
    ]
    const batchResults = await processEmailBatch(emails)
    console.log(`Processed ${batchResults.length} emails`)
    console.log()

    // Filtering example
    console.log('=== Filtering Example ===\n')
    const filtered = await filterGenericEmails(emails)
    console.log(`Generic emails: ${filtered.generic.length}`)
    console.log(`Personal emails: ${filtered.personal.length}`)
    console.log()

    // Department filtering example
    console.log('=== Department Filtering Example ===\n')
    const salesEmails = await filterByDepartment(
      ['sales@a.com', 'info@b.com', 'hr@c.com'],
      'sales'
    )
    console.log(`Sales department emails: ${salesEmails.length}`)
    console.log()

    // Complete analysis example
    console.log('=== Complete Email Analysis ===\n')
    const analysis = await analyzeEmail('hr@company.com')
    console.log('Analysis:', JSON.stringify(analysis, null, 2))
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message)
    } else {
      console.error('Unknown error occurred')
    }
  }
}

// Run the examples
main()
