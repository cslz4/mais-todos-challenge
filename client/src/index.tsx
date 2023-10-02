import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { HomePage } from './pages/HomePage';
import { RootLayout } from './layouts/RootLayout';
import { ProductPage } from './pages/ProductPage';
import { queryClient } from './config/query-client';
import { SuccessPage } from './pages/SuccessPage';
import { AddProductPage } from './pages/AddProductPage';

import './index.css';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product/:slug",
        element: <ProductPage />
      },
      {
        path: "/success",
        element: <SuccessPage />
      },
      {
        path: "/admin/add-product",
        element: <AddProductPage />
      },
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
