const eth = require('../common/eth.js');
const constant = require('../common/const.js');

console.log("Start TaxiDriver Token of mainAccount= " + eth.WalletCompatibleTokenContract().balanceOf(constant.mainAccount).toString());

exports.sendTokenToEOA = function(eoaAddress, value, callback) {
    eth.WalletCompatibleTokenContract().transfer(
        eoaAddress,
        value,
        {from: constant.mainAccount},
        function (err, res) {
        if (err) {
            console.log(err);
            return callback(err);
        } else {
            return callback(null, res);
        }
    })
};

exports.getTransferInformation = function (txId, callback) {
    eth.getTransactionReceipt(txId, function (err, res) {
        console.log(res);
        console.log(res.logs[0].data);
        //console.log(res.logs[0].topics);
    });
};

eth.WalletCompatibleTokenContract().Transfer().watch(function(err, res) {
    console.log("Transfer event!");
    console.log(res);

    //Contract에서 Transfer가 호출되었을때의 로직을 구현
});



