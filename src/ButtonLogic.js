import "@default-js/defaultjs-extdom";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";
import { Renderer, Template } from "@default-js/defaultjs-template-language";

export const ATTR__TYPE = "type";
export const ATTR__ACTION = "action";
export const ATTR__DETAIL = "detail";
export const ATTR__SELECTOR = "selector";
export const ATTR__CONTEXT = "context";
export const ATTR__TEMPLATE = "template";
export const ATTR__RENDER_MODE = "render-mode";

export const ATTR__PREVENT_DEFAULT = "prevent-default";
export const ATTR__STOP_PROPAGATION = "stop-propagation";

export const ATTRIBUTES = []; //[ATTR__TYPE, ATTR__ACTION, ATTR__SELECTOR, ATTR__CONTEXT, ATTR__TEMPLATE];

export const TYPE__DELEGATE = "delegate";
export const TYPE__TOGGLE_CLASS = "toggle-class";
export const TYPE__TOGGLE_ATTRIBUTE = "toggle-attribute";
export const TYPE__CALL_RENDERER = "call-renderer";
export const TYPE__RENDER = "render";

export const VAR__EVENT = "$event";

const cloneEvent = ({ target, currentTarget, detail, timeStamp }) => {
	return { target, currentTarget, detail, timeStamp };
};

const selectTargets = (selector) => {
	if (selector && selector.length != 0) {
		const targets = find(selector);
		if (targets && target.length != 0) return targets;
	}
	return this;
};

const resolveText = async (text, context) => {
    return ExpressionResolver.resolveText(text, context, null);
}

const TYPE = {
	[TYPE__DELEGATE]: async ({ targets, action }) => {
		action = await resolveText(action, context);
		if (action) targets.on(action, context);
	},
	[TYPE__TOGGLE_CLASS]: async ({ targets, action }, context) => {
		action = await resolveText(action, context);
		if (action) targets.toogleClass(action);
	},
	[TYPE__TOGGLE_ATTRIBUTE]: async ({ targets, action }, context) => {
		action = await resolveText(action, context);
		if (action) {
            if(targets instanceof HTMLElement)
                targets = [targets];

            for(const target of targets){
                const value = target.attr(action);
                target.attr(action, value == null ? "" : null);
            }
        }
	},
	[TYPE__CALL_RENDERER]: async ({ targets, action}, context) => {
		action = await resolveText(action, context);
		if (action) {
            if(targets instanceof HTMLElement)
                targets = [targets];

            for(const target of targets){
                const nodename = target.NODENAME;
                if(nodename === "d-renderer" && typeof target.render === "function" ){
                    try{
                        target.render({data:context})
                    } catch(e){
                        console.error({e, button, target})
                    }
                }
            }
        }
	},
	[TYPE__RENDER]: async ({ targets, action, template }, context) => {
		action = await resolveText(action, context);
        template = await resolveText(template, context);
        if(template)
            template = await Template.load(template);

		if (action) {
            if(targets instanceof HTMLElement)
                targets = [targets];

            for(const target of targets)
                Renderer.render({container: target, template, mode: renderMode || "replace" });
        }
	},
};

class ButtonLogic {
	#element;
	#context;
	constructor(element) {
		this.#element = element;
		element.on("click", execute);
	}

	async init() {}

	async destroy() {}

	attr(key) {
		return this.#element.attr(key);
	}

	get type() {
		return this.attr(ATTR__TYPE);
	}

	get action() {
		return this.attr(ATTR__ACTION);
	}

	get selector() {
		return this.attr(ATTR__SELECTOR);
	}

	get context() {
		if (this.#context == null) {
			try {
				const value = this.attr(ATTR__CONTEXT);
				if (value && value.length != 0) this.#context = JSON.parse(value);
				else this.#context = {};
			} catch (e) {
				this.#context = {};
			}
		}
		return this.#context;
	}

    get template(){
        return this.attr(ATTR__TEMPLATE);
    }

    get rendermode() {
        return this.attr(ATTR__RENDER_MODE);
    }

    get targets() {
        return selectTargets(selector);
    } 

	get preventDefault() {
		return this.attr(ATTR__PREVENT_DEFAULT) != null;
	}

	get stopPropagation() {
		return this.attr(ATTR__STOP_PROPAGATION) != null;
	}

	execute(event) {
		const context = Object.assign({}, this.context);
		context[VAR__EVENT] = cloneEvent(event);
		if (this.preventDefault) event.preventDefault();
		if (this.stopPropagation) event.stopPropagation();

		const type = TYPE[this.type];
		if (type) {
			type(this, context);
		}
	}
}

export default ButtonLogic;
