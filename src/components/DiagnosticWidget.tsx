import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Activity, ArrowRight, Building2, Check, Cog, Factory, Sparkles, Truck } from 'lucide-react';

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
    scale: direction === 0 ? 1 : 0.985,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction === 0 ? 0 : direction > 0 ? -14 : 14,
    scale: direction === 0 ? 1 : 0.99,
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
    <section id="companies" className="py-16 sm:py-24 bg-[radial-gradient(circle_at_20%_15%,rgba(217,70,239,0.16),transparent_28%),radial-gradient(circle_at_88%_28%,rgba(124,58,237,0.15),transparent_30%),linear-gradient(180deg,#fff_0%,#fbf7ff_48%,#fff_100%)] border-b border-zinc-200/70 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-28 left-[10%] w-96 h-96 bg-fuchsia-300/25 rounded-full blur-3xl" />
        <div className="absolute top-[25%] -right-24 w-[34rem] h-[34rem] bg-purple-300/25 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[38%] w-[30rem] h-[30rem] bg-indigo-200/30 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.07) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-7 lg:gap-10 items-center mb-9 sm:mb-11">
          <div className="text-center lg:text-left space-y-6">
            <span className="font-mono text-xs font-black text-fuchsia-600 bg-white/75 border border-fuchsia-200/80 px-4 py-2 rounded-full uppercase tracking-[0.18em] inline-flex items-center shadow-[0_10px_35px_rgba(217,70,239,0.12)] backdrop-blur-xl">
              БИЗНЕС-ДИАГНОСТИКА ОНЛАЙН
            </span>
            <div className="space-y-4">
              <h2 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-black text-[#21164E] tracking-[-0.055em] leading-[0.98]">
                Экспресс-тест структуры вашей компании
              </h2>
              <p className="font-sans text-[#4B4668] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto lg:mx-0">
                Ответьте на три вопроса и получите ориентировочный профиль компании: её архетип,
                уровень управляемости и основные зоны внимания.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 max-w-5xl mx-auto lg:mx-0">
              <div className="flex items-center gap-3 rounded-2xl bg-white/70 border border-white/80 px-4 py-4 shadow-[0_18px_45px_rgba(126,34,206,0.12)] backdrop-blur-2xl">
                <span className="w-10 h-10 rounded-xl bg-fuchsia-100 text-fuchsia-600 inline-flex items-center justify-center shadow-[0_0_22px_rgba(217,70,239,0.22)] shrink-0">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="font-sans text-sm sm:text-base text-[#21164E] font-extrabold leading-tight">
                  3 простых вопроса<br />5 минут
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/70 border border-white/80 px-4 py-4 shadow-[0_18px_45px_rgba(126,34,206,0.12)] backdrop-blur-2xl">
                <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 inline-flex items-center justify-center shadow-[0_0_22px_rgba(124,58,237,0.2)] shrink-0">
                  <Activity className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="font-sans text-sm sm:text-base text-[#21164E] font-extrabold leading-tight">
                  Ориентировочный<br />профиль компании
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/70 border border-white/80 px-4 py-4 shadow-[0_18px_45px_rgba(126,34,206,0.12)] backdrop-blur-2xl">
                <span className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 inline-flex items-center justify-center shadow-[0_0_22px_rgba(99,102,241,0.18)] shrink-0">
                  <Check className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="font-sans text-sm sm:text-base text-[#21164E] font-extrabold leading-tight">
                  Уровень управляемости<br />и зрелости
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/70 border border-white/80 px-4 py-4 shadow-[0_18px_45px_rgba(126,34,206,0.12)] backdrop-blur-2xl">
                <span className="w-10 h-10 rounded-xl bg-fuchsia-100 text-fuchsia-600 inline-flex items-center justify-center shadow-[0_0_22px_rgba(217,70,239,0.22)] shrink-0">
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="font-sans text-sm sm:text-base text-[#21164E] font-extrabold leading-tight">
                  Зоны внимания<br />и рекомендации
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative min-h-[260px] rounded-[28px] bg-white/60 border border-white/80 shadow-[0_28px_90px_rgba(126,34,206,0.16)] backdrop-blur-2xl overflow-hidden p-8">
              <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-fuchsia-300/40 rounded-full blur-3xl" aria-hidden="true" />
              <div className="absolute right-3 top-8 w-56 h-56 bg-purple-400/25 rounded-full blur-3xl" aria-hidden="true" />
              <div className="relative z-10 max-w-[220px] space-y-5">
                <h3 className="font-sans text-2xl font-black text-[#1B153D] tracking-[-0.035em] leading-tight">
                  Профессионально. Быстро. По делу.
                </h3>
                <p className="font-sans text-base text-[#403A5F] leading-relaxed">
                  Диагностика основана на реальных управленческих паттернах и помогает увидеть картину целиком.
                </p>
              </div>
              <div className="absolute right-10 top-9 w-48 h-48 drop-shadow-[0_28px_48px_rgba(217,70,239,0.35)]" aria-hidden="true">
                <div
                  className="absolute inset-0 bg-[linear-gradient(135deg,rgba(124,58,237,0.95),rgba(236,72,153,0.9)_48%,rgba(255,255,255,0.85))] opacity-95 shadow-[0_0_55px_rgba(217,70,239,0.45)]"
                  style={{ clipPath: 'polygon(50% 0%, 100% 34%, 78% 100%, 20% 100%, 0% 34%)' }}
                />
                <div
                  className="absolute inset-[18px] bg-[linear-gradient(45deg,rgba(255,255,255,0.35),rgba(168,85,247,0.55),rgba(236,72,153,0.45))] mix-blend-screen"
                  style={{ clipPath: 'polygon(50% 0%, 86% 38%, 68% 100%, 50% 68%, 28% 100%, 12% 38%)' }}
                />
                <div className="absolute left-8 top-10 w-28 h-px bg-white/75 rotate-[-28deg]" />
                <div className="absolute right-7 top-16 w-24 h-px bg-white/50 rotate-[34deg]" />
                <div className="absolute left-16 bottom-12 w-28 h-px bg-white/50 rotate-[22deg]" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto bg-[radial-gradient(circle_at_92%_22%,rgba(217,70,239,0.34),transparent_24%),radial-gradient(circle_at_8%_90%,rgba(236,72,153,0.22),transparent_25%),linear-gradient(135deg,rgba(43,32,102,0.97),rgba(24,34,83,0.96)_52%,rgba(75,24,110,0.96))] p-5 sm:p-8 md:p-11 rounded-[34px] border border-fuchsia-300/60 ring-[10px] ring-white/85 shadow-[0_36px_105px_rgba(64,35,105,0.28),0_0_70px_rgba(217,70,239,0.22),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.14),transparent_22%,rgba(255,255,255,0.05)_62%,transparent)] pointer-events-none" aria-hidden="true" />
          <div className="absolute -right-28 -top-28 w-72 h-72 rounded-full bg-fuchsia-400/20 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -left-28 bottom-8 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-200 to-transparent shadow-[0_0_24px_rgba(217,70,239,0.9)]" aria-hidden="true" />
          <div className="relative z-10 border-b border-white/25 pb-6 mb-7 sm:mb-9">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5 min-w-0 text-left">
                <span className="w-12 h-12 rounded-2xl bg-white/10 border border-fuchsia-200/40 inline-flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.28),inset_0_1px_0_rgba(255,255,255,0.22)] shrink-0">
                  <Activity className="w-5 h-5 text-fuchsia-200" aria-hidden="true" />
                </span>
                <span className="font-mono text-sm sm:text-base text-white font-black tracking-[0.14em] leading-snug">
                  МОДУЛЬ ЭКСПРЕСС-АНАЛИЗА БИЗНЕСА
                </span>
              </div>
              {!showResult && (
                <span className="font-mono text-xs sm:text-sm text-fuchsia-50 font-black whitespace-nowrap bg-fuchsia-400/20 border border-fuchsia-300/40 rounded-full px-4 py-2 shadow-[0_0_24px_rgba(217,70,239,0.16)]">
                  ЭТАП {step} ИЗ 3
                </span>
              )}
            </div>

            {!showResult && (
              <div
                className="h-4 bg-[#0E1237]/70 border border-white/30 rounded-full overflow-hidden mt-6 p-[3px] shadow-[inset_0_1px_8px_rgba(0,0,0,0.35),0_0_28px_rgba(217,70,239,0.14)]"
                role="progressbar"
                aria-label="Прогресс экспресс-теста"
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={step}
              >
                <motion.div
                  className="relative h-full bg-gradient-to-r from-[#ff5bc8] via-[#b90cff] to-[#6d5cff] rounded-full shadow-[0_0_24px_rgba(217,70,239,0.8)] overflow-hidden"
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
                >
                  <motion.span
                    className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={shouldReduceMotion ? { x: '0%' } : { x: ['-120%', '240%'] }}
                    transition={{ duration: shouldReduceMotion ? 0 : 1.8, repeat: shouldReduceMotion ? 0 : Infinity, ease: 'linear' }}
                    aria-hidden="true"
                  />
                </motion.div>
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
                className="relative z-10 w-full text-left space-y-7 outline-none md:min-h-[600px]"
              >
                {step === 1 && (
                  <div className="space-y-7" role="group" aria-labelledby="diagnostic-question-1">
                    <div className="flex items-start gap-5 sm:gap-7">
                      <span className="font-mono text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#ff70d5] to-[#9f7aff] leading-none shrink-0 drop-shadow-[0_0_24px_rgba(217,70,239,0.34)]">
                        01
                      </span>
                      <div className="space-y-1.5 pt-1">
                        <span className="font-mono text-xs sm:text-sm text-fuchsia-200/80 uppercase tracking-[0.18em] font-black">Вопрос 1 из 3</span>
                        <h3 id="diagnostic-question-1" className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-[-0.035em] leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.18)]">
                          В какой отрасли работает ваша компания?
                        </h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                      {INDUSTRIES.map((item) => {
                        const isSelected = industry === item.id;
                        const IndustryIcon =
                          item.id === 'construction'
                            ? Building2
                            : item.id === 'logistics'
                              ? Truck
                              : item.id === 'manufacturing'
                                ? Factory
                                : item.id === 'engineering'
                                  ? Cog
                                  : Building2;

                        return (
                          <motion.button
                            type="button"
                            key={item.id}
                            onClick={() => selectIndustry(item.id)}
                            aria-pressed={isSelected}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                            className={`group relative overflow-hidden p-5 sm:p-6 rounded-2xl text-left border text-base sm:text-lg leading-snug transition-all duration-200 cursor-pointer flex items-center justify-between gap-5 min-h-[104px] backdrop-blur-2xl ${
                              isSelected
                                ? 'bg-gradient-to-br from-fuchsia-500/50 via-purple-600/40 to-indigo-500/30 border-fuchsia-200/90 text-white font-black shadow-[0_0_44px_rgba(217,70,239,0.38),inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-fuchsia-200/60'
                                : 'bg-white/10 border-white/25 text-white font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-fuchsia-500/20 hover:border-fuchsia-200/60 hover:text-white hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(76,29,149,0.28),0_0_28px_rgba(217,70,239,0.18)]'
                            }`}
                          >
                            <span className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                            <span className={`relative w-14 h-14 rounded-2xl border inline-flex items-center justify-center shrink-0 transition-all duration-200 ${
                              isSelected
                                ? 'bg-white/20 border-white/30 text-white shadow-[0_0_30px_rgba(255,255,255,0.18)]'
                                : 'bg-white/10 border-white/20 text-fuchsia-200 group-hover:text-white group-hover:border-fuchsia-200/40'
                            }`}>
                              <IndustryIcon className="w-7 h-7" aria-hidden="true" />
                            </span>
                            <span className="relative min-w-0">{item.name}</span>
                            {isSelected && (
                              <span className="relative w-8 h-8 rounded-full bg-white text-fuchsia-600 flex items-center justify-center shrink-0 shadow-[0_0_28px_rgba(255,255,255,0.55)]">
                                <Check className="w-4 h-4" aria-hidden="true" />
                              </span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-7" role="group" aria-labelledby="diagnostic-question-2">
                    <div className="flex items-start gap-5 sm:gap-7">
                      <span className="font-mono text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#ff70d5] to-[#9f7aff] leading-none shrink-0 drop-shadow-[0_0_24px_rgba(217,70,239,0.34)]">
                        02
                      </span>
                      <div className="space-y-1.5 pt-1">
                        <span className="font-mono text-xs sm:text-sm text-fuchsia-200/80 uppercase tracking-[0.18em] font-black">Вопрос 2 из 3</span>
                        <h3 id="diagnostic-question-2" className="font-sans text-2xl sm:text-3xl font-black text-white tracking-[-0.035em] leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.18)]">
                          Что на сегодняшний день сильнее всего мешает развитию компании?
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-4 pt-1">
                      {BOTTLENECKS.map((item) => {
                        const isSelected = bottleneck === item.id;

                        return (
                          <motion.button
                            type="button"
                            key={item.id}
                            onClick={() => selectBottleneck(item.id)}
                            aria-pressed={isSelected}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
                            className={`group relative overflow-hidden w-full p-5 sm:p-6 rounded-2xl text-left border text-base sm:text-lg leading-snug transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer min-h-[78px] backdrop-blur-2xl ${
                              isSelected
                                ? 'bg-gradient-to-r from-fuchsia-500/40 via-purple-600/30 to-indigo-500/25 border-fuchsia-200/80 text-white font-black shadow-[0_0_42px_rgba(217,70,239,0.32),inset_0_1px_0_rgba(255,255,255,0.24)] ring-1 ring-fuchsia-200/50'
                                : 'bg-white/10 border-white/25 text-white font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-fuchsia-500/20 hover:border-fuchsia-200/60 hover:text-white hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(76,29,149,0.26),0_0_24px_rgba(217,70,239,0.16)]'
                            }`}
                          >
                            <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-fuchsia-300 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                            <span className="relative min-w-0">{item.name}</span>
                            {isSelected ? (
                              <span className="relative w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-300 to-purple-500 text-white flex items-center justify-center shrink-0 shadow-[0_0_28px_rgba(217,70,239,0.62)]">
                                <Check className="w-4 h-4" aria-hidden="true" />
                              </span>
                            ) : (
                              <span className="relative w-2.5 h-2.5 rounded-full bg-white/30 group-hover:bg-fuchsia-300/80 shrink-0 transition-colors" aria-hidden="true" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                    <div className="flex justify-start pt-4">
                      <button
                        type="button"
                        onClick={() => goBack(1)}
                        className="font-mono text-base text-zinc-200 hover:text-fuchsia-100 uppercase tracking-wider font-black cursor-pointer transition-colors"
                      >
                        ← Назад
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-7" role="group" aria-labelledby="diagnostic-question-3">
                    <div className="flex items-start gap-5 sm:gap-7">
                      <span className="font-mono text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#ff70d5] to-[#9f7aff] leading-none shrink-0 drop-shadow-[0_0_24px_rgba(217,70,239,0.34)]">
                        03
                      </span>
                      <div className="space-y-1.5 pt-1">
                        <span className="font-mono text-xs sm:text-sm text-fuchsia-200/80 uppercase tracking-[0.18em] font-black">Вопрос 3 из 3</span>
                        <h3 id="diagnostic-question-3" className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-[-0.035em] leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.18)]">
                          Каков текущий масштаб организации?
                        </h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                      {SCALES.map((item) => {
                        const isSelected = scale === item.id;

                        return (
                          <motion.button
                            type="button"
                            key={item.id}
                            onClick={() => setScale(item.id)}
                            aria-pressed={isSelected}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
                            className={`group relative overflow-hidden w-full p-5 sm:p-6 rounded-2xl text-left border text-base sm:text-lg leading-snug transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer min-h-[110px] backdrop-blur-2xl ${
                              isSelected
                                ? 'bg-gradient-to-br from-fuchsia-500/50 via-purple-600/40 to-indigo-500/30 border-fuchsia-200/80 text-white font-black shadow-[0_0_42px_rgba(217,70,239,0.34),inset_0_1px_0_rgba(255,255,255,0.24)] ring-1 ring-fuchsia-200/50'
                                : 'bg-white/10 border-white/25 text-white font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-fuchsia-500/20 hover:border-fuchsia-200/60 hover:text-white hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(76,29,149,0.26),0_0_24px_rgba(217,70,239,0.16)]'
                            }`}
                          >
                            <span className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                            <span className="relative min-w-0">{item.name}</span>
                            {isSelected && (
                              <span className="relative w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-300 to-purple-500 text-white flex items-center justify-center shrink-0 shadow-[0_0_28px_rgba(217,70,239,0.62)]">
                                <Check className="w-4 h-4" aria-hidden="true" />
                              </span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4 pt-6 sm:pt-8">
                      <button
                        type="button"
                        onClick={() => goBack(2)}
                        className="font-mono text-base text-zinc-200 hover:text-fuchsia-100 uppercase tracking-wider font-black cursor-pointer self-start sm:self-auto transition-colors"
                      >
                        ← Назад
                      </button>
                      {scale && (
                        <motion.button
                          type="button"
                          onClick={generateReport}
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-500 border border-fuchsia-200/60 text-white font-black text-base tracking-[0.12em] uppercase px-8 py-5 rounded-2xl shadow-[0_0_36px_rgba(217,70,239,0.36),inset_0_1px_0_rgba(255,255,255,0.22)] hover:shadow-[0_0_50px_rgba(217,70,239,0.48)] hover:-translate-y-0.5 transition-all cursor-pointer"
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
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                transition={{ duration: animationDuration, ease: 'easeOut' }}
                className="relative z-10 w-full text-left space-y-6 sm:space-y-7 outline-none"
              >
                <div
                  className="relative overflow-hidden bg-[radial-gradient(circle_at_90%_0%,rgba(236,72,153,0.32),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.15),rgba(168,85,247,0.24),rgba(236,72,153,0.18))] p-7 sm:p-9 border border-fuchsia-200/50 rounded-[28px] shadow-[0_28px_78px_rgba(40,22,88,0.34),0_0_58px_rgba(217,70,239,0.24),inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-2xl"
                  aria-live="polite"
                >
                  <div className="absolute -right-12 -top-16 w-64 h-64 rounded-full bg-fuchsia-500/30 blur-3xl pointer-events-none" aria-hidden="true" />
                  <div className="absolute -left-16 -bottom-20 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" aria-hidden="true" />
                  <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300/80 to-transparent" aria-hidden="true" />
                  <div className="relative z-10 flex items-start gap-5">
                    <motion.div
                      initial={shouldReduceMotion ? false : { scale: 0.9, rotate: -5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                      className="p-4 rounded-2xl bg-fuchsia-400/20 border border-fuchsia-200/40 shrink-0 shadow-[0_0_34px_rgba(217,70,239,0.3),inset_0_1px_0_rgba(255,255,255,0.22)]"
                    >
                      <Sparkles className="w-6 h-6 text-fuchsia-100" aria-hidden="true" />
                    </motion.div>
                    <div>
                      <span className="font-mono text-xs sm:text-sm text-fuchsia-100 uppercase tracking-[0.2em] block font-black mb-3">
                        РЕЗУЛЬТАТ ЭКСПРЕСС-ТЕСТА
                      </span>
                      <h4 className="font-sans font-black text-white text-3xl sm:text-5xl tracking-[-0.055em] leading-none mb-4 drop-shadow-[0_8px_28px_rgba(0,0,0,0.22)]">
                        Ваш профиль управляемости готов
                      </h4>
                      <p className="font-sans text-base sm:text-lg text-purple-50/90 leading-relaxed max-w-3xl">
                        Наиболее близкие управленческие паттерны по трём вашим ответам.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <div className="relative overflow-hidden lg:col-span-3 border border-fuchsia-200/40 bg-[radial-gradient(circle_at_92%_92%,rgba(217,70,239,0.25),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(124,58,237,0.18),rgba(236,72,153,0.18))] rounded-[28px] p-7 sm:p-9 space-y-7 shadow-[0_26px_72px_rgba(42,24,94,0.32),0_0_38px_rgba(217,70,239,0.16),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl">
                    <div className="absolute -right-20 -bottom-24 w-56 h-56 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" aria-hidden="true" />
                    <span className="relative font-mono text-xs sm:text-sm text-fuchsia-100 uppercase tracking-[0.2em] block font-black">
                      ОСНОВНОЙ АРХЕТИП КОМПАНИИ
                    </span>
                    <div className="relative flex flex-wrap items-end justify-between gap-4">
                      <h4 className="font-sans text-4xl sm:text-5xl font-black text-white tracking-[-0.055em] leading-none">
                        {reportDetails.primary.name}
                      </h4>
                      <span className="font-mono text-2xl sm:text-3xl font-black text-white bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-500 border border-fuchsia-200/50 px-5 py-3 rounded-2xl whitespace-nowrap shadow-[0_0_34px_rgba(217,70,239,0.34)]">
                        {reportDetails.primary.match}% совпадения
                      </span>
                    </div>
                    <p className="relative font-sans text-base sm:text-lg text-purple-50/90 leading-relaxed max-w-2xl">
                      {reportDetails.primary.description}
                    </p>
                    <div className="relative bg-white/10 border border-white/25 p-5 sm:p-6 rounded-2xl shadow-[inset_0_1px_14px_rgba(255,255,255,0.08)] backdrop-blur-xl">
                      <span className="font-mono text-xs sm:text-sm text-fuchsia-100 uppercase tracking-[0.18em] block font-black mb-3">
                        ЗОНА ВНИМАНИЯ
                      </span>
                      <p className="font-sans text-base text-white leading-relaxed">
                        {reportDetails.primary.focus}
                      </p>
                    </div>
                  </div>

                  <div className="relative overflow-hidden lg:col-span-2 bg-[radial-gradient(circle_at_70%_8%,rgba(217,70,239,0.32),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.12),rgba(79,70,229,0.22),rgba(168,85,247,0.18))] border border-fuchsia-200/50 rounded-[28px] p-7 sm:p-9 flex flex-col justify-between gap-9 shadow-[0_26px_72px_rgba(42,24,94,0.34),0_0_44px_rgba(168,85,247,0.22),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl">
                    <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-fuchsia-500/25 blur-3xl pointer-events-none" aria-hidden="true" />
                    <div>
                      <span className="relative font-mono text-xs sm:text-sm text-fuchsia-100 uppercase tracking-[0.2em] block font-black mb-5">
                        УПРАВЛЯЕМОСТЬ БИЗНЕСА
                      </span>
                      <div className="relative flex items-end gap-2">
                        <span className="font-sans text-8xl sm:text-9xl font-black text-white tracking-[-0.08em] leading-none drop-shadow-[0_0_30px_rgba(217,70,239,0.3)]">
                          {reportDetails.manageability}
                        </span>
                        <span className="font-mono text-base text-fuchsia-100 font-black pb-3">/ 100</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="h-4 bg-[#0D1238]/70 border border-white/30 rounded-full overflow-hidden p-[3px] shadow-[inset_0_1px_8px_rgba(0,0,0,0.35)]">
                        <motion.div
                          className="h-full bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-400 rounded-full shadow-[0_0_22px_rgba(217,70,239,0.55)]"
                          initial={{ width: shouldReduceMotion ? `${reportDetails.manageability}%` : 0 }}
                          animate={{ width: `${reportDetails.manageability}%` }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="font-sans text-base font-extrabold text-white leading-relaxed mt-5">
                        {reportDetails.manageabilityLevel}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative overflow-hidden space-y-4 bg-white/10 border border-white/20 rounded-[24px] p-5 sm:p-6 shadow-[0_20px_54px_rgba(31,18,71,0.22),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl">
                    <div className="absolute -right-16 -top-20 w-40 h-40 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" aria-hidden="true" />
                    <span className="relative font-mono text-xs sm:text-sm text-fuchsia-100 uppercase tracking-[0.2em] block font-black">
                      БЛИЗКИЕ АРХЕТИПЫ
                    </span>
                    <div className="relative space-y-3">
                      {reportDetails.related.map((archetype) => (
                        <div key={archetype.id} className="bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-5 shadow-[0_14px_36px_rgba(31,18,71,0.2)] backdrop-blur-xl hover:bg-fuchsia-500/20 hover:border-fuchsia-300/40 transition-colors">
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <span className="font-sans text-base sm:text-lg font-black text-white leading-tight">
                              {archetype.name}
                            </span>
                            <span className="font-mono text-base sm:text-lg font-black text-fuchsia-100 whitespace-nowrap">
                              {archetype.match}%
                            </span>
                          </div>
                          <div className="h-2.5 bg-white/10 border border-white/20 rounded-full overflow-hidden p-[1px]">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full shadow-[0_0_12px_rgba(217,70,239,0.4)]"
                              initial={{ width: shouldReduceMotion ? `${archetype.match}%` : 0 }}
                              animate={{ width: `${archetype.match}%` }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative overflow-hidden space-y-4 bg-white/10 border border-white/20 rounded-[24px] p-5 sm:p-6 shadow-[0_20px_54px_rgba(31,18,71,0.22),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl">
                    <div className="absolute -left-16 -bottom-20 w-44 h-44 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" aria-hidden="true" />
                    <span className="relative font-mono text-xs sm:text-sm text-fuchsia-100 uppercase tracking-[0.2em] block font-black">
                      МИНИ-КАРТА СОСТОЯНИЯ
                    </span>
                    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {reportDetails.dimensions.map((dimension) => (
                        <div key={dimension.id} className="relative overflow-hidden bg-gradient-to-br from-white/10 to-fuchsia-500/20 border border-fuchsia-300/30 rounded-2xl p-5 shadow-[0_14px_36px_rgba(31,18,71,0.2)] backdrop-blur-xl">
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <span className="font-sans text-base sm:text-lg font-black text-white">{dimension.label}</span>
                            <span className="font-mono text-2xl font-black text-fuchsia-100">
                              {dimension.value}
                            </span>
                          </div>
                          <div className="h-2.5 bg-white/10 border border-white/20 rounded-full overflow-hidden p-[1px]">
                            <motion.div
                              className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.38)]"
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

                <p className="font-sans text-base text-purple-50/90 leading-relaxed bg-white/10 border border-white/20 border-l-4 border-l-fuchsia-300 px-5 py-4 rounded-2xl shadow-sm backdrop-blur-xl">
                  Это ориентировочное наблюдение по вашим ответам, а не полноценная диагностика или экспертное заключение.
                </p>

                <div className="relative overflow-hidden bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 border border-fuchsia-100/60 rounded-[26px] p-7 sm:p-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 shadow-[0_26px_80px_rgba(126,34,206,0.42),0_0_58px_rgba(217,70,239,0.3),inset_0_1px_0_rgba(255,255,255,0.24)]">
                  <div className="absolute -right-10 -bottom-16 w-56 h-56 rounded-full bg-white/20 blur-2xl pointer-events-none" aria-hidden="true" />
                  <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" aria-hidden="true" />
                  <div className="relative space-y-2 text-left w-full">
                    <span className="font-mono text-xs sm:text-sm text-fuchsia-50 uppercase tracking-[0.2em] block font-black">
                      СЛЕДУЮЩИЙ ШАГ
                    </span>
                    <span className="font-sans font-black text-white text-xl sm:text-2xl tracking-[-0.025em] leading-tight block">
                      Уточнить реальную картину и приоритеты изменений
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 font-mono text-sm uppercase tracking-wider transition-all shrink-0 font-black cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                    >
                      Пройти ещё раз
                    </button>
                    <motion.button
                      type="button"
                      onClick={handleSyncToForm}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                      className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-white border border-white text-purple-900 font-black text-sm tracking-[0.08em] uppercase px-8 py-4 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.26)] hover:bg-fuchsia-50 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.32)] transition-all cursor-pointer"
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

        <div className="w-full max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex items-center gap-5 rounded-[24px] bg-white/70 border border-white/80 px-6 py-6 shadow-[0_22px_60px_rgba(126,34,206,0.12)] backdrop-blur-2xl">
            <span className="w-14 h-14 rounded-2xl bg-fuchsia-50 text-fuchsia-600 inline-flex items-center justify-center shadow-[0_0_28px_rgba(217,70,239,0.18)] shrink-0">
              <Sparkles className="w-7 h-7" aria-hidden="true" />
            </span>
            <span className="text-left">
              <span className="font-sans text-lg font-black text-[#21164E] leading-tight block">Точно по сути</span>
              <span className="font-sans text-base text-[#514B6F] leading-relaxed block mt-1">
                Без воды и абстракций. Только важные показатели управляемости компании.
              </span>
            </span>
          </div>

          <div className="flex items-center gap-5 rounded-[24px] bg-white/70 border border-white/80 px-6 py-6 shadow-[0_22px_60px_rgba(126,34,206,0.12)] backdrop-blur-2xl">
            <span className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 inline-flex items-center justify-center shadow-[0_0_28px_rgba(99,102,241,0.16)] shrink-0">
              <Activity className="w-7 h-7" aria-hidden="true" />
            </span>
            <span className="text-left">
              <span className="font-sans text-lg font-black text-[#21164E] leading-tight block">На основе практики</span>
              <span className="font-sans text-base text-[#514B6F] leading-relaxed block mt-1">
                Проверенная методика на реальных управленческих паттернах.
              </span>
            </span>
          </div>

          <div className="flex items-center gap-5 rounded-[24px] bg-white/70 border border-white/80 px-6 py-6 shadow-[0_22px_60px_rgba(126,34,206,0.12)] backdrop-blur-2xl">
            <span className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 inline-flex items-center justify-center shadow-[0_0_28px_rgba(168,85,247,0.18)] shrink-0">
              <Check className="w-7 h-7" aria-hidden="true" />
            </span>
            <span className="text-left">
              <span className="font-sans text-lg font-black text-[#21164E] leading-tight block">Понятный результат</span>
              <span className="font-sans text-base text-[#514B6F] leading-relaxed block mt-1">
                Чёткие выводы и зоны внимания, которые можно обсудить сразу.
              </span>
            </span>
          </div>
        </div>

        <p className="mt-7 text-center font-sans text-base text-[#746D91]">
          Ваши ответы конфиденциальны и не сохраняются после завершения теста.
        </p>
      </div>
    </section>
  );
}
