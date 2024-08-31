import { CommentRating } from "./CommentRating";
import { vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@/tests/test-utils";

const upVoteChar = "↑";

describe("CommentRating", () => {
  const commentId = "comment1";
  const topicId = "topic1";
  const initialRating = 15;

  beforeAll(() => {
    vi.mock("./hooks/use-vote-state", () => {
      return {
        useVoteState: vi.fn().mockReturnValue([undefined, vi.fn()])
      };
    });
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it("should render the initial rating and buttons", () => {
    render(<CommentRating context="parent" rating={initialRating} commentId={commentId} topicId={topicId} />);

    expect(screen.getByText(upVoteChar)).toBeInTheDocument();
    expect(screen.getByText(initialRating.toString())).toBeInTheDocument();
  });

  it("should handle upvote", () => {
    render(<CommentRating context="parent" rating={initialRating} commentId={commentId} topicId={topicId} />);

    fireEvent.click(screen.getByText(upVoteChar));
    
    waitFor(() => {
      expect(screen.getByText((initialRating + 1).toString())).toBeInTheDocument();
    });
  });

  it("should handle removing vote", () => {
    render(<CommentRating context="parent" rating={initialRating} commentId={commentId} topicId={topicId} />);

    fireEvent.click(screen.getByText(upVoteChar));
    
    waitFor(() => {
      expect(screen.getByText((initialRating + 1).toString())).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(upVoteChar));

    waitFor(() => {
      expect(screen.getByText(initialRating.toString())).toBeInTheDocument();
    });
  });

  describe("pending state", () => {
    beforeAll(() => {
      vi.mock("./hooks/use-vote.ts", () => {
        return {
          useVote: vi.fn().mockReturnValue({
            mutate: vi.fn(),
            isPending: true
          })
        };
      });
    });
  
    afterAll(() => {
      vi.resetAllMocks();
    });
  
    it("should disable vote button when pending", () => {
      render(<CommentRating context="parent" rating={initialRating} commentId={commentId} topicId={topicId} />);
  
      fireEvent.click(screen.getByText(upVoteChar));
  
      expect(screen.getByText(upVoteChar)).toBeDisabled();
    });
  });
});

