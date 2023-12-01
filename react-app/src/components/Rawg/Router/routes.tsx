import { createBrowserRouter } from "react-router-dom";
import App from "../../../App";
import Main from "../Main/Main";
import ErrorPage from "../ErrorPage/ErrorPage";
import GameDetail from "../GameDetail/GameDetail";

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { path: 'games/:slug', element: <GameDetail />}
    ],
  },
]);

export default routes;
