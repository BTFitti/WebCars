import logoImg from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Link } from "react-router-dom";
import InputComponent from "../../components/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório!"),
  password: z.string().min(5, {message: "Sua senha deve ter no mínimo 5 caracteres!"}).nonempty("O campo senha é obrigatório!"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
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
          className="bg-white max-w-xl w-full rounded-lg"
        >
          <div className="mb-3">
            <InputComponent
              type="email"
              placeholder="Digite seu email"
              name="email"
              error={errors?.email?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <InputComponent
              type="password"
              placeholder="Digite sua senha"
              name="password"
              error={errors?.password?.message}
              register={register}
            />
          </div>

          <button>Acessar</button>
        </form>
      </div>
    </Container>
  );
}
