import { useParams } from "react-router-dom";

/** Versión estricta: lanza si no hay :storeSlug */
export function useStoreSlug() {
  const { storeSlug } = useParams<{ storeSlug: string }>();
  if (!storeSlug) throw new Error("storeSlug ausente en la URL");
  return storeSlug;
}

/** Versión segura: devuelve null si no hay :storeSlug (no lanza) */
export function useMaybeStoreSlug() {
  const { storeSlug } = useParams<{ storeSlug?: string }>();
  return storeSlug ?? null;
}
