import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [fiterProducts, setFilterProduts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      const fiterCategory = category.filter((item) => item !== e.target.value);
      setCategory(fiterCategory);
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      const filterSubCatergory = subCategory.filter(
        (item) => item !== e.target.value
      );
      setSubCategory(filterSubCatergory);
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProduts(productsCopy);
  };

  const sortProducts = ()=>{
    let filterProductCopy = fiterProducts.slice();

    switch(sortType){
      case 'low-high':
        const assendingOrder = filterProductCopy.sort((a,b)=>a.price-b.price);
        setFilterProduts(assendingOrder);
        break;
      case 'high-low':
        const desendingOrder = filterProductCopy.sort((a,b)=>b.price-a.price);
        setFilterProduts(desendingOrder)
        break;
      default:
      applyFilter();
      break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search,showSearch, products]);

  useEffect(()=>{
    sortProducts()
  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Men"}
                onChange={toggleCategory}
                id="Men"
              />
              <label htmlFor="Men" className="cursor-pointer">Men</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Women"}
                onChange={toggleCategory}
                id="Women"
              />
              <label className="cursor-pointer" htmlFor="Women">Women</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Kids"}
                onChange={toggleCategory}
                id="Kids"
              />
              <label className="cursor-pointer" htmlFor="Kids">Kids</label>
            </p>
          </div>
        </div>
        {/* Subcategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Topwear"}
                onChange={toggleSubCategory}
                id="Topwear"
              />
              <label className="cursor-pointer" htmlFor="Topwear">Topwear</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
                id="Bottomwear"
              />
              <label className="cursor-pointer" htmlFor="Bottomwear">Bottomwear</label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Winterwear"}
                onChange={toggleSubCategory}
                id="Winterwear"
              />
              <label className="cursor-pointer" htmlFor="Winterwear">Winterwear</label>
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL "} text2={"COLLECTIONS"} />
          {/* Product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {fiterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
