class ProductLabels extends HTMLElement {
  constructor() {
    super();
    this.productLabelsConfigs = JSON.parse(
      document.querySelector("[data-product-labels]")?.innerHTML
    );
    this.productLabels = this.productLabelsConfigs.labels;
    this.product = {
      id: this.getAttribute("data-product-id"),
      collections: this.getAttribute("data-product-collections").split(",")
    }
  }

  connectedCallback() {
    const product = this.product;
    const labels = this.productLabels;
    labels.forEach((label) => this.renderProductLabel(product, label));
  }

  renderProductLabel(product, label) {
    const id = label.id;
    const text = label.text;
    const active = label.active;
    const show_on_desktop = label.show_on_desktop;
    const show_on_mobile = label.show_on_mobile;
    const image = label.image;
    const text_color = label.text_color;
    const bg_color = label.bg_color;
    const is_bold = label.is_bold;
    const link = label.link;

    const current_product_id = product.id;
    const current_product_collections = product.collections;
    const label_only_for_products = label.label_products;
    const label_only_for_collections = label.label_collections;

    if (!active) return;

    if (Object.keys(label_only_for_products).length > 0) {
      //CHECKS FOR MATCHING PORDUCTS
      var matching_product = false;
      label_only_for_products.forEach((product) => {
        if (product.id == current_product_id) {
          matching_product = true;
        }
      });
    }

    if (Object.keys(label_only_for_collections).length > 0) {
      //CHECKS FOR MATCHING COLLECTIONS
      var matching_collection = false;
      label_only_for_collections.forEach((collection) => {
        current_product_collections.forEach((col) => {
          if (col == collection.handle) {
            matching_collection = true;
          }
        });
      });
    }

    if (!matching_product) {
      if (!matching_collection) {
        return;
      }
    }

    const labelWrapper = document.createElement("div");
    labelWrapper.setAttribute("data-label-id", id);

    if (!show_on_desktop) {
      labelWrapper.classList.add("desktop-hidden");
    } else if (labelWrapper.classList.contains("desktop-hidden")) {
      labelWrapper.classList.remove("desktop-hidden");
    }
    if (!show_on_mobile) {
      labelWrapper.classList.add("mobile-hidden");
    } else if (labelWrapper.classList.contains("mobile-hidden")) {
      labelWrapper.classList.remove("mobile-hidden");
    }

    const labelEl = document.createElement("span");
    labelEl.setAttribute("data-label-id", id);

    if (image) {
      const imageEl = document.createElement("img");
      imageEl.setAttribute("loading", "lazy");
      imageEl.setAttribute("src", image);
      labelEl.appendChild(imageEl);
    } else {
      labelEl.style.color = text_color;
      labelEl.style.backgroundColor = bg_color;
      labelEl.innerText = text;
    }

    if (is_bold) {
      labelEl.style.fontWeight = "bold";
    }

    if (link) {
      const linkEl = document.createElement("a");
      linkEl.setAttribute("href", link);
      linkEl.appendChild(labelEl);
      labelWrapper.appendChild(linkEl);
    } else {
      labelWrapper.appendChild(labelEl);
    }
    this.appendChild(labelWrapper);
  }
}

// Define the custom element
customElements.define("product-labels", ProductLabels);
