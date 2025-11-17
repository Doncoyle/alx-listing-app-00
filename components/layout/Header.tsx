import React, { useState } from "react";
import { ACCOMMODATION_TYPES } from "@/constants";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-20 bg-white/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div>
        <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-semibold text-sky-700">
            <a href="/" className="text-2xl font-semibold text-sky-700">
              StayScape
            </a>
              Search properties
            </label>
            <input
              id="global-search"
              type="search"
              placeholder="Search for destinations, properties or offers"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-full border border-sky-600 px-5 py-2 text-sm font-medium text-sky-600 transition hover:bg-sky-50 md:inline-block">
              Sign in
            </button>
            <button className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
              Sign up
            </button>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {ACCOMMODATION_TYPES.map((label) => (
              <button
                key={label}
                className="rounded-full border border-transparent bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-sky-600 hover:bg-sky-50 hover:text-sky-700"
                type="button"
              >
                {label}
              </button>
            ))}
          </nav>
      </div>
    </header>
  );
};

export default Header;

