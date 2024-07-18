import './App.css';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from "./pages/HomePage";
import JobPage from "./pages/JobPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobsPage from "./pages/JobsPage";
import AddJobPage from "./pages/AddJobPage";



const App = () => {
    const addJob = async (newJob) => {
        try {
            await fetch('http://localhost:3001/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newJob)
            });
        } catch (err) {
            console.log('Error adding job', err);
        }
    }
    const deleteJob = async (id) => {
        try {
            await fetch(`http://localhost:3001/jobs/${id}`, {
                method: 'DELETE',
            });
        } catch (err) {
            console.log('Error deleting job', err);
        }
    }
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path ='/jobs' element={<JobsPage/>}/>
                <Route path ='/jobs/:id' element={<JobPage/>} deleteJob={deleteJob} />
                <Route path ='/add-job' element={<AddJobPage/>} addJobSubmit={addJob}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        )
    );
    return (
        <RouterProvider router={router}></RouterProvider>
);
};
export default App;