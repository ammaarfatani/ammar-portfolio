import { Eyebrow } from "@/components/ui/type";

export function StackTransition() {
  return (
    <section id="stack" className="stack-transition" aria-labelledby="stack-transition-title">
      <div className="stack-transition-lines" aria-hidden><span /><span /><span /></div>
      <div className="stack-transition-content">
        <Eyebrow>02 — Technology Stack</Eyebrow>
        <p className="stack-transition-label">The tools behind the thinking</p>
        <h2 id="stack-transition-title"><span>From</span><span>Idea to</span><span>System.</span></h2>
      </div>
    </section>
  );
}
