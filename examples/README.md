# Examples

This directory contains practical examples demonstrating how to use the `generic-emails` library.

## Running the Examples

Make sure you've built the project first:

```bash
npm run build
# or
yarn build
```

Then you can run any example:

```bash
node examples/basic-usage.js
node examples/validation.js
node examples/batch-processing.js
```

For TypeScript examples, you can use ts-node:

```bash
npx ts-node examples/typescript-usage.ts
```

## Available Examples

### 1. Basic Usage (`basic-usage.js`)

Demonstrates the fundamental functionality of checking whether email addresses are generic or personal.

**What you'll learn:**

- How to check if an email is generic
- Getting department, position, and seniority information
- Checking multiple emails
- Working with both full emails and local parts

**Run:**

```bash
node examples/basic-usage.js
```

### 2. Validation (`validation.js`)

Shows how to validate email addresses, departments, and seniority levels.

**What you'll learn:**

- Email format validation
- Department name validation
- Seniority level validation
- Complete validation workflow
- Error handling

**Run:**

```bash
node examples/validation.js
```

### 3. TypeScript Usage (`typescript-usage.ts`)

Demonstrates type-safe usage with TypeScript including interfaces and type definitions.

**What you'll learn:**

- Using TypeScript interfaces (GenericData, Email, etc.)
- Type-safe department and seniority names
- Creating custom typed interfaces
- Type guards and filtering
- Advanced TypeScript patterns

**Run:**

```bash
npx ts-node examples/typescript-usage.ts
```

### 4. Batch Processing (`batch-processing.js`)

Shows how to efficiently process multiple emails and generate reports.

**What you'll learn:**

- Processing multiple emails in batch
- Generating summary reports
- Filtering results by criteria
- Grouping emails by department
- Exporting to CSV format
- Performance statistics

**Run:**

```bash
node examples/batch-processing.js
```

### 5. Real-World Integration (`real-world-integration.js`)

Demonstrates practical integration scenarios in business applications.

**What you'll learn:**

- Contact form validation with generic email warnings
- Lead scoring system based on email quality
- Email list segmentation for targeted campaigns
- CRM data enrichment with email metadata
- Smart email routing by department and priority

**Run:**

```bash
node examples/real-world-integration.js
```

## Common Use Cases

### Lead Qualification

```javascript
// Filter out generic emails from your lead list
const leads = ['ceo@company.com', 'info@company.com', 'john@company.com']
const qualified = await filterPersonalEmails(leads)
```

### Email List Cleaning

```javascript
// Remove generic emails before sending marketing campaigns
const cleaned = await removeGenericEmails(emailList)
```

### Department-Based Routing

```javascript
// Route emails based on department
const result = await GenericEmail.isGeneric('sales@company.com')
if (result.department === 'sales') {
  routeToSalesTeam(email)
}
```

### Data Enrichment

```javascript
// Add metadata to email addresses
const enriched = await enrichEmailData(email)
// Returns: { email, isGeneric, department, position, seniority }
```

## Tips

1. **Always build first**: Run `npm run build` before running examples to ensure you have the latest compiled code.

2. **Error handling**: Wrap your code in try-catch blocks to handle validation errors gracefully.

3. **Batch processing**: For large lists, process emails in batches to manage memory efficiently.

4. **Type safety**: Use TypeScript for better IDE support and type checking.

## Need Help?

- Check the main [README](../README.md) for API documentation
- Open an issue on [GitHub](https://github.com/tomba-io/generic-emails/issues)
- Review the inline comments in each example file

## Contributing Examples

Have a great use case? We'd love to include more examples! Please submit a pull request with:

- A descriptive filename
- Well-commented code
- A section in this README explaining what it demonstrates
