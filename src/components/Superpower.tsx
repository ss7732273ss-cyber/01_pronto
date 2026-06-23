import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, RefreshCw, AlertTriangle, CheckCircle, ShieldAlert, Zap, Compass, HelpCircle } from 'lucide-react';

export default function Superpower() {
  const [viewMode, setViewMode] = useState<'silo' | 'system'>('system');
  const [selectedIssue, setSelectedIssue] = useState<string | null>('reports');

  const symptoms = [
    {
      id: 'reports',
      label: 'Ошибки в отчетах',
      siloExplanation: 'Руководитель нанимает дорогого аудитора или увольняет экономиста, чтобы пересчитать таблицы вручную. Но в следующем месяце цифры снова «ползут» и не сходятся.',
      systemExplanation: 'Отчеты врут, потому что нет первичных регламентов. Данные вводятся сотрудниками неодновременно, закупки и склад используют разные классификаторы номенклатур.',
      linkages: ['Люди', 'Процессы', 'Данные']
    },
    {
      id: 'it',
      label: 'Программы виснут / не внедряются',
      siloExplanation: 'Руководитель винит программистов 1С, покупает дорогое ПО, меняет подрядчика. Деньги уходят, автоматизации нет, в базах по-прежнему каша.',
      systemExplanation: 'Попытка автоматизировать хаос. 1С не заработает, пока процессы не описаны «на бумаге», а у каждого процесса в программе не закреплен четкий владелец роли.',
      linkages: ['Процессы', 'Люди', 'Учет']
    },
    {
      id: 'employees',
      label: 'Сотрудники саботируют регламенты',
      siloExplanation: 'Вводится штрафная сетка, усложняется KPI, проводятся еженедельные гневные летучки. Результат: резкий рост текучки кадров и тихий саботаж.',
      systemExplanation: 'У людей размыты обязанности. Задачи падают в общие чаты, сотрудники не понимают конечного получателя их данных, отчетность воспринимается ими как карательная мера.',
      linkages: ['Люди', 'Процессы', 'УПРАВЛЯЕМОСТЬ']
    },
    {
      id: 'budgets',
      label: 'Хронический дефицит бюджетов',
      siloExplanation: 'Отдел продаж получает выговоры, урезаются мелкие расходы, увольняют ассистентов. Бизнес сжимается, но кассовые разрывы сохраняются.',
      systemExplanation: 'Отсутствует реестр заявок на платежи и платежный календарь. Деньги со счетов уходят хаотично, без увязки с фактической маржинальностью и оборачиваемостью складов.',
      linkages: ['Бизнес', 'Учет', 'Данные']
    }
  ];

  const currentIssue = symptoms.find(s => s.id === selectedIssue) || symptoms[0];

  return (
    <section id="superpower" className="py-24 bg-[#FCFBFE] border-t border-b border-zinc-200/60 relative">
      <div className="absolute inset-0 bg-purple-50/20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-mono text-[10px] font-black text-purple-700 bg-purple-100 border border-purple-250 px-3 py-1 rounded-sm uppercase tracking-wider inline-block">
            КЛЮЧЕВАЯ ОСОБЕННОСТЬ ЭКСПЕРТА
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Моя суперсила — видеть конструкцию бизнеса целиком
          </h2>
          <p className="font-sans text-zinc-650 text-sm sm:text-base leading-relaxed">
            Большинство консультантов лечат локальные симптомы: заменяют программу, пересчитывают бюджеты или пытаются мотивировать сотрудников. Я нахожу истинные корни проблем в <strong className="text-zinc-900">связях</strong> между процессами, людьми и цифрами.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="inline-flex bg-zinc-200/50 p-1 rounded-full border border-zinc-200/75 mb-12">
          <button
            onClick={() => setViewMode('silo')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-350 ${
              viewMode === 'silo'
                ? 'bg-rose-100 text-rose-800 border-rose-200 shadow-sm'
                : 'text-zinc-550 hover:text-zinc-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Фрагментарный взгляд</span>
          </button>
          
          <button
            onClick={() => setViewMode('system')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-350 ${
              viewMode === 'system'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-zinc-550 hover:text-zinc-800'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Системный взгляд Светланы</span>
          </button>
        </div>

        {/* Interactive Matrix Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Left Symptoms Picker Side (5 columns) */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block mb-2 font-bold">
                КЛИКНИТЕ НА СИМПТОМ ДЛЯ ПОДРОБНОГО РАЗБОРА:
              </span>
              <div className="space-y-2.5">
                {symptoms.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedIssue(item.id)}
                    className={`w-full p-4 rounded-sm text-left border transition-all duration-200 group flex items-center justify-between cursor-pointer ${
                      selectedIssue === item.id
                        ? viewMode === 'silo'
                          ? 'bg-rose-50/50 border-rose-300 text-rose-950 shadow-sm'
                          : 'bg-purple-50 border-purple-300 text-purple-950 font-bold shadow-sm'
                        : 'bg-white border-zinc-200/80 text-zinc-650 hover:border-purple-200 hover:text-zinc-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {viewMode === 'silo' ? (
                        <AlertTriangle className={`w-4 h-4 shrink-0 transition-transform ${selectedIssue === item.id ? 'text-rose-500 scale-110' : 'text-zinc-400'}`} />
                      ) : (
                        <Network className={`w-4 h-4 shrink-0 transition-transform ${selectedIssue === item.id ? 'text-purple-600 scale-110 rotate-45' : 'text-zinc-400'}`} />
                      )}
                      <span className="font-sans font-semibold text-xs sm:text-sm">{item.label}</span>
                    </div>
                    {selectedIssue === item.id && (
                      <span className={`w-1.5 h-1.5 rounded-full ${viewMode === 'silo' ? 'bg-rose-500' : 'bg-purple-600 animate-ping'}`}></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Explanatory footer tag */}
            <div className="mt-6 p-4 bg-white border border-zinc-200/80 rounded-sm font-mono text-[11px] text-zinc-500 flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-500/80 shrink-0" />
              <span>Я не просто внедряю программы — я выстраиваю рабочие связки. Выберите любой пункт, чтобы увидеть разницу.</span>
            </div>
          </div>

          {/* Right Detailed Analysis Board (7 columns) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode === 'silo' ? `silo-${selectedIssue}` : `system-${selectedIssue}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className={`h-full border rounded-sm p-6 md:p-8 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden ${
                  viewMode === 'silo'
                    ? 'bg-rose-50/20 border-rose-200/80'
                    : 'bg-white border-purple-200/60 shadow-[0_4px_25px_rgba(124,58,237,0.03)]'
                }`}
              >
                {/* Visual background aura */}
                <div className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl -mr-12 -mt-12 transition-colors duration-500 -z-10 ${
                  viewMode === 'silo' ? 'bg-rose-100/30' : 'bg-purple-100/30'
                }`}></div>

                {/* Anatomy Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase">
                      АНАТОМИЯ КЛИНИЧЕСКОГО СЛУЧАЯ:
                    </span>
                    <span className={`font-mono text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm ${
                      viewMode === 'silo' ? 'bg-rose-100 text-rose-800 border border-rose-200/60' : 'bg-purple-100 text-purple-800 border border-purple-200'
                    }`}>
                      {viewMode === 'silo' ? 'Локальное латание дыр' : 'Системная архитектура'}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                    {currentIssue.label}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-zinc-700 leading-relaxed pt-2">
                    {viewMode === 'silo' ? currentIssue.siloExplanation : currentIssue.systemExplanation}
                  </p>
                </div>

                {/* Sub-results / Linkage Dashboard */}
                <div className="mt-8 pt-6 border-t border-zinc-150">
                  {viewMode === 'silo' ? (
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] text-rose-600 uppercase font-bold tracking-wider">РИСКИ И ПОВТОРЯЮЩИЕСЯ ИЗДЕРЖКИ:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-650">
                        <div className="flex items-center space-x-2 bg-rose-50/40 p-2.5 rounded-sm border border-rose-100/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                          <span>Постоянная раздувка ФОТ</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-rose-50/40 p-2.5 rounded-sm border border-rose-100/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                          <span>Выгорание и увольнения кадров</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-rose-50/40 p-2.5 rounded-sm border border-rose-100/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                          <span>Принятие решений по интуиции</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-rose-50/40 p-2.5 rounded-sm border border-rose-100/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                          <span>Хаос в ИТ-базах становится вечным</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] text-purple-700 uppercase font-bold tracking-wider">СОЕДИНЯЕМЫЕ НОДЫ:</span>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {currentIssue.linkages.map((link) => (
                          <div
                            key={link}
                            className="flex items-center space-x-1.5 bg-purple-50 px-3 py-1.5 rounded-sm border border-purple-200 text-purple-800 font-bold"
                          >
                            <Zap className="w-3.5 h-3.5 text-purple-600" />
                            <span className="font-sans font-medium">{link}</span>
                          </div>
                        ))}
                        <div className="flex items-center space-x-1.5 bg-emerald-50 px-3 py-1.5 rounded-sm border border-emerald-200 text-emerald-800 font-semibold uppercase tracking-wider text-[10px]">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Полный баланс</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
