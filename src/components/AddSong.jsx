import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import api_path from "../api_path";


export default function AddSong(){
    const [title,setTitle] = useState('')
    const [artist,setArtist] = useState('')

    const post_song = async ()=>{
        let formData = new FormData()

        formData.append('title',title)
        formData.append('artist',artist)
        formData.append('songImage',document.querySelector('input[name=image]').files[0])
        formData.append('songAudio',document.querySelector('input[name=song]').files[0])

        const response = await fetch(api_path+'songs',{
            method:'POST',

            body: formData
        })

        if (response.ok){
            alert("Song added!")
            window.location.pathname='/'
        }else{
            alert("An error occurred while uploading song!")
        }

    }

    return (
        <Container>
            <Row >

                <Col>
                    <Form className="mt-1">
                        <Row className="mt-1 d-flex justify-content-center" xl={4}>

                            <Col>
                                <Form.Label>
                                    Title
                                </Form.Label>
                                <Form.Control className="mt-2 " inputMode="text"
                                              value={title} onInput={(event)=>setTitle(event.target.value)}/>
                            </Col>

                            <Col>
                                <Form.Label>
                                    Artist
                                </Form.Label>
                                <Form.Control className="mt-2 " inputMode="text"
                                              value={artist} onInput={(event)=>setArtist(event.target.value)}/>
                            </Col>

                        </Row>
                        <Row className="mt-1 d-flex justify-content-center" lg={4}>

                            <Col>
                                <Form.Label className="text-center">
                                    Cover Image
                                </Form.Label>
                                <Form.Control className="mt-2 " type="file" name='image'/>
                            </Col>
                            <Col>
                                <Form.Label>
                                    Song
                                </Form.Label>
                                <Form.Control className="mt-2 " type="file"  name='song'/>
                            </Col>
                        </Row>
                        <Row className="mt-2 d-flex justify-content-center" lg={5}>
                            <Col className="d-flex justify-content-center">
                                <Button variant="primary" onClick={()=>post_song()} disabled={false}>
                                    Add Song
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>

            </Row>
        </Container>
    )
}