/**
 * JAVASCRIPT DEVELOPER DOCUMENTATION
 *
 * Symmetry is a powerful and customizable theme designed for large-scale e-commerce stores. Built
 * using Web Components, it offers a highly modular architecture that makes customization and
 * maintenance easier than ever. In addition, Symmetry is optimized for speed, ensuring that your
 * store runs as fast as possible to provide your customers with a seamless shopping experience.
 *
 * If you would like to add your own JS to Symmetry, we recommend using this file and referencing
 * it using Theme Settings > Advanced > Custom HTML.
 *
 * As a brief overview, Symmetry:
 *  - Broadcasts many JS events.
 *  - Is built using Web Components.
 *  - Leverages 'code splitting' for some features.
 *  - Is completely custom built (no JS libraries)
 *  - Has a number of JS utilities.
 *
 *
 *
 * =================================================================================================
 * Custom JavaScript Events
 * =================================================================================================
 *
 * Symmetry broadcasts many custom events for ease of extensibility, detailed in this section.
 *
 * When in the Theme Editor, the details of each custom event will be logged out in the Dev Tools
 * console everytime it is triggered.
 *
 * Events are named in the following convention: ["on/dispatch"]:[subject]:[action] (where
 * 'dispatch' will trigger an event to occur, and 'on' indicates an event has occurred).
 *
 * All 'Return data' detailed in this section is returned within the 'event.detail' object.
 *
 * The available events are:
 *  1.  on:variant:change
 *  2.  on:cart:add
 *  3.  on:cart:error
*   4.  on:cart:after-merge
 *  5.  on:cart-drawer:before-open
 *  6.  on:cart-drawer:after-open
 *  7.  on:cart-drawer:after-close
 *  8.  on:quickbuy:before-open
 *  9.  on:quickbuy:after-open
 *  10. on:quickbuy:after-close
 *  11. dispatch:cart-drawer:open
 *  12. dispatch:cart-drawer:refresh
 *  13. dispatch:cart-drawer:close
 *  14. on:debounced-resize
 *  15. on:breakpoint-change
 *
 * -------------------------------------------------------------------------------------------------
 * 1) on:variant:change
 * -------------------------------------------------------------------------------------------------
 * Fires whenever a variant is selected (e.g. Product page, Quickbuy, Featured Product etc).
 *
 * How to listen:
 * document.addEventListener('on:variant:change', (event) => {
 *  // your code here
 * });
 *
 * Returned data:
 *  - form: the product form content
 *  - variant: the selected variant object
 *  - allVariants: an array of all variants
 *  - selectedOptions: an array of currently selected options (e.g. ['Blue', 'Large'])
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 2) on:cart:add
 * -------------------------------------------------------------------------------------------------
 * Fires when a variant has been added to the cart, where it didn't exist in the cart before. This
 * event does not fire when the added variant was already in the cart.
 *
 * How to listen:
 * document.addEventListener('on:cart:add', (event) => {
 *   // your code here
 * });
 *
 * Returned data:
 *   - variantId: id of the variant that was just added to the cart
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 3) on:cart:error
 * -------------------------------------------------------------------------------------------------
 * Fires when an action related to the cart has failed, for example adding too much quantity of an
 * item to the cart.
 *
 * How to listen:
 * document.addEventListener('on:cart:error', (event) => {
 *   // your code here
 * });
 *
 * Returned data:
 *   - error: the error message
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 4) on:cart:after-merge
 * -------------------------------------------------------------------------------------------------
 * Fires after a list of cart items has finished being dynamically updated after a cart change.
 *
 * How to listen:
 * document.addEventListener('on:cart:after-merge', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 5) on:cart-drawer:before-open
 * -------------------------------------------------------------------------------------------------
 * Fires before the cart drawer opens.
 *
 * How to listen:
 * document.addEventListener('on:cart-drawer:before-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 6) on:cart-drawer:after-open
 * -------------------------------------------------------------------------------------------------
 * Fires after the cart drawer has finished opening.
 *
 * How to listen:
 * document.addEventListener('on:cart-drawer:after-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 7) on:cart-drawer:after-close
 * -------------------------------------------------------------------------------------------------
 * Fires after the cart drawer has finished closing.
 *
 * How to listen:
 * document.addEventListener('on:cart-drawer:after-close', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 8) on:quickbuy:before-open
 * -------------------------------------------------------------------------------------------------
 * Fires before the quick buy drawer opens.
 *
 * How to listen:
 * document.addEventListener('on:quickbuy:before-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 9) on:quickbuy:after-open
 * -------------------------------------------------------------------------------------------------
 * Fires after the quick buy drawer has finished opening.
 *
 * How to listen:
 * document.addEventListener('on:quickbuy:after-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 10) on:quickbuy:after-close
 * -------------------------------------------------------------------------------------------------
 * Fires after the quick buy drawer has finished closing.
 *
 * How to listen:
 * document.addEventListener('on:quickbuy:after-close', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 11) dispatch:cart-drawer:open
 * -------------------------------------------------------------------------------------------------
 * Opens the cart drawer (if enabled in the Theme Settings).
 *
 * How to trigger:
 * document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:open'));
 *
 * You can optionally pass in a 'detail' object with a property of 'opener', which specifies the DOM
 * element that should be focussed on when the drawer is closed.
 *
 * Example:
 * document.getElementById('header-search').addEventListener('keydown', (evt) => {
 *   if (evt.keyCode === 67) {
 *     evt.preventDefault();
 *     document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:open', {
 *       detail: {
 *         opener: evt.target
 *       }
 *     }));
 *   }
 * });
 *
 * In this example, we attach a keydown listener to the search input in the header. If the user
 * presses the 'c' key, it prevents the default behavior (which would be to type the letter 'c' in
 * the input) and dispatches the 'dispatch:cart-drawer:open' event with a 'detail' object that
 * specifies the search input as the opener. When the cart drawer is closed, focus is returned to
 * the search input.
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 12) dispatch:cart-drawer:refresh
 * -------------------------------------------------------------------------------------------------
 * Refreshes the contents of the cart drawer.
 *
 * This event is useful when you are adding variants to the cart and would like to instruct the
 * theme to re-render the cart drawer.
 *
 * How to trigger:
 * document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:refresh', {
 *   bubbles: true
 * }));
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 13) dispatch:cart-drawer:close
 * -------------------------------------------------------------------------------------------------
 * Closes the cart drawer.
 *
 * How to trigger:
 * document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:close'));
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 14) on:debounced-resize
 * -------------------------------------------------------------------------------------------------
 * Fires when the viewport finishes resizing (debounced to 300ms by default).
 *
 * How to listen:
 * window.addEventListener('on:debounced-resize', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 15) on:breakpoint-change
 * -------------------------------------------------------------------------------------------------
 * Fires when the breakpoint of the viewport changes.
 *
 * Example:
 * window.addEventListener('on:breakpoint-change', (event) => {
 *  if (theme.mediaMatches.md) {
 *   console.log('we are not on mobile');
 *  }
 * });
 *
 *
 *
 * =================================================================================================
 * Web Components
 * =================================================================================================
 *
 * Symmetry utilizes Web Components to the fullest.
 *
 * Web Components are a set of standardized APIs that allow developers to create custom, reusable
 * HTML elements that can be used across different web pages and applications.
 * Web Components consist of three main technologies: Custom Elements, Shadow DOM and HTML
 * Templates.
 *
 * See Mozilla for more: https://developer.mozilla.org/en-US/docs/Web/Web_Components
 *
 *
 *
 =================================================================================================
 * Third-Party JavaScript Dependencies
 * =================================================================================================
 *
 * Symmetry has no third-party JavaScript dependencies.
 *
 *
 * =================================================================================================
 *
 * Have fun! - The Clean Canvas Development Team.
 */


class VariantSpray extends HTMLElement{
    connectedCallback() {
        this.formElement = document.getElementById(this.getAttribute('data-target'));
        this.quantitySelectors = this.querySelectorAll('quantity-wrapper');
        if(this.formElement){
            this.addEventListener('change', this.handleChange.bind(this));
        }
      }

      handleChange(){
        let items = [];

        this.quantitySelectors.forEach((quantitySelector) => {
            let variantId = quantitySelector.dataset.variant;
            let qty = parseInt(quantitySelector.querySelector("input").value);
            if(qty > 0){
                let item = {
                    id: variantId,
                    quantity: qty
                }
                items.push(item);
            }

        });
        let formElements = '';
            items.forEach((item, index) => {
            formElements += `<input type="hidden" name="items[${index}][id]" value="${item.id}">
                            <input type="hidden" name="items[${index}][quantity]" value="${item.quantity}">`;
            });
        let formNode = document.createElement('div');
        formNode.setAttribute('data-multi', true);
        formNode.innerHTML = formElements;
        this.deleteDefinedVariant();
        this.formElement.appendChild(formNode);
      }

      deleteDefinedVariant(){
        let variantInput = this.formElement.querySelector('input[name="id"]');
        if(variantInput){
            variantInput.remove();
        }

        //Div which contains our hidden values
        let valueDiv = this.formElement.querySelector('[data-multi]');
        if(valueDiv){
            valueDiv.remove();
        }

      }
}
window.customElements.define('variant-spray', VariantSpray);

class SizeChart {
  constructor(sizeChart, domElement) {
    this.sizeChart = sizeChart;
    this.domElement = domElement;
  }
  
  initSizeChart() {
    if(!this.sizeChart){
      return;
    }
    let sizchartVals = JSON.parse(this.sizeChart?.getAttribute('data-sizechart-vals'));
    this.euVals = sizchartVals.eur_chart_values;
    this.usVals = sizchartVals.us_chart_values;
    this.ukVals = sizchartVals.uk_chart_values;
    this.cmVals = sizchartVals.cm_chart_values;
    this.standardVals = sizchartVals.standard_size_chart_values;
    this.sizeSelector = this.domElement.querySelector('[data-size]');
    // Hasaan @ Latori : Im checking if all the values of the metaobject are parseable at least for the EU sizes. If thats the case, we can continue
    let allDataParsed = true;
    if (this.sizeSelector) {
      this.USsizes = {};
      this.UKsizes = {};
      this.CMsizes = {};
      this.StandardSizes = {};
      let inputValues = this.sizeSelector.querySelectorAll('input');
      inputValues.forEach((valueItem, index) => {
          if (this.findIndex(this.euVals, valueItem.value) < 0) {
            allDataParsed = false;
          } else {
            if (this.usVals && this.usVals.length > 0) {
              this.USsizes[this.euVals[this.findIndex(this.euVals, valueItem.value)]] = this.usVals[this.findIndex(this.euVals, valueItem.value)];
            }
            if (this.ukVals && this.ukVals.length > 0) {
              this.UKsizes[this.euVals[this.findIndex(this.euVals, valueItem.value)]] = this.ukVals[this.findIndex(this.euVals, valueItem.value)];
            }
            if (this.cmVals && this.cmVals.length > 0) {
              this.CMsizes[this.euVals[this.findIndex(this.euVals, valueItem.value)]] = this.cmVals[this.findIndex(this.euVals, valueItem.value)];
            }
            if (this.standardVals && this.standardVals.length > 0) {
              this.StandardSizes[this.euVals[this.findIndex(this.euVals, valueItem.value)]] = this.standardVals[this.findIndex(this.euVals, valueItem.value)];
            }
          }
      });

      [[this.USsizes, 'us'], [this.UKsizes, 'uk'], [this.CMsizes, 'cm'], [this.StandardSizes, 'standard']].forEach(([sizes, unit]) => {
        for (const [key, value] of Object.entries(sizes)) {
          let id = this.sizeSelector.querySelector(`input[value="${key}"]`).getAttribute('id');
          if (this.sizeSelector.querySelector(`[data-${unit}][for="${id}"]`)) {
            let label = this.sizeSelector.querySelector(`[data-${unit}][for="${id}"]`);
            if (value) {
              label.querySelector('span').innerText = value;
            }
          }
          //this.sizeSelector.querySelector(`[data-us][value="${key}"]`).querySelector('span').innerText = value;
        }
      });
    }
    this.initChartSelector();
  }

  initChartSelector(){
    this.chartContainer = this.domElement.querySelector('[data-tabs="size--charts"]');
    if (this.chartContainer) {
      this.chartTabButtons = this.chartContainer.querySelectorAll('[data-size-label]');
      this.chartTabButtons.forEach((button) => {
        button.addEventListener('click',
          this.handleTabClick.bind(this)
        );
      })
    }
  }

  handleTabClick(evt) {
    this.chartTabButtons.forEach((button) => {
      button.classList.remove('active');
    });
    evt.target.classList.add('active');
    this.sizeSelector.setAttribute('data-size', evt.target.dataset.sizeLabel);
  }

  findIndex(array, value) {
    for (let i = 0; i < array?.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1; // If value is not found
  }
}

class SizeSwatch extends HTMLElement {
    connectedCallback() {
      this.sizeChart = new SizeChart(this.querySelector('[data-sizechart-vals]'), this);
      
      if(this.sizeChart){
        this.sizeChart?.initSizeChart();
      }
    }
}
window.customElements.define('size-swatch', SizeSwatch);


class LocationsGrid extends HTMLElement{
  constructor(){
    super();
  }
  connectedCallback() {
    this.locationsList = JSON.parse(this.dataset.locations);
    this.locationChildren = this.querySelectorAll('.location--image:not(.online-availibility)');
      if (this.locationsList) {
        document.addEventListener("on:variant:change", this.handleVariantChange.bind(this));
        console.log(this.locationsList);
    }
    this.onlineAvailibility = this.querySelector('.online-availibility');
    if(this.onlineAvailibility){
      this.onlineAvailibility.classList.remove('available');
      this.onlineAvailibility.classList.add('unavailable');
      this.instoreOnly = this.onlineAvailibility.classList.contains('instore-only');
    }

    if(this.hasAttribute('data-current')){
      this.initLocation(this.locationsList.locations, parseInt(this.getAttribute('data-current')));
    }
  }

  findLocationById(locations, id) {
    for (const location of locations) {
      const locationId = Object.keys(location)[0];
      if (parseInt(locationId) === id) {
        return location[locationId];
      }
    }
    return null; // Return null if location with given ID is not found
  }

  initLocation(locations, id){
      let variantId = id;
        this.hideAllStores()
          let currentLocation = this.findLocationById(this.locationsList.locations, variantId);
            this.hideAllStores();
            if(this.onlineAvailibility){
              this.onlineAvailibility.classList.remove('available');
              this.onlineAvailibility.classList.add('unavailable');
            }
  
          if(!currentLocation){
            return;
          }
  
          currentLocation.some( 
            (item, index) => { if (item === "Overkill Lager") { currentLocation.splice(index, 1); return true;} }
         );
  
         if(this.onlineAvailibility && (this.instoreOnly === false)){
          this.onlineAvailibility.classList.remove('unavailable');
          this.onlineAvailibility.classList.add('available');
        }
  
         console.log(currentLocation);
  
          this.locationChildren.forEach((image) => {
            if (currentLocation.includes(image.getAttribute('data-location'))){
              image.classList.remove('unavailable');
            }
          })
  }

  handleVariantChange(event) {
    console.log(event);
    const { variant } = event.detail;
    let variantId = variant.id;
      this.hideAllStores()
        let currentLocation = this.findLocationById(this.locationsList.locations, variantId);
        console.log(currentLocation);
          this.hideAllStores();
          if(this.onlineAvailibility){
            this.onlineAvailibility.classList.remove('available');
            this.onlineAvailibility.classList.add('unavailable');
          }

        if(!currentLocation){
          return;
        }

        currentLocation.some( 
          (item, index) => { if (item === "Overkill Lager") { currentLocation.splice(index, 1); return true;} }
       );

       if(this.onlineAvailibility && (this.instoreOnly === false)){
        this.onlineAvailibility.classList.remove('unavailable');
        this.onlineAvailibility.classList.add('available');
      }

       console.log(currentLocation);

        this.locationChildren.forEach((image) => {
          if (currentLocation.includes(image.getAttribute('data-location'))){
            image.classList.remove('unavailable');
          }
        })
  }

  hideAllStores(){
    this.locationChildren.forEach((node) => {
      node.classList.add('unavailable');
    })
  }
}
window.customElements.define('locations-grid', LocationsGrid);


class ReadMore extends HTMLElement{
  constructor(){
    super();
  }

  connectedCallback(){
    this.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e){
    console.log(e,this.closest('disclosure__content'));
    if (this.closest('.disclosure__content')){
    this.closest('.disclosure__content').classList.toggle('expanded');
  }

  if (this.closest('.product-description')){
      this.closest('.product-description').classList.toggle('expanded');
    }
  }
}

window.customElements.define('read-more', ReadMore);


function getStyleDifferences(id1, id2) {

let element1 = document.getElementById(id1);
let element2 = document.getElementById(id2);


const styles1 = window.getComputedStyle(element1);
const styles2 = window.getComputedStyle(element2);

  const differences = {};
  for (let i = 0; i < styles1.length; i++) {
      const property = styles1[i];
      const value1 = styles1.getPropertyValue(property);
      const value2 = styles2.getPropertyValue(property);

      if (value1 !== value2) {
          differences[property] = { element1: value1, element2: value2 };
      }
  }

  for (const [property, values] of Object.entries(differences)) {
    console.log(`Property: ${property}, Element1: ${values.element1}, Element2: ${values.element2}`);
}

  return differences;
}
