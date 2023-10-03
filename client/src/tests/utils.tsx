import { queryClient } from "@/config/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter for routing-related tests

export const customRender = (component: JSX.Element) => {
  return render(
    <Router>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </Router>,
  );
};
