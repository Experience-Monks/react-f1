# 7.1.0

Fixes:
- Updated `peerDepencies` to work off `react@15.0.0` amd `react-dom@15.0.0`

Features:
- Can now pass in custom targets which are not defined via `data-f1` tags. This will allow for `react-f1` to control other targets that might manipulate the dom. Example: 
```
<ReactF1
    targets={{
        item: bodymovinInstance
    }}
>
...
```
- Custom parsers can now be passed to `react-f1` the format should be the same as what `f1` defines. Example:
```
<ReactF1
    parsers={{
        init: [ /* functions to be run on init */ ],
        update: [ /* functions to be run on update */ ]
    }}
```

# 7.0.0

Fixes:

- Brought in `f1-dom@8.0.0`. There was an issue with `f1-dom` where perspective was defined at an element level instead of parent container level. This caused issues where `perspective-origin` could not be changed and `perspective-origin` was inconsistent by default. This means by default now `react-f1` defines a `perspective` value on the `react-f1` container. It also means perspective origin is completely wrong on existing demos unless a width and height is defined on the container.
- Fixed issue where examples couldn't be run after transpiling was implemented.
