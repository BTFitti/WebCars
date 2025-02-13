import { Container } from "../../components/container";
// import { Link } from "react-router-dom";
export function Home() {
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
        <section className="w-full bg-white rounded-lg pb-4 drop-shadow-2xl hover:border-b-8 border-b-red-700 transition-all duration-75 ease-in-out ">
          <img
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202501/20250124/toyota-yaris-1.5-16v-flex-xl-plus-connect-multidrive-wmimagem11135661047.jpg?s=fill&w=552&h=414&q=60"
            alt="Veículo 1"
            className="w-full rounded-t-lg max-h-72"
          />
          <p className="font-bold mt-1 mb-2 px-2">Toyota Yaris</p>
          <div className="flex flex-col px-2">
            <strong className="text-black font-medium text-xl">
              R$ 190.000
            </strong>
            <div className="flex justify-between mt-2 ">
              <span className="text-zinc-700/60 ">2016/2017</span>
              <span className="text-zinc-700/60">• 23.000 km</span>
            </div>
          </div>
          <hr className="text-zinc-400/90 my-2" />
          <div className="flex ">
            <img
              src="https://www.webmotors.com.br/assets/img/icon/icon-location.svg"
              alt="Location"
              className="pl-2"
            />
            <span className="px-2 text-zinc-700/60">
              São Caetano do Sul - SP
            </span>
          </div>
        </section>
      </main>
    </Container>
  );
}
