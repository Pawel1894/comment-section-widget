import * as React from "react";
import { render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});


function getMemoryRouter(initialEntries?: string[]) {
  return createMemoryRouter(routes, {
    initialEntries,
  });
}

type Options = {
  initialEntries?: string[]
  renderOptions?: object;
}

function render(ui: React.ReactElement, options: Options = {}) {
  const router = getMemoryRouter(options.initialEntries);

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {children}
      </QueryClientProvider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...(options.renderOptions ?? {}) });
}

export * from "@testing-library/react";
export { vi } from "vitest";
export { default as userEvent } from "@testing-library/user-event";
export { render };
