const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const stripe = require('stripe')('sk_test_lQpPF3SRUDKWO5EoxNrBBxPu00ku86fhTX'); // Add your Secret Key Here
const app = express();

var cors = require('cors');

// This will make our form data much more useful
app.use(bodyParser.urlencoded({ extended: true }));

// This will set express to render our views folder, then to render the files as normal html
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, './views')));

// Configurar cabeceras y cors
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// Future Code Goes Here

app.post("/pago_tarjeta", (req, res) => {
    stripe.charges.create(
        {
          amount: req.body.amount,
          currency: 'mxn',
          source: req.body.stripeToken,
          description: 'Gracias por tu donación',
        },
        function(err, charge) {
            
        }
      ).then(() => res.json({Respuesta: "Pago realizado con exito!"})).catch(err => console.log(err));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('server runing in port 3000'));