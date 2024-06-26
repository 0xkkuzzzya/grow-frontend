import { useState } from "react";
import styled from "styled-components";
import { useAmountBorrowInfoStore, useAmountBorrowRepayEarnStore } from "../../../hooks/useAmountInStore";
import { QUBE_TESTNET_INFO, TOKEN_INFO } from "../../../constants";
import { useLoanStore, usePositionStore, useRiskRate } from "../../../hooks/usePositionStore";
import { useWallet } from "../../../hooks/useWallet";
import { useShowTransactionModalRepay, useShowWalletModal } from "../../../hooks/useShowModal";
import { DeleteBorrow } from "../../../functions/borrow";
import { useClient } from "../../../hooks/useClient";
import { useBalancesStore } from "../../../hooks/useBalanceStore";
import { getBalance } from "../../Page/Earn/EarnDeposit/DepositConfirm/EarnDepositConfirm";
import { RepayModal } from "../../Modal/RepayPageModal/ConfirmModal";
import { useToggleTheme } from "../../../hooks/useToggleTheme";
import { Modal } from "../../Modal/Modal";

const Button = styled.button`
    width: 250px;
    height: 40px;
    background: linear-gradient(to right, #6db8ff, #0089ff);
    border: none;
    margin-top: 40px;
    border-radius: 10px;
    cursor: pointer;
`

const ConfirmButton = styled.button`
    width: 90%;
    height: 50px;
    font-size: 19px;
    font-weight: 700;
    background: linear-gradient(to right, #6db8ff, #0089ff);
    border: none;
    margin: 0 auto;
    border-radius: 12px;
    cursor: pointer;
    color: #fff;
    margin-top: 20px;
    transition: all .15s ease-in-out;
    &:active {
         transform: scale(0.95);
    }
`

const ButtonBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const ButtonText = styled.a`
    font-weight: 700;
    font-size: 18px;
    color: #fff;
`

const InsufficientConfirmButton = styled.button`
    width: 90%;
    height: 50px;
    font-size: 19px;
    font-weight: 700;
    background: #757575;
    border: none;
    margin: 0 auto;
    border-radius: 12px;
    cursor: pointer;
    color: #fff;
    margin-top: 20px;
    transition: all .15s ease-in-out;
    font-family: 'Inter', sans-serif;
    &:active {
         transform: scale(0.95);
    }
`

export async function GetPriceByDenom(denom: string): Promise<number> {
    var price = await fetch(QUBE_TESTNET_INFO.rest + `/core/oracle/v1beta1/denoms/${denom}/exchange_rate`)
    var pricejson = await price.json()
    return Number(pricejson.exchange_rate)
} 

export const RepayConfirm = () => {
    const [ wallet, _ ] = useWallet();
    const [ position, setPosition ] = usePositionStore();
    const [ borrow_info, setBorrowInfo ] = useAmountBorrowInfoStore();
    const [ amtIn, setAmountBorrowRepayEarnStore ] = useAmountBorrowRepayEarnStore();
    const [ price, setPrice ] = useState(0);
    const [ walletModalStatus, setWalletModalStatus] = useShowWalletModal();
    const [ client, setClient] = useClient();
    const [ balances, setBalances] = useBalancesStore();
    const [ loans, setLoans] = useLoanStore();
    const [ ShowTransactionModalRepay, setShowTransactionModalRepay] = useShowTransactionModalRepay();
    const [ theme, setTheme] = useToggleTheme();

    const open = () => { setShowTransactionModalRepay({ b: true, isPending: ShowTransactionModalRepay.isPending, status: "" }) };
    const close = () => { setShowTransactionModalRepay({ b: false, isPending: false, status: "" }) };

    let Button: any;
    let temp_token = TOKEN_INFO.find((token) => token.Denom == amtIn.base )
    let temp_loan = loans.find((loan) => loan.amountOut_denom == temp_token?.Denom)
    let balance = getBalance(balances, String(temp_token?.Denom))

    const ModalComponent = Modal(
        ShowTransactionModalRepay.b,
        close,
        RepayModal(
            theme.TextColor,
            temp_token?.Logo? temp_token?.Logo : "",
            temp_token?.Base? temp_token?.Base : "",
            amtIn.amt,
            amtIn,
            wallet,
            client,
            close,
        ),
        theme.modalBgColor,
        theme.modalBorder
    )

    if (wallet.init == false) {
        Button = <ButtonBlock onClick={() => {setWalletModalStatus({b: true})}}>
                <ConfirmButton>Connect wallet</ConfirmButton>
            </ButtonBlock>
    } else {
        if (borrow_info.base == "Select Token") {
            Button = <ButtonBlock>
                <InsufficientConfirmButton>Select Token</InsufficientConfirmButton>
            </ButtonBlock>
        } else if (temp_loan === undefined) {
            Button = <ButtonBlock>
                <InsufficientConfirmButton>No {temp_token?.Base} loans</InsufficientConfirmButton>
            </ButtonBlock>
        } else if (amtIn.amt == '' || amtIn.amt == '0' || isNaN(Number(amtIn.amt))) {
            Button = <ButtonBlock>
                <InsufficientConfirmButton>Enter {borrow_info.base} amount</InsufficientConfirmButton>
            </ButtonBlock>
        } else if (Number(amtIn.amt) > Number(balance)) {
            Button = <ButtonBlock>
                <InsufficientConfirmButton>Insufficient {temp_token?.Base} balance</InsufficientConfirmButton>
            </ButtonBlock>
        } else {
            Button = <>
                <ButtonBlock>
                    <ConfirmButton onClick={open}>Confirm</ConfirmButton>
                </ButtonBlock>
                {ModalComponent}
            </>
        }
    }
    return(
        <>{Button}</>
    )
}