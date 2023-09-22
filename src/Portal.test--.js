import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

// создание портала

const Modal = ({ onClose, children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);
    // при монтировании он рендерится внутри корневого єлемента
    return () => modalRoot.removeChild(el);
    // при размонтировании он удаляется
  });

  return createPortal(
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    el
  );
};
// компанент модального окна в портале

describe("Portal", () => {
  it("modal shows the children and a close button", () => {
    const handleClose = jest.fn();
    // мокаем функцию закрытия
    const { getByText } = render(
      <Modal onClose={handleClose}>
        <div>My portal</div>
      </Modal>
    );
    // рендерим модалку и передаем туда чилдренов + функцию

    expect(getByText("My portal")).toBeInTheDocument();
    // проверяем что оно отрисовалось
    userEvent.click(getByText(/close/i));
    // емулируем нажатия закрытия окна
    expect(handleClose).toHaveBeenCalledTimes(1);
    // проверям что функция была вызвана 1 раз
  });

  it("should be unmounted", () => {
    const { getByText, unmount, queryByText } = render(
      <Modal>
        <div>My portal</div>
      </Modal>
    );
    expect(getByText("My portal")).toBeInTheDocument();
    // проверяем что оно зарендерило компонент и детей
    unmount();
    // размантируем
    expect(queryByText("My portal")).not.toBeInTheDocument();
    // проверяем что нет в документе
  });
});
