import { getProviders } from "next-auth/react";

export default function OAuth() {}

export async function getServerSideProps(action) {
  return {
    props: {
      providers: await getProviders(), // OAuth next-auth providers
    },
  };
}
