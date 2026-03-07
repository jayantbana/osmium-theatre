import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Heart } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Acts', to: '/#acts' },
  { label: 'ILHAAM', to: '/ilhaam' },
  { label: 'Performances', to: '/#performances' },
  { label: 'Alumni', to: '/#alumni' },
  { label: 'Register', to: '/register' },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-crimson flex items-center justify-center red-glow-sm">
              <span className="font-display font-black text-white text-lg">O</span>
            </div>
            <div>
              <div className="font-display font-black text-white text-xl tracking-widest">OSMIUM</div>
              <div className="text-crimson text-xs tracking-[0.3em] uppercase">The Theatre Club</div>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            A vibrant theatre collective celebrating storytelling, expression,
            and the transformative power of performance. Based at UIET, Panjab University.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-xs tracking-[0.4em] uppercase mb-5">
            Quick Links
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-gray-500 hover:text-crimson text-sm transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white font-semibold text-xs tracking-[0.4em] uppercase mb-5">
            Connect
          </h4>
          <div className="flex gap-3 mb-6">
            <a
              href="https://www.instagram.com/osmium_osm/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-crimson hover:text-crimson text-gray-400 transition-all"
            >
              <Instagram size={16} />
            </a>
            <a
              href="mailto:Osmiumosm@gmail.com"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-crimson hover:text-crimson text-gray-400 transition-all"
            >
              <Mail size={16} />
            </a>
          </div>
          <div className="text-gray-600 text-xs leading-relaxed">
            📍 UIET, Panjab University<br />
            Chandigarh, India<br />
            📧 Osmiumosm@gmail.com
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <span>© 2026 OSMIUM – The Theatre Club. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart size={10} className="text-crimson fill-crimson" /> for the stage
          </span>
        </div>
      </div>
    </footer>
  );
}
