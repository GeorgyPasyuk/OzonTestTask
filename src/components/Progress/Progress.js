import { Component } from "../../utils/Component";
import * as styles from "./Progress.module.css";

export class Progress extends Component {
  constructor(events = {}, children = []) {
    super(events, children);
    this.value = 50;
    this.animate = false;
  }

  setValue(newValue) {
    this.value = newValue;
    this.updateProgress();
  }

  setAnimate(isChecked) {
    this.animate = isChecked;
    this.updateProgress();
  }

  updateProgress() {
    const progressElement = this.element.querySelector("progress");
    progressElement.value = this.value;

    const percentage = this.value;
    const progressElementDiv = this.element.querySelector(
      `.${styles.progressElement}`,
    );

    if (!this.animate) {
      progressElementDiv.style.animation = "none";
    } else {
      progressElementDiv.style.animation = "";
    }

    progressElementDiv.style.background = `
      radial-gradient(closest-side, white 79%, transparent 80%),
      conic-gradient(#005cff ${percentage}%, #eaf0f6 ${percentage}%)
    `;
  }

  render() {
    const htmlString = `
      <div class="${styles.progressBar}">
        <div class="${styles.progressElement}">
          <progress min="0" max="100" style="visibility:hidden;height:0;width:0;"></progress>
        </div>
      </div>
    `;
    const renderedElement = super.render(htmlString);
    this.element = renderedElement;
    this.updateProgress();
    return renderedElement;
  }
}
