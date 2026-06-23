import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ClipboardCheck, ArrowRight, Activity, Cpu, SlidersHorizontal, Settings, FileSearch, Sparkles, CheckSquare } from 'lucide-react';

interface DiagnosticWidgetProps {
  onDiagnosticComplete: (summary: string) => void;
}

export default function DiagnosticWidget({ onDiagnosticComplete }: DiagnosticWidgetProps) {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState('');
  const [bottleneck, setBottleneck] = useState('');
  const [scale, setScale] = useState('');
  const [showResult, setShowResult] = useState(false);

  const industries = [
    { id: 'construction', name: 'Строительство / Девелопмент' },
    { id: 'logistics', name: 'Логистика / Цепочки поставок' },
    { id: 'manufacturing', name: 'Производство' },
    { id: 'engineering', name: 'Инжиниринг / Услуги' },
    { id: 'holding', name: 'Группы компаний / Холдинг' },
  ];

  const bottlenecks = [
    { id: 'excel_hell', name: '«Excel-болото» / Огромный объем ручной работы и файлов' },
    { id: 'cash_gaps', name: 'Кассовые разрывы / Непонятно, есть ли реальная прибыль' },
    { id: 'chaos', name: 'Хаос в головах сотрудников / Постоянный саботаж и текучка кадров' },
    { id: 'it_failure', name: 'Проблемы с 1С или ERP / Внедрение буксует, нет пользы' },
    { id: 'ceo_burnout', name: 'Собственник завяз в операционке и тушит пожары 24/7' },
  ];

  const scales = [
    { id: 'small', name: 'До 50 человек (Компактный бизнес)' },
    { id: 'medium', name: 'От 50 до 250 человек (Средний проектный бизнес)' },
    { id: 'large', name: 'Более 250 человек / Холдинговая структура' },
  ];

  const generateReport = () => {
    setShowResult(true);
  };

  const resetForm = () => {
    setIndustry('');
    setBottleneck('');
    setScale('');
    setStep(1);
    setShowResult(false);
  };

  const getCustomReportDetails = () => {
    let risks = ['Потеря контроля прибыльности по отдельным сделкам', 'Риск затоваривания складских остатков у поставщиков'];
    let earlyActions = ['Проведение аудита справочников 1С и классификаторов', 'Внедрение платежного календаря на 14 дней вперед'];
    let suggestedService = 'Диагностика системы управления компанией';

    if (industry === 'holding' || scale === 'large') {
      risks = ['Искажение налогового планирования по НДС', 'Слепое перераспределение денежных потоков без учета холдинговой маржинальности'];
      earlyActions = ['Разработка сквозных регламентов для всех 3+ юрлиц холдинга', 'Создание консолидированного баланса'];
      suggestedService = 'Архитектура данных и отчётности холдингов';
    } else if (bottleneck === 'excel_hell') {
      risks = ['Особая задержка сбора первичной отчетности до 20 дней', 'Человеческий фактор: высокий риск случайных ошибок ввода'];
      earlyActions = ['Описание сквозного бизнес-процесса закупки и склада на бумаге', 'Исключение дублей за счет фиксации ролей'];
      suggestedService = 'Построение управленческого учёта & Автоматизация';
    } else if (bottleneck === 'it_failure') {
      risks = ['Размывание сметы разработчиков ПО до 200%', 'Нецелевое использование дорогого функционала ERP'];
      earlyActions = ['Приостановка хаотичных правок кода 1С', 'Написание ТЗ для внедренцев на базе ваших регламентов'];
      suggestedService = 'Подготовка ТЗ на автоматизацию';
    }

    return { risks, earlyActions, suggestedService };
  };

  const reportDetails = getCustomReportDetails();

  const handleSyncToForm = () => {
    const selectedInd = industries.find(i => i.id === industry)?.name || 'Не заполнено';
    const selectedBott = bottlenecks.find(b => b.id === bottleneck)?.name || 'Не заполнено';
    const selectedSc = scales.find(s => s.id === scale)?.name || 'Не заполнено';

    const textToSync = `Отрасль: ${selectedInd}. Bottleneck: ${selectedBott}. Скейл: ${selectedSc}. Услуга: ${reportDetails.suggestedService}`;
    onDiagnosticComplete(textToSync);

    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="companies" className="py-24 bg-[#FCFBFE] border-b border-zinc-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-mono text-[10px] font-black text-purple-700 bg-purple-100 border border-purple-250 px-3 py-1 rounded-sm uppercase tracking-wider inline-block">
            БИЗНЕС-ДИАГНОСТИКА ОНЛАЙН
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Экспресс-тест структуры вашей компании
          </h2>
          <p className="font-sans text-zinc-650 text-sm sm:text-base leading-relaxed">
            Пройдите короткую автоматическую диагностику системных ограничений вашего бизнеса.
            Определите риски до того, как они приведут к кассовому разрыву или бесполезным вложениям в 1С.
          </p>
        </div>

        {/* Diagnostic Panel Console */}
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-sm border border-zinc-200 shadow-xl relative">
          
          <div className="flex items-center justify-between border-b border-zinc-150 pb-4 mb-8">
            <div className="flex items-center space-x-2.5">
              <Activity className="w-5 h-5 text-purple-650 shrink-0" />
              <span className="font-mono text-xs text-zinc-800 font-bold tracking-wider">МОДУЛЬ ЭКСПРЕСС-АНАЛИЗА БИЗНЕСА</span>
            </div>
            {!showResult && (
              <div className="flex items-center space-x-1 font-mono text-[10px] text-zinc-450 font-black">
                <span>ЭТАП {step} ИЗ 3</span>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-left space-y-6"
              >
                {/* Step 1: Industry */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-sans text-lg font-bold text-zinc-900 tracking-tight">
                      1. В какой отрасли работает ваша компания?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {industries.map((ind) => (
                        <button
                          key={ind.id}
                          onClick={() => {
                            setIndustry(ind.id);
                            setStep(2);
                          }}
                          className={`p-4 rounded-sm text-left border font-semibold text-xs transition-all cursor-pointer ${
                            industry === ind.id
                              ? 'bg-purple-550 border-purple-600 text-white font-bold shadow-md'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-650 hover:bg-purple-50/55 hover:border-purple-300 hover:text-purple-900'
                          }`}
                        >
                          {ind.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Bottleneck */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-sans text-lg font-bold text-zinc-900 tracking-tight">
                      2. Что на сегодняшний день сильнее всего мешает развитию компании?
                    </h3>
                    <div className="space-y-3 pt-2">
                      {bottlenecks.map((bott) => (
                        <button
                          key={bott.id}
                          onClick={() => {
                            setBottleneck(bott.id);
                            setStep(3);
                          }}
                          className={`w-full p-4 rounded-sm text-left border font-semibold text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                            bottleneck === bott.id
                              ? 'bg-purple-550 border-purple-600 text-white font-bold shadow-md'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-650 hover:bg-purple-50/55 hover:border-purple-300 hover:text-purple-900'
                          }`}
                        >
                          <span>{bott.name}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between pt-4">
                      <button
                        onClick={() => setStep(1)}
                        className="font-mono text-xs text-zinc-500 hover:text-purple-600 uppercase tracking-wider font-bold cursor-pointer"
                      >
                        ← Назад
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Scale */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-sans text-lg font-bold text-zinc-900 tracking-tight">
                      3. Каков текущий масштаб организации?
                    </h3>
                    <div className="space-y-3 pt-2">
                      {scales.map((sc) => (
                        <button
                          key={sc.id}
                          onClick={() => setScale(sc.id)}
                          className={`w-full p-4 rounded-sm text-left border font-semibold text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                            scale === sc.id
                              ? 'bg-purple-550 border-purple-650 text-white font-bold shadow-md'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-650 hover:bg-purple-50/55 hover:border-purple-300 hover:text-purple-900'
                          }`}
                        >
                          <span>{sc.name}</span>
                          {scale === sc.id && <span className="w-2 h-2 rounded-full bg-white"></span>}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-8">
                      <button
                        onClick={() => setStep(2)}
                        className="font-mono text-xs text-zinc-500 hover:text-purple-600 uppercase tracking-wider font-bold cursor-pointer"
                      >
                        ← Назад
                      </button>
                      {scale && (
                        <button
                          onClick={generateReport}
                          className="flex items-center space-x-2 bg-gradient-to-br from-purple-650 to-indigo-600 border border-purple-500 text-white font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                        >
                          <span>Сформировать отчет</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-left space-y-6"
              >
                {/* Result header */}
                <div className="bg-purple-50 p-4 border border-purple-200 rounded-sm flex items-start gap-4 animate-fade-in">
                  <div className="p-2.5 rounded-sm bg-purple-100 border border-purple-250 shrink-0">
                    <Sparkles className="w-5 h-5 text-purple-600 rotate-12" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-zinc-950 text-base leading-none mb-1">
                      Аналитический экспресс-отчёт построен
                    </h4>
                    <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                      Автоматическая диагностическая спецификация структурирована по вашим исходным данным.
                    </p>
                  </div>
                </div>

                {/* Risks & Recommendations details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* Column 1: Bottlenecks / Risks */}
                  <div className="space-y-3.5">
                    <span className="font-mono text-[9px] text-rose-600 uppercase tracking-widest block font-bold">
                      ИДЕНТИФИЦИРОВАННЫЕ СКРЫТЫЕ РИСКИ:
                    </span>
                    <div className="space-y-2 text-xs">
                      {reportDetails.risks.map((risk, i) => (
                        <div key={i} className="flex items-start space-x-2.5 bg-rose-50/45 p-3.5 rounded-sm border border-rose-150 text-rose-950">
                          <span className="text-rose-500 font-bold shrink-0">⚠</span>
                          <span className="font-sans leading-relaxed">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Architect Early Actions */}
                  <div className="space-y-3.5">
                    <span className="font-mono text-[9px] text-purple-700 uppercase tracking-widest block font-bold">
                      ПЕРВЫЕ РЕКОМЕНДУЕМЫЕ ШАГИ:
                    </span>
                    <div className="space-y-2 text-xs">
                      {reportDetails.earlyActions.map((action, i) => (
                        <div key={i} className="flex items-start space-x-2.5 bg-zinc-50 p-3.5 rounded-sm border border-zinc-200 text-zinc-700">
                          <span className="text-purple-600 font-bold shrink-0">✔</span>
                          <span className="font-sans leading-relaxed">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Action CTA panel inside widget */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-5 mt-6 flex flex-col md:flex-row items-center justify-between gap-5">
                  <div className="space-y-1 text-left w-full">
                    <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest block font-bold">РЕКОМЕНДОВАННАЯ КОРНЕВАЯ УСЛУГА:</span>
                    <span className="font-sans font-bold text-zinc-900 text-sm sm:text-base tracking-tight block">
                      {reportDetails.suggestedService}
                    </span>
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto">
                    <button
                      onClick={resetForm}
                      className="px-5 py-3 rounded-sm border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 font-mono text-xs uppercase tracking-wider transition-colors shrink-0 font-bold cursor-pointer"
                    >
                      Сбросить ↺
                    </button>
                    <button
                      onClick={handleSyncToForm}
                      className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-2 bg-gradient-to-br from-purple-600 to-indigo-650 border border-purple-500 text-white font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Обсудить со Светланой</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
