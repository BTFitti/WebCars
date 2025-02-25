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
import { db, storage } from "../../services/firebaseConnections";
import { ref, deleteObject } from "firebase/storage";
import { AuthContext } from "../../context/authContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
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

  async function handleDeleteCar(car: CarProps) {
    const itemCar = car;

    const docRef = doc(db, "cars", itemCar.id);
    await deleteDoc(docRef);
    itemCar.images.map(async (image) => {
      const imagePath = `images/${image.uid}/${image.name}`;
      const imageRef = ref(storage, imagePath);

      try {
        await deleteObject(imageRef);
        setCars(cars.filter((car) => car.id !== itemCar.id));
      } catch (err) {
        console.log("Erro ao excluir a imagem!");
      }
    });
    toast.success("Anúncio deletado com sucesso!");
  }
  return (
    <Container>
      <DashHeader />
      {cars.length === 0 && (
        <div className="flex flex-col text-center items-center justify-center w-full h-full text-4xl gap-5 ">
          <p>Você ainda não tem carros cadastrados!</p>
          <Link to="/dashboard/new">
            <p className="text-red-700 underline ">Comece agora mesmo!</p>
          </Link>
        </div>
      )}
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <section key={car.id} className="w-full bg-white rounded-lg relative">
            <button
              onClick={() => {
                handleDeleteCar(car);
              }}
              className="absolute bg-white w-12 h-12 top-2 flex items-center justify-center right-4 rounded-full drop-shadow-2xl cursor-pointer "
            >
              <FiTrash2
                className="text-black hover:text-red-500 transition-colors duration-200"
                size={32}
              />
            </button>
            <img
              className="w-full rounded-t-lg mb-2 max-h-70 object-cover"
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
            <div className="w-full h-px bg-slate-200 my-4"></div>
            <div className="gap-2 pb-2 flex">
              <img
                src="https://www.webmotors.com.br/assets/img/icon/icon-location.svg"
                alt="Location"
              />
              <span className="text-black">{car.city}</span>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}
