import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_BASE, getUserToken, removeUserToken } from "../config/api"
import { toYouTubeEmbedUrl } from "../utils/youtube"

function resolveDocumentUrl(url: string): string {
    if (url.startsWith("http://") || url.startsWith("https://")) return url
    const p = url.startsWith("/") ? url : `/${url}`
    return `${API_BASE}${p}`
}

type CourseVideo = {
    id: number
    url: string
    title: string | null
}

type CourseFile = {
    id: number
    name: string
    url: string
}

type Course = {
    id: number
    title: string
    description: string | null
    videos: CourseVideo[]
    files: CourseFile[]
}

export default function CursoView() {
    const navigate = useNavigate()
    const [cursos, setCursos] = useState<Course[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = getUserToken()

        // Si no hay token, redirigir al login inmediatamente
        if (!token) {
            navigate("/auth/login", { replace: true })
            return
        }

        let cancelled = false
        ;(async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`${API_BASE}/api/courses/private`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // Token expirado o inválido → limpiar y redirigir al login
                if (res.status === 401 || res.status === 403) {
                    removeUserToken()
                    navigate("/auth/login", { replace: true })
                    return
                }

                if (!res.ok) {
                    if (!cancelled) setError("No se pudieron cargar los cursos")
                    return
                }

                const data = await res.json()
                if (!cancelled && Array.isArray(data)) setCursos(data)
            } catch {
                if (!cancelled) setError("Comprueba que el servidor esté en marcha")
            } finally {
                if (!cancelled) setLoading(false)
            }
        })()
        return () => {
            cancelled = true
        }
    }, [navigate])

    const handleLogout = () => {
        removeUserToken()
        navigate("/pag/home", { replace: true })
    }

    return (
        <div className="min-h-screen bg-[#F4EDE4] px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black text-[#2C2C2C]">
                        Nuestros cursos
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
                        style={{ background: "#C4622D" }}
                    >
                        Cerrar sesión
                    </button>
                </div>

                {loading && (
                    <p className="text-center text-[#444]">Cargando cursos…</p>
                )}

                {error && (
                    <p className="text-center text-red-600 font-medium mb-6">{error}</p>
                )}

                {!loading && !error && cursos.length === 0 && (
                    <p className="text-center text-[#444]">Aún no hay cursos publicados.</p>
                )}

                <div className="flex flex-col gap-10">
                    {cursos.map((curso) => (
                        <div key={curso.id} className="bg-white p-6 rounded-2xl shadow-md">
                            <h2 className="text-xl font-bold text-[#2C2C2C] mb-2">{curso.title}</h2>
                            {curso.description && (
                                <p className="text-sm text-[#444] mb-6">{curso.description}</p>
                            )}

                            <h3 className="font-semibold mb-3 text-[#2C2C2C]">Videos</h3>
                            {(() => {
                                const valid = (curso.videos || []).filter((v) =>
                                    Boolean(toYouTubeEmbedUrl(v.url || ""))
                                )
                                if (valid.length === 0) {
                                    return (
                                        <p className="text-sm text-gray-500 mb-6">No hay videos todavía.</p>
                                    )
                                }
                                return (
                                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                                        {valid.map((video) => {
                                            const src = toYouTubeEmbedUrl(video.url)
                                            return (
                                                <div key={video.id} className="space-y-1">
                                                    {video.title && (
                                                        <p className="text-sm font-medium text-[#2C2C2C]">
                                                            {video.title}
                                                        </p>
                                                    )}
                                                    <iframe
                                                        className="w-full h-48 rounded-lg border-0"
                                                        src={src}
                                                        title={video.title || `video-${video.id}`}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })()}

                            <h3 className="font-semibold mb-3 text-[#2C2C2C]">Documentos</h3>
                            <div className="flex flex-wrap gap-3">
                                {curso.files?.length ? (
                                    curso.files.map((pdf) => (
                                        <a
                                            key={pdf.id}
                                            href={resolveDocumentUrl(pdf.url)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 rounded-lg border border-[#e8ddd2] text-sm text-[#2C2C2C] hover:bg-[#F4EDE4] transition-colors"
                                        >
                                            {pdf.name}
                                        </a>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-500">No hay documentos.</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
