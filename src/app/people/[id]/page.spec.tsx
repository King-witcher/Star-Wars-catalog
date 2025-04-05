import { render } from '@testing-library/react'
import { JSX } from 'react'
import Page from './page'

async function resolvedComponent<T>(
  Component: (props: T) => Promise<JSX.Element>,
  props: T
): Promise<(props: T) => JSX.Element> {
  const ResolvedPage = await Component(props)
  return () => ResolvedPage
}

describe(Page, async () => {
  const ResolvedPage = await resolvedComponent(Page, { params: { id: '1' } })

  beforeEach(() => {
    vi.mock('@/services/swapi/people')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the persons name', async () => {
    const result = render(<ResolvedPage params={{ id: '1' }} />)
    result.getByText('Luke Skywalker')
  })
})
