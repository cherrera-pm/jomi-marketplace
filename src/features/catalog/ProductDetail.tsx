import { useParams, Link } from "react-router-dom";
import BackHeader from "@/components/BackHeader";
import { Star, Truck, ShieldCheck } from "lucide-react";
import { money } from "@/lib/currency";
import { useCart } from "@/features/cart/CartStore";

const mock = [
  {
    id: "1",
    slug: "producto-1",
    name: "Auriculares inalámbricos",
    image: "https://picsum.photos/seed/p1/1000",
    price: 24.99,
    rating: 4.6,
    tags: ["Bluetooth 5.3", "USB-C", "12h"],
  },
  {
    id: "2",
    slug: "producto-2",
    name: "Cargador USB-C 30W",
    image: "https://picsum.photos/seed/p2/1000",
    price: 18.5,
    rating: 4.4,
    tags: ["30W", "PD", "Compacto"],
  },
  {
    id: "3",
    slug: "producto-3",
    name: "Funda de silicón",
    image: "https://picsum.photos/seed/p3/1000",
    price: 9.99,
    rating: 4.2,
    tags: ["Antigolpes", "Grip", "Ligera"],
  },
];

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = mock.find((p) => p.slug === slug);
  const add = useCart((s) => s.add);

  if (!product) {
    return (
      <main className="mx-auto max-w-md p-4">
        <p className="mb-3">Producto no encontrado.</p>
        <Link to="/" className="text-blue-600 underline">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white">
      <BackHeader title="Detalle" />
      <main className="mx-auto max-w-md pb-28">
        {/* Galería */}
        <section className="px-3 pt-3">
          <div className="relative rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-100 bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover aspect-square"
              loading="lazy"
            />
            <div className="absolute bottom-3 left-3 bg-black/80 text-white text-xs px-2 py-1 rounded-full">
              {money(product.price)}
            </div>
          </div>
        </section>

        {/* Título + rating */}
        <section className="px-4 pt-4 space-y-2">
          <h1 className="text-lg font-semibold leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 text-amber-500 text-sm">
            <span className="inline-flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-500" />
              {product.rating?.toFixed(1)}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">+100 reseñas</span>
          </div>

          {/* Chips de features */}
          {product.tags?.length ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </section>

        {/* Info secundaria */}
        <section className="px-4 pt-3 space-y-3">
          <p className="text-sm text-slate-600">
            SKU:{" "}
            <span className="text-slate-900 font-medium">{product.id}</span>
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border bg-white p-3 flex items-start gap-2">
              <Truck className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Envío rápido</div>
                <div className="text-xs text-slate-500">Entrega 24-48h</div>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-3 flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Garantía</div>
                <div className="text-xs text-slate-500">12 meses</div>
              </div>
            </div>
          </div>

          {/* Descripción / detalles (placeholder) */}
          <div className="rounded-xl border bg-white p-3">
            <div className="text-sm font-medium mb-1">Descripción</div>
            <p className="text-sm text-slate-600">
              Producto de gran calidad con excelente relación precio/beneficio.
              Ideal para uso diario.
            </p>
          </div>
        </section>

        {/* CTA fija */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t p-3">
          <div className="mx-auto max-w-md flex items-center gap-3">
            <div className="flex-1">
              <div className="text-xs text-slate-500">Total</div>
              <div className="text-base font-semibold">
                {money(product.price)}
              </div>
            </div>
            <button
              className="flex-1 rounded-xl py-3 font-medium bg-[#393939] text-white hover:bg-black/90 active:scale-[0.99] transition"
              onClick={() =>
                add(
                  {
                    id: product.slug, // id del item en el carrito
                    name: product.name,
                    image: product.image,
                    price: product.price,
                  },
                  1
                )
              }
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
