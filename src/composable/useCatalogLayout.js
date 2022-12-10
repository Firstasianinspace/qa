import { useLayoutFactory } from "@/helpers";

export const LAYOUTS = {
  grid: Symbol("grid"),
  list: Symbol("list"),
};

const { useLayout: useCatalogLayout } = useLayoutFactory(LAYOUTS, LAYOUTS.grid);

export { useCatalogLayout };
