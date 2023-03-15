await import("./browser-defaultjs-html-renderer.min.js");
await import("/browser-defaultjs-html-button.js");
const BODY = document.body;

const log = (text, element) => {
    const container = find(element.attr("data-log")).first();
    container.append(`<div>${text}</div>`);
}

BODY.on("action:delegate", (event) => {
    console.log(event)
    const {target, detail} = event;
    
    log(JSON.stringify(detail || {}), target);
});
