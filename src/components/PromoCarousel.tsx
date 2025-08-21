import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type Slide = {
  id: string;
  img: string;
  alt?: string;
  href?: string;
};

type Props = {
  slides: Slide[];
  intervalMs?: number; // autoplay
  className?: string;
};

export default function PromoCarousel({
  slides,
  intervalMs = 4000,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clamp y cambio de slide
  const goTo = (i: number) => {
    const max = slides.length - 1;
    if (i < 0) return setIndex(max);
    if (i > max) return setIndex(0);
    return setIndex(i);
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay
  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current && window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(next, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, intervalMs, slides.length]);

  // Pausa autoplay al interactuar
  const pause = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Swipe táctil básico
  const onTouchStart: React.TouchEventHandler = (e) => {
    pause();
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd: React.TouchEventHandler = (e) => {
    const start = touchStartX.current;
    if (start == null) return;
    const delta = e.changedTouches[0].clientX - start;
    if (Math.abs(delta) > 40) (delta < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section
      className={clsx("relative select-none", className)}
      aria-roledescription="carousel"
      aria-label="Promociones"
    >
      {/* Viewport */}
      <div
        ref={containerRef}
        className="overflow-hidden rounded-xl bg-white"
        onMouseEnter={pause}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => {
            const Img = (
              <img
                src={s.img}
                alt={s.alt ?? `Slide ${i + 1}`}
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            );
            return (
              <div key={s.id} className="min-w-full aspect-[16/9] bg-slate-100">
                {s.href ? (
                  <a
                    href={s.href}
                    aria-label={s.alt ?? `Ir a promoción ${i + 1}`}
                  >
                    {Img}
                  </a>
                ) : (
                  Img
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Flechas */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => {
              pause();
              prev();
            }}
            className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur shadow border hover:bg-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => {
              pause();
              next();
            }}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur shadow border hover:bg-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute left-0 right-0 bottom-1 flex items-center justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                pause();
                goTo(i);
              }}
              aria-label={`Ir al slide ${i + 1}`}
              className={clsx(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-4 bg-black/80" : "w-2 bg-black/40"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
