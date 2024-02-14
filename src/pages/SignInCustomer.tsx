import { useForm, SubmitHandler } from "react-hook-form";
import app from "../services/utils/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Link } from "@tanstack/react-router";
import { useLaunchConfetti } from "@/hooks/useLunchConfetti";

export default function SigninCustomer() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<Record<string, string>> = async (formData) => {
    const { email, password } = formData;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const data = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        role: "customer",
      };
      const docRef = doc(db, "user", userCredential.user.uid);
      setDoc(docRef, data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-40 w-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaAIQE3OWwsMoF5iYqRiMC5aZhXcR1LL8eRNucNYfAWU37YYuqdQqQezWivg&s"
            alt="Go Cloud"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Customer sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password")}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <Link to="/signin" className="text-indigo-600">
                  Sign up as a seller
                </Link>
                <br />
                <Link to="/login" className="text-indigo-600">
                  Login
                </Link>
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
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
