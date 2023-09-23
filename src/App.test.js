import { render, screen } from "@testing-library/react";
import App from "./App";

// очень часто наша задачей будет найти поле ввода и проверить результат

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Search:/i);
  expect(linkElement).toBeInTheDocument();
});
// test("renders learn react link 2", () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/Search:/i);
//   expect(linkElement).toBeInTheDocument();
// });
test("screen", () => {
  render(<App />);
  screen.debug();
  // рендер всей разметки в консоли
});

test("screen 2", () => {
  const { asFragment } = render(<App />);
  expect(asFragment(<App />)).toMatchSnapshot();
  // снимок
});

describe("App element sect basics", () => {
  it("render App component ", () => {
    render(<App />);
    // рендер компонента
    screen.debug();
    // рендер всей разметки в консоли

    expect(screen.getByText(/search:/i)).toBeInTheDocument();
    // проверяем наличие текста серч (через регулярку не такое точное сравнение, /i - не чувствительность к регистру)

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    // выбор элемента по лейблу

    expect(screen.getByLabelText(/search:/i)).toBeInTheDocument();
    // выбор элемента по его тексту в лейбле

    expect(screen.getByPlaceholderText("search text...")).toBeInTheDocument();
    // выбор элемента по тексту плейсхолдера

    expect(screen.getByAltText("search image")).toBeInTheDocument();
    // выбор элемента по альтернативному тексту

    expect(screen.getByDisplayValue("")).toBeInTheDocument();
    // поиск элемента по отображаемому значению
  });
});

describe("App element sect basics part 2", () => {
  it("queryByText", () => {
    render(<App />);
    // рендер компонента
    screen.debug();
    // рендер всей разметки в консоли

    expect(screen.queryByText(/Searches for React/i)).toBeNull();
    // проверяем элемент которого еще нет в разметке ("Searches for" есть, а вот "React" мы добавим из инпута)
    // и говорим что изначально в документе ее нету
  });
});

describe("Async handle element", () => {
  // изначально элемента нету но после выполнения асинхроного кода он появиться
  it("queryByText", async () => {
    render(<App />);
    // рендер компонента
    screen.debug();
    // рендер всей разметки в консоли
    expect(screen.queryByText(/Logged in as/i)).toBeNull();
    // ищу строку в документа и говорю что ее нету
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();
    // далее когда выполниться асинхроный код появиться эта строка

    expect(screen.getByAltText(/search image/i)).toHaveClass("image");
    // находим по альтернативному тексту + проверяем класс
    expect(screen.getByPlaceholderText(/search text.../i)).toBeRequired();
    //  проверяем на .toBeRequired(); если нужно чтобы отрицательное .not.toBeRequired();
    expect(screen.getByPlaceholderText(/search text.../i)).toBeEmpty();
    // проверяем что инпут пустой
    expect(screen.getByPlaceholderText(/search text.../i)).toHaveAttribute("id");
    // проверяем айди
    screen.debug();
  });
});

// нужно найти элемент ===getBy
// нужно показать что элемента нет в доме ===queryBy
// нужно показать что элемента изначально нет но потом он появиться ===findBy
// для нескольких элементов ===AllBy

// 28
