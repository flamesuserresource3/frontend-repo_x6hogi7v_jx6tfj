import Spline from "@splinetool/react-spline";

export default function HeroCover({ t }) {
  return (
    <section className="relative w-full h-[44vh] md:h-[56vh] lg:h-[64vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto h-full px-4 flex items-end pb-6">
        <div className="text-white">
          <h2 className="text-2xl md:text-3xl font-semibold drop-shadow-sm">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm md:text-base text-white/80">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
