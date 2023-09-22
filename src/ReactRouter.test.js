import React from "react";
import { withRouter } from "react-router";
import { Link, Route, BrowserRouter, Routes, useParams, useHistory, useLocation, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";

const Home = () => <h1>Home page!!!</h1>;
const About = () => <h1>About page!!!</h1>;
const Error = () => <h1>404 Error!!!</h1>;

// пейджи

const Contact = () => {
  const { name } = useParams();
  return <h1 data-testid="contact-name">{name}</h1>;
};
// хук который возвращает параметр name

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

const NAME = "John Doe";

const RouterComponent = () => (
  <>
    <nav data-testid="navbar">
      <Link data-testid="home-link" to="/">
        Home
      </Link>
      <Link data-testid="about-link" to="/about">
        About
      </Link>
      <Link data-testid="contact-link" to={`/contact/${NAME}`}>
        Contact
      </Link>
    </nav>

    <Routes>
      <Route index exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact/:name" element={<Contact />} />
      <Route path="*" element={<Error />} />
    </Routes>

    <LocationDisplay />
    {/* при каждом рендере будет показывать где мы находимся */}
  </>
);

const renderWithRouter = (
  component,
  { route = "/", history = createMemoryHistory({ initialEntries: [route] }) } = {}
) => {
  const Wrapper = ({ children }) => <MemoryRouter history={history}>{children}</MemoryRouter>;
  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  };
};

describe("React Router", () => {
  it("should render the home page", () => {
    // const history = createMemoryHistory();
    // делаем обьект историии
    // const { container, getByTestId } = render(
    //   <MemoryRouter history={history}>
    //     <RouterComponent />
    //   </MemoryRouter>
    // );
    const { container, getByTestId } = renderWithRouter(<RouterComponent />);
    //  тоже что и выше но через функцию
    const navbar = getByTestId("navbar");
    // находим навигацию
    const link = getByTestId("home-link");
    // находим ссылку
    expect(container.innerHTML).toMatch("Home page");
    // проверка того что в дефолтном состоянии у нас рендериться хоум пейдж
    expect(navbar).toContainElement(link);
    // проверка того что в навигации есть ссылку
  });

  it("should navigate to page", () => {
    const history = createMemoryHistory();
    // делаем обьект историии

    // const { container, getByTestId } = render(
    //   <MemoryRouter history={history}>
    //     <RouterComponent />
    //   </MemoryRouter>
    // );

    const { container, getByTestId } = renderWithRouter(<RouterComponent />);
    //  тоже что и выше но через функцию

    const navbar = getByTestId("navbar");
    // находим навигацию
    const link = getByTestId("contact-link");
    // находим ссылку

    fireEvent.click(link);
    expect(container.innerHTML).toMatch("John Doe");
    // проверка по тексту того что у нас рендериться контакт пейдж
    expect(navbar).toContainElement(link);
    // проверка того что в навигации есть ссылку
  });

  it("should navigate to error page if route is wrong", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/wrong-route"]}>
        <RouterComponent />
      </MemoryRouter>
    );
    // переходим на левый маршрут

    // const { container } = renderWithRouter(<RouterComponent />, {
    //   route: "/wrong-route",
    // });
    expect(container.innerHTML).toMatch("404 Error");
  });

  // it("rendering a component that uses withRouter", () => {
  //   const history = createMemoryHistory();
  //   const route = "/some-route";
  //   history.push(route);
  //   const { getByTestId } = render(
  //     <MemoryRouter history={history}>
  //       <LocationDisplay />
  //     </MemoryRouter>
  //   );
  //   // const route = "/some-route";
  //   // const { getByTestId } = renderWithRouter(<LocationDisplay />, { route });
  //   expect(getByTestId("location-display")).toHaveTextContent(route);
  // });
});
