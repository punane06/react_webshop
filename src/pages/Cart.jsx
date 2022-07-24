import { Button } from "react-bootstrap";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../css/Cart.module.css";
import { toast, ToastContainer } from "react-toastify";

function Cart() {
  const test = JSON.parse(sessionStorage.getItem("cart"));
  console.log(test);
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(sessionStorage.getItem("cart")) || []
  );
  const [parcelMachines, setParcelMachines] = useState([]);
  const [selectedPM, setSelectedPM] = useState(
    sessionStorage.getItem("parcelMachine")
  );
  const parcelMachineRef = useRef();

  const decreaseFromCart = (productIndex) => {
    const productClicked = cartProducts[productIndex];
    if (productClicked.produt.id === "10011222") {
      return;
    }
    productClicked[productIndex].quantity--;
    if (productClicked[productIndex].quantity === 0) {
      removeFromCart(productIndex);
    } else {
      setCartProducts(cartProducts.slice());
      sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    }
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  };
  const increaseFromCart = (productIndex) => {
    const productClicked = cartProducts[productIndex];
    if (productClicked.produt.id === "10011222") {
      return;
    }
    cartProducts[productIndex].quantity++;
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  };
  const removeFromCart = (productIndex) => {
    const productClicked = cartProducts[productIndex];
    if (productClicked.produt.id === "10011222") {
      return;
    }
    cartProducts.splice(productIndex, 1);
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  };
  const removeAllItems = () => {
    setCartProducts([]);
    sessionStorage.setItem("cart", JSON.stringify([]));
    toast.success("Edukalt kõik ostukorvist kustutatud!", {
      theme: "colored",
    });
  };
  const calcTotalPayment = () => {
    let shoppingCart = 0;
    cartProducts.forEach((e) => {
      shoppingCart = shoppingCart + Number(e.product.price);
    });
    return shoppingCart;
  };
  console.log({ calcTotalPayment });
  const toPay = () => {
    const paymentData = {
      api_username: "92ddcfab96e34a5f",
      account_name: "EUR3D1",
      amount: calcTotalPayment(),
      order_reference: Math.floor(Math.random() * 899999 + 100000),
      nonce:
        "b9b7f7e7154a01b" +
        Math.floor(Math.random() * 899999 + 100000) +
        new Date(),
      timestamp: new Date(),
      customer_url: "https://react-06-22.web.app",
    };
    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
      method: "POST",
      body: JSON.stringify(paymentData),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
      },
    })
      .then((tagastus) => tagastus.json())
      .then((sisu) => (window.location.href = sisu.payment_link));
  };

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then((res) => res.json())
      .then((data) => setParcelMachines(data));
  }, []);

  const selectParcelMachine = () => {
    setSelectedPM(parcelMachineRef.current.value);
    sessionStorage.setItem("parcelMachine", parcelMachineRef.current.value);
    const newParcelMachine = {
      product: {
        id: 10011222,
        name: "Pakiautomaadi tasu",
        price: 3.5,
        imgSrc: require("../assets/locker.png"),
      },
      quantity: 1,
    };
    cartProducts.push(newParcelMachine);
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  };

  const deletedSelectedPM = () => {
    setSelectedPM(null);
    sessionStorage.removeItem("parcelMachine");
    cartProducts.pop();
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  };

  return (
    <div className={styles.cart}>
      <ToastContainer toastStyle={{ backgroundColor: "#34d186" }} />
      <Button
        className={styles.ferrariButton}
        variant="danger"
        onClick={() => removeAllItems(cartProducts)}
      >
        Tühjenda ostukorv
      </Button>
      <br />
      {cartProducts.map((e, index) => (
        <div className={styles.cartProduct}>
          <img className={styles.productImg} src={e.product.imgSrc} alt="" />
          <div className={styles.productName}>{e.product.name}</div>
          <div className={styles.productPrice}>
            {Number(e.product.price).toFixed(2)} €
          </div>
          <div className={styles.quantityControls}>
            <img
              className={
                styles.productButton +
                "" +
                (e.product.id === 10011222 ? styles.disabled : undefined)
              }
              src={require("../assets/minus.png")}
              alt="minus"
              disabled={e.product.id === 10011222}
              onClick={() => decreaseFromCart(index)}
            ></img>
            <div>{e.quantity} tk</div>
            <img
              className={
                styles.productButton +
                " " +
                (e.product.id === 10011222 ? styles.disabled : undefined)
              }
              src={require("../assets/plus.png")}
              alt="plus"
              disabled={e.product.id === 10011222}
              onClick={() => increaseFromCart(index)}
            ></img>
          </div>
          <div className={styles.totalSum}>
            {(e.product.price * e.quantity).toFixed(2)} €
          </div>
          <img
            className={
              styles.productButton +
              " " +
              (e.product.id === 10011222 ? styles.disabled : undefined)
            }
            src={require("../assets/delete.png")}
            alt="delete"
            disabled={e.product.id === 10011222}
            onClick={() => removeFromCart(index)}
          ></img>
        </div>
      ))}
      {selectedPM === null && cartProducts.length > 0 && (
        <select ref={parcelMachineRef} onChange={selectParcelMachine}>
          {parcelMachines
            .filter((e) => e.A0_NAME === "EE")
            .map((e) => (
              <option>{e.NAME}</option>
            ))}
        </select>
      )}
      {selectedPM !== null && (
        <span>
          Valitud pakiautomaat: {selectedPM}{" "}
          <button onClick={deletedSelectedPM}>x</button>
        </span>
      )}
      <div>{calcTotalPayment()}€</div>
      <button onClick={() => toPay()}>Maksma</button>
      {cartProducts.length === 0 && (
        <img
          src="https://www.valeorx.com/static/media/empty-cart.60e68bfd.png"
          alt=""
        />
      )}
    </div>
  );
}

export default Cart;
