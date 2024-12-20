if (!customElements.get('countdown-timer')) {
  class CountdownTimer extends HTMLElement {
    constructor() {
      super();
      let now = new Date(this.dataset.now);
      now = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
      this.endDate = new Date(this.dataset.endDate);
      this.endDate = Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), this.endDate.getHours(), this.endDate.getMinutes(), this.endDate.getSeconds());
      this.timeUntilEndDate = this.endDate - now;
      if (!Number(this.endDate) || !Number(this.timeUntilEndDate)) return;

      // scrolling banner coordinates loading
      if (!this.closest('.marquee-item')) {
        window.initLazyScript(this, this.init.bind(this));
      }
    }

    init() {
      this.daysEl = this.querySelector('.js-days .countdown__number-part');
      this.hoursPart1El = this.querySelector('.js-hours .countdown__number-part-1');
      this.hoursPart2El = this.querySelector('.js-hours .countdown__number-part-2');
      this.minsPart1El = this.querySelector('.js-mins .countdown__number-part-1');
      this.minsPart2El = this.querySelector('.js-mins .countdown__number-part-2');
      this.secsPart1El = this.querySelector('.js-secs .countdown__number-part-1');
      this.secsPart2El = this.querySelector('.js-secs .countdown__number-part-2');

      this.second = 1000;
      this.minute = 60 * this.second;
      this.hour = 60 * this.minute;
      this.day = 24 * this.hour;

      const numberTransitionDuration = getComputedStyle(this).getPropertyValue('--countdown-number-transition-duration');
      if (numberTransitionDuration) {
        this.numberTransitionDurationMS = CountdownTimer.durationToMS(numberTransitionDuration);
        this.animated = this.numberTransitionDurationMS > 0;
      }

      // add transition elements
      if (this.animated) {
        this.querySelectorAll('.countdown__number:is(.js-hours, .js-mins, .js-secs) .countdown__number-part').forEach((el) => {
          el.innerHTML = '';
          const span1 = document.createElement('span');
          span1.className = 'countdown__number-part-current';
          span1.textContent = '0';
          const span2 = document.createElement('span');
          span2.className = 'countdown__number-part-previous';
          span2.textContent = '0';
          el.append(span1, span2);
        });
      }

      this.timer();
      this.interval = setInterval(this.timer.bind(this), this.second);
      this.setAttribute('loaded', '');
    }

    timer() {
      const timeDiff = this.timeUntilEndDate - performance.now();

      if (timeDiff < 0) {
        clearInterval(this.interval);
        this.setAttribute('loaded', '');
        
        if (this.dataset.section) {
          this.renderSection();
        }
        
        return;
      }

      const days = Math.floor(timeDiff / this.day);
      const hours = Math.floor(timeDiff / this.hour);
      const mins = Math.floor(timeDiff / this.minute);
      const secs = Math.floor(timeDiff / this.second);

      if (days === 0) {
        this.daysEl.closest('.countdown__item').classList.add('countdown__item--is-0');
        this.daysEl.classList.add('countdown__number-part--is-0');
      }
      this.daysEl.textContent = days;

      const displayHours = String(hours - days * 24).padStart(1, '0');
      this.setPartValue(this.hoursPart1El, displayHours[0], true);
      this.setPartValue(this.hoursPart2El, displayHours[1]);

      const displayMins = String(mins - hours * 60).padStart(1, '0');
      this.setPartValue(this.minsPart1El, displayMins[0], true);
      this.setPartValue(this.minsPart2El, displayMins[1]);

      const displaySecs = String(secs - mins * 60).padStart(1, '0');
      this.setPartValue(this.secsPart1El, displaySecs[0], true);
      this.setPartValue(this.secsPart2El, displaySecs[1]);

      this.setAttribute('loaded', '');
    }
    
    renderSection() {
      fetch(`?section_id=${this.dataset.section}`)
        .then(res => res.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const section = doc.getElementById(`shopify-section-${this.dataset.section}`);
          
          if (section) {
            if (section.querySelectorAll('[data-cc-animate]')) {
              section.querySelectorAll('[data-cc-animate]').forEach((el) => {
                el.removeAttribute('data-cc-animate');
              });
            }
            document.getElementById(`shopify-section-${this.dataset.section}`).innerHTML = section.innerHTML;
          }
        });
    }

    setPartValue(part, value, setZeroClass) {
      if (setZeroClass) {
        part.classList.toggle('countdown__number-part--is-0', value === '0');
      }

      // Changing value and animated
      if (this.animated) {
        const current = part.querySelector('.countdown__number-part-current');
        if (value !== current.textContent) {
          const previous = part.querySelector('.countdown__number-part-previous');
          part.classList.add('countdown__number-part--start-transition');
          previous.textContent = current.textContent;
          current.textContent = value;
          setTimeout(() => {
            requestAnimationFrame(() => part.classList.remove('countdown__number-part--start-transition'));
          }, 20);
        }
      } else {
        part.textContent = value;
      }
    }

    static durationToMS(duration) {
      if (duration.indexOf('ms') > 0) {
        return parseInt(duration, 10);
      }

      if (duration.indexOf('s') > 0) {
        return parseFloat(duration) * 1000;
      }

      throw new Error(`Duration unit not recognised: ${duration}`);
    }
  }

  customElements.define('countdown-timer', CountdownTimer);
}
