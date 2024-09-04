document.addEventListener('DOMContentLoaded', function() {
  const cookieName = 'paris:ageverification';
  const classes = {
    bodyClass: 'modal-popup-open',
    activeClass: 'active',
    closingClass: 'closing',
    hiddenClass: 'hidden',
    blurredClass: 'blurred' // Add this line
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

  function openPopup() {
    if (!getCookie(cookieName)) {
      document.body.classList.add(classes.bodyClass);
      document.body.classList.add(classes.blurredClass); // Add this line
      popup.classList.add(classes.activeClass);
    }
  }

  function closePopup() {
    popup.classList.add(classes.closingClass);
    setTimeout(() => {
      popup.classList.remove(classes.activeClass);
      popup.classList.remove(classes.closingClass);
      document.body.classList.remove(classes.bodyClass);
      document.body.classList.remove(classes.blurredClass); // Add this line
    }, 500);
    setCookie(cookieName, popup.dataset.expiry);
  }

  function decline() {
    popup.querySelector('.age-verification-popup-wrapper').classList.add(classes.hiddenClass);
    declineContent.classList.remove(classes.hiddenClass);
  }

  function backToOriginal() {
    declineContent.classList.add(classes.hiddenClass);
    popup.querySelector('.age-verification-popup-wrapper').classList.remove(classes.hiddenClass);
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
