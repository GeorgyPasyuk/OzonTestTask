import { Component } from "../../../utils/Component";
import * as styles from "./Animate.module.css";
import { CheckBox } from "../../CheckBox/CheckBox";

export class AnimateComponent extends Component {
  constructor(onAnimateChange) {
    super();
    this.onAnimateChange = onAnimateChange;
  }

  init() {
    this.children = {
      checkbox: new CheckBox((isChecked) =>
        this.handleAnimateChange(isChecked),
      ),
    };
  }

  handleAnimateChange(isChecked) {
    if (this.onAnimateChange) {
      this.onAnimateChange(isChecked);
    }
  }

  render() {
    const htmlString = `
      <div class="${styles.animateContainer}">
        <div data-component="checkbox"></div>
        <label class="${styles.animateLabel}">Animate</label>
      </div>
    `;
    return super.render(htmlString);
  }
}
