import * as React from "react";
import { render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

type Options = {
  renderOptions?: object;
}

function renderWithoutRouter(ui: React.ReactElement, options: Options = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...(options.renderOptions ?? {}) });
}

function render(ui: React.ReactElement, options: Options = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...(options.renderOptions ?? {}) });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { render, renderWithoutRouter };
