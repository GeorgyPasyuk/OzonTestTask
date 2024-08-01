import { Component } from "../../utils/Component";
import styles from "./Controls.module.css";
import { ValueComponent } from "./Value/ValueComponent";
import { AnimateComponent } from "./Animate/AnimateComponent";
import { HideComponent } from "./Hide/HideComponent";

export class ControlsContainer extends Component {
  constructor(onValueChange, onAnimateChange, updateHideValue) {
    super();
    this.onValueChange = onValueChange;
    this.onAnimateChange = onAnimateChange;
    this.updateHideValue = updateHideValue;
  }

  init() {
    this.children = {
      value: new ValueComponent((newValue) => this.handleValueChange(newValue)),
      animate: new AnimateComponent((isChecked) =>
        this.handleAnimateChange(isChecked),
      ),
      hide: new HideComponent((isHidden) =>
        this.handleUpdateHideValue(isHidden),
      ),
    };
  }

  handleValueChange(newValue) {
    this.onValueChange(newValue);
  }

  handleAnimateChange(isChecked) {
    this.onAnimateChange(isChecked);
  }

  handleUpdateHideValue(isHidden) {
    this.updateHideValue(isHidden);
  }

  render() {
    const htmlString = `
      <section class="${styles.controlsSection}">
        <div data-component="value"></div>
        <div data-component="animate"></div>
        <div data-component="hide"></div>
      </section>
    `;
    return super.render(htmlString);
  }
}
