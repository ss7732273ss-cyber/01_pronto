import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, HelpCircle, Target, Briefcase, ChevronRight, Sparkles, SlidersHorizontal, CheckSquare } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [activeServiceId, setActiveServiceId] = useState('diagnostic');

  const services: ServiceItem[] = [
    {
      id: 'diagnostic',
      title: 'Диагностика системы управления компанией',
      problem: 'Собственник не понимает реальную рентабельность, много споров в команде, решения принимаются «наощупь» или по интуиции.',
      result: 'Выявленные ограничения и узкие горлышки, оцифрованная текущая карта процессов и финансовая диагностическая карта.',
      format: 'Серия глубинных интервью со всеми руководителями ключевых отделов, аудит базы 1С и файлов управленческого учета.',
      effect: 'Экономия сотен часов собственника, выявление скрытых потерь, наведение ясности перед планированием масштабирования.',
      metrics: ['Нахождение скрытых потерь', 'Аудит файлов', 'Интервью топ-менеджмента']
    },
    {
      id: 'accounting',
      title: 'Построение управленческого учёта',
      problem: 'Прибыль «на бумаге» вроде есть, а денег на выплату дивидендов и на закупку сырья постоянно не хватает.',
      result: 'Регламент управленческой отчетности, ОПиУ (прибыли и убытки), ДДС (движение денег), Баланс, адаптированные под вас.',
      format: 'Проектирование архитектуры учета, разработка справочников статей, внедрение регламентов сбора первичных данных.',
      effect: 'Появление 100% достоверной информации о чистой прибыли, защита от внезапного банкротства и кассовых разрывов.',
      metrics: ['Баланс под ключ', 'Управленческая прибыль', 'Защита от разрывов']
    },
    {
      id: 'budgeting',
      title: 'Бюджетирование и планирование',
      problem: 'Хаотичные траты отделов, несогласованное раздувание бюджетов, отсутствие контроля исполнения финансовых целей.',
      result: 'Инструмент БДР (бюджет доходов и расходов), БДДС, лимиты расходов, согласованный платежный календарь компании.',
      format: 'Разработка финансовой структуры (ЦФО), внедрение регламента планирования и жесткого контроля план-факт анализа.',
      effect: 'Предсказуемость бизнеса на 6-12 месяцев вперед, прекращение бесконтрольного слива бюджетов и денежных средств.',
      metrics: ['План-факт анализ', 'Платежный календарь', 'Контроль лимитов']
    },
    {
      id: 'outsourced-cfo',
      title: 'Финансовый директор на аутсорсе',
      problem: 'Штатный экономист умеет только сводить прошлые факты, но не умеет влиять на прибыль и строить стратегии развития.',
      result: 'Регулярная финансовая аналитика, готовые гипотезы роста прибыли, еженедельный контроль бюджетов, оцифрованная окупаемость.',
      format: 'Полноценное участие в еженедельных советах директоров, финансовое сопровождение ключевых решений бизнеса и проектов.',
      effect: 'Получение высококлассной компетенции уровня ТОП за фракционную стоимость штатного финансового директора.',
      metrics: ['Сопровождение сделок', 'Гипотезы роста прибыли', 'Вторая голова для CEO']
    },
    {
      id: 'automation',
      title: 'Автоматизация управленческого учёта',
      problem: 'Сотрудники тратят 70% времени на ручной перенос цифр из Excel в Excel, регулярные дубли и искажения данных.',
      result: 'Автоматизированный сбор отчетности на базе 1С ERP, 1С УНФ или BI-панелей без ручного человеческого фактора.',
      format: 'Проектирование принципов заведения документов, перенос схем процессов в цифровое логическое ядро системы.',
      effect: 'Снижение трудозатрат на сбор отчетности с 10 дней до 2 минут. Прозрачные данные обновляются в реальном времени.',
      metrics: ['1С ERP настройка', 'BI дашборды', 'Быстрый сбор данных']
    },
    {
      id: 'data-architecture',
      title: 'Архитектура данных и отчётности',
      problem: 'Данные разрознены по разным сервисам (1С, CRM, Excel, касса). Нет единой информационной истины в компании.',
      result: 'Проектирование единой комплексной схемы движения данных, кубов аналитик и сквозных отчетов эффективности (KPI).',
      format: 'Определение единых классификаторов, связи реляционных данных и интеграция разрозненных IT-систем компании.',
      effect: 'Собственник имеет единый дашборд контроля ключевых показателей компании без необходимости копаться в 20 окнах.',
      metrics: ['Единое хранилище истины', 'Связь 1С и CRM', 'Кубы аналитики']
    },
    {
      id: 'business-analysis',
      title: 'Анализ и описание бизнес-процессов',
      problem: 'Все регламенты держатся только в головах ключевых сотрудников. При уходе специалиста процесс рушится.',
      result: 'Карта процессов верхнего уровня компании (КПВУ), регламенты ответственности BPMN 2.0 и схемы взаимодействий отделов.',
      format: 'Интервьюирование участников, описание текущего состояния «As Is» и проектирование эффективной целевой модели «To Be».',
      effect: 'Устранение дублирования функций персонала, легкий ввод новых сотрудников за 3 дня вместо 3 месяцев.',
      metrics: ['Карты BPMN 2.0', 'Устранение дублей', 'Быстрый онбординг']
    },
    {
      id: 'technical-spec',
      title: 'Подготовка ТЗ на автоматизацию',
      problem: 'Программисты 1С и IT-подрядчики делают не то, что нужно бизнесу, бесконечно затягивая сроки и раздувая смету.',
      result: 'Детализированное Техническое Задание с описанием всех процессов, пользовательских сценариев и алгоритмов расчетов.',
      format: 'Разработка технического прототипа учета и правил проведения документов, согласованных во всех отделах.',
      effect: 'Жесткая экономия до 55% бюджета на разработку за счет исключения переделок и точной оцифровки требований.',
      metrics: ['Экономия до 55% ИТ смет', 'Проверенные алгоритмы', 'Готовое задание для 1С']
    },
    {
      id: 'change-management',
      title: 'Внедрение и сопровождение изменений',
      problem: 'Новые правила, регламенты или регламентные ППО саботируются сотрудниками. Изменения буксуют годами.',
      result: 'Успешно заработавшая система регламентов, обученный персонал, отсутствие саботажа и отката в старый Excel.',
      format: 'Курирование внедрения изменений, проведение вебинаров, фасилитационные сессии, разработка чек-листов.',
      effect: 'Гарантированная окупаемость внедренных инноваций. Изменения становятся устойчивой частью ДНК компании.',
      metrics: ['Обучение сотрудников', '0% отката в Хаос', 'Устойчивые привычки']
    }
  ];

  const currentService = services.find(s => s.id === activeServiceId) || services[0];

  return (
    <section id="services" className="py-24 bg-[#FCFBFE] border-b border-zinc-200/60 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-100/20 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-4 text-center mb-16">
          <span className="font-mono text-[10px] font-black text-purple-700 bg-purple-100 border border-purple-250 px-3 py-1 rounded-sm uppercase tracking-wider inline-block">
            КАТАЛОГ СЛУЖЕБНЫХ РЕШЕНИЙ
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Экспертные услуги финансовой архитектуры
          </h2>
          <p className="font-sans text-zinc-650 text-sm sm:text-base leading-relaxed">
            От точечной экспресс-диагностики до комплексного выстраивания прозрачного финансового и процессного управления.
            Каждая услуга преследует конкретные осязаемые результаты. <strong className="text-zinc-950">Никакой теоретической воды.</strong>
          </p>
        </div>

        {/* Services interactive board wrapper */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Services left column (Selector) */}
          <div className="xl:col-span-5 space-y-1 bg-white p-3 rounded-sm border border-zinc-200 shadow-sm">
            <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block px-3 py-2 border-b border-zinc-100 mb-2.5 font-bold">
              СПИСОК ДОСТУПНЫХ УСЛУГ (КЛИКНИТЕ ДЛЯ ДЕТАЛЕЙ)
            </span>
            <div className="space-y-1 select-none">
              {services.map((serv, index) => (
                <button
                  key={serv.id}
                  onClick={() => setActiveServiceId(serv.id)}
                  className={`w-full text-left p-3 rounded-sm transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                    activeServiceId === serv.id
                      ? 'bg-purple-600 border-purple-600 text-white font-bold shadow-md'
                      : 'bg-transparent border-transparent text-zinc-600 hover:bg-purple-50 hover:text-purple-900'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <span className={`font-mono text-[10px] ${activeServiceId === serv.id ? 'text-purple-200 font-bold' : 'text-zinc-400'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-semibold truncate">
                      {serv.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activeServiceId === serv.id ? 'text-white translate-x-0.5' : 'text-zinc-400'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Service detailed view output drawer */}
          <div className="xl:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-zinc-200 rounded-sm p-6 md:p-8 flex flex-col justify-between h-auto shadow-xl relative"
              >
                {/* Decorative coordinate element */}
                <div className="absolute top-3 right-6 font-mono text-[8px] text-zinc-400 uppercase tracking-widest font-black">
                  MODULE_ID: {activeServiceId.toUpperCase()}
                </div>

                <div className="space-y-6">
                  {/* Title */}
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-purple-700 uppercase tracking-widest block font-bold">
                      ВЫБРАННАЯ СПЕЦИФИКАЦИЯ:
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight leading-snug">
                      {currentService.title}
                    </h3>
                  </div>

                  {/* 4 components listed explicitly */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    
                    {/* Problem */}
                    <div className="bg-zinc-50 p-4 rounded-sm border border-zinc-200 relative overflow-hidden">
                      <div className="absolute top-2 right-2 p-1 rounded-sm bg-white border border-zinc-200 shadow-sm">
                        <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
                      </div>
                      <span className="font-mono text-[9px] text-zinc-450 uppercase tracking-widest block mb-1 font-bold">
                        1. Проблема клиента (Боль):
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed">
                        {currentService.problem}
                      </p>
                    </div>

                    {/* Result */}
                    <div className="bg-zinc-50 p-4 rounded-sm border border-zinc-200 relative overflow-hidden">
                      <div className="absolute top-2 right-2 p-1 rounded-sm bg-white border border-zinc-200 shadow-sm">
                        <Target className="w-3.5 h-3.5 text-purple-650" />
                      </div>
                      <span className="font-mono text-[9px] text-zinc-450 uppercase tracking-widest block mb-1 font-bold">
                        2. Ожидаемый результат:
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed">
                        {currentService.result}
                      </p>
                    </div>

                    {/* Work Format */}
                    <div className="bg-zinc-50 p-4 rounded-sm border border-zinc-200 relative overflow-hidden">
                      <div className="absolute top-2 right-2 p-1 rounded-sm bg-white border border-zinc-200 shadow-sm">
                        <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                      </div>
                      <span className="font-mono text-[9px] text-zinc-450 uppercase tracking-widest block mb-1 font-bold">
                        3. Формат работы в проекте:
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed">
                        {currentService.format}
                      </p>
                    </div>

                    {/* Expected Effect */}
                    <div className="bg-purple-50/50 p-4 rounded-sm border border-purple-200/60 relative overflow-hidden">
                      <div className="absolute top-2 right-2 p-1 rounded-sm bg-white border border-purple-200 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <span className="font-mono text-[9px] text-purple-700 uppercase tracking-widest block mb-1 font-bold">
                        4. Ожидаемый бизнес-эффект (ROI):
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                        {currentService.effect}
                      </p>
                    </div>

                  </div>

                  {/* Micro metrics bullet tags */}
                  <div className="flex flex-wrap gap-2 pt-3">
                    {currentService.metrics.map((met) => (
                      <span key={met} className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-zinc-50 text-zinc-650 text-[10px] font-mono border border-zinc-200 leading-none">
                        <CheckSquare className="w-3 h-3 text-purple-600" />
                        <span>{met}</span>
                      </span>
                    ))}
                  </div>

                </div>

                {/* Return Button inside matrix block, passing specific service context */}
                <div className="mt-8 pt-6 border-t border-zinc-150 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-zinc-550">
                    <SlidersHorizontal className="w-4 h-4 text-purple-650" />
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider">ПЕРСОНАЛЬНОЕ ПРОЕКТИРОВАНИЕ ПОД ВАШ БИЗНЕС</span>
                  </div>
                  <button
                    onClick={() => onSelectService(currentService.title)}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-750 text-white font-bold px-5 py-2.5 rounded-sm transition-all text-xs uppercase tracking-wider cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <span>Запросить услугу: {currentService.title.split(' ')[0]}...</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
