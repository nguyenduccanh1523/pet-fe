import React from "react";
import CardProduct from "../../components/Share/CardProduct";
import { useTranslation } from "react-i18next";
import { PiTagChevronFill } from "react-icons/pi";

// Dữ liệu mẫu
const products = [
  {
    id: 1,
    image: "https://cdn2.tinypic.com/images/2023/08/11/dog-cloth-1.png",
    name: "Cute Dog Pajamas",
    price: 50,
    rating: 5.0,
    isNew: true,
  },
  {
    id: 2,
    image: "https://cdn2.tinypic.com/images/2023/08/11/cat-cloth-1.png",
    name: "Cat Sweater",
    price: 40,
    rating: 4.8,
    isSale: true,
  },
  {
    id: 3,
    image: "https://cdn2.tinypic.com/images/2023/08/11/dog-cloth-2.png",
    name: "Raincoat for Dogs",
    price: 65,
    rating: 4.5,
  },
  {
    id: 4,
    image: "https://cdn2.tinypic.com/images/2023/08/11/cat-cloth-2.png",
    name: "Cat Dress",
    price: 55,
    rating: 5.0,
  },
];

const Clothing = () => {
  const { t } = useTranslation();
  return (
    <section className="py-10 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold dark:text-white text-gray-800 mb-2 font-[cursive]">
              {t("Pet Clothing")}
            </h2>
            <p className="text-gray-500 mb-0 dark:text-gray-400">
              {t("PetCloDes")}
            </p>
          </div>
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg self-end md:self-auto flex gap-2">
            {t("Shop Now")} <PiTagChevronFill />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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

export default Clothing;
