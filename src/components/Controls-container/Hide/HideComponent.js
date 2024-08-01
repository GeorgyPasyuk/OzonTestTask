import { Component } from "../../../utils/Component";
import * as styles from "./Hide.module.css";
import { CheckBox } from "../../CheckBox/CheckBox";

export class HideComponent extends Component {
  constructor(updateHideValue) {
    super();
    this.updateHideValue = updateHideValue;
  }

  init() {
    this.children = {
      checkbox: new CheckBox((isChecked) =>
        this.handleUpdateHideValue(isChecked),
      ),
    };
  }

  handleUpdateHideValue(isHidden) {
    if (this.updateHideValue) {
      this.updateHideValue(isHidden);
    }
  }

  render() {
    const htmlString = `
        <div class="${styles.hideContainer}">
            <div data-component="checkbox"></div>
            <label class="${styles.hideLabel}">Hide</label> 
        </div>
    
        `;
    return super.render(htmlString);
  }
}
