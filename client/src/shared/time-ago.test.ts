import { timeAgo } from "./time-ago";

describe("timeAgo", () => {
  it('should return "0 seconds ago" for the current date', () => {
    const now = new Date().toISOString();
    expect(timeAgo(now)).toBe("0 seconds ago");
  });

  it('should return "1 minute ago" for a date 1 minute ago', () => {
    const date = new Date(Date.now() - 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe("1 minutes ago");
  });

  it('should return "1 hour ago" for a date 1 hour ago', () => {
    const date = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe("1 hours ago");
  });

  it('should return "1 day ago" for a date 1 day ago', () => {
    const date = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe("1 days ago");
  });

  it('should return "1 week ago" for a date 1 week ago', () => {
    const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe("1 weeks ago");
  });

  it('should return "1 year ago" for a date 1 year ago', () => {
    const date = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe("1 years ago");
  });

  it('should return "2 minutes ago" for a date 2 minutes ago', () => {
    const date = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe("2 minutes ago");
  });

  it('should return "2 hours ago" for a date 2 hours ago', () => {
    const date = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe("2 hours ago");
  });

  it('should return "2 days ago" for a date 2 days ago', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe("2 days ago");
  });

  it('should return "2 weeks ago" for a date 2 weeks ago', () => {
    const date = new Date(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe("2 weeks ago");
  });

  it('should return "2 years ago" for a date 2 years ago', () => {
    const date = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe("2 years ago");
  });
});
