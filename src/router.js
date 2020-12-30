import Cart from "./component/Cart";
import DetailProduct from "./component/Detail";
import ErrorPage from "./component/ErrorPage";
import HomePage from "./component/Home";
import ListProduct from "./component/ListProduct/index";
import Personal from "./component/Personal";

const route = [
  {
    path: "/",
    main: HomePage,
    exact: true,
  },
  {
    path: "/detail-product",
    main: DetailProduct,
    exact: false,
  },
  {
    path: "/list-product",
    main: ListProduct,
    exact: false,
  },
  {
    path: "/list-cart",
    main: Cart,
    exact: false,
  },
  {
    path: "/personal",
    main: Personal,
    exact: false,
  },
  {
    path: "/error",
    main: ErrorPage,
    exact: false,
  },
];
export default route;
