import { GrLogin } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import logo from "../../assets/OIG3.png"

export function Header() {
  const { signed, loadingAuth } = useContext(AuthContext);

  return (
    <div className="w-full flex py-5 xl:p-5 bg-white drop-shadow mb-4">
      <header className="w-full max-w-7xl h-24 flex items-center justify-between mx-auto px-4 ">
        <Link to={"/"}>
          <img
            src={logo}
            alt="Logo do site webcars"
            className=" h-32 hover:brightness-75"
          />
        </Link>

        {!loadingAuth &&
          (signed ? (
            <Link
              to={"/dashboard"}
              className="flex items-center justify-center gap-2 text-2xl 
              relative tracking-[1px] after:absolute 
                after:content-[''] after:bg-black after:h-[3px] after:-translate-x-1/2
                after:w-0 after:left-28 after:-bottom-[4px] after:rounded-xl hover:after:w-31 after:duration-300 after:ease-in-out "
            >
              <FaRegUserCircle size={40} color="black" />
              <p>Dashboard</p>
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
