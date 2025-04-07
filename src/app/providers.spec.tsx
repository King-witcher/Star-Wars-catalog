import { render } from '@testing-library/react'
import { Providers } from './providers'

type WithChildren = {
  children: React.ReactNode
}

vi.mock('@mui/material-nextjs/v15-appRouter', () => ({
  AppRouterCacheProvider: ({ children }: WithChildren) => (
    <div data-testid="app-router-cache-provider">{children}</div>
  ),
}))

vi.mock('@tanstack/react-query', () => ({
  QueryClientProvider: ({ children }: WithChildren) => (
    <div data-testid="query-client-provider">{children}</div>
  ),
}))

vi.mock('@mui/material/styles', () => ({
  ThemeProvider: ({ children }: WithChildren) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}))

vi.mock('@/contexts/favorites', () => ({
  FavoritesProvider: ({ children }: WithChildren) => (
    <div data-testid="favorites-provider">{children}</div>
  ),
}))

vi.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => <div data-testid="react-query-devtools" />,
}))

vi.mock('@/utils/query-client', () => ({
  queryClient: {},
}))

vi.mock('@/theme', () => ({
  theme: {},
}))

describe(Providers, () => {
  it('renders all providers', () => {
    const { getByTestId } = render(
      <Providers>
        <div />
      </Providers>
    )

    // .toBeDefined is unnecessary since getByTestId will throw if the element is not found.
    // However, I kept it anyway for semantic purposes and clarity.
    expect(getByTestId('app-router-cache-provider')).toBeDefined()
    expect(getByTestId('query-client-provider')).toBeDefined()
    expect(getByTestId('theme-provider')).toBeDefined()
    expect(getByTestId('favorites-provider')).toBeDefined()
  })

  it('renders react-query-devtools', () => {
    const { getByTestId } = render(
      <Providers>
        <div />
      </Providers>
    )
    expect(getByTestId('react-query-devtools')).toBeDefined()
  })

  it('renders children', () => {
    const { getByTestId } = render(
      <Providers>
        <div data-testid="children" />
      </Providers>
    )

    expect(getByTestId('children')).toBeDefined()
  })
})
