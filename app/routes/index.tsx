import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";

export const Route = createFileRoute("/")({
   component: Home,
});

const updateCount = createServerFn({ method: "POST" })
   .validator((d: number) => d)
   .handler(async ({ data }) => {
      console.log(`current count is ${data}`);
   });

function Home() {
   const [count, setCount] = useState(0);

   return (
      <button
         type="button"
         onClick={() => {
            updateCount({ data: count + 1 });
            setCount(prevCount => prevCount + 1);
         }}
      >
         Add 1 to {count}?
      </button>
   );
}
