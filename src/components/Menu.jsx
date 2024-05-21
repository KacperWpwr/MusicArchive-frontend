import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {deleteSong, getSongs} from "../requests/songs";
import api_path from "../api_path";
import {MDBIcon} from "mdb-react-ui-kit";
import {logDOM} from "@testing-library/react";


export default function Menu(){
    const [songSelected,setSongSelected] = useState(false)
    const [songs, setSongs] = useState([])


    useEffect(()=>{
        const fetch_data = async ()=>{
            const response = await getSongs()

            if (response.ok){
                const body = await response.json()

                setSongs(body.songs)
            }else{
                alert("Error")
            }
        }

        fetch_data()

    },[])

    return(
        <Container style={{height:'90vh'}}>

                <Row className={getDisplayClasses(songSelected)}>
                    <Row className=" h-25 d-flex justify-content-center" lg={5}>
                        <Col className="align-items-center d-grid">
                            <Button onClick={()=>navigateToAddSong()}>
                                Add Song
                            </Button>
                        </Col>
                    </Row>
                    <Row className="h-75">

                        <Col className="overflow-y-scroll ">
                            <Row lg={5}>
                                {songs.map(song=>(
                                    <Col>
                                        <Card>
                                            <Card.Img
                                                onClick={()=>{
                                                    setSongSelected(song.songFileName)
                                                }}
                                                src={api_path+'file/image?fileName='+song.imageFileName} height={100}/>
                                            <Card.Body>
                                                <Card.Title>
                                                    {song.title}
                                                </Card.Title>
                                                <Card.Body>
                                                    <Row>
                                                        {song.artist}
                                                    </Row>
                                                    <Row className="mt-1 d-flex justify-content-end h-50" lg={6}>
                                                        <Col>
                                                            <MDBIcon
                                                                className="song-play"
                                                                onClick={()=>{
                                                                    setSongSelected(song.songFileName)
                                                                }}
                                                                fas icon="play-circle" />
                                                        </Col>
                                                        <Col>
                                                            <MDBIcon
                                                                className="song-remove"
                                                                onClick = {()=>{
                                                                         delete_song(song.id)}}
                                                                fas icon="trash-alt"  />
                                                        </Col>
                                                    </Row>

                                                </Card.Body>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Row>
                <Row className={getPlayerClasses(songSelected)}>
                    {
                        songSelected?
                            <audio className='h-50' src={api_path+'file/image?fileName='+songSelected}
                                   controls={true}>

                            </audio>
                            : <></>
                    }
                </Row>

        </Container>
    )
}

function navigateToAddSong(){
    window.location.pathname = '/addsong'
}
async function delete_song(id){

    const result = window.confirm("Are you sure you want to delete this song?")
    if(result){
        const response = await deleteSong(id)

        if (response.ok){
            alert("Song deleted succesfully")
            window.location.reload()
        }else{
            alert("An unexpected error occurred")
        }
    }
}

function getPlayerClasses(songSelected){
    let classes = 'd-flex'

    if (!songSelected){
        classes ='d-none'
    }

    return classes
}

function getDisplayClasses(songSelected){
    return songSelected ? 'h-75' : 'h-100'
}