import React, { useState, useContext, createContext } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const AuthContext = createContext();
// создаем контекст

const AuthProvider = ({ children }) => {
  const [isLoggedIn, toggleLoginStatus] = useState(false);

  const toggleLogin = () => {
    toggleLoginStatus(!isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ toggleLogin, isLoggedIn }}>
      {/* используе для передачи дочерним элементам пропсов */}
      <div>Message: {children}</div>
    </AuthContext.Provider>
  );
};

const ConsumerComponent = () => {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);

  return (
    <>
      <input type="button" value="Login" onClick={toggleLogin} />
      {isLoggedIn ? "Welcome!" : "Please, log in"}
    </>
  );
};

describe("Context", () => {
  it("ConsumerComponent shows default value", () => {
    const { getByText } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
    // убедились что элемент в доме есть
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
    // отрисовка текста по умолчанию прошла успешна
  });

  it("ConsumerComponent toggle value", async () => {
    const { getByText, getByRole } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
    // убедились что элемент в доме есть
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
    // отрисовка текста по умолчанию прошла успешна
    await userEvent.click(getByRole("button"));
    // емулируем нажатие кнопки
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Welcome!");
    // отрисовка текста для залогиненого пользователя прошла успешна
    await userEvent.click(getByRole("button"));
    // // емулируем нажатие кнопки
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
    // // отрисовка текста для логаута пользователя прошла успешна
  });
});
