import NavbarCustomer from "@/components/navbar/NavbarCustomer";
import app from "@/services/utils/firebaseConfig";
import { Tab } from "@headlessui/react";
import { useParams } from "@tanstack/react-router";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomerItem() {
  const { id } = useParams({ from: "/customer/$id" });
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
      const querySnapshot = await getDocs(collection(db, "articles", id));
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
  }, [id]);
  return (
    <div>
      <NavbarCustomer />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                <Tab
                  key={articles[0].uid}
                  className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                >
                  {({ selected }) => (
                    <>
                      <span className="sr-only">{articles[0].name}</span>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <img
                          src={articles[0].image as string}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </span>
                      <span
                        className={classNames(
                          selected ? "ring-indigo-500" : "ring-transparent",
                          "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Tab>
              </Tab.List>
            </div>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {articles[0].name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {articles[0].price}€
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: articles[0].description }}
              />
            </div>

            <form className="mt-6">
              <div className="mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
