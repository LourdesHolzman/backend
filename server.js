
const path = require("path")
const express = require("express")

const app = express()
const PORT = process.env.PORT || 8080

const Contenedor = require( './index' )

const tuContenedor = new Contenedor( "d2Text.json" )

            app.get('/', (req, res) =>{
                res.send(`<h1 style="color: orange">Hola Mundo</h1>`)
            })

            app.get('/productos', (req, res) =>{
                fs.readFile("./d2Text.json" , "utf-8", (err, data)=>{
                    if(err){
                        console.log("Error");
                    }else{
                        let newArr = JSON.parse(data)
                        res.send(newArr)
                    }
                })
            })

            app.get('/random', (req, res) =>{
                fs.readFile("./d2Text.json" , "utf-8", (err, data)=>{
                    if(err){
                        console.log("Error");
                    }else{
                        let newArray = JSON.parse(data)
                        let random = newArray[Math.floor(Math.random() * newArray.length)];
                        console.log(Math.floor(Math.random() * newArray.length));
                        res.send(random)
                    }
            })
        })

        app.listen(PORT, () => {
            console.log("Server run en port " + PORT);
        })
        
        console.log((req,res) =>{

            res.json( tuContenedor.getAll() )
            
            })