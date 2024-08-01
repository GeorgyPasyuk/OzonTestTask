import { Component } from "../../utils/Component";
import * as styles from "./CheckBox.module.css";

export class CheckBox extends Component {
  constructor(handleAnimateChange) {
    super({
      change: (event) => this.handleChange(event),
    });
    this.handleAnimateChange = handleAnimateChange;
    this.checked = false;
  }

  handleChange(event) {
    this.checked = event.target.checked;
    if (this.handleAnimateChange) {
      this.handleAnimateChange(this.checked);
    }
  }

  render() {
    const htmlString = `
        <label class="${styles.switch}">
            <input type="checkbox" ${this.checked ? "checked" : ""}>
            <span class="${styles.slider}"></span>
        </label>
        `;

    return super.render(htmlString);
  }
}
