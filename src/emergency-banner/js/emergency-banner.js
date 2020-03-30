import banner from '../html/emergency-banner.html';
import styles from '../scss/emergency-banner.scss';

/**
 * API schema - excluding schema specific properties
 * @typedef {Object} ApiData
 * @property {Object} about
 * @property {string} about.name - Descriptive name of API
 * @property {string} dateModified - Last date modified - ISO 8601 YYYY/MM/DD
 * @property {string} headline - Title to be displayed in H2,
 * @property {string} text - HTML content to be displayed below headline
 */

/**
 * Options
 * @typedef {Object} Options
 * @property {string} selector - CSS selector for banners element parent element
 */
export const defaultOptions = {
  selector: '.nhsuk-emergency-banner-render',
  url: window.location.href,
};

/**
 * Is the processed options object valid
 * @param {Options} options - Merged options passed from initialisation
 * @returns {Boolean}
 */
export const validOptions = (options) => {
  if (!options || !options.url) {
    return false;
  }
  if (!document.querySelector(options.selector)) {
    return false;
  }
  return true;
};

/**
 * Is the apiData object valid
 * @param {ApiData} data - data returned from API
 * @returns {Boolean}
 */
export const validData = (data) => Boolean(data && data.headline && data.text);

/**
 * Insert the banner into DOM.
 * @param {ApiData} apiData - API data returned from XMLHTTPRequest
 * @param {Options} - Merged options passed from initialisation
 * @returns {void}
 */
export const insertBanner = (apiData, options) => {
  if (validData(apiData)) {
    // Build HTML from templates using apiData
    const div = document.createElement('div');
    // Replaces any [key] in the template with content from the banner api
    div.innerHTML = banner.replace(/\[(\w*)\]/g, (_, key) => (apiData[key] || ''));
    // Add CSS styles to div
    div.innerHTML += `<style>${styles}</style>`;
    // Insert emergency banner below header
    const element = document.querySelector(options.selector);
    if (element) element.parentElement.insertBefore(div, element.nextElementSibling);
  }
};

/**
 * Exposed function to initialise the banner
 * @param {Options} - options
 * @returns {void}
 */
window.NHSUKEmergencyBannerInit = (options) => {
  // Merge user options with defaults
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };
  // Stop function before API call if options aren't valid
  if (validOptions(mergedOptions)) {
    // Make request to banner api when page has loaded
    document.addEventListener('DOMContentLoaded', () => {
      const request = new XMLHttpRequest();
      request.open('GET', `https://api.nhs.uk/banner/?url=${mergedOptions.url}`, true);

      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            insertBanner(data, mergedOptions);
          }
        }
      };

      request.send();
    });
  }
};
