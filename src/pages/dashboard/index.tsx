import { Container } from "../../components/container";
import { DashHeader } from "../../components/dashboardHeader";
import { FiTrash2 } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnections";
import { AuthContext } from "../../context/authContext";
interface CarProps{
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  km: string;
  images: ImageCarProps[];
  uid: string;
}

interface ImageCarProps{
  name: string;
  uid: string;
  url: string
}
export function Dashboard() {

  const {user} = useContext(AuthContext)
  const [cars, setCars] = useState<CarProps[]>([])

  useEffect(() => {
    async function loadCars() {
      if(!user?.uid){
        return;
      }
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef,where("uid", "==", user.uid) );
      getDocs(queryRef)
        //snapshot é sempre oque encontrou
        .then((snapshot) => {
          let listCars = [] as CarProps[];
          snapshot.forEach((doc) => {
            listCars.push({
              id: doc.id,
              name: doc.data().name,
              year: doc.data().year,
              km: doc.data().km,
              city: doc.data().city,
              price: doc.data().price,
              images: doc.data().images,
              uid: doc.data().uid,
            });
          });
          setCars(listCars);
        });
    }
    loadCars();
  }, [user]);
  return (
    <Container>
      <DashHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg relative">
          <button onClick={()=>{}} className="absolute bg-white w-14 h-14 top-2 flex items-center justify-center right-4 rounded-full drop-shadow-2xl cursor-pointer">
            <FiTrash2 size={32} color="#000"/>
          </button>
          <img className="w-full rounded-lg mb-2 max-h-70" src="https://firebasestorage.googleapis.com/v0/b/webcarros-f40c5.firebasestorage.app/o/images%2F2LphNyh70qOJfn9XyjeLc1m6HQQ2%2F4fdcb2a4-0943-4ea9-be30-9f5d29191d39?alt=media&token=71388623-66da-4b32-91c5-444ce80f8626" alt="" />
          <p className="font-bold px-2 mt-1 mb-2">Nissan versa</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700">Ano 2016/2019 | 23.090 km</span>
            <strong className="text-black font-bold mt-4">R$ 150.000</strong>
          </div>
          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2"><span className="text-black">São caetano do Sul - SP</span></div>
        </section>
      </main>
    </Container>
  );
}
