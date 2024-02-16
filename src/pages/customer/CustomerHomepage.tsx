import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "@/services/utils/firebaseConfig"
import NavbarCustomer from "@/components/navbar/NavbarCustomer";

export default function CustomerHomepage() {
  const [articles, setArticles] = useState([
    {
      name: "",
      uid: "",
      description: "",
      image: "",
      price: "",
    }
  ])
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
  return(
    <>
      <div className="flex flex-col gap-y-[3.75rem]">
        <NavbarCustomer />
        <div className="flex flex-col gap-y-10 px-20">
          <p className="text-3xl font-bold">Articles</p>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 px-20 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
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
    </>
  )
}
