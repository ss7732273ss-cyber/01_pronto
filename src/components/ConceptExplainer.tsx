import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, CheckCircle, Award } from 'lucide-react';

interface ConceptExplainerProps {
  onClose: () => void;
}

export default function ConceptExplainer({ onClose }: ConceptExplainerProps) {
  const [activeTab, setActiveTab] = useState<'ux-logic' | 'structure' | 'visual' | 'guides'>('ux-logic');

  return (
    <div id="ux-concept-sidebar" className="bg-white border-l border-zinc-200 h-full overflow-y-auto p-6 text-zinc-700">
      <div className="flex items-center justify-between border-b border-zinc-150 pb-4 mb-6">
        <div className="flex items-center space-x-2.5">
          <Award className="w-5 h-5 text-purple-600 animate-pulse" />
          <div className="text-left">
            <h3 className="font-sans font-bold text-zinc-950 text-base">Концепция Архитектора</h3>
            <p className="font-mono text-[10px] text-purple-700 font-extrabold tracking-wider">UX / UI / COPY / ARCHITECTURE DOCS</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer"
          title="Закрыть панель концепции"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1 bg-zinc-100 p-1 rounded-full border border-zinc-200 mb-6 text-[11px] font-bold tracking-wide select-none">
        <button
          onClick={() => setActiveTab('ux-logic')}
          className={`py-2 rounded-full transition-all text-center cursor-pointer ${
            activeTab === 'ux-logic'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-zinc-550 hover:text-zinc-905'
          }`}
        >
          UX
        </button>
        <button
          onClick={() => setActiveTab('structure')}
          className={`py-2 rounded-full transition-all text-center cursor-pointer ${
            activeTab === 'structure'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-zinc-550 hover:text-zinc-905'
          }`}
        >
          Структура
        </button>
        <button
          onClick={() => setActiveTab('visual')}
          className={`py-2 rounded-full transition-all text-center cursor-pointer ${
            activeTab === 'visual'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-zinc-550 hover:text-zinc-905'
          }`}
        >
          Айдентика
        </button>
        <button
          onClick={() => setActiveTab('guides')}
          className={`py-2 rounded-full transition-all text-center cursor-pointer ${
            activeTab === 'guides'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-zinc-550 hover:text-zinc-905'
          }`}
        >
          Деплой
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6 font-sans">
        {activeTab === 'ux-logic' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5 text-sm leading-relaxed text-left"
          >
            <div className="bg-purple-50 rounded-sm p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-950 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-650" />
                Главное позиционирование сайта
              </h4>
              <p className="text-zinc-700 text-xs sm:text-sm">
                Сайт не продаёт локальные ИТ-программы или сырые Excel таблицы. Он продает{' '}
                <strong className="text-purple-950 font-extrabold">управляемость</strong> — способность собственника контролировать
                все узлы бизнеса за счет слияния <strong>бизнеса, людей, процессов, учета и данных</strong> в единую архитектуру.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-zinc-950 tracking-wide border-b border-zinc-150 pb-2 uppercase text-xs">
                Сценарная UX-карта пользователя (CJM)
              </h4>

              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200/60">
                <div className="relative pl-7">
                  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-purple-600"></div>
                  <h5 className="font-bold text-zinc-900 text-xs uppercase text-purple-750">Этап 1: Доверие и Снятие Барьеров</h5>
                  <p className="text-zinc-650 text-xs mt-0.5">
                    Собственник заходит и видит строгий премиальный стиль, мягкие лавандовые оттенки и полное отсутствие инфобизнесовых клише.
                  </p>
                </div>

                <div className="relative pl-7">
                  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-purple-500"></div>
                  <h5 className="font-bold text-zinc-900 text-xs uppercase text-purple-750">Этап 2: Провокация Самоанализа</h5>
                  <p className="text-zinc-650 text-xs mt-0.5">
                    В блоке «С какими отраслями работаю» собственник видит свои симптомы и боли (Excel-хаос, кассовые разрывы), увязанные с отраслью.
                  </p>
                </div>

                <div className="relative pl-7">
                  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-purple-400"></div>
                  <h5 className="font-bold text-zinc-900 text-xs uppercase text-purple-750">Этап 3: Двойной Вовлекающий Сценарий</h5>
                  <p className="text-zinc-650 text-xs mt-0.5">
                    1) <strong>Матрица Экспертизы</strong> раскрывает логику 9 услуг.<br />
                    2) <strong>Калькулятор-Тест</strong> позволяет за секунды замерить зрелость компании и структурировать личные боли.
                  </p>
                </div>

                <div className="relative pl-7">
                  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-purple-600 animate-pulse"></div>
                  <h5 className="font-bold text-zinc-900 text-xs uppercase text-purple-750">Этап 4: Направленная Конверсия</h5>
                  <p className="text-zinc-650 text-xs mt-0.5">
                    Собственник видит 6 глубоких проработанных кейсов по реальным слайдам Светланы. Кнопка «Отправить» предлагает оцифровать его диагностику.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-zinc-950 tracking-wide border-b border-zinc-150 pb-2 uppercase text-xs">Психологические триггеры</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Триггер Системы:</strong> Раскрывает жесткую правду. Исключает веру в волшебную кнопку. Повышает средний чек сделки.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Триггер Спокойствия:</strong> Цветовая гамма светлой дорогой Европы (лавандовые тени, много воздуха) транслирует интеллектуальную стабильность.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {activeTab === 'structure' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-xs text-left"
          >
            <h4 className="font-bold text-zinc-950 text-sm tracking-wide border-b border-zinc-150 pb-2">
              Архитектурная структура лендинга
            </h4>

            <div className="space-y-3 font-mono">
              <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-sm">
                <span className="text-purple-700 font-bold">1. Hero (Первый экран)</span>
                <p className="text-zinc-650 text-[11px] mt-1 font-sans">
                  Мощный заголовок с трансляцией главной идеи «Модель бизнеса как система». Три селектора Светланы под разные типы сознания.
                </p>
              </div>

              <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-sm">
                <span className="text-purple-700 font-bold">2. My Superpower (Суперсила)</span>
                <p className="text-zinc-650 text-[11px] mt-1 font-sans">
                  Смена локального взгляда (латание дыр) на системный взгляд на бизнес Светланы (связи, процессы, отчеты).
                </p>
              </div>

              <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-sm">
                <span className="text-purple-700 font-bold">3. Target Matrix (Отрасли)</span>
                <p className="text-zinc-650 text-[11px] mt-1 font-sans">
                  Строительство, логистика, порты, холдинги, закупки. Прямые целевые триггеры с разбором специфики.
                </p>
              </div>

              <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-sm">
                <span className="text-purple-700 font-bold">4. Interactive Services Catalog (Услуги)</span>
                <p className="text-zinc-650 text-[11px] mt-1 font-sans">
                  9 карточек услуг с детализацией: Проблема - Результат - Формат работы - Эффект.
                </p>
              </div>

              <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-sm">
                <span className="text-purple-700 font-bold">5. Methodology Dashboard (Принцип)</span>
                <p className="text-zinc-650 text-[11px] mt-1 font-sans">
                  «Не автоматизировать хаос». Как избежать слива ИТ бюджетов на сырые ERP-системы.
                </p>
              </div>

              <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-sm">
                <span className="text-purple-700 font-bold">6. Case Studies Ledger (Кейсы)</span>
                <p className="text-zinc-650 text-[11px] mt-1 font-sans">
                  6 кейсов по реальным слайдам: 500 млн дефицита, оцифровка складов на 22%, НДС холдинга, стыковка 8 человек.
                </p>
              </div>

              <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-sm">
                <span className="text-purple-700 font-bold">7. Interactive Diagnostic Widget (Селф-тест)</span>
                <p className="text-zinc-650 text-[11px] mt-1 font-sans">
                  Опросник для замера уровня хаоса. Позволяет за три клика сложить личную спецификацию болей.
                </p>
              </div>

              <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-sm">
                <span className="text-purple-700 font-bold">8. Expert Profile (Био)</span>
                <p className="text-zinc-650 text-[11px] mt-1 font-sans">
                  25 лет опыта, этический регламент, красные линии её карьеры, полное отсутствие воздуха и клише.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'visual' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-xs text-left"
          >
            <h4 className="font-bold text-zinc-950 text-sm tracking-wide border-b border-zinc-150 pb-2">
              Визуальный стиль и концепция UI
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-zinc-50 border border-zinc-200 rounded-sm">
                <span className="text-zinc-400 block text-[10px] uppercase font-mono font-bold">Фоны</span>
                <span className="text-zinc-900 font-medium text-xs font-sans">Лавандовые и белые</span>
                <div className="h-4 w-full bg-[#FCFBFE] border border-zinc-200 rounded mt-1"></div>
              </div>
              <div className="p-2 bg-zinc-50 border border-zinc-200 rounded-sm">
                <span className="text-zinc-400 block text-[10px] uppercase font-mono font-bold">Акцент</span>
                <span className="text-purple-700 font-medium text-xs font-sans">Пыльно-лиловая гамма</span>
                <div className="h-4 w-full bg-gradient-to-r from-purple-600 to-indigo-650 border border-zinc-200 rounded mt-1"></div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-semibold text-zinc-900 flex items-center gap-1 font-sans text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                Европейский консалтинг
              </h5>
              <p className="text-zinc-650 leading-relaxed text-[11px] font-sans">
                Эстетика построена на воздухе, чистой швейцарской сетке, лавандово-лиловых оттенках и благородном сером контрасте. Это передает европейскую прецизионность и высокий уровень доверия, уходя от агрессивных красно-черных триггеров.
              </p>

              <h5 className="font-semibold text-zinc-900 flex items-center gap-1 font-sans text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                Двухслойная типографика
              </h5>
              <p className="text-zinc-650 leading-relaxed text-[11px] font-sans">
                Заголовки оформлены геометрическим гротеском с плотным трекингом, а схемы, индексы и технологические выкладки выполнены в <strong>JetBrains Mono</strong>. Это подтверждает точность финансовых изысканий Светланы.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'guides' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-xs text-left"
          >
            <div>
              <h4 className="font-bold text-zinc-950 text-sm tracking-wide border-b border-zinc-150 pb-1">
                Инструкция по развертыванию
              </h4>
              <p className="text-zinc-400 block text-[10px] mb-2 uppercase font-bold">ДЕПЛОЙ НА GITHUB PAGES ИЛИ LANDING</p>
              
              <ol className="space-y-2 list-decimal list-inside text-[11px] leading-relaxed font-sans text-zinc-650">
                <li>
                  <strong>Сборка проекта:</strong> Запустите в терминале: <br />
                  <code className="text-purple-700 font-mono bg-zinc-100 px-1 py-0.5 rounded-sm text-[10px] font-bold">npm run build</code>. Это создаст оптимизированные бандлы в <code className="text-zinc-500 font-mono text-[10px]">dist/</code>.
                </li>
                <li>
                  <strong>Интеграция Git:</strong> Если репозиторий еще не связан с удаленным: <br />
                  <code className="text-zinc-500 font-mono bg-zinc-100 px-1 py-0.5 rounded-sm text-[10px]">git init</code>.
                </li>
                <li>
                  <strong>Пакет gh-pages:</strong> Установите дев-зависимость:<br />
                  <code className="text-purple-700 font-mono bg-zinc-100 px-1 py-0.5 rounded-sm text-[10px] font-bold">npm install -D gh-pages</code>.
                </li>
                <li>
                  <strong>Настройка в package.json:</strong> Добавьте в файл:<br />
                  <code className="text-zinc-500 font-mono bg-zinc-100 block p-1.5 rounded-sm text-[9px] mt-1 whitespace-pre">
                    "homepage": "https://&lt;username&gt;.github.io/&lt;repo&gt;"
                  </code>
                </li>
                <li>
                  <strong>Верификация на мобильных:</strong> На экранах <code className="text-purple-600 font-mono font-bold">xs/sm</code> вся сетка мягко складывается в единый вертикальный стек. Сенсорные зоны входа спроектированы в 48+ пикселей.
                </li>
              </ol>
            </div>

            <div>
              <h4 className="font-bold text-zinc-950 text-sm tracking-wide border-b border-zinc-150 pb-1">
                Идеи на будущее
              </h4>
              <ul className="space-y-1 list-disc list-inside font-sans text-zinc-650 text-[11px]">
                <li>Клиентский кабинет для загрузки первичных 1С выгрузок.</li>
                <li>Симулятор кассовых разрывов на формулах.</li>
                <li>Защищенный архив готовых ТЗ и регламентов.</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
