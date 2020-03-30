import panel from '../html/coronavirus-panel.html';
import styles from '../scss/coronavirus-panel.scss';

/**
 * Options
 * @typedef {Object} Options
 * @property {string} selector - CSS selector for banners element parent element
 */
export const defaultOptions = {
  selector: '.nhsuk-coronavirus-panel-render',
};

/**
 * Is the processed options object valid
 * @param {Options} options - Merged options passed from initialisation
 * @returns {Boolean}
 */
export const validOptions = (options) => Boolean(document.querySelector(options.selector));

/**
 * Insert the panel into DOM.
 * @param {Options} - Merged options passed from initialisation
 * @returns {void}
 */
export const insertPanel = (options) => {
  const div = document.createElement('div');
  // Replaces any [key] in the template with content from the banner api
  div.innerHTML = panel;
  // Add CSS styles to div
  div.innerHTML += `<style>${styles}</style>`;
  // Insert panel under stated element
  const element = document.querySelector(options.selector);
  if (element) element.parentElement.insertBefore(div, element.nextElementSibling);
};

/**
 * Exposed function to initialise the banner
 * @param {Options} - options
 * @returns {void}
 */
window.NHSUKCoronavirusPanelInit = (options) => {
  // Merge user options with defaults
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };
  if (validOptions(mergedOptions)) {
    insertPanel(mergedOptions);
  }
};
