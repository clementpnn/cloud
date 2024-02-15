import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/services/utils/firebaseConfig";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export default function CustomerHomepage() {
  const [articles, setArticles] = useState([
    {
      name: "",
      uid: "",
      description: "",
      image: "",
      price: "",
    },
  ]);

  useEffect(() => {
    const fetchArticles = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "articles"));
      const articlesArray = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as {
        name: string;
        uid: string;
        description: string;
        image: string;
        price: string;
      }[];
      setArticles(articlesArray);
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {articles.map((article, index) => (
            <Link
              key={index}
              to="/customer/$id"
              params={{ id: article.uid }}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                <img
                  src={article.image}
                  alt={article.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                <h3>{article.name}</h3>
                <p>{article.price}€</p>
              </div>
              <p className="mt-1 text-sm italic text-gray-500">
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
