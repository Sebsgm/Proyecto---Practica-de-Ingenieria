import { Link } from "react-router-dom";

export default function LoginView() {
    return (
        <div className="min-h-screen flex">
            {/* Panel */}
            <section
                className="flex-1 flex items-center justify-center px-6"
                style={{ background: "#F4EDE4" }}
            >
                <div
                    className="w-full max-w-md"
                    style={{ animation: "fadeUp 0.5s ease both" }}
                >
                    {/* Logo mobile */}
                    <Link to="/" className="lg:hidden no-underline block mb-10">
                        <span
                            className="font-serif text-xl font-black"
                            style={{ color: "#C4622D" }}
                        >
                            Zapaterías
                            <span style={{ color: "#2D6A4F" }}>Seguras</span>
                        </span>
                    </Link>

                    {/* Encabezado */}
                    <h1
                        className="font-serif text-3xl font-black mb-1 tracking-tight"
                        style={{ color: "#2C2C2C" }}
                    >
                        Iniciar sesión
                    </h1>

                    <p className="text-sm mb-8" style={{ color: "#444444" }}>
                        ¿No tienes cuenta?{" "}
                        <Link
                            to="/auth/register"
                            className="font-semibold no-underline hover:underline"
                            style={{ color: "#C4622D" }}
                        >
                            Crear cuenta
                        </Link>
                    </p>

                    {/* Formulario */}
                    <form 
                    onSubmit={() => {[]}}
                    className="flex flex-col gap-5">
                        {/* Usuario */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                className="text-xs font-semibold uppercase"
                                style={{ color: "#2C2C2C", letterSpacing: "0.06em" }}
                            >
                                Nombre de usuario
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Ej: zapatero_restrepo"
                                autoComplete="username"
                                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                                style={{
                                    border: "2px solid #e8ddd2",
                                    background: "#ffffff",
                                    color: "#2C2C2C",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#C4622D";
                                    e.currentTarget.style.boxShadow =
                                        "0 0 0 3px rgba(196,98,45,0.1)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#e8ddd2";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            />
                        </div>

                        {/* Contraseña */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                className="text-xs font-semibold uppercase"
                                style={{ color: "#2C2C2C", letterSpacing: "0.06em" }}
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Tu contraseña"
                                autoComplete="current-password"
                                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                                style={{
                                    border: "2px solid #e8ddd2",
                                    background: "#ffffff",
                                    color: "#2C2C2C",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#C4622D";
                                    e.currentTarget.style.boxShadow =
                                        "0 0 0 3px rgba(196,98,45,0.1)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#e8ddd2";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            />
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl font-bold text-base text-white border-none cursor-pointer transition-all duration-200 mt-2"
                            style={{
                                background: "#C4622D",
                                boxShadow: "0 4px 20px rgba(196,98,45,0.3)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#9e4e23";
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow =
                                    "0 8px 30px rgba(196,98,45,0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#C4622D";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 4px 20px rgba(196,98,45,0.3)";
                            }}
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    {/* Extra */}
                    <p className="text-xs text-center mt-6" style={{ color: "#444444" }}>
                        <Link to="/forgot-password" className="hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
}
