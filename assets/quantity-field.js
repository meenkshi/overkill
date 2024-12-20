if (!customElements.get("quantity-field")) {
  class QuantityField extends HTMLElement {
    constructor() {
      super();
      this.input = this.querySelector("input");
      this.picker = document.addEventListener(
        "on:variant:change", (e) => {
          this.onSelectionChange(e);
        }
      );

      this.changeEvent = new Event("change", { bubbles: true });
      this.input.addEventListener("change", this.onInputChange.bind(this));
      this.querySelectorAll("button").forEach((button) =>
        button.addEventListener("click", this.onButtonClick.bind(this))
      );
    }
    connectedCallback() {
      this.validateQtyRules();
    }

    onSelectionChange(e) {
      this.input.max = e.detail.formatted.inventory_quantity;
      this.input.value = 1;
      this.validateQtyRules();
    }

    onInputChange(event) {
      this.validateQtyRules();
    }

    onButtonClick(event) {
      event.preventDefault();
      const previousValue = this.input.value;

      event.target.name === "plus"
        ? this.input.stepUp()
        : this.input.stepDown();
      if (previousValue !== this.input.value)
        this.input.setAttribute("value", this.input.value);
        this.input.dispatchEvent(this.changeEvent);
    }

    validateQtyRules() {
      const value = parseInt(this.input.value);
      if (this.input.min) {
        const min = parseInt(this.input.min);
        const minus = this.querySelector(".quantity-button[name='minus']");
        minus.classList.toggle("disabled", value <= min);
      }
      if (this.input.max) {
        const max = parseInt(this.input.max);
        const plus = this.querySelector(".quantity-button[name='plus']");
        plus.classList.toggle("disabled", value >= max);
      }
      if (this.input.max == this.input.min) {
        this.input.setAttribute("disabled", "");
      }
    }
  }

  customElements.define("quantity-field", QuantityField);
}
