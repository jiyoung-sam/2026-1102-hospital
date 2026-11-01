import { useEffect, useState } from 'react';

const navItems = [
  ['병원소개', 'about'],
  ['진료안내', 'services'],
  ['치료클리닉', 'clinics'],
  ['한방건강정보', 'notices'],
  ['커뮤니티', 'stories'],
] as const;

const heroSlides = [
  {
    eyebrow: '몸과 마음이 다시, 편안해지는 곳',
    title: ['일상의 건강을', '되찾는 한방의 힘'],
    description: ['사람을 먼저 생각하는 다온한방병원이', '건강한 하루를 함께 만들어갑니다.'],
    palette: ['#b29169', '#d1b28f', '#6b4a30'],
  },
  {
    eyebrow: '전통의 지혜로 오늘을 돌봅니다',
    title: ['내 몸에 꼭 맞는', '세심한 한방 진료'],
    description: ['충분히 듣고 꼼꼼히 살펴', '건강 회복의 길을 함께 찾습니다.'],
    palette: ['#a7a58e', '#d8cfb5', '#4f5c42'],
  },
  {
    eyebrow: '치료를 넘어 편안한 일상으로',
    title: ['회복의 순간마다', '다온이 함께합니다'],
    description: ['체계적인 진료와 따뜻한 돌봄으로', '몸과 마음의 균형을 되찾아드립니다.'],
    palette: ['#a9856b', '#dcc2aa', '#79543d'],
  },
];

const services = [
  ['✦', '맞춤 한방치료', '개인별 체질과 상태에 맞춘', '1:1 맞춤 치료'],
  ['✿', '안전한 한약 처방', '믿을 수 있는', '청정 한약재 사용'],
  ['⌁', '통증 클리닉', '허리·목·관절 등', '만성 통증 치료'],
  ['♧', '생활질환 클리닉', '소화기·호흡기·여성질환 등', '생활 속 건강 관리'],
  ['✧', '면역·보약 클리닉', '체질 개선과', '면역력 증진'],
] as const;

const clinics = [
  ['통증·척추 클리닉', '허리, 목, 어깨, 무릎 등', '#cfc7ba'],
  ['소화기 클리닉', '소화불량, 위장장애 등', '#e0d1bf'],
  ['교통사고 후유증 클리닉', '사고 후 통증, 재활 치료', '#c2c4ba'],
  ['여성건강 클리닉', '생리통, 갱년기, 여성질환 등', '#dec9c2'],
  ['소아·성장 클리닉', '성장, 면역, 체질 개선', '#ccd1bf'],
  ['보약·면역 클리닉', '체질 개선, 기력 회복', '#c4ccc2'],
] as const;

const rooms = ['진료실', '추나요법실', '한약조제실', '입원실'];

type ModalType = 'video' | 'reservation' | 'consultation' | null;

// 디자인 속 기하학적인 실내 이미지를 재사용 가능한 한 개의 컴포넌트로 표현합니다.
function AbstractRoom({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`abstract-room ${compact ? 'abstract-room--compact' : ''}`} aria-hidden="true">
      <span className="room-light" />
      <span className="room-shadow" />
      <span className="room-divider" />
      <span className="room-floor" />
      <span className="room-counter" />
      <span className="room-base" />
    </div>
  );
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="다온한방병원 홈">
      <img src="/assets/20c3e.svg" alt="" />
      <span>
        <strong>다온한방병원</strong>
        <small>DAON KOREAN MEDICINE HOSPITAL</small>
      </span>
    </a>
  );
}

function Header({ onOpen }: { onOpen: (type: ModalType) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <Brand />
        <button
          className="menu-toggle"
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="주요 메뉴">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <button className="search-button" type="button" onClick={() => setMenuOpen(false)} aria-label="검색">
            ⌕
          </button>
          <button className="header-link" type="button" onClick={() => onOpen('consultation')}>
            온라인 상담
          </button>
          <button className="pill pill--brown" type="button" onClick={() => onOpen('reservation')}>
            예약하기
          </button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onOpen }: { onOpen: (type: ModalType) => void }) {
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];
  const move = (direction: number) =>
    setActive((current) => (current + direction + heroSlides.length) % heroSlides.length);

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="다온한방병원 주요 안내">
      <div className="hero-copy">
        <p className="eyebrow">{slide.eyebrow}</p>
        <h1>
          {slide.title[0]}
          <br />
          {slide.title[1]}
        </h1>
        <p className="hero-description">
          {slide.description[0]}
          <br />
          {slide.description[1]}
        </p>
        <div className="hero-actions">
          <button className="pill pill--brown" type="button" onClick={() => onOpen('reservation')}>
            진료 예약하기 <span>→</span>
          </button>
          <a className="pill pill--light" href="#about">
            병원 소개 보기
          </a>
        </div>
        <div className="slider-status" aria-live="polite">
          <strong>0{active + 1}</strong>
          <span />
          {heroSlides.map((_, index) => (
            <button key={index} type="button" onClick={() => setActive(index)} aria-label={`${index + 1}번 슬라이드`}>
              0{index + 1}
            </button>
          ))}
        </div>
      </div>
      <div
        className="hero-art"
        style={
          {
            '--wash': slide.palette[0],
            '--light': slide.palette[1],
            '--shadow': slide.palette[2],
          } as React.CSSProperties
        }
      >
        <AbstractRoom />
      </div>
      <div className="slider-controls">
        <button type="button" onClick={() => move(-1)} aria-label="이전 슬라이드">
          ‹
        </button>
        <button type="button" onClick={() => move(1)} aria-label="다음 슬라이드">
          ›
        </button>
      </div>
    </section>
  );
}

function SignatureServices() {
  return (
    <section className="signature" id="services" aria-label="다온한방병원의 주요 서비스">
      <div className="signature-grid">
        {services.map(([icon, title, line1, line2]) => (
          <article className="signature-item" key={title}>
            <span className="signature-icon">{icon}</span>
            <h2>{title}</h2>
            <p>
              {line1}
              <br />
              {line2}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Philosophy({ onOpen }: { onOpen: (type: ModalType) => void }) {
  return (
    <section className="philosophy" id="about">
      <div className="philosophy-art">
        <AbstractRoom />
      </div>
      <div className="philosophy-copy">
        <p className="section-kicker">━ &nbsp;전통의 지혜, 오늘의 건강으로</p>
        <h2>
          사람을 위한
          <br />
          올바른 한방치료
        </h2>
        <p className="section-description">
          다온한방병원은 전통의 가치를 바탕으로
          <br />
          현대인의 건강 고민을 함께 해결합니다.
        </p>
        <div className="care-values">
          {[
            ['♡', '환자 중심 진료'],
            ['♧', '안전한 의료 시스템'],
            ['♙', '풍부한 임상 경험'],
          ].map(([icon, label]) => (
            <div key={label}>
              <span>{icon}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </div>
      <button className="video-button" type="button" onClick={() => onOpen('video')}>
        <span aria-hidden="true" />
        <strong>
          다온한방병원
          <br />
          소개 영상 보기
        </strong>
      </button>
    </section>
  );
}

function Clinics() {
  return (
    <section className="clinics" id="clinics">
      <div className="section-heading">
        <h2>주요 진료 클리닉</h2>
        <p>
          다양한 한방 진료로
          <br />
          일상의 건강을 지켜드립니다.
        </p>
        <a href="#services">전체 진료 보기&nbsp; →</a>
      </div>
      <div className="clinic-grid">
        {clinics.map(([name, detail, color]) => (
          <a className="clinic-card" href="#reservation-contact" key={name}>
            <div className="clinic-image" style={{ backgroundColor: color }}>
              <span />
              <i />
            </div>
            <h3>{name}</h3>
            <p>{detail}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function SpaceGallery() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="space-gallery" aria-label="병원 공간 둘러보기">
      <div className="space-copy">
        <h2>
          편안함이 머무는
          <br />
          치료 공간
        </h2>
        <p>
          몸과 마음이 모두 편안할 수 있는
          <br />
          쾌적한 진료 환경을 제공합니다.
        </p>
        <button className="pill pill--light" type="button" onClick={() => setSelected((selected + 1) % rooms.length)}>
          다음 공간 보기&nbsp; →
        </button>
      </div>
      <div className="room-list">
        {rooms.map((room, index) => (
          <button
            className={selected === index ? 'room-card is-selected' : 'room-card'}
            key={room}
            type="button"
            onClick={() => setSelected(index)}
          >
            <AbstractRoom compact />
            <span>{room}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Information({ onOpen }: { onOpen: (type: ModalType) => void }) {
  const notices = [
    ['추석 연휴 진료 일정 안내', '2024.09.10'],
    ['특강 해열 한약 프로그램 안내', '2024.09.05'],
    ['진료 예약 시스템 오픈 안내', '2024.08.28'],
  ];

  return (
    <section className="information" id="notices">
      <div className="notice-panel">
        <div className="panel-title">
          <h2>공지사항</h2>
          <a href="#notices">더보기&nbsp; +</a>
        </div>
        <ul>
          {notices.map(([title, date]) => (
            <li key={title}>
              <a href="#notices">{title}</a>
              <time>{date}</time>
            </li>
          ))}
        </ul>
      </div>
      <div className="story-panel" id="stories">
        <h2>환자분들의 이야기</h2>
        <blockquote>
          “꾸준한 치료로 허리 통증이 많이 좋아졌어요.
          <br />
          친절하고 세심한 진료에 늘 감사합니다.”
        </blockquote>
        <p>김○○ 님&nbsp; | &nbsp;허리 통증 치료</p>
      </div>
      <div className="location-panel">
        <h2>오시는 길</h2>
        <div className="map-placeholder" aria-label="병원 위치 지도">
          <span>●</span>
        </div>
        <p>
          경상남도 진주시 진주대로 123
          <br />
          다온한방병원
        </p>
        <a className="text-link" href="https://map.naver.com" target="_blank" rel="noreferrer">
          지도에서 보기&nbsp; →
        </a>
      </div>
      <div className="contact-panel" id="reservation-contact">
        <h2>진료 예약 및 상담</h2>
        <a className="phone" href="tel:0551234567">
          ☎&nbsp; 055-123-4567
        </a>
        <p>
          평일&nbsp;&nbsp;&nbsp;&nbsp; 09:00 - 18:00
          <br />
          토요일&nbsp;&nbsp; 09:00 - 13:00
          <br />
          점심시간&nbsp; 12:30 - 13:30
        </p>
        <div className="contact-actions">
          <button className="pill pill--light" type="button" onClick={() => onOpen('reservation')}>
            진료 예약하기 →
          </button>
          <button type="button" onClick={() => onOpen('consultation')}>
            온라인 상담 →
          </button>
        </div>
      </div>
    </section>
  );
}

function Modal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  useEffect(() => {
    if (!type) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.body.classList.remove('modal-open');
    };
  }, [type, onClose]);

  if (!type) return null;
  const isVideo = type === 'video';
  const isReservation = type === 'reservation';

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`modal ${isVideo ? 'modal--video' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="팝업 닫기">
          ×
        </button>
        {isVideo ? (
          <>
            <div className="video-preview">
              <AbstractRoom />
              <span>▶</span>
            </div>
            <h2 id="modal-title">다온한방병원 소개 영상</h2>
            <p>편안한 진료 공간과 다온의 치료 철학을 소개합니다.</p>
          </>
        ) : (
          <>
            <p className="modal-kicker">DAON KOREAN MEDICINE HOSPITAL</p>
            <h2 id="modal-title">{isReservation ? '진료 예약하기' : '온라인 상담하기'}</h2>
            <p>연락처를 남겨주시면 진료시간 내에 안내해 드립니다.</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                window.alert('신청이 접수되었습니다. 빠르게 연락드리겠습니다.');
                onClose();
              }}
            >
              <label>
                이름
                <input name="name" type="text" required placeholder="성함을 입력해 주세요" />
              </label>
              <label>
                연락처
                <input name="phone" type="tel" required placeholder="010-0000-0000" />
              </label>
              {!isReservation && (
                <label>
                  상담 내용
                  <textarea name="message" required placeholder="궁금한 내용을 남겨 주세요" />
                </label>
              )}
              <button className="pill pill--brown" type="submit">
                {isReservation ? '예약 신청하기' : '상담 신청하기'}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default function App() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <div className="page-shell">
        <Header onOpen={setModal} />
        <main>
          <Hero onOpen={setModal} />
          <SignatureServices />
          <Philosophy onOpen={setModal} />
          <Clinics />
          <SpaceGallery />
          <Information onOpen={setModal} />
        </main>
      </div>
      <Modal type={modal} onClose={() => setModal(null)} />
    </>
  );
}
