import {
  validOptions, validData, insertBanner, defaultOptions,
} from '../../src/emergency-banner/js/emergency-banner';

import data from '../../__mocks__/emergency-banner/data.json';
import output from '../../__mocks__/emergency-banner/output';

describe('validOptions()', () => {
  describe('returns true', () => {
    it('if using the default options', () => {
      document.body.innerHTML = '<html><body><header class="nhsuk-emergency-banner-render"></header><body><html>';
      expect(validOptions(defaultOptions)).toBe(true);
    });

    it('if setting the selector option to an existing element', () => {
      document.body.innerHTML = '<html><body><header></header><body><html>';
      expect(validOptions({
        ...defaultOptions,
        selector: 'header',
      })).toBe(true);
    });

    it('if setting a custom url option', () => {
      document.body.innerHTML = '<html><body><header class="nhsuk-emergency-banner-render"></header><body><html>';
      expect(validOptions({
        ...defaultOptions,
        url: 'https://random.url',
      })).toBe(true);
    });
  });

  describe('returns false', () => {
    it('if using no options', () => {
      document.body.innerHTML = '<html><body><header class="nhsuk-banner-render"></header><body><html>';
      expect(validOptions()).toBe(false);
    });

    it('if setting the selector option to something that does not exist', () => {
      document.body.innerHTML = '<html><body><header></header><body><html>';
      expect(validOptions({
        ...defaultOptions,
        selector: '.fake-class',
      })).toBe(false);
    });
  });
});

describe('validData()', () => {
  describe('returns true if heading and text properties are present in the object', () => {
    expect(validData({
      headline: 'Test heading',
      text: 'Test text',
    })).toBe(true);
  });

  describe('returns false', () => {
    it('if no data is passed', () => {
      expect(validData()).toBe(false);
    });

    it('if no headline is in the data passed', () => {
      expect(validData({
        text: 'Test text',
      })).toBe(false);
    });

    it('if no text is in the data passed', () => {
      expect(validData({
        headline: 'Test heading',
      })).toBe(false);
    });
  });
});

describe('insertBanner()', () => {
  it('does not insert the coronavirus banner when passed no banner data', () => {
    document.body.innerHTML = '<html><body><header class="nhsuk-banner-render"></header><body><html>';
    insertBanner();
    const banner = document.getElementById('nhsuk-global-alert');
    expect(banner).toBe(null);
  });

  it('does not insert the coronavirus banner when passed no banner data headline', () => {
    document.body.innerHTML = '<html><body><header class="nhsuk-banner-render"></header><body><html>';
    insertBanner({ headline: 'Mock headline' });
    const banner = document.getElementById('nhsuk-global-alert');
    expect(banner).toBe(null);
  });

  it('does not insert the coronavirus banner when passed no banner data text', () => {
    document.body.innerHTML = '<html><body><header class="nhsuk-emergency-banner-render"></header><body><html>';
    insertBanner({ text: 'Mock text' });
    const banner = document.getElementById('nhsuk-global-alert');
    expect(banner).toBe(null);
  });

  it('inserts the coronavirus banner when passed banner data and no options', () => {
    document.body.innerHTML = '<html><body><header class="nhsuk-emergency-banner-render"></header><body><html>';
    insertBanner(data, defaultOptions);
    const banner = document.getElementById('nhsuk-global-alert');
    expect(banner.outerHTML).toBe(output);
  });

  it('inserts the coronavirus banner when passed banner data a valid optional selector', () => {
    document.body.innerHTML = '<html><body><header class="nhsuk-banner-render-test-class"></header><body><html>';
    insertBanner(data, {
      selector: '.nhsuk-banner-render-test-class',
    });
    const banner = document.getElementById('nhsuk-global-alert');
    expect(banner.outerHTML).toBe(output);
  });

  it('does not insert the coronavirus banner when passed banner data an invalid optional selector', () => {
    document.body.innerHTML = '<html><body><header class="nhsuk-emergency-banner-render"></header><body><html>';
    insertBanner(data, {
      selector: '.nhsuk-banner-render-fake-class',
    });
    const banner = document.getElementById('nhsuk-global-alert');
    expect(banner).toBe(null);
  });
});
