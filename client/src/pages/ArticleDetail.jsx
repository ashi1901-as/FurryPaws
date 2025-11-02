import { useParams, Link } from "react-router-dom";
import { articleData } from "../data/ArticleData";

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articleData.find((a) => a.id === parseInt(id));

  if (!article) {
    return (
      <div className="text-center py-20 text-gray-500">
        Article not found or still loading.
        <div>
          <Link to="/educational-articles" className="text-[#82ddd4] underline">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
        loading="lazy"
      />
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-6 whitespace-pre-line">{article.content}</p>
      <Link to="/educational-articles" className="text-[#82ddd4] underline">
        ← Back to Articles
      </Link>
    </div>
  );
};

export default ArticleDetail;
