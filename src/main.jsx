import React from 'react';
import { createRoot } from 'react-dom/client';
import { Wrench, Hammer, Bath, Paintbrush, Drill, ArrowRight, Check, Images, Phone, Mail, Menu, X } from 'lucide-react';
import './styles.css';
import logo from './assets/logo.jpg';
import yardBefore from './assets/projects/20210729_093803.jpg';
import yardDuring from './assets/projects/20210729_093819.jpg';
import yardAfter from './assets/projects/20210925_133754.jpg';
import yardAfter2 from './assets/projects/20210925_133743.jpg';
import deckBefore from './assets/projects/IMG_0915.jpg';
import deckDuring from './assets/projects/IMG_20260717_195724362_PORTRAIT.jpg';
import deckAfter from './assets/projects/IMG_20260724_201252861.jpg';
import shower from './assets/projects/IMG_2024-08-26-13-36-00-842.jpg';
import concrete from './assets/projects/20250909_201645.jpg';
import { Analytics } from '@vercel/analytics/react';

const services = [
  { icon: Wrench, title:'Home Repairs & Handyman', text:'From nagging repairs to the odd jobs that never leave the list.', items:['General home repairs','Drywall patching','Doors & hardware','Shelving & mounting','Caulking & sealing','Punch-list repairs'] },
  { icon: Hammer, title:'Carpentry & Exterior', text:'Repairs and improvements that keep the outside of your home working and looking right.', items:['Deck & porch repair','Steps & railings','Fence & gate repair','Wood & trim repair','Shed repairs','Small custom carpentry'] },
  { icon: Bath, title:'Kitchen & Bathroom', text:'Practical updates, repairs, tile work, and fixture replacements.', items:['Kitchen repairs','Bathroom repairs','Tile & backsplashes','Vanities & fixtures','Cabinet repairs','Shower & tub repairs'] },
  { icon: Paintbrush, title:'Walls, Floors & Finishing', text:'The finishing work that makes a room feel complete again.', items:['Painting & touch-ups','Drywall repair','Flooring repair','Tile work','Trim & molding','Wall & ceiling repair'] },
  { icon: Drill, title:'Installation & Improvements', text:'New fixtures, hardware, and home improvements installed with care.', items:['Light fixtures','Ceiling fans','TV mounting','Blinds & curtain hardware','Grab bars','Weatherproofing'] }
];

function App(){
 const [open,setOpen]=React.useState(false);
 const [compare,setCompare]=React.useState(50);
 return (
   <>
     <header className='header'>
       <a className='brand' href='#top'>
         <img src={logo} />
         <span>Reider Home Services</span>
       </a>
       <button
         className='menu'
         onClick={() => setOpen(!open)}
         aria-label='Menu'>
         {open ? <X /> : <Menu />}
       </button>
       <nav className={open ? 'nav open' : 'nav'}>
         {['Services', 'Our Work', 'About', 'Contact'].map((x) => (
           <a
             key={x}
             href={'#' + x.toLowerCase().replace(' ', '-')}
             onClick={() => setOpen(false)}>
             {x}
           </a>
         ))}
       </nav>
     </header>
     <main id='top'>
       <section className='hero'>
         <div className='heroShade'></div>
         <div className='heroContent'>
           <p className='eyebrow'>
             HOME REPAIR • IMPROVEMENTS • HANDYMAN SERVICES
           </p>
           <h1>
             Loving Your Home
             <br />
             Almost as Much as You Do.
           </h1>
           <p className='lead'>
             Repairs, installations, improvements, and the jobs around the house
             you just need done right.
           </p>
           <div className='actions'>
             <a className='btn primary' href='#contact'>
               Request an Estimate <ArrowRight size={18} />
             </a>
             <a className='btn ghost' href='#our-work'>
               See Our Work
             </a>
           </div>
         </div>
       </section>
       <section className='trust'>
         <span>Home Repairs</span>
         <i /> <span>Improvements</span>
         <i /> <span>Installations</span>
         <i /> <span>Odd Jobs</span>
       </section>
       <section className='section' id='services'>
         <div className='sectionHead'>
           <p className='eyebrow blue'>WHAT WE DO</p>
           <h2>One call for the jobs your home needs.</h2>
           <p>
             From small fixes to bigger improvements, Reider Home Services
             handles a wide range of projects without making you chase down a
             different person for every job.
           </p>
         </div>
         <div className='serviceGrid'>
           {services.map(({ icon: Icon, title, text, items }) => (
             <article className='service' key={title}>
               <Icon />
               <h3>{title}</h3>
               <p>{text}</p>
               <ul>
                 {items.map((i) => (
                   <li key={i}>
                     <Check size={15} />
                     {i}
                   </li>
                 ))}
               </ul>
             </article>
           ))}
         </div>
         <div className='ask'>
           <div>
             <h3>Don't see your project listed?</h3>
             <p>
               If something in your home needs to be repaired, fixed, installed,
               replaced, or improved, just ask.
             </p>
           </div>
           <a href='#contact' className='textLink'>
             Tell us what you need <ArrowRight size={18} />
           </a>
         </div>
       </section>
       <section className='work' id='our-work'>
         <div className='section workInner'>
           <div className='sectionHead light'>
             <p className='eyebrow'>REAL PROJECTS. REAL HOMES.</p>
             <h2>See the difference.</h2>
             <p>Real work from Reider Home Services — not stock photography.</p>
           </div>
           <div className='compare'>
             <div className='compareFrame'>
               <img src={yardAfter} className='after' />
               <div className='beforeWrap' style={{ width: `${compare}%` }}>
                 <img src={yardBefore} />
               </div>
               <div className='divider' style={{ left: `${compare}%` }}>
                 <span>↔</span>
               </div>
               <span className='label beforeLabel'>BEFORE</span>
               <span className='label afterLabel'>AFTER</span>
               <input
                 aria-label='Before and after comparison'
                 type='range'
                 min='8'
                 max='92'
                 value={compare}
                 onChange={(e) => setCompare(e.target.value)}
               />
             </div>
             <div className='compareCopy'>
               <p className='eyebrow'>BEFORE → AFTER</p>
               <h3>Outdoor transformation</h3>
               <p>
                 Drag the slider to compare the project before and after the
                 work.
               </p>
             </div>
           </div>
           <div className='gallery'>
             <figure>
               <img src={yardAfter2} />
               <figcaption>Finished outdoor improvement</figcaption>
             </figure>
             <figure>
               <img src={deckDuring} />
               <figcaption>Deck repair in progress</figcaption>
             </figure>
             <figure>
               <img src={deckAfter} />
               <figcaption>Finished deck work</figcaption>
             </figure>
             <figure>
               <img src={shower} />
               <figcaption>Tile & shower work</figcaption>
             </figure>
             <figure>
               <img src={concrete} />
               <figcaption>Repair work in progress</figcaption>
             </figure>
             <figure>
               <img src={yardDuring} />
               <figcaption>Project transformation</figcaption>
             </figure>
           </div>
         </div>
       </section>
       <section className='section about' id='about'>
         <div className='aboutMark'>
           <img src={logo} />
         </div>
         <div>
           <p className='eyebrow blue'>REIDER HOME SERVICES</p>
           <h2>A capable set of hands for your home.</h2>
           <p>
             Some projects are too small for a contractor and too important to
             keep putting off. Reider Home Services is built for exactly that —
             dependable help with repairs, improvements, installations, and the
             unexpected jobs that come with owning a home.
           </p>
           <p>
             Whether you already know exactly what needs to be done or you just
             know something isn't right, start by telling us about the project.
           </p>
           <a className='textLink blueLink' href='#contact'>
             Talk to us about your project <ArrowRight size={18} />
           </a>
         </div>
       </section>
       <section className='contact' id='contact'>
         <div className='contactInner'>
           <p className='eyebrow'>LET'S TALK ABOUT YOUR PROJECT</p>
           <h2>What can we fix for you?</h2>
           <p>
             Tell us what needs attention and we'll take it from there. Call,
             text, or email Reider Home Services to get started.
           </p>
           <a className='pending contactLink' href='tel:+16106092427'>
             <Phone />
             <div>
               <strong>Call or text</strong>
               <span>(610) 609-2427</span>
             </div>
             <ArrowRight size={18} />
           </a>
           <a
             className='pending contactLink'
             href='mailto:reiderhomeservices@gmail.com'>
             <Mail />
             <div>
               <strong>Email</strong>
               <span>reiderhomeservices@gmail.com</span>
             </div>
             <ArrowRight size={18} />
           </a>
         </div>
       </section>
     </main>
     <footer>
       <img src={logo} />
       <div>
         <strong>Reider Home Services</strong>
         <span>Loving Your Home Almost as Much as You Do.</span>
       </div>
       <p>© {new Date().getFullYear()} Reider Home Services</p>
     </footer>
       <Analytics />
   </>
 );
}
createRoot(document.getElementById('root')).render(<App/>);
