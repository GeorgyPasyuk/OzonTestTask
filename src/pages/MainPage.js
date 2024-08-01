import { Component } from "../utils/Component";
import * as styles from "./MainPage.module.css";
import { ProgressSection } from "../components/Progress-section/ProgressSection";

export class MainPage extends Component {
  init() {
    this.children = {
      progress: new ProgressSection(),
    };
  }

  render() {
    const htmlString = `
      <div class="${styles.mainPageContainer}">
        <h class="${styles.progressText}">Progress</h>
        <div data-component="progress"></div>
      </div>
    `;

    return super.render(htmlString);
  }
}
