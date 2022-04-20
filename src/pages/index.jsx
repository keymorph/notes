import {useRouter} from "next/router";

// Starting point for the application
export default function Index() {
  // Redirect user to /dashboard
  const router = useRouter();
  router.replace("/dashboard");
}
