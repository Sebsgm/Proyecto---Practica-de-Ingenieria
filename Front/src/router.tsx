import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginView from './view/LoginView'
import RegisterView from './view/RegisterView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path='/auth/login' element={<LoginView />} />

                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}