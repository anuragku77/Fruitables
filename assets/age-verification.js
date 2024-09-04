document.addEventListener('DOMContentLoaded', function() {
  const cookieName = 'paris:ageverification';
  const classes = {
    bodyClass: 'modal-popup-open',
    activeClass: 'active',
    closingClass: 'closing',
    hiddenClass: 'hidden'
  };

  const popup = document.querySelector('.age-verification-popup');
  const declineContent = document.querySelector('[data-decline-container]');

  function getCookie(name) {
    const match = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    return match ? match[2] : null;
  }

  function setCookie(name, expiry) {
    document.cookie = `${name}=true; max-age=${(expiry * 24 * 60 * 60)}; path=/`;
  }

  function removeCookie(name) {
    document.cookie = `${name}=; max-age=0`;
  }

  function openPopup() {
    document.body.classList.remove(classes.bodyClass);
    popup.classList.add(classes.activeClass);
    if (popup.dataset.ageverification === 'true') {
      document.body.classList.add(classes.bodyClass);
    }
  }

  function closePopup() {
    popup.classList.add(classes.closingClass);
    setTimeout(() => {
      popup.classList.remove(classes.activeClass);
      popup.classList.remove(classes.closingClass);
      if (popup.dataset.ageverification === 'true') {
        document.body.classList.remove(classes.bodyClass);
      }
    }, 500);
    setCookie(cookieName, popup.dataset.expiry);
  }

  function decline() {
    popup.querySelector(".age-verification-popup-wrapper").classList.add(classes.hiddenClass);
    declineContent.classList.remove(classes.hiddenClass);
  }

  function backToOriginal() {
    declineContent.classList.add(classes.hiddenClass);
    popup.querySelector(".age-verification-popup-wrapper").classList.remove(classes.hiddenClass);
  }

  if (!getCookie(cookieName)) {
    openPopup();
  }

  const approveButton = document.querySelector('[data-approve-age-button]');
  if (approveButton) approveButton.addEventListener('click', closePopup);

  const declineButton = document.querySelector('[data-decline-age-button]');
  if (declineButton) declineButton.addEventListener('click', decline);

  const backButton = document.querySelector('[data-age-back-button]');
  if (backButton) backButton.addEventListener('click', backToOriginal);
});
