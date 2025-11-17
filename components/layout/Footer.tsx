const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-medium text-slate-700">© {year} StayScape.</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#" className="transition hover:text-sky-600">
            Privacy
          </a>
          <a href="#" className="transition hover:text-sky-600">
            Terms
          </a>
          <a href="#" className="transition hover:text-sky-600">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

