import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-ink-950/10">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-8 sm:px-8 sm:py-16">
        <div className="grid grid-cols-3 gap-x-6 gap-y-8 sm:gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="col-span-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="text-[17px] font-semibold tracking-tight text-ink-950">Odeun</span>
            </div>
            <p className="mt-4 max-w-[36ch] text-[13.5px] leading-[1.6] text-ink-600">
              The engine that turns your AI chats into permanent, beautiful, personal systems —
              dashboards, trackers, second brains. Built for people who stopped fitting.
            </p>
          </div>

          <FooterCol
            title="Product"
            links={[
              ["What you can build", "#build"],
              ["Integrations", "#ecosystem"],
              ["Waitlist", "#waitlist"],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ["Manifesto", "#"],
              ["Careers", "#"],
              ["Press kit", "#"],
              ["Contact", "mailto:hello@Odeun.app"],
            ]}
          />
          <FooterCol
            title="Fine print"
            links={[
              ["Privacy", "#"],
              ["Terms", "#"],
              ["Security", "#"],
              ["Sustainability", "#"],
            ]}
          />
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-ink-200/60 pt-5 sm:mt-12 sm:pt-6 md:flex-row md:items-center">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-ink-400">
            © {new Date().getFullYear()} Odeun systems · made with care
          </div>
          <div className="flex items-center gap-2 text-[11px] text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-magenta" />
              private beta · invites weekly
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-ink-400">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-[13.5px] font-medium text-ink-700 transition-colors hover:text-ink-950"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
