import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginView from './view/LoginView'
import RegisterView from './view/RegisterView'
import HomeView from './view/HomeView'
import CursoView from './view/CursoView'
import PagLayout from './layout/PagLayout'
import CpanelLoginView from './view/CpanelLoginView'
import CpanelDashboardView from './view/CpanelDashboardView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/pag/home" replace />} />
                <Route path="/auth/login" element={<LoginView />} />
                <Route path="/auth/register" element={<RegisterView />} />
                <Route path="/cpanel" element={<CpanelLoginView />} />
                <Route path="/cpanel/dashboard" element={<CpanelDashboardView />} />
                <Route element={<PagLayout />}>
                    <Route path="/pag/home" element={<HomeView />} />
                    <Route path="/pag/cursos" element={<CursoView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}