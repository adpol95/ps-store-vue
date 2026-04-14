# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

Отличная идея — сделать **вертикальный срез на 1 неделю**, а не весь проект.  
При темпе **4–5 часов/день** у тебя будет примерно **28–35 часов**, и в это можно уложить очень полезный объем.

## Предлагаю взять срез: **Каталог + карточка товара + корзина + авторизация (mock)**

Это даст покрытие большинства ключевых концепций Vue без перегруза.

### Что именно делаем за неделю

- `Каталог` (список товаров, фильтры, сортировка, пагинация)
- `Карточка товара` (динамический роут `:id`, загрузка данных)
- `Корзина` (добавление/удаление/изменение количества, итоговая сумма)
- `Auth mock` (логин/логаут, защита маршрутов через `meta.requiresAuth`)
- `Базовая обработка ошибок и загрузок` (skeleton/loading/error states)

## Какие концепции Vue ты покроешь

- **Composition API**: `ref`, `reactive`, `computed`, `watch`, `onMounted`
- **Компоненты**: props/emits, слоты (хотя бы 1 reusable компонент)
- **Router**: nested routes, dynamic params, route guards
- **State management (Pinia)**: store для auth + basket
- **Server state (Vue Query)**: `useQuery`, `useMutation`, invalidation
- **API слой (Axios)**: instance, interceptors, базовые ошибки
- **Формы**: controlled inputs + валидация (минимум логин/поиск/фильтр)
- **Архитектура**: разделение `shared/entities/features/pages/app`

## Реалистичный план на 7 дней (28–35ч)

- **День 1:** каркас роутов + layout + заглушки страниц
- **День 2:** API интеграция каталога через Vue Query, loading/error
- **День 3:** фильтры/сортировка/пагинация + синхронизация с query params
- **День 4:** страница товара `:id` + “добавить в корзину”
- **День 5:** Pinia корзина (persist в localStorage), итоги и действия
- **День 6:** auth mock + guard для защищенных маршрутов
- **День 7:** рефакторинг, повторяемые UI-компоненты, фиксы, мини-полировка

## Что сознательно НЕ берем (чтобы не сорвать срок)

- реальная оплата
- сложный личный кабинет
- SSR/Nuxt
- e2e тесты на весь флоу
- сложные анимации и pixel-perfect верстка

Если хочешь, следующим сообщением дам тебе **очень конкретный backlog в формате “задачи на каждый день по 60–90 минут”** (как чеклист), чтобы просто идти по нему и закрывать.
