import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, FileText, ArrowRight, ShieldCheck, Landmark, CheckSquare, MessageCircle, Heart, Star } from 'lucide-react';
import TopNav from './components/TopNav';
import Hero from './components/Hero';
import Superpower from './components/Superpower';
import DiagnosticWidget from './components/DiagnosticWidget';
import Services from './components/Services';
import Approach from './components/Approach';
import Cases from './components/Cases';
import Bio from './components/Bio';
import Faq from './components/Faq';
import ContactForm from './components/ContactForm';
import ConceptExplainer from './components/ConceptExplainer';

export default function App() {
  const [showConcept, setShowConcept] = useState(false);
  const [autofillText, setAutofillText] = useState('');

  // Handle service selection to fill in lead form problem
  const handleSelectService = (serviceName: string) => {
    setAutofillText(`Здравствуйте! Меня интересует услуга: «${serviceName}». Требуется обсудить условия и формат.`);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle diagnostic completion text submission
  const handleDiagnosticComplete = (summary: string) => {
    setAutofillText(`Результат экспресс-теста: ${summary}. Хочу обсудить рекомендованные первые шаги на консультации.`);
  };

  return (
    <div className="min-h-screen bg-[#FCFBFE] text-zinc-800 antialiased overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      
      {/* Top Navbar */}
      <TopNav showConcept={showConcept} setShowConcept={setShowConcept} />

      {/* Main Grid Wrapper Supporting Dual views side-by-side on desktop */}
      <div className={`flex pt-0 relative ${showConcept ? 'xl:h-screen xl:overflow-hidden' : 'min-h-screen'}`}>
        
        {/* Left Side: Dynamic Landing Site */}
        <div className={`flex-1 progression-stage scroll-smooth transition-all duration-300 ${
          showConcept 
            ? 'xl:h-full xl:overflow-y-auto xl:mr-[30%] xl:border-r border-zinc-200/80' 
            : 'min-h-screen'
        }`}>
          
          <main className="relative">
            {/* 1. Hero screen */}
            <Hero
              onStartDiagnostic={() => {
                const el = document.getElementById('companies');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onContact={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. My Superpower block */}
            <Superpower />

            {/* 3. Online Analytical Diagnostic Widget */}
            <DiagnosticWidget onDiagnosticComplete={handleDiagnosticComplete} />

            {/* 4. Interactive Services Catalog (9 items) */}
            <Services onSelectService={handleSelectService} />

            {/* 5. Anti-Chaos Approach Workflow */}
            <Approach />

            {/* 6. Cases studies browser (6 items) */}
            <Cases />

            {/* 7. Professional credentials & biographical values */}
            <Bio />

            {/* 8. Q&A Objections Accordions */}
            <Faq />

            {/* 9. Premium Lead capture form widget */}
            <ContactForm autofillText={autofillText} />
          </main>

          {/* Footer block */}
          <footer className="bg-white border-t border-zinc-200/80 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-400 flex items-center justify-center font-bold text-white text-sm border border-violet-200 shadow-sm">
                  СК
                </div>
                <div>
                  <span className="font-sans font-bold text-zinc-900 text-sm block">Светлана Колтышева</span>
                  <span className="font-mono text-[9px] text-zinc-450 block">SYSTEMS ARCHITECT & OUTSOURCED CFO © 25+ YEARS</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 font-sans text-xs text-zinc-550">
                <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-650 transition-colors">Главная</button>
                <button onClick={() => document.getElementById('superpower')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-650 transition-colors">Системный взгляд</button>
                <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-650 transition-colors">Услуги</button>
                <button onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-650 transition-colors">Кейсы</button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-650 transition-colors">Заявка</button>
              </div>

              <div className="text-center md:text-right font-sans text-[11px] text-zinc-400">
                <p className="font-semibold text-zinc-500">© {new Date().getFullYear()} Светлана Колтышева. Все права защищены.</p>
                <p className="mt-1 font-mono text-[9px] tracking-wider text-zinc-400">АРХИТЕКТОР СИСТЕМ УПРАВЛЕНИЯ & ФИНАНСОВЫЙ ДИРЕКТОР</p>
              </div>

            </div>
          </footer>

        </div>

        {/* Right Side Sliding Panel: Architecture & UX Concept Rationale (GitHub pages, mobile tips, content structures) */}
        <AnimatePresence>
          {showConcept && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="hidden xl:block fixed right-0 top-0 h-full w-[30%] z-40 shadow-2xl"
            >
              <ConceptExplainer onClose={() => setShowConcept(false)} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
