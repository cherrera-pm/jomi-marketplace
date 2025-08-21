import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-dvh grid place-items-center bg-gradient-to-b from-slate-50 to-white px-4">
      <section className="w-full max-w-md text-center">
        <div className="rounded-2xl border bg-white shadow-sm px-5 py-8">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-slate-100">
            <Ghost className="h-8 w-8 text-slate-600" />
          </div>
          <h1 className="text-xl font-semibold">Página no encontrada</h1>
          <p className="mt-2 text-sm text-slate-600">
            La ruta que estás buscando no existe o cambió de lugar.
          </p>
        </div>

        <div className="mt-6 text-[64px] leading-none font-extrabold tracking-tight text-slate-200 select-none">
          404
        </div>
      </section>
    </main>
  );
}
