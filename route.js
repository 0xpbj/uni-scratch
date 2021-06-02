import { UniswapPair, ChainId } from 'simple-uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';

const uniswapPair = new UniswapPair({
  // the contract address of the token you want to convert FROM
  fromTokenContractAddress: fromTokenContractAddress.toLowerCase(),
  // the contract address of the token you want to convert TO
  toTokenContractAddress: toTokenContractAddress.toLowerCase(),
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

// console.log('TRADE ROUTE: ', trade.routeText);
console.log('TRADE: ', trade);

// once done with trade aka they have sent it and you don't need it anymore call
trade.destroy();