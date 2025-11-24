네, 가능합니다. 그리고 아주 좋은 접근입니다.

2024\~2025년 현재, \*\*최신 웹 표준(Modern CSS)\*\*은 SCSS가 제공하던 핵심 기능(변수, 중첩 구문, 연산)을 브라우저 자체에서 지원합니다. 굳이 별도의 빌드 과정(Sass 컴파일러)을 거치지 않고 \*\*순수 CSS(Vanilla CSS)\*\*로 작성하는 것이 오히려 더 '모던한 웹 표준'에 가깝고 성능상 이점도 있습니다.

사용자의 요청사항 3가지를 반영하여 `TECHSPEC_PLAN.md`를 **v3.0**으로 전면 개편해드립니다.

1.  **SCSS 제거 → Modern CSS (CSS Variables + Native Nesting) 도입**: 빌드 도구 없이 브라우저 표준 기술만 사용.
2.  **4Pillars 스타일 계승**: Glassmorphism, CSS Grid, 다크 모드 최적화.
3.  **기능 명세 강화**: 단순 퍼블리싱을 넘어, 검색 필터링, 모바일 메뉴 토글, 데이터 렌더링 등 '작동하는 기능'에 대한 명세 추가.

-----

# TECHSPEC\_PLAN.md v3.0

PDAO Website – Modern Web Standard Implementation Plan
(Vanilla CSS + Semantic HTML + ES6 Modules)

-----

## 0\. 개요

이 문서는 외부 라이브러리 의존성을 최소화하고, 브라우저의 최신 표준 기능(**Native CSS Nesting, CSS Variables, ES6 Modules**)을 활용하여 [TECHSPEC.md](https://www.google.com/search?q=TECHSPEC.md)를 구현하는 계획서이다.

### 변경 사항 (v2.0 대비)

  - **No SCSS**: Sass 컴파일러 제거. 브라우저 네이티브 CSS 사용.
  - **Functionality Focus**: UI 모양뿐만 아니라 실제 작동(검색, 필터, 반응형 동작) 로직 포함.
  - **Web Standard**: `var()` 변수와 `display: grid`를 적극 활용한 현대적 레이아웃.

-----

## 1\. 기술 스택 (Modern Standard)

### Core Technologies

  - **HTML5**: 시맨틱 태그 (`<header>`, `<nav>`, `<main>`, `<article>`, `<dialog>`) 준수.
  - **CSS3 (Modern)**:
      - **CSS Variables (Custom Properties)**: 디자인 토큰 관리.
      - **CSS Nesting**: SCSS처럼 중첩 구문 사용 (최신 브라우저 지원).
      - **Flexbox & Grid**: 레이아웃 핵심.
      - **Backdrop-filter**: Glassmorphism 구현.
  - **Vanilla JavaScript (ES6+)**: 프레임워크 없는 순수 JS 모듈 (`import/export`).
  - **Data Source**: JSON 파일 (Client-side rendering 또는 Jekyll `_data` 활용).

### Tools

  - **Live Server**: 로컬 개발 확인용.
  - **Prettier**: 코드 포맷팅.
  - **No Build Step Required**: 별도의 번들러나 컴파일러 없이 즉시 실행 가능하도록 구성.

-----

## 2\. 프로젝트 파일 구조

SCSS 폴더를 제거하고, 기능별 CSS 파일과 JS 모듈로 재구성한다.

```
postech-dao.github.io/
├── index.html                  # Home
├── about.html                  # About
├── simperby.html               # Project Detail
├── assets/
│   ├── css/
│   │   ├── style.css           # 메인 진입점 (@import 관리)
│   │   ├── base/
│   │   │   ├── variables.css   # 디자인 토큰 (Root 변수)
│   │   │   ├── reset.css       # Modern CSS Reset
│   │   │   └── typography.css  # 폰트 설정
│   │   ├── layout/
│   │   │   ├── shell.css       # Sidebar + Main Grid 구조
│   │   │   └── footer.css
│   │   └── components/
│   │       ├── card.css        # 카드 컴포넌트
│   │       ├── button.css
│   │       ├── hero.css
│   │       └── search.css
│   │
│   ├── js/
│   │   ├── app.js              # 메인 엔트리
│   │   ├── modules/
│   │   │   ├── sidebar.js      # 모바일 토글 로직
│   │   │   ├── search.js       # 실시간 검색 필터 로직
│   │   │   └── render.js       # (선택) JSON 데이터 카드 렌더링
│   │   └── data/
│   │       ├── articles.json   # 게시글 데이터
│   │       └── members.json    # 멤버 데이터
│   │
│   └── images/
│       ├── placeholder.png     # 임시 이미지 (구 6.png)
│       └── ...
└── README.md
```

-----

## 3\. 디자인 토큰 (CSS Variables)

SCSS 변수(`$`) 대신 CSS 변수(`--`)를 사용하여 런타임에 테마 변경이 가능하도록 한다.

**파일: `assets/css/base/variables.css`**

```css
:root {
  /* --- Colors: Brand & Theme --- */
  --bg-primary: #000000;
  --bg-secondary: #0D0F12;
  --bg-surface: #141820;
  
  /* Glassmorphism Effect */
  --bg-glass: rgba(13, 15, 18, 0.72);
  --glass-blur: blur(12px);
  --glass-border: 1px solid rgba(255, 255, 255, 0.08);

  /* Text Colors */
  --text-primary: #FFFFFF;
  --text-secondary: #A7AAB0;
  --text-muted: #757980;

  /* Accent Colors */
  --brand-main: #C80864;
  --brand-hover: #A00650;
  --brand-soft: rgba(200, 8, 100, 0.18);

  /* Functional Colors */
  --color-success: #2ECC71;
  --color-warning: #F59F00;

  /* --- Spacing System --- */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* --- Layout Dimensions --- */
  --sidebar-width: 260px;
  --sidebar-width-tablet: 80px; /* 태블릿에선 아이콘만 보이게 */
  --content-max-width: 1200px;
  
  /* --- Border Radius --- */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}
```

-----

## 4\. 반응형 레이아웃 전략 (CSS Grid)

4Pillars.io 스타일의 핵심은 **좌측 고정 Sidebar + 우측 스크롤 Main** 구조이다. 이를 CSS Grid로 명확하게 정의한다.

**파일: `assets/css/layout/shell.css`**

```css
/* 기본 레이아웃: Grid 사용 */
body {
  display: grid;
  /* Desktop: Sidebar(260px) + Content(Auto) */
  grid-template-columns: var(--sidebar-width) 1fr;
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

/* Sidebar Area */
.sidebar {
  position: sticky; /* 스크롤 따라오게 고정 */
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background: var(--bg-glass);
  backdrop-filter: var(--glass-blur);
  border-right: var(--glass-border);
  z-index: 100;
}

/* Main Content Area */
.main-content {
  padding: 0;
  min-width: 0; /* Grid overflow 방지 */
}

/* --- Responsive Breakpoints (Media Queries) --- */

/* Tablet (1200px 미만) */
@media (max-width: 1200px) {
  body {
    grid-template-columns: var(--sidebar-width-tablet) 1fr;
  }
  
  /* 사이드바 텍스트 숨기고 아이콘만 표시하는 로직 필요 */
  .sidebar .nav-text {
    display: none;
  }
}

/* Mobile (768px 미만) */
@media (max-width: 768px) {
  body {
    display: block; /* Grid 해제 */
  }

  .sidebar {
    position: fixed;
    width: 100%;
    height: 60px; /* 상단 헤더처럼 변경 */
    bottom: auto;
    border-right: none;
    border-bottom: var(--glass-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-md);
  }

  /* 모바일 네비게이션 메뉴 (숨김 상태) */
  .sidebar__nav {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    background: var(--bg-secondary);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .sidebar__nav.is-open {
    transform: translateX(0);
  }
}
```

-----

## 5\. 기능 명세 (Functional Specifications)

디자인이 실제로 '작동'하게 만들기 위한 JavaScript 로직 명세이다.

### 5.1 모바일 사이드바 토글 (Mobile Menu)

  - **Trigger**: 모바일 화면(`< 768px`)에서 햄버거 메뉴 아이콘 표시.
  - **Action**: 클릭 시 `.sidebar__nav`에 `.is-open` 클래스 토글.
  - **UX**: 메뉴가 열려있을 때 `body`에 `overflow: hidden`을 주어 배경 스크롤 방지.

**파일: `assets/js/modules/sidebar.js`**

```javascript
export function initSidebar() {
  const toggleBtn = document.querySelector('#sidebar-toggle');
  const nav = document.querySelector('.sidebar__nav');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
}
```

### 5.2 실시간 검색 (Client-side Search)

  - **Target**: `TECHSPEC.md`의 Sidebar 상단 검색바 & Hero 섹션 검색바.
  - **Logic**:
    1.  사용자가 검색어 입력 시 (`keyup` 이벤트).
    2.  현재 페이지의 `.card` 요소들의 제목(`h3`)과 내용을 스캔.
    3.  일치하지 않는 카드는 `display: none` 처리.
    4.  (고급) 전체 사이트 검색이 필요할 경우, `search.html`로 이동하여 URL 쿼리 파라미터 처리.

### 5.3 데이터 기반 렌더링 (Optional but Recommended)

  - HTML에 하드코딩하지 않고, `json` 데이터를 불러와 카드를 생성하도록 하면 유지보수가 쉬워짐.
  - **파일**: `assets/data/members.json`
  - **Logic**:
    ```javascript
    // assets/js/modules/render.js
    export async function loadMembers() {
      const response = await fetch('/assets/data/members.json');
      const members = await response.json();
      const container = document.querySelector('.team-grid');
      
      // map()을 이용해 HTML 문자열 생성 후 innerHTML 주입
      container.innerHTML = members.map(member => `
        <article class="card card--horizontal">
          ... (멤버 정보 바인딩) ...
        </article>
      `).join('');
    }
    ```

-----

## 6\. CSS 컴포넌트 세부 명세 (Native Nesting 활용)

최신 크롬, 사파리, 엣지는 CSS 중첩(`&`)을 지원한다. 가독성을 높인다.

**파일: `assets/css/components/card.css`**

```css
.card {
  display: flex;
  flex-direction: column;
  background: var(--bg-surface);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  /* Native CSS Nesting */
  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  &__image-wrapper {
    position: relative;
    aspect-ratio: 16 / 9;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    padding: var(--space-lg);
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: var(--space-sm);
    color: var(--text-primary);
  }
}
```

-----

## 7\. 단계별 구현 체크리스트

### Step 1: 뼈대 만들기 (HTML + CSS Vars)

  - [ ] `index.html`에 시맨틱 마크업 작성.
  - [ ] `assets/css/base/variables.css`에 색상/간격 정의.
  - [ ] `style.css`에서 `@import`로 CSS 파일들 연결.

### Step 2: 레이아웃 잡기 (Grid)

  - [ ] `shell.css` 작성: Desktop(Grid) / Mobile(Flex) 분기 처리.
  - [ ] Sidebar가 스크롤 시 고정(`sticky`)되는지 확인.
  - [ ] 모바일에서 Sidebar가 상단 바로 변형되는지 확인.

### Step 3: 컴포넌트 스타일링

  - [ ] Card: 4Pillars 처럼 깔끔한 보더와 호버 효과.
  - [ ] Button: Primary(핑크), Ghost 버튼 스타일.
  - [ ] Hero: 그라데이션 배경 + 타이포그래피.

### Step 4: 자바스크립트 기능 구현

  - [ ] `app.js` 생성 및 `type="module"`로 HTML 연결.
  - [ ] 모바일 햄버거 메뉴 클릭 이벤트 연결.
  - [ ] 현재 페이지 URL을 확인하여 Sidebar 링크에 `.active` 클래스 자동 추가.

### Step 5: 데이터 연결 및 테스트

  - [ ] (옵션) JSON 데이터 생성 후 `fetch`로 카드 뿌리기 테스트.
  - [ ] 크롬/사파리/모바일 브라우저에서 레이아웃 깨짐 확인.
  - [ ] Lighthouse 점수 측정 (접근성, 성능).

-----

## 8\. 4Pillars.io 스타일 모방 포인트 (Visual QA)

구현 시 다음 디테일을 반드시 챙긴다.

1.  **Border Noise & Glow**:
      - 카드의 테두리는 단순한 선이 아니라, 아주 희미한 흰색(`rgba(255,255,255,0.06)`)을 사용해 고급스럽게 표현.
2.  **Typography Hierarchy**:
      - 제목은 굵게(Bold), 본문은 회색조(`--text-secondary`)로 처리하여 정보 위계를 명확히 함.
3.  **Accent Point**:
      - 전체적으로 어둡지만, 중요한 버튼이나 활성 메뉴에만 브랜드 컬러(`#C80864`)를 사용하여 시선 유도.
4.  **Interaction**:
      - 카드 호버 시 살짝 위로 뜨는(`translateY`) 애니메이션 필수.

-----

**작성자**: PDAO Dev Team
**버전**: v3.0 (Pure CSS Edition)
**최종 수정일**: 2025-01-23