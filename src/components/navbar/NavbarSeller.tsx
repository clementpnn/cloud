import { Link } from "@tanstack/react-router"
import LogoutButton from "@/components/button/LogoutButton"

export default function NavbarSeller() {
  return (
    <>
      <div className="sticky top-0 w-full flex flex-row justify-between items-center px-20 py-10 backdrop-blur-xl bg-white/30">
        <Link to="/seller">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaAIQE3OWwsMoF5iYqRiMC5aZhXcR1LL8eRNucNYfAWU37YYuqdQqQezWivg&s" className="w-10"/>
        </Link>
        <LogoutButton />
      </div>
    </>
  )
}
