const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{article.title}</h2>
        <p className="text-gray-600 text-sm mt-2">{article.excerpt}</p>
        <button className="text-blue-600 mt-3 font-medium">
          Read More →
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
