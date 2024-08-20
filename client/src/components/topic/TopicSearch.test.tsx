import { describe, it, expect } from 'vitest';
import { TopicSearch } from './TopicSearch';
import { fireEvent, render, screen } from '@/tests/test-utils';

describe('TopicSearch Component', () => {
  it('renders the input field', () => {
    render(<TopicSearch showLoading={false} onChange={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/search/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<TopicSearch showLoading={false} onChange={handleChange} />);
    const inputElement = screen.getByPlaceholderText(/search/i);
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows the loading spinner when showLoading is true', () => {
    render(<TopicSearch showLoading={true} onChange={() => {}} />);
    const spinnerElement = screen.getByTestId('oval-loading-spinner');
    expect(spinnerElement).toBeVisible();
  });

  it('hides the loading spinner when showLoading is false', () => {
    render(<TopicSearch showLoading={false} onChange={() => {}} />);
    const spinnerElement = screen.queryByTestId('oval-loading-spinner');
    expect(spinnerElement).not.toBeVisible();
  });
});