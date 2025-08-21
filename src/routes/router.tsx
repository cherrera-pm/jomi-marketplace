import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/app/RootLayout";
import ProductList from "@/features/catalog/ProductList";
import ProductDetail from "@/features/catalog/ProductDetail";
import CartPage from "@/features/cart/CartPage";
import NotFound from "@/features/misc/NotFound";

export const router = createBrowserRouter([
  {
    path: "/:storeSlug",
    element: <RootLayout />,
    children: [
      { index: true, element: <ProductList /> }, // "/:storeSlug"
      { path: "product/:slug", element: <ProductDetail /> },
      { path: "cart", element: <CartPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
