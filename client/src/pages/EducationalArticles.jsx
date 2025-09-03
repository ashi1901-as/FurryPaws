import { useState } from "react";
import ArticleCard from "../components/ArticleCard";

const EducationalArticles = () => {
  const [activeTab, setActiveTab] = useState("gettingStarted");

  const categories = {
    gettingStarted: {
      title: "Getting Started",
      articles: [
        { id: 1, title: "Choosing the Right Pet", excerpt: "Breed, adoption vs. buying explained.", image: "https://d3544la1u8djza.cloudfront.net/APHI/Blog/2024/July-August/take-better-photos-of-pets-hero.jpg" },
        { id: 2, title: "Puppy/Kitten Checklist", excerpt: "Essentials before bringing them home.", image: "https://i.ytimg.com/vi/O6u9XUneWJQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD6YPZozf9o48JZFP9DmsbSPHAxuQ" },
        { id: 3, title: "Pet-Friendly Home Setup", excerpt: "Make your home safe & comfy.", image: "https://housepawsmn.com/wp-content/uploads/2021/03/pet-rampstairs-blog-featured-image-1024x576.png" },
        { id: 4, title: "First Vet Visit Guide", excerpt: "What to expect at your first vet trip.", image: "https://images.ctfassets.net/82d3r48zq721/1FSNHK1W5fkwxiZ66GFae6/79aed0ae7c3c07f5bc246d7351b84d3f/Dog-during-vet-visit_resized.jpg?w=800&q=50" },
        { id: 5, title: "First 30 Days with Your Pet", excerpt: "Tips to bond and settle in.", image: "https://www.petfinder.com/sites/default/files/images/content/Playing_Family_624.jpg" },
      ],
    },
    dailyCare: {
      title: "Daily Care Basics",
      articles: [
        { id: 6, title: "Feeding Schedules", excerpt: "Portion control & meal timing.", image: "/images/blogs/feeding.jpg" },
        { id: 7, title: "Grooming Routines", excerpt: "Brushing, bathing & nail trimming.", image: "/images/blogs/grooming.jpg" },
        { id: 8, title: "Potty Training Hacks", excerpt: "Simple tricks for quicker training.", image: "/images/blogs/potty.jpg" },
        { id: 9, title: "Playtime & Bonding", excerpt: "Fun activities with pets.", image: "/images/blogs/playtime.jpg" },
      ],
    },
    health: {
      title: "Health & Wellness",
      articles: [
        { id: 10, title: "Common Health Issues", excerpt: "Spot common issues early.", image: "/images/blogs/health-issues.jpg" },
        { id: 11, title: "Vaccination Guide", excerpt: "Must-know vaccination schedules.", image: "/images/blogs/vaccine.jpg" },
      ],
    },
    behavior: {
      title: "Behavior & Training",
      articles: [
        { id: 12, title: "Socialization Tips", excerpt: "Introduce pets to people & animals.", image: "/images/blogs/social.jpg" },
        { id: 13, title: "Travel Training", excerpt: "Carriers, crates & leash tips.", image: "/images/blogs/travel.jpg" },
      ],
    },
    special: {
      title: "Special Guides",
      articles: [
        { id: 14, title: "Senior Pet Care", excerpt: "Caring for older furry friends.", image: "/images/blogs/senior.jpg" },

        { id: 15, title: "Nutrition Myths vs Facts", excerpt: "Busting common food myths.", image: "/images/blogs/nutrition.jpg" },
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">🐾 Pet Care & Wellness Blogs</h1>
      <p className="text-gray-600 mb-8">
        Explore guides, tips, and resources for pet parents – from getting started to advanced care.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.keys(categories).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === key
                ? "bg-[#82ddd4] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {categories[key].title}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories[activeTab].articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default EducationalArticles;
