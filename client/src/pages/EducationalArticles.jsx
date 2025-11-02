import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { articleData } from "../data/ArticleData";

const EducationalArticles = () => {
  const [articles] = useState(articleData);

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading articles...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">🐾 Pet Care & Wellness Blogs</h1>
      <p className="text-gray-600 mb-8">
        Explore guides, tips, and resources for pet parents – from getting started to advanced care.
      </p>

      {/* Articles Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default EducationalArticles;
