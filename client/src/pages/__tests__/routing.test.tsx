import { render, screen } from '@/tests/test-utils';

describe('routing', () => {
  test('renders error page for non-existent route', () => {
    render(<div>test</div>, { initialEntries: ['/not/existing/route'] });
  
    const errorElement = screen.getByText(/Error: No route matches URL "\/not\/existing\/route"/i);
    expect(errorElement).toBeInTheDocument();
  });
})