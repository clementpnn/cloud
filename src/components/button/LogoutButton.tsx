import { useNavigate } from "@tanstack/react-router";

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate({ to: "/login" });
    window.location.reload();
  };
  return (
    <>
      <div>
        <button
          onClick={handleLogout}
          className="flex w-fit items-center justify-center rounded-md border border-transparent bg-red-50 px-8 py-3 text-base font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Log out
        </button>
      </div>
    </>
  );
}
