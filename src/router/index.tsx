import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Lines3D from '../components/Lines3D';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Lines3D />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
