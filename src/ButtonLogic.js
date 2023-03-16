import "@default-js/defaultjs-extdom";
import { ExpressionResolver } from "@default-js/defaultjs-expression-language";
import { Renderer, Template } from "@default-js/defaultjs-template-language";

export const ATTR__TYPE = "type";
export const ATTR__CLASS_NAME = "class-name";
export const ATTR__ATTRIBUTE_NAME = "attribute-name";
export const ATTR__EVENT_NAME = "event-name";
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

const CHECK_RENDERER = /d-renderer/i;

const loadTemplate = async (template) => {
	try{
		const node = find(template).first();
		if(node)
			return Template.load(node);
	}catch(e){}

	return Template.load(new URL(template, location));
}

const cloneEvent = (event) => {
	const { target, currentTarget, detail, timeStamp } = event;
	return { target, currentTarget, detail, timeStamp };
};

const resolveText = async (text, context) => {
	return ExpressionResolver.resolveText(text, context, null);
};

const TYPE = {
	[TYPE__DELEGATE]: async ({ targets, eventname }, context) => {
		eventname = await resolveText(eventname, context);
		if (eventname) targets.trigger(eventname, context);
	},
	[TYPE__TOGGLE_CLASS]: async ({ targets, classname }, context) => {
		classname = await resolveText(classname, context);
		if (classname) targets.toggleClass(classname);
	},
	[TYPE__TOGGLE_ATTRIBUTE]: async ({ targets, attributename }, context) => {
		attributename = await resolveText(attributename, context);
		if (attributename) {
			if (targets instanceof HTMLElement) targets = [targets];

			for (const target of targets) {
				const value = target.attr(attributename);
				target.attr(attributename, value == null ? "" : null);
			}
		}
	},
	[TYPE__CALL_RENDERER]: async ({ targets }, context) => {
		if (targets instanceof HTMLElement) targets = [targets];

		for (const target of targets) {
			const nodename = target.nodeName;
			if (CHECK_RENDERER.test(nodename) && typeof target.render === "function") {
				try {
					target.render({ data: context });
				} catch (e) {
					console.error({ e, button, target });
				}
			}
		}
	},
	[TYPE__RENDER]: async ({ targets, template, renderMode }, context) => {
		template = await resolveText(template, context);
		if (template) template = await loadTemplate(template);

		if (targets instanceof HTMLElement) targets = [targets];

		for (const target of targets) Renderer.render({ container: target, template, data: context, mode: renderMode || "replace" });
	},
};

class ButtonLogic {
	#element;
	#context;
	constructor(element) {
		this.#element = element;
		element.on("click", (event) => this.execute(event));
	}

	async init() {}

	async destroy() {}

	attr(key) {
		return this.#element.attr(key);
	}

	get type() {
		return this.attr(ATTR__TYPE);
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

	get eventname(){
		return this.attr(ATTR__EVENT_NAME);
	}

	get classname(){
		return this.attr(ATTR__CLASS_NAME);
	}

	get attributename(){
		return this.attr(ATTR__ATTRIBUTE_NAME);
	}

	get template() {
		return this.attr(ATTR__TEMPLATE);
	}

	get rendermode() {
		return this.attr(ATTR__RENDER_MODE);
	}

	get targets() {
		const selector = this.selector;
		if (selector && selector.length != 0) {
			const targets = find(selector);
			if (targets && targets.length != 0) return targets;
		}
		return this.#element;
	}

	get preventDefault() {
		return this.attr(ATTR__PREVENT_DEFAULT) != null;
	}

	get stopPropagation() {
		return this.attr(ATTR__STOP_PROPAGATION) != null;
	}

	execute(event) {
		const type = TYPE[this.type];
		const context = {
			$type: type,
			$event:cloneEvent(event),
			$context: this.context,
			$data: this.#element.data()
		};
		if (this.preventDefault) event.preventDefault();
		if (this.stopPropagation) event.stopPropagation();

		
		if (type) {
			type(this, context);
		}
	}
}

export default ButtonLogic;
