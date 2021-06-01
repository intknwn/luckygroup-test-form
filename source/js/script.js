'use strict';

(function () {
  const PHONE_INPUT_SELECTOR = 'input#phone';
  const COUNTRY_INPUT_SELECTOR = 'select#country';

  const Country = {
    russia: {
      flag: 'img/flag-rus@2x.png',
      mask: '+7 (000) 000-00-00',
      re: /\+7 \((\d{3})\) (\d{3})\-(\d{2})\-(\d{2})/,
    },
    indonesia: {
      flag: 'img/flag-id@2x.png',
      mask: '+62 000 0000 0000',
      re: /\+62 (\d{3}) (\d{4}) (\d{4})/,
    }
  };

  const phoneInput = document.querySelector(PHONE_INPUT_SELECTOR);

  const maskOptions = {
    mask: Country.russia.mask,
    lazy: true,
  };

  const mask = new IMask(phoneInput, maskOptions);

  phoneInput.addEventListener('focus', function () {
    mask.updateOptions({ lazy: false });
  });

  function createBlurHandler(re) {
    return function () {
      mask.updateOptions({ lazy: true });

      if (!mask.value.match(re)) {
        mask.value = '';
      }
    };
  }

  let blurHandler = createBlurHandler(Country.russia.re);

  phoneInput.addEventListener('blur', blurHandler);

  const countryInput = document.querySelector(COUNTRY_INPUT_SELECTOR);

  countryInput.addEventListener('change', function (e) {
    const country = e.target.value.toLowerCase();

    const flagSrc = 'url(' + Country[country].flag + ')';

    countryInput.style.backgroundImage = flagSrc;

    const maskStr = Country[country].mask;

    phoneInput.placeholder = maskStr;
    mask.updateOptions({ mask: maskStr });

    phoneInput.removeEventListener('blur', blurHandler);

    blurHandler = createBlurHandler(Country[country].re);

    phoneInput.addEventListener('blur', blurHandler);
  });

})();