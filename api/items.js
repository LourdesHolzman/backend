
const Contenedor = require( './index' )

const tuContenedor = new Contenedor( "d2Text.json" )

const bd = 'd2Text.json'

// Methods 

const getItems = (res) => tuContenedor.getAll().then(response => res.send(response));

const getItemById = (req, res) => {
    tuContenedor.getById(req.params.id)
        .then(r => res.send(r !== null ? r : {err: 'producto no encontrado'}));
}

const postItem = (req, res) => {
    let { name, price, img } = req.body;
    let newItem = {
        name: name, 
        price: price, 
        img: img, 
        id: bd.length !== 0 ? (bd[bd.length - 1].id) + 1 : 1
    }
    tuContenedor.save(newItem).then(response => res.send(response))
};

const deleteItem = (req, res) => {
    tuContenedor.deleteById(req.params.id).then(r => res.send(`
        El item con id: ${req.params.id} fue borrado.
        Stock: ${r}
    `))
}

const editItem = (req, res) => tuContenedor.editById(req.params.id, req.body).then(r => res.send(r))


module.exports = { getItems, getItemById, postItem, deleteItem, editItem };