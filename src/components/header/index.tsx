import { GrLogin } from "react-icons/gr";
import { Link } from "react-router-dom";
export function Header() {
  return (
    <div className="py-2 border-b-2 border-zinc-600/50 ">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between my-2 ">
        <Link to={"/"}>
          <img
            src="/src/assets/logo.svg"
            alt="Logo webcars"
          />
        </Link>

        {/* <p className="italic font-bold text-3xl">Encontre sua nova paixão de 4 rodas!</p> */}
        <Link to={"/login"}>
          <GrLogin size={30} color="black"/>
        </Link>
      </nav>
    </div>
  );
}
