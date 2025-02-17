import { FiUpload } from "react-icons/fi";
import { Container } from "../../../components/container";
import { DashHeader } from "../../../components/dashboardHeader";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/input";
const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório!"),
  model: z.string().nonempty("O campo modelo é obrigatório!"),
  year: z.string().nonempty("O ano do carro é obrigatório!"),
  km: z.string().nonempty("O KM do carro é obrigatório!"),
  price: z.string().nonempty("O preço do carro é obrigatório!"),
  city: z.string().nonempty("A cidade é obrigatória!"),
  whatsapp: z
    .string()
    .min(1, "O telefone é obrigatório")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Número de telefone inválido.",
    }),
  description: z.string().nonempty("A descrição é obrigatória"),
});
type FormData = z.infer<typeof schema>;

export function New() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  function onSubmit(data: FormData) {
    console.log(data);
  }
  return (
    <Container>
      <DashHeader />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              className="opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
            />
          </div>
        </button>
      </div>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do carro</p>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Ex: Onix 1.0..."
            />
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do carro</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Ex: 1.0 Flex PLUS MANUAL..."
            />
          </div>
          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full mb-3">
              <p className="mb-2 font-medium">Ano do carro</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2016/2017..."
              />
            </div>
            <div className="w-full mb-3">
              <p className="mb-2 font-medium">KM's rodados</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="Ex: 23.8km..."
              />
            </div>
          </div>
          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full mb-3">
              <p className="mb-2 font-medium">Telefone para contato</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 011999101923..."
              />
            </div>
            <div className="w-full mb-3">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Ex: São Caetano do Sul - SP..."
              />
            </div>
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Preço</p>
            <Input
              type="text"
              register={register}
              name="price"
              error={errors.price?.message}
              placeholder="Ex: R$90.000"
            />
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Descrição</p>
            <textarea 
            className="border-2 w-full rounded-md h-24 px-5"
            {...register("description")}
            name="description"
            id="description"
            placeholder="Digite a descrição completa do carro..."
            />
            {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
          </div>
          <button type="submit" className="cursor-pointer w-full h-10 rounded-md bg-zinc-900 text-white font-medium">Cadastrar</button>
        </form>
      </div>
    </Container>
  );
}
