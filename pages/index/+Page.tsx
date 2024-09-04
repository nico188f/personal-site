import React from "react";
import { Button } from "@/components/ui/button.jsx";

export default function Page() {
   const [count, setCount] = React.useState(0);
   return (
      <>
         <h1 className="pb-4 font-bold text-3xl">My Vike app</h1>
         This page is:
         <ul>
            <li>Rendered to HTML.</li>
            <li>
               Interactive.{" "}
               <Button onClick={() => setCount(c => c + 1)}>
                  Click me: {count}
               </Button>
            </li>
         </ul>
      </>
   );
}
