  import NavbarSeller from "@/components/navbar/NavbarSeller"
  import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
  import app from '@/services/utils/firebaseConfig'
  import { useLaunchConfetti } from "@/hooks/useLunchConfetti";
  import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
  import { doc, setDoc, getFirestore } from "firebase/firestore";
  import { v4 as uuidv4 } from 'uuid';
  import { useState } from "react";
  import { toast } from 'sonner'

  interface Data {
    name: string,
    description: string,
    price: number,
    image: string,
    uid: string
  }

  export default function SelletAddArticle() {
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const db = getFirestore(app)
    const { register, handleSubmit } = useForm();
    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
      const { name, description, price } = formData
      if (imageUpload === null) return
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
                image: url,
                uid: uuidv4()
              };
              const docRef = doc(db, "articles", uuidv4());
              await setDoc(docRef, data);
              toast("Your article has been created.")
            });
        })
    }; 
    return(
      <>
        <div className="flex flex-col gap-y-[3.75rem]">
          <NavbarSeller />
          <div className="flex flex-col gap-y-10 px-20 items-center">
            <form className="space-y-6 w-[350px]" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-3xl font-bold w-full">
                Add article
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
                      required
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
                      required
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
                      required
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
                      required
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
                    Add article
                  </button>
                </div>
              </form>
          </div>
        </div>
      </>
    )
  }
