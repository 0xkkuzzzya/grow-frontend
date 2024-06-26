import styled from "styled-components";
import { useToggleTheme } from "../../../../../hooks/useToggleTheme";
import { useBalancesStore, useTokenBalanceStore } from "../../../../../hooks/useBalanceStore";
import { TOKEN_INFO } from "../../../../../constants/tokens";
import { myFixed } from "../../MyPageDeposit/TokenFieldDeposit/TokenFieldDeposit";
import { GetPriceByDenom } from "../../../Borrow/BorrowInfo/BorrowInfo";
import { useEffect, useState } from "react";
import { useClient } from "../../../../../hooks/useClient";

export interface TokenBalance {
    Display: string,
    Logo: string,
    Amount: number,
    Price: number,
}

const FieldArr = styled.div`
    overflow: visible;
    margin-bottom: 100px;
`

const FieldBlock = styled.div <{BorderField: string}>`
    width: 100%;
    height: 60px;
    border: 2px solid red;
    border-radius: 17px;
    margin-top: 10px;
    font-family: 'Inter', sans-serif;
    border: ${props => props.BorderField};
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const TokenImg = styled.img`
    width: 45px;
    margin-left: 15px;
    border-radius: 50px;
`

const TokenNameBlock = styled.div`
    display: flex;
    align-items: center;
`

const TokenName = styled.a <{TextColor: string}>`
    font-size: 20px;
    font-weight: 700;
    margin-left: 10px;
    color: ${props => props.TextColor};
`

const AmountBlock = styled.div <{TextColor: string}>`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    text-align: right;
    margin-right: 15px;
    color: ${props => props.TextColor};
`

const MainAmountText = styled.a`
    font-size: 20px;
    font-weight: 700;
`

const SecondAmountText = styled.a`
    font-size: 14px;
    font-weight: 700;
    color: rgba(192, 192, 192, 1);
`

export const TokenFieldBalanceDesktop = () => {

    const [ theme, setTheme] = useToggleTheme();
    const [ tokenBalances, setTokenBalanceStore] = useTokenBalanceStore()


    let Balances = tokenBalances.map((balance) => 
        <FieldBlock BorderField={theme.BorderField}>
            <TokenNameBlock>
                <TokenImg src={balance.Logo}></TokenImg>
                <TokenName TextColor={theme.TextColor}>{balance.Display}</TokenName>
            </TokenNameBlock>
            <AmountBlock TextColor={theme.TextColor}>
                <MainAmountText>{myFixed(balance.Amount , 4)} {balance.Display}</MainAmountText>
                <SecondAmountText>{myFixed(balance.Amount * balance.Price, 2)} USQ</SecondAmountText>
            </AmountBlock>
        </FieldBlock>
    )

    return(
        <FieldArr>
            {Balances}
        </FieldArr>
    )
}


export const TokenFieldBalanceMobile = () => {

    const [ theme, setTheme] = useToggleTheme()
    const [ tokenBalances, setTokenBalanceStore] = useTokenBalanceStore()

    const Balances = tokenBalances.map((balance) => 
        <FieldBlock BorderField={theme.BorderField}>
            <TokenImg src={balance.Logo}></TokenImg>
            <TokenName TextColor={theme.TextColor}>{balance.Display}</TokenName>
            <AmountBlock TextColor={theme.TextColor} style={{marginLeft: "auto"}}>
                <MainAmountText>{myFixed(balance.Amount, 4)} {balance.Display}</MainAmountText>
                <SecondAmountText>{myFixed(balance.Amount * balance.Price, 2)} USQ</SecondAmountText>
            </AmountBlock>
        </FieldBlock>
    )

    return(
        <FieldArr>
            {Balances}        
        </FieldArr>
    )
}