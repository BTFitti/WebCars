import { GrLogin } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Header() {
  const signed = false;
  const loadingAuth = false;


  return (
    <div className="w-full flex p-5 bg-white drop-shadow mb-4">
      <header className="w-full max-w-7xl flex items-center justify-between mx-auto px-4">
        <Link to={"/"}>
          <img src="/src/assets/logo.svg" alt="Logo do site webcars"/>
        </Link>

        {/* <p className="italic font-bold text-3xl">Encontre sua nova paixão de 4 rodas!</p> */}

        {!loadingAuth &&
          (signed ? (
            <Link to={"/dashboard"}>
              <FaRegUserCircle size={36} color="black" />
            </Link>
          ) : (
            <Link to={"/login"}>
              <GrLogin size={30} color="black" />
            </Link>
          ))}
       
      </header>
    </div>
  );
}
