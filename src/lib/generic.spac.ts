import { equal } from 'assert'

import lib from './generic'

describe('Test: Generic email check', () => {
  it('test: should be Generic email', async () => {
    const email_info: string = 'info'
    const email_agent: string = 'agent'
    const email_info_with_domain: string = 'info@tomba.io'
    const email_agent_with_domain: string = 'agent@tomba.io'

    const info_with_domain = await lib.isGeneric(email_info_with_domain)
    const agent_with_domain = await lib.isGeneric(email_agent_with_domain)

    const info = await lib.isGeneric(email_info)
    const agent = await lib.isGeneric(email_agent)

    equal(info.isgeneric, true)
    equal(info.email, email_info)

    equal(info_with_domain.isgeneric, true)
    equal(info_with_domain.email, email_info_with_domain)

    equal(agent.isgeneric, true)
    equal(agent.email, email_agent)

    equal(agent.isgeneric, true)
    equal(agent.email, email_agent)

    equal(agent_with_domain.isgeneric, true)
    equal(agent_with_domain.email, email_agent_with_domain)
  })

  it('test: should not be Generic email', async () => {
    const mohamed = await lib.isGeneric('mohamed@tomba.io')
    const ben = await lib.isGeneric('ben@tomba.io')

    equal(mohamed.isgeneric, false)
    equal(ben.isgeneric, false)
  })
})
