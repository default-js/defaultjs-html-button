import "@default-js/defaultjs-extdom";
import GLOBAL from "@default-js/defaultjs-common-utils/src/Global";
import {HTMLDefaultjsAnchorElement, HTMLDefaultjsButtonElement} from "./index";

const pack = {VERSION : "${version}", HTMLDefaultjsAnchorElement, HTMLDefaultjsButtonElement };

GLOBAL.defaultjs = GLOBAL.defaultjs || {};
GLOBAL.defaultjs.html = GLOBAL.defaultjs.html || {};
GLOBAL.defaultjs.html.button = GLOBAL.defaultjs.html.button || pack;

export { HTMLDefaultjsAnchorElement, HTMLDefaultjsButtonElement };
