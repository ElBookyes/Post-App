'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient()

interface Props {
    children?: React.ReactNode
}
  
const QueryWrapper = ({ children }: Props) => (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
)

export default QueryWrapper