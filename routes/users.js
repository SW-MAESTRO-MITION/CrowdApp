var express = require('express');
var router = express.Router();
var async = require('async');

var tokenDapp = require('../dapp/dapp_walletcompatibletoken.js');
var crowdFundDapp = require('../dapp/dapp_crowdfund.js');
var constant = require('../common/const.js');
var eth = require('../common/eth.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/try', function(req, res, next) {
  async.waterfall([
     function(callback) {
       tokenDapp.sendTokenToEOA(constant.eoaAccount, 500, function (err, res) {
         if (err) {
           return callback(new Error("Send Token Error"));
         } else {
           return callback(null, res);
         }
       });
     },
    function (txId, callback) {
      eth.checkTransaction(txId, function (err, res) {
        if (err) {
          return callback(new Error("Send Coin Error"));
        }
        tokenDapp.getTransferInformation(txId, function (err, res) {
          console.log(res.logs[0].data);
          console.log(res.logs[0].topics);
        });
        crowdFundDapp.sendCoinToFund(constant.eoaAccount, 100, function (err, res) {
          if (err) {
            return callback(new Error("Send Coin Error"));
          } else {
            return callback(null, res);
          }
        });
      });
    },
    function (txId, callback) {
      eth.checkTransaction(txId, function (err, res) {
        if (err)
          return callback(new Error("Send Coin Error"));

        return callback(null);
      });
    }
  ], function (err, result) {
    if (err) {
      console.log(err);
      res.send(400);
    }
    else {
      console.log("Final TaxiDriver Token Balance= " + eth.WalletCompatibleTokenContract().balanceOf(constant.mainAccount).toString());
      console.log("Final EOA Balance= " + eth.getBalance(constant.eoaAccount));
      console.log("Final EOA Token Balance= " + eth.CrowdSaleContract().balanceOf(constant.eoaAccount));

      res.send('success');
    }
  });

});
module.exports = router;
