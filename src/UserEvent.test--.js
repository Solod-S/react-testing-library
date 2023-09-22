import { render, screen, fireEvent, getByTestId, getAllByTestId } from "@testing-library/react";
import Event from "./Event";
import userEvent from "@testing-library/user-event";
describe("Async handle element", () => {
  // изначально элемента нету но после выполнения асинхроного кода он появиться
  it("Get input text", async () => {
    render(<Event />);
    // рендер компонента

    await screen.findByText(/Logged in as/i);
    // дожидаемся юзефекта и после рендеринга кто залогинен

    expect(screen.queryByText(/Searches for React/i)).toBeNull();
    // изначально строки такой нету

    userEvent.type(screen.getByRole("textbox"), "React");
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
    userEvent.click(checkbox);
    // userEvent.click(checkbox, { ctrlKey: true, shiftKey: true });
    // чекбокс  выбран

    expect(handleChange).toHaveBeenCalledTimes(1);
    // то что функция была вызвана 1 раз (используем его)
    expect(checkbox).toBeChecked();
    // чекбокс  выбран (используем либо его)
  });
  it("double click ", () => {
    const onChange = jest.fn();
    const { container } = render(<input type="checkbox" onChange={onChange} />);
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    // чекбокс не выбран
    userEvent.dblClick(checkbox);
    // чекбокс  выбран

    expect(onChange).toHaveBeenCalledTimes(2);
    // то что функция была вызвана 2 раза (используем его)

    // чекбокс  выбран (используем либо его)
  });
  it("focus by tab", () => {
    const { getAllByTestId } = render(
      <div>
        <input type="checkbox" data-testid="test-input" />
        <input type="radio" data-testid="test-input" />
        <input type="number" data-testid="test-input" />
      </div>
    );
    const [checkbox, radio, number] = screen.getAllByTestId("test-input");
    // получаем все элементы

    userEvent.tab();
    // емулируем нажатие на кнопку таб
    expect(checkbox).toHaveFocus();
    // проверяем фокус на первом элементе
    userEvent.tab();
    // емулируем нажатие на кнопку таб
    expect(radio).toHaveFocus();
    // проверяем фокус на втором элементе
    userEvent.tab();
    // емулируем нажатие на кнопку таб
    expect(number).toHaveFocus();
    // проверяем фокус на третем элементе
  });
  it("select option", () => {
    const { selectOptions, getByRole, getByText } = render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );
    userEvent.selectOptions(screen.getByRole("combobox"), "1");
    // выбираем селект по роли
    expect(screen.getByText("A").selected).toBeTruthy();

    userEvent.selectOptions(screen.getByRole("combobox"), "2");
    // выбираем селект по роли
    expect(screen.getByText("B").selected).toBeTruthy();
    // проверяем что все выбрано
    expect(screen.getByText("A").selected).toBeFalsy();
    // проверяем что прошлый чекбокс не активен
  });
});

// 32 минута
