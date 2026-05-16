import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, CircleAlert, CircleCheck, Clock3, Film, Layers3, RadioTower, Sparkles, Workflow } from 'lucide-react';
import './styles.css';

const projects = [
  {
    name: 'Erin Collett Films',
    lane: 'Revenue core',
    status: 'Active / protect',
    health: 'working',
    owner: 'Erin',
    outcome: 'Keep ECF as the primary revenue engine: pipeline, client follow-up, production infrastructure, and high-trust creative work.',
    next: 'Define visible pipeline stages + next client-facing moves.',
    icon: Film,
  },
  {
    name: 'Vantage Creative House',
    lane: 'Growth system',
    status: 'Active / needs focus',
    health: 'watch',
    owner: 'Erin + Emily',
    outcome: 'Event production + content agency built around the Fame System: Authority / Studios, Impact / Creators, Growth / Solutions.',
    next: 'Choose this week’s growth push and connect it to a concrete prospect / offer / proof artifact.',
    icon: Layers3,
  },
  {
    name: 'Rochem content / LinkedIn support',
    lane: 'Client workstream',
    status: 'Active',
    health: 'working',
    owner: 'VCH',
    outcome: 'Ongoing content and LinkedIn support with shared work routed into the Vantage workspace.',
    next: 'Turn current thinking into a repeatable content calendar / asset review loop.',
    icon: Sparkles,
  },
  {
    name: 'Vantage Agent OS / Hermes Workspace',
    lane: 'Operating system',
    status: 'Build / test',
    health: 'working',
    owner: 'Hermes/Main',
    outcome: 'Make Hermes Workspace the daily command center with bounded workers, topic routing, handoffs, dashboards, and reliable deployment paths.',
    next: 'Use this dashboard as a deploy test; next version should pull live Tasks / project state.',
    icon: Workflow,
  },
  {
    name: 'Personal Assistant system',
    lane: 'Daily ops',
    status: 'Functional / incomplete',
    health: 'watch',
    owner: 'Hermes/Main',
    outcome: 'Google Tasks + Calendar + Sunsama support layer for daily briefs, top-3 selection, reminders, restaurants, errands, and assistant intake.',
    next: 'Resolve 90-day goals / top-3 input loop so the system can prioritize instead of only report.',
    icon: Clock3,
  },
  {
    name: 'Rec.X',
    lane: 'Post / directing workflow',
    status: 'Needs definition',
    health: 'blocked',
    owner: 'Erin',
    outcome: 'Directing workflows and post-production pipeline management.',
    next: 'Clarify current active Rec.X work, owner, deadline, and whether it belongs in the weekly top lane.',
    icon: RadioTower,
  },
  {
    name: 'Sentinel',
    lane: 'Research surface',
    status: 'Bounded / supervised',
    health: 'watch',
    owner: 'Hermes supervises',
    outcome: 'Finance / market research surface that researches and watches without becoming an orchestration island.',
    next: 'Expose useful briefs, assumptions, watchlists, and questions back into Hermes/Main.',
    icon: CircleAlert,
  },
];

const healthStyles = {
  working: { label: 'Working', className: 'good', Icon: CircleCheck },
  watch: { label: 'Watch', className: 'watch', Icon: Clock3 },
  blocked: { label: 'Needs definition', className: 'blocked', Icon: CircleAlert },
};

const signals = [
  { label: 'What’s working', value: 'Local Vite build, Vercel auth/deploy, project map from Google Tasks / Hermes memory, bounded-worker operating model.' },
  { label: 'What’s not yet working', value: 'GitHub repo creation is blocked by current GitHub token scope; live project data is not wired in yet.' },
  { label: 'Best next test', value: 'Connect this shell to Google Tasks / Drive and make project cards update automatically.' },
];

function ProjectCard({ project }) {
  const Icon = project.icon;
  const style = healthStyles[project.health];
  const HealthIcon = style.Icon;
  return (
    <article className="project-card">
      <div className="card-topline">
        <span className="lane"><Icon size={15} /> {project.lane}</span>
        <span className={`status ${style.className}`}><HealthIcon size={13} />{style.label}</span>
      </div>
      <h2>{project.name}</h2>
      <p className="outcome">{project.outcome}</p>
      <div className="meta-row">
        <span>Owner</span>
        <strong>{project.owner}</strong>
      </div>
      <div className="next-row">
        <span>Next move</span>
        <p>{project.next}</p>
      </div>
    </article>
  );
}

function App() {
  const counts = projects.reduce((acc, p) => ({ ...acc, [p.health]: (acc[p.health] || 0) + 1 }), {});
  return (
    <main>
      <nav className="nav">
        <div className="brand"><span className="mark">H</span> Hermes / Vantage</div>
        <a href="https://current-projects-dashboard.vercel.app" target="_blank" rel="noreferrer">Live deploy <ArrowUpRight size={14} /></a>
      </nav>

      <section className="hero">
        <p className="eyebrow">Test build · current project dashboard · updated May 16, 2026</p>
        <h1>One operating view for the work already in motion.</h1>
        <p className="lede">A simple deployable dashboard to test the GitHub → Vercel path and expose what we know, what is working, and where the project map still needs sharper inputs.</p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">View projects</a>
          <a className="button secondary" href="#system-check">System check</a>
        </div>
      </section>

      <section className="scoreboard" aria-label="Project health summary">
        <div><span>{projects.length}</span><p>current workstreams mapped</p></div>
        <div><span>{counts.working || 0}</span><p>working enough to build on</p></div>
        <div><span>{counts.watch || 0}</span><p>watch / needs focus</p></div>
        <div><span>{counts.blocked || 0}</span><p>needs definition</p></div>
      </section>

      <section id="system-check" className="signals">
        {signals.map((signal) => (
          <div className="signal" key={signal.label}>
            <p>{signal.label}</p>
            <h3>{signal.value}</h3>
          </div>
        ))}
      </section>

      <section id="projects" className="projects-grid">
        {projects.map((project) => <ProjectCard project={project} key={project.name} />)}
      </section>

      <section className="footer-panel">
        <p className="eyebrow">Readout</p>
        <h2>This is intentionally a static v0.</h2>
        <p>It proves the build/deploy loop. The useful v1 is the same surface backed by Google Tasks, Drive project docs, and Hermes routing state so Erin can open one link and see the live operating picture.</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
