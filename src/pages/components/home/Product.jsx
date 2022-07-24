import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function Product(props) {
  const { t } = useTranslation();

  const addToCart = (productClicked) => {
    const cartProducts = JSON.parse(sessionStorage.getItem("cart")) || [];
    const index = cartProducts.findIndex(
      (e) => e.product.id === productClicked.id
    );
    if (index >= 0) {
      // Koik need kolm varianti tapselt identsed
      //   cartProducts[index].quantity = cartProducts[index].quantity + 1;
      //   cartProducts[index].quantity ++;
      cartProducts[index].quantity += 1;
    } else {
      const index = cartProducts.findIndex(
        (element) => element.product.id === 11122333
      );
      if (index >= 0) {
        cartProducts.splice(cartProducts.length - 1, 0, {
          product: productClicked,
          quantity: 1,
        });
      } else {
        cartProducts.push({ product: productClicked, quantity: 1 });
      }
    }
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    toast.success(t("home.cart-added"), {
      position: "bottom-right",
      theme: "dark",
    });
  };

  return (
    <div key={props.e.id + props.index}>
      <Link to={`toode/${props.e.id}`}>
        <img src={props.e.imgSrc} alt="" />
        <div>{props.e.imgSrc}</div>
        <div>{props.e.name}</div>
        <div>{props.e.price}</div>
        <div>{props.e.id}</div>
        <button onClick={() => addToCart(props.e)}>
          {t("home.add-cart-button")}
        </button>
      </Link>
    </div>
  );
}

export default Product;
