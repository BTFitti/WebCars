import { Container } from "../../components/container";
import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebaseConnections";
import { Link } from "react-router-dom";
interface CarsProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[];
}
interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}
export function Home() {
  const [car, setCars] = useState<CarsProps[]>([]);

  useEffect(() => {
    async function loadCars() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("created", "desc"));
      getDocs(queryRef)
        //snapshot é sempre oque encontrou
        .then((snapshot) => {
          let listCars = [] as CarsProps[];
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
  }, []);

  return (
    <Container>
      <section className="bg-white p-4 rounded-2xl w-full max-w-5xl mx-auto flex justify-center items-center gap-1.5 lg:gap-3 mt-20">
        <input
          placeholder="Digite o nome do carro..."
          className="w-full border-2 border-gray-500/30 rounded-lg h-9 py-6 lg:px-4 px-2 outline-none lg:text-2xl"
        />
        <button className=" bg-red-500 h-9 px-5 lg:px-14 py-6 flex items-center  lg:text-xl rounded-lg text-white font-medium cursor-pointer">
          Buscar
        </button>
      </section>
      <h1 className="font-bold text-center text-3xl my-10">
        Carros novos e usados em todo o Brasil!
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {car.map((car) => (
          <Link key={car.id} to={`/details/${car.id}`}>
            <section className="w-full bg-white rounded-lg pb-4 drop-shadow-2xl hover:border-b-8 border-b-red-700 transition-all duration-75 ease-in-out ">
              <img
                src={car.images[0].url}
                alt="Veículo 1"
                className="w-full rounded-t-lg max-h-72"
              />
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
              <div className="flex flex-col px-2">
                <strong className="text-black font-medium text-xl">
                  {car.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <div className="flex justify-between mt-2 ">
                  <span className="text-zinc-700/60 ">{car.year}</span>
                  <span className="text-zinc-700/60">• {car.km} km </span>
                </div>
              </div>
              <hr className="text-zinc-400/90 my-2" />
              <div className="flex ">
                <img
                  src="https://www.webmotors.com.br/assets/img/icon/icon-location.svg"
                  alt="Location"
                  className="pl-2"
                />
                <span className="px-2 text-zinc-700/60">{car.city}</span>
              </div>
            </section>
          </Link>
        ))}
      </main>
    </Container>
  );
}
