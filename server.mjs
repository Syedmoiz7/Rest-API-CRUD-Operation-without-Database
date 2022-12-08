import express from 'express';
import path from 'path'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(epxress.json());

let products = [] // connect with mongodb

app.post('/addproduct', (req, res) => {
  const body = req.body;

  if (
    !body.name
    && !body.price
    && !body.description
  ) {
    res.status(400).send("require parameters missing");
    return
  }
  console.log(body.name);
  console.log(body.price);
  console.log(body.description);

  products.push({
    id: new Date().getTime(),
    name: body.name,
    price: body.price,
    description: body.description
  })

  res.send("product added successfully");
})

app.get('/products', (req, res) => {
  res.send(products)
})

app.get('/product/:id', (req, res) => {
  const id = req.params.id;

  let isFound  = false
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      res.send(products[i]);
      break;
    }
  }

  res.status(404);
  res.send("product not found");

  res.send(products)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});