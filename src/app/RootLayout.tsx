import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Header from "@/components/Header";

/** Loader simple para pantallas que se cargan con lazy() */
function PageLoader() {
  return (
    <div className="grid place-items-center py-16 text-slate-500">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-transparent" />
      <span className="sr-only">Cargando…</span>
    </div>
  );
}

/** Restaura el scroll al cambiar de ruta (UX en móvil) */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function RootLayout() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white">
      {/* Header global (usa storeSlug internamente) */}
      <Header />

      {/* Contenedor central mobile-first */}
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
