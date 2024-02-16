import NavbarSeller from "@/components/navbar/NavbarSeller";
import { Link, useParams, useNavigate } from "@tanstack/react-router"
import { doc, deleteDoc, getFirestore } from "firebase/firestore"
import app from "@/services/utils/firebaseConfig";
import { toast } from "sonner"

export default function SellerDelete() {
  const navigate = useNavigate({ from:"/seller/delete/$id" })
  const { id } = useParams({ from:"/seller/delete/$id" })
  const db = getFirestore(app)
  const handleDeleteClick = async () => {
    const ArticleRef = doc(db, "articles", id)
    await deleteDoc(ArticleRef)
    toast('The article has been deleted.')
    navigate({ to:"/seller" })
  }
  return (
    <>
      <div className="flex flex-col gap-y-[3.75rem]">
        <NavbarSeller />
        <div className="flex flex-col gap-y-10 items-center justify-center h-full">
          <p className="text-3xl font-bold">
            Are you sure you want to delete this article ?
          </p>
          <div className="flex flex-row gap-x-10">
            <Link to="/seller/$id" params={{ id }}>
              <button
                type="button"
                className="flex w-fit items-center justify-center rounded-md border border-transparent bg-blue-50 px-8 py-3 text-base font-medium text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                No
              </button>
            </Link>
            <button
              type="button"
              className="flex w-fit items-center justify-center rounded-md border border-transparent bg-red-50 px-8 py-3 text-base font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )  
}
