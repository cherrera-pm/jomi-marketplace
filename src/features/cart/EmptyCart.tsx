import { Link } from "react-router-dom";
import { useStoreSlug } from "@/lib/useStoreSlug";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function EmptyCart() {
  const storeSlug = useStoreSlug();

  return (
    // Ocupa alto útil y centra verticalmente, sin limitar ancho
    <main className="min-h-[70dvh] flex items-center px-3 py-6 bg-gradient-to-b from-slate-50 to-white">
      {/* Tarjeta fluida: ancho completo en móvil, con borde/sombra desde sm */}
      <section className="w-full rounded-2xl bg-white p-5 sm:p-6 sm:border sm:shadow-sm text-center">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-slate-100">
          <ShoppingBag className="h-8 w-8 text-slate-600" />
        </div>

        <h1 className="text-lg sm:text-xl font-semibold">
          Tu carrito está vacío
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Agrega productos para continuar con tu compra.
        </p>

        <div className="mt-6 grid gap-2">
          <Link
            to={`/${storeSlug}`}
            className="h-11 rounded-xl bg-[#393939] text-white font-medium grid place-items-center active:scale-[0.99] transition"
          >
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al catálogo
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
