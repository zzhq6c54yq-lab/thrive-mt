import { PaintByNumbersTemplate } from "@/types/artTherapyTypes";

const BEGINNER_PBN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 360">
  <rect width="540" height="360" fill="#ffffff"/>
  <!-- Simple flower -->
  <circle id="region-1" cx="270" cy="180" r="40" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-2" cx="240" cy="150" r="25" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-3" cx="300" cy="150" r="25" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-4" cx="300" cy="210" r="25" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-5" cx="240" cy="210" r="25" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <rect id="region-6" x="265" y="220" width="10" height="60" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Numbers -->
  <text x="270" y="185" font-size="16" text-anchor="middle" fill="#666">1</text>
  <text x="240" y="155" font-size="14" text-anchor="middle" fill="#666">2</text>
  <text x="300" y="155" font-size="14" text-anchor="middle" fill="#666">3</text>
  <text x="300" y="215" font-size="14" text-anchor="middle" fill="#666">4</text>
  <text x="240" y="215" font-size="14" text-anchor="middle" fill="#666">5</text>
  <text x="270" y="255" font-size="14" text-anchor="middle" fill="#666">6</text>
</svg>
`;

const INTERMEDIATE_PBN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 360">
  <rect width="540" height="360" fill="#ffffff"/>
  <!-- Butterfly design -->
  <!-- Body -->
  <ellipse id="region-1" cx="270" cy="180" rx="8" ry="60" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Left wing upper -->
  <path id="region-2" d="M262 140 Q220 120, 200 140 Q190 160, 210 180 Q240 190, 262 170 Z" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Left wing lower -->
  <path id="region-3" d="M262 190 Q230 200, 210 220 Q200 240, 220 250 Q250 240, 262 210 Z" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Right wing upper -->
  <path id="region-4" d="M278 140 Q320 120, 340 140 Q350 160, 330 180 Q300 190, 278 170 Z" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Right wing lower -->
  <path id="region-5" d="M278 190 Q310 200, 330 220 Q340 240, 320 250 Q290 240, 278 210 Z" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Wing details -->
  <circle id="region-6" cx="230" cy="160" r="12" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-7" cx="310" cy="160" r="12" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-8" cx="225" cy="225" r="8" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-9" cx="315" cy="225" r="8" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Antennae -->
  <path id="region-10" d="M265 130 Q255 110, 250 100" fill="none" stroke="#888" stroke-width="3"/>
  <path id="region-11" d="M275 130 Q285 110, 290 100" fill="none" stroke="#888" stroke-width="3"/>
  <circle id="region-12" cx="250" cy="100" r="4" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-13" cx="290" cy="100" r="4" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Numbers -->
  <text x="270" y="185" font-size="12" text-anchor="middle" fill="#666">1</text>
  <text x="230" y="155" font-size="12" text-anchor="middle" fill="#666">2</text>
  <text x="235" y="220" font-size="12" text-anchor="middle" fill="#666">3</text>
  <text x="310" y="155" font-size="12" text-anchor="middle" fill="#666">4</text>
  <text x="305" y="220" font-size="12" text-anchor="middle" fill="#666">5</text>
  <text x="230" y="165" font-size="10" text-anchor="middle" fill="#666">6</text>
  <text x="310" y="165" font-size="10" text-anchor="middle" fill="#666">7</text>
  <text x="225" y="230" font-size="10" text-anchor="middle" fill="#666">8</text>
  <text x="315" y="230" font-size="10" text-anchor="middle" fill="#666">9</text>
  <text x="262" y="120" font-size="8" text-anchor="middle" fill="#666">10</text>
  <text x="278" y="120" font-size="8" text-anchor="middle" fill="#666">11</text>
  <text x="250" y="105" font-size="8" text-anchor="middle" fill="#666">12</text>
  <text x="290" y="105" font-size="8" text-anchor="middle" fill="#666">13</text>
</svg>
`;

const ADVANCED_PBN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 360">
  <rect width="540" height="360" fill="#ffffff"/>
  <!-- Complex castle scene -->
  <!-- Sky sections -->
  <path id="region-1" d="M0 0 L540 0 L540 100 L0 100 Z" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <path id="region-2" d="M0 100 L540 100 L540 140 L0 140 Z" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Castle main tower -->
  <rect id="region-3" x="220" y="140" width="100" height="120" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Castle battlements -->
  <rect id="region-4" x="210" y="130" width="20" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-5" x="240" y="130" width="20" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-6" x="270" y="130" width="20" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-7" x="300" y="130" width="20" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-8" x="330" y="130" width="20" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Side towers -->
  <rect id="region-9" x="180" y="180" width="40" height="80" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-10" x="320" y="180" width="40" height="80" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Tower tops -->
  <polygon id="region-11" points="180,180 200,160 220,180" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <polygon id="region-12" points="320,180 340,160 360,180" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Windows -->
  <rect id="region-13" x="240" y="160" width="15" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-14" x="285" y="160" width="15" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-15" x="190" y="200" width="10" height="15" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-16" x="330" y="200" width="10" height="15" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Gate -->
  <path id="region-17" d="M255 260 Q255 240, 275 240 Q295 240, 295 260 L295 280 L255 280 Z" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Ground -->
  <path id="region-18" d="M0 260 L540 260 L540 310 L0 310 Z" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Grass -->
  <path id="region-19" d="M0 310 L540 310 L540 360 L0 360 Z" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Clouds -->
  <circle id="region-20" cx="100" cy="60" r="25" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-21" cx="120" cy="50" r="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-22" cx="80" cy="50" r="18" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-23" cx="420" cy="70" r="22" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-24" cx="440" cy="60" r="18" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Trees -->
  <rect id="region-25" x="50" y="220" width="15" height="40" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-26" cx="57" cy="220" r="25" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-27" x="450" y="230" width="12" height="30" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-28" cx="456" cy="230" r="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  
  <!-- Numbers (smaller due to complexity) -->
  <text x="270" y="50" font-size="8" text-anchor="middle" fill="#666">1</text>
  <text x="270" y="120" font-size="8" text-anchor="middle" fill="#666">2</text>
  <text x="270" y="200" font-size="8" text-anchor="middle" fill="#666">3</text>
  <text x="220" y="140" font-size="7" text-anchor="middle" fill="#666">4</text>
  <text x="250" y="140" font-size="7" text-anchor="middle" fill="#666">5</text>
  <text x="280" y="140" font-size="7" text-anchor="middle" fill="#666">6</text>
  <text x="310" y="140" font-size="7" text-anchor="middle" fill="#666">7</text>
  <text x="340" y="140" font-size="7" text-anchor="middle" fill="#666">8</text>
  <text x="200" y="220" font-size="7" text-anchor="middle" fill="#666">9</text>
  <text x="340" y="220" font-size="7" text-anchor="middle" fill="#666">10</text>
  <text x="200" y="170" font-size="6" text-anchor="middle" fill="#666">11</text>
  <text x="340" y="170" font-size="6" text-anchor="middle" fill="#666">12</text>
  <text x="247" y="170" font-size="6" text-anchor="middle" fill="#666">13</text>
  <text x="292" y="170" font-size="6" text-anchor="middle" fill="#666">14</text>
  <text x="195" y="207" font-size="6" text-anchor="middle" fill="#666">15</text>
  <text x="335" y="207" font-size="6" text-anchor="middle" fill="#666">16</text>
  <text x="275" y="250" font-size="6" text-anchor="middle" fill="#666">17</text>
  <text x="270" y="285" font-size="8" text-anchor="middle" fill="#666">18</text>
  <text x="270" y="335" font-size="8" text-anchor="middle" fill="#666">19</text>
  <text x="100" y="65" font-size="6" text-anchor="middle" fill="#666">20</text>
  <text x="120" y="55" font-size="6" text-anchor="middle" fill="#666">21</text>
  <text x="80" y="55" font-size="6" text-anchor="middle" fill="#666">22</text>
  <text x="420" y="75" font-size="6" text-anchor="middle" fill="#666">23</text>
  <text x="440" y="65" font-size="6" text-anchor="middle" fill="#666">24</text>
  <text x="57" y="240" font-size="6" text-anchor="middle" fill="#666">25</text>
  <text x="57" y="225" font-size="6" text-anchor="middle" fill="#666">26</text>
  <text x="456" y="245" font-size="6" text-anchor="middle" fill="#666">27</text>
  <text x="456" y="235" font-size="6" text-anchor="middle" fill="#666">28</text>
</svg>
`;

export const PBN_TEMPLATES: Record<string, PaintByNumbersTemplate> = {
  beginner: { name: "Beginner - Simple Flower", svg: BEGINNER_PBN_SVG, regions: 6 },
  intermediate: { name: "Intermediate - Butterfly", svg: INTERMEDIATE_PBN_SVG, regions: 13 },
  advanced: { name: "Advanced - Castle Scene", svg: ADVANCED_PBN_SVG, regions: 28 }
};

export const SAMPLE_MANDALA_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 540">
  <rect width="540" height="540" fill="#ffffff"/>
  <g stroke="#aaa" fill="none">
    <circle cx="270" cy="270" r="220"/>
    <circle cx="270" cy="270" r="180"/>
    <circle cx="270" cy="270" r="140"/>
    <circle cx="270" cy="270" r="100"/>
    <circle cx="270" cy="270" r="60"/>
    <!-- petals -->
    ${Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const x = 270 + Math.cos(angle) * 180;
      const y = 270 + Math.sin(angle) * 180;
      return `<line x1="270" y1="270" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" />`;
    }).join("\n")}
  </g>
</svg>
`;