# TECHSPEC.md  
PDAO Website – FourPillars 스타일 디자인 레이아웃 명세서  
(레이아웃/구조 Only – 토큰/타이포/컬러는 TECHSPEC_PLAN.md v2.0 참조)

---

## 0. 목적

이 문서는 PDAO 웹사이트를 다음 두 레이아웃 레퍼런스를 기반으로 설계하기 위한
**디자인 레이아웃 스펙**이다.

- FourPillars **홈 화면** 레이아웃  
- FourPillars **About/Team 페이지** 레이아웃  

PDAO 고유 카테고리(About / Simperby / Assets / Profile)를  
FourPillars 스타일 레이아웃 안에 녹여서 구현한다.

---

## 1. 글로벌 레이아웃 (Global Shell Layout)

### 1.1 전체 쉘 구조

모든 페이지는 동일한 기본 쉘을 공유한다.

```text
┌───────────────────────────────────────────────┐
│ Sidebar (고정) │  Main Content (스크롤)       │
│ (좌측 1열)     │  - Hero / Content Sections   │
└───────────────────────────────────────────────┘

	•	좌측 Sidebar
	•	폭: 260px (데스크톱 기준)
	•	위치: position: fixed; left: 0; top: 0; bottom: 0;
	•	배경: 다크 + 유리 느낌 (glassmorphism)
	•	스크롤: Sidebar 자체는 고정, 내용은 오른쪽 영역만 스크롤
	•	우측 Main Content
	•	margin-left: 260px 로 Sidebar 공간 확보
	•	내부 최대 폭: max-width: 1200px / 중앙 정렬
	•	좌우 패딩: 24px (모바일 16px)

1.2 반응형 브레이크포인트
	•	≥ 1200px: 데스크톱 풀 레이아웃 (좌측 sidebar + 우측 content)
	•	768px ~ 1199px: 태블릿
	•	Sidebar 폭 유지 or 220px로 축소
	•	< 768px: 모바일
	•	Sidebar를 상단 슬라이드 메뉴(오프캔버스) 로 전환
	•	Main Content는 전체 폭 사용
	•	상단에 햄버거 + 로고가 있는 모바일 헤더 추가

⸻

2. Sidebar 레이아웃 (Depth 1/2 네비게이션)

FourPillars의 좌측 네비와 동일한 느낌으로 구성하되,
Depth 1/Depth 2 카테고리를 PDAO IA에 맞게 매핑한다.

2.1 구조

┌─────────────────────────────────┐
│ LOGO / Brand                   │
├─────────────────────────────────┤
│ Search (input)                 │
├─────────────────────────────────┤
│ Nav Group: PDAO                │
│  - About                       │
│  - Simperby                    │
│  - Assets                      │
│  - Profile                     │
├─────────────────────────────────┤
│ Nav Group: Resources (선택)     │
│  - Docs (Simperby Docs)        │
│  - IR                          │
│  - Links (SNS 모음)             │
├─────────────────────────────────┤
│ Nav Group: About Us / Etc      │
│  - About PDAO (현재 페이지 표시)│
│  - Newsletter / Contact (선택) │
└─────────────────────────────────┘

2.2 주요 요소
	•	Logo 영역
	•	상단 좌측: PDAO 텍스트 로고 또는 심볼
	•	작은 서브텍스트(예: “POSTECH DAO”)
	•	Search 영역
	•	폭 전체를 사용하는 검색 인풋 (placeholder: “Search PDAO”)
	•	아이콘(돋보기)을 좌/우에 배치
	•	네비 그룹
	•	그룹 타이틀(작은 Uppercase) + 링크 리스트
	•	활성 링크는 왼쪽에 작은 바(POSTECH Red) + 텍스트 컬러 강조

⸻

3. 홈 페이지 레이아웃 (index.html)

두 번째 스크린샷(FOUR PILLARS 홈)을 기준으로 한 PDAO 홈 구조.

Sidebar | Hero
        | Comments Strip
        | ARTICLES Section
        | ISSUES Section
        | REPORTS Section
        | Newsletter Band
        | Footer

3.1 Hero 영역

┌───────────────────────────────────────────────┐
│ [Hero Visual + Tagline]                      │
│ - 배경: 큰 이미지/그래디언트 (기둥 느낌 참고)   │
│ - 상단: 작은 라벨 (예: "PDAO Research")       │
│ - 중앙: H1 타이틀                             │
│ - 하단: 서브 카피                             │
│                                               │
│ [Search Bar] (Hero 하단 중앙에 오버레이)       │
└───────────────────────────────────────────────┘

	•	Hero Visual
	•	높이: min-height: 320~400px
	•	배경: 노이즈 그래디언트 + 3D 느낌 이미지를 적용할 수 있는 컨테이너
	•	타이틀/카피
	•	중앙 좌상단 또는 가운데 정렬
	•	예:
	•	Title: “Unlock Web3 with Clarity”
	•	Sub: “PDAO는 포스텍 기반 블록체인 연구와 프로젝트를 통해 …”
	•	Search Bar
	•	Hero 하단 중앙에 가로로 긴 인풋
	•	폭: 콘텐츠 폭의 60~70%
	•	네모 카드 위에 떠 있는 느낌 (shadow + radius)

3.2 Comments / Activity Strip (옵션)

FourPillars의 “COMMENTS” 섹션처럼, 상단에 PDAO의 최신 활동/공지 스트립을 배치.

┌───────────────────────────────────────────────┐
│ COMMENTS   [View all]                        │
│ ┌──── Card ───┐ ┌──── Card ───┐ ┌──── Card… │
└───────────────────────────────────────────────┘

	•	각 카드:
	•	제목 + 짧은 설명
	•	카테고리/태그 (IR / Simperby / Event 등)
	•	V1: 정적 3~4개 카드, 가로 스크롤 없이 한 줄로만 표시해도 무방

3.3 ARTICLES 섹션 → PDAO About/Simperby/글 컨텐츠 매핑

FourPillars Articles 레이아웃:

[섹션 헤더]  [View all]
┌───────────────┬───────────────────────┐
│ 큰 Featured   │ 우측 상단 카드 1      │
│ Article Card  │ 우측 중단 카드 2      │
│ (1개)         │ 우측 하단 카드 3      │
└───────────────┴───────────────────────┘
┌──── 카드 ───┐ ┌──── 카드 ───┐ ... (하단 그리드)

PDAO에서는 다음과 같이 활용:
	•	섹션 제목: ARTICLES 대신 PDAO INSIGHTS 혹은 ARTICLES
	•	좌측 큰 카드:
	•	가장 최근/중요한 글(예: Medium 글, IR 요약, 주요 공지)
	•	우측 세로 카드:
	•	나머지 최근 글 2~3개
	•	하단 그리드:
	•	짧은 글 / 노트 / 링크들

구조

<section class="section section--articles">
  [Header Row]
  [Main Grid: 2열 (1+3 카드)]
  [Sub Grid: 3~4열 카드]
</section>

3.4 ISSUES 섹션 → PDAO Projects/Topics

FourPillars Issues: 상단에 큰 카드 2개(가로로), 하단에 작은 리스트.

[ISSUES] [View all]
┌──── Large Issue Card ────┬──── Large Issue Card ────┐
└──────────────────────────┴───────────────────────────┘
┌─ small card ┐ ┌─ small card ┐ ┌─ small card ┐ ...

PDAO 적용:
	•	상단 Large 카드:
	•	예: “Simperby”, “PDAO Governance”, “Education Program” 등 핵심 주제
	•	하단 작은 카드:
	•	각 이슈 아래에 속하는 서브 토픽 / 포스트 링크

3.5 REPORTS 섹션 → IR/리서치 PDF

FourPillars Reports: 큰 카드 2개 + 그 아래 여러 개의 보고서 카드.

[REPORTS] [View all]
┌──── Large Report 1 ────┬──── Large Report 2 ────┐
└────────────────────────┴────────────────────────┘
┌ small report ┐ ┌ small report ┐ ┌ small report ┐ ...

PDAO 적용:
	•	Large 카드:
	•	대표 IR 문서 (예: PDAO OT.pdf)
	•	주요 리서치 리포트
	•	Small 카드:
	•	추가 자료 / 학내 발표 / 세미나 발표 자료 등

각 카드에는:
	•	썸네일 이미지 (커버 또는 컬러 블럭)
	•	문서 제목
	•	간단 설명
	•	파일 타입/크기(선택)

3.6 Newsletter / Join CTA Band

FourPillars의 “Sign up for newsletter” 영역과 동일한 위치에 PDAO CTA.

┌───────────────────────────────────────────────┐
│ [왼쪽 텍스트]  |  [오른쪽 이메일 입력 + 버튼]    │
└───────────────────────────────────────────────┘

	•	PDAO의 목적에 맞게:
	•	“Get updates from PDAO”
	•	“Join our Discord” 버튼을 병렬 배치도 가능

3.7 Footer

FourPillars Footer 구조를 유지하되, PDAO 카테고리/링크로 교체.

┌───────────────────────────────────────────────┐
│ LOGO/브랜드                                 │
│                                             │
│ [Research]  [Projects]  [Company]  [Social] │
│  - Articles   - Simperby   - About   - X    │
│  - Reports    - ...        - IR      - GitHub
│                                             │
│ Contact: 이메일 / Discord 링크              │
└───────────────────────────────────────────────┘


⸻

4. About / Team 페이지 레이아웃 (/about)

첫 번째 스크린샷(FourPillars About/Team)을 그대로 PDAO에 맞게 변형.

Sidebar | Hero
        | Trusted By (로고 벨트, 선택)
        | Team Section (카드 그리드)
        | Footer

4.1 About Hero

┌───────────────────────────────────────────────┐
│ [배경 그래디언트 + 타이틀]                  │
│ "Unlock Crypto with Clarity" → PDAO 버전 카피 │
│ 서브 텍스트: PDAO 미션 요약                  │
└───────────────────────────────────────────────┘

	•	Home Hero와 유사한 스타일을 재사용
	•	About 페이지이므로 문구는 “Who we are”, “PDAO Mission” 등으로 변경

4.2 Trusted By (선택적)

FourPillars About에 있는 파트너 로고 벨트 영역.

PDAO 적용:
	•	Trusted by 대신:
	•	“Collaborations” 혹은 “Supported by”
	•	실제로 함께한 기관/프로젝트 로고가 있다면 표시
	•	없다면 v1은 생략해도 무방 (SCSS 구조만 준비)

레이아웃:

┌───────────────────────────────────────────────┐
│ Trusted by                                   │
│ [로고][로고][로고][로고]...                  │
└───────────────────────────────────────────────┘

4.3 Team Section

가장 핵심: FourPillars Team 카드 그리드와 동일한 느낌으로 PDAO 멤버를 표시.

[Team]

┌───────────────┬───────────────┐
│ Member Card 1 │ Member Card 2 │
├───────────────┼───────────────┤
│ Member Card 3 │ Member Card 4 │
├───────────────┼───────────────┤
│ ...           │ ...           │
└───────────────┴───────────────┘

4.3.1 Member Card 구조
각 카드(좌: 사진, 우: 텍스트) – FourPillars Team 카드 참고.

┌───────────────────────────────────────────────┐
│ [Profile Image]     | [이름, Role, Handles]   │
│                     | [짧은 소개 텍스트]      │
│                     | [학력/전공/경력 요약]   │
└───────────────────────────────────────────────┘

	•	좌측
	•	정사각형 or 4:5 비율 사진
	•	배경이 있는 다크 카드 위에 올림
	•	우측 상단
	•	이름 (굵은 텍스트)
	•	Role (예: “Researcher”, “Operator”)
	•	디스코드 핸들(선택)
	•	우측 본문
	•	3~4줄 소개 (현재 PDAO에서 하는 일, 관심 분야)
	•	우측 하단
	•	학력/전공/소속 (Bullet list 또는 한 줄 요약)

카드 비주얼:
	•	배경: 다크 surface + subtle border
	•	radius: 16~20px
	•	hover 시:
	•	살짝 위로 (translateY -2~4px)
	•	border-color / shadow 강도 증가

4.3.2 그리드 동작
	•	데스크톱: 2열 (한 줄에 두 멤버)
	•	태블릿(≤ 960px): 1열
	•	카드 간 수직 간격: 24~32px

⸻

5. 다른 페이지 레이아웃 개요

간단한 방향만 정의하고, 상세 SCSS/HTML은 TECHSPEC_PLAN.md에서 계속.

5.1 /simperby
	•	Hero: Simperby 소개 (이미지 + 텍스트, Home Hero보다 낮은 높이)
	•	“Project Overview” 섹션: 큰 카드 하나 + 짧은 설명
	•	“Docs & Resources” 섹션: 링크 카드 3개 (GitHub / Protocol / crates.io)
	•	필요 시 Issues/Reports 카드 스타일 재사용

5.2 /assets
	•	Hero: “Brand Assets”
	•	두 개의 세부 섹션:
	•	Logo: 여러 버전의 로고를 카드 또는 그리드로 전시 (다운로드 버튼)
	•	Poppin: Poppin 캐릭터 이미지/문서 다운로드 카드

5.3 /profile
	•	Hero: “PDAO Members”
	•	상단에 간단한 통계(총 인원, Core/Research/Infra 등 카테고리 카운트)
	•	하단: Team Section과 동일한 멤버 카드 그리드
(About의 Team과 공통 컴포넌트 사용, 데이터만 다르게 주입)


⸻

6. 구현 순서 (레이아웃 관점)
	1.	Global Shell & Sidebar
	•	Sidebar 고정 레이아웃 + Main Content 마진 구조 구현
	2.	Footer Layout
	•	FourPillars 스타일 3~4열 Footer 구현
	3.	Home Layout
	•	Hero + Search
	•	Comments Strip
	•	Articles / Issues / Reports 섹션 순서대로 마크업
	4.	About/Team Layout
	•	About Hero
	•	Trusted By (옵션)
	•	Team 카드 그리드
	5.	기타 페이지
	•	Simperby / Assets / Profile 레이아웃 기본 골격 구현
	6.	반응형 튜닝
	•	Sidebar collapsing, 2열→1열 전환, 카드 폭/간격 조정

⸻

이 문서의 레이아웃 스펙을 기반으로,
기존 TECHSPEC_PLAN.md(토큰/SCSS 구조/데이터 구조)에 이어서
실제 HTML/SCSS 구현을 진행하면 된다.

