import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { money } from "@/lib/currency";
import { useCart } from "@/features/cart/CartStore";
import clsx from "clsx";
import { useStoreSlug } from "@/lib/useStoreSlug";

export type ProductCardProps = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  priceOld?: number;
  rating?: number; // 0..5
  badge?: string; // p.ej. "Nuevo", "-20%"
  currency?: string; // 'USD' por defecto
  compact?: boolean; // tarjeta más pequeña
  className?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string, next: boolean) => void;
  onQuickAdd?: (id: string) => void; // callback opcional después de agregar
};

export default function ProductCard({
  id,
  slug,
  name,
  image,
  price,
  priceOld,
  rating,
  badge,
  currency = "USD",
  compact,
  className,
  isFavorite,
  onToggleFavorite,
  onQuickAdd,
}: ProductCardProps) {
  const storeSlug = useStoreSlug();

  const add = useCart((s) => s.add);
  // Usa slug como identificador estable del carrito (o id si prefieres)
  const cartId = slug || id;

  const handleQuickAdd = () => {
    add(
      {
        id: cartId,
        name,
        image,
        price,
      },
      1
    );
    onQuickAdd?.(id);
  };

  const handleToggleFav: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // Evita que el click en el corazón dispare la navegación del <Link>
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(id, !isFavorite);
  };

  return (
    <div
      className={clsx(
        "group rounded-2xl bg-white shadow-sm overflow-hidden ring-1 ring-slate-100",
        "transition hover:shadow-md hover:-translate-y-0.5",
        className
      )}
    >
      <div className="relative">
        <Link to={`/${storeSlug}/product/${slug}`} className="block">
          <div
            className={clsx(
              "w-full overflow-hidden",
              compact ? "aspect-[4/5]" : "aspect-square"
            )}
          >
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Badge */}
        {badge && (
          <span className="absolute top-2 left-2 text-[11px] font-medium px-2 py-1 rounded-full bg-black/80 text-white">
            {badge}
          </span>
        )}

        {/* Favoritos */}
        {onToggleFavorite && (
          <button
            type="button"
            aria-label={
              isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
            }
            onClick={handleToggleFav}
            className={clsx(
              "absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur",
              "shadow-sm border border-slate-200 hover:bg-white"
            )}
          >
            <Heart
              className={clsx(
                "w-4 h-4",
                isFavorite ? "fill-red-500 text-red-500" : "text-slate-700"
              )}
            />
          </button>
        )}
      </div>

      <div className={clsx("p-3", compact && "p-2")}>
        <Link to={`/product/${slug}`} className="block">
          <h3 className={clsx("line-clamp-2", compact ? "text-xs" : "text-sm")}>
            {name}
          </h3>

          {/* Rating simple (★) */}
          {typeof rating === "number" && (
            <div className="mt-1 text-[11px] text-amber-500">
              {"★".repeat(Math.round(rating))}{" "}
              <span className="text-slate-400">
                {"★".repeat(5 - Math.round(rating))}
              </span>
            </div>
          )}

          {/* Precios */}
          <div className="mt-1 flex items-baseline gap-2">
            <div
              className={clsx(
                "font-semibold",
                compact ? "text-sm" : "text-base"
              )}
            >
              {money(price, currency)}
            </div>
            {priceOld && priceOld > price && (
              <div className="text-xs line-through text-slate-400">
                {money(priceOld, currency)}
              </div>
            )}
          </div>
        </Link>

        {/* CTA rápido (+) */}
        <div className="mt-2">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full rounded-xl py-2 text-sm font-medium bg-[#393939] text-white hover:bg-black/90 active:scale-[0.99] transition"
          >
            <span className="inline-flex items-center gap-1 justify-center">
              <Plus className="w-4 h-4" /> Agregar
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
