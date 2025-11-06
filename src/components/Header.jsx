import { Globe, Map } from "lucide-react";

export default function Header({ lang, t, onToggleLang }) {
  return (
    <header className="w-full sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-emerald-100 text-emerald-700">
            <Map size={20} />
          </div>
          <div className="leading-tight">
            <h1 className="font-semibold text-gray-900">
              {t("title")}
            </h1>
            <p className="text-sm text-gray-500">{t("subtitle")}</p>
          </div>
        </div>

        <button
          onClick={onToggleLang}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm"
          aria-label={t("toggleLang")}
        >
          <Globe size={18} />
          <span className="font-medium">
            {lang === "en" ? "العربية" : "English"}
          </span>
        </button>
      </div>
    </header>
  );
}
