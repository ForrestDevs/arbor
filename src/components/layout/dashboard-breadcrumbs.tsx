"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { usePathname } from "next/navigation";

export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const pathAfterDashboard = segments.slice(segments.indexOf("dashboard") + 1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathAfterDashboard.map((segment, index) => (
          <Fragment key={segment}>
            <BreadcrumbItem key={segment} className="hidden md:block">
              {index === pathAfterDashboard.length - 1 ? (
                <BreadcrumbPage>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={`/dashboard/${pathAfterDashboard
                    .slice(0, index + 1)
                    .join("/")}`}
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < pathAfterDashboard.length - 1 && (
              <BreadcrumbSeparator
                key={`sep-${segment}`}
                className="hidden md:block"
              />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
