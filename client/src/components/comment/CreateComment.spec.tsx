import { render, screen, fireEvent, waitFor } from '@tests/test-utils';
import { toast } from '@/toast';
import { CreateComment } from './CreateComment';
import { validateCommentInput, authorMinLength, contentMinLength } from './comment-validation';

vi.mock('./comment-validation.ts');

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

describe('CreateComment Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form elements', () => {
    render(<CreateComment topicId="25" />);
    expect(screen.getByLabelText('Author')).toBeInTheDocument();
    expect(screen.getByLabelText('Comment')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it.each([
    {
      description: 'shows a warning toast if author is empty',
      author: ' '.repeat(authorMinLength),
      content: 'some content',
      expectedToast: `Author must be at least ${authorMinLength} characters long`,
    },
    {
      description: 'shows a warning toast if author is less than 3 chars',
      author: 'e' + ' '.repeat(authorMinLength - 1),
      content: 'some content',
      expectedToast: `Author must be at least ${authorMinLength} characters long`,
    },
    {
      description: 'shows a warning toast if comment is empty',
      author: 'Author',
      content: ' '.repeat(contentMinLength),
      expectedToast: `Comment must be at least ${contentMinLength} characters long`,
    },
    {
      description: 'shows a warning toast if comment is less than 3 chars',
      author: 'Author',
      content: 's' + ' '.repeat(contentMinLength - 2),
      expectedToast: `Comment must be at least ${contentMinLength} characters long`,
    },  
  ])('$description', async ({ author, content, expectedToast }) => {
    vi.mocked(validateCommentInput).mockReturnValue({ valid: false, error: expectedToast });
    render(<CreateComment topicId="25" />);

    fireEvent.change(screen.getByLabelText('Author'), { target: { value: author } });
    fireEvent.change(screen.getByLabelText('Comment'), { target: { value: content } });

    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith(expectedToast);
    });

    vi.resetModules();
  });

  it('shows a success toast on successful comment creation', async () => {
    const author = 'A'.repeat(authorMinLength);
    const content = 'C'.repeat(contentMinLength);

    vi.mocked(validateCommentInput).mockReturnValue({ valid: true, validatedValue: {
      author,
      content,
    }});

    render(<CreateComment topicId="25" />);

    fireEvent.change(screen.getByLabelText('Author'), { target: { value: author } });
    fireEvent.change(screen.getByLabelText('Comment'), { target: { value: content } });

    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Comment created!');
    });
  });

  it('resets form on successful comment creation', async () => {
    const author = 'A'.repeat(authorMinLength);
    const content = 'C'.repeat(contentMinLength);

    vi.mocked(validateCommentInput).mockReturnValue({ valid: true, validatedValue: {
      author,
      content,
    }});

    render(<CreateComment topicId="25" />);

    fireEvent.change(screen.getByLabelText('Author'), { target: { value: author } });
    fireEvent.change(screen.getByLabelText('Comment'), { target: { value: content } });

    expect(screen.getByLabelText('Author')).toHaveValue(author);
    expect(screen.getByLabelText('Comment')).toHaveValue(content);

    fireEvent.click(screen.getByText('Send'));

    waitFor(() => {
      expect(screen.getByLabelText('Author')).toHaveValue('');
      expect(screen.getByLabelText('Comment')).toHaveValue('');
    });
  });

  it('shows an error toast if the server returns an error', async () => {
    vi.mocked(validateCommentInput).mockReturnValue({ valid: true, validatedValue: {
      author: '',
      content: '',
    }});

    render(<CreateComment topicId="25" />);

    // Remove validation attributes to be able to submit the form
    // without entering any data so that the server returns an error
    const authorInput = screen.getByLabelText('Author');
    const commentInput = screen.getByLabelText('Comment');
    authorInput.removeAttribute('required');
    authorInput.removeAttribute('minLength');
    commentInput.removeAttribute('required');
    commentInput.removeAttribute('minLength');

    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to create comment');
    });
  });
});