import { Link } from "react-router-dom"
import {useForm} from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"

export default function RegisterView() {

  const initialValues = {
    name: '',
    email: '',
    password: '',
    PassWordConfirmation: ''
  }

  const { register, watch,handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

  const password = watch('password')

  const handleRegister = ()=>{
    console.log('Desde handleRegister')
  }

  return (
    <>
    <div className="min-h-screen flex">
      {/* Panel izquierdo */}
        <section
          className="flex-1 flex items-center justify-center px-6 py-16"
          style={{ background: '#F4EDE4' }}
        >
          <div
            className="w-full max-w-md"
            style={{ animation: 'fadeUp 0.5s ease both' }}
          >
            {/* Logo mobile */}
            <a href="/" className="lg:hidden no-underline block mb-10">
              <span className="font-serif text-xl font-black" style={{ color: '#C4622D' }}>
                Zapaterías
                <span style={{ color: '#2D6A4F' }}>Seguras</span>
              </span>
            </a>

            {/* Encabezado */}
            <h1
              className="font-serif text-3xl font-black mb-1 tracking-tight"
              style={{ color: '#2C2C2C' }}
            >
              Crear cuenta
            </h1>
            <p className="text-sm mb-8" style={{ color: '#444444' }}>
              ¿Ya tienes cuenta?{' '}
              <Link to="/auth/login"
                className="font-semibold no-underline hover:underline"
                style={{ color: '#C4622D' }}
              >
                Inicia sesión
              </Link>
            </p>

            {/* Formulario */}
            <form 
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-5">

              {/* Usuario */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase"
                  style={{ color: '#2C2C2C', letterSpacing: '0.06em' }}
                >
                  Nombre de usuario
                </label>
                <input
                  id='name'
                  type="text"
                  placeholder="Ej: zapatero_restrepo"
                  autoComplete="name"
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                  {...register("name", { required: "El nombre de usuario es obligatorio" })}
                  style={{
                    border: '2px solid #e8ddd2',
                    background: '#ffffff',
                    color: '#2C2C2C',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C4622D'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196,98,45,0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e8ddd2'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase"
                  style={{ color: '#2C2C2C', letterSpacing: '0.06em' }}
                >
                  Email
                </label>
                <input
                  id='email'
                  type="email"
                  placeholder="Ej: ejemplo@gmail.com"
                  autoComplete="email"
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                  {...register("email", { required: "El email es obligatorio",
                    pattern: { value: /^\S+@\S+$/i, message: "El email no es válido" }
                  })}
                  style={{
                    border: '2px solid #e8ddd2',
                    background: '#ffffff',
                    color: '#2C2C2C',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C4622D'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196,98,45,0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e8ddd2'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </div>

              {/* Contraseña */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase"
                  style={{ color: '#2C2C2C', letterSpacing: '0.06em' }}
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                  {...register("password", { 
                    required: "La contraseña es obligatoria",
                    minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" }
                  })}
                  style={{
                    border: '2px solid #e8ddd2',
                    background: '#ffffff',
                    color: '#2C2C2C',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C4622D'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196,98,45,0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e8ddd2'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              </div>

              {/* Confirmar contraseña */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase"
                  style={{ color: '#2C2C2C', letterSpacing: '0.06em' }}
                >
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  id="PassWordConfirmation"
                  placeholder="Repite tu contraseña"
                  autoComplete="new-password"
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                  {...register("PassWordConfirmation", { required: "Es necesario confirmar la contraseña",
                    validate: (value) => value === password || "Las contraseñas no coinciden"
                  })}
                  style={{
                    border: '2px solid #e8ddd2',
                    background: '#ffffff',
                    color: '#2C2C2C',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#C4622D'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196,98,45,0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e8ddd2'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
                {errors.PassWordConfirmation && <ErrorMessage>{errors.PassWordConfirmation.message}</ErrorMessage>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-base text-white border-none cursor-pointer transition-all duration-200 mt-2"
                style={{
                  background: '#C4622D',
                  boxShadow: '0 4px 20px rgba(196,98,45,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#9e4e23'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(196,98,45,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#C4622D'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(196,98,45,0.3)'
                }}
              >
                Crear cuenta gratis
              </button>
            </form>

            <p
              className="text-xs text-center mt-8 leading-relaxed"
              style={{ color: 'rgba(68,68,68,0.5)' }}
            >
              Al registrarte, aceptas los Términos de Uso y la Política de Privacidad.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}