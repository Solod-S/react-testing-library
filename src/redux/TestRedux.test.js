import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { reducer } from "./reducer";
import TestRedux from "./TestRedux";

const renderWithRedux = (component, { initialState, store = createStore(reducer, initialState) } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};
// это функция, которая помогает рендерить компоненты с использованием Redux в тестах. Она оборачивает компонент в Redux-хранилище, чтобы можно было проводить тесты с данными из Redux.

describe("Redux testing", () => {
  it("checks initial state is equal to 0", async () => {
    const { getByRole } = renderWithRedux(<TestRedux />);
    await waitFor(() => {
      expect(getByRole("heading")).toHaveTextContent("0");
      // getByRole("heading") - ищем заголовок
    });
  });

  it("increments the counter through redux", async () => {
    const { getByRole, getByText } = renderWithRedux(<TestRedux />, {
      initialState: { count: 5 },
    });
    act(() => {
      userEvent.click(getByText("+1"));
    });
    // userEvent.click(getByText("+1"));
    await waitFor(() => {
      expect(getByRole("heading")).toHaveTextContent("6");
    });
  });

  it("decrements the counter through redux", async () => {
    const { getByRole, getByText } = renderWithRedux(<TestRedux />, {
      initialState: { count: 100 },
    });
    act(() => {
      userEvent.click(getByText("-1"));
    });
    // userEvent.click(getByText("-1"));
    await waitFor(() => {
      expect(getByRole("heading")).toHaveTextContent("99");
    });
  });
});

// мы не лезем во внутренюю реализацию компонентов и логики, а просто проверяем реакцию дом дерева
