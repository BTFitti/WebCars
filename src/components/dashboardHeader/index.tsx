import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnections";

export function DashHeader() {
  async function handleLogout() {
    await signOut(auth);
  }
  const location = useLocation();

  const isActive = (pathname: string) => {
    return location.pathname === pathname
      ? "relative tracking-[1px] after:absolute after:content-[''] after:bg-white after:h-[3px] after:w-0 after:left-0 after:-bottom-[4px] after:rounded-xl after:w-full after:duration-300 after:ease-in-out "
      : "";
  };
  
  return (
    <div className="bg-red-500 h-10 rounded-xl flex items-center xl:gap-10 xl:p-7 p-2 justify-between text-white text-sm  xl:text-xl mb-6">
      <Link
        className={`${isActive("/dashboard")} 
        relative tracking-[1px] after:absolute 
        after:content-[''] after:bg-white after:h-[3px] after:-translate-x-1/2 
        after:w-0 after:left-1/2 after:-bottom-[4px] after:rounded-xl hover:after:w-full after:duration-300 after:ease-in-out`}
        to={"/dashboard"}
      >
        Dashboard
      </Link>
      <Link
        className={`${isActive("/dashboard/new")} 
        relative tracking-[1px] after:absolute 
        after:content-[''] after:bg-white after:h-[3px] after:-translate-x-1/2 
        after:w-0 after:left-1/2 after:-bottom-[4px] after:rounded-xl hover:after:w-full after:duration-300 after:ease-in-out`}
        to={"/dashboard/new"}
      >
        Registrar um carro
      </Link>

      <button
        onClick={handleLogout}
        className="xl:ml-auto cursor-pointer 
        relative tracking-[1px] after:absolute 
        after:content-[''] after:bg-white after:h-[3px] after:-translate-x-1/2 
        after:w-0 after:left-1/2 after:-bottom-[4px] after:rounded-xl hover:after:w-full after:duration-300 after:ease-in-out"
      >
        Sair da conta
      </button>
    </div>
  );
}
