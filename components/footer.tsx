"use client";

export function Footer() {
  return (
    <footer className="border-t border-sage-100 bg-white/55">
      <div className="section-shell py-10">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-display text-xl font-semibold text-forest-900">Akanksha Nutrition</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-forest-700/85">
              Personalized diet consultation for sustainable lifestyle changes.
            </p>
          </div>
          <p className="text-sm leading-6 text-forest-700/75">
            This website provides wellness and nutrition consultation information only. It does not
            provide medical diagnosis or emergency medical support.
          </p>
        </div>
      </div>
    </footer>
  );
}
