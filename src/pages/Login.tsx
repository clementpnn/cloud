import { useForm, SubmitHandler } from "react-hook-form";
import app from "../services/utils/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "@tanstack/react-router";
import { useLaunchConfetti } from "@/hooks/useLunchConfetti";
import useUser from "@/hooks/useUser";

export default function Login() {
  const navigate = useNavigate({ from: "/login" });
  const { setToken, setRole } = useUser();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<Record<string, string>> = async (formData) => {
    const { email, password } = formData;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDocRef = doc(db, "user", userCredential.user.uid);
      const docSnapshot = await getDoc(userDocRef);
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setRole(userData.role);
        if (userData.role === "customer") {
          navigate({ to: "/customer" });
        } else {
          navigate({ to: "/seller" });
        }
      } else {
        console.log("No user data found.");
      }
    } catch (error) {
      console.error("Error login : ", error);
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
            Log in
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
                <Link to="/" className="text-indigo-600">
                  Sign up as a customer
                </Link>
                <br />
                <Link to="/signin" className="text-indigo-600">
                  Sign up as a seller
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
                  Log in
                </button>
                <div className="flex w-full justify-center flex-col items-center gap-y-3 pt-3">
                  <Link to="/signin" className="text-indigo-600 font-bold">
                    Sign up as a seller
                  </Link>
                  <Link to="/" className="text-indigo-600 font-bold">
                    Sign up as a customer
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
