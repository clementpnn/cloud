import { Link } from "@tanstack/react-router";

export default function NavbarSeller() {
  return (
    <>
      <div className="flex flex-row justify-between items-center px-20 py-10 backdrop-blur-xl bg-white/30">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaAIQE3OWwsMoF5iYqRiMC5aZhXcR1LL8eRNucNYfAWU37YYuqdQqQezWivg&s" className="w-10"/>
        <div className="flex flex-row gap-x-10">
          <Link to="/seller" className="capitalize font-bold">
            articles
          </Link>
        </div>
      </div>
    </>
  )
}
