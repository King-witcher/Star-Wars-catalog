import { theme } from '@/theme'
import { queryClient } from '@/utils/query-client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return (
    <AppRouterCacheProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AppRouterCacheProvider>
  )
}
