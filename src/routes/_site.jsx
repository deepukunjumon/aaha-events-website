import { createFileRoute, Outlet } from "@tanstack/react-router";
import SiteChrome from "@/components/site/SiteChrome";
import { loadSiteContent } from "@/lib/server-fns";

export const Route = createFileRoute("/_site")({
  loader: () => loadSiteContent(),
  component: SiteLayout,
});

function SiteLayout() {
  const { settings, services } = Route.useLoaderData();
  return (
    <SiteChrome settings={settings} services={services}>
      <Outlet />
    </SiteChrome>
  );
}