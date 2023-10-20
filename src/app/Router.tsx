import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Home, GifPage, NotFound} from '../pages';

const routes = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: '/gif/:id', element: <GifPage />},
  {path: '/likes', element: <Home />},
  {path: '*', element: <NotFound />},
]);

export function Router() {
  return <RouterProvider router={routes} />;
}
