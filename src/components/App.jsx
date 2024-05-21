import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./NavBar";
import Menu from "./Menu";
import AddSong from "./AddSong";


export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar/>}>
                    <Route path='' index={true} element={<Menu/>}/>
                    <Route path='addsong' element={<AddSong/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}