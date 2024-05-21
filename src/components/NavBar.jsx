import {Container, Navbar} from "react-bootstrap";
import {Outlet} from "react-router-dom";


export default function NavBar(){
    return (
        <>
            <Navbar expand="lg" className="bg-body-secondary" style={{height:'10vh'}}>
                <Container>
                    <Navbar.Brand href="/">Music Archive</Navbar.Brand>
                </Container>
            </Navbar>
            <Outlet/>
        </>
    )
}