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
    <div className={styles.page}>
      <div className="container mx-auto">
        <div className={`${styles.contact} max-w-xl mx-auto`}>
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

            <form onSubmit={onSubmit}>
              <div className={styles.form}>
                <label>
                  <FormattedMessage id="inputEmail" />
                </label>
                <input
                  type="email"
                  name="email"
                  className="rounded-md"
                  required
                  value={formValues.email}
                  onChange={handleChange}
                />
                <label>
                  <FormattedMessage id="inputContrasena" />
                </label>
                <input
                  type="password"
                  name="password"
                  className="rounded-md"
                  required
                  value={formValues.password}
                  onChange={handleChange}
                />
                <button type="submit" className="rounded-md">
                  {loading ? (
                    <p>Entrando...</p>
                  ) : (
                    <FormattedMessage id="entrar" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
