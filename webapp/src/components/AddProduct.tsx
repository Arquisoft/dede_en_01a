import React from 'react';
import {Alert, Button, Container, Grid, Input, TextareaAutosize, TextField, Typography} from "@mui/material"
import axios from "axios"
import {useEffect, useRef, useState} from "react"
import {useHistory} from "react-router-dom"
import {useUser} from "../context/UserContext"
import {Footer} from "./footer/Footer";


export const AddProduct = () => {
    const {token} = useUser()
    const apiEndPoint = process.env.REACT_APP_API_URI
    const history = useHistory()
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<number | string>('')
    const [error, setError] = useState<string>('')

    const [file, setFile] = useState<File>()

    useEffect(() => {
        console.log(file)
    }, [file])


    const handleUpload = (e: any) => {
        setFile(e.target.files[0])
        if (file != undefined && file && null) {
            if (file.name.split('.').pop() != 'jpg') {
                setError('Only jpg files are supported')
            } else {
                setError('')
            }
        }
    }

    const handleSubmit = async () => {
        if (file == undefined) {
            setError('file is required')
            return
        }
        try {
            let {data} = await axios.post(apiEndPoint + '/product/add', {
                name: name,
                price: price,
                description: description
            }, {
                headers: {
                    auth: token
                }
            })
            const fileData = new FormData()
            fileData.append("name", data._id)
            fileData.append("image", file)

            await axios.post(apiEndPoint + '/upload', fileData, {
                headers: {
                    auth: token
                }
            })
            history.push('/')
        } catch (error: any) {
            if (error.response && error.response.status == 401) {
                setError('you need to be logged in with a dede account')
            }
            console.log(error)
        }
    }

    return (
        <Container>
            <Grid container>
                <Grid item md={13}>
                    <Typography variant="h2">
                        Add product
                    </Typography>
                </Grid>
                <Grid item md={13} paddingTop={"1em"}>
                    <TextField
                        label='name'
                        placeholder='Enter name'
                        type='text'
                        fullWidth
                        required
                        value={name}
                        onChange={e => setName(e.currentTarget.value)}
                    />
                </Grid>
                <Grid item md={13} paddingTop={"1em"}>
                    <TextField
                        label='price'
                        placeholder='Enter price'
                        type='number'
                        fullWidth
                        required
                        value={price}
                        onChange={e => setPrice(e.currentTarget.value)}
                    />
                </Grid>
                <Grid item md={13} paddingTop={"1em"}>
                    <Button variant="contained" component="label">
                        Upload image
                        <Input
                            type="file"
                            id="input"
                            hidden
                            onChange={handleUpload}
                        />
                    </Button>
                </Grid>
                <Grid item md={13} paddingTop={"1em"}>
                    <TextareaAutosize
                        id="product-description"
                        placeholder="Description of the product"
                        style={{width: "100%"}}
                        value={description}
                        onChange={(e: any) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item md={13} paddingTop={"1em"}>
                    <Alert severity="error" hidden={error == ''}>{error}</Alert>
                </Grid>
                <Grid item md={13} paddingTop={"1em"}>
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={handleSubmit}
                    >
                        Add product
                    </Button>
                </Grid>
            </Grid>
            <Footer/>
        </Container>
    )
}