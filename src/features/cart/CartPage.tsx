import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useCart } from "./CartStore";
import { money } from "@/lib/currency";
import BackHeader from "@/components/BackHeader";
import { useStoreSlug } from "@/lib/useStoreSlug";
import EmptyCart from "@/features/cart/EmptyCart";

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const storeSlug = useStoreSlug();

  const subtotal = useMemo(
    () => lines.reduce((acc, l) => acc + l.qty * l.price, 0),
    [lines]
  );

  if (!lines.length) {
    return (
      <div className="min-h-dvh bg-slate-50">
        <BackHeader title="Tu carrito" fallbackTo={`/${storeSlug}`} />
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <BackHeader title="Tu carrito" fallbackTo="/" />
      <main className="mx-auto max-w-md pb-28">
        <ul className="divide-y">
          {lines.map((l) => (
            <li key={l.id} className="p-4 flex gap-3 bg-white">
              {l.image && (
                <img
                  src={l.image}
                  alt={l.name}
                  className="w-20 h-20 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <div className="text-sm font-medium line-clamp-2">{l.name}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {money(l.price)}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => setQty(l.id, l.qty - 1)}
                    className="px-2 border rounded"
                    aria-label="Disminuir"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{l.qty}</span>
                  <button
                    onClick={() => setQty(l.id, l.qty + 1)}
                    className="px-2 border rounded"
                    aria-label="Aumentar"
                  >
                    +
                  </button>
                  <button
                    onClick={() => remove(l.id)}
                    className="ml-auto text-red-600 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t p-3">
          <div className="mx-auto max-w-md flex items-center gap-3">
            <div className="flex-1">
              <div className="text-xs text-slate-500">Subtotal</div>
              <div className="text-base font-semibold">{money(subtotal)}</div>
            </div>
            <Link
              to="/checkout"
              className="flex-1 text-center rounded-xl py-3 font-medium bg-black text-white hover:bg-black/90 active:scale-[0.99] transition"
            >
              Pagar
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
