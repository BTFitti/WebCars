export function ErrorPage() {
  return (
    <div className="flex  items-center  w-full h-full my-10 flex-col gap-10 ">
      <span className="text-8xl text-red-400">404</span>

      <div className="flex flex-col items-center gap-2 text-3xl xl:text-5xl text-center">
        <p>Ops!</p>
        <p>
          Essa página <strong className="text-red-400">não existe!</strong>
        </p>
      </div>
      <a
        href="/"
        className="text-3xl text-center relative tracking-[1px] xl:flex gap-2  after:absolute 
        after:content-[''] after:bg-black after:h-[3px] 
        after:w-0 after:left-0 after:-bottom-[8px] after:rounded-xl hover:after:w-full after:duration-300 after:ease-in-out"
      >
        Clique aqui para retornar a <p className="font-bold"> home</p>
      </a>
      <img src="/src/assets/2309086_3e2f0.gif" alt="" />
    </div>
  );
}
