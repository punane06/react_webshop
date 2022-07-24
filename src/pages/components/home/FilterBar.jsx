function FilterBar(props) {
  const filterProducts = (categoryClicked) => {
    let pagesArray = [];
    if (categoryClicked === "all") {
      pagesArray = updateAfterCategorySelect(props.originalProducts, "all");
    } else {
      const newProducts = props.originalProducts.filter(
        (e) => e.category === categoryClicked
      );
      pagesArray = updateAfterCategorySelect(newProducts, categoryClicked);
    }
    props.setActivePage(1);
    props.setPages(pagesArray);
  };

  const updateAfterCategorySelect = (products, activeCategory) => {
    props.setFilteredProducts(products);
    props.setProducts(products.slice(0, 10));
    props.setSelectedCategory(activeCategory);
    const pages = [];
    for (let number = 0; number < products.length; number++) {
      if (number % 10 === 0) {
        pages.push(number / 10 + 1);
      }
    }
    return pages;
  };
  return (
    <div>
      <div
        className={
          props.selectedCatergory === "all" ? "active-category" : undefined
        }
        onClick={() => filterProducts("all")}
      >
        Kõik kategooriad
      </div>
      {props.categories.map((e) => (
        <div
          className={
            props.selectedCatergory === e ? "active-category" : undefined
          }
          key={e}
          onClick={() => filterProducts(e)}
        >
          {e}
        </div>
      ))}
    </div>
  );
}

export default FilterBar;
