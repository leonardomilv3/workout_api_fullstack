import { BrowserRouter, Routes, Route} from 'react-router-dom';

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<h1>Home</h1>}/>
            
            <Route path='auth'>
                <Route path='/signin' element={<h1>Sign In</h1>}/>
                <Route path='/signuṕ' element={<h1>Sign Up</h1>}/>
            </Route>

            <Route path='/users' element={<h1>Users</h1>}/>
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;