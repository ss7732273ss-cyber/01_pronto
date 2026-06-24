import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Activity, ArrowRight, Check, Sparkles } from 'lucide-react';

interface DiagnosticWidgetProps {
  onDiagnosticComplete: (summary: string) => void;
}

const INDUSTRIES = [
  { id: 'construction', name: 'Строительство / Девелопмент' },
  { id: 'logistics', name: 'Логистика / Цепочки поставок' },
  { id: 'manufacturing', name: 'Производство' },
  { id: 'engineering', name: 'Инжиниринг / Услуги' },
  { id: 'holding', name: 'Группы компаний / Холдинг' },
] as const;

const BOTTLENECKS = [
  { id: 'excel_hell', name: '«Excel-болото» / Огромный объём ручной работы и файлов' },
  { id: 'cash_gaps', name: 'Кассовые разрывы / Непонятно, есть ли реальная прибыль' },
  { id: 'chaos', name: 'Хаос в головах сотрудников / Постоянный саботаж и текучка кадров' },
  { id: 'it_failure', name: 'Проблемы с 1С или ERP / Внедрение буксует, нет пользы' },
  { id: 'ceo_burnout', name: 'Собственник завяз в операционке и тушит пожары 24/7' },
] as const;

const SCALES = [
  { id: 'small', name: 'До 50 человек (Компактный бизнес)' },
  { id: 'medium', name: 'От 50 до 250 человек (Средний проектный бизнес)' },
  { id: 'large', name: 'Более 250 человек / Холдинговая структура' },
] as const;

type Step = 1 | 2 | 3;
type IndustryId = (typeof INDUSTRIES)[number]['id'];
type BottleneckId = (typeof BOTTLENECKS)[number]['id'];
type ScaleId = (typeof SCALES)[number]['id'];

const ARCHETYPES = {
  heroic_owner: {
    name: 'Героический собственник',
    description:
      'Компания во многом держится на личном участии собственника. Это помогает быстро решать срочные вопросы, но ограничивает масштабирование.',
    focus:
      'Отделить решения собственника от регулярных операций и постепенно передать команде понятные зоны ответственности.',
  },
  growing_without_system: {
    name: 'Растущий бизнес без системы',
    description:
      'Компания развивается быстрее, чем успевают оформляться процессы. Рост уже есть, а единые правила управления ещё складываются.',
    focus:
      'Зафиксировать ключевые процессы и точки ответственности до следующего витка роста.',
  },
  excel_empire: {
    name: 'Excel-империя',
    description:
      'Значимая часть данных и решений зависит от таблиц и отдельных сотрудников. Получение единой картины требует ручной сборки.',
    focus:
      'Определить единые источники данных и убрать дублирование до выбора новых инструментов автоматизации.',
  },
  automated_chaos: {
    name: 'Автоматизированный хаос',
    description:
      'Программы уже используются, но сами процессы остаются несогласованными. Цифровые инструменты пока не дают ожидаемой управляемости.',
    focus:
      'Сначала согласовать процесс и требования к данным, затем корректировать 1С, ERP и интеграции.',
  },
  patchwork_automation: {
    name: 'Лоскутная автоматизация',
    description:
      'Отдельные участки автоматизированы разными решениями, однако данные и правила работы между ними связаны недостаточно.',
    focus:
      'Собрать карту систем, владельцев данных и обменов, чтобы увидеть дубли и разрывы.',
  },
  crossroads: {
    name: 'Бизнес на перекрёстке',
    description:
      'Компания приблизилась к этапу, когда привычных способов управления уже недостаточно для безопасного продолжения роста.',
    focus:
      'Определить целевую модель управления и выбрать несколько изменений с наибольшим эффектом.',
  },
  lost_navigator: {
    name: 'Потерянный навигатор',
    description:
      'Руководству сложно быстро получить цельную картину бизнеса. Решения могут опираться на разрозненные данные и ощущения.',
    focus:
      'Согласовать минимальный набор показателей, владельцев данных и регулярный ритм управленческой отчётности.',
  },
  one_department_company: {
    name: 'Компания одного отдела',
    description:
      'Один участок бизнеса развит заметно сильнее остальных. Несбалансированность процессов создаёт внутреннее ограничение роста.',
    focus:
      'Найти слабое звено в сквозном процессе и выровнять взаимодействие между подразделениями.',
  },
} as const;

type ArchetypeId = keyof typeof ARCHETYPES;

const ARCHETYPE_IDS = Object.keys(ARCHETYPES) as ArchetypeId[];

const BOTTLENECK_ARCHETYPE_SCORES: Record<
  BottleneckId,
  Partial<Record<ArchetypeId, number>>
> = {
  excel_hell: {
    excel_empire: 72,
    lost_navigator: 32,
    patchwork_automation: 22,
    crossroads: 20,
  },
  cash_gaps: {
    lost_navigator: 70,
    crossroads: 35,
    one_department_company: 22,
    growing_without_system: 18,
  },
  chaos: {
    growing_without_system: 68,
    one_department_company: 40,
    heroic_owner: 30,
    crossroads: 25,
  },
  it_failure: {
    automated_chaos: 66,
    patchwork_automation: 48,
    lost_navigator: 22,
    one_department_company: 18,
  },
  ceo_burnout: {
    heroic_owner: 72,
    crossroads: 38,
    growing_without_system: 30,
    one_department_company: 20,
  },
};

const SCALE_ARCHETYPE_MODIFIERS: Record<
  ScaleId,
  Partial<Record<ArchetypeId, number>>
> = {
  small: {
    heroic_owner: 12,
    one_department_company: 25,
    growing_without_system: -12,
    crossroads: -8,
  },
  medium: {
    growing_without_system: 10,
    crossroads: 14,
    automated_chaos: 5,
  },
  large: {
    crossroads: 30,
    patchwork_automation: 10,
    lost_navigator: 5,
    heroic_owner: -8,
    one_department_company: -5,
  },
};

const INDUSTRY_ARCHETYPE_MODIFIERS: Record<
  IndustryId,
  Partial<Record<ArchetypeId, number>>
> = {
  construction: {
    heroic_owner: 5,
    crossroads: 8,
    excel_empire: 4,
  },
  logistics: {
    excel_empire: 7,
    lost_navigator: 6,
    growing_without_system: 4,
  },
  manufacturing: {
    automated_chaos: 8,
    excel_empire: 6,
    one_department_company: 5,
  },
  engineering: {
    one_department_company: 10,
    heroic_owner: 5,
    growing_without_system: 4,
  },
  holding: {
    patchwork_automation: 20,
    crossroads: 18,
    lost_navigator: 8,
    one_department_company: 8,
  },
};

const DIMENSION_LABELS = {
  people: 'Люди',
  processes: 'Процессы',
  accounting: 'Учёт',
  data: 'Данные',
} as const;

type DimensionId = keyof typeof DIMENSION_LABELS;
type DimensionScores = Record<DimensionId, number>;

const DIMENSION_IDS = Object.keys(DIMENSION_LABELS) as DimensionId[];

const BOTTLENECK_DIMENSIONS: Record<BottleneckId, DimensionScores> = {
  excel_hell: { people: 72, processes: 58, accounting: 56, data: 41 },
  cash_gaps: { people: 68, processes: 58, accounting: 41, data: 48 },
  chaos: { people: 41, processes: 36, accounting: 64, data: 58 },
  it_failure: { people: 61, processes: 44, accounting: 54, data: 48 },
  ceo_burnout: { people: 44, processes: 40, accounting: 60, data: 56 },
};

const SCALE_DIMENSION_MODIFIERS: Record<ScaleId, DimensionScores> = {
  small: { people: 4, processes: 5, accounting: 6, data: 5 },
  medium: { people: 0, processes: 0, accounting: 0, data: 0 },
  large: { people: -5, processes: -8, accounting: -7, data: -8 },
};

const INDUSTRY_DIMENSION_MODIFIERS: Record<IndustryId, DimensionScores> = {
  construction: { people: -2, processes: -4, accounting: -2, data: 0 },
  logistics: { people: 0, processes: -3, accounting: -2, data: -2 },
  manufacturing: { people: -2, processes: -4, accounting: 0, data: -3 },
  engineering: { people: 1, processes: 1, accounting: 1, data: 1 },
  holding: { people: -5, processes: -7, accounting: -5, data: -6 },
};

interface ArchetypeMatch {
  id: ArchetypeId;
  name: string;
  description: string;
  focus: string;
  match: number;
}

interface DiagnosticResult {
  primary: ArchetypeMatch;
  related: ArchetypeMatch[];
  manageability: number;
  manageabilityLevel: string;
  dimensions: Array<{
    id: DimensionId;
    label: string;
    value: number;
  }>;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const applyArchetypeModifiers = (
  scores: Record<ArchetypeId, number>,
  modifiers: Partial<Record<ArchetypeId, number>>,
) => {
  ARCHETYPE_IDS.forEach((id) => {
    scores[id] += modifiers[id] ?? 0;
  });
};

const getManageabilityLevel = (value: number) => {
  if (value < 40) return 'Высокая зависимость от ручного управления';
  if (value < 60) return 'Переходный уровень';
  if (value < 75) return 'Рабочая управляемость с зонами роста';
  return 'Системная управляемость';
};

const buildDiagnosticResult = (
  industry: IndustryId,
  bottleneck: BottleneckId,
  scale: ScaleId,
): DiagnosticResult => {
  const archetypeScores = {} as Record<ArchetypeId, number>;

  ARCHETYPE_IDS.forEach((id) => {
    archetypeScores[id] = 12;
  });

  applyArchetypeModifiers(archetypeScores, BOTTLENECK_ARCHETYPE_SCORES[bottleneck]);
  applyArchetypeModifiers(archetypeScores, SCALE_ARCHETYPE_MODIFIERS[scale]);
  applyArchetypeModifiers(archetypeScores, INDUSTRY_ARCHETYPE_MODIFIERS[industry]);

  const rankedArchetypeIds = [...ARCHETYPE_IDS].sort(
    (a, b) => archetypeScores[b] - archetypeScores[a],
  );

  const matches = rankedArchetypeIds.map((id) => ({
    id,
    ...ARCHETYPES[id],
    match: clamp(Math.round(archetypeScores[id]), 24, 92),
  }));

  const dimensions = DIMENSION_IDS.map((id) => ({
    id,
    label: DIMENSION_LABELS[id],
    value: clamp(
      Math.round(
        BOTTLENECK_DIMENSIONS[bottleneck][id] +
          SCALE_DIMENSION_MODIFIERS[scale][id] +
          INDUSTRY_DIMENSION_MODIFIERS[industry][id],
      ),
      15,
      90,
    ),
  }));

  const manageability = Math.round(
    dimensions.reduce((sum, dimension) => sum + dimension.value, 0) / dimensions.length,
  );

  const primary = matches[0];

  if (!primary) {
    throw new Error('Не удалось определить архетип компании');
  }

  return {
    primary,
    related: matches.slice(1, 4),
    manageability,
    manageabilityLevel: getManageabilityLevel(manageability),
    dimensions,
  };
};

const transitionVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction === 0 ? 0 : direction > 0 ? 14 : -14,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction === 0 ? 0 : direction > 0 ? -14 : 14,
  }),
};

export default function DiagnosticWidget({ onDiagnosticComplete }: DiagnosticWidgetProps) {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(1);
  const [industry, setIndustry] = useState<IndustryId | ''>('');
  const [bottleneck, setBottleneck] = useState<BottleneckId | ''>('');
  const [scale, setScale] = useState<ScaleId | ''>('');
  const [showResult, setShowResult] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const shouldMoveFocusRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  const reportDetails = useMemo(() => {
    if (!industry || !bottleneck || !scale) return null;
    return buildDiagnosticResult(industry, bottleneck, scale);
  }, [industry, bottleneck, scale]);

  useEffect(() => {
    if (!shouldMoveFocusRef.current) return;
    contentRef.current?.focus({ preventScroll: true });
  }, [step, showResult]);

  const prepareNavigation = (nextDirection: 1 | -1) => {
    shouldMoveFocusRef.current = true;
    setDirection(nextDirection);
  };

  const selectIndustry = (id: IndustryId) => {
    if (industry && industry !== id) {
      setBottleneck('');
      setScale('');
    }

    setIndustry(id);
    prepareNavigation(1);
    setStep(2);
  };

  const selectBottleneck = (id: BottleneckId) => {
    if (bottleneck && bottleneck !== id) {
      setScale('');
    }

    setBottleneck(id);
    prepareNavigation(1);
    setStep(3);
  };

  const goBack = (targetStep: Step) => {
    prepareNavigation(-1);
    setStep(targetStep);
  };

  const generateReport = () => {
    if (!reportDetails) return;
    prepareNavigation(1);
    setShowResult(true);
  };

  const resetForm = () => {
    setIndustry('');
    setBottleneck('');
    setScale('');
    prepareNavigation(-1);
    setStep(1);
    setShowResult(false);
  };

  const handleSyncToForm = () => {
    if (!reportDetails) return;

    const selectedIndustry = INDUSTRIES.find((item) => item.id === industry)?.name ?? 'Не заполнено';
    const selectedBottleneck =
      BOTTLENECKS.find((item) => item.id === bottleneck)?.name ?? 'Не заполнено';
    const selectedScale = SCALES.find((item) => item.id === scale)?.name ?? 'Не заполнено';
    const stateMap = reportDetails.dimensions
      .map((dimension) => `${dimension.label}: ${dimension.value}`)
      .join(', ');

    onDiagnosticComplete(
      `Экспресс-тест. Отрасль: ${selectedIndustry}. Проблемная зона: ${selectedBottleneck}. Масштаб: ${selectedScale}. Основной архетип: ${reportDetails.primary.name} (${reportDetails.primary.match}% совпадения по ответам). Ориентировочная управляемость: ${reportDetails.manageability}/100. Карта состояния: ${stateMap}.`,
    );

    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const animationDirection = shouldReduceMotion ? 0 : direction;
  const animationDuration = shouldReduceMotion ? 0 : 0.18;

  return (
    <section id="companies" className="py-16 sm:py-24 bg-[#FCFBFE] border-b border-zinc-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-10 sm:mb-16">
          <span className="font-mono text-[10px] font-black text-purple-700 bg-purple-100 border border-purple-250 px-3 py-1 rounded-sm uppercase tracking-wider inline-block">
            БИЗНЕС-ДИАГНОСТИКА ОНЛАЙН
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Экспресс-тест структуры вашей компании
          </h2>
          <p className="font-sans text-zinc-650 text-sm sm:text-base leading-relaxed">
            Ответьте на три вопроса и получите ориентировочный профиль компании: её архетип,
            уровень управляемости и основные зоны внимания.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-10 rounded-sm border border-zinc-200 shadow-xl relative">
          <div className="border-b border-zinc-150 pb-4 mb-6 sm:mb-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5 min-w-0 text-left">
                <Activity className="w-5 h-5 text-purple-650 shrink-0" aria-hidden="true" />
                <span className="font-mono text-[10px] sm:text-xs text-zinc-800 font-bold tracking-wider leading-snug">
                  МОДУЛЬ ЭКСПРЕСС-АНАЛИЗА БИЗНЕСА
                </span>
              </div>
              {!showResult && (
                <span className="font-mono text-[9px] sm:text-[10px] text-zinc-450 font-black whitespace-nowrap">
                  ЭТАП {step} ИЗ 3
                </span>
              )}
            </div>

            {!showResult && (
              <div
                className="h-1 bg-zinc-100 rounded-full overflow-hidden mt-4"
                role="progressbar"
                aria-label="Прогресс экспресс-теста"
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={step}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
                />
              </div>
            )}
          </div>

          <AnimatePresence initial={false} custom={animationDirection} mode="popLayout">
            {!showResult ? (
              <motion.div
                key={`step-${step}`}
                ref={contentRef}
                tabIndex={-1}
                custom={animationDirection}
                variants={transitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: animationDuration, ease: 'easeOut' }}
                className="text-left space-y-6 outline-none"
              >
                {step === 1 && (
                  <div className="space-y-4" role="group" aria-labelledby="diagnostic-question-1">
                    <h3 id="diagnostic-question-1" className="font-sans text-lg font-bold text-zinc-900 tracking-tight">
                      1. В какой отрасли работает ваша компания?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {INDUSTRIES.map((item) => {
                        const isSelected = industry === item.id;

                        return (
                          <motion.button
                            type="button"
                            key={item.id}
                            onClick={() => selectIndustry(item.id)}
                            aria-pressed={isSelected}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                            className={`p-4 rounded-sm text-left border font-semibold text-xs transition-colors cursor-pointer flex items-center justify-between gap-3 min-h-12 ${
                              isSelected
                                ? 'bg-purple-550 border-purple-600 text-white font-bold shadow-md'
                                : 'bg-zinc-50 border-zinc-200 text-zinc-650 hover:bg-purple-50/55 hover:border-purple-300 hover:text-purple-900'
                            }`}
                          >
                            <span>{item.name}</span>
                            {isSelected && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4" role="group" aria-labelledby="diagnostic-question-2">
                    <h3 id="diagnostic-question-2" className="font-sans text-lg font-bold text-zinc-900 tracking-tight">
                      2. Что на сегодняшний день сильнее всего мешает развитию компании?
                    </h3>
                    <div className="space-y-3 pt-2">
                      {BOTTLENECKS.map((item) => {
                        const isSelected = bottleneck === item.id;

                        return (
                          <motion.button
                            type="button"
                            key={item.id}
                            onClick={() => selectBottleneck(item.id)}
                            aria-pressed={isSelected}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
                            className={`w-full p-4 rounded-sm text-left border font-semibold text-xs sm:text-sm transition-colors flex items-center justify-between gap-3 cursor-pointer min-h-12 ${
                              isSelected
                                ? 'bg-purple-550 border-purple-600 text-white font-bold shadow-md'
                                : 'bg-zinc-50 border-zinc-200 text-zinc-650 hover:bg-purple-50/55 hover:border-purple-300 hover:text-purple-900'
                            }`}
                          >
                            <span>{item.name}</span>
                            {isSelected ? (
                              <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" aria-hidden="true" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                    <div className="flex justify-start pt-4">
                      <button
                        type="button"
                        onClick={() => goBack(1)}
                        className="font-mono text-xs text-zinc-500 hover:text-purple-600 uppercase tracking-wider font-bold cursor-pointer"
                      >
                        ← Назад
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4" role="group" aria-labelledby="diagnostic-question-3">
                    <h3 id="diagnostic-question-3" className="font-sans text-lg font-bold text-zinc-900 tracking-tight">
                      3. Каков текущий масштаб организации?
                    </h3>
                    <div className="space-y-3 pt-2">
                      {SCALES.map((item) => {
                        const isSelected = scale === item.id;

                        return (
                          <motion.button
                            type="button"
                            key={item.id}
                            onClick={() => setScale(item.id)}
                            aria-pressed={isSelected}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
                            className={`w-full p-4 rounded-sm text-left border font-semibold text-xs sm:text-sm transition-colors flex items-center justify-between gap-3 cursor-pointer min-h-12 ${
                              isSelected
                                ? 'bg-purple-550 border-purple-650 text-white font-bold shadow-md'
                                : 'bg-zinc-50 border-zinc-200 text-zinc-650 hover:bg-purple-50/55 hover:border-purple-300 hover:text-purple-900'
                            }`}
                          >
                            <span>{item.name}</span>
                            {isSelected && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                          </motion.button>
                        );
                      })}
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4 pt-6 sm:pt-8">
                      <button
                        type="button"
                        onClick={() => goBack(2)}
                        className="font-mono text-xs text-zinc-500 hover:text-purple-600 uppercase tracking-wider font-bold cursor-pointer self-start sm:self-auto"
                      >
                        ← Назад
                      </button>
                      {scale && (
                        <motion.button
                          type="button"
                          onClick={generateReport}
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-br from-purple-650 to-indigo-600 border border-purple-500 text-white font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-sm shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        >
                          <span>Показать результат</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : reportDetails ? (
              <motion.div
                key="result"
                ref={contentRef}
                tabIndex={-1}
                custom={animationDirection}
                variants={transitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: animationDuration, ease: 'easeOut' }}
                className="text-left space-y-6 outline-none"
              >
                <div className="bg-purple-50 p-4 border border-purple-200 rounded-sm flex items-start gap-4" aria-live="polite">
                  <motion.div
                    initial={shouldReduceMotion ? false : { scale: 0.9, rotate: -5 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    className="p-2.5 rounded-sm bg-purple-100 border border-purple-250 shrink-0"
                  >
                    <Sparkles className="w-5 h-5 text-purple-600" aria-hidden="true" />
                  </motion.div>
                  <div>
                    <h4 className="font-sans font-bold text-zinc-950 text-base leading-tight mb-1">
                      Ваш экспресс-профиль готов
                    </h4>
                    <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                      Результат показывает наиболее близкие управленческие паттерны по трём вашим ответам.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                  <div className="lg:col-span-3 border border-zinc-200 bg-white rounded-sm p-5 sm:p-6 space-y-4">
                    <span className="font-mono text-[9px] text-purple-700 uppercase tracking-widest block font-bold">
                      ОСНОВНОЙ АРХЕТИП КОМПАНИИ
                    </span>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="font-sans text-xl sm:text-2xl font-extrabold text-zinc-950 tracking-tight">
                        {reportDetails.primary.name}
                      </h4>
                      <span className="font-mono text-xs font-black text-purple-700 bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-sm whitespace-nowrap">
                        {reportDetails.primary.match}% совпадения
                      </span>
                    </div>
                    <p className="font-sans text-sm text-zinc-650 leading-relaxed">
                      {reportDetails.primary.description}
                    </p>
                    <div className="border-t border-zinc-150 pt-4">
                      <span className="font-mono text-[9px] text-zinc-450 uppercase tracking-widest block font-bold mb-1.5">
                        ЗОНА ВНИМАНИЯ
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed">
                        {reportDetails.primary.focus}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-zinc-50 border border-zinc-200 rounded-sm p-5 sm:p-6 flex flex-col justify-between gap-5">
                    <div>
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block font-bold mb-2">
                        УПРАВЛЯЕМОСТЬ БИЗНЕСА
                      </span>
                      <div className="flex items-end gap-1.5">
                        <span className="font-sans text-4xl font-black text-zinc-950 leading-none">
                          {reportDetails.manageability}
                        </span>
                        <span className="font-mono text-xs text-zinc-450 font-bold pb-1">/ 100</span>
                      </div>
                    </div>
                    <div>
                      <div className="h-2.5 bg-white border border-zinc-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                          initial={{ width: shouldReduceMotion ? `${reportDetails.manageability}%` : 0 }}
                          animate={{ width: `${reportDetails.manageability}%` }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="font-sans text-xs text-zinc-650 leading-relaxed mt-2.5">
                        {reportDetails.manageabilityLevel}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="space-y-3.5">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">
                      БЛИЗКИЕ АРХЕТИПЫ
                    </span>
                    <div className="space-y-2">
                      {reportDetails.related.map((archetype) => (
                        <div key={archetype.id} className="bg-zinc-50 border border-zinc-200 rounded-sm p-3.5">
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <span className="font-sans text-xs sm:text-sm font-bold text-zinc-800">
                              {archetype.name}
                            </span>
                            <span className="font-mono text-[10px] font-bold text-zinc-500 whitespace-nowrap">
                              {archetype.match}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-white border border-zinc-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-purple-400 rounded-full"
                              initial={{ width: shouldReduceMotion ? `${archetype.match}%` : 0 }}
                              animate={{ width: `${archetype.match}%` }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <span className="font-mono text-[9px] text-purple-700 uppercase tracking-widest block font-bold">
                      МИНИ-КАРТА СОСТОЯНИЯ
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {reportDetails.dimensions.map((dimension) => (
                        <div key={dimension.id} className="bg-purple-50/55 border border-purple-100 rounded-sm p-3.5">
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <span className="font-sans text-xs font-bold text-zinc-800">{dimension.label}</span>
                            <span className="font-mono text-[10px] font-black text-purple-700">
                              {dimension.value}
                            </span>
                          </div>
                          <div className="h-1.5 bg-white border border-purple-100 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                              initial={{ width: shouldReduceMotion ? `${dimension.value}%` : 0 }}
                              animate={{ width: `${dimension.value}%` }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="font-sans text-[11px] text-zinc-500 leading-relaxed bg-zinc-50 border-l-2 border-purple-300 px-3 py-2.5">
                  Это ориентировочное наблюдение по вашим ответам, а не полноценная диагностика или экспертное заключение.
                </p>

                <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
                  <div className="space-y-1 text-left w-full">
                    <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest block font-bold">
                      СЛЕДУЮЩИЙ ШАГ
                    </span>
                    <span className="font-sans font-bold text-zinc-900 text-sm sm:text-base tracking-tight block">
                      Уточнить реальную картину и приоритеты изменений
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto px-5 py-3 rounded-sm border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 font-mono text-xs uppercase tracking-wider transition-colors shrink-0 font-bold cursor-pointer"
                    >
                      Пройти ещё раз
                    </button>
                    <motion.button
                      type="button"
                      onClick={handleSyncToForm}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                      className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-br from-purple-600 to-indigo-650 border border-purple-500 text-white font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-sm shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <span>Обсудить результаты диагностики</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
