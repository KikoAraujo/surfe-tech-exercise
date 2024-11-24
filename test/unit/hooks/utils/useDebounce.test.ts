import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "../../../../src/hooks/utils/useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should return the initial value", () => {
    const initialValue = { id: 1, field: "title" as "title", value: "Test" };
    const { result } = renderHook(() => useDebounce(initialValue, 500));

    expect(result.current).toEqual(initialValue);
  });

  it("should debounce the value after the specified delay", () => {
    const initialValue = { id: 1, field: "title" as "title", value: "Test" };
    const updatedValue = { id: 1, field: "title" as "title", value: "Updated" };

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: initialValue },
      }
    );

    expect(result.current).toEqual(initialValue);

    rerender({ value: updatedValue });

    expect(result.current).toEqual(initialValue);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toEqual(updatedValue);
  });

  it("should clear the timeout when value changes before the delay", () => {
    const initialValue = { id: 1, field: "title" as "title", value: "Test" };
    const updatedValue1 = {
      id: 1,
      field: "title" as "title",
      value: "Updated 1",
    };
    const updatedValue2 = {
      id: 1,
      field: "title" as "title",
      value: "Updated 2",
    };

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: initialValue },
      }
    );

    expect(result.current).toEqual(initialValue);

    rerender({ value: updatedValue1 });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: updatedValue2 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toEqual(updatedValue2);
  });

  it("should return null if value is null", () => {
    const { result } = renderHook(() => useDebounce(null, 500));

    expect(result.current).toBeNull();
  });
});
