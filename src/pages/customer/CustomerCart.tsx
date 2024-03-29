import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import app from "@/services/utils/firebaseConfig";
import NavbarCustomer from "@/components/navbar/NavbarCustomer";
import { jwtDecode } from "jwt-decode";

type UserToken = {
  user_id: string;
};

type Article = {
  name: string;
  description: string;
  image: string;
  price: string;
};

export default function CustomerCart() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const decoded: UserToken = jwtDecode(
      localStorage.getItem("token") as string
    );

    const fetchArticles = async () => {
      const db = getFirestore(app);
      const q = query(
        collection(db, "cart"),
        where("userID", "==", decoded.user_id)
      );
      const querySnapshot = await getDocs(q);
      const fetchedArticles: Article[] = [];

      for (const docs of querySnapshot.docs) {
        const articleRef = docs.data().itemID;
        const ref = query(
          collection(db, "articles"),
          where("uid", "==", articleRef)
        );
        const docSnap = await getDocs(ref);
        for (const doc of docSnap.docs) {
          fetchedArticles.push(doc.data() as Article);
        }
      }

      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-[3.75rem]">
        <NavbarCustomer />
        <div className="flex flex-col gap-y-10 px-20">
          <p className="text-3xl font-bold">Cart</p>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 px-20 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {articles.map((article, index) => (
            <div key={index} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
