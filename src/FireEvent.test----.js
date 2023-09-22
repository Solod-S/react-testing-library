import { render, screen, fireEvent } from "@testing-library/react";
import Event from "./Event";
describe("Async handle element", () => {
  // изначально элемента нету но после выполнения асинхроного кода он появиться
  it("Get input text", async () => {
    render(<Event />);
    // рендер компонента

    await screen.findByText(/Logged in as/i);
    // дожидаемся юзефекта и после рендеринга кто залогинен

    expect(screen.queryByText(/Searches for React/i)).toBeNull();
    // изначально строки такой нету

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "React" } });
    // выбор элемента по лейблу и заполняем инпут

    expect(screen.queryByText(/Searches for React/i)).toBeInTheDocument();
    // после собыбия выше мы поулчаем в документе текст
  });
});

describe("Checkbox handle element", () => {
  it("checkbox click ", () => {
    const handleChange = jest.fn();
    const { container } = render(<input type="checkbox" onChange={handleChange} />);
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    // чекбокс не выбран
    fireEvent.click(checkbox);
    // чекбокс  выбран
    expect(handleChange).toHaveBeenCalledTimes(1);
    // то что функция была вызвана 1 раз (используем его)
    expect(checkbox).toBeChecked();
    // чекбокс  выбран (используем либо его)
  });
  it("input focus", () => {
    const { getByTestId } = render(<input type="checkbox" data-testid="test-input" />);
    const input = screen.getByTestId("test-input");
    input.focus();
    // делаем фокус
    expect(input).toHaveFocus();
  });
});

// 32 минута
