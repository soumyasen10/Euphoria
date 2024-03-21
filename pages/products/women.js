import ProductItem from "@/components/ProductItem";
import { getAllProducts } from "@/prisma/products";

const WomenProductsPage = ({ products, isAddedInHomepage }) => {
  const marginClass = `${isAddedInHomepage ? "mt-20" : "mt-40"}`;
  return (
    <div className={`${marginClass} overflow-x-hidden`}>
      <div className="wrapper mb-20 flex flex-col gap-10">
        <h2 className="section-title">Browse all womens wear</h2>

        <div className="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WomenProductsPage;

export const getServerSideProps = async () => {
  const products = await getAllProducts();

  const filteredProducts = products.filter(
    (product) => product.category === "Women"
  );

  const updatedProducts = filteredProducts.map((product) => ({
    ...product,
    updatedAt: product.updatedAt.toString(),
    createdAt: product.createdAt.toString(),
  }));

  return {
    props: {
      products: updatedProducts,
    },
  };
};
