import { useEffect, useRef, useState } from "react";
import FileUpload from "../components/FileUpload";

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imgSrcRef = useRef();
  const isActiveRef = useRef();
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const categoriesDbUrl =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  // Kui lisate andmebaasi, siis l'heb home.jsx.s v]tmine kantki, sest kuju [{},{}] ---> {-asda: {}, -eqw{}}
  const [products, setProducts] = useState([]);
  const productDbUrl =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  const [productImg, setProductImg] = useState("");

  const imgUrlRef = useRef();
  const imgFileRef = useRef();
  const [showUrlUpload, setShowUrlUpload] = useState(false);

  useEffect(() => {
    fetch(categoriesDbUrl)
      .then((res) => res.json())
      .then((data) => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setCategories(newArray);
      });
    fetch(productDbUrl)
      .then((res) => res.json())
      .then((data) => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setProducts(newArray);
      });
    // const categoriesFromDb = fetchFromDb(categoriesDbUrl);
    // setProducts(categoriesFromDb);
    // const productsFromDb = fetchFromDb(productDbUrl);
    // setProducts(productsFromDb);
  }, []);

  // const fetchFromDb = (url) => {
  //   let itemsFromDb = [];
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const newArray = [];
  //       for (const key in data) {
  //         newArray.push(data[key]);
  //       }
  //       itemsFromDb = newArray;
  //     });
  //   return itemsFromDb;
  // };

  const addNewProduct = () => {
    // console.log("Funktsioon works");
    // console.log("Ref value " + nameRef.current.value);
    if (nameRef.current.value === "") {
      setMessage("No selected product");
    } else {
      setMessage("Successfully added " + nameRef.current.value);
      const newProduct = {
        id: Number(idRef.current.value),
        name: nameRef.current.value,
        price: Number(priceRef.current.value),
        active: isActiveRef.current.checked,
        category: categoryRef.current.value,
        description: descriptionRef.current.value,
        imgSrc: productImg,
      };
      fetch(productDbUrl, {
        method: "POST",
        body: JSON.stringify(newProduct),
        header: {
          "Content-Type": "application/json",
        },
      }).then(() => emptyForm());
    }
  };
  const emptyForm = () => {
    idRef.current.value = "";
    nameRef.current.value = "";
    priceRef.current.value = "";
    isActiveRef.current.checked = false;
    categoryRef.current.value = "";
    descriptionRef.current.value = "";
    imgSrcRef.current.value = "";
  };

  // kui toode ei ole unukaanle:
  //  - anna sonum "ID on  mitteunikaalne!"
  // - pane nupule peale "disabled" - nuppu ei saa klikkida

  // kui toote ID in unikaalne
  // - kustuta s]num - ''
  // -vota nupult "disable" maha

  const chcekIdUniquess = () => {
    if (idRef.current.value.length === 8) {
      // const index = products.findIndex((e) => {
      //   // console.log(typeof e.id);
      //   // console.log(typeof idRef.current.value);
      //   return Number(e.id) === Number(idRef.current.value);
      // }); - sama mis alumine, siis kui mitu rida vaja panna, siis vaja loogeliste sulgudega
      const index = products.findIndex(
        (e) => Number(e.id) === Number(idRef.current.value)
      );
      if (index >= 0) {
        // console.log("ei ole unikaalne");
        setMessage("ID on mitteuinikaalne");
        setButtonDisabled(true);
      } else if (idRef.current.value === "10011222") {
        setMessage("Added parcel machine ID");
        setButtonDisabled(false);
      } else {
        // console.log("On  unikaalne");
        setMessage("");
        setButtonDisabled(false);
      }
    } else {
      setMessage("");
      setButtonDisabled(true);
    }
  };

  const radioChecked = () => {
    if (imgUrlRef.current.checked) {
      setShowUrlUpload(true);
    } else {
      console.log("tootab");
      setShowUrlUpload(false);
    }
  };

  return (
    <div>
      <br />
      <label>Product ID</label>
      <br />
      <input ref={idRef} onChange={() => chcekIdUniquess()} type="number" />
      <br />
      <label>Product name</label>
      <br />
      <input ref={nameRef} type="text" />
      <br />
      <label>Product price</label>
      <br />
      <input ref={priceRef} type="number" />
      <br />
      <label>Product description</label>
      <br />
      <input ref={descriptionRef} type="text" />
      <br />
      <label>Product category</label>
      <br />
      {/* <input ref={categoryRef} type="text" /> */}
      <select ref={categoryRef} defaultValue="">
        <option value="" disabled>
          Pick category
        </option>
        {categories.map((e) => (
          <option key={e.name}>{e.name}</option>
        ))}
      </select>
      <br />
      <label>Product image</label>
      {productImg === "" && (
        <div>
          {" "}
          <br />
          <label htmlFor="">URL</label>
          <input
            type="radio"
            id="url"
            name="imgSrc"
            ref={imgUrlRef}
            onChange={radioChecked}
          ></input>
          <label htmlFor="">File</label>
          <input
            name="imgSrc"
            type="radio"
            id="file"
            ref={imgFileRef}
            onChange={radioChecked}
            defaultChecked
          ></input>
          {showUrlUpload === true && <input ref={imgSrcRef} type="text" />}
          {productImg === "" && showUrlUpload === false && (
            <FileUpload onSendPictureUrl={setProductImg} />
          )}
        </div>
      )}
      {productImg !== "" && (
        <div>
          <i>Pilt Ülesse laetud</i>
        </div>
      )}
      <br />

      <label>Product active</label>
      <br />
      <input ref={isActiveRef} type="checkbox" />
      <br />
      <button
        disabled={buttonDisabled || productImg === ""}
        onClick={addNewProduct}
      >
        Add
      </button>
      <div>{message}</div>
    </div>
  );
}

export default AddProduct;
