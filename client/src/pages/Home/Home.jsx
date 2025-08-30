import { useAuth } from "../../context/auth";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import Categories from "../../components/header/Categories";
import Banner from "./Banner/Banner";
import DealSlider from "./DealSlider/DealSlider";
import ProductSlider from "./ProductsListing/ProductSlider";
import { electronicProducts } from "../../utils/electronics";
import { accessories } from "../../utils/accessories";
import { fashionProducts } from "../../utils/fashion";
import { applianceProducts } from "../../utils/appliances";
import { furnitureProducts } from "../../utils/furniture";
import electronics from "../../assets/images/electronics-card.jpg";
import accessoryCard from "../../assets/images/accessory-card.jpg";
import fashionCard from "../../assets/images/fashion-card.jpg";
import applianceCard from "../../assets/images/appliance-card.jpg";
import furnitureCard from "../../assets/images/furniture-card.jpg";
import Suggestion from "./Suggestions/Suggestion";
import SeoData from "../../SEO/SeoData";



const Home = () => {
  return (
    <>
      <SeoData title="Pet Care Store – Food, Grooming, Toys & More" />
      <ScrollToTopOnRouteChange />
      <Categories />
      <Banner />

      <main className="flex flex-col items-center gap-8 px-4 py-10 sm:mt-6 bg-[#fffaf7]">

        {/* Deals 
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-[#f2e9e4] p-6">
          <DealSlider title={"🎉 Special Offers for Your Pets"} />
        </section>*/}

        {/* Food */}
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-[#f2e9e4] p-6">
          <ProductSlider
            title={"🍖 Pet Food & Treats"}
            products={electronicProducts}
            logo={electronics}
          />
        </section>

        {/* Grooming */}
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-[#f2e9e4] p-6">
          <ProductSlider
            title={"🛁 Grooming & Care"}
            products={accessories}
            logo={accessoryCard}
          />
        </section>

        {/* Suggestions */}
        <section className="w-full max-w-6xl bg-gradient-to-r from-[#fdf2f2] to-[#fefaf6] rounded-2xl shadow-sm border border-[#f2e9e4] p-8">
          <Suggestion
            title={"✨ Recommended for Your Pet"}
            tagline={"Based on your pet’s needs"}
          />
        </section>

        {/* Toys */}
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-[#f2e9e4] p-6">
          <ProductSlider
            title={"🎾 Toys & Playtime"}
            products={fashionProducts}
            logo={fashionCard}
          />
        </section>

        {/* Vet Care */}
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-[#f2e9e4] p-6">
          <ProductSlider
            title={"💊 Health & Vet Care"}
            products={applianceProducts}
            logo={applianceCard}
          />
        </section>

        {/* Accessories */}
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-[#f2e9e4] p-6">
          <ProductSlider
            title={"🦴 Pet Accessories"}
            products={furnitureProducts}
            logo={furnitureCard}
          />
        </section>
      </main>
    </>
  );
};

export default Home;
