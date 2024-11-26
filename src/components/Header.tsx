import * as React from "react";

import { Link } from "react-router-dom";
import { ZoogleLogo } from "./ui/ZoogleLogo";
export default function Header() {
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="px-5 mx-auto font-times">
        <Link to="/" className="text-4xl font-bold text-blue-500">
          <ZoogleLogo />
        </Link>
      </div>
    </header>
  );
}
