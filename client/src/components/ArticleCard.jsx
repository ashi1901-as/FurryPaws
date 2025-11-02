import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const detailPath = `/articles/${article.id}`;

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{article.title}</h2>
        <p className="text-gray-600 text-sm mt-2">{article.excerpt}</p>
        <Link to={detailPath} className="text-blue-600 mt-3 font-medium inline-block">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
