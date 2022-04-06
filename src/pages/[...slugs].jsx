/*
  Catch all possible routes and redirect the user to dashboard.
  Predefined routes take precedence so this won't override them.
*/
import { useRouter } from "next/router";

export default function AnySlug() {
  const router = useRouter();
  router.replace("/");
}
