import { Container } from "../../components/container";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  orderBy,
  where,
} from "firebase/firestore";
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
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadCars();
  }, []);
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
  async function handleSearchCar() {
    if (input === "") {
      loadCars();
      return;
    }
    setCars([]);
    setLoadImages([]);
    const q = query(
      collection(db, "cars"),
      where("name", ">=", input.toUpperCase()),
      where("name", "<=", input.toUpperCase() + "\uf8ff")
    ); // \uf8ff - unicode para marcar o final de consultas
    const querySnapshot = await getDocs(q);
    let listCars = [] as CarsProps[];
    querySnapshot.forEach((doc) => {
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
    setCars(listCars)
  }

  function handleImgLoad(id: string) {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id]);
  }

  return (
    <Container>
      <section className="bg-white p-4 rounded-2xl w-full max-w-5xl mx-auto flex justify-center items-center gap-1.5 lg:gap-3 mt-12">
        <input
          placeholder="Digite o nome do carro..."
          className="w-full border-2 border-gray-500/30 rounded-lg h-9 py-6 lg:px-4 px-2 outline-none lg:text-2xl"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <CiSearch
       onClick={handleSearchCar}
       size={50}
       className="cursor-pointer hover:scale-110 duration-300"
        />
      </section>
      <h1 className="font-bold text-center text-3xl my-10 italic">
        Encontre sua nova paixão de quatro rodas!
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {car.map((car) => (
          <Link key={car.id} to={`/details/${car.id}`}>
            <section className="w-full bg-white rounded-lg pb-4 drop-shadow-2xl hover:border-b-8 border-b-red-700 transition-all duration-75 ease-in-out ">
              <div
                style={{
                  display: loadImages.includes(car.id) ? "none" : "flex",
                }}
                className="w-full h-72 rounded-lg bg-slate-200 flex items-center justify-center  text-3xl"
              >
                Carregando imagens...
              </div>
              <img
                src={car.images[0].url}
                alt="Veículo 1"
                className="w-full rounded-t-lg max-h-72 object-cover"
                onLoad={() => handleImgLoad(car.id)}
                style={{
                  display: loadImages.includes(car.id) ? "block" : "none",
                }}
              />
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
              <div className="flex flex-col px-2">
                <strong className="text-black font-medium text-xl">
                  R${" "}
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
