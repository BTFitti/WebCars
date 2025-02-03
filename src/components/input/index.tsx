import { RegisterOptions, UseFormRegister } from "react-hook-form";
/**
 Criada a tipagem do input porque assim eu consigo ter um input que pode ser usado em vários lugares, a função recebe 3 parâmetros que são um name, placeholder e type
 que são do tipo InputProps então eu posso ter uma página que tem 3 inputs mas eles podem ser diferentes um do outro, como eu deixei livre a escolha do type 
 eu posso criar 3 inputs e um pode ser do tipo pass, email ou number por exemplo.
 */
interface InputProps {
  type: "text" | "password" | "email" | "number";
  placeholder?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}
function Input({
  name,
  placeholder,
  type,
  register,
  rules,
  error,
}: InputProps) {
  return (
    <div>
      <input
        className="w-full border-2 border-gray-500/30 rounded-md h-11 px-2"
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
        id={name}
      />
      {error && <p>{error}</p>}
    </div>
  );
}
export default Input;
