import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CircleDot, Shield } from "lucide-react";

const starters = {
  forwards: [
    { number: "11", name: "A. Rahman", position: "Left winger" },
    { number: "9", name: "M. Rashid", position: "Center forward" },
    { number: "7", name: "S. Nizar", position: "Right winger" },
  ],
  midfielders: [
    { number: "8", name: "J. Shah", position: "Left central midfielder" },
    { number: "10", name: "R. Fahad", position: "Central midfielder" },
    { number: "6", name: "K. Afsal", position: "Right central midfielder" },
  ],
  defenders: [
    { number: "3", name: "M. Suhail", position: "Left back" },
    { number: "4", name: "A. Hakim", position: "Center back" },
    { number: "5", name: "Y. Sajid", position: "Center back" },
    { number: "2", name: "N. Ashik", position: "Right back" },
  ],
  goalkeeper: { number: "1", name: "D. Imran", position: "Goalkeeper" },
};

const substitutes = [
  ["12", "F. Irfan"],
  ["14", "H. Navas"],
  ["15", "P. Jaseem"],
  ["16", "T. Rameez"],
  ["17", "A. Shah"],
  ["18", "M. Farhan"],
  ["19", "L. Mujeeb"],
];

export const Route = createFileRoute("/squad")({
  head: () => ({
    meta: [
      { title: "First Team Squad — Tai Football Academy" },
      {
        name: "description",
        content: "Meet the Tai Football Academy first team squad and current matchday formation.",
      },
    ],
  }),
  component: SquadPage,
});

function PlayerMarker({
  player,
  goalkeeper = false,
}: {
  player: { number: string; name: string; position: string };
  goalkeeper?: boolean;
}) {
  return (
    <div className={`squad-player ${goalkeeper ? "squad-player--keeper" : ""}`}>
      <div className="squad-avatar" aria-hidden="true">
        <div className="squad-avatar__head" />
        <div className="squad-avatar__body" />
      </div>
      <div className="squad-player__label">
        <span className="squad-player__number">{player.number}</span>
        <span className="squad-player__copy">
          <strong>{player.name}</strong>
          <small>{player.position}</small>
        </span>
      </div>
    </div>
  );
}

function SquadPage() {
  return (
    <main className="pb-24">
      <section className="border-b border-border py-16 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">2026 / 27 matchday roster</p>
            <h1 className="mt-5 max-w-3xl font-display text-6xl uppercase leading-[0.88] tracking-tighter lg:text-8xl">
              First team <span className="text-neon">squad.</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground/55">
            <span className="flex size-10 items-center justify-center border border-neon/50 text-neon">
              <Shield className="size-5" />
            </span>
            <span>Formation / 4—3—3</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Starting XI</p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tight">
              The shape of the game
            </h2>
          </div>
          <span className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neon sm:flex">
            <CircleDot className="size-3" /> Home match
          </span>
        </div>

        <div className="squad-layout">
          <div className="squad-field" aria-label="Starting eleven in a 4-3-3 formation">
            <div className="squad-field__line squad-field__line--halfway" />
            <div className="squad-field__circle" />
            <div className="squad-field__box squad-field__box--top" />
            <div className="squad-field__box squad-field__box--bottom" />
            <div className="squad-field__goal squad-field__goal--top" />
            <div className="squad-field__goal squad-field__goal--bottom" />
            <div className="squad-row squad-row--forwards">
              {starters.forwards.map((player) => (
                <PlayerMarker key={player.number} player={player} />
              ))}
            </div>
            <div className="squad-row squad-row--midfield">
              {starters.midfielders.map((player) => (
                <PlayerMarker key={player.number} player={player} />
              ))}
            </div>
            <div className="squad-row squad-row--defence">
              {starters.defenders.map((player) => (
                <PlayerMarker key={player.number} player={player} />
              ))}
            </div>
            <div className="squad-row squad-row--keeper">
              <PlayerMarker player={starters.goalkeeper} goalkeeper />
            </div>
          </div>

          <aside className="squad-bench">
            <div className="flex items-center justify-between border-b border-neon/30 pb-3">
              <h2 className="font-display text-xl uppercase tracking-tight text-neon">
                Substitutes
              </h2>
              <ArrowRight className="size-4 text-neon" />
            </div>
            <ol className="mt-3">
              {substitutes.map(([number, name]) => (
                <li
                  key={number}
                  className="flex items-center gap-3 border-b border-border/70 py-2.5 text-sm"
                >
                  <span className="w-6 font-display text-lg text-neon">{number}</span>
                  <span className="font-medium uppercase tracking-wide">{name}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </main>
  );
}
