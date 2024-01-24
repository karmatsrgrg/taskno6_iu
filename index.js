//<index.js></index.js>let add some functionality to the remove button
var removeCartItemButtons = document.getElementsByClassName("btn btn-danger");
for (var i = 0; i < removeCartItemButtons.length; i++) {
  var button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
}
var quantityInputs = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i];
  input.addEventListener("change", quantityChanged); //event as changeable
}
//let make item addable the cart
var addToCartButton = document.getElementsByClassName("shop-item-button");
for (var i = 0; i < addToCartButton.length; i++) {
  var button = addToCartButton[i];
  button.addEventListener("click", addToCartClicked);
}
//dealing with purchase button
document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);
function purchaseClicked() {
  alert("Thank you for your purchase!"); //alerting deleting all item from cart
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    //removes item until there is no item in cartItems
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}
function removeCartItem(event) {
  //removing the whole content of parent class
  var buttonClicked = event.target.parentElement.parentElement.remove();
  updateCartTotal();
}
function quantityChanged(event) {
  var input = event.target;
  //if the input is deleted or less than 0
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement; //i.e <div class="shop-item">
  //get the title,the price and the image of Component to the Cart
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var image = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, image);
  updateCartTotal();
}
//lets add a row in cart with all above addToCart items
function addItemToCart(title, price, image) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row"); //adding the class cart row
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  //check to see if same item is added twice
  for (i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already in the cart. You can increase the quantity.");
      return; //exits the function immediately like break;
    }
  }
  /*copying the html content using ``& this html can be deleted from html as it should only
  be displayed after adding item to cart and not in the begining*/
  var cartRowContents = ` 
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${image}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div >
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type ="button">Remove</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  //this removes the newly added items from cart
  cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
  //
  cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
}
//lets update the total of the cart
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  //taking only the first item of the array
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0; //intailizing total
  //loop through the cartRows
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    //lets get the price and qauntity for the row of this cart
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    //[0] because we want the first one from the two
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", "")); //only num allowed
    var quantity = quantityElement.value; //value because input dont have text but has value
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
/*</index.js>*/
