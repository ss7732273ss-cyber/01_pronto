import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, TrendingUp, Cpu, Users, Layers, ShieldCheck, ChevronRight, FileSpreadsheet, Anchor } from 'lucide-react';
import { CaseStudy } from '../types';

export default function Cases() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Все кейсы' },
    { id: 'finance', name: 'Дефициты и Финансы' },
    { id: 'processes', name: 'Бизнес-Процессы' },
    { id: 'automation', name: 'Автоматизация & Холдинги' },
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: 'case-500m',
      title: '500 миллионов рублей, которые «исчезли»',
      category: 'finance',
      industry: 'Строительство / Дефицит Проекта',
      situation: 'Руководство холдинга считало, что заказчик крупного строительного объекта недофинансировал проект более чем на 500 млн рублей. Рабочие процессы грозили остановиться из-за кассового разрыва и трений в переговорах.',
      solution: 'Я собрала единую финансовую модель проекта во всех срезах финансов в реальном времени: источники финансирования (собственные, привлеченные, авансы заказчика), сырье, логистику, ФОТ сотрудников и субподряды.',
      result: 'Был обнаружен парадокс: значительная часть дефицита на самом деле покрывалась внутренними субсидиями холдинга и зачетами. Были вскрыты ошибки учета, завышающие кадровые сметы. Собственник получил на 100% достоверные оцифрованные факты.',
      quote: 'Я нахожу истину в данных и возвращаю ясность компаниям.',
      stats: [
        { label: 'Выявленные искажения', value: '500 млн ₽' },
        { label: 'Сбор финмодели', value: '10 дней' }
      ]
    },
    {
      id: 'case-construction',
      title: 'Строительная площадка, где никто не понимал общий процесс',
      category: 'processes',
      industry: 'Девелопмент / Инжиниринг',
      situation: 'Каждый отдел (закупки, инженеры, бухгалтерия, субподрядчики и прораб) видел только свою узкую задачу. Как итог: бесконечные задержки с поставкой кирпича и арматуры, простои техники, кражи сырья, взаимные обвинения.',
      solution: 'Провела серию интервью с цехами и офисом, оцифровала структуру движения материалов и документов на берегу. Собрала сквозную наглядную схему движения ресурсов от заявки до завершения кладки, сформировав единый рабочий регламент.',
      result: 'Устранены дефициты снабжения и простои техники. Сокращены складские потери материалов на 22% за счет оцифрованной отчетности. Схема закрепила четкие зоны ответственности.',
      quote: 'Я объединяю разрозненные части бизнес-процесса в понятную каждому сотруднику систему.',
      stats: [
        { label: 'Снижение склада', value: '-22%' },
        { label: 'Простои техники', value: '0%' }
      ]
    },
    {
      id: 'case-chaos',
      title: 'Когда компания хотела автоматизировать хаос',
      category: 'automation',
      industry: 'Производство / ERP Системы',
      situation: 'Собственники производственной компании решили внедрить дорогой программный комплекс, надеясь, что покупка лицензий сама решит хронический бардак в отчетах. Хотели просто перенести текущие Excel-таблицы «как есть» без изменений правил.',
      solution: 'Остановила вредную в корне затею. Разработала строгую методологию и принципы учета до программирования: 1 факт = 1 запись, четкие аналитические регистры, распределение регламентной ответственности, жесткая блокировка задних чисел.',
      result: 'Бизнес понял, что внедрение ИТ начинается с методологии процессов. Только после этого мы выбрали софт и настроили его точно под готовые новые регламенты. ИТ-бюджет спасен от деструктивного "переписывания сырого кода".',
      quote: 'Я выстраиваю правила, которые создают управляемость.',
      stats: [
        { label: 'Экономия ИТ сметы', value: 'До 45%' },
        { label: 'Срок автоматизации', value: '-50%' }
      ]
    },
    {
      id: 'case-people',
      title: 'Восемь человек и одна фотография',
      category: 'processes',
      industry: 'Организационные связи / Управление',
      situation: 'В холдинговой структуре требовалось координировать сотрудников разных филиалов, разбросанных по разным физическим территориям и подчиняющихся разным юрлицам. Прямого авторитарного рычага у владельца компании над ними не было.',
      solution: 'Ликвидировала коммуникационные спамы. Выстроила сквозной процесс взаимодействия, основанный не на иерархических окриках, а на четко спроектированных горизонтальных регламентах «отдал-принял данные». Объяснила цели командам.',
      result: 'Задачи стали закрываться точно в оговоренные сроки. Персонал осознал ценность своего шага в общей цепочке, собственник компании избавился от роли "вечного пожарного", ручно стыкующего мелкие сдачи.',
      quote: 'Я объединяю людей вокруг общей цели.',
      stats: [
        { label: 'Снижение переписок', value: 'В 4 раза' },
        { label: 'Соблюдение дедлайнов', value: '98%' }
      ]
    },
    {
      id: 'case-meeting',
      title: 'Совещание, которое не должно было состояться',
      category: 'processes',
      industry: 'Кризис Коммуникации / Проекты',
      situation: 'Конфликт между строительной площадкой («земля») и финансовым департаментом («офис») парализовал проект. ПТО отказывалось подписывать формы без согласования авансов, офис требовал чеки. Процесс полностью заблокирован.',
      solution: 'Я выступила независимым системным архитектором. Собрала стороны за одним столом, оцифровала их встречные требования на языке жесткой схемы процессов, убрала эмоции и синхронизировала правила передачи первичных КС-2.',
      result: 'Совещание разблокировало процесс за 2 часа. Были выявлены и устранены истинные технические причины задержки документов. Стороны возобновили стройку, а собственник получил рабочее правило выхода из тупиков.',
      quote: 'Я связываю людей, технологии и процессы, чтобы быстро находить оптимальные бизнес-решения.',
      stats: [
        { label: 'Разблокировка процессов', value: '2 часа' },
        { label: 'Согласование КС-2', value: '3 дня' }
      ]
    },
    {
      id: 'case-holding',
      title: 'Сквозной процесс холдинга из пяти юрлиц',
      category: 'automation',
      industry: 'Логистика, Закупки, Терминал, СХ',
      situation: 'Зерновой холдинг с собственной цепочкой «фермерская закупка» -> «трейдинг на УСН» -> «терминал в порту» -> «судовой экспорт». Огромные кассовые разрывы из-за несогласованности НДС и логистических простоев судов.',
      solution: 'Я разобрала бизнес «по косточкам». Выстроила единый сквозной процесс от закупки у фермеров до отгрузки на судно. Синхронизировала бухгалтерию (НДС/ОСНО) с движением ТМЦ и учетным складом.',
      result: 'Терминал в порту, логистика и торговый отдел заработали как единый оцифрованный швейцарский хронометр. Ликвидированы штрафы за простой судов, кассовые разрывы сократились до абсолютного нуля.',
      quote: 'Из хаоса разобщенных филиалов — в единую прозрачную цепочку поставок холдинга.',
      stats: [
        { label: 'Штрафы за судов', value: '0 ₽' },
        { label: 'НДС риски холдинга', value: '0%' }
      ]
    }
  ];

  const filteredCaseStudies = activeCategory === 'all'
    ? caseStudies
    : caseStudies.filter(cs => cs.category === activeCategory);

  return (
    <section id="cases" className="py-24 bg-[#FCFBFE] border-b border-zinc-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-4 text-center mb-16">
          <span className="font-mono text-[10px] font-black text-purple-700 bg-purple-100 border border-purple-250 px-3 py-1 rounded-sm uppercase tracking-wider inline-block">
            ПРАКТИЧЕСКИЕ КЕЙСЫ
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Оцифрованный опыт: из хаоса в прозрачность
          </h2>
          <p className="font-sans text-zinc-650 text-sm sm:text-base leading-relaxed">
            Реальные истории оздоровления бизнеса, упорядочивания оргструктур и спасения бюджетов на крупных объектах. Бизнес-результаты, выраженные в деньгах и процессах.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 select-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4.5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all uppercase cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-zinc-650 border border-zinc-200 hover:bg-purple-50 hover:text-purple-900 shadow-sm'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCaseStudies.map((cs) => (
              <motion.div
                layout
                key={cs.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-zinc-200 rounded-sm p-6 md:p-8 flex flex-col justify-between hover:border-purple-300 transition-all shadow-md hover:shadow-lg group relative overflow-hidden"
              >
                {/* Tech Coordinate Tag */}
                <div className="absolute top-4 right-6 font-mono text-[8px] text-zinc-400 block uppercase font-bold">
                  CASE_REF: {cs.id.toUpperCase()}
                </div>

                <div className="space-y-6">
                  {/* Category Indicator & Industry */}
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping"></span>
                    <span className="font-mono text-[9px] text-zinc-450 uppercase font-bold tracking-wider">
                      {cs.industry}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-zinc-950 tracking-tight leading-snug group-hover:text-purple-700 transition-colors">
                    {cs.title}
                  </h3>

                  {/* Tri-stage Breakdown */}
                  <div className="space-y-4 pt-2">
                    
                    {/* Before / Problem */}
                    <div className="space-y-1">
                      <span className="font-mono text-[8px] text-rose-650 uppercase font-black tracking-wider block">СИТУАЦИЯ И ХАОС:</span>
                      <p className="font-sans text-xs sm:text-sm text-zinc-650 leading-relaxed pl-3 border-l-2 border-rose-200">
                        {cs.situation}
                      </p>
                    </div>

                    {/* Svetlana's Solution */}
                    <div className="space-y-1">
                      <span className="font-mono text-[8px] text-purple-700 uppercase font-black tracking-wider block">ЧТО БЫЛО СДЕЛАНО:</span>
                      <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed pl-3 border-l-2 border-purple-200">
                        {cs.solution}
                      </p>
                    </div>

                    {/* Result */}
                    <div className="space-y-1">
                      <span className="font-mono text-[8px] text-emerald-700 uppercase font-black tracking-wider block">РЕЗУЛЬТАТ ДЛЯ БИЗНЕСА:</span>
                      <p className="font-sans text-xs sm:text-sm text-zinc-750 font-medium leading-relaxed pl-3 border-l-2 border-emerald-200">
                        {cs.result}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Case Stats & Svetlana's core conclusion */}
                <div className="mt-8 pt-6 border-t border-zinc-150 flex flex-col sm:flex-row items-stretch justify-between gap-4">
                  {/* Svetlana's Quote box */}
                  <div className="bg-purple-50/60 p-3 rounded-sm border border-purple-100 flex-1 flex items-center">
                    <p className="font-sans italic text-[11px] leading-relaxed text-purple-900">
                      «{cs.quote}»
                    </p>
                  </div>

                  {/* Numbers columns */}
                  {cs.stats && cs.stats.length > 0 && (
                    <div className="flex gap-4 shrink-0 justify-around sm:justify-start items-center">
                      {cs.stats.map((st) => (
                        <div key={st.label} className="text-right">
                          <span className="font-mono text-[16px] sm:text-[18px] font-black text-purple-750 block tracking-tight leading-none mb-1">
                            {st.value}
                          </span>
                          <span className="font-mono text-[8px] text-zinc-450 uppercase tracking-widest block font-bold">
                            {st.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
