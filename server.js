
const path = require("path")
const express = require("express")

const app = express()
const PORT = process.env.PORT || 8080

// Bodyparser > para capturar el contenido del form 
const bodyParser = require('body-parser')

const userRoutes = require('./routes/items-routes');
const multer = require('multer')

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

           


            app.use(express.json())
            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({extended: false}))
            app.use('/api', userRoutes)

            

        let storage = multer.diskStorage({
            destination: path.resolve(__dirname, './public/images'), 
            filename: (req, file, cb) => {
                cb(null, 'upload' + Date.now() + path.extname(file.originalname));
            }
        });

    //    let storage = multer.diskStorage({
    //            destination: function (req, file,cb) {
    //              cb(null, 'upload' + file.originalname);
    //          }
    //        });

        let upload = multer({ storage });
        
        app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
        })

        

        const file =req.file;

        app.post("/", upload.single("upload_file"), (req, res)=> {
            console.log(req.file);
        })

       // if (!file){
       //     res.status(400).send({ message:"Error al cargar la imagen"});
        //    return;
       // }
       // res.send({ message:"Archivo cargado"});


     
        
        console.log((req,res) =>{

            res.json( tuContenedor.getAll() )
            
            })

   app.listen(8080, () => {
            console.log("Server ok ");
            })
