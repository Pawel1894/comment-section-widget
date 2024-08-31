import { getFromLocalStorage, setInLocalStorage } from "./local-storage-utils";
import { vi } from "vitest";

describe("localStorage utils", () => {
  let originalLocalStorage: Storage;

  beforeEach(() => {
    originalLocalStorage = window.localStorage;

    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          store[key] = value;
        }),
        clear: vi.fn(() => {
          store = {};
        }),
        removeItem: vi.fn((key: string) => {
          delete store[key];
        }),
      };
    })();

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: originalLocalStorage,
      writable: true,
    });
    vi.restoreAllMocks();
  });

  describe("getFromLocalStorage", () => {
    it("should return parsed value from localStorage for existing key", () => {
      const key = "userUpvotes";
      const value = { comment1: "upvote" };
      localStorage.setItem(key, JSON.stringify(value));

      const result = getFromLocalStorage(key);
      expect(result).toEqual(value);
    });

    it("should return null for non-existing key", () => {
      // eslint-disable-next-line
      // @ts-expect-error
      const result = getFromLocalStorage("nonExistingKey");
      expect(result).toBeNull();
    });
  });

  describe("setInLocalStorage", () => {
    it("should set the value in localStorage", () => {
      const key = "userUpvotes";
      const value = { comment1: true };

      setInLocalStorage(key, value);

      const storedValue = localStorage.getItem(key);
      expect(storedValue).toEqual(JSON.stringify(value));
    });
  });
});
