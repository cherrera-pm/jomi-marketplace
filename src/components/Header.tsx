import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useCart } from "@/features/cart/CartStore";
import { useStoreSlug } from "@/lib/useStoreSlug";

export default function Header() {
  const storeSlug = useStoreSlug();
  const totalQty = useCart((s) => s.lines.reduce((acc, l) => acc + l.qty, 0));

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="h-14 px-3 sm:px-4 lg:px-6 flex items-center justify-between">
        {/* Logo (lado izquierdo) */}
        <Link
          to={`/${storeSlug}`}
          className="inline-flex items-center gap-2 min-h-[44px]"
        >
          <img
            src={logo}
            alt="Jomi Marketplace"
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        {/* Carrito (lado derecho) */}
        <Link
          to={`/${storeSlug}/cart`}
          className="relative grid place-items-center rounded-full hover:bg-slate-100 active:scale-95 transition"
          aria-label="Abrir carrito"
          style={{ width: 44, height: 44 }} // target táctil cómodo
        >
          <ShoppingCart className="w-6 h-6 text-slate-700" />
          {totalQty > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-4 min-w-[18px] h-[18px] rounded-full grid place-items-center px-1">
              {totalQty}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
