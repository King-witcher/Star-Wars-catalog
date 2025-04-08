import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AttributeRow } from './attribute-row'

describe(AttributeRow, () => {
  it('should render name and value in table cells', () => {
    const { getByText } = render(<AttributeRow name="Height" value="180cm" />)

    expect(getByText('Height')).toBeInTheDocument()
    expect(getByText('180cm')).toBeInTheDocument()
  })
})
