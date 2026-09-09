import React from 'react';
import { createRoot } from 'react-dom/client';
import { Wrench, Hammer, Bath, Paintbrush, Drill, ArrowRight, Check, Phone, Mail, Menu, X, Send, ClipboardList, MessageSquareText, CalendarCheck, FileText, ChevronLeft, ChevronRight, Trash2, Clock3 } from 'lucide-react';
import './styles.css';
import logo from './assets/logo.jpg';
import yardBefore from './assets/projects/20210729_093803.jpg';
import yardDuring from './assets/projects/20210729_093819.jpg';
import yardAfter from './assets/projects/20210925_133754.jpg';
import yardAfter2 from './assets/projects/20210925_133743.jpg';
import yardAfterComparison from './assets/projects/20210925_133729.jpg';
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

const projects = [
  { title:'Outdoor transformation', summary:'From overgrown space to a finished outdoor area.', cover:yardAfter2, photos:[yardBefore, yardDuring, yardAfter, yardAfter2] },
  { title:'Deck repair', summary:'Repair work from progress through the finished result.', cover:deckAfter, photos:[deckBefore, deckDuring, deckAfter] },
  { title:'Tile and shower work', summary:'Interior tile and shower improvement work.', cover:shower, photos:[shower] },
  { title:'Home repair work', summary:'Hands-on repair work in progress.', cover:concrete, photos:[concrete] }
];

function App(){
 const [open,setOpen]=React.useState(false);
 const [formStatus,setFormStatus]=React.useState('idle');
 const [formMessage,setFormMessage]=React.useState('');
 const [lightbox,setLightbox]=React.useState(null);
 const [selectedPhotos,setSelectedPhotos]=React.useState([]);

 React.useEffect(() => {
   if (!lightbox) return;
   const onKeyDown = (event) => {
     if (event.key === 'Escape') setLightbox(null);
     if (event.key === 'ArrowLeft') changeLightboxPhoto(-1);
     if (event.key === 'ArrowRight') changeLightboxPhoto(1);
   };
   document.body.classList.add('modalOpen');
   window.addEventListener('keydown', onKeyDown);
   return () => {
     document.body.classList.remove('modalOpen');
     window.removeEventListener('keydown', onKeyDown);
   };
 }, [lightbox]);

 function changeLightboxPhoto(direction){
   setLightbox((current) => {
     if (!current) return current;
     const total = projects[current.projectIndex].photos.length;
     return { ...current, photoIndex:(current.photoIndex + direction + total) % total };
   });
 }

 function choosePhotos(event){
   const incoming = Array.from(event.target.files || []);
   const available = Math.max(0, 3 - selectedPhotos.length);
   const accepted = incoming.filter((file) => file.type.startsWith('image/')).slice(0, available);
   setSelectedPhotos((current) => [...current, ...accepted.map((file) => ({ file, preview:URL.createObjectURL(file) }))]);
   event.target.value = '';
 }

 function removePhoto(index){
   setSelectedPhotos((current) => {
     URL.revokeObjectURL(current[index].preview);
     return current.filter((_, photoIndex) => photoIndex !== index);
   });
 }

 async function submitEstimate(event){
   event.preventDefault();
   setFormStatus('sending');
   setFormMessage('');
   const form = event.currentTarget;
   const formData = new FormData(form);
   selectedPhotos.forEach(({ file }) => formData.append('Project photos[]', file));

   try {
     const response = await fetch('https://formsubmit.co/ajax/reiderhomeservices@gmail.com', {
       method: 'POST',
       headers: { Accept: 'application/json' },
       body: formData
     });
     const result = await response.json();
     if (!response.ok || result.success === false) throw new Error('Submission failed');
     form.reset();
     selectedPhotos.forEach((photo) => URL.revokeObjectURL(photo.preview));
     setSelectedPhotos([]);
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
             <div className='sideBySideCompare' aria-label='Outdoor project before and after photos'>
               <figure><span>BEFORE</span><img src={yardBefore} alt='Outdoor area before the improvement work' /></figure>
               <figure><span>AFTER</span><img src={yardAfterComparison} alt='Outdoor area after the improvement work' /></figure>
             </div>
             <div className='compareCopy'>
               <p className='eyebrow'>BEFORE → AFTER</p>
               <h3>Outdoor transformation</h3>
               <p>Compare the full project photos side by side, from the overgrown starting point to the cleared and finished space.</p>
             </div>
           </div>
           <div className='projectGallery'>
             {projects.map((project, projectIndex) => (
               <button className='projectCard' key={project.title} type='button' onClick={() => setLightbox({ projectIndex, photoIndex:0 })}>
                 <span className='projectImage'><img src={project.cover} alt='' /><span>{project.photos.length} {project.photos.length === 1 ? 'photo' : 'photos'}</span></span>
                 <span className='projectCardCopy'><strong>{project.title}</strong><small>{project.summary}</small><em>View project <ArrowRight size={16} /></em></span>
               </button>
             ))}
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
       <section className='reviewsSection' id='reviews'>
         <div className='section reviewsInner'>
           <div className='sectionHead reviewsHead'>
             <p className='eyebrow blue'>CUSTOMER REVIEWS</p>
             <h2>What customers are saying.</h2>
             <p>We’re beginning to collect feedback from completed projects.</p>
           </div>
           <div className='reviewsEmpty'>
             <div className='reviewStars' aria-hidden='true'>★★★★★</div>
             <h3>Reviews coming soon</h3>
             <p>Had work completed by Reider Home Services? We’d be glad to hear about your experience.</p>
             <a className='textLink blueLink' href='mailto:reiderhomeservices@gmail.com?subject=Reider%20Home%20Services%20review'>Share your feedback <ArrowRight size={18} /></a>
           </div>
         </div>
       </section>
       <section className='contact' id='contact'>
         <div className='contactInner'>
           <div className='contactIntro'>
             <p className='eyebrow blue'>REQUEST AN ESTIMATE</p>
             <h2>Tell us about your project.</h2>
             <p>Share a few details and Chris will follow up to discuss the work, timing, and next steps. You don't need to know exactly what the repair requires — just tell us what you're seeing.</p>
             <div className='availabilityCard'>
               <Clock3 />
               <div><strong>Scheduling and availability</strong><p>Chris reviews each request personally. Availability depends on the type of work and project location, and scheduling is confirmed during follow-up. Submitting this form does not create an appointment.</p></div>
             </div>
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
               <label className='fullField fileField'>Add photos <small>(optional, up to 3)</small><input type='file' accept='image/jpeg,image/png,image/webp' multiple onChange={choosePhotos} disabled={selectedPhotos.length >= 3} /></label>
               {selectedPhotos.length > 0 && <div className='fullField photoPreviews' aria-label='Selected project photos'>{selectedPhotos.map((photo,index) => <figure key={photo.preview}><img src={photo.preview} alt={`Selected project photo ${index + 1}`} /><button type='button' onClick={() => removePhoto(index)} aria-label={`Remove selected photo ${index + 1}`}><Trash2 size={16} /></button><figcaption>{photo.file.name}</figcaption></figure>)}</div>}
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
     {lightbox && (
       <div className='lightbox' role='dialog' aria-modal='true' aria-label={`${projects[lightbox.projectIndex].title} photo gallery`} onMouseDown={(event) => { if (event.target === event.currentTarget) setLightbox(null); }}>
         <button className='lightboxClose' type='button' onClick={() => setLightbox(null)} aria-label='Close gallery'><X /></button>
         <div className='lightboxContent'>
           <img src={projects[lightbox.projectIndex].photos[lightbox.photoIndex]} alt={`${projects[lightbox.projectIndex].title}, photo ${lightbox.photoIndex + 1} of ${projects[lightbox.projectIndex].photos.length}`} />
           <div className='lightboxCaption'><div><strong>{projects[lightbox.projectIndex].title}</strong><span>Photo {lightbox.photoIndex + 1} of {projects[lightbox.projectIndex].photos.length}</span></div></div>
         </div>
         {projects[lightbox.projectIndex].photos.length > 1 && <><button className='lightboxNav previous' type='button' onClick={() => changeLightboxPhoto(-1)} aria-label='Previous photo'><ChevronLeft /></button><button className='lightboxNav next' type='button' onClick={() => changeLightboxPhoto(1)} aria-label='Next photo'><ChevronRight /></button></>}
       </div>
     )}
       <Analytics />
   </>
 );
}
createRoot(document.getElementById('root')).render(<App/>);
