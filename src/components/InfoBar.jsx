import { Phone, AlertTriangle } from "lucide-react";

export default function InfoBar({ t, lang }) {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-50 to-sky-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm text-gray-700">
          <span className="font-medium">{t("emergency.title")}:</span>{" "}
          <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
            <Phone size={14} /> 000
          </span>{" "}
          <span className="text-gray-500">{t("emergency.subtitle")}</span>
        </div>
        <div className="text-xs text-gray-600 inline-flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-600" />
          {t("emergency.tip")}
        </div>
      </div>
    </div>
  );
}
