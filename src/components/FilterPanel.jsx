import { useMemo } from "react";
import { Filter } from "lucide-react";

export default function FilterPanel({ t, categories, active, onToggle }) {
  const groups = useMemo(() => (
    [
      {
        key: "muslim",
        label: t("groups.muslim"),
        items: [
          { key: "masjid", label: t("categories.masjid") },
          { key: "halal_butcher", label: t("categories.halal_butcher") },
          { key: "halal_restaurant", label: t("categories.halal_restaurant") },
          { key: "halal_grocer", label: t("categories.halal_grocer") },
          { key: "islamic_school", label: t("categories.islamic_school") },
          { key: "quran_classes", label: t("categories.quran_classes") },
          { key: "community_center", label: t("categories.community_center") },
          { key: "modest_fashion", label: t("categories.modest_fashion") },
          { key: "bookshop", label: t("categories.bookshop") },
        ],
      },
      {
        key: "general",
        label: t("groups.general"),
        items: [
          { key: "hospital", label: t("categories.hospital") },
          { key: "gp", label: t("categories.gp") },
          { key: "pharmacy", label: t("categories.pharmacy") },
          { key: "schools", label: t("categories.schools") },
          { key: "childcare", label: t("categories.childcare") },
          { key: "library", label: t("categories.library") },
          { key: "park", label: t("categories.park") },
          { key: "pool", label: t("categories.pool") },
          { key: "recreation_center", label: t("categories.recreation_center") },
          { key: "mall", label: t("categories.mall") },
          { key: "supermarket", label: t("categories.supermarket") },
          { key: "transport", label: t("categories.transport") },
          { key: "access_canberra", label: t("categories.access_canberra") },
        ],
      },
    ]
  ), [t]);

  return (
    <aside className="w-full md:w-72 shrink-0 bg-white border-r border-gray-200">
      <div className="px-4 py-3 border-b flex items-center gap-2 text-gray-700">
        <Filter size={18} />
        <span className="font-medium">{t("filters.title")}</span>
      </div>
      <div className="p-4 space-y-6 max-h-[40vh] md:max-h-[calc(100vh-160px)] overflow-y-auto">
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
              {group.label}
            </h3>
            <div className="space-y-2">
              {group.items.map((item) => (
                <label key={item.key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    checked={active[item.key] ?? true}
                    onChange={() => onToggle(item.key)}
                  />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500">
            {t("filters.hint")}
          </p>
        </div>
      </div>
    </aside>
  );
}
