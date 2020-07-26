class CartItem {
	constructor(quantity, productPrice, productTitle, sum) {
		(this.sum = sum),
			(this.quantity = quantity),
			(this.productPrice = productPrice),
			(this.productTitle = productTitle);
	}
}

export default CartItem;
