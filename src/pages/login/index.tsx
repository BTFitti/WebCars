import logoImg from "../../assets/OIG3.png";
import { Container } from "../../components/container";
import { Link, useNavigate} from "react-router-dom";
import InputComponent from "../../components/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnections";
import { useEffect } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório!"),
  password: z
    .string()
    .nonempty("O campo senha é obrigatório!"),
});

type FormData = z.infer<typeof schema>; //tipagem para o formulário seguir o schema

export function Login() {

useEffect(()=>{
  async function handleLogout(){
    await signOut(auth)
  }
  handleLogout();
},[])

  const navigate = useNavigate()
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
    signInWithEmailAndPassword(auth,data.email, data.password)
    .then(()=>{
      navigate("/dashboard", {replace : true})
      toast.success("Logado com sucesso!")
    })
    .catch(()=>{
      toast.error("Não existe nenhuma conta cadastrada com este endereço de email!")
    })
  }
  return (
    <Container>
      {/* //centralizar tanto vertical quanto horizontal */}
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        {/* //max-w-sm (384px) e w-full vai tentar pegar o máximo disponível que é 384px */}
        <Link to={"/"} className="max-w-sm w-80">
          <img src={logoImg} alt="Logo do webcars"/>
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white max-w-2xl w-full rounded-lg p-5 flex flex-col gap-5"
        >
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
            className="w-full cursor-pointer bg-zinc-900 rounded-sm font-medium p-2 text-2xl text-white hover:bg-zinc-600 duration-300 ease-in-out"
          >
            Acessar
          </button>
        </form>
        <div className="xl:flex text-center gap-2 text-2xl mb-10">
          <p> Ainda não tem uma conta?</p>
          <Link to={"/signup"} className="underline">
            Faça seu cadastro!
          </Link>
        </div>
        <a href="/" className="underline">Voltar para a home</a>
      </div>
    </Container>
  );
}
