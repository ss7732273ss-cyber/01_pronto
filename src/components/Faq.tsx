import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircleCode } from 'lucide-react';
import { FaqItem } from '../types';

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'У нас есть опытный главный бухгалтер. Зачем нам привлекать отдельного финансового директора?',
      answer: 'Это фундаментальное различие ролей. Главбух собирает совершившиеся факты прошлого для ФНС, чтобы сдать балансы без штрафов. Руководство по налогам — это оглядывание назад. Финансовый директор нацелен в будущее: он рассчитывает рентабельность до сделки, находит неэффективную себестоимость, управляет ликвидностью и оцифровывает сценарии масштабирования.'
    },
    {
      id: 'faq-2',
      question: 'Прекрасно работаем в Excel. Зачем нам автоматизировать сбор данных?',
      answer: 'Excel — превосходный гибкий полигон для прототипов. Но когда в бизнесе появляется несколько юрлиц, сложные склады или более 50 сотрудников, ручные пересылки ломают данные. Люди тратят 75% времени не на анализ рынка, а на вязку кривых ссылок в ячейках. Автоматизация в 1С или BI освобождает время для принятия решений.'
    },
    {
      id: 'faq-3',
      question: 'Наши ИТ-подрядчики утверждают, что ТЗ не нужно и они напишут ERP «по ходу дела». Стоит ли верить?',
      answer: 'Это классический капкан. Программист не является экономистом — он напишет код точно под хаотичный диктат со стороны каждого кладовщика или прораба. Без ТЗ проект внедрения софта гарантированно растянется на 1,5 года, а бюджет вырастет вдвое из-за бесконечных переделок ядра.'
    },
    {
      id: 'faq-4',
      question: 'Когда мы увидим первые результаты от внедрения архитектуры учета?',
      answer: 'Диагностика узких горлышек занимает 10–14 дней. Первые регламенты и отчет ДДС вводятся за месяц. Полное построение управленческого финансового учета с балансом и бюджетированием «под ключ» на крупных объектах занимает от 3 до 6 месяцев в зависимости от зрелости вашей команды.'
    },
    {
      id: 'faq-5',
      question: 'Что делать, если сотрудники саботируют ваши регламенты и инновации?',
      answer: 'Саботаж возникает из-за непонимания сотрудниками целей и чрезмерно усложненного интерфейса ввода. Я вовлекаю ключевых руководителей среднего звена в проектирование стандартов, пишу понятные регламенты на 1 лист формата А4 и автоматизирую рутину. Люди любят софт, когда он избавляет их от нудной работы.'
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#FCFBFE] border-b border-zinc-200/60 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-purple-100/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto space-y-4 text-center mb-16">
          <span className="font-mono text-[10px] font-black text-purple-700 bg-purple-100 border border-purple-250 px-3 py-1 rounded-sm uppercase tracking-wider inline-block">
            ОТВЕТЫ НА ВОЗРАЖЕНИЯ
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Разбираем частые вопросы и сомнения
          </h2>
          <p className="font-sans text-zinc-650 text-sm sm:text-base leading-relaxed">
            Честный профессиональный разбор страхов собственника при переходе от интуитивного управления к прозрачной жесткой архитектуре процессов.
          </p>
        </div>

        {/* Faq List */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-sm border transition-colors shadow-sm ${
                  isOpen
                    ? 'border-purple-400 bg-purple-50/15'
                    : 'border-zinc-200 hover:border-purple-200'
                }`}
              >
                <div className="rounded-sm">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between text-zinc-900 focus:outline-none cursor-pointer"
                  >
                    <span className="font-sans font-bold text-sm sm:text-base tracking-tight pr-6">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-purple-650' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-650 leading-relaxed border-t border-zinc-150">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing support banner inside FAQ */}
        <div className="mt-12 bg-white p-5 rounded-sm border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs shadow-sm">
          <div className="flex items-center space-x-2.5">
            <MessageCircleCode className="w-5 h-5 text-purple-600 shrink-0" />
            <span className="text-zinc-600 font-bold">Остался специфический вопрос по вашему балансу или холдингу?</span>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-purple-600 font-bold hover:text-purple-750 uppercase tracking-wider block cursor-pointer transition-colors"
          >
            Спросить напрямую →
          </button>
        </div>

      </div>
    </section>
  );
}
