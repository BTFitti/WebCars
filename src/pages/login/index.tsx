import logoImg from '../../assets/logo.svg'
import { Container } from '../../components/container';
import { Link } from 'react-router-dom';
export function Login() {
  function handleSubmit() {}
  return (
    
    <Container>
      {/* //centralizar tanto vertical quanto horizontal */}
      <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
        {/* //max-w-sm (384px) e w-full vai tentar pegar o máximo disponível que é 384px */}
        <Link to={"/"} className='mb-6 max-w-sm w-full'>
        <img src={logoImg} alt="Logo do webcars" className='w-full' />
        </Link>
        <form action="" className='bg-white max-w-xl w-full rounded-lg'>
          <input type="text" />
        </form>

      </div>
    </Container>
  );
}
