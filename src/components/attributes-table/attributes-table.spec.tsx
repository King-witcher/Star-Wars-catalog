import { render } from '@testing-library/react'
import { AttributesTable } from './attributes-table'

vi.mock('./attribute-row', () => ({
  AttributeRow: vi.fn(({ name, value }) => (
    <tr data-testid="attribute-row" data-name={name} data-value={value} />
  )),
}))

describe(AttributesTable, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should sort attributes alphabetically and place uknown values at the end', () => {
    const attributes = {
      bttribute: 'unknown',
      attribute: 'unknown',
      bheight: '172',
      aheight: '165',
    }

    const { getAllByTestId } = render(
      <AttributesTable attributes={attributes} />
    )

    const rows = getAllByTestId('attribute-row').map((row) => row.dataset.name)

    expect(rows).toEqual(['aheight', 'bheight', 'attribute', 'bttribute'])
  })
})
