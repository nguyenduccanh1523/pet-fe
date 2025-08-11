import React, { useState } from "react";
import CardProduct from "../../components/Share/CardProduct";
import { useTranslation } from "react-i18next";
import { PiTagChevronFill } from "react-icons/pi";

const categories = [
  { key: "all", label: "ALL" },
  { key: "cat", label: "CAT" },
  { key: "dog", label: "DOG" },
  { key: "bird", label: "BIRD" },
];

const products = [
  {
    id: 1,
    image: "https://cdn2.tinypic.com/images/2023/08/11/food-1.png",
    name: "Grey hoodie",
    price: 18,
    rating: 5.0,
    isNew: true,
    category: "cat",
  },
  {
    id: 2,
    image: "https://cdn2.tinypic.com/images/2023/08/11/food-2.png",
    name: "Grey hoodie",
    price: 18,
    rating: 5.0,
    isNew: true,
    category: "cat",
  },
  {
    id: 3,
    image: "https://cdn2.tinypic.com/images/2023/08/11/food-3.png",
    name: "Grey hoodie",
    price: 18,
    rating: 5.0,
    isNew: true,
    category: "dog",
  },
  {
    id: 4,
    image: "https://cdn2.tinypic.com/images/2023/08/11/food-4.png",
    name: "Grey hoodie",
    price: 18,
    rating: 5.0,
    isSale: true,
    category: "dog",
  },
  {
    id: 5,
    image: "https://cdn2.tinypic.com/images/2023/08/11/food-5.png",
    name: "Grey hoodie",
    price: 18,
    rating: 5.0,
    isNew: true,
    category: "bird",
  },
  {
    id: 6,
    image: "https://cdn2.tinypic.com/images/2023/08/11/food-6.png",
    name: "Grey hoodie",
    price: 18,
    rating: 5.0,
    isNew: true,
    category: "bird",
  },
  {
    id: 7,
    image: "https://cdn2.tinypic.com/images/2023/08/11/food-7.png",
    name: "Grey hoodie",
    price: 18,
    rating: 5.0,
    isSale: true,
    category: "dog",
  },
  {
    id: 8,
    image: "https://cdn2.tinypic.com/images/2023/08/11/food-8.png",
    name: "Grey hoodie",
    price: 18,
    rating: 5.0,
    isNew: true,
    category: "cat",
  },
];

const Foodies = () => {
  const {t} = useTranslation();
  const [activeCat, setActiveCat] = useState("all");
  const filtered =
    activeCat === "all"
      ? products
      : products.filter((p) => p.category === activeCat);
  return (
    <section className="mt-5 py-10 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2 font-[cursive]">
              {t("Pet Foodies")}
            </h2>
            <div className="flex gap-6 mt-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`text-base font-semibold pb-1 border-b-2 transition-all duration-150 ${
                    activeCat === cat.key
                      ? "text-orange-500 border-orange-400"
                      : "text-gray-400 border-transparent hover:text-orange-400"
                  }`}
                  onClick={() => setActiveCat(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg self-end md:self-auto flex gap-2">
            {t("Shop Now")} <PiTagChevronFill />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <CardProduct
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              rating={product.rating}
              isNew={product.isNew}
              isSale={product.isSale}
              onAddToCart={() => {}}
              onFavorite={() => {}}
              currency="$"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Foodies;
