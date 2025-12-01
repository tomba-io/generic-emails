<p align="center"><img src="https://tomba.io/logo.png" height='60' /></p>

<h3 align="center">Tomba Email Finder</h3>

# Generic Emails Checker

[![npm version](https://badge.fury.io/js/generic-emails.svg)](https://www.npmjs.com/package/generic-emails)
[![GitHub license](https://img.shields.io/github/license/tomba-io/generic-emails.svg)](https://github.com/tomba-io/generic-emails)

A comprehensive TypeScript/JavaScript library for detecting generic email addresses and extracting metadata such as department, seniority, and position information. This package contains a curated list of over 27,000 generic email patterns found on the web.

## Features

- Check if an email address is generic (e.g., info@, contact@, support@)
- Validate email address format
- Extract department information (engineering, sales, hr, etc.)
- Identify seniority level (junior, senior, executive)
- Determine position type
- Extensive database of 27,000+ generic email patterns
- TypeScript support with full type definitions
- Works in Node.js and browsers
- Zero dependencies (runtime)

## Installation

```bash
npm install generic-emails
```

or using yarn:

```bash
yarn add generic-emails
```

## Quick Start

```javascript
const { GenericEmail } = require('generic-emails')

// Check if an email is generic
const result = await GenericEmail.isGeneric('info@company.com')
console.log(result)
// Output:
// {
//   email: 'info@company.com',
//   isgeneric: true,
//   department: null,
//   position: null,
//   seniority: null
// }
```

## Usage

### Check Generic Email

The main functionality is to determine if an email address is generic and retrieve associated metadata:

```javascript
const { GenericEmail } = require('generic-emails')

async function checkEmail() {
  const result = await GenericEmail.isGeneric('sales@company.com')

  if (result.isgeneric) {
    console.log('This is a generic email')
    console.log('Department:', result.department)
    console.log('Position:', result.position)
    console.log('Seniority:', result.seniority)
  } else {
    console.log('This is a personal email')
  }
}

checkEmail()
```

### Email Validation

Validate email addresses and detect hash-based patterns:

```javascript
const { Emails } = require('generic-emails')

try {
  const isValid = Emails.validate('user@example.com')
  console.log('Email is valid:', isValid)
} catch (error) {
  console.error('Invalid email:', error.message)
}
```

### Department Validation

Validate department names against supported types:

```javascript
const { Department } = require('generic-emails')

const isValid = Department.validate('engineering')
console.log('Valid department:', isValid)
```

Supported departments: `engineering`, `sales`, `finance`, `it`, `hr`, `marketing`, `operations`, `management`, `executive`, `legal`, `support`, `communication`, `software`, `security`, `pr`, `warehouse`, `diversity`, `administrative`, `facilities`, `accounting`

### Seniority Validation

Check seniority levels:

```javascript
const { Seniority } = require('generic-emails')

const isValid = Seniority.validate('senior')
console.log('Valid seniority:', isValid)
```

Supported seniority levels: `junior`, `senior`, `executive`

## TypeScript Usage

The library is written in TypeScript and includes full type definitions:

```typescript
import { GenericEmail, GenericData, Email } from 'generic-emails'
import { Departmentname } from 'generic-emails'
import { Seniorityname } from 'generic-emails'

async function checkGenericEmail(email: string): Promise<GenericData> {
  const result = await GenericEmail.isGeneric(email)
  return result
}

// Use type-safe department names
const department: Departmentname = 'engineering'

// Use type-safe seniority names
const seniority: Seniorityname = 'senior'
```

## API Reference

### `GenericEmail.isGeneric(email: string): Promise<GenericData>`

Checks if an email address is generic and returns metadata.

**Parameters:**

- `email` (string): The email address to check (can be full email or just the local part)

**Returns:** `Promise<GenericData>`

```typescript
interface GenericData {
  email?: string
  isgeneric?: boolean
  department?: string
  position?: string
  seniority?: string
}
```

### `Emails.validate(email: string): boolean`

Validates an email address format and checks for hash-based patterns.

**Parameters:**

- `email` (string): The email address to validate

**Returns:** `boolean` - Returns true if valid, throws error if invalid

### `Department.validate(name: Departmentname): boolean`

Validates a department name.

**Parameters:**

- `name` (Departmentname): The department name to validate

**Returns:** `boolean`

### `Seniority.validate(name: Seniorityname): boolean`

Validates a seniority level.

**Parameters:**

- `name` (Seniorityname): The seniority level to validate

**Returns:** `boolean`

## Examples

Check out the [examples](./examples) directory for more detailed usage examples:

- [Basic Usage](./examples/basic-usage.js) - Simple generic email checking
- [Validation](./examples/validation.js) - Email, department, and seniority validation
- [TypeScript Usage](./examples/typescript-usage.ts) - Using with TypeScript
- [Batch Processing](./examples/batch-processing.js) - Processing multiple emails

## Data Source

The package includes a comprehensive `emails.json` file containing over 27,000 generic email patterns collected from the web. Each entry may include:

- Email pattern (local part before @)
- Department classification
- Position information
- Seniority level

## Use Cases

- **Lead Qualification**: Filter out generic emails to focus on personal contacts
- **Email List Cleaning**: Remove generic addresses from marketing campaigns
- **Contact Discovery**: Identify department-specific emails for targeted outreach
- **Data Enrichment**: Add department and seniority metadata to email addresses
- **Form Validation**: Encourage users to provide personal rather than generic emails

## Contributing

We welcome contributions! Here's how you can help:

1. Fork it (<https://github.com/tomba-io/generic-emails/fork>)
2. Create your feature branch (`git checkout -b my-new-email`)
3. Add generic emails to `emails.json` with appropriate metadata
4. Run jq command to sort emails.json (`jq -S . emails.json > temp.json && mv temp.json emails.json`)
5. Run tests to ensure everything works (`npm test`)
6. Commit your changes (`git commit -am 'Add new email patterns'`)
7. Push to the branch (`git push origin my-new-email`)
8. Create a new Pull Request

### Adding New Generic Emails

When adding new entries to `emails.json`, please follow this format:

```json
{
  "email": "support",
  "department": "support",
  "position": "support",
  "seniority": null
}
```

## Requirements

- Node.js >= 16.x
- TypeScript >= 3.0 (for development)

## Contributors

- [Mohamed Ben](https://github.com/benemohamed) - creator and maintainer
- [abedrahim](https://github.com/Abed-rahim) - maintainer

## License

[![GitHub license](https://img.shields.io/github/license/tomba-io/generic-emails.svg)](https://github.com/tomba-io/generic-emails)

MIT License - see the [LICENSE](LICENSE) file for details

## Related Projects

- [Tomba.io](https://tomba.io) - Email Finder and Verification API

## Support

For questions and support, please open an issue on [GitHub](https://github.com/tomba-io/generic-emails/issues).
