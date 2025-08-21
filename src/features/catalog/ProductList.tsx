import ProductCard from "@/components/ProductCard";
import PromoCarousel from "@/components/PromoCarousel";
import { Search } from "lucide-react";
import Footer from "@/components/Footer";

const mock = [
  {
    id: "1",
    slug: "producto-1",
    name: "Auriculares inalámbricos",
    image: "https://picsum.photos/seed/p1/800",
    price: 24.99,
  },
  {
    id: "2",
    slug: "producto-2",
    name: "Cargador USB-C 30W",
    image: "https://picsum.photos/seed/p2/800",
    price: 18.5,
  },
  {
    id: "3",
    slug: "producto-3",
    name: "Funda de silicón",
    image: "https://picsum.photos/seed/p3/800",
    price: 9.99,
  },
  {
    id: "4",
    slug: "producto-4",
    name: "Cable trenzado 1.5m",
    image: "https://picsum.photos/seed/p4/800",
    price: 7.49,
  },
];

const promos = [
  {
    id: "b1",
    img: "/promos/1.jpeg",
    alt: "Hasta 30% en audio",
    href: "/product/producto-1",
  },
  {
    id: "b2",
    img: "/promos/2.jpeg",
    alt: "Accesorios en promo",
    href: "/product/producto-2",
  },
];

export default function ProductList() {
  return (
    <div className="min-h-dvh bg-slate-50">
      <main className="mx-auto max-w-md p-3 pb-24">
        {/* Carousel de promos */}
        <PromoCarousel slides={promos} className="mb-3" />

        {/* Search / filtros (placeholder) */}
        <div className="mb-3 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            placeholder="Buscar productos…"
            className="w-full h-10 rounded-xl border pl-9 pr-3 text-sm bg-white"
          />
        </div>

        {/* Grilla */}
        <section className="grid grid-cols-2 gap-3">
          {mock.map((p) => (
            <ProductCard
              key={p.id}
              {...p}
              badge={p.id === "1" ? "Nuevo" : undefined}
              rating={4.5}
              onQuickAdd={(id) => console.log("add", id)}
              onToggleFavorite={(id, next) => console.log("fav", id, next)}
            />
          ))}
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
