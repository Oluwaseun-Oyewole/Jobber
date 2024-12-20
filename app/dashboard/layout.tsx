"use client";
import { getCountryName } from "@/app/store/thunk";
import DashboardNavigation from "@/components/custom/dashboardNav";
import { Sidebar } from "@/components/custom/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FormProvider } from "@/context";
import { useAppDispatch } from "@/lib/store/hook";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { outfit } from "../fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const getTitle = pathname.split("/");
  const [coordinates, setCoordinate] = useState({ lat: 0, lng: 0 });
  const dispatch = useAppDispatch();

  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    router.push("/auth/login");
  }

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const { lat, lng } = pos;
          setCoordinate({ lat, lng });
        },
      );
    }
  }, []);

  useEffect(() => {
    if (coordinates.lat <= 0 || coordinates.lng <= 0) return;
    else {
      dispatch(getCountryName({ lat: coordinates.lat, lng: coordinates.lng }));
    }
  }, [dispatch, coordinates.lat, coordinates.lng]);

  return (
    <>
      <main
        className={`w-full grid grid-flow-col grid-cols-[100%] lg:grid-cols-[25%_75%] xl:grid-cols-[18%_82%] ${outfit.className} bg-white`}
      >
        <div className="hidden lg:block bg-white">
          <Sidebar />
        </div>
        <div className="bg-gray-50 overflow-x-hidden">
          <div className="bg-white">
            <div className="w-[92%] mx-auto">
              <DashboardNavigation />
            </div>
          </div>
          <div className="w-[92%] mx-auto">
            <div className="py-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      <p className="text-primary-100">
                        {pathname
                          .split("/")
                          [getTitle.length - 1].substring(0, 1)
                          .toUpperCase() +
                          pathname.split("/")[getTitle.length - 1].substring(1)}
                      </p>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <FormProvider> {children}</FormProvider>
          </div>
        </div>
      </main>
    </>
  );
}
