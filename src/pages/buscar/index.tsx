import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";
import ProductSearch from "@/components/Products/ProductSearch/ProductSearch";

export default function Buscar() {
  return (
    <Page
      padding={PagePaddingSize.MEDIUM}
      className="container mx-auto text-center min-h-screen"
    >
      <ProductSearch />
    </Page>
  );
}
