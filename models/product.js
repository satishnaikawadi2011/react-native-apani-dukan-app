class Product {
	constructor(id, ownerId, imageUrl, title, description, price) {
		(this.id = id),
			(this.ownerId = ownerId),
			(this.imageUrl = imageUrl),
			(this.description = description),
			(this.price = price),
			(this.title = title);
	}
}

export default Product;
