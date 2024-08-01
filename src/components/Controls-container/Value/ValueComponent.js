import { Component } from "../../../utils/Component";
import * as styles from "./Value.module.css";

export class ValueComponent extends Component {
  constructor(onValueChange) {
    super({
      input: (event) => this.handleValueChange(event),
    });
    this.value = 50; 
    this.onValueChange = onValueChange;
  }

  handleValueChange(event) {
    let newValue = Number(event.target.value);
    if (isNaN(newValue)) {
      return;
    }
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 100) {
      newValue = 100;
    }
    this.value = newValue;
    event.target.value = this.value;
    this.onValueChange(this.value);
  }

  render() {
    const htmlString = `
        <div class="${styles.valueContainer}">
          <input 
            class="${styles.valueNumber}" 
            type="number" 
            value="${this.value}" 
            min="0" 
            max="100" 
            step="1" 
            />
          <label class="${styles.valueLabel}">Value</label>
        </div>
        `;

    return super.render(htmlString);
  }
}
