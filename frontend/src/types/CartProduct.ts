// product_id: product.id,
//       color_code: selectedColor,
//       size: selectedSize,
//       qty: amount,

interface CartProduct {
  id: number;
  color_name: string;
  price: number;
  qty: number;
  size: string;
  title: string;
  main_image: string;
}

export default CartProduct;