import React from 'react';
import { Mail } from 'lucide-react';
import { useReveal, useStaggerReveal } from '../hooks/useReveal';

const alumni = [
  {
    name: 'Dinesh Nawani',
    role: 'Event Coordinator',
    batch: 'OSMIUM Core Team',
    phone: '+91 9057254349',
  },
  {
    name: 'Kaushal Kumar',
    role: 'Event Head',
    batch: 'OSMIUM Core Team',
    phone: '+91 82792 52303',
  },
  {
    name: 'Malay Kumar Jha',
    role: 'Production Lead',
    batch: 'OSMIUM Core Team',
    phone: '+91 6395 935126',
  },
  {
    name: 'Dolly',
    role: 'Creative Director',
    batch: 'OSMIUM Core Team',
    phone: '+91 8427160280',
  },
];

export default function Alumni() {
  const [headRef, headVisible] = useReveal(0.15);
  const [cardsRef, cardsTriggered, cardDelays] = useStaggerReveal(alumni.length, 0, 120);
  const [ctaRef, ctaVisible] = useReveal(0.15);
  return (
    <section id="alumni" className="py-24 px-6 bg-obsidian-soft relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-crimson/5 to-black/0 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">

        <div
          ref={headRef}
          className="text-center mb-16"
          style={{
            opacity: headVisible ? 1 : 0,
            animation: headVisible ? 'reveal-up 0.8s cubic-bezier(0.22,1,0.36,1) both' : 'none',
          }}>
          <span className="text-crimson text-xs tracking-[0.5em] uppercase font-medium mb-4 block">
            Our People
          </span>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-4">
            Alumni <span className="text-crimson">&</span> Team
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            The stalwarts who built OSMIUM — from the stage to the spotlight,
            these are the faces behind the curtain.
          </p>
          <div className="w-24 h-1 bg-crimson mx-auto rounded mt-6" />
        </div>

        {/* Team Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {alumni.map((a, i) => (
            <div
              key={a.name}
              className="group border border-white/10 hover:border-crimson/50 rounded-xl p-6 bg-obsidian/60 transition-all duration-300 hover:red-glow-sm text-center"
              style={{
                opacity: cardsTriggered ? 1 : 0,
                animation: cardsTriggered
                  ? `reveal-scale 0.6s cubic-bezier(0.22,1,0.36,1) ${cardDelays[i]}ms both`
                  : 'none',
              }}
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-crimson to-crimson-dark mx-auto mb-4 flex items-center justify-center red-glow-sm">
                <span className="font-display font-black text-2xl text-white">
                  {a.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-1">{a.name}</h3>
              <div className="text-crimson text-xs tracking-widest uppercase mb-1 font-medium">
                {a.role}
              </div>
              <div className="text-gray-500 text-xs mb-4">{a.batch}</div>
              <a
                href={`tel:${a.phone}`}
                className="text-gray-400 hover:text-crimson text-xs transition-colors flex items-center justify-center gap-1"
              >
                📞 {a.phone}
              </a>
            </div>
          ))}
        </div>

        {/* Alumni Network Join CTA */}
        <div
          ref={ctaRef}
          className="text-center border border-crimson/20 rounded-2xl p-12 bg-crimson/5 red-glow-sm"
          style={{
            opacity: ctaVisible ? 1 : 0,
            animation: ctaVisible ? 'reveal-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
          }}>
          <div className="text-4xl mb-4">🎭</div>
          <h3 className="font-display font-black text-3xl text-white mb-4">
            Are you an OSMIUM Alumnus?
          </h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Join our alumni network and stay connected with the OSMIUM family.
            Share your journey, mentor current members, and celebrate theatre together.
          </p>
          <a
            href="mailto:Osmiumosm@gmail.com?subject=Alumni Network – OSMIUM"
            className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark text-white font-semibold tracking-widest uppercase px-8 py-3 rounded-lg transition-all duration-300 red-glow"
          >
            <Mail size={16} /> Connect With Us
          </a>
        </div>
      </div>
    </section>
  );
}
