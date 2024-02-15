import NavbarSeller from "@/components/navbar/NavbarSeller";
import { useLaunchConfetti } from "@/hooks/useLunchConfetti";
import { Link } from "@tanstack/react-router";

export default function SellerHomepage() {
  return(
    <>
      <div className="flex flex-col gap-y-[3.75rem]">
        <NavbarSeller />
        <div className="flex flex-col gap-y-10 px-20">
          <div className="flex flex-row justify-between items-center">
            <p className="text-3xl font-bold">Articles</p>
            <Link to="/seller/add">
              <button
                onClick={() => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  useLaunchConfetti();
                }}
                className="flex w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add article
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
