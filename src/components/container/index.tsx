import { ReactNode } from "react";
//esse componente é um alinhamento para aplicação pois toda a aplicação tem uma harmonia, ela está sempre alinhada com o header então criei esse componente para usar em todas as páginas
export function Container({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;
}
