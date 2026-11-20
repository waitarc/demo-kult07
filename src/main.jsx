import React,{useEffect,useState} from 'react';
import{createRoot}from'react-dom/client';
import{ArrowUpRight,Menu,X,MapPin,Phone,Clock3,Star,Scissors,ChevronDown,Instagram,Check}from'lucide-react';
import './style.css';
const Y='https://yandex.ru/maps/org/kultura_07/172417877222/';
const masters=[
 {name:'Александр',role:'БАРБЕР',photo:'/alexander.png',note:'Внимание к деталям и точная работа с формой. Гости отмечают консультацию и рекомендации по укладке.'},
 {name:'Эмир',role:'БАРБЕР',photo:'/emir.png',note:'Постоянные гости отдельно отмечают стабильное качество и внимательное отношение к пожеланиям.'},
 {name:'Рафаэль',role:'БАРБЕР',photo:'/rafael.png',note:'Индивидуальный подход, работа с формой и бородой. Помогает подобрать образ и объясняет нюансы укладки.'},
 {name:'Макс',role:'БАРБЕР',photo:'/max.png',note:'Умеет точно повторить референс и подсказать, как поддерживать форму и укладывать волосы дома.'}
];
const prices=[
 {group:'СТРИЖКА',rows:[['Стрижка','1 800 ₽','2 000 ₽','2 500 ₽'],['Детская стрижка','1 400 ₽','1 600 ₽','2 000 ₽'],['Стрижка + борода','2 700 ₽','3 000 ₽','3 500 ₽'],['Стрижка + борода + тонировка','3 300 ₽','4 000 ₽','4 000 ₽'],['Отец и сын','2 600 ₽','3 400 ₽','4 000 ₽'],['Окантовка стрижки','500 ₽','500 ₽','—'],['Бритьё головы','—','1 500 ₽','1 500 ₽']]},
 {group:'БОРОДА',rows:[['Стрижка бороды и усов','1 200 ₽','1 500 ₽','1 500 ₽'],['Борода + тонировка','2 200 ₽','2 500 ₽','2 500 ₽']]},
 {group:'ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ',rows:[['Укладка','700 ₽','700 ₽','—'],['Коррекция воском 1 зоны','300 ₽','300 ₽','—'],['Окрашивание головы','1 500 ₽','1 500 ₽','—'],['Химическая завивка','—','от 4 000 ₽','—']]}
];
const works=[
 {title:'МУЖСКАЯ СТРИЖКА',sub:'Форма, текстура, чистый силуэт',img:'https://avatars.mds.yandex.net/get-altay/17632979/2a000001a024264790af0fcecd71493300b4/L'},
 {title:'РАБОТА С БОРОДОЙ',sub:'Контур и аккуратная геометрия',img:'https://avatars.mds.yandex.net/get-altay/19292509/2a000001a02427da19beb8e1974e88b4dfb4/L'},
 {title:'АТМОСФЕРА',sub:'Пространство Культура 07',img:'https://avatars.mds.yandex.net/get-altay/17787346/2a000001a024288ad8c312177b5f47c1e378/L'}
];
const reviews=[
 {name:'Рустам',date:'11 августа',text:'Рафаэль с первого взгляда понял, что мне нужно. Особенно отмечу работу с бородой — линии выведены идеально, переходы плавные, всё симметрично.'},
 {name:'Leysan Akhmetvaleeva',date:'20 июня',text:'Барбер Александр справился на 100/10. Провёл консультацию, постриг и порекомендовал средство для укладки. Супер сервис и качество!'},
 {name:'RELAX Disney',date:'11 августа',text:'Мастера прислушиваются к каждому слову и делают именно так, как хотелось. Особенно хочется выделить барбера Рафаэля.'},
 {name:'Керим Гурбашыев',date:'7 августа',text:'Стригусь на протяжении долгого времени у Эмира, мастер вообще топ, всегда делает всё по красоте.'},
 {name:'Алексей К.',date:'21 февраля',text:'Максим в точности воспроизвёл стрижку с фото, дал рекомендации по укладке и уходу. Рекомендую, вернусь.'}
];
function App(){
 const[menu,setMenu]=useState(false),[active,setActive]=useState(''),[tier,setTier]=useState('all'),[selected,setSelected]=useState('');
 useEffect(()=>{
  const nodes=Array.from(document.querySelectorAll('.reveal:not(.master-card)'));
  const sections=Array.from(document.querySelectorAll('main section[id]'));
  let raf=0;
  let observer=null;

  nodes.forEach((node,index)=>node.style.setProperty('--reveal-delay',`${(index%4)*55}ms`));

  // Enable the hidden state only for content blocks, never for interactive master cards.
  document.documentElement.classList.add('motion-ready');
  if('IntersectionObserver' in window){
   observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
     entry.target.classList.toggle('visible',entry.isIntersecting);
    });
   },{root:null,rootMargin:'-4% 0px -7% 0px',threshold:0});
   nodes.forEach(node=>observer.observe(node));
  } else {
   nodes.forEach(node=>node.classList.add('visible'));
  }

  const updateActive=()=>{
   raf=0;
   const marker=window.innerHeight*.38;
   let current='';
   sections.forEach(section=>{
    const rect=section.getBoundingClientRect();
    if(rect.top<=marker && rect.bottom>marker) current=section.id;
   });
   if(current) setActive(current);
  };
  const onScroll=()=>{
   if(!raf) raf=window.requestAnimationFrame(updateActive);
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll,{passive:true});
  updateActive();
  return()=>{
   observer?.disconnect();
   document.documentElement.classList.remove('motion-ready');
   if(raf) window.cancelAnimationFrame(raf);
   window.removeEventListener('scroll',onScroll);
   window.removeEventListener('resize',onScroll);
  };
 },[]);
 const go=id=>{
  setMenu(false);
  const target=document.getElementById(id);
  if(!target) return;
  const header=document.querySelector('.header');
  const offset=(header?.getBoundingClientRect().height || 0)+12;
  const top=target.getBoundingClientRect().top+window.scrollY-offset;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top,behavior:reduce?'auto':'smooth'});
 };
 return <><div className="noise"/><header className="header"><a className="brand" href="#top" onClick={e=>{e.preventDefault();go('top')}}><span className="brand-symbol">К<span>07</span></span><span>КУЛЬТУРА<small>БАРБЕРШОП · КАЗАНЬ</small></span></a><nav className={menu?'nav open':'nav'}>{[['about','О нас'],['works','Работы'],['services','Прайс'],['team','Мастера'],['reviews','Отзывы'],['contacts','Контакты']].map(([id,t])=><a key={id} className={active===id?'active':''} href={'#'+id} onClick={e=>{e.preventDefault();go(id)}}>{t}</a>)}</nav><a className="head-cta" href="tel:+79196437876">ЗАПИСАТЬСЯ <ArrowUpRight size={15}/></a><button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Открыть меню">{menu?<X/>:<Menu/>}</button></header>
 <main id="top"><section className="hero"><div className="hero-bg"/><div className="hero-copy"><div className="eyebrow"><i/> КАЗАНЬ · АГРОНОМИЧЕСКАЯ, 16</div><h1>СТИЛЬ — ЭТО<br/><em>КУЛЬТУРА.</em></h1><p>Барбершоп для тех, кто ценит характер, точность и собственный стиль. Не просто стрижём — создаём образ, который тебе подходит.</p><div className="hero-actions"><a className="btn gold" href="tel:+79196437876">Записаться на визит <ArrowUpRight size={17}/></a><a className="simple-link" href="#works" onClick={e=>{e.preventDefault();go('works')}}>Смотреть работы <span>↓</span></a></div><div className="hero-proof"><div className="rating-stars">★★★★★</div><b>5.0</b><span>175 оценок на Яндекс Картах</span></div></div><div className="hero-portrait"><img src="/alexander.png" alt="Александр, барбер Культура 07"/><div className="portrait-label"><span>КУЛЬТУРА 07</span><b>CRAFT / CULTURE / CHARACTER</b></div><div className="hero-round">K<br/><small>07</small></div></div><div className="hero-foot"><span>01 — 06</span><span>ЛИСТАЙ ВНИЗ <ChevronDown size={14}/></span><span>EST. KAZAN</span></div></section>
 <section className="intro section" id="about"><div className="kicker reveal">01 / О ПРОСТРАНСТВЕ</div><div className="intro-layout"><h2 className="reveal">МЕСТО,<br/><em>ГДЕ ФОРМИРУЕТСЯ</em><br/>ХАРАКТЕР.</h2><div className="intro-copy reveal"><p>«Культура 07» — барбершоп в Казани с собственной атмосферой и вниманием к индивидуальности. Здесь можно спокойно обсудить желаемый результат и доверить образ мастеру.</p><p>Классический подход, современные техники и уважение к деталям — от первой консультации до финальной укладки.</p><a className="line-link" href={Y} target="_blank" rel="noreferrer">Открыть карточку на Яндекс Картах <ArrowUpRight size={15}/></a></div></div><div className="manifesto reveal"><span>01</span><p>НЕ ГОНЯЕМСЯ ЗА ТРЕНДАМИ.<br/><em>ПОДБИРАЕМ СТИЛЬ ПОД ТЕБЯ.</em></p><span>КАЗАНЬ · 2026</span></div></section>
 <section className="works section" id="works"><div className="kicker reveal">02 / ФОТОГРАФИИ И УСЛУГИ</div><div className="works-heading reveal"><h2>РЕЗУЛЬТАТ<br/><em>ГОВОРИТ САМ.</em></h2><p>Несколько кадров из фотоматериалов карточки Культура 07. Листай, чтобы почувствовать атмосферу места.</p></div><div className="works-grid">{works.map((w,i)=><article className={`work-card reveal work-${i}`} key={w.title}><img src={w.img} alt={w.title}/><div className="work-overlay"><span>0{i+1} / КУЛЬТУРА 07</span><h3>{w.title}</h3><p>{w.sub}</p></div></article>)}</div></section>
 <section className="services section" id="services"><div className="kicker reveal">03 / УСЛУГИ И СТОИМОСТЬ</div><div className="price-head reveal"><div><h2>ПРАЙС<br/><em>БЕЗ СЮРПРИЗОВ.</em></h2><p>Цены перенесены с предоставленного тобой прайс-листа.</p></div><img src="/price-list.png" alt="Оригинальный прайс-лист Культура 07"/></div><div className="tier-switch reveal"><span>ПОКАЗАТЬ ЦЕНЫ:</span>{[['all','Все категории'],['barber','Барбер'],['top','Топ барбер'],['expert','Эксперт']].map(([v,t])=><button key={v} className={tier===v?'chosen':''} onClick={()=>setTier(v)}>{t}</button>)}</div>{prices.map((group,gi)=><div className="price-group reveal" key={group.group}><h3>{group.group}</h3><div className="price-table"><div className="price-row price-label"><span>УСЛУГА</span>{(tier==='all'?['БАРБЕР','ТОП БАРБЕР','ЭКСПЕРТ']:[tier==='barber'?'БАРБЕР':tier==='top'?'ТОП БАРБЕР':'ЭКСПЕРТ']).map(x=><span key={x}>{x}</span>)}</div>{group.rows.map((r,i)=><div className={`price-row ${tier!=='all'?'single':''}`} key={r[0]}><span className="service-name">{r[0]}</span>{(tier==='all'?[1,2,3]:[tier==='barber'?1:tier==='top'?2:3]).map(j=><b key={j}>{r[j]}</b>)}</div>)}</div></div>)}<p className="price-foot">Стоимость указана в рублях. «—» — услуга не указана для этой категории в предоставленном прайсе. Наличие свободного времени и актуальность стоимости можно уточнить по телефону.</p></section>
 <section className="team section" id="team"><div className="kicker reveal">04 / МАСТЕРА</div><div className="team-heading reveal"><h2>ЛЮДИ,<br/><em>КОТОРЫМ ДОВЕРЯЮТ.</em></h2><p>Четыре мастера команды. Выбери своего и запишись на удобное время.</p></div><div className="master-grid">{masters.map((m,i)=><article className={`master-card ${selected===m.name?'expanded':''}`} key={m.name} onClick={()=>setSelected(selected===m.name?'':m.name)} role="button" tabIndex={0} aria-expanded={selected===m.name} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(selected===m.name?'':m.name)}}}><div className="master-photo"><img src={m.photo} alt={m.name}/><span className="master-index">0{i+1}</span><span className="master-plus">{selected===m.name?'−':'+'}</span></div><div className="master-meta"><div><h3>{m.name}</h3><span>{m.role}</span></div><a href="tel:+79196437876" onClick={e=>e.stopPropagation()} aria-label={`Записаться к ${m.name}`}><ArrowUpRight/></a></div><div className="master-details" aria-hidden={selected!==m.name}><div className="master-details-inner"><p className="master-note">{m.note}</p><a href="tel:+79196437876" onClick={e=>e.stopPropagation()}>ЗАПИСАТЬСЯ К МАСТЕРУ <ArrowUpRight size={13}/></a></div></div></article>)}</div><p className="team-foot">Нажми на карточку мастера, чтобы прочитать описание. Запись по телефону.</p></section>
 <section className="reviews section" id="reviews"><div className="kicker reveal">05 / ОТЗЫВЫ ГОСТЕЙ</div><div className="reviews-top reveal"><h2>СЛОВА<br/><em>ВМЕСТО ОБЕЩАНИЙ.</em></h2><div className="review-score"><strong>5.0</strong><div><span>★★★★★</span><small>175 оценок · Яндекс Карты</small></div></div></div><div className="review-grid">{reviews.map((r,i)=><article className="review-card reveal" key={r.name}><div className="review-stars">★★★★★</div><p>«{r.text}»</p><div className="review-author"><b>{r.name}</b><span>{r.date}</span></div></article>)}</div><a className="line-link review-all" href={Y} target="_blank" rel="noreferrer">Читать отзывы на Яндекс Картах <ArrowUpRight size={15}/></a></section>
 <section className="contact section" id="contacts"><div className="contact-panel reveal"><div className="kicker">06 / БУДЕМ РАДЫ ВИДЕТЬ</div><h2>ТВОЁ ВРЕМЯ<br/><em>ДЛЯ СЕБЯ.</em></h2><p>Запишись на визит — обсудим пожелания и подберём подходящую услугу.</p><a className="btn dark" href="tel:+79196437876"><Phone size={16}/> +7 (919) 643-78-76 <ArrowUpRight size={17}/></a><div className="contact-info"><div><MapPin/><span>Агрономическая ул., 16<br/>Казань, Россия</span></div><div><Clock3/><span>Ежедневно<br/>10:00 — 21:00</span></div></div><a className="line-link" href={Y} target="_blank" rel="noreferrer">Построить маршрут <ArrowUpRight size={15}/></a></div><div className="contact-image"><img src="https://avatars.mds.yandex.net/get-altay/17787346/2a000001a024288ad8c312177b5f47c1e378/L" alt="Интерьер барбершопа Культура 07"/><div className="contact-image-caption">КУЛЬТУРА 07<br/><small>АГРОНОМИЧЕСКАЯ, 16 · КАЗАНЬ</small></div></div></section></main>
 <footer><a className="brand" href="#top" onClick={e=>{e.preventDefault();go('top')}}><span className="brand-symbol">К<span>07</span></span><span>КУЛЬТУРА<small>БАРБЕРШОП · КАЗАНЬ</small></span></a><span>© 2026 КУЛЬТУРА 07</span><a href={Y} target="_blank" rel="noreferrer">ЯНДЕКС КАРТЫ <ArrowUpRight size={14}/></a></footer><a className="mobile-book" href="tel:+79196437876">ЗАПИСАТЬСЯ <ArrowUpRight size={16}/></a></>}
createRoot(document.getElementById('root')).render(<App/>);
