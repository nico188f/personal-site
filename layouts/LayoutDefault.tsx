import "./style.css";

import "./tailwind.css";
import React from "react";
import logoUrl from "../assets/logo.svg";
import { Link } from "../components/Link.js";

export default function LayoutDefault({
   children,
}: {
   children: React.ReactNode;
}) {
   return <div className="flex flex-col items-center mt-10">{children}</div>;
}
