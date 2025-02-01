import { Container } from "../../components/container";
export function Home() {
  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-4xl mx-auto flex justify-center items-center gap-2 mt-20">
        <input
          placeholder="Digite o nome do carro"
          className="w-full border-2 border-gray-500/30 rounded-lg h-9 p-6 outline-none text-xl"
        />
        <button className=" bg-red-500 h-9 px-14 py-6 flex items-center text-xl rounded-lg text-white font-medium cursor-pointer">
          Buscar
        </button>
      </section>
      <h1 className="font-bold text-center text-2xl my-10">
        Carros novos e usados em todo o Brasil!
      </h1>
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg ">
          <img
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202501/20250124/toyota-yaris-1.5-16v-flex-xl-plus-connect-multidrive-wmimagem11135661047.jpg?s=fill&w=552&h=414&q=60"
            alt="Veículo 1"
            className="w-full rounded-lg max-h-72 hover:scale-105 transition-all ease-in-out "
          />
          <p className="font-bold mt-1 mb-2 px-2">Toyota Yaris</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano 2016/2017 | 23.000 km</span>
            <strong className="text-black font-medium text-xl">R$ 190.000</strong>
          </div>
          <hr className="text-zinc-400/90  my-2"/>
          <div>
            <span className="px-2">São Caetano do Sul - SP</span>
          </div>
        </section>
      </main>
    </Container>
  );
}
