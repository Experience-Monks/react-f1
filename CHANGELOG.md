# 7.0.0

Fixes:

- Brought in `f1-dom@8.0.0`. There was an issue with `f1-dom` where perspective was defined at an element level instead of parent container level. This caused issues where `perspective-origin` could not be changed and `perspective-origin` was inconsistent by default. This means by default now `react-f1` defines a `perspective` value on the `react-f1` container. It also means perspective origin is completely wrong on existing demos unless a width and height is defined on the container.
- Fixed issue where examples couldn't be run after transpiling was implemented.
