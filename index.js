import {
  ChainId,
  Token,
  WETH,
  Fetcher,
  Trade,
  Route,
  TokenAmount,
  TradeType,
  Pair
} from '@uniswap/sdk'

import { InfuraProvider } from '@ethersproject/providers'

const chainId = ChainId.MAINNET
const provider = new InfuraProvider("homestead", {
  projectId: "bxxxxb",
  projectSecret: "4xxx04f"
});


// No HTTP Requests Here Providers
const ETH_DAI = async () => {
  const DAI = new Token(chainId, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
  // Below token amounts need to be queried from the Graph and moved X decimal places
  const pair = new Pair(
    // Reserve0
    new TokenAmount(DAI, '43006064819900678626939456'),
    // Reserve1
    new TokenAmount(WETH[chainId], '17185124725030407090726')
  )
  const route = new Route([pair], WETH[chainId])
  const trade = new Trade(route, new TokenAmount(WETH[chainId], '100000000000000000000'), TradeType.EXACT_INPUT)
  console.log('Direct Trade: ETH => DAI')
  console.log('Route: ', route.path)
  console.log('Route MidPrice: ', route.midPrice.toSignificant(6))
  console.log('Exec price: ', trade.executionPrice.toSignificant(6))
  console.log('Mid prices: ', trade.nextMidPrice.toSignificant(6))
  console.log('Price Impact: ', trade.priceImpact.toSignificant(3))
  console.log('\n\n\n\n\n')
}

const ETH_USDC_DAI = async () => {
  const DAI = await Fetcher.fetchTokenData(chainId, '0x6B175474E89094C44Da98b954EedeAC495271d0F', provider, 'DAI', 'Dai Stablecoin')
  const USDC = await Fetcher.fetchTokenData(chainId, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', provider, 'USDC', 'USD Coin')
  const USDCWETHPair = await Fetcher.fetchPairData(USDC, WETH[chainId], provider)
  const DAIUSDCPair = await Fetcher.fetchPairData(DAI, USDC, provider)
  const route = new Route([USDCWETHPair, DAIUSDCPair], WETH[chainId])
  const trade = new Trade(route, new TokenAmount(WETH[chainId], '1000000000000000000'), TradeType.EXACT_INPUT)
  console.log('Indirect Trade: ETH => USDC => USDC')
  console.log('Route: ', route.path)
  console.log('Route MidPrice: ', route.midPrice.toSignificant(6))
  console.log('Exec price: ', trade.executionPrice.toSignificant(6))
  console.log('Mid prices: ', trade.nextMidPrice.toSignificant(6))
  console.log('Price Impact: ', trade.priceImpact.toSignificant(3))
  console.log('\n\n\n\n\n')
}

const MCB_ETH_DYP = async () => {
  const MCB = await Fetcher.fetchTokenData(chainId, '0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42', provider, 'MCB', 'MCDex Token')
  const DYP = await Fetcher.fetchTokenData(chainId, '0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17', provider, 'DYP', 'Defi Yield Protocl')
  const pair1 = await Fetcher.fetchPairData(MCB, WETH[chainId], provider)
  const pair2 = await Fetcher.fetchPairData(WETH[chainId], DYP, provider)
  const route = new Route([pair1, pair2], MCB)
  const trade = new Trade(route, new TokenAmount(MCB, '1000000000000000000'), TradeType.EXACT_INPUT)
  console.log('Ugly Trade: MCB => ETH => DYP')
  console.log('Route: ', route.path)
  console.log('Route MidPrice: ', route.midPrice.toSignificant(6))
  console.log('Exec price: ', trade.executionPrice.toSignificant(6))
  console.log('Mid prices: ', trade.nextMidPrice.toSignificant(6))
  console.log('Price Impact: ', trade.priceImpact.toSignificant(3))
  console.log('\n\n\n\n\n')
}

const MCB_USDC_DYP = async () => {
  const MCB = await Fetcher.fetchTokenData(chainId, '0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42', provider, 'MCB', 'MCDex Token')
  const DYP = await Fetcher.fetchTokenData(chainId, '0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17', provider, 'DYP', 'Defi Yield Protocl')
  const USDC = await Fetcher.fetchTokenData(chainId, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', provider, 'USDC', 'USD Coin')
  const pair1 = await Fetcher.fetchPairData(MCB, USDC, provider)
  const pair2 = await Fetcher.fetchPairData(USDC, DYP, provider)
  const route = new Route([pair1, pair2], MCB)
  const trade = new Trade(route, new TokenAmount(MCB, '1000000000000000000'), TradeType.EXACT_INPUT)
  console.log('Ugly Trade: MCB => USDC => DYP')
  console.log('Route: ', route.path)
  console.log('Route MidPrice: ', route.midPrice.toSignificant(6))
  console.log('Exec price: ', trade.executionPrice.toSignificant(6))
  console.log('Mid prices: ', trade.nextMidPrice.toSignificant(6))
  console.log('Price Impact: ', trade.priceImpact.toSignificant(3))
  console.log('\n\n\n\n\n')
}

await ETH_DAI()
// await ETH_USDC_DAI()
// await MCB_ETH_DYP()
// await MCB_USDC_DYP()
