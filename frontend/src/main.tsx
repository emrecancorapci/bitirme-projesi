import './global.css';

import { StrictMode as ReactStrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router.tsx';

createRoot(document.querySelector('#root')!).render(
  <ReactStrictMode>
    <RouterProvider router={router} />
  </ReactStrictMode>,
);
