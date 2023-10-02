import { queryClient } from "@/config/query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"

export const customRender = (component: JSX.Element) => {
  return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>)
}
