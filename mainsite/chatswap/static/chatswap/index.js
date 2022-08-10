console.log(window.ethereum);
let account = ethereum.request({ method: 'eth_requestAccounts'}).then(accounts => {
  console.log(accounts[0]);
  return accounts[0];
});
let parameters = {
  to: '0xE96E2181F6166A37EA4C04F6E6E2bD672D72Acc1',
  value: 'E8D4A51000',
}
account.then(result => {
  ethereum.request({ method: 'eth_sendTransaction', params: [{from: result, to: '0xE96E2181F6166A37EA4C04F6E6E2bD672D72Acc1',
  value: 'E8D4A51000'}] }).then(txhash => {
  console.log(txhash);
  });
  console.log(result);
});

//For some reason the account variable cannot store a value from the request using the .then method outside of the .then method
// meaning I can only use it within the parameters of .then, afterwards it loses value completely. 