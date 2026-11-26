import { setupSteps } from '../data';

/** "Siap dalam 5 menit" checklist on the dark register panel. */
export function SetupStepList() {
  return (
    <ul className="flex flex-col gap-7">
      {setupSteps.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-3.5 border-b border-ink-2 py-3.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-control border border-dark text-white">
            <Icon size={18} />
          </span>
          <span className="text-15 leading-[1.4] text-line-2">{text}</span>
        </li>
      ))}
    </ul>
  );
}
