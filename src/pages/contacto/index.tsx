import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";
import Contact, { ContactThemeEnum } from "@/components/Contact/Contact";

export default function Contacto() {
  return (
    <Page padding={PagePaddingSize.MEDIUM}>
      <Contact theme={ContactThemeEnum.LIGHT} />
    </Page>
  );
}
