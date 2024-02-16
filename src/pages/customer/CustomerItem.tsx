import NavbarCustomer from "@/components/navbar/NavbarCustomer";
import app from "@/services/utils/firebaseConfig";
import { Link, useParams } from "@tanstack/react-router";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function CustomerItem() {
  const { id } = useParams({ from: "/seller/$id" });
  const [article, setArticle] = useState({
    name: "",
    uid: "",
    description: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const docRef = doc(db, "articles", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const articleData = docSnap.data();
        setArticle({
          uid: docSnap.id,
          name: articleData.name,
          description: articleData.description,
          image: articleData.image,
          price: articleData.price,
        });
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarCustomer />
      <div>
        <main className="mx-auto px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            <div className="lg:col-span-4 lg:row-end-1">
              <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                <img src={article.image} alt={`image of ${article.name}`} className="object-cover object-center" />
              </div>
            </div>
            <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <div className="flex flex-col-reverse">
                <div className="flex flex-col gap-y-4">
                  <h1 className="text-2xl font-bold tracking-tight capitalize text-gray-900 sm:text-3xl">{article.name}</h1>
                  <p className="text-sm text-gray-500">
                    {article.description}
                  </p>
                  <p className="text-gray-500">{article.price} $</p>
                </div>
              </div>
              
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <Link to="/customer/$id" params={{ id: article.uid }}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Add to cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
