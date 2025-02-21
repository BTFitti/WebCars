import { Container } from "../../components/container";
import { DashHeader } from "../../components/dashboardHeader";
import { FiTrash2 } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnections";
import { AuthContext } from "../../context/authContext";
interface CarProps {
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  km: string;
  images: ImageCarProps[];
  uid: string;
}

interface ImageCarProps {
  name: string;
  uid: string;
  url: string;
}
export function Dashboard() {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState<CarProps[]>([]);

  useEffect(() => {
    async function loadCars() {
      if (!user?.uid) {
        return;
      }
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));
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

  async function handleDeleteCar(id: string) {
    const docRef = doc(db, "cars", id);
    await deleteDoc(docRef);
    setCars(cars.filter((car) => car.id !== id));
  }
  return (
    <Container>
      <DashHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <section key={car.id} className="w-full bg-white rounded-lg relative">
            <button
              onClick={() => {
                handleDeleteCar(car.id);
              }}
              className="absolute bg-white w-14 h-14 top-2 flex items-center justify-center right-4 rounded-full drop-shadow-2xl cursor-pointer"
            >
              <FiTrash2 size={32} color="#000" />
            </button>
            <img
              className="w-full rounded-lg mb-2 max-h-70"
              src={car.images[0].url}
              alt=""
            />
            <p className="font-bold px-2 mt-1 mb-2">{car.name}</p>
            <div className="flex flex-col px-2">
              <span className="text-zinc-700">
                Ano {car.year} | {car.km} km
              </span>
              <strong className="text-black font-bold mt-4">
                R$ {car.price}
              </strong>
            </div>
            <div className="w-full h-px bg-slate-200 my-2"></div>
            <div className="px-2 pb-2">
              <span className="text-black">{car.city}</span>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}
