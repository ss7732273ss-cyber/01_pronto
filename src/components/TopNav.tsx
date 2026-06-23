import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Layers, Settings, FileText, Compass, Send } from 'lucide-react';

interface TopNavProps {
  showConcept: boolean;
  setShowConcept: (show: boolean) => void;
}

export default function TopNav({ showConcept, setShowConcept }: TopNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', name: 'Главная' },
    { id: 'superpower', name: 'Системный подход' },
    { id: 'companies', name: 'Для кого' },
    { id: 'services', name: 'Услуги' },
    { id: 'approach', name: 'Мой подход' },
    { id: 'cases', name: 'Кейсы' },
    { id: 'about', name: 'Обо мне' },
    { id: 'faq', name: 'Вопросы' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section detection
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-purple-100 py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-sm bg-gradient-to-br from-violet-600 to-fuchsia-500 border border-violet-200/50 shadow-inner">
              <span className="font-sans text-lg font-bold text-white tracking-widest">СК</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-semibold text-zinc-900 tracking-tight leading-tight text-sm sm:text-base">
                Светлана Колтышева
              </span>
              <span className="font-mono text-[10px] text-violet-600 tracking-wider uppercase leading-none font-bold">
                System Architect & CFO
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-sm text-xs font-semibold tracking-wider transition-all duration-200 uppercase ${
                  activeSection === item.id
                    ? 'bg-purple-100/70 text-purple-800 border border-purple-250 shadow-sm font-bold'
                    : 'text-zinc-650 hover:text-purple-700 hover:bg-purple-50/50 border border-transparent'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {/* Concept UI toggle */}
            <button
              id="concept-explain-toggle"
              onClick={() => setShowConcept(!showConcept)}
              className={`hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold tracking-wide border transition-all duration-300 ${
                showConcept
                  ? 'bg-purple-600 text-white border-purple-500 shadow-[0_1px_10px_rgba(124,58,237,0.15)] hover:bg-purple-700'
                  : 'bg-zinc-100/80 text-purple-700 border-purple-200/60 hover:bg-purple-50'
              }`}
              title="Открыть аналитическую карту UX/UI и структуры"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showConcept ? 'Скрыть UX-Концепт' : 'UX-Концепт проекта'}</span>
            </button>

            {/* Quick Action button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:flex items-center space-x-1 border border-purple-600 text-purple-600 text-xs font-bold uppercase tracking-tighter hover:bg-purple-600 hover:text-white px-5 py-2 rounded-sm transition-all shadow-sm active:scale-95"
            >
              <span>Обсудить проект</span>
              <Send className="w-3 h-3 ml-0.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg border border-zinc-200 text-zinc-550 hover:text-purple-750 hover:bg-purple-50 xl:hidden transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="xl:hidden bg-white border-b border-zinc-200"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium tracking-wide uppercase transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-50 text-purple-800 border-l-2 border-purple-600 pl-4 font-bold'
                        : 'text-zinc-550 hover:text-purple-750 hover:bg-purple-50 pl-3'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-3 border-t border-zinc-150 flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      scrollToSection('contact');
                    }}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-750 text-white rounded-sm text-xs font-bold uppercase tracking-widest text-center border border-purple-600 transition-all font-sans"
                  >
                    Бесплатная консультация
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
