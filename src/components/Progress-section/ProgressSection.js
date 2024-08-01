import { Component } from "../../utils/Component";
import { Progress } from "../Progress/Progress";
import styles from "./ProgressSection.module.css";
import { ControlsContainer } from "../Controls-container/ControlsContainer";

export class ProgressSection extends Component {
  init() {
    this.progress = new Progress();
    this.controlsContainer = new ControlsContainer(
      (newValue) => this.updateProgressValue(newValue),
      (isChecked) => this.updateProgressAnimation(isChecked),
      (isHidden) => this.updateHideValue(isHidden),
    );

    this.children = {
      progress: this.progress,
      controls: this.controlsContainer,
    };
  }

  updateProgressValue(newValue) {
    this.progress.setValue(newValue);
  }

  updateProgressAnimation(isChecked) {
    this.progress.setAnimate(isChecked);
  }

  updateHideValue(isHidden) {
    isHidden ? this.progress.hide() : this.progress.show();
  }

  render() {
    const htmlString = `
      <section class="${styles.progressSection}">
      <div class="${styles.progressContainer}">
        <div data-component="progress"></div>
      </div>
      <div class="${styles.controlsContainer}">
        <div data-component="controls"></div>
      </div>
      </section>
    `;
    return super.render(htmlString);
  }
}
