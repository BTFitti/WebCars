import { GrLogin } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


export function Header() {


  const {signed, loadingAuth} = useContext(AuthContext)


  return (
    <div className="w-full flex p-5 bg-white drop-shadow mb-4">
      <header className="w-full max-w-7xl h-24 flex items-center justify-between mx-auto px-4">
        <Link to={"/"}>
          <img src="/src/assets/OIG3.png" alt="Logo do site webcars" className=" h-32 hover:brightness-75   "/>
        </Link>

        {/* <p className="italic font-bold text-3xl">Encontre sua nova paixão de 4 rodas!</p> */}

        {!loadingAuth &&
          (signed ? (
            <Link to={"/dashboard"}>
              <FaRegUserCircle size={40} color="black" />
            </Link>
          ) : (
            <Link to={"/login"}>
              <GrLogin size={40} color="black" />
            </Link>
          ))}
       
      </header>
    </div>
  );
}
