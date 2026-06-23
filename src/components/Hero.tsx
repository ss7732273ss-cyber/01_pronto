import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Activity, 
  Database, 
  Cpu, 
  Quote, 
  Shield, 
  Grid, 
  Coins, 
  CheckCircle2, 
  Award,
  Zap
} from 'lucide-react';
const imgSquare = new URL('../assets/images/svetlana_portrait_square_1781785524985.jpg', import.meta.url).href;
const imgLandscape = new URL('../assets/images/svetlana_workspace_landscape_1781785549833.jpg', import.meta.url).href;

interface HeroProps {
  onStartDiagnostic: () => void;
  onContact: () => void;
}

type HeroVariant = 'classic' | 'architect' | 'navigator';

export default function Hero({ onStartDiagnostic, onContact }: HeroProps) {
  const [activeVariant, setActiveVariant] = useState<HeroVariant>('classic');

  const variantsInfo = {
    classic: {
      badge: 'ЭКСПЕРТНЫЙ КЛАССИЧЕСКИЙ • 25+ ЛЕТ ОПЫТА',
      title: 'Системный консалтинг для зрелого бизнеса',
      subtitle: 'Навожу образцовый порядок в финансах малого и среднего бизнеса. Помогаю генеральным директорам вздохнуть свободно: формирую прозрачный учет, готовлю сильную внутреннюю команду и выстраиваю контроль над денежными потоками.',
      tagline: '«Моя цель — дать собственнику ясность, опираясь на твердые оцифрованные данные, а не на интуицию менеджеров».',
      points: [
        'Индивидуальный аудит текущего состояния учета за 7 дней',
        'Постановка управленческого учета «с нуля» под ключ',
        'Регулярное сопровождение и финансовый контроль бизнеса'
      ],
      stats: [
        { label: 'Лет личной практики', value: '25+' },
        { label: 'Чистота от инфобизнеса', value: '100%' },
        { label: 'Точность расчётов', value: '100%' }
      ],
      icon: Award,
      image: imgSquare,
      accentBg: 'bg-purple-50/70 border-purple-200/60',
      accentText: 'text-purple-700',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    architect: {
      badge: 'АРХИТЕКТОР БИЗНЕСА • СВЯЗУЮЩЕЕ ЗВЕНО',
      title: 'Бизнес как целостная и понятная система',
      subtitle: 'Я прекращаю лоскутную автоматизацию. Объединяю три главных элемента бизнеса в единый механизм: управленческие процессы, регламенты людей и базы данных (1С, ERP). Навожу порядок до программирования.',
      tagline: '«Порядок в процессах всегда предшествует сильной автоматизации. Глупо оцифровывать хаос — вы получите автоматизированный хаос».',
      points: [
        'Построение схем сквозных бизнес-процессов компании',
        'Регламентация ролей и устранение путаницы в обязанностях',
        'Проектирование ТЗ для разработчиков баз данных и систем 1С'
      ],
      stats: [
        { label: 'Регламентов внедрено', value: '400+' },
        { label: 'Спасенных ИТ-бюджетов', value: 'Десятки' },
        { label: 'Снижение хаоса', value: 'в 3 раза' }
      ],
      icon: Grid,
      image: imgLandscape,
      accentBg: 'bg-indigo-50/70 border-indigo-200/60',
      accentText: 'text-indigo-700',
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    },
    navigator: {
      badge: 'ФИНАНСОВЫЙ НАВИГАТОР • РОСТ И СТАБИЛЬНОСТЬ',
      title: 'Точные деньги для стратегических решений',
      subtitle: 'Освобождаю компанию от страхов кассовых разрывов и скрытых потерь в себестоимости. Оцифровываю реальную рентабельность сделок, нахожу мертвый капитал в складах и помогаю законно увеличить прибыль на 30–50%.',
      tagline: '«Финансы — это не учет вчерашних расходов. Это прожектор, освещающий путь для безопасных инвестиций собственника».',
      points: [
        'Проектирование и мгновенный запуск понятного отчета ДДС',
        'Глубокий анализ рентабельности товарных групп и ниш',
        'Планирование бюджетов, финансовое моделирование рисков'
      ],
      stats: [
        { label: 'Рост чистой прибыли', value: '30-50%' },
        { label: 'Старт базового ДДС', value: '14 дней' },
        { label: 'Защита от разрывов', value: 'Надёжная' }
      ],
      icon: Coins,
      image: imgSquare, // Using high quality alternative or crop
      accentBg: 'bg-fuchsia-50/70 border-fuchsia-200/60',
      accentText: 'text-fuchsia-700',
      badgeBg: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200'
    }
  };

  const current = variantsInfo[activeVariant];

  return (
    <section id="hero" className="relative pt-24 pb-16 bg-gradient-to-b from-[#FAF9FB] via-[#F6F4F8] to-[#FAF9FB] overflow-hidden">
      {/* Premium Decorative Backdrops: Air, soft lavenders, dust-lilac shades */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dynamic Selector for Three Conceptual Varieties of Svetlana's Positioning */}
        <div className="flex flex-col items-center mb-10 max-w-2xl mx-auto">
          <span className="font-mono text-[9px] font-black tracking-widest text-zinc-400 uppercase mb-3">Выберите концепцию позиционирования:</span>
          <div className="flex p-1 bg-zinc-200/70 border border-zinc-200 backdrop-blur-sm rounded-full w-full justify-between gap-1 shadow-inner">
            <button
              onClick={() => setActiveVariant('classic')}
              className={`flex-1 text-center py-2 px-3 rounded-full text-[11px] sm:text-[12px] font-bold tracking-tight uppercase transition-all duration-300 ${
                activeVariant === 'classic'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-purple-700 hover:bg-zinc-200/40'
              }`}
            >
              💼 Эксперт Классик
            </button>
            <button
              onClick={() => setActiveVariant('architect')}
              className={`flex-1 text-center py-2 px-3 rounded-full text-[11px] sm:text-[12px] font-bold tracking-tight uppercase transition-all duration-300 ${
                activeVariant === 'architect'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-indigo-700 hover:bg-zinc-200/40'
              }`}
            >
              📐 Архитектор Бизнеса
            </button>
            <button
              onClick={() => setActiveVariant('navigator')}
              className={`flex-1 text-center py-2 px-3 rounded-full text-[11px] sm:text-[12px] font-bold tracking-tight uppercase transition-all duration-300 ${
                activeVariant === 'navigator'
                  ? 'bg-fuchsia-600 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-fuchsia-700 hover:bg-zinc-200/40'
              }`}
            >
              ⚓ Фин. Навигатор
            </button>
          </div>
          <p className="font-sans text-[10px] text-zinc-500 mt-2 text-center italic">
            {activeVariant === 'classic' && 'Классический подход: 25 лет руководства финансами, глубокая твердая экспертность и высокий аудит.'}
            {activeVariant === 'architect' && 'Процессный подход: увязка баз 1С/ERP, сотрудников, ролей, регламентов и управленческого хаоса.'}
            {activeVariant === 'navigator' && 'Финансовый подход: устранение кассовых разрывов, оцифровка себестоимости и ускорение рентабельности.'}
          </p>
        </div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Narrative, copy, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVariant}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Variant Tag Badge */}
                <div className="inline-flex">
                  <span className={`font-mono text-[10px] font-black ${current.badgeBg} border px-3 py-1 rounded-sm tracking-wider`}>
                    {current.badge}
                  </span>
                </div>

                {/* Big Display Typography Headings */}
                <h1 className="font-sans text-3.5xl sm:text-4.5xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
                  {current.title}
                </h1>

                {/* Clear Narrative Description */}
                <p className="font-sans text-sm sm:text-base text-zinc-650 leading-relaxed max-w-xl">
                  {current.subtitle}
                </p>

                {/* Key Bullet Points Highlights */}
                <div className="space-y-3 pt-1">
                  {current.points.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3 text-xs sm:text-sm text-zinc-800">
                      <CheckCircle2 className="w-5 h-5 text-purple-650 shrink-0 mt-0.5" />
                      <span className="font-sans font-medium">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Quote block representing Svetlana's wisdom */}
                <div className={`p-4 border-l-4 ${current.accentBg} rounded-sm italic`}>
                  <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed">
                    {current.tagline}
                  </p>
                </div>

                {/* Dynamic Counter Showcase (Specific to variant) */}
                <div className="grid grid-cols-3 gap-3 border-t border-zinc-200/80 pt-6">
                  {current.stats.map((stat, idx) => (
                    <div key={idx} className="p-3 bg-white/70 border border-zinc-200/50 rounded-sm">
                      <span className="font-sans text-sm sm:text-base font-black text-zinc-900 block leading-tight">
                        {stat.value}
                      </span>
                      <span className="font-sans text-[10px] text-zinc-500 block leading-tight mt-1">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Direct primary interactions / Calls to action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onStartDiagnostic}
                className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-sm shadow-md transition-all hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <span>Пройти аудит-тест</span>
                <Sparkles className="w-4 h-4 text-purple-200 group-hover:rotate-12 transition-transform" />
              </button>

              <button
                onClick={onContact}
                className="flex items-center justify-center space-x-1.5 border border-purple-200 bg-white hover:bg-purple-50 text-zinc-800 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-sm transition-colors active:scale-98 cursor-pointer"
              >
                <span>Обсудить задачу</span>
                <ArrowRight className="w-4 h-4 text-purple-500" />
              </button>
            </div>
          </div>

          {/* Right Block: Expert portrait structure */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Visual background aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-indigo-100/50 rounded-[40px] rotate-3 opacity-60 blur-sm pointer-events-none"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeVariant}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="relative w-full max-w-sm sm:max-w-md bg-white p-4 border border-zinc-200 shadow-xl rounded-sm z-10"
              >
                {/* Image of Svetlana Viktorovna */}
                <div className="relative overflow-hidden aspect-[4/3] sm:aspect-square bg-zinc-100 border border-zinc-200/80 mb-4 rounded-sm">
                  <img
                    src={current.image}
                    alt="Светлана Викторовна Колтышева - Консультант и Финансовый Директор"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top animate-fade-in hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent h-12"></div>
                </div>

                {/* Persona labels block */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-sans font-black text-zinc-950 text-sm sm:text-base tracking-tight leading-tight">
                      Светлана В. Колтышева
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-500 leading-none mt-1">
                      СИСТЕМНЫЙ CFO & АРХИТЕКТОР РЕШЕНИЙ
                    </p>
                  </div>
                  <div className="bg-purple-50 px-2 py-1 rounded-sm border border-purple-200 flex items-center space-x-1 font-mono text-[9px] text-purple-700 font-black leading-none">
                    <Zap className="w-3 h-3 text-purple-500 fill-purple-200" />
                    <span>25 YEARS</span>
                  </div>
                </div>
                
                {/* Floating credential block as design signature */}
                <div className="mt-3 p-3 bg-zinc-50/85 border border-zinc-150 rounded-sm font-mono text-[9px] sm:text-[10px] text-zinc-600 leading-normal flex items-center space-x-2">
                  <div className="p-1 rounded-sm bg-purple-100 text-purple-700 shrink-0">
                    <Activity className="w-3 h-3" />
                  </div>
                  <span>Отрасли: строительство, логистика, производство, холдинги.</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick floating trust badge from reference */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white py-3 px-4 rounded-sm border border-zinc-200/80 shadow-lg z-20 flex items-center space-x-2 max-w-[180px] animate-bounce-slow">
              <span className="text-xl sm:text-2xl">🤝</span>
              <div className="flex flex-col font-sans">
                <span className="text-[11px] font-bold text-zinc-900 leading-tight">Ваш соратник в бизнесе</span>
                <span className="text-[9px] text-zinc-500 leading-tight">Отношения на равных</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
