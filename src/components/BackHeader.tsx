import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function BackHeader({
  title,
  fallbackTo = "/",
}: {
  title?: string;
  fallbackTo?: string;
}) {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate(fallbackTo);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="relative h-14 flex items-center px-3">
        {/* Botón Back */}
        <button
          onClick={goBack}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100/60 active:scale-95 transition"
          aria-label="Volver"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Atrás</span>
        </button>

        {/* Título centrado */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-slate-900">
          {title ?? "Volver al catálogo"}
        </h1>
      </div>
    </header>
  );
}
