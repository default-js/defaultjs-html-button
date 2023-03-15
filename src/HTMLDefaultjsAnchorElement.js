import {NODENAME} from "./Constants";
import {componentBaseOf, define} from "@default-js/defaultjs-html-components";
import ButtonLogic, {ATTRIBUTES} from "./ButtonLogic";

class HTMLDefaultjsAnchorElement extends componentBaseOf(HTMLAnchorElement){
    static get NODENAME() { return NODENAME; }

    #logic;
    constructor(options){
        super(options);
        this.#logic = new ButtonLogic(this);
    }

    async init(){
        await super.init();
        await this.#logic.init();
    }

    async destroy(){
        await this.#logic.destroy();        
        await super.destroy();
    }
};

define(HTMLDefaultjsAnchorElement, {extends: "a"});
export default HTMLDefaultjsAnchorElement;