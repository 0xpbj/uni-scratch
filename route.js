import { UniswapPair, ChainId } from 'simple-uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x0391d2021f89dc339f60fff84546ea23e337750f';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';

const uniswapPair = new UniswapPair({
  // the contract address of the token you want to convert FROM
  fromTokenContractAddress,
  // the contract address of the token you want to convert TO
  toTokenContractAddress,
  // the ethereum address of the user using this part of the dApp
  ethereumAddress,
  // you can pass in the provider url as well if you want
  // providerUrl: YOUR_PROVIDER_URL,
  chainId: ChainId.MAINNET,
});

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

// the amount is the proper entered amount
// so if they enter 10 pass in 10
// it will work it all out for you
const trade = await uniswapPairFactory.trade('100');

// // subscribe to quote changes
// trade.quoteChanged$.subscribe((value: TradeContext) => {
//   // value will hold the same info as below but obviously with
//   // the new trade info.
// });

console.log('TRADE INFORMATION: ', trade);

// once done with trade aka they have sent it and you don't need it anymore call
trade.destroy();