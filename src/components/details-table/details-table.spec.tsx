import { render, waitFor } from '@testing-library/react'
import { DetailsTable } from './details-table'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { ColumnDefinition } from '../table/table'
import '@testing-library/jest-dom/vitest'

vi.mock('../table/table', () => ({
  Table: vi.fn(() => <div data-testid="my-table" />),
}))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

function renderWrapped(child: ReactNode) {
  return render(
    <QueryClientProvider client={queryClient}>{child}</QueryClientProvider>
  )
}

const columns: ColumnDefinition<{ test: string }>[] = [
  {
    content: 'test',
    header: 'Test Header',
    key: 'test',
  },
]
const mockResolvedData = Promise.resolve([{ test: 'value' }])
const mockEmptyData = Promise.resolve([])
const mockPendingData = new Promise<{ test: string }[]>(() => {})

function getKey(data: { test: string }) {
  return data.test
}

describe(DetailsTable, () => {
  afterEach(() => {
    // Clear client cache so that one test does not affect another
    queryClient.clear()
    vi.clearAllMocks()
  })

  it('should render loading state while the data is pending', () => {
    const { getByTestId } = renderWrapped(
      <DetailsTable
        data={mockPendingData}
        columns={columns}
        emptyFallback="empty-fallback"
        getKey={getKey}
        queryKey={['test']}
        title="test-title"
      />
    )
    expect(getByTestId('pending-state')).toBeInTheDocument()
  })

  it('should not render empty fallback when in pending state', () => {
    const { queryByText } = renderWrapped(
      <DetailsTable
        data={mockPendingData}
        columns={columns}
        emptyFallback="empty-fallback"
        getKey={getKey}
        queryKey={['test']}
        title="test-title"
      />
    )
    expect(queryByText('empty-fallback')).toBeFalsy()
  })

  it('should render empty fallback when data is empty', () => {
    const { getByText } = renderWrapped(
      <DetailsTable
        data={mockEmptyData}
        columns={columns}
        emptyFallback="empty-fallback"
        getKey={getKey}
        queryKey={['test']}
        title="test-title"
      />
    )

    waitFor(() => {
      expect(getByText('empty-fallback')).toBeInTheDocument()
    })
  })

  it('should not render the table when data is empty', async () => {
    const { queryByTestId } = renderWrapped(
      <DetailsTable
        data={mockEmptyData}
        columns={columns}
        emptyFallback="empty-fallback"
        getKey={getKey}
        queryKey={['test']}
        title="test-title"
      />
    )

    await waitFor(() => {
      expect(queryByTestId('my-table')).not.toBeInTheDocument()
    })
  })

  it('should render the table when data is not empty', async () => {
    const { getByTestId } = renderWrapped(
      <DetailsTable
        data={mockResolvedData}
        columns={columns}
        emptyFallback="empty-fallback"
        getKey={getKey}
        queryKey={['test']}
        title="test-title"
      />
    )

    await waitFor(() => {
      expect(getByTestId('my-table')).toBeInTheDocument()
    })
  })

  it('should render the title', () => {
    const { getByText } = renderWrapped(
      <DetailsTable
        data={mockResolvedData}
        columns={columns}
        emptyFallback="empty-fallback"
        getKey={getKey}
        queryKey={['test']}
        title="test-title"
      />
    )

    expect(getByText('test-title')).toBeInTheDocument()
  })
})
