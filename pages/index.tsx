// Fallback Image component used when 'next/image' or its types are unavailable.
import { useMemo, useState } from "react";
import Pill from "@/components/common/Pill";
import {
  FILTER_OPTIONS,
  HERO_BACKGROUND,
  PROPERTYLISTINGSAMPLE,
} from "@/constants";
import type { PropertyProps } from "@/interfaces";

const Image = (props: any) => {
  const { src, alt, fill, className, style, ...rest } = props;
  const imgStyle = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }
    : style;
  return <img src={String(src)} alt={alt} className={className} style={imgStyle as React.CSSProperties} {...rest} />;
};

const filterMatchers: Record<
  string,
  (property: PropertyProps) => boolean
> = {
  "Top Villa": (property) => property.rating >= 4.9,
  "Self Checkin": (property) => property.category.includes("Self Checkin"),
  "Pet Friendly": (property) => property.category.includes("Pet Friendly"),
  "Mountain View": (property) => property.category.includes("Mountain View"),
  Beachfront: (property) => property.category.includes("Beachfront"),
  "Free Parking": (property) => property.category.includes("Free Parking"),
  "Private Pool": (property) => property.category.includes("Private Pool"),
  Luxury: (property) => property.price >= 4500,
  "Budget Friendly": (property) => property.price <= 2000,
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredProperties = useMemo(() => {
    if (!activeFilter) {
      return PROPERTYLISTINGSAMPLE;
    }

    const matcher = filterMatchers[activeFilter];

    if (!matcher) {
      return PROPERTYLISTINGSAMPLE;
    }

    return PROPERTYLISTINGSAMPLE.filter((property) => matcher(property));
  }, [activeFilter]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 md:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white">
        <Image
          src={HERO_BACKGROUND}
          alt="Ocean view resort background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex flex-col gap-6 bg-slate-900/60 p-10 backdrop-blur-sm md:max-w-xl md:p-16">
          <span className="text-xs uppercase tracking-[0.35em] text-sky-200">
            Explore the world
          </span>
          <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
            Find your favorite place here!
          </h1>
          <p className="text-sm text-slate-200 md:text-base">
            The best prices for over 2 million properties worldwide.
          </p>
          <div className="grid gap-4 text-xs text-slate-100 md:grid-cols-3 md:text-sm">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold">Trusted Partners</p>
              <p className="mt-2 text-slate-200">
                Work with more than 1,000 verified hosts across the globe.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold">Flexible Offers</p>
              <p className="mt-2 text-slate-200">
                Choose from flexible stays, exclusive deals, and seasonal
                savings.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold">Premium Support</p>
              <p className="mt-2 text-slate-200">
                Get 24/7 travel assistance from our dedicated concierge team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap gap-3">
        {FILTER_OPTIONS.map((filterLabel) => (
          <Pill
            key={filterLabel}
            label={filterLabel}
            active={activeFilter === filterLabel}
            onClick={() =>
              setActiveFilter((current) =>
                current === filterLabel ? null : filterLabel,
              )
            }
          />
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-800">
            Featured Listings
          </h2>
          {activeFilter ? (
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              className="text-sm font-medium text-sky-600 underline-offset-4 hover:underline"
            >
              Clear filter
            </button>
          ) : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <article
              key={property.name}
              className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-56">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {property.discount ? (
                  <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                    Save {property.discount}%
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col gap-4 px-6 py-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {property.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {property.address.city}, {property.address.state},{" "}
                      {property.address.country}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    <span>★</span>
                    <span>{property.rating.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                  {property.category.map((label) => (
                    <span
                      key={label}
                      className="rounded-full bg-slate-100 px-3 py-1 text-slate-600"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-900">
                    {currencyFormatter.format(property.price)}
                  </span>
                  <div className="text-xs text-slate-500">
                    <p>{property.offers.bed} Beds · {property.offers.shower} Baths</p>
                    <p>Occupants: {property.offers.occupants}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!filteredProperties.length ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500">
            No properties match this filter right now. Try another filter or
            clear the current selection.
          </div>
        ) : null}
      </section>
    </div>
  );
}


