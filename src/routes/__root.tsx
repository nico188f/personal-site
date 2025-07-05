import {
   HeadContent,
   Outlet,
   Scripts,
   createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { DefaultCatchBoundary } from "~/components/errors/DefaultCatchBoundary";
import { NotFound } from "~/components/errors/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";
import HeadThemeManager from "../components/head/HeadThemeManager";

export const Route = createRootRoute({
   head: () => ({
      meta: [
         {
            charSet: "utf-8",
         },
         {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
         },
         ...seo({
            title: "Nicolaj Blach Jensen | Software Engineer",
            description: `The Personal site of Nicolaj Blach Jensen. `,
         }),
      ],
      links: [
         { rel: "stylesheet", href: appCss },
         {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "themes/dark/apple-touch-icon-dark.png",
         },
         {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "themes/dark/favicon-32x32-dark.png",
         },
         {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "themes/dark/favicon-16x16-dark.png",
         },
         { rel: "manifest", href: "themes/dark/site.webmanifest" },
         { rel: "icon", href: "themes/dark/favicon-dark.ico" },
      ],
   }),
   errorComponent: (props) => {
      return (
         <RootDocument>
            <DefaultCatchBoundary {...props} />
         </RootDocument>
      );
   },
   notFoundComponent: () => <NotFound />,
   component: RootComponent,
});

function RootComponent() {
   return (
      <RootDocument>
         <Outlet />
      </RootDocument>
   );
}

function RootDocument({ children }: { children: React.ReactNode }) {
   return (
      <html>
         <head>
            <HeadContent />
            <HeadThemeManager />
         </head>
         <body>
            {children}
            <TanStackRouterDevtools position="bottom-right" />
            <Scripts />
         </body>
      </html>
   );
}
