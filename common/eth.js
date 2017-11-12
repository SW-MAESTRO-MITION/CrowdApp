const constant = require('./const.js');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const crowdFundAbi = require('../../smartcontract/build/contracts/CrowdFund.json')["abi"];
const walletCompatibleTokenAbi = require('../../smartcontract/build/contracts/WalletCompatibleToken.json')["abi"];

const crowdFundContractAddress = constant.crowdFundContractAddress;
const walletCompatibleTokenContractAddress = constant.walletCompatibleTokenContractAddress;

address = web3.personal.newAccount("password");
web3.personal.unlockAccount(address, "password");
console.log(address);

console.log("Start EOA Account Balance= " + web3.eth.getBalance(constant.eoaAccount));

exports.CrowdSaleContract = function () {
    return web3.eth.contract(crowdFundAbi).at(crowdFundContractAddress);
};
console.log("Start EOA Token Balance= " + this.CrowdSaleContract().balanceOf(constant.eoaAccount));


exports.WalletCompatibleTokenContract = function () {
    return web3.eth.contract(walletCompatibleTokenAbi).at(walletCompatibleTokenContractAddress);
};

exports.sendTransaction = function (from, to, value, callback) {
    web3.eth.sendTransaction({
        to: to,
        from: from,
        value: value,
        gas: 100000
    }, function (err, res) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        return callback(null, res);
    });
};

exports.getBalance = function (address) {
    return web3.eth.getBalance(address);
};

exports.checkTransaction = function (id, callback) {

    if (web3.eth.getTransaction(id) !== null) {
        console.log('mining done');
        return callback(null, id);
    }

    //setTimeout(function(){
    //    if (web3.eth.getTransaction(id) !== null) {
    //        clearTimeout(timer);
    //        return callback(id);
    //    }
    //}, 3000);

    this.checkTransaction(id,callback);
};

exports.getTransactionReceipt = function (id, callback) {
    this.checkTransaction(id, function(err, res) {
        web3.eth.getTransactionReceipt(id, function (err, res) {
            if (err) {
                return callback(err);
            }
            return callback(null, res);
        });
    })
}