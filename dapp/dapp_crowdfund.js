const eth = require('../common/eth.js');
const constant = require('../common/const.js');

//console.log(eth.CrowdSaleContract());


exports.sendCoinToFund = function (eoaAddress, value, callback) {
    console.log("Attempt to send 100 ether to crowdFund Contract");
    eth.sendTransaction(eoaAddress, constant.crowdFundContractAddress, value, function (err, res) {
        if (err) {
            return callback(err);
        } else {
            console.log('sendTransaction tx id= ' + res);
            return callback(null, res);
        }
    });
};
