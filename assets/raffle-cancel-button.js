if (!customElements.get('raffle-cancel-button')) {
  class RaffleCancelButton extends HTMLElement {
    constructor() {
      super();
      this.submitBtn = this.querySelector('button');
      this.messageElement = this.querySelector('.js-form-error');
      this.messages = JSON.parse(this.dataset.messages);
    }
    
    connectedCallback() {
      console.log('connected', this.submitBtn)
      if (!this.submitBtn) return;
      this.submitBtn.addEventListener('click', this.onSubmit.bind(this));
    }
    
    async onSubmit() {
      this.submitBtn.classList.add('is-loading');
      if (this.messageElement) {
        this.messageElement?.setAttribute('hidden', true);
        this.messageElement.innerText = '';
      }
      
      fetch(`${window.Shopify.routes.root}apps/overkill-backend/cancel_entry?order_id=${this.dataset.orderId}`, {
        method: 'POST',
      }).then(async (res) => {
        return res.json();
      }).then(async (res) => {
        if (res.success) {
          if (this.messageElement) {
            this.messageElement.removeAttribute('hidden');
            this.messageElement.innerText = this.messages?.success;
            window.location.reload();
          }
        } else {
          if (this.messageElement) {
            this.messageElement.removeAttribute('hidden');
            if (res.error === 'Raffle entry is not open for cancellation') {
              this.messageElement.innerText = this.messages?.errors?.no_cancellation;
            } else if (res.error === 'Raffle entry not found') {
              this.messageElement.innerText = this.messages?.errors?.entry_not_found;
            } else if (res.error === 'Unauthorized') {
              this.messageElement.innerText = this.messages?.errors?.unauthorized;
            } else {
              throw new Error('Unknown error');
            }
          }
        }
      }).catch((err) => {
        if (this.messageElement) {
          this.messageElement.removeAttribute('hidden');
          this.messageElement.innerText = this.messages?.errors?.general_error;
        }
      }).finally(() => {
        this.submitBtn.classList.remove('is-loading');
      })
    }
  }

  customElements.define('raffle-cancel-button', RaffleCancelButton);
}