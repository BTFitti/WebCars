import { ChangeEvent, useState, useContext } from "react";
import { Container } from "../../../components/container";
import { DashHeader } from "../../../components/dashboardHeader";

import { FiUpload, FiTrash } from "react-icons/fi";
import { useForm } from "react-hook-form";
import Input from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../context/authContext";
import { v4 as uuidV4 } from "uuid";

import { storage, db } from "../../../services/firebaseConnections";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model: z.string().nonempty("O modelo é obrigatório"),
  year: z.string().nonempty("O Ano do carro é obrigatório"),
  km: z.string().nonempty("A quilometragem do carro é obrigatória"),
  price: z.string().nonempty("O preço é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z
    .string()
    .min(1, "O Telefone é obrigatório")
    .refine((value) => /^(\d{12,13})$/.test(value), {
      message: "Numero de telefone inválido.",
    }),
  description: z.string().nonempty("A descrição é obrigatória"),
});

type FormData = z.infer<typeof schema>;

interface ImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

export function New() {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [carImg, setCarImg] = useState<ImageItemProps[]>([]);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);
      } else {
        toast.error("Envie uma imagem jpeg ou png!");
        return;
      }
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) {
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidV4(); //gera um Id aleatorio pra imagem

    //referencia para o caminho que vai ser salvo no banco, vai ser salvo no storage, na pasta images/pasta com o id do usuário que tá cadastrando/id aleatorio da imagem enviada
    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    //enviando para a nossa referencia a nossa imagem recebida através da função
    uploadBytes(uploadRef, image).then((snapshot) => {
      //pegando a url de download da imagem através do snapshot da promise
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        const imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downloadUrl,
        };

        if (uidImage === uidImage) {
        }
        setCarImg((images) => [...images, imageItem]);
        toast.success("Imagem enviada com sucesso!");
      });
    });
  }

  function onSubmit(data: FormData) {
    if (carImg.length < 2) {
      toast.error("Envie no mínimo 2 fotos do seu carro.");
      return;
    }
    const carListImages = carImg.map((car) => {
      return {
        uid: car.uid,
        name: car.name,
        url: car.url,
      };
    });
    addDoc(collection(db, "cars"), {
      name: data.name.toUpperCase(),
      model: data.model,
      whatsapp: data.whatsapp,
      city: data.city,
      year: data.year,
      km: data.km,
      price: data.price,
      description: data.description,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: carListImages,
    })
      .then(() => {
        reset();
        setCarImg([]);
        toast.success("Anúncio cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao cadastrar o seu anúncio");
      });
  }

  async function handleDeleteImg(item: ImageItemProps) {
    const imagePath = `images/${item.uid}/${item.name}`;
    const imageRef = ref(storage, imagePath);
    try {
      await deleteObject(imageRef);
      setCarImg(carImg.filter((car) => car.url !== item.url));
    } catch (err) {
      console.log("erro ao deletar");
    }
  }

  return (
    <Container>
      <DashHeader />

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className=" absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="  cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="opacity-0  h-32 w-full bg-red-400/20 min-w-48 cursor-pointer"
              onChange={handleFile}
            />
          </div>
        </button>
        {carImg.map((item) => (
          <div
            className="w-full h-32 flex items-center justify-center relative"
            key={item.name}
          >
            <button className="absolute top-2 right-2 bg-gray-700 p-1 rounded-lg cursor-pointer hover:bg-gray-800 transition-all duration-300 ">
              <FiTrash
                size={24}
                className="text-red-50 hover:text-red-500 transition-all duration-300"
                onClick={() => handleDeleteImg(item)}
              />
            </button>
            <img
              src={item.previewUrl}
              className="rounded-lg w-full h-32 object-cover"
              alt="Foto do carro"
            />
          </div>
        ))}
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
            <p className="mb-2 font-medium">Modelo do carro</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Ex: 1.0 Flex PLUS MANUAL..."
            />
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div>
              <p className="mb-2 font-medium">Ano</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2016/2017..."
              />
            </div>

            <div>
              <p className="mb-2 font-medium">KM rodados</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="Ex: 23.900..."
              />
            </div>
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium"> Whatsapp</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 551199999999"
              />
            </div>

            <div className="w-full">
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
              placeholder="Ex: 84.000..."
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Descrição</p>
            <textarea
              className="border-2 border-gray-400 w-full rounded-md h-24 px-2"
              {...register("description")}
              name="description"
              id="description"
              placeholder="Digite a descrição completa sobre o carro..."
            />
            {errors.description && (
              <p className="mb-1 text-red-500">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-zinc-900 text-white font-medium h-10"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}
