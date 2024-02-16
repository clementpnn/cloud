import NavbarSeller from "@/components/navbar/NavbarSeller"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import app from '@/services/utils/firebaseConfig'
import { useLaunchConfetti } from "@/hooks/useLunchConfetti";
import { useParams } from "@tanstack/react-router";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { toast } from 'sonner'
import { useNavigate } from "@tanstack/react-router";

type Data = {
  [key: string]: string | number;
};

export default function SellerUpdate() {
  const { id } = useParams({ from:"/seller/update/$id" })
  const navigate = useNavigate({ from:"/seller/update/$id" })
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const db = getFirestore(app)
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const { name, description, price } = formData
    if (imageUpload === null) {
      const data: Data = {
        name,
        description,
        price
      };
      const formattedData: Data = {};
      for (const key in data) {
        if (data[key] !== "") {
          formattedData[key] = data[key];
        }
      }
      if (Object.keys(formattedData).length === 0) {
        return toast("Please make sure to fill in at least one field before updating this article.");
      }
      const docRef = doc(db, "articles", String(id));
      await updateDoc(docRef, formattedData);
      toast("Your article has been updated.")
      navigate({ to:"/seller/$id" })
    } else {
      const storage = getStorage(app)
      const imageRef = ref(storage, `images/${imageUpload.name + uuidv4() }`)
      uploadBytes(imageRef, imageUpload)
        .then(async() => {
          await getDownloadURL(imageRef)
            .then(async(url) => {
              const data: Data = {
                name,
                description,
                price,
                image: url
              };
              const formattedData: Data = {};
              for (const key in data) {
                if (data[key] !== "") {
                  formattedData[key] = data[key];
                }
              }
              const docRef = doc(db, "articles", String(id));
              await updateDoc(docRef, formattedData);
              toast("Your article has been updated.")
              navigate({ to:"/seller/$id" })
            });
        })
    }
  }; 
  return(
    <>
      <div className="flex flex-col gap-y-[3.75rem]">
        <NavbarSeller />
        <div className="flex flex-col gap-y-10 px-20 items-center">
          <form className="space-y-6 w-[350px]" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-3xl font-bold w-full">
              Update article
            </p>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    {...register("name")}
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    id="description"
                    {...register("description")}
                    name="description"
                    type="text"
                    autoComplete="current-description"
                    className="outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    {...register("price")}
                    name="price"
                    type="number"
                    autoComplete="current-description"
                    className="outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
                <div className="mt-2">
                  <input
                    id="image"
                    {...register("image")}
                    name="image"
                    type="file"
                    autoComplete="current-description"
                    className="outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => {
                      if (event.target.files) {
                        setImageUpload(event.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={() => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useLaunchConfetti();
                  }}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update article
                </button>
              </div>
            </form>
        </div>
      </div>
    </>
  )
}

