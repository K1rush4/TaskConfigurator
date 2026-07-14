# План: Task Planner (Помощник по планированию задач)

**Стек:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4

## 1. Состояние (state)

Файл: `src/app/page.tsx`

- `tasks: { id: string; text: string }[]` — массив задач со стабильными ID
- `input: string` — значение поля ввода

Управление через `useState`.

## 2. Разметка (JSX)

```
┌─────────────────────────────────┐
│  [ input field ]  [ Add ]       │  ← строка ввода
├─────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  │ task│×│ │ task│×│ │ task│×│ │ task│×│ │ task│×│
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
│  ┌─────┐ ┌─────┐                 │  ← перенос
│  │ task│×│ │ task│×│             │
│  └─────┘ └─────┘                 │
└─────────────────────────────────┘
```

- Верхняя часть: `<input>` + `<button>` в контейнере
- Нижняя часть: контейнер с `flex flex-wrap` — 5 карточек в ряд

## 3. Карточка задачи `TaskCard`

- Рамка: `rounded-xl border p-3 relative` + ширина `w-1/5` (20%)
- Крестик: абсолютное позиционирование `top-1 right-1`, скрыт через `opacity-0 group-hover:opacity-100`
- Группа: `group` на родительском `div`

## 4. Логика

- **Добавление**: по клику на кнопку (или Enter) → `setTasks([...tasks, { id: crypto.randomUUID(), text: input.trim() }])`, очистить input
- **Удаление**: по клику на X → `setTasks(tasks.filter(t => t.id !== id))`
- **Пустой input**: кнопка disabled или проверка `trim()`

## 5. Тестирование

**Фреймворк:** Vitest + @testing-library/react + @testing-library/jest-dom + @testing-library/user-event

**Файл:** `src/app/__tests__/TaskPlanner.test.tsx`

**Сценарии:**
- Добавление задачи по клику "Add"
- Добавление задачи через Enter
- Пустая/пробельная строка не добавляется
- Удаление задачи по клику на X
- Крестик скрыт по умолчанию и показывается при наведении

## 6. Файлы для изменения/создания

| Файл | Действие |
|---|---|
| `plan.md` | Записать этот план |
| `package.json` | Добавить devDependencies и скрипт test |
| `vitest.config.ts` | Создать конфигурацию Vitest |
| `src/app/page.tsx` | Переписать полностью с Task Planner |
| `src/app/__tests__/TaskPlanner.test.tsx` | Создать тесты |
