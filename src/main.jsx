import React from 'react';
import { createRoot } from 'react-dom/client';
import { Wrench, Hammer, Bath, Paintbrush, Drill, ArrowRight, Check, Phone, Mail, Menu, X, Send, ClipboardList, MessageSquareText, CalendarCheck, FileText } from 'lucide-react';
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
 const [formStatus,setFormStatus]=React.useState('idle');
 const [formMessage,setFormMessage]=React.useState('');

 async function submitEstimate(event){
   event.preventDefault();
   setFormStatus('sending');
   setFormMessage('');
   const form = event.currentTarget;

   try {
     const response = await fetch('https://formsubmit.co/ajax/reiderhomeservices@gmail.com', {
       method: 'POST',
       headers: { Accept: 'application/json' },
       body: new FormData(form)
     });
     const result = await response.json();
     if (!response.ok || result.success === false) throw new Error('Submission failed');
     form.reset();
     setFormStatus('success');
     setFormMessage("Thanks — your request has been sent. Chris will review it and get back to you.");
   } catch {
     setFormStatus('error');
     setFormMessage('We could not send your request. Please call, text, or email us instead.');
   }
 }
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
       <section className='processSection' id='how-it-works'>
         <div className='section processInner'>
           <div className='sectionHead processHead'>
             <p className='eyebrow blue'>HOW IT WORKS</p>
             <h2>From project idea to a plan.</h2>
             <p>Getting started is simple. Tell us what your home needs, and Chris will help you work out the next step.</p>
           </div>
           <div className='processGrid'>
             <article className='processStep'>
               <span className='stepNumber'>01</span><ClipboardList />
               <h3>Tell us about the project</h3>
               <p>Use the estimate form, call, or text. Photos are helpful, but they aren't required.</p>
             </article>
             <article className='processStep'>
               <span className='stepNumber'>02</span><MessageSquareText />
               <h3>Chris follows up</h3>
               <p>He'll ask any needed questions and discuss the scope, location, and timing with you.</p>
             </article>
             <article className='processStep'>
               <span className='stepNumber'>03</span><CalendarCheck />
               <h3>Plan the work</h3>
               <p>If the project is a good fit, you'll arrange the estimate and schedule the next step.</p>
             </article>
           </div>
         </div>
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
       <section className='faqSection' id='faq'>
         <div className='section faqInner'>
           <div className='sectionHead faqHead'>
             <p className='eyebrow blue'>COMMON QUESTIONS</p>
             <h2>A few things you may want to know.</h2>
           </div>
           <div className='faqList'>
             <details>
               <summary>What kinds of projects does Reider Home Services take on?</summary>
               <p>Chris handles a wide range of home repairs, installations, maintenance, carpentry, painting, drywall, tile, and improvement projects. If you aren't sure whether your job fits, send a short description and ask.</p>
             </details>
             <details>
               <summary>Do you take smaller repair jobs?</summary>
               <p>Yes. Reider Home Services is built for both individual repairs and lists of smaller jobs that homeowners need help completing.</p>
             </details>
             <details>
               <summary>Can I send photos of what needs to be done?</summary>
               <p>Yes. You can attach a photo to the estimate request form. A clear photo can help Chris understand the project before following up.</p>
             </details>
             <details>
               <summary>Do I need to know exactly what the repair requires?</summary>
               <p>No. Describe what you see, what isn't working, or what you want changed. Chris can ask follow-up questions and help determine the next step.</p>
             </details>
             <details>
               <summary>How do I request an estimate?</summary>
               <p>Complete the estimate form below or call or text (610) 609-2427. Include the type of project, your general location, and your preferred way to be contacted.</p>
             </details>
           </div>
         </div>
       </section>
       <section className='contact' id='contact'>
         <div className='contactInner'>
           <div className='contactIntro'>
             <p className='eyebrow blue'>REQUEST AN ESTIMATE</p>
             <h2>Tell us about your project.</h2>
             <p>Share a few details and Chris will follow up to discuss the work, timing, and next steps. You don't need to know exactly what the repair requires — just tell us what you're seeing.</p>
             <div className='directContact'>
               <p>Prefer to talk directly?</p>
               <a className='pending contactLink' href='tel:+16106092427'>
                 <Phone /><div><strong>Call or text</strong><span>(610) 609-2427</span></div><ArrowRight size={18} />
               </a>
               <a className='pending contactLink' href='mailto:reiderhomeservices@gmail.com'>
                 <Mail /><div><strong>Email</strong><span>reiderhomeservices@gmail.com</span></div><ArrowRight size={18} />
               </a>
             </div>
           </div>

           <form className='estimateForm' onSubmit={submitEstimate} encType='multipart/form-data'>
             <input type='hidden' name='_subject' value='New estimate request from the Reider Home Services website' />
             <input type='hidden' name='_template' value='table' />
             <input className='formTrap' type='text' name='_honey' tabIndex='-1' autoComplete='off' />
             <div className='fieldGrid'>
               <label>Name <span>*</span><input name='Name' type='text' autoComplete='name' required /></label>
               <label>Phone number <span>*</span><input name='Phone' type='tel' autoComplete='tel' required /></label>
               <label>Email address<input name='Email' type='email' autoComplete='email' /></label>
               <label>Preferred contact <span>*</span><select name='Preferred contact method' defaultValue='' required><option value='' disabled>Choose one</option><option>Text</option><option>Phone call</option><option>Email</option></select></label>
               <label>Service needed <span>*</span><select name='Service needed' defaultValue='' required><option value='' disabled>Select a service</option><option>General home repair</option><option>Carpentry or exterior work</option><option>Kitchen or bathroom</option><option>Painting, drywall, or finishing</option><option>Installation or improvement</option><option>Other / Not sure</option></select></label>
               <label>City or ZIP code <span>*</span><input name='Project location' type='text' autoComplete='postal-code' required /></label>
               <label className='fullField'>When would you like the work done?<select name='Preferred timeframe' defaultValue='Flexible'><option>As soon as possible</option><option>Within the next 1–2 weeks</option><option>Within the next month</option><option>Flexible</option></select></label>
               <label className='fullField'>Tell us about the project <span>*</span><textarea name='Project details' rows='5' placeholder='What needs to be repaired, installed, or improved?' required /></label>
               <label className='fullField fileField'>Add a photo <small>(optional, up to 10 MB)</small><input name='Project photo' type='file' accept='image/jpeg,image/png,image/webp' /></label>
             </div>
             <p className='formPrivacy'>Please don't include payment details or other sensitive information.</p>
             <button className='submitButton' type='submit' disabled={formStatus === 'sending'}>
               {formStatus === 'sending' ? 'Sending…' : 'Send Estimate Request'}
               {formStatus !== 'sending' && <Send size={18} />}
             </button>
             {formMessage && <div className={`formNotice ${formStatus}`} role='status' aria-live='polite'>{formMessage}{formStatus === 'error' && <a href='tel:+16106092427'>Call or text (610) 609-2427</a>}</div>}
           </form>
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
     <div className='mobileContactBar' aria-label='Quick contact options'>
       <a href='tel:+16106092427'><Phone size={18} /><span>Call or Text</span></a>
       <a className='mobileEstimate' href='#contact'><FileText size={18} /><span>Request Estimate</span></a>
     </div>
       <Analytics />
   </>
 );
}
createRoot(document.getElementById('root')).render(<App/>);
