/** Wizard card title (20px) with a 13px muted description. */
export function StepHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-20 leading-[1.2] font-semibold tracking-[-0.01em] text-ink">{title}</h1>
      <p className="text-13 leading-[1.4] text-muted">{description}</p>
    </div>
  );
}
