import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";
import Account from "@/components/Account/Account";

export default function Entrar() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) signIn();
  }, [session]);

  return (
    <Page padding={PagePaddingSize.MEDIUM}>
      <Account />
    </Page>
  );
}
