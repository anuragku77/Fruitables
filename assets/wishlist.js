// Function to fetch wishlist items from local storage
function getWishlistFromLocalStorage() {
  const previousProduct = localStorage.getItem("wishListAdd");
  return JSON.parse(previousProduct) || [];
}

var WishAddedArray = getWishlistFromLocalStorage();

// Function to update the wishlist UI based on the current wishlist state
function updateWishlistUI() {
  document.querySelector(
    ".wishlist_count_number"
  ).textContent = `${WishAddedArray.length}`;
  if (WishAddedArray.length > 0) {
    const wishlist_count_number = document.querySelector(
      ".wishlist_count_number"
    );
    wishlist_count_number.style.setProperty("display", "flex", "important");
  }

  // Iterate through wishlist items and add 'active_wishlist' class to corresponding buttons
  document.querySelectorAll(".wishlist_btn").forEach((btn) => {
    const wishListProductHandle = btn.getAttribute("product-handle-wishlist");
    if (WishAddedArray.includes(wishListProductHandle)) {
      btn.classList.add("active_wishlist");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Update UI based on the retrieved wishlist items
  updateWishlistUI();

  // Add event listeners to wishlist buttons
  document.querySelectorAll(".wishlist_btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const wishListProductHandle = btn.getAttribute("product-handle-wishlist");

      if (WishAddedArray.includes(wishListProductHandle)) {
        return;
      } else {
        WishAddedArray.push(wishListProductHandle);
        btn.classList.add("active_wishlist");
      }

      // Save wishlist to local storage
      localStorage.setItem("wishListAdd", JSON.stringify(WishAddedArray));

      // Update UI after modifying the WishAddedArray
      updateWishlistUI();
    });
  });
});