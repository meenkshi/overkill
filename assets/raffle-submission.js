if (!customElements.get('raffle-submission')) {
  class RaffleSubmission extends HTMLElement {
    constructor() {
      super();
      this.variants = this.dataset.variants && JSON.parse(this.dataset.variants);
      this.selectedVariantId = this.dataset.currentVariantId;
      this.submitBtn = this.querySelector('button');
      this.checkbox = this.querySelector('input[type="checkbox"]');
      this.submitBtn.disabled = !this.checkbox?.checked;
    }

    connectedCallback() {
      document.addEventListener('on:variant:change', this.onVariantChange.bind(this));
      if (!this.submitBtn) return;
      this.submitBtn.addEventListener('click', this.onSubmit.bind(this));
      if (!this.checkbox) return;
      this.checkbox.addEventListener('change', (event) => {
        this.submitBtn.disabled = !event.target.checked;
      });
    }
    
    disconnectedCallback() {
      document.removeEventListener('on:variant:change', this.onVariantChange.bind(this));
    }
    
    onVariantChange(event) {
      this.selectedVariantId = event.detail.variant.id;
      this.dataset.currentVariantId = this.selectedVariantId;
      const variant = this.variants.find((variant) => variant.id == this.selectedVariantId);
      this.querySelector('input[name="properties[_raffle]"]').value = variant ? variant.token : '';
      if (this.submitBtn) {
        this.submitBtn.disabled = !this.checkbox?.checked;
      }
    }
    
    async onSubmit() {
      if (this.variants) {
        const variant = this.variants.find((variant) => variant.id == this.selectedVariantId);
        if (!variant) return;
        
        this.submitBtn.classList.add('is-loading');
        fetch(`${window.Shopify.routes.root}cart/clear`).then(async (res) => {
          if (res.status === 200) {
            const result = await document.querySelector('product-form').handleSubmit(new SubmitEvent('submit'));
            if (!result) {
              window.location.href = `/checkout`;
            }
          } else {
            this.submitBtn.classList.remove('is-loading');
          }
        })
      }
    }
  }

  customElements.define('raffle-submission', RaffleSubmission);
}
