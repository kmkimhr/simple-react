# Taskly

할 일 관리 앱. 로드맵은 `docs/CURRICULUM.md`.

| | |
|---|---|
| 빌드 | Vite 8 |
| 언어 | TypeScript 6 |
| React | 19 |
| 린터 | ESLint 10 + `eslint-plugin-react-hooks` |
| 스타일 | 전역 CSS (5단계부터 CSS Modules) |

## 작업 규칙

- **소스 코드는 사용자가 직접 작성한다.** Claude는 터미널 응답으로 안내만 한다.
- 예외: 설정 파일(`vite.config.ts`, `tsconfig*`, `CLAUDE.md`), 사용자가 명시적으로 요청한 작업.
- 파일 읽기·진단은 자유. 추측하지 말고 확인할 것.
- 한 번에 한 덩어리씩 안내하고 사용자 확인을 기다린다.
- 명령어는 옵션까지 설명한다.

## 폴더 구조

```
src/
├── main.tsx            진입점
├── App.tsx             최상위 컴포넌트
├── index.css           전역 스타일 + 디자인 토큰
│
├── components/         재사용 UI
├── types/              타입 정의 (도메인별 파일)
├── hooks/              커스텀 훅        (4단계)
├── pages/              라우트별 화면    (6단계)
├── api/                서버 통신        (7단계)
└── store/              전역 상태        (8단계)
```

- `src/` 직속에는 `main.tsx` / `App.tsx` / `index.css`만 둔다.
- 폴더는 필요해질 때 만든다.

## 네이밍

| 대상 | 규칙 | 예 |
|---|---|---|
| 컴포넌트 파일 | `PascalCase.tsx` | `TodoItem.tsx` |
| 그 외 파일 | `camelCase.ts` | `todo.ts`, `useTodos.ts` |
| 컴포넌트 | PascalCase | `TodoList` |
| 변수·함수 | camelCase | `filteredTodos` |
| props 타입 | `<컴포넌트명>Props` | `TodoItemProps` |
| 커스텀 훅 | `use` 접두사 | `useLocalStorage` |
| 이벤트 핸들러 | `handle` 접두사 | `handleSubmit` |
| 핸들러 prop | `on` 접두사 | `onToggle` |
| boolean | `is` / `has` 접두사 | `isLoading`, `hasError` |
| CSS 클래스 | kebab-case | `todo-item` |

## 코드 컨벤션

```tsx
import type { Todo } from '@/types/todo'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
}

function TodoItem({ todo, onToggle }: TodoItemProps) {
  return <li>{todo.title}</li>
}

export default TodoItem
```

- 컴포넌트는 `function` 선언 + `export default`. 화살표 함수 컴포넌트 금지.
- props는 구조 분해로 받는다.
- props 타입은 같은 파일 안에 정의한다.
- 타입 선언은 `type`으로 통일 (`interface` 금지).
- 타입 import는 `import type` (`verbatimModuleSyntax: true`).
- 경로는 `@/` 별칭 사용. 상대경로 `../../` 금지.
- 세미콜론 없음, 작은따옴표, 2칸 들여쓰기.

### 금지

- 렌더링 중 바깥 변수 수정, `Math.random()` / `Date.now()`, DOM 직접 조작
- props 수정
- 상태 직접 수정 (`push` / `splice` / `sort` → `filter` / `map` / 스프레드)
- 파생 상태 (계산으로 뽑을 수 있으면 상태로 두지 않는다)
- `<StrictMode>` 제거

## config

| 파일 | 설정 |
|---|---|
| `tsconfig.app.json` | `paths: { "@/*": ["./src/*"] }` — `baseUrl` 없음 (TS 4.1+) |
| `vite.config.ts` | `resolve.alias`에 동일한 `@` 등록 (tsconfig와 별개로 필요) |
| `vite.config.ts` | `server.watch.usePolling: true` — WSL에서 `/mnt/c` 감시 불가. 제거 금지 |

`vite.config.ts` / `tsconfig*` / `.env` 수정 시 개발 서버 재기동 필요. `src/` 내부 파일은 불필요.

## 명령어

```bash
npm run dev       # 개발 서버
npm run build     # 프로덕션 빌드 (tsc -b && vite build)
npm run lint      # ESLint
npx tsc --noEmit  # 타입 검사만
```

## 커밋

Conventional Commits + 한국어. 단계 완료 시마다 커밋.

```
feat: 1단계 컴포넌트와 props로 정적 목록 렌더링
fix: 데모파일제거
docs: 커리큘럼 수정
```
