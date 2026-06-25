import { Link } from "react-router-dom";
import { FiLinkedin, FiGithub } from "react-icons/fi";

const LINKS = {
  Product: ["Features", "Use Cases", "How It Works", "Pricing"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] py-16 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <WaveIcon />
            <span className="text-white font-semibold text-base">Volube</span>
          </Link>
          <p className="text-white/32 text-sm leading-relaxed max-w-[200px]">
            Upload. Analyse. Speak better. The speech intelligence tool for everyone.
          </p>
        </div>

        {Object.entries(LINKS).map(([section, items]) => (
          <div key={section}>
            <p className="text-white/45 text-xs uppercase tracking-widest font-semibold mb-4">{section}</p>
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/38 hover:text-white text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.07]">
        <p className="text-white/22 text-xs">© 2026 Volube Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a 
          href="https://linkedin.com/in/manankasturia"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/38 hover:opacity-75 transition-opacity"
          >
            <FiLinkedin size={20} />
          </a>
          <a 
          href="https://github.com/manankasturia"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/38 hover:opacity-75 transition-opacity"
          >
            <FiGithub size={20} />
          </a>

          <div
              className="w-px h-5 bg-gray-700 hidden md:block"
              aria-hidden="true"
          ></div>

          <a 
          href="https://linkedin.com/in/rohit-dangwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/38 hover:opacity-75 transition-opacity"
          >
            <FiLinkedin size={20} />
          </a>
          <a 
          href="https://github.com/ROHIT-dangwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/38 hover:opacity-75 transition-opacity"
          >
            <FiGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function WaveIcon() {
  const heights = [8, 14, 20, 14, 9];
  return (
    <div className="flex items-end gap-[2.5px]" style={{ height: 20 }}>
      {heights.map((h, i) => (
        <span key={i} className="block w-[3px] rounded-full bg-white" style={{ height: h }} />
      ))}
    </div>
  );
}
