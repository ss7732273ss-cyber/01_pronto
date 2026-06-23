import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Phone, Mail, Compass, Printer } from 'lucide-react';
import { FeedbackSubmission } from '../types';

interface ContactFormProps {
  autofillText: string;
}

export default function ContactForm({ autofillText }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [problem, setProblem] = useState('');
  const [contactType, setContactType] = useState<'telegram' | 'phone' | 'email'>('telegram');
  const [contactDetail, setContactDetail] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<FeedbackSubmission | null>(null);

  useEffect(() => {
    if (autofillText) {
      setProblem(autofillText);
      // Try to parse industry if present
      if (autofillText.includes('Отрасль: ')) {
        const indPart = autofillText.split('Bottleneck: ')[0].replace('Отрасль: ', '').trim();
        setIndustry(indPart);
      }
    }
  }, [autofillText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !contactDetail) {
      alert('Пожалуйста, заполните основные поля: Имя, Телефон и контактную деталь связи.');
      return;
    }

    setIsSubmitting(true);

    const submission: FeedbackSubmission = {
      id: 'ticket-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      name,
      phone,
      company: company || 'Частное лицо',
      industry: industry || 'Не указана',
      problem: problem || 'Заявка на консультацию общего характера',
      contactType,
      contactDetail,
      timestamp: new Date().toLocaleString('ru-RU')
    };

    // Save submission to localStorage safely
    try {
      const existing = JSON.parse(localStorage.getItem('svetlana_leads') || '[]');
      existing.push(submission);
      localStorage.setItem('svetlana_leads', JSON.stringify(existing));
    } catch (_) {}

    // Simulate server networks pipeline response delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedTicket(submission);
      
      // Reset form fields
      setName('');
      setPhone('');
      setCompany('');
      setIndustry('');
      setProblem('');
      setContactDetail('');
    }, 1250);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="contact" className="py-24 bg-[#F8F7FA] border-t border-zinc-200 relative scroll-mt-20">
      <div className="absolute inset-0 bg-purple-50/20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column Text details - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 select-none">
            <div className="space-y-6 text-left">
              <span className="font-mono text-[10px] font-black text-purple-700 bg-purple-100 border border-purple-250 px-3 py-1 rounded-sm uppercase tracking-wider inline-block">
                СВЯЗЬ И ЗАЯВКА
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                Обсудим оздоровление вашей компании?
              </h2>
              <p className="font-sans text-zinc-650 text-sm leading-relaxed">
                Заполните замеры, и я рассмотрю вашу конфигурацию. Мы проведем 30-минутную вводную сессию, разберем текущую «смертность» в Excel-таблицах и согласуем план оздоровления.
              </p>
            </div>

            {/* Direct Contacts List panel */}
            <div className="space-y-4 pt-6 border-t border-zinc-200 font-sans text-left">
              <div className="flex items-center space-x-3.5 text-zinc-700 text-xs sm:text-sm">
                <div className="p-2.5 rounded-sm bg-white border border-zinc-200 shadow-sm">
                  <Phone className="w-4 h-4 text-purple-650" />
                </div>
                <div>
                  <span className="block text-[8px] text-zinc-400 uppercase font-mono font-bold tracking-wider">ТЕЛЕФОН ЭКСПЕРТА</span>
                  <a href="tel:+79998887766" className="text-zinc-900 hover:text-purple-650 transition-colors font-bold">+7 999 888 77 66</a>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 text-zinc-700 text-xs sm:text-sm">
                <div className="p-2.5 rounded-sm bg-white border border-zinc-200 shadow-sm">
                  <Mail className="w-4 h-4 text-purple-650" />
                </div>
                <div>
                  <span className="block text-[8px] text-zinc-400 uppercase font-mono font-bold tracking-wider">ОФИЦИАЛЬНЫЙ EMAIL</span>
                  <a href="mailto:svetlana.k@system-cfo.ru" className="text-zinc-900 hover:text-purple-650 transition-colors font-bold font-mono">svetlana.k@system-cfo.ru</a>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 text-zinc-700 text-xs sm:text-sm">
                <div className="p-2.5 rounded-sm bg-white border border-zinc-200 shadow-sm">
                  <Compass className="w-4 h-4 text-purple-650" />
                </div>
                <div>
                  <span className="block text-[8px] text-zinc-400 uppercase font-mono font-bold tracking-wider">TELEGRAM HANDLER</span>
                  <a href="https://t.me/svetlana_cfo" target="_blank" rel="noreferrer" className="text-purple-600 hover:text-purple-750 transition-colors font-bold">@svetlana_system_cfo</a>
                </div>
              </div>
            </div>

            <p className="font-mono text-[9px] text-zinc-400 uppercase leading-relaxed font-bold text-left">
              * ВСЕ ДАННЫЕ О ВАШЕЙ КОМПАНИИ, ОБОРОТАХ И БЮДЖЕТАХ СТРОГО КОНФИДЕНЦИАЛЬНЫ. РАБОТА СТРОГО СОПРОВОЖДАЕТСЯ NDA ТИПОВОГО ОБРАЗЦА ДО НАЧАЛА ГЛУБОКОГО АУДИТА.
            </p>
          </div>

          {/* Right Column Form or Success ticket - 7 cols */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!submittedTicket ? (
                <motion.form
                  key="contact-form-key"
                  className="bg-white p-6 sm:p-8 rounded-sm border border-zinc-200 shadow-md relative overflow-hidden flex flex-col justify-between"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                >
                  <span className="font-mono text-[9px] text-zinc-450 uppercase tracking-widest block mb-4 border-b border-zinc-150 pb-2 font-bold text-left">
                    АНКЕТА ДИАГНОСТИКИ И АНАЛИЗА КОМПАНИИ:
                  </span>

                  <div className="space-y-4 text-left">
                    {/* Double row: Name, Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-zinc-500 uppercase font-bold">
                          Ваше Имя / Отчество: *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Константин"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-zinc-50 text-zinc-950 rounded-sm border border-zinc-200 focus:border-purple-600 focus:bg-white focus:outline-none px-4 py-3 text-xs sm:text-sm transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-zinc-500 uppercase font-bold">
                          Название Компании:
                        </label>
                        <input
                          type="text"
                          placeholder="ООО Спецстрой"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full bg-zinc-50 text-zinc-950 rounded-sm border border-zinc-200 focus:border-purple-600 focus:bg-white focus:outline-none px-4 py-3 text-xs sm:text-sm transition-colors"
                        />
                      </div>
                    </div>

                    {/* Double row: Phone, Industry */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-zinc-500 uppercase font-bold">
                          Контактный Телефон: *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+7 (999) 000-00-00"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-zinc-50 text-zinc-950 rounded-sm border border-zinc-200 focus:border-purple-600 focus:bg-white focus:outline-none px-4 py-3 text-xs sm:text-sm transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-zinc-500 uppercase font-bold">
                          Отрасль Бизнеса:
                        </label>
                        <input
                          type="text"
                          placeholder="Строительство холдинг"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="w-full bg-zinc-50 text-zinc-950 rounded-sm border border-zinc-200 focus:border-purple-600 focus:bg-white focus:outline-none px-4 py-3 text-xs sm:text-sm transition-colors"
                        />
                      </div>
                    </div>

                    {/* Problem detailed text area */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-zinc-500 uppercase font-bold">
                        Какая задача/симптомы хаоса в первую очередь актуальны?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Кассовые разрывы, саботируют регламенты, Excel-путаница во взаиморасчетах..."
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        className="w-full bg-zinc-50 text-zinc-950 rounded-sm border border-zinc-200 focus:border-purple-600 focus:bg-white focus:outline-none px-4 py-3 text-xs sm:text-sm transition-colors resize-none"
                      />
                    </div>

                    {/* Contact preference select row */}
                    <div className="space-y-2 border-t border-zinc-150 pt-4">
                      <label className="font-mono text-[10px] text-zinc-500 uppercase font-bold block">
                        Где удобнее получить ответ эксперта? *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['telegram', 'phone', 'email'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setContactType(type)}
                            className={`p-2.5 rounded-full border text-[11px] font-bold uppercase transition-all cursor-pointer ${
                              contactType === type
                                ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-purple-50 hover:text-purple-955'
                            }`}
                          >
                            {type === 'telegram' ? 'Telegram' : type === 'phone' ? 'Звонок' : 'Email'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Direct Contact detail input */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-purple-700 uppercase font-bold">
                        Укажите {contactType === 'telegram' ? 'Ник в Telegram' : contactType === 'phone' ? 'Номер связи' : 'Ваш рабочий Email'}: *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={contactType === 'telegram' ? '@username' : contactType === 'phone' ? '+7...' : 'ceo@firm.ru'}
                        value={contactDetail}
                        onChange={(e) => setContactDetail(e.target.value)}
                        className="w-full bg-zinc-50 text-zinc-950 rounded-sm border border-purple-250 focus:border-purple-600 focus:bg-white focus:outline-none px-4 py-3 text-xs sm:text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submission CTA button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer font-sans"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>ОТПРАВКА ДАННЫХ...</span>
                      </>
                    ) : (
                      <>
                        <span>ОТПРАВИТЬ ЗАЯВКУ НА РАЗБОР</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-ticket-key"
                  className="bg-white border border-purple-300 p-6 md:p-8 rounded-sm shadow-lg relative text-left"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {/* Glowing success badge */}
                  <div className="flex items-center space-x-3 mb-6 bg-purple-50 p-4 border border-purple-200 rounded-sm">
                    <CheckCircle className="w-6 h-6 text-purple-600 shrink-0" />
                    <div>
                      <h3 className="font-sans font-bold text-purple-950 text-base">Заявка зарегистрирована!</h3>
                      <p className="font-sans text-xs text-purple-700 font-medium">Сформирован диагностический аудит-тикет.</p>
                    </div>
                  </div>

                  {/* High fidelity ticket receipt */}
                  <div className="bg-zinc-50 p-5 rounded-sm border border-zinc-200 border-dashed space-y-4 font-mono text-[11px] text-zinc-650">
                    <div className="flex justify-between border-b border-zinc-200 pb-2">
                      <span className="text-zinc-450">TICKET_ID:</span>
                      <span className="text-zinc-950 font-black">{submittedTicket.id}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>КОНТАКТНОЕ ЛИЦО:</span>
                      <span className="text-zinc-950 font-bold">{submittedTicket.name}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>ОРГАНИЗАЦИЯ:</span>
                      <span className="text-zinc-950 font-bold">{submittedTicket.company}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>СПОСОБ СВЯЗИ:</span>
                      <span className="text-purple-700 font-bold uppercase">{submittedTicket.contactType} ({submittedTicket.contactDetail})</span>
                    </div>

                    <div className="border-t border-zinc-200 pt-3">
                      <span className="text-zinc-450 block mb-1">ФИКСИРОВАННЫЙ СИМПТОМ ОШИБКИ:</span>
                      <p className="font-sans text-xs text-zinc-700 bg-white p-2.5 rounded-sm border border-zinc-200">
                        {submittedTicket.problem}
                      </p>
                    </div>

                    <div className="bg-purple-50/60 p-3.5 rounded-sm border border-purple-200 text-purple-950 font-sans text-xs leading-relaxed">
                      <strong>Анализ Архитектора:</strong> Автоматический верификатор зарезервировал за вами 30-минутную слотовую сессию разбора со Светланой Колтышевой. Пожалуйста, держите аккаунт <strong>{submittedTicket.contactDetail}</strong> открытым для связи.
                    </div>
                  </div>

                  {/* Actions buttons inside ticket success drawer */}
                  <div className="mt-8 pt-4 flex gap-3 text-xs uppercase font-bold select-none">
                    <button
                      onClick={handlePrint}
                      className="flex-1 flex items-center justify-center space-x-2 bg-zinc-50 hover:bg-zinc-150 border border-zinc-200 text-zinc-750 py-3 rounded-sm transition-colors cursor-pointer font-sans"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Печать тикета</span>
                    </button>
                    <button
                      onClick={() => setSubmittedTicket(null)}
                      className="flex-1 py-3 text-center border border-purple-300 text-purple-700 hover:bg-purple-50 rounded-sm transition-all cursor-pointer font-sans"
                    >
                      ОК, продолжить
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
