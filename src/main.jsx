import React,{useEffect,useState,useRef} from 'react';
import{createRoot}from'react-dom/client';
import{ArrowUpRight,Menu,X,MapPin,Phone,Clock3,Star,Scissors,ChevronDown,Instagram,Check}from'lucide-react';
import './style.css';
const Y='https://yandex.ru/maps/org/kultura_07/172417877222/';
const masters=[
 {name:'Александр',role:'БАРБЕР',photo:'images/alexander.webp',note:'Внимание к деталям и точная работа с формой. Гости отмечают консультацию и рекомендации по укладке.'},
 {name:'Эмир',role:'БАРБЕР',photo:'images/emir.webp',note:'Постоянные гости отдельно отмечают стабильное качество и внимательное отношение к пожеланиям.'},
 {name:'Рафаэль',role:'БАРБЕР',photo:'images/rafael.webp',note:'Индивидуальный подход, работа с формой и бородой. Помогает подобрать образ и объясняет нюансы укладки.'},
 {name:'Макс',role:'БАРБЕР',photo:'images/max.webp',note:'Умеет точно повторить референс и подсказать, как поддерживать форму и укладывать волосы дома.'}
];
const prices=[
 {group:'СТРИЖКА',rows:[['Стрижка','1 800 ₽','2 000 ₽','2 500 ₽'],['Детская стрижка','1 400 ₽','1 600 ₽','2 000 ₽'],['Стрижка + борода','2 700 ₽','3 000 ₽','3 500 ₽'],['Стрижка + борода + тонировка','3 300 ₽','4 000 ₽','4 000 ₽'],['Отец и сын','2 600 ₽','3 400 ₽','4 000 ₽'],['Окантовка стрижки','500 ₽','500 ₽','—'],['Бритьё головы','—','1 500 ₽','1 500 ₽']]},
 {group:'БОРОДА',rows:[['Стрижка бороды и усов','1 200 ₽','1 500 ₽','1 500 ₽'],['Борода + тонировка','2 200 ₽','2 500 ₽','2 500 ₽']]},
 {group:'ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ',rows:[['Укладка','700 ₽','700 ₽','—'],['Коррекция воском 1 зоны','300 ₽','300 ₽','—'],['Окрашивание головы','1 500 ₽','1 500 ₽','—'],['Химическая завивка','—','от 4 000 ₽','—']]}
];
const works = [
  {
    id: 1,
    title: 'LOW FADE',
    sub: 'Чистый переход и текстура',
    img: '/images/works/boroda.webp',
    category: 'hair',
    master: 'Александр',
    duration: '45 минут',
    price: '2 000 ₽'
  },
  {
    id: 2,
    title: 'CLASSIC CUT',
    sub: 'Классическая форма',
    img: '/images/works/strij.webp',
    category: 'hair',
    master: 'Эмир',
    duration: '50 минут',
    price: '1 800 ₽'
  },
  {
    id: 3,
    title: 'BEARD DESIGN',
    sub: 'Контур и геометрия',
    img: '/images/works/1.webp',
    category: 'beard',
    master: 'Рафаэль',
    duration: '30 минут',
    price: '1 500 ₽'
  },
  {
    id: 4,
    title: 'TOTAL LOOK',
    sub: 'Стрижка и оформление бороды',
    img: '/images/works/boroda.webp',
    category: 'combo',
    master: 'Макс',
    duration: '60 минут',
    price: '3 000 ₽'
  },
  {
    id: 5,
    title: 'SLICK BACK',
    sub: 'Чёткая форма с укладкой назад',
    img: '/images/works/3.webp',
    category: 'hair',
    master: 'Александр',
    duration: '50 минут',
    price: '2 200 ₽'
  },
  {
    id: 6,
    title: 'BURST FADE',
    sub: 'Акцентный переход и динамичная форма',
    img: '/images/works/6.webp',
    category: 'hair',
    master: 'Эмир',
    duration: '45 минут',
    price: '2 300 ₽'
  },
  {
    id: 7,
    title: 'SCULPTED BEARD',
    sub: 'Архитектурная форма и проработанный контур',
    img: '/images/works/7.webp',
    category: 'beard',
    master: 'Рафаэль',
    duration: '35 минут',
    price: '1 700 ₽'
  },
  {
    id: 8,
    title: 'URBAN COMBO',
    sub: 'Текстурная стрижка и оформление бороды',
    img: '/images/works/2.webp',
    category: 'combo',
    master: 'Макс',
    duration: '70 минут',
    price: '3 200 ₽'
  },
  {
    id: 9,
    title: 'SOFT TAPER',
    sub: 'Мягкое сужение и естественный объём',
    img: '/images/works/6.webp',
    category: 'hair',
    master: 'Александр',
    duration: '40 минут',
    price: '2 000 ₽'
  },
];
const reviews=[
 {name:'Рустам',date:'11 августа',text:'Рафаэль с первого взгляда понял, что мне нужно. Особенно отмечу работу с бородой — линии выведены идеально, переходы плавные, всё симметрично.'},
 {name:'Leysan Akhmetvaleeva',date:'20 июня',text:'Барбер Александр справился на 100/10. Провёл консультацию, постриг и порекомендовал средство для укладки. Супер сервис и качество!'},
 {name:'RELAX Disney',date:'11 августа',text:'Мастера прислушиваются к каждому слову и делают именно так, как хотелось. Особенно хочется выделить барбера Рафаэля.'},
 {name:'Керим Гурбашыев',date:'7 августа',text:'Стригусь на протяжении долгого времени у Эмира, мастер вообще топ, всегда делает всё по красоте.'},
 {name:'Алексей К.',date:'21 февраля',text:'Максим в точности воспроизвёл стрижку с фото, дал рекомендации по укладке и уходу. Рекомендую, вернусь.'}
];
function App(){
 const [menu, setMenu] = useState(false);
const [active, setActive] = useState('');
const [tier, setTier] = useState('all');
const [selected, setSelected] = useState('');

const [workFilter, setWorkFilter] = useState('all');
const [workIndex, setWorkIndex] = useState(null);

const [booking, setBooking] = useState(false);
const [bookingSent, setBookingSent] = useState(false);
const [bookingMaster, setBookingMaster] = useState('Не важно');
const openBooking = (master = 'Не важно') => { setBookingMaster(master); setBookingSent(false); setBooking(true); };

const visibleWorks = works.filter(
  w => workFilter === 'all' || w.category === workFilter
);

const moveWork = (step) => {
  setWorkIndex(current => {
    if (current === null) return 0;
    return (current + step + visibleWorks.length) % visibleWorks.length;
  });
};
useEffect(() => {
  if (workIndex === null && !booking) return;

  const handleKey = (e) => {
    if (booking && e.key === 'Escape') {
      setBooking(false);
      setBookingSent(false);
      return;
    }

    if (workIndex !== null) {
      if (e.key === 'Escape') setWorkIndex(null);
      if (e.key === 'ArrowRight') moveWork(1);
      if (e.key === 'ArrowLeft') moveWork(-1);
    }
  };

  document.addEventListener('keydown', handleKey);

  document.body.style.overflow = 'hidden';

  return () => {
    document.removeEventListener('keydown', handleKey);
    document.body.style.overflow = '';
  };
}, [workIndex, booking, visibleWorks.length]);

 useEffect(()=>{
  const revealObserver = new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(entry.isIntersecting){
     entry.target.classList.add('is-visible');
     revealObserver.unobserve(entry.target);
    }
   });
  }, {root:null, rootMargin:'0px 0px -8% 0px', threshold:0.04});

  document.querySelectorAll('.reveal:not(.master-card)').forEach(element=>{
   element.classList.add('scroll-reveal');
   revealObserver.observe(element);
  });

  const sectionObserver = new IntersectionObserver(entries=>{
   const visible = entries
    .filter(entry=>entry.isIntersecting)
    .sort((a,b)=>Math.abs(a.boundingClientRect.top-window.innerHeight*.4)-Math.abs(b.boundingClientRect.top-window.innerHeight*.4));
   if(visible.length){
    const next = visible[0].target.id;
    setActive(current=>current===next?current:next);
   }
  }, {root:null, rootMargin:'-38% 0px -55% 0px', threshold:0});

  document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));

  return()=>{
   revealObserver.disconnect();
   sectionObserver.disconnect();
  };
 },[]);

 const scrollFrame = useRef(null);
 const go = id => {
  const target = document.getElementById(id);
  if (!target) return;

  if (scrollFrame.current !== null) {
   window.cancelAnimationFrame(scrollFrame.current);
  }

  const header = document.querySelector('.header');
  const headerOffset = (header?.getBoundingClientRect().height || 0) + 18;
  const startY = window.scrollY;
  const targetY = Math.max(0, startY + target.getBoundingClientRect().top - headerOffset);
  const distance = targetY - startY;
  const duration = Math.min(560, Math.max(300, Math.abs(distance) * 0.28));
  const startTime = performance.now();

  const animateScroll = now => {
   const progress = Math.min(1, (now - startTime) / duration);
   const eased = progress * progress * (3 - 2 * progress);
   window.scrollTo(0, startY + distance * eased);

   if (progress < 1) {
    scrollFrame.current = window.requestAnimationFrame(animateScroll);
   } else {
    scrollFrame.current = null;
    window.scrollTo(0, targetY);
   }
  };

  scrollFrame.current = window.requestAnimationFrame(animateScroll);
  setActive(id);
  setMenu(false);
 };
 return <><header className="header"><a className="brand" href="#top" onClick={e=>{e.preventDefault();go('top')}}><span className="brand-symbol">К<span>07</span></span><span>КУЛЬТУРА<small>БАРБЕРШОП · КАЗАНЬ</small></span></a><nav className={menu?'nav open':'nav'}>{[['about','О нас'],['works','Работы'],['services','Прайс'],['team','Мастера'],['reviews','Отзывы'],['contacts','Контакты']].map(([id,t])=><a key={id} className={active===id?'active':''} href={'#'+id} onClick={e=>{e.preventDefault();go(id)}}>{t}</a>)}</nav><button
  className="head-cta"
  onClick={() => openBooking()}
>
  ЗАПИСАТЬСЯ <ArrowUpRight size={15}/>
</button><button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Открыть меню">{menu?<X/>:<Menu/>}</button></header>
 <main id="top"><section className="hero"><div className="hero-bg"/><div className="hero-copy"><div className="eyebrow"><i/> КАЗАНЬ · АГРОНОМИЧЕСКАЯ, 16</div><h1>СТИЛЬ — ЭТО<br/><em>КУЛЬТУРА.</em></h1><p>Барбершоп для тех, кто ценит характер, точность и собственный стиль. Не просто стрижём — создаём образ, который тебе подходит.</p><div className="hero-actions"><button
  className="btn gold"
  onClick={() => openBooking()}
>
  Записаться на визит <ArrowUpRight size={17}/>
</button><a className="simple-link" href="#works" onClick={e=>{e.preventDefault();go('works')}}>Смотреть работы <span>↓</span></a></div><div className="hero-proof"><div className="rating-stars">★★★★★</div><b>5.0</b><span>175 оценок на Яндекс Картах</span></div></div><div className="hero-portrait"><img src="images/one.webp" alt="Александр, барбер Культура 07"/><div className="portrait-label"><span>КУЛЬТУРА 07</span><b>CRAFT / CULTURE / CHARACTER</b></div><div className="hero-round">K<br/><small>07</small></div></div><div className="hero-foot"><span>01 — 06</span><span>ЛИСТАЙ ВНИЗ <ChevronDown size={14}/></span><span>EST. KAZAN</span></div></section>
 <section className="intro section" id="about"><div className="kicker reveal">01 / О ПРОСТРАНСТВЕ</div><div className="intro-layout"><h2 className="reveal">МЕСТО,<br/><em>ГДЕ ФОРМИРУЕТСЯ</em><br/>ХАРАКТЕР.</h2><div className="intro-copy reveal"><p>«Культура 07» — барбершоп в Казани с собственной атмосферой и вниманием к индивидуальности. Здесь можно спокойно обсудить желаемый результат и доверить образ мастеру.</p><p>Классический подход, современные техники и уважение к деталям — от первой консультации до финальной укладки.</p><a className="line-link" href={Y} target="_blank" rel="noreferrer">Открыть карточку на Яндекс Картах <ArrowUpRight size={15}/></a></div></div><div className="manifesto reveal"><span>01</span><p>НЕ ГОНЯЕМСЯ ЗА ТРЕНДАМИ.<br/><em>ПОДБИРАЕМ СТИЛЬ ПОД ТЕБЯ.</em></p><span>КАЗАНЬ · 2026</span></div></section>
 <section className="works section" id="works">
  <div className="kicker reveal">
    02 / ПОРТФОЛИО
  </div>

  <div className="works-heading reveal">
    <h2>
      РЕЗУЛЬТАТ<br/>
      <em>ГОВОРИТ САМ.</em>
    </h2>

    <p>
      Работы мастеров Культура 07.
      Каждая деталь — часть образа.
    </p>
  </div>

  <div className="work-filters">
    {[
      ['all', 'Все работы'],
      ['hair', 'Стрижки'],
      ['beard', 'Борода'],
      ['combo', 'Комплекс']
    ].map(([value, label]) => (
      <button
        key={value}
        className={workFilter === value ? 'active' : ''}
        onClick={() => {
          setWorkFilter(value);
          setWorkIndex(null);
        }}
      >
        {label}
      </button>
    ))}
  </div>

  <div className="works-grid">
    {visibleWorks.map((w, i) => (
      <article
        className={`work-card reveal work-${i}`}
        key={w.id}
        onClick={() => setWorkIndex(i)}
      >
        <img
          src={w.img}
          alt={w.title}
          loading="lazy"
          decoding="async"
        />

        <div className="work-overlay">
          <span>
            {String(i + 1).padStart(2, '0')} / КУЛЬТУРА 07
          </span>

          <h3>{w.title}</h3>
          <p>{w.sub}</p>

          <div className="work-meta-preview">
            {w.duration} · {w.price}
          </div>
        </div>
      </article>
    ))}
  </div>
</section>
 <section className="services section" id="services"><div className="kicker reveal">03 / УСЛУГИ И СТОИМОСТЬ</div><div className="price-head reveal"><div><h2>ПРАЙС<br/><em>БЕЗ СЮРПРИЗОВ.</em></h2><p></p></div><img src="/price-list.webp" alt="Оригинальный прайс-лист Культура 07" loading="lazy" decoding="async"/></div><div className="tier-switch reveal"><span>ПОКАЗАТЬ ЦЕНЫ:</span>{[['all','Все категории'],['barber','Барбер'],['top','Топ барбер'],['expert','Эксперт']].map(([v,t])=><button key={v} className={tier===v?'chosen':''} onClick={()=>setTier(v)}>{t}</button>)}</div>{prices.map((group,gi)=><div className="price-group reveal" key={group.group}><h3>{group.group}</h3><div className="price-table"><div className="price-row price-label"><span>УСЛУГА</span>{(tier==='all'?['БАРБЕР','ТОП БАРБЕР','ЭКСПЕРТ']:[tier==='barber'?'БАРБЕР':tier==='top'?'ТОП БАРБЕР':'ЭКСПЕРТ']).map(x=><span key={x}>{x}</span>)}</div>{group.rows.map((r,i)=><div className={`price-row ${tier!=='all'?'single':''}`} key={r[0]}><span className="service-name">{r[0]}</span>{(tier==='all'?[1,2,3]:[tier==='barber'?1:tier==='top'?2:3]).map(j=><b key={j}>{r[j]}</b>)}</div>)}</div></div>)}<p className="price-foot">Стоимость указана в рублях. «—» — услуга не указана для этой категории в предоставленном прайсе. Наличие свободного времени и актуальность стоимости можно уточнить по телефону.</p></section>
 <section className="team section" id="team"><div className="kicker reveal">04 / МАСТЕРА</div><div className="team-heading reveal"><h2>ЛЮДИ,<br/><em>КОТОРЫМ ДОВЕРЯЮТ.</em></h2><p>Четыре мастера команды. Выбери своего и запишись на удобное время.</p></div><div className="master-grid">{masters.map((m,i)=><article className={`master-card ${selected===m.name?'expanded':''}`} key={m.name} onClick={()=>setSelected(selected===m.name?'':m.name)} role="button" tabIndex={0} aria-expanded={selected===m.name} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(selected===m.name?'':m.name)}}}><div className="master-photo"><img src={m.photo} alt={m.name} loading="lazy" decoding="async"/><span className="master-index">0{i+1}</span><span className="master-plus">{selected===m.name?'−':'+'}</span></div><div className="master-meta"><div><h3>{m.name}</h3><span>{m.role}</span></div><button type="button" className="master-book-icon" onClick={e=>{e.stopPropagation();openBooking(m.name);}} aria-label={`Записаться к ${m.name}`}><ArrowUpRight/></button></div><div className="master-details" aria-hidden={selected!==m.name}><div className="master-details-inner"><p className="master-note">{m.note}</p><button type="button" onClick={e=>{e.stopPropagation();openBooking(m.name);}}>ЗАПИСАТЬСЯ К МАСТЕРУ <ArrowUpRight size={13}/></button></div></div></article>)}</div><p className="team-foot">Нажми на карточку мастера, чтобы прочитать описание. Запись по телефону.</p></section>
 <section className="reviews section" id="reviews"><div className="kicker reveal">05 / ОТЗЫВЫ ГОСТЕЙ</div><div className="reviews-top reveal"><h2>СЛОВА<br/><em>ВМЕСТО ОБЕЩАНИЙ.</em></h2><div className="review-score"><strong>5.0</strong><div><span>★★★★★</span><small>175 оценок · Яндекс Карты</small></div></div></div><div className="review-grid">{reviews.map((r,i)=><article className="review-card reveal" key={r.name}><div className="review-stars">★★★★★</div><p>«{r.text}»</p><div className="review-author"><b>{r.name}</b><span>{r.date}</span></div></article>)}</div><a className="line-link review-all" href={Y} target="_blank" rel="noreferrer">Читать все отзывы <ArrowUpRight size={15}/></a></section>
 <section className="contact section" id="contacts"><div className="contact-panel reveal"><div className="kicker">06 / БУДЕМ РАДЫ ВИДЕТЬ</div><h2>ТВОЁ ВРЕМЯ<br/><em>ДЛЯ СЕБЯ.</em></h2><p>Запишись на визит — обсудим пожелания и подберём подходящую услугу.</p><button
  className="btn dark"
  onClick={() => openBooking()}
>
  <Phone size={16}/> ЗАПИСАТЬСЯ <ArrowUpRight size={17}/>
</button><div className="contact-info"><div><MapPin/><span>Агрономическая ул., 16<br/>Казань, Россия</span></div><div><Clock3/><span>Ежедневно<br/>10:00 — 21:00</span></div></div><a className="line-link" href={Y} target="_blank" rel="noreferrer">Построить маршрут <ArrowUpRight size={15}/></a></div><div className="contact-image"><img src="https://avatars.mds.yandex.net/get-altay/17787346/2a000001a024288ad8c312177b5f47c1e378/L" alt="Интерьер барбершопа Культура 07" loading="lazy" decoding="async"/><div className="contact-image-caption">КУЛЬТУРА 07<br/><small>АГРОНОМИЧЕСКАЯ, 16 · КАЗАНЬ</small></div></div></section></main>
 <footer><a className="brand" href="#top" onClick={e=>{e.preventDefault();go('top')}}><span className="brand-symbol">К<span>07</span></span><span>КУЛЬТУРА<small>БАРБЕРШОП · КАЗАНЬ</small></span></a><span>© 2026 КУЛЬТУРА 07</span><a href={Y} target="_blank" rel="noreferrer">ЯНДЕКС КАРТЫ <ArrowUpRight size={14}/></a></footer><button
  className="mobile-book"
  onClick={() => openBooking()}
>
  ЗАПИСАТЬСЯ <ArrowUpRight size={16}/>
</button>{workIndex !== null && visibleWorks[workIndex] && (
  <div
    className="work-viewer"
    onClick={() => setWorkIndex(null)}
  >
    <button
      className="viewer-close"
      onClick={() => setWorkIndex(null)}
      aria-label="Закрыть"
    >
      <X/>
    </button>

    <button
      className="viewer-arrow viewer-prev"
      onClick={e => {
        e.stopPropagation();
        moveWork(-1);
      }}
      aria-label="Предыдущая работа"
    >
      ←
    </button>

    <div
      className="work-modal-content"
      onClick={e => e.stopPropagation()}
    >
      <div className="viewer-image">
        <img
          src={visibleWorks[workIndex].img}
          alt={visibleWorks[workIndex].title}
        />
      </div>

      <div className="viewer-info">
        <span className="kicker">
          КУЛЬТУРА 07 / ПОРТФОЛИО
        </span>

        <h2>
          {visibleWorks[workIndex].title}
        </h2>

        <p>
          {visibleWorks[workIndex].sub}
        </p>

        <div className="viewer-details">
          <div>
            <span>МАСТЕР</span>
            <b>{visibleWorks[workIndex].master}</b>
          </div>

          <div>
            <span>ВРЕМЯ</span>
            <b>{visibleWorks[workIndex].duration}</b>
          </div>

          <div>
            <span>СТОИМОСТЬ</span>
            <b>{visibleWorks[workIndex].price}</b>
          </div>
        </div>

        <div className="viewer-counter">
          {String(workIndex + 1).padStart(2, '0')}
          {' / '}
          {String(visibleWorks.length).padStart(2, '0')}
        </div>
      </div>
    </div>

    <button
      className="viewer-arrow viewer-next"
      onClick={e => {
        e.stopPropagation();
        moveWork(1);
      }}
      aria-label="Следующая работа"
    >
      →
    </button>
  </div>
)}{booking && (
  <div
    className="booking-overlay"
    onClick={() => {
      setBooking(false);
      setBookingSent(false);
    }}
  >
    <div
      className="booking-modal"
      onClick={e => e.stopPropagation()}
    >
      <button
        className="booking-close"
        onClick={() => {
          setBooking(false);
          setBookingSent(false);
        }}
      >
        <X/>
      </button>

      {!bookingSent ? (
        <>
          <span className="kicker">
            КУЛЬТУРА 07 / ЗАПИСЬ
          </span>

          <h2>
            ТВОЙ ВИЗИТ<br/>
            <em>НАЧИНАЕТСЯ.</em>
          </h2>

          <form
            onSubmit={e => {
              e.preventDefault();
              setBookingSent(true);
            }}
          >
            <label>
              ИМЯ
              <input
                type="text"
                name="name"
                placeholder="Как тебя зовут?"
                required
              />
            </label>

            <label>
              ТЕЛЕФОН
              <input
                type="tel"
                name="phone"
                placeholder="+7 (___) ___-__-__"
                required
              />
            </label>

            <label>
              УСЛУГА
              <select name="service" required defaultValue="">
                <option value="" disabled>
                  Выбери услугу
                </option>
                <option>Стрижка</option>
                <option>Стрижка бороды</option>
                <option>Стрижка + борода</option>
                <option>Детская стрижка</option>
                <option>Отец и сын</option>
                <option>Другая услуга</option>
              </select>
            </label>

            <label>
              МАСТЕР
              <select name="master" value={bookingMaster} onChange={e=>setBookingMaster(e.target.value)}>
                <option>Не важно</option>
                <option>Александр</option>
                <option>Эмир</option>
                <option>Рафаэль</option>
                <option>Макс</option>
              </select>
            </label>

            <label>
              ЖЕЛАЕМАЯ ДАТА
              <input
                type="date"
                name="date"
                min={new Date().toISOString().slice(0, 10)}
              />
            </label>

            <label>
              КОММЕНТАРИЙ
              <textarea
                name="comment"
                placeholder="Пожелания к визиту"
                rows="3"
              />
            </label>

            <button
              type="submit"
              className="booking-submit"
            >
              ОТПРАВИТЬ ЗАЯВКУ <ArrowUpRight/>
            </button>
          </form>

          <p className="booking-disclaimer">
            Демо-форма. Заявка не отправляется
            администратору и не сохраняется.
          </p>
        </>
      ) : (
        <div className="booking-success">
          <div className="booking-success-icon">
            <Check/>
          </div>

          <span className="kicker">
            ДЕМО / ЗАЯВКА
          </span>

          <h2>
            ГОТОВО.<br/>
            <em>ТЫ НА ШАГ БЛИЖЕ.</em>
          </h2>

          <p>
            Форма успешно заполнена.
            В реальной версии здесь будет
            отправка заявки администратору.
          </p>

          <button
            className="booking-submit"
            onClick={() => {
              setBooking(false);
              setBookingSent(false);
            }}
          >
            ЗАКРЫТЬ
          </button>
        </div>
      )}
    </div>
  </div>
)}</>}
createRoot(document.getElementById('root')).render(<App/>);
