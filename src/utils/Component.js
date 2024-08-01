export class Component {
  events;
  _element;
  children;

  constructor(events = {}, children = []) {
    this.events = events;
    this._element = null;
    this.children = children;
    this.init();
  }

  init() {}

  _addEvents() {
    if (!this._element) return;
    Object.keys(this.events).forEach((eventName) => {
      this._element.addEventListener(eventName, this.events[eventName]);
    });
  }

  _removeEvents() {
    if (!this._element) return;
    Object.keys(this.events).forEach((eventName) => {
      this._element.removeEventListener(eventName, this.events[eventName]);
    });
  }

  show() {
    if (this._element) {
      this._element.style.display = "flex";
    }
  }

  hide() {
    if (this._element) {
      this._element.style.display = "none";
    }
  }

  render(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();

    this._element = template.content.firstChild;
    this._addEvents();

    this._renderChildren();

    return this._element;
  }

  _renderChildren() {
    if (!this._element) return;
    Object.entries(this.children).forEach(([name, component]) => {
      const placeholder = this._element.querySelector(
        `[data-component="${name}"]`,
      );
      if (placeholder) {
        const content = component.render();
        placeholder.replaceWith(content);
      }
    });
  }
}
