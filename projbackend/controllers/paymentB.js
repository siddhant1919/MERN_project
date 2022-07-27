const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: 'hs2cxywjty3gzcgv',
  publicKey: '8vvyytfcmp88w7z7',
  privateKey: 'd057d6d02c032841edafe937692e65d7'
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  });
}

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce

  let amountFromTheClient = req.body.amount
  gateway.transaction.sale({
    amount: amountFromTheClient,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, (err, result) => {
    if (err) {
      res.status(500).json(error)
    } else {
      res.json(result)
    }
  });
}