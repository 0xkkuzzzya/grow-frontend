import styled from "styled-components";
import USQBalance from '../../../assets/svg/USQLogo.webp'
import { MyPageHeader } from "./MyPageHeader/MyPageHeader";
import { useToggleTheme } from "../../../hooks/useToggleTheme";
import { useBalancesStore, useTokenBalanceStore } from "../../../hooks/useBalanceStore";
import { useConnectKeplrWalletStore } from "../../../hooks/useConnectKeplrWalletStore";
import { TokenBalance } from "./MyPageBalance/TokenFieldBalance/TokenFieldsBalance";
import { TOKEN_INFO } from "../../../constants";
import { useEffect } from "react";
import { UpdateBalances } from "../../../connection/balances";
import { useWallet } from "../../../hooks/useWallet";
import { UpdatePosition } from "../../../connection/position";
import { Lend, Loan, useLendStore, useLoanStore, usePositionStore } from "../../../hooks/usePositionStore";
import { GetLendById } from "../../../connection/lend";
import { GetLoanById } from "../../../connection/loan";
import { GetPriceByDenom } from "../Borrow/BorrowInfo/BorrowInfo";
import { TokenInfo } from "../../../constants/tokens";

const MyPageBlock = styled.div`
    width: 100%;
    margin-bottom: 50px;
`


const Block = styled.div <{ backgroundColor: string }>`
    width: 100%;
    height: calc(100vh - 65px);
    background: ${props => props.backgroundColor};
    margin-top: -5px;
    @media (max-width: 450px) {
        height: 100%;
    }
`

const MyPageContainer = styled.div`
    max-width: 570px;
    margin: 0 auto;
    @media (max-width: 570px) {
        padding: 0 20px;
        max-width: 500px;
    }
`

const HeaderBlock = styled.div <{ TextColor: string }>`
    width: 100%;
    color: ${props => props.TextColor};
`

const BalanceBlock = styled.div`
    width: 100%;
`

const BalanceText = styled.h1 <{ TextColor: string }>`
    margin-top: 20px;
    margin-bottom: 30px;
    color: ${props => props.TextColor};
    font-size: 65px;
    display: flex;
    align-items: center;
    @media (max-width: 570px) {
        font-size: 60px;
    }
`

const BalanceImg = styled.img`
    width: 40px;
    height: 40px;
    margin-left: 10px;
`

const DynamicBlock = styled.div`
    width: 100%;
    height: 10px;
    border-radius: 20px;
    background: repeating-linear-gradient(to right, rgb(119, 191, 249), rgb(45, 150, 255));
`
// rgb(119, 191, 249), rgb(45, 150, 255)
const ContainerBlock = styled.div`
    
`

export function GetInfoFromTokenInfo(denom: string): TokenInfo {
    let token = TOKEN_INFO.find((token) => denom == token.Denom)
    if(token === undefined) {
        token = {
            Denom: "",
            Base: "",
            Network: "",
            Logo: "",
            Decimals: 0
        }
    }
    return token
} 


export const MyPage = () => {

    const [ theme, setTheme] = useToggleTheme()
    const [ connectWallet, setConnectWallet ] = useConnectKeplrWalletStore();
    const [ balances, setBalances ] = useBalancesStore();
    const [ tokenBalances, setTokenBalanceStore] = useTokenBalanceStore()
    const [ wallet, setWallet ] = useWallet();

    let BalancesAmount
    

    if(!connectWallet.connected || balances.length == 0) {
        BalancesAmount = 0
    } else {
        let sum_amount = 0
        tokenBalances.map((balance) => {
            sum_amount += (balance.Amount * balance.Price)
        })
        BalancesAmount = sum_amount.toFixed(0)
    }

    return (
        <Block backgroundColor={theme.backgroundColor}>
            <MyPageBlock>
                <MyPageContainer>
                    <HeaderBlock TextColor={theme.TextColor}>
                        <h1 style={{ fontSize: "30px", fontWeight: "600" }}>My Portfolio</h1>
                    </HeaderBlock>
                    <BalanceBlock>
                        <BalanceText TextColor={theme.TextColor}>{BalancesAmount}<BalanceImg src={USQBalance}></BalanceImg>
                        </BalanceText>
                    </BalanceBlock>
                    <DynamicBlock />
                    <ContainerBlock>
                        <MyPageHeader></MyPageHeader>
                    </ContainerBlock>
                </MyPageContainer>
            </MyPageBlock>
        </Block>
    )
}