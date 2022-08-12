console.log(window.ethereum);
let account;
let sellModal = false;
let buyModal = false;
let buytoken;
let sellToken;

function getAccount() {
  account = ethereum.request({ method: 'eth_requestAccounts'}).then(accounts => {
    console.log(accounts[0]);
    return accounts[0];
  });
}
document.getElementById("login_button").onclick = function(){getAccount()};

function getModal() {
  document.getElementById("token_modal").style.display = "block";
}
function closeModal() {
  document.getElementById("token_modal").style.display = "none";
}
document.getElementById("buy_token").onclick = function(){
  getModal()
  buyModal = true;
  sellModal = false;
};
document.getElementById("sell_token").onclick = function(){
  getModal()
  sellModal = true;
  buyModal = false;
  };
document.getElementById("modal_close").onclick = function(){closeModal()};

// let parameters = {
//   to: '0xE96E2181F6166A37EA4C04F6E6E2bD672D72Acc1',
  // value: 'E8D4A51000',
// }
// account.then(result => {
//   ethereum.request({ method: 'eth_sendTransaction', params: [{from: result, to: '0xE96E2181F6166A37EA4C04F6E6E2bD672D72Acc1',
//   value: 'E8D4A51000'}] }).then(txhash => {
//   console.log(txhash);
//   });
//   console.log(result);
// });
//For some reason the account variable cannot store a value from the request using the .then method outside of the .then method
// meaning I can only use it within the parameters of .then, afterwards it loses value completely.