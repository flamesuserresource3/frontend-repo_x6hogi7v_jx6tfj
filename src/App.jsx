import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import FilterPanel from "./components/FilterPanel.jsx";
import MapView from "./components/MapView.jsx";
import InfoBar from "./components/InfoBar.jsx";

// Simple bilingual dictionary
const DICT = {
  en: {
    title: "Canberra Family Welcome Hub",
    subtitle: "Bilingual guide for Muslim families in Canberra",
    toggleLang: "Switch language",
    filters: {
      title: "Filters",
      hint: "Toggle categories to personalize the map.",
    },
    groups: {
      muslim: "Muslim & Community Facilities",
      general: "General & Family Essentials",
    },
    categories: {
      masjid: "Masjids & Prayer Rooms",
      halal_butcher: "Halal Butchers",
      halal_restaurant: "Halal Restaurants & Cafes",
      halal_grocer: "Grocers with Halal Section",
      islamic_school: "Islamic Schools",
      quran_classes: "Quran & Arabic Classes",
      community_center: "Muslim Community Centers",
      modest_fashion: "Modest Fashion Stores",
      bookshop: "Islamic Bookshops",

      hospital: "Hospitals",
      gp: "GPs / Medical Centres",
      pharmacy: "Pharmacies",
      schools: "Public & Private Schools",
      childcare: "Childcare & Early Learning",
      library: "Public Libraries",
      park: "Parks & Playgrounds",
      pool: "Public Pools",
      recreation_center: "Community Recreation Centres",
      mall: "Major Shopping Malls",
      supermarket: "Major Supermarkets",
      transport: "Public Transport Hubs",
      access_canberra: "Access Canberra Centres",
    },
    map: {
      searchPlaceholder: "Search by name...",
      getDirections: "Get directions",
      fallback: "Interactive map unavailable here. Showing a list of locations instead.",
    },
    emergency: {
      title: "Emergency",
      subtitle: "Police / Fire / Ambulance",
      tip: "Dial 000 in an emergency. 131 444 for Police assistance.",
    },
  },
  ar: {
    title: "منصة الترحيب بالعائلات في كانبرا",
    subtitle: "دليل ثنائي اللغة للأسر المسلمة في كانبرا",
    toggleLang: "تبديل اللغة",
    filters: {
      title: "التصنيفات",
      hint: "قم بتفعيل أو إخفاء الفئات لعرض ما يهمك.",
    },
    groups: {
      muslim: "المرافق الإسلامية والمجتمعية",
      general: "الخدمات العامة والأساسية للأسرة",
    },
    categories: {
      masjid: "مساجد وغرف صلاة",
      halal_butcher: "جزارون حلال",
      halal_restaurant: "مطاعم ومقاهي حلال",
      halal_grocer: "متاجر بقالة بقسم حلال",
      islamic_school: "مدارس إسلامية",
      quran_classes: "دروس القرآن واللغة العربية",
      community_center: "مراكز المجتمع المسلم",
      modest_fashion: "متاجر أزياء محتشمة",
      bookshop: "مكتبات إسلامية",

      hospital: "مستشفيات",
      gp: "أطباء عامون/مراكز طبية",
      pharmacy: "صيدليات",
      schools: "مدارس عامة وخاصة",
      childcare: "رعاية وتعليم مبكر",
      library: "مكتبات عامة",
      park: "حدائق وملاعب",
      pool: "مسابح عامة",
      recreation_center: "مراكز ترفيه مجتمعية",
      mall: "مراكز تسوق كبرى",
      supermarket: "سلاسل سوبرماركت كبرى",
      transport: "محاور النقل العام",
      access_canberra: "مراكز أكسس كانبرا",
    },
    map: {
      searchPlaceholder: "ابحث بالاسم...",
      getDirections: "اتجاهات الوصول",
      fallback: "الخريطة التفاعلية غير متاحة هنا. سيتم عرض قائمة بالأماكن بدلًا من ذلك.",
    },
    emergency: {
      title: "طوارئ",
      subtitle: "شرطة / إطفاء / إسعاف",
      tip: "اتصل 000 في حالات الطوارئ. 131 444 للمساعدة من الشرطة.",
    },
  },
};

// Seed locations for Canberra (sample)
const LOCATIONS = [
  {
    category: "masjid",
    name: { en: "Gungahlin Mosque", ar: "مسجد غونغاهلن" },
    address: "140 The Valley Ave, Gungahlin ACT",
    description: { en: "Large mosque with Friday prayers.", ar: "مسجد كبير مع صلاة الجمعة." },
    lat: -35.1833, lng: 149.1333,
    hours: "Fri 12:30pm Jumu'ah",
  },
  {
    category: "masjid",
    name: { en: "Canberra Islamic Centre", ar: "المركز الإسلامي في كانبرا" },
    address: "221 Clive Steele Ave, Monash ACT",
    description: { en: "Masjid and community facilities.", ar: "مسجد ومرافق مجتمعية." },
    lat: -35.4267, lng: 149.0814,
  },
  {
    category: "halal_butcher",
    name: { en: "Ali Baba Halal Butcher", ar: "علي بابا - جزار حلال" },
    address: "Canberra Centre",
    description: { en: "Certified halal meats.", ar: "لحوم حلال معتمدة." },
    lat: -35.281, lng: 149.128,
  },
  {
    category: "supermarket",
    name: { en: "Coles - Gungahlin", ar: "كولز - غونغاهلن" },
    address: "Gungahlin Village",
    description: { en: "Major supermarket.", ar: "سوبرماركت رئيسي." },
    lat: -35.184, lng: 149.133,
  },
  {
    category: "hospital",
    name: { en: "Canberra Hospital (ED)", ar: "مستشفى كانبرا (طوارئ)" },
    address: "Yamba Dr, Garran",
    description: { en: "Emergency department.", ar: "قسم الطوارئ." },
    lat: -35.348, lng: 149.105,
  },
  {
    category: "park",
    name: { en: "Commonwealth Park", ar: "حديقة الكومنولث" },
    address: "Parkes",
    description: { en: "Large family-friendly park.", ar: "حديقة كبيرة مناسبة للعائلات." },
    lat: -35.287, lng: 149.133,
  },
];

export default function App() {
  const [lang, setLang] = useState("en");
  const [active, setActive] = useState({});

  const t = useMemo(() => {
    const dict = DICT[lang];
    return (key) => key.split(".").reduce((o, k) => (o ? o[k] : undefined), dict) ?? key;
  }, [lang]);

  const toggle = (k) => setActive((s) => ({ ...s, [k]: !(s[k] ?? true) }));

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-sky-50 text-gray-900">
      <Header lang={lang} t={t} onToggleLang={() => setLang((l) => (l === "en" ? "ar" : "en"))} />
      <InfoBar t={t} lang={lang} />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row gap-4">
          <FilterPanel t={t} categories={DICT[lang].categories} active={active} onToggle={toggle} />
          <MapView t={t} lang={lang} data={LOCATIONS} activeCategories={active} />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-600">
        <p>
          {lang === "en"
            ? "Data is illustrative. Tap a marker for details."
            : "البيانات توضيحية. اضغط على العلامة لعرض التفاصيل."}
        </p>
      </footer>
    </div>
  );
}
