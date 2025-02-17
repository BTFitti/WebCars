import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnections";

export function DashHeader() {
    async function handleLogout(){
      await signOut(auth)  
    }
  return (
    <div className="bg-red-500 h-10 rounded-xl flex items-center gap-10 p-7 text-white text-xl">
     
        <Link className="relative tracking-[1px] after:absolute 
        after:content-[''] after:bg-white after:h-[3px] 
        after:w-0 after:left-0 after:bottom-0 after:rounded-xl hover:after:w-full after:duration-300 after:ease-in-out" to={"/dashboard"}>Dashboard</Link>
        <Link className="relative tracking-[1px] after:absolute 
        after:content-[''] after:bg-white after:h-[3px] 
        after:w-0 after:left-0 after:-bottom-[4px] after:rounded-xl hover:after:w-full after:duration-300 after:ease-in-out" to={"/dashboard/new"}>Registrar um carro</Link>
     

        <button onClick={handleLogout} className="ml-auto cursor-pointer relative tracking-[1px] after:absolute 
        after:content-[''] after:bg-white after:h-[3px] 
        after:w-0 after:left-0 after:bottom-0 after:rounded-xl hover:after:w-full after:duration-300 after:ease-in-out">Sair da conta</button>
      
    </div>
  );
}
