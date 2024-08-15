import { routes } from '@/routes/routes';
import { renderWithoutRouter, screen } from '@/tests/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

function getMemoryRouter(initialEntries?: string[]) {
  return createMemoryRouter(routes, {
    initialEntries,
  });
}

describe('routing', () => {
  test('renders error page for non-existent route', () => {
    const router = getMemoryRouter(['/not/existing/route']);
    renderWithoutRouter(<RouterProvider router={router} />);
  
    const errorElement = screen.getByText(/Error: No route matches URL "\/not\/existing\/route"/i);
    expect(errorElement).toBeInTheDocument();
  });
})