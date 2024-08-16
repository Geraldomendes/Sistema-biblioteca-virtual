import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import ifpbLogo from '../assets/ifpb.svg';

const loginSchema = z.object({
  registration: z
    .string({ required_error: 'A matrícula não pode estar vazia' }).min(4, 'A matrícula não pode estar vazia'),
  password: z
    .string({ required_error: 'Senha deve ter ao menos 6 caracteres' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type ILogin = z.infer<typeof loginSchema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  function handleLogin(data: ILogin) {
    console.log(data);
  }
  
  return (
    <main className="bg-slate-100 h-screen w-screen flex items-center justify-center gap-20">
      <img src={ifpbLogo} alt="IFPB" width={260} />

      <div className="bg-white px-14 py-8 h-[606px] flex flex-col items-center justify-center w-[527px] gap-20">
        <div className="text-center">
          <h1 className="text-4xl text-gray-600 font-semibold">Entrar</h1>
        </div>

        <div className="w-full max-w-80 gap-5 flex flex-col">
          <Input
            {...register('registration')}
            placeholder="Matrícula"
            name="registration"
            error={errors.registration?.message}
            autoComplete='off'
          />

          <Input
            {...register('password')}
            placeholder="Senha"
            type="password"
            name="password"
            error={errors.password?.message}
          />

          <Button onClick={handleSubmit(handleLogin)}>Entrar</Button>

          <span className="text-center text-gray-600">
            Ainda não possui conta?
          </span>

          <Link
            to="/signup"
            className="underline text-blue-500 font-medium text-center"
          >
            Cadastre-se aqui!
          </Link>
        </div>
      </div>
    </main>
  );
}
