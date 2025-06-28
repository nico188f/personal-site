import { useTheme } from "~/hooks/useTheme";

export default function HeaderManager() {
   const theme = useTheme();

   if (theme === null) return <></>;

   return theme === "light" ? <LightThemeHeader /> : <DarkThemeHeader />;
}

function DarkThemeHeader() {
   return (
      <>
         <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="themes/dark/apple-touch-icon-dark.png"
         />
         <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="themes/dark/favicon-32x32-dark.png"
         />
         <link
            rel="icon"
            type="image/png"
            sizes="64x64"
            href="themes/dark/favicon-16x16-dark.png"
         />
         <link rel="icon" href="themes/dark/favicon-dark.ico" />
      </>
   );
}

function LightThemeHeader() {
   return (
      <>
         <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="themes/light/apple-touch-icon-light.png"
         />
         <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="themes/light/favicon-32x32-light.png"
         />
         <link
            rel="icon"
            type="image/png"
            sizes="64x64"
            href="themes/light/favicon-16x16-light.png"
         />
         <link rel="icon" href="themes/light/favicon-light.ico" />
      </>
   );
}
