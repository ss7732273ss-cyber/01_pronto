import { Award, HeartHandshake } from 'lucide-react';

export default function Bio() {
  const values = [
    {
      title: 'Уважение к фактам',
      desc: 'Я не верю субъективным рассказам менеджеров на словах. Мой единственный авторитет — это оцифрованные первичные данные в базах и верифицированные проводки.'
    },
    {
      title: 'Честность без инфобизнеса',
      desc: 'Я никогда не обещаю «лёгких автоматических миллионов за три дня». Построение системного учёта и порядка — это серьёзная, планомерная совместная работа.'
    },
    {
      title: 'Готовые регламенты «на берегу»',
      desc: 'Не притрагиваюсь к программированию баз данных, пока процессы не согласованы и не зафиксированы на бумаге у руководителей подразделений.'
    },
    {
      title: 'Передача компетенций',
      desc: 'Считаю проект успешным только тогда, когда ваша команда обучена и умеет самостоятельно работать по новым правилам без моего вечного участия.'
    }
  ];

  const credentials = [
    '25+ лет практического опыта в финансовом управлении и аудите',
    'Проектирование систем управления для многопрофильных строительных холдингов',
    'Десятки спасенных ИТ-бюджетов от хаотичного внедрения сырых ERP-систем',
    'Глубокая экспертиза в СХ, логистических цепочках, портах и импорте/экспорте',
  ];

  return (
    <section id="about" className="py-24 bg-[#FCFBFE] border-b border-zinc-200/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Bio columns - 5 cols */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-[10px] font-black text-purple-700 bg-purple-100 border border-purple-250 px-3 py-1 rounded-sm uppercase tracking-wider inline-block">
                ОПЫТ И ЭКСПЕРТИЗА
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
                Светлана Колтышева
              </h2>
              <p className="font-mono text-xs text-purple-700 uppercase tracking-widest font-extrabold pb-1">
                АРХИТЕКТОР СИСТЕМ УПРАВЛЕНИЯ & CFO
              </p>
            </div>

            {/* Custom stylized Avatar card */}
            <div className="relative group overflow-hidden rounded-sm border border-zinc-200 bg-white p-6 shadow-md backdrop-blur-sm">
              <div className="absolute -inset-0.5 bg-purple-500/5 rounded-sm blur opacity-5 group-hover:opacity-10 transition-opacity"></div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 rounded-sm bg-gradient-to-tr from-purple-650 to-indigo-600 flex items-center justify-center border border-purple-400 text-white font-sans font-bold text-xl shadow-md">
                  СК
                </div>
                <div>
                  <h4 className="font-sans font-bold text-neutral-900 text-sm">Светлана В. Колтышева</h4>
                  <span className="font-mono text-[9px] text-zinc-450 font-black tracking-wider">25 YEARS ON DUTY</span>
                </div>
              </div>

              <div className="space-y-3 font-sans text-xs text-zinc-650 leading-relaxed text-left">
                <p>
                  Моя задача как внешнего системного архитектора — не просто дать собственнику папки с бумажными стандартами, а наладить прозрачность во всех ключевых узлах предприятия.
                </p>
                <p>
                  Я разговариваю с собственниками на языке финансовой выгоды, с руководителями — на понятном языке регламентов, а с разработчиками ПО и 1С — на строгом языке баз данных и алгоритмов.
                </p>
              </div>
            </div>

            {/* Numbers cards column */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-zinc-200 rounded-sm text-center shadow-sm">
                <span className="font-mono text-3xl font-black text-purple-700 block leading-tight">25+</span>
                <span className="font-mono text-[8px] text-zinc-450 uppercase tracking-widest block mt-1 font-bold">Лет в финансах</span>
              </div>
              <div className="p-4 bg-white border border-zinc-200 rounded-sm text-center shadow-sm">
                <span className="font-mono text-3xl font-black text-purple-700 block leading-tight">0%</span>
                <span className="font-mono text-[8px] text-zinc-450 uppercase tracking-widest block mt-1 font-bold">Шаблонной воды</span>
              </div>
            </div>
          </div>

          {/* Right Principles & credentials - 7 cols */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quick credentials bullet points */}
            <div className="bg-white p-6 md:p-8 border border-zinc-200 rounded-sm space-y-4 shadow-sm text-left">
              <h3 className="font-sans font-bold text-zinc-950 text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-650" />
                Ключевые рубежи опыта (Credentials)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {credentials.map((cred, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-zinc-650">
                    <span className="text-purple-650 font-bold shrink-0">✔</span>
                    <span className="font-sans leading-relaxed">{cred}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values list */}
            <div className="space-y-4 text-left">
              <h3 className="font-sans font-bold text-zinc-950 text-base flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-purple-650" />
                Мой этический регламент работы
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {values.map((v, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-50 border border-zinc-205 rounded-sm p-5 space-y-2 hover:border-purple-300 hover:bg-white transition-all duration-200 shadow-sm"
                  >
                    <span className="font-mono text-[9px] text-purple-700 uppercase tracking-widest block font-bold">
                      ПРИНЦИП {idx + 1}
                    </span>
                    <h4 className="font-sans font-bold text-sm text-zinc-950 tracking-tight">
                      {v.title}
                    </h4>
                    <p className="font-sans text-zinc-650 text-xs leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
