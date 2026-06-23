import { motion } from 'motion/react';
import { ShieldAlert, CheckCircle, ArrowRight, Layers, HelpCircle, FileText, Settings, Heart, Database, Send } from 'lucide-react';

export default function Approach() {
  const steps = [
    {
      num: '01',
      title: 'Цели и Моделирование',
      desc: 'Я выясняю, как компания реально зарабатывает маржу, где возникают потери и как создается ценность.',
      metric: 'Карта верхнего уровня'
    },
    {
      id: 'step-02',
      num: '02',
      title: 'Бизнес-процессы «As Is»',
      desc: 'Описание текущих путей движения материалов, денег и информации, выявление бутылочных горлышек.',
      metric: 'Оцифровка цепочек'
    },
    {
      num: '03',
      title: 'Роли и Зоны ответственности',
      desc: 'Каждому действию назначается конкретный хозяин процесса в оргструктуре. Убираем дублирование.',
      metric: 'Закрепление хозяев'
    },
    {
      num: '04',
      title: 'Регламент управленческих данных',
      desc: 'Проектируем формы сбора отчетов, статьи доходов и затрат, аналитические разрезы.',
      metric: 'Архитектура таблиц'
    },
    {
      num: '05',
      title: 'Выбор софта и Автоматизация',
      desc: 'Только теперь выбираем и настраиваем ERP или 1С. Программа лишь автоматизирует готовые правила.',
      metric: '1С ERP / BI-панели'
    }
  ];

  return (
    <section id="approach" className="py-24 bg-white border-b border-zinc-200/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-purple-50/10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-4 text-center mb-16">
          <span className="font-mono text-[10px] font-black text-purple-700 bg-purple-100 border border-purple-250 px-3 py-1 rounded-sm uppercase tracking-wider inline-block">
            МЕТОДОЛОГИЧЕСКИЙ МАНИФЕСТ
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Главный принцип — не автоматизировать хаос
          </h2>
          <p className="font-sans text-zinc-650 text-sm sm:text-base leading-relaxed">
            Попытка накатать дорогую IT-систему на неорганизованные процессы приводит к масштабной потере денег и переделкам.
            Автоматизация обязана <strong className="text-zinc-950">ускорять согласованные правила</strong>, а не придумывать их на лету.
          </p>
        </div>

        {/* Visual Workflow Steps (01 to 05) */}
        <div className="space-y-4 mb-20">
          <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block text-center mb-6 font-bold">
            ПРАВИЛЬНАЯ ЭВОЛЮЦИОННАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ ИЗМЕНЕНИЙ:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((st, idx) => (
              <div
                key={st.num}
                className="bg-zinc-50 border border-zinc-200 rounded-sm p-5 relative flex flex-col justify-between hover:border-purple-400 hover:bg-white transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-purple-650 opacity-90">
                      {st.num}
                    </span>
                    <span className="font-mono text-[8px] text-zinc-450 bg-white border border-zinc-200 px-1.5 py-0.5 rounded-sm uppercase font-bold">
                      STEP_{idx + 1}
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-sm text-zinc-900 tracking-tight leading-tight mb-2 group-hover:text-purple-700 transition-colors">
                    {st.title}
                  </h4>
                  <p className="font-sans text-zinc-600 text-xs leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                
                <div className="mt-5 pt-3 border-t border-zinc-150 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-purple-600 tracking-wider font-bold">
                    {st.metric}
                  </span>
                  {idx < 4 && (
                    <ArrowRight className="hidden lg:block w-3.5 h-3.5 text-zinc-300 shrink-0 group-hover:translate-x-1 group-hover:text-purple-500 transition-transform" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chaos vs System Comparative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4">
          
          {/* Traditional Way Box */}
          <div className="bg-rose-50/30 border border-rose-200 rounded-sm p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-rose-500/30 font-mono text-xs uppercase font-bold">ОШИБКА НА РЫНКЕ</div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-sm bg-rose-50 border border-rose-200">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-zinc-950 text-base">«Начнём с покупки лицензий ПО»</h3>
                <span className="font-mono text-[9px] text-rose-700 tracking-wider font-bold">CHAOS_PROTOCOL.TXT</span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed mb-6">
              Заказчик зовёт франчайзи 1С внедрять ERP в проектный или строительный бизнес, где регламенты не описаны и все роли перемешаны. Программисты честно переписывают код под ситуативные пожелания каждого работника без общей системы.
            </p>

            <div className="space-y-3 pt-4 border-t border-rose-200/60">
              <div className="flex items-start space-x-2.5 text-xs text-zinc-600">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5 font-mono">✖</span>
                <span>Сотрудники саботируют перегруженный софт со 100 обязательными полями.</span>
              </div>
              <div className="flex items-start space-x-2.5 text-xs text-zinc-600">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5 font-mono">✖</span>
                <span>Сроки сорваны на 6-12 месяцев, а ИТ-бюджет вырастает втрое без окупаемости.</span>
              </div>
              <div className="flex items-start space-x-2.5 text-xs text-rose-950 bg-rose-100/40 p-3 rounded-sm border border-rose-200/50">
                <span><strong>ИТОГ:</strong> Хаос + Автоматизация = Автоматизированный Хаос. Миллионы потрачены на систему, которой все пользуются из-под палки.</span>
              </div>
            </div>
          </div>

          {/* Architecture Way Box */}
          <div className="bg-purple-50/40 border border-purple-200/80 rounded-sm p-6 md:p-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-4 right-4 text-purple-500/40 font-mono text-xs uppercase font-bold">СТАНДАРТ АРХИТЕКТОРА</div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 rounded-sm bg-purple-100/80 border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 animate-pulse" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-zinc-950 text-base">«Начнём с архитектуры процессов»</h3>
                <span className="font-mono text-[9px] text-purple-700 tracking-wider font-bold">SYSTEM_STANDARD.TXT</span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed mb-6">
              Сначала мы четко прописываем, кто, когда и по какому регламенту проводит статьи расходов, отгружает склад, вносит первичку. Проверяем баланс конструкции на бумаге, снимаем саботаж и лишь затем оцифровываем рабочее ядро.
            </p>

            <div className="space-y-3 pt-4 border-t border-purple-200/60">
              <div className="flex items-start space-x-2.5 text-xs text-zinc-600">
                <span className="text-purple-650 font-bold shrink-0 mt-0.5 font-mono">✔</span>
                <span>Сотрудники легко онбордятся и учатся ещё на этапе описания регламентов.</span>
              </div>
              <div className="flex items-start space-x-2.5 text-xs text-zinc-600">
                <span className="text-purple-650 font-bold shrink-0 mt-0.5 font-mono">✔</span>
                <span>ТЗ сформулировано до кода — программисты 1С делают настройки быстро и точно.</span>
              </div>
              <div className="flex items-start space-x-2.5 text-xs text-purple-950 bg-purple-100/40 p-3 rounded-sm border border-purple-200/50">
                <span><strong>ИТОГ:</strong> Прозрачная оцифрованная система управления с первого месяца запуска. Вы получаете полный контроль над маржинальностью и оборачиваемостью.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
