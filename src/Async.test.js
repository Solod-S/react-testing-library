import React from "react";
import axios from "axios";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Async from "./Async";

// 1) мокаем функции которые делают запрос
// 2) конструируем ответ от сервиса
// 3) проверяем состояние нашего компонента

jest.mock("axios");
const hits = [
  { objectID: "1", title: "Angular" },
  { objectID: "2", title: "React" },
];
// конструируем ответ от сервиса

describe("Async test", () => {
  it("fetches news from an API", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }));
    // делаем емуляцию удачного запроса
    const { getByRole, findAllByRole } = render(<Async />);
    //  рендерим преложение компонент
    userEvent.click(getByRole("button"));
    // емулируем нажатие на кнопку
    const items = await findAllByRole("listitem");
    // ищем в разметки листа
    expect(items).toHaveLength(2);
    // проверяем что в нашем списке содержиться два элемента
    expect(axios.get).toHaveBeenCalledTimes(1);
    // сколько раз был вызван метод
    expect(axios.get).toHaveBeenCalledWith("http://hn.algolia.com/api/v1/search?query=React");
    // с каким параметром был сделан запрос
  });

  it("fetches news from an API and reject", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    // делаем емуляцию неудачного запроса
    const { getByRole, findByText } = render(<Async />);
    //  рендерим преложение компонент
    userEvent.click(getByRole("button"));
    // емулируем нажатие на кнопку
    const message = await findByText(/Something went wrong/);
    // ищем в разметке ошибку
    expect(message).toBeInTheDocument();
  });

  it("fetches news from an API (alternative)", async () => {
    const promise = Promise.resolve({ data: { hits } });
    // записуем результат работы в константу
    axios.get.mockImplementationOnce(() => promise);
    // после определение логики гет мы возвращем выше указанный промис
    const { getByRole, getAllByRole } = render(<Async />);
    //  рендерим преложение компонент
    userEvent.click(getByRole("button"));
    // емулируем нажатие на кнопку
    await act(() => promise);
    // выполняел гет логику и получаем ответ
    expect(getAllByRole("listitem")).toHaveLength(2);
    // проверяем результат
  });
});
