import { useEffect } from "react";

export default function usePersistence({
  loaded,
  products,
  setProducts,
  safeStorageGet,
  safeStorageSet,
  setLoaded,
  setSaveStatus
}) {

  useEffect(() => {
    (async () => {
      try {
        const saved = await safeStorageGet("products");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length) {
            setProducts(parsed);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    setSaveStatus("saving");

    const t = setTimeout(async () => {
      const ok = await safeStorageSet(
        "products",
        JSON.stringify(products)
      );

      setSaveStatus(ok ? "saved" : "error");
    }, 600);

    return () => clearTimeout(t);
  }, [products, loaded]);
}
