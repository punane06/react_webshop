import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Pagination from "react-bootstrap/Pagination";
import SortButtons from "./components/SortButtons";
import Product from "./components/home/Product";
import FilterBar from "./components/home/FilterBar";
import CarouselGallery from "./components/home/CarouselGallery";
import Spinner from "./components/home/Spinner";

// ffc
function Home() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const [selectedCatergory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const productDb =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  //   uef
  useEffect(() => {
    // setLoading(true);
    fetch(productDb)
      .then((res) => res.json())
      .then((body) => {
        updateData(body);
        setLoading(false);
      });
  }, []);

  const updateData = (firebaseProduct) => {
    const productArray = [];
    let categoryArray = [];
    const pagesArray = [];
    let i = 0;
    for (const key in firebaseProduct) {
      const product = firebaseProduct[key];
      if (product.isActive) {
        productArray.push(product);
        categoryArray.push(product.category);
        if (i % 10 === 0) {
          // 0 ---> 1
          // 10 ---> 2
          // 20 ---> 3
          // 30 ---> 4
          pagesArray.push(i / 10 + 1);
        }
        i++;
      }
    }
    categoryArray = [...new Set(categoryArray)];
    setCategories(categoryArray);
    setProducts(productArray.slice(0, 10));
    setFilteredProducts(productArray);
    setOriginalProducts(productArray);
    // for (let number = 1; number <= 5; number++) {
    //   pagesArray.push(number);
    // }
    setPages(pagesArray);
  };

  // const sortAZ = () => {
  //   products.sort((a, b) => a.name.localeCompare(b.name));
  //   setProducts(products.slice());
  // };
  // const sortZA = () => {
  //   products.sort((a, b) => b.name.localeCompare(a.name));
  //   setProducts(products.slice());
  // };
  // const sortPriceAsc = () => {
  //   products.sort((a, b) => a.price - b.price);
  //   setProducts(products.slice());
  // };
  // const sortPriceDesc = () => {
  //   products.sort((a, b) => b.price - a.price);
  //   setProducts(products.slice());
  // };

  // props
  // <ChildClass VOTI1={muutuja} VOTI2={muutuja} /> - muutuja v]i funktsioon

  const changePage = (number) => {
    setActivePage(number);
    //1 0,10
    //2 10, 20
    //3 20, 30 number*10-10, number*10
    // setProducts(originalProducts.slice(number * 10 - 10, number * 10));

    if (selectedCatergory === "all") {
      setProducts(originalProducts.slice(number * 10 - 10, number * 10));
    } else {
      const newProducts = originalProducts.filter(
        (e) => e.category === selectedCatergory
      );
      setProducts(newProducts.slice(number * 10 - 10, number * 10));
    }
    setActivePage(1);
  };

  return (
    <div>
      <CarouselGallery />
      {isLoading && <Spinner />}
      <div>Kokku {filteredProducts.length} toodet</div>
      {categories.length > 1 && (
        <FilterBar
          originalProducts={originalProducts}
          categories={categories}
          selectedCatergory={selectedCatergory}
          setActivePage={setActivePage}
          setPages={setPages}
          setFilteredProducts={setFilteredProducts}
          setProducts={setProducts}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <SortButtons products={products} updateProducts={setProducts} />
      {products.map((e, index) => (
        <Product e={e} index={index} />
      ))}
      {pages.leng > 1 && (
        <Pagination>
          {pages.map((number) => (
            <Pagination.Item
              onClick={() => changePage(number)}
              key={number}
              active={number === activePage}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;
