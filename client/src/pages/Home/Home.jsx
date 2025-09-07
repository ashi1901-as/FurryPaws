import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import Categories from "../../components/header/Categories";
import Banner from "./Banner/Banner";
import ProductSlider from "./ProductsListing/ProductSlider";
import electronics from "../../assets/images/electronics-card.jpg";
import accessoryCard from "../../assets/images/accessory-card.jpg";
import fashionCard from "../../assets/images/fashion-card.jpg";
import applianceCard from "../../assets/images/appliance-card.jpg";
import furnitureCard from "../../assets/images/furniture-card.jpg";
import SeoData from "../../SEO/SeoData";
import { useProductsByCategory } from "../../hooks/useProductsByCategory";

const Home = () => {
  const { products: foodProducts, loading: foodLoading } = useProductsByCategory("Food");
  //const { products: groomingProducts, loading: groomingLoading } = useProductsByCategory(["Supplies","Clothing"]);
  //const { products: toyProducts, loading: toyLoading } = useProductsByCategory("Toys");
  const { products: healthProducts, loading: healthLoading } = useProductsByCategory("Medicines");
  const { products: accessoryProducts, loading: accessoryLoading } = useProductsByCategory("Accessories");

  const { products: toys, loading: tyLoading } = useProductsByCategory("Toys");
  const { products: house, loading: houseLoading } = useProductsByCategory("Housing");
    const toyProducts = [...toys, ...house];
      const toyLoading = tyLoading || houseLoading; 

  const { products: supplies, loading: suppliesLoading } = useProductsByCategory("Supplies");
  const { products: clothing, loading: clothingLoading } = useProductsByCategory("Clothing");
    const groomingProducts = [...supplies, ...clothing];
      const groomingLoading = suppliesLoading || clothingLoading; 

  return (
    <>
      <SeoData title="Pet Care Store – Food, Grooming, Toys & More" />
      <ScrollToTopOnRouteChange />
      <Categories />
      <Banner />

      <main className="flex flex-col items-center gap-8 px-4 py-10 sm:mt-6 bg-[#fffaf7]">
        {/* Food */}
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-[#f2e9e4] p-6">
          <ProductSlider
            title={"🍖 Pet Food & Treats"}
            products={foodProducts}
            logo={electronics}
            loading={foodLoading}
          />
        </section>

        {/* Grooming */}
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-[#f2e9e4] p-6">
          <ProductSlider
            title={"🛁 Grooming & Care"}
            products={groomingProducts}
            logo={accessoryCard}
            loading={groomingLoading}
          />
        </section>

        {/* Toys */}
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-[#f2e9e4] p-6">
          <ProductSlider
            title={"🎾 Toys & Playtime"}
            products={toyProducts}
            logo={fashionCard}
            loading={toyLoading}
          />
        </section>

        {/* Vet Care */}
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-[#f2e9e4] p-6">
          <ProductSlider
            title={"💊 Health & Vet Care"}
            products={healthProducts}
            logo={applianceCard}
            loading={healthLoading}
          />
        </section>

        {/* Accessories */}
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-[#f2e9e4] p-6">
          <ProductSlider
            title={"🦴 Pet Accessories"}
            products={accessoryProducts}
            logo={furnitureCard}
            loading={accessoryLoading}
          />
        </section>
      </main>
    </>
  );
};

export default Home;
