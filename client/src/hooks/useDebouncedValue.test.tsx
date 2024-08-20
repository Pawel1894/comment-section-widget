import { useDebouncedValue } from "./useDebouncedValue";
import { act, render } from "@/tests/test-utils";
import { vi } from 'vitest';

const TestComponent = ({ value, delay }: { value: string; delay: number }) => {
  const debouncedValue = useDebouncedValue(value, delay);
  return <div data-testid="debounced-value">{debouncedValue}</div>;
};

vi.useFakeTimers();

describe("useDebouncedValue", () => {
  it("should update debounced value after the specified delay", () => {
    const { getByTestId, rerender } = render(<TestComponent value="initial" delay={500} />);

    expect(getByTestId("debounced-value").textContent).toBe("initial");

    rerender(<TestComponent value="updated" delay={500} />);

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(getByTestId("debounced-value").textContent).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(getByTestId("debounced-value").textContent).toBe("updated");
  });
});