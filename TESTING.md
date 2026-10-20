# Проверка сборки

## Что проверено

Код приложения исполнялся в изолированном headless Chromium через загрузку
локальной HTML-разметки в рендерер. Для проверок сохранений использовался
тестовый объект с интерфейсом localStorage. Он не входит в файлы сайта.

Прямая навигация на локальный HTTP-сервер заблокирована политикой среды.
Поэтому это проверки интерфейса и логики, а не полноценные испытания
развёрнутого сайта, service worker и долговременного хранения браузера.

В ходе проверок JavaScript-ошибок не обнаружено.
Проверена синтаксическая корректность script.js, minimal.js и service-worker.js через Node.
Нативное перетаскивание мышью протестировано в Chromium.
Дополнительно проверены клики, модальные окна и сохранение состояния при перерисовке.

Пройденные проверки:
- Initial home shows 3 main workouts
- Extra six expand
- Workout 1 starts
- Weight modal saves
- Warmup mark survives render
- Working set survives render
- Repetitions survive render
- Superset modal opens
- Superset created bidirectionally
- Superset completion preserved
- Pair moves together using arrow
- Superset can be split
- Alternative selected
- Alternative saved to original key
- Alternative cleared
- English toggle
- Marks survive language change
- Dark theme works
- Zero reps survive re-render
- Cardio replaces rest timer
- Rest replaces cardio timer
- Finishing opens summary
- Finishing stops every timer
- History retains correct total sets
- Weight total finite
- History shows result
- Statistics render
- Native mouse drag reorders exercise
- Workout 1 renders full exercise list
- Workout 2 renders full exercise list
- Workout 3 renders full exercise list
- Workout 4 renders full exercise list
- Workout 5 renders full exercise list
- Workout 6 renders full exercise list
- Workout 7 renders full exercise list
- Workout 8 renders full exercise list
- Workout 9 renders full exercise list
- No page overflow: mainScreen at 320px
- No page overflow: historyScreen at 320px
- No page overflow: statsScreen at 320px
- No page overflow: adviceScreen at 320px
- No page overflow: workout at 320px
- No page overflow: mainScreen at 360px
- No page overflow: historyScreen at 360px
- No page overflow: statsScreen at 360px
- No page overflow: adviceScreen at 360px
- No page overflow: workout at 360px
- No page overflow: mainScreen at 390px
- No page overflow: historyScreen at 390px
- No page overflow: statsScreen at 390px
- No page overflow: adviceScreen at 390px
- No page overflow: workout at 390px
- No page overflow: mainScreen at 768px
- No page overflow: historyScreen at 768px
- No page overflow: statsScreen at 768px
- No page overflow: adviceScreen at 768px
- No page overflow: workout at 768px
- No page overflow: mainScreen at 1024px
- No page overflow: historyScreen at 1024px
- No page overflow: statsScreen at 1024px
- No page overflow: adviceScreen at 1024px
- No page overflow: workout at 1024px
- No page overflow: mainScreen at 1440px
- No page overflow: historyScreen at 1440px
- No page overflow: statsScreen at 1440px
- No page overflow: adviceScreen at 1440px
- No page overflow: workout at 1440px
- Existing theme preserved
- Existing weights read unchanged
- Existing history read unchanged
- Existing stored history untouched on init
- Backup includes original history and weights
- icon-192.png preserved byte-for-byte
- icon-512.png preserved byte-for-byte
- All original workout definitions unchanged
- Final build starts without JS errors

Дополнительно:
- Все три справочные страницы проверены на ширине 390 px: горизонтального переполнения страницы нет.
- Вручную просмотрены изображения главной, тренировки, итогов и справочной страницы.
- Определения всех программ совпадают с исходными; обе иконки совпадают побайтово.
- В архив не включаются .git, история репозитория и тестовое хранилище.

## Что ещё проверить после публикации

- Установку PWA на настоящем телефоне.
- Офлайн-режим после первого посещения и кеширования.
- Получение новой версии поверх прежнего установленного PWA.
- Сохранение данных после реального перезапуска браузера.
- iOS Safari, Android Chrome, звук, фоновые таймеры и блокировку экрана.
- Перетаскивание пальцем: на телефоне доступны также явные кнопки ↑ / ↓.
- Калькулятор и методическую корректность исходных тренировочных рекомендаций.

Никаких внешних шрифтов, CDN и аналитики в редизайн не добавлено.
