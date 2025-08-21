import { Link } from "react-router-dom";
import { useStoreSlug } from "@/lib/useStoreSlug";
import { Mail, Phone, InstagramIcon } from "lucide-react";

export default function Footer() {
  const storeSlug = useStoreSlug();

  return (
    <footer className="mt-10 w-full border-t bg-white/80 backdrop-blur">
      <div className="mx-auto w-full max-w-md px-3 py-6">
        {/* Bloque superior */}
        <div className="flex items-start justify-between gap-4">
          {/* Contacto (izquierda) */}
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-slate-900">Contacto</h2>
            <div className="mt-2 grid gap-2 text-sm">
              <a
                href="mailto:soporte@jomi.app"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <Mail className="w-4 h-4" />
                <span className="truncate">soporte@jomi.app</span>
              </a>
              <a
                href="tel:+5070000000"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <Phone className="w-4 h-4" />
                <span>+507 000 0000</span>
              </a>
            </div>
          </div>

          {/* Social (derecha) */}
          <div className="shrink-0">
            <div className="text-sm font-semibold text-slate-900 text-right">
              Síguenos
            </div>
            <div className="mt-2 flex items-center justify-end">
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100 active:scale-95 transition"
              >
                <InstagramIcon className="w-5 h-5 text-slate-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="my-6 h-px bg-slate-200" />

        {/* Legal / copy */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Jomi Marketplace</div>
          <div className="flex items-center gap-3">
            <Link to={`/${storeSlug}`} className="hover:text-slate-700">
              Términos
            </Link>
            <span className="text-slate-300">•</span>
            <Link to={`/${storeSlug}`} className="hover:text-slate-700">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
