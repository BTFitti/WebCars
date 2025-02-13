import logoImg from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Link } from "react-router-dom";
import InputComponent from "../../components/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  fullName: z.string().nonempty("O campo nome é obrigatório!").min(3, "Digite seu nome completo"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório!"),
  password: z
    .string()
    .min(5, { message: "Sua senha deve ter no mínimo 5 caracteres!" })
    .nonempty("O campo senha é obrigatório!"),
});

type FormData = z.infer<typeof schema>; //tipagem para o formulário seguir o schema

export function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    //tipando o useForm que vai seguir o FormData que segue o schema
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  function onSubmit(data: FormData) {
    console.log(data);
  }
  return (
    <Container>
      {/* //centralizar tanto vertical quanto horizontal */}
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        {/* //max-w-sm (384px) e w-full vai tentar pegar o máximo disponível que é 384px */}
        <Link to={"/"} className="mb-6 max-w-sm w-full">
          <img src={logoImg} alt="Logo do webcars" className="w-full" />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white max-w-2xl w-full rounded-lg p-5 flex flex-col gap-5"
        >
          <InputComponent
            type="text"
            placeholder="Digite seu nome completo"
            name="fullName" //o name precisa ser o mesmo do schema
            error={errors?.fullName?.message}
            register={register} //registrar o formulário no react-hook-form
          />
          <InputComponent
            type="email"
            placeholder="Digite seu email"
            name="email" //o name precisa ser o mesmo do schema
            error={errors?.email?.message}
            register={register} //registrar o formulário no react-hook-form
          />

          <InputComponent
            type="password"
            placeholder="Digite sua senha"
            name="password" //o name precisa ser o mesmo do schema
            error={errors?.password?.message}
            register={register} //registrar o formulário no react-hook-form
          />

          <button
            type="submit"
            className="w-full cursor-pointer bg-zinc-900 rounded-sm font-medium p-2 text-2xl text-white"
          >
            Acessar
          </button>
        </form>
        <div className="flex gap-2 text-2xl">
          <p> Já tem uma conta?</p>
          <Link to={"/login"} className="underline">Faça o login!</Link>
        </div>
      </div>
    </Container>
  );
}
