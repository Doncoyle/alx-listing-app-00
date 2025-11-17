import type { ButtonHTMLAttributes } from "react";

export interface PillProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label: string;
  active?: boolean;
}

const Pill: React.FC<PillProps> = ({
  label,
  active = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "rounded-full border px-4 py-2 text-sm font-medium transition";
  const activeClasses =
    "border-sky-600 bg-sky-600 text-white shadow-sm hover:border-sky-500 hover:bg-sky-500";
  const inactiveClasses =
    "border-slate-200 bg-white text-slate-600 hover:border-sky-500 hover:text-sky-600";

  return (
    <button
      type="button"
      className={`${baseClasses} ${
        active ? activeClasses : inactiveClasses
      } ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Pill;

