import { WikiStoreProvider } from "@/components/wiki/useWikiStore";
import { WikiApp } from "@/components/wiki/WikiApp";

export const metadata = {
  title: "Wiki · Knweave",
  description: "Wiki tim Knweave — pohon halaman, sunting markdown, dan cari cepat.",
};

export default function AppPage() {
  return (
    <WikiStoreProvider>
      <WikiApp />
    </WikiStoreProvider>
  );
}
