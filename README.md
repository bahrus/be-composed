# be-composed

[TODO] move over to be-dispatching.

[![Playwright Tests](https://github.com/bahrus/be-composed/actions/workflows/CI.yml/badge.svg)](https://github.com/bahrus/be-composed/actions/workflows/CI.yml)

<a href="https://nodei.co/npm/be-composed/"><img src="https://nodei.co/npm/be-composed.png"></a>

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-composed?style=for-the-badge)](https://bundlephobia.com/result?p=be-composed)

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-composed?compression=gzip">

*be-composed* allows us to rebroadcast events that don't bubble or don't "compose" to a different name that *does* bubble and/or compose.

Doing so imposes a bit of an expectation that the name should be namespaced or made unique, to avoid confusing with events from other components. 

In the extreme, we could use a guid, as demonstrated below: 

## JavaScriptObjectNotation

```html
<input be-composed='{
    "dispatch":{
        "change":{
            "as": "402735ed-b9e8-4ef4-9e0d-3a6b385de863",
            "bubbles": true,
            "composed": true,
            "cancelable": true,
            "stopPropagation": true,
        }
    }
}'>
```

"stopPropagation" prevents the original event from continuing to propagate.  The original event and detail are placed inside the detail of the new event.

## Hemingway Notation [TODO]

```html
<input be-composed='
    On change dispatch 402735ed-b9e8-4ef4-9e0d-3a6b385de863 as name of event.
    Bubble.
    Compose.
    Be Cancelable.
    Stop propagation.
'>
```