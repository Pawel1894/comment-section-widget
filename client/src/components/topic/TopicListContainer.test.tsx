import { fireEvent, render, screen, waitFor } from '@tests/test-utils';
import { TopicListContainer } from './TopicListContainer';
import { mockTopics } from '@/tests/server-handlers';

describe('TopicListContainer', () => {
  it('Should fetch and display all topics', async () => {
    render(<TopicListContainer />);
    const searchInput = await screen.getByPlaceholderText('search');

    expect(searchInput).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(new RegExp(`.*\\. ${mockTopics[0].content}`))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`.*\\. ${mockTopics[1].content}`))).toBeInTheDocument();
    });
  });

  it('Should filter topics based on search input', async () => {
    render(<TopicListContainer />);
    const searchInput = await screen.getByPlaceholderText('search');

    fireEvent.change(searchInput, { target: { value: mockTopics[0].content } });

    await waitFor(() => {
      expect(screen.getByText(new RegExp(`.*\\. ${mockTopics[0].content}`))).toBeInTheDocument();
      expect(screen.queryByText(new RegExp(`.*\\. ${mockTopics[1].content}`))).not.toBeInTheDocument();
    });
  });

  it('Should display a message when no topics match the search', async () => {
    render(<TopicListContainer />);
    const searchInput = await screen.getByPlaceholderText('search');

    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });

    await waitFor(() => {
      expect(screen.getByText('No topics found')).toBeInTheDocument();
    });
  });

  it('Should clear the search input and display all topics again', async () => {
    render(<TopicListContainer />);
    const searchInput = await screen.getByPlaceholderText('search');

    fireEvent.change(searchInput, { target: { value: mockTopics[0].content } });

    await waitFor(() => {
      expect(screen.getByText(new RegExp(`.*\\. ${mockTopics[0].content}`))).toBeInTheDocument();
      expect(screen.queryByText(new RegExp(`.*\\. ${mockTopics[1].content}`))).not.toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText(new RegExp(`.*\\. ${mockTopics[0].content}`))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`.*\\. ${mockTopics[1].content}`))).toBeInTheDocument();
    });
  });

  it('Should have id in href value for topic links', async () => {
    render(<TopicListContainer />);
    await waitFor(() => {
      mockTopics.forEach((topic) => {
        const link = screen.getByText(new RegExp(`.*\\. ${topic.content}`)).closest('a');
        expect(link).toHaveAttribute('href', expect.stringMatching(new RegExp(`/${topic.id}$`)));
      });
    });
  });
});