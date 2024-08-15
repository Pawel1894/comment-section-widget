import { render, screen, fireEvent, waitFor } from '@tests/test-utils';
import { vi } from 'vitest';
import { toast } from '@/toast';
import { CreateTopic } from './CreateTopic';
import { validateTopicInput } from './topic-validation'

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

vi.mock('./topic-validation.ts');

describe('CreateTopic Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('renders the Create Topic button', async () => {
    render(<CreateTopic />);
    const button = await screen.getByText('Create Topic')
    expect(button).toBeInTheDocument();
  });

  it('shows a prompt when the button is clicked', () => {
    window.prompt = vi.fn();
    render(<CreateTopic />);
    vi.mocked(validateTopicInput).mockReturnValue({ valid: false, error: 'error' });

    fireEvent.click(screen.getByText('Create Topic'));
    expect(window.prompt).toHaveBeenCalledWith('Enter a topic name');
  });

  it('shows a warning toast', () => {
    window.prompt = vi.fn().mockReturnValue(null);
    vi.mocked(validateTopicInput).mockReturnValue({ valid: false, error: 'Topic must not be empty'});

    render(<CreateTopic />);

    fireEvent.click(screen.getByText('Create Topic'));
    expect(toast.warn).toHaveBeenCalledWith('Topic must not be empty');
  });

  it('shows a success toast', async () => {
    window.prompt = vi.fn().mockReturnValue('Some Topic');
    vi.mocked(validateTopicInput).mockReturnValue({ valid: true, validatedValue: 'Some Topic'});

    render(<CreateTopic />);

    await fireEvent.click(screen.getByText('Create Topic'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Topic created!');
    });
  });

  it('shows an error toast if the server returns an error', async () => {
    vi.mocked(validateTopicInput).mockReturnValue({ valid: true, validatedValue: ''});
    
    render(<CreateTopic />);

    fireEvent.click(screen.getByText('Create Topic'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to create topic');
    });
  });
});