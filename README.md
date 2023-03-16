# defaultjs-html-button

- [defaultjs-html-button](#defaultjs-html-button)
  - [Intro](#intro)
  - [How to include](#how-to-include)
  - [How to use](#how-to-use)
  - [Overview of all Attributes](#overview-of-all-attributes)

## Intro

This a web component can transform your buttons and links into an interactive element, with less or even no programming effort.

## How to include

**NPM**

```javascript
//import html renderer element
import { HTMLDefaultjsAnchorElement, HTMLDefaultjsButtonElement } from "@default-js/defaultjs-html-button"
```

**Script Tag**

```html
<html>
    <head> ...</head>
    <body>
        <style>
            #target:not(.show) { display: none;}
        </style>        
        <a is="d-button" type="toggle-class" class-value="show" selector="#target">toggle class "show" by link</a>
        <button is="d-button" type="toggle-class" class-value="show" selector="#target">toggle class "show" by button</button>
        <div id="target">visible</div>

        //script file is located at dist directory
        <script type="module" src="browser-defaultjs-html-button.min.js" />   
    </body>
</html>
```

## How to use

Define a `button` or `a` tag and use the `is` attribute with the value `d-button`. You must define the `type` attribute and choose between `delegate`, `toggle-class`, `toggle-attribute`, `call-renderer`, `render` to specify what kind of action would be executed.

```html
    <a is="d-button" type="[delegate | toggle-class | toggle-attribute | call-renderer | render]">link</a>
    <button is="d-button" type="[delegate | toggle-class | toggle-attribute | call-renderer | render]">button</button>
```

For the correct execution it is necessary to define additional attributes depending on the type.

## Overview of all Attributes

Attribute           | required at type      | Description
--------------------|-----------------------|---------
`type`              |                       | `delegate`, `toggle-class`, `toggle-attribute`, `call-renderer`, `render`
`event-name`        | `delegate`            | define the event to be trigger
`class-name`        | `toggle-class`        | define the class to be toggle
`attribute-name`    | `toggle-attribute`    | define the attribute to be toggle
`detail`            | `delegate`            | detail value for an delegated event
`template`          | `render`              | define the template to be render. Further information at [defaultjs-template-language](https://github.com/default-js/defaultjs-template-language#readme)
`render-mode`       | `render`              | `replace`, `append`, `prepend`. Default: `replace` (for further information read [defaultjs-template-language](https://github.com/default-js/defaultjs-template-language#readme))
`selector`          |                       | define a selector to specify elements on which the action is to be performed. Default: the `button` or `a` it self. Can be defined on any type.
`context`           |                       | define json object, which be used to evaluate the value of the most attributes. The most attributes can be dynamic. Can be defined on any type. Further information at [defaultjs-expression-language](https://github.com/default-js/defaultjs-expression-language#readme)
