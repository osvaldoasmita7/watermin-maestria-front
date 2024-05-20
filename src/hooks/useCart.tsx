import { useState } from "react";
import { ICart, productsAttributes } from "../interfaces";

export const useCart = () => {
  const [cart, setCart] = useState<ICart[]>([]);
  const addCart = (item: productsAttributes) => {
    let index = cart.findIndex(
      (element: ICart) => element.idProduct == item.idProduct
    );
    let newCart = cart;
    if (index === -1) {
      if (item.idProduct && item.name && item.price)
        newCart.push({
          idProduct: item.idProduct,
          name: item.name,
          quantity: 1,
          price: item.price || 0,
          total: item.price * 1,
        });
    } else {
      newCart[index] = {
        ...newCart[index],
        quantity: newCart[index].quantity + 1,
        total: (newCart[index].quantity + 1) * newCart[index].price,
      };
    }

    setCart([...newCart]);
  };
  const restCart = (index: number) => {
    cart[index].quantity = cart[index].quantity - 1;
    cart[index].total = (cart[index].quantity - 1) * cart[index].price;
    if (cart[index].quantity <= 0) cart.splice(index, 1);

    setCart([...cart]);
  };
  const sumTotal = () => {
    let total = 0;
    for (const item of cart) {
      total = total + item.quantity * item.price;
    }
    return total;
  };
  const resetCart = () => {
    setCart([]);
  };
  return { addCart, restCart, sumTotal, cart, resetCart };
};
