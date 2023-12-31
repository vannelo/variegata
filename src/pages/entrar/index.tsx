import { ChangeEvent, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/navigation";
import Heading, {
  HeadingAlignEnum,
  HeadingTypeEnum,
} from "@/components/Heading/Heading";
import styles from "./Entrar.module.scss";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";
import SignInForm from "@/components/Forms/SignInForm/SignInForm";

export default function Entrar() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });
      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl: "/",
      });
      setLoading(false);
      if (!res?.error) {
        router.push("/");
      } else {
        console.log(res.error);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Page padding={PagePaddingSize.MEDIUM}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Heading
          type={HeadingTypeEnum.SECONDARY}
          align={HeadingAlignEnum.CENTER}
          heading={<FormattedMessage id="iniciaSesion" />}
          subheading={<FormattedMessage id="entrar" />}
        />
        <SignInForm />
      </motion.div>
    </Page>
  );
}
