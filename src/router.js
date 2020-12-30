import Cart from "./component/Cart";
import DetailProduct from "./component/Detail";
import ErrorPage from "./component/ErrorPage";
import HomePage from "./component/Home";
import ListProduct from "./component/ListProduct/index";
import Personal from "./component/Personal";
const homePage="/bs-cilent-p3";
const route = [
  {
    path: "/",
    main: HomePage,
    exact: true,
  },
  {
    path: `${homePage}`,
    main: HomePage,
    exact: true,
  },
  {
    path: `${homePage}/detail-product`,
    main: DetailProduct,
    exact: false,
  },
  {
    path: `${homePage}/list-product`,
    main: ListProduct,
    exact: false,
  },
  {
    path: `${homePage}/list-cart`,
    main: Cart,
    exact: false,
  },
  {
    path: `${homePage}/personal`,
    main: Personal,
    exact: false,
  },
  {
    path: `${homePage}/error`,
    main: ErrorPage,
    exact: false,
  },
];
export default route;
