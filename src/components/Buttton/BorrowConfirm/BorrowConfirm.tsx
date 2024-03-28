import styled from "styled-components";
import { useAmountBorrowEarnStore, useAmountBorrowInfoStore } from "../../../hooks/useAmountInStore";
import { QUBE_TESTNET_INFO, TOKEN_INFO } from "../../../constants";
import { useRiskRate } from "../../../hooks/usePositionStore";
import { useWallet } from "../../../hooks/useWallet";
import { useShowTransactionModalBorrow, useShowWalletModal } from "../../../hooks/useShowModal";
import { CreateBorrow } from "../../../functions/borrow";
import { useClient } from "../../../hooks/useClient";
import { useAssetStore } from "../../../hooks/useAssetStore";
import { Modal } from "../../Modal/Modal";
import { BorrowModal } from "../../Modal/BorrowPageModal/ConfirmModal/ModalTransaction";
import { useToggleTheme } from "../../../hooks/useToggleTheme";

const Button = styled.button`
    width: 250px;
    height: 40px;
    background: linear-gradient(to right, #6db8ff, #0089ff);
    border: none;
    margin-top: 30px;
    border-radius: 10px;
    cursor: pointer;
`

export const ConfirmButton = styled.button`
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

export const ButtonBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
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
    &:active {
     transform: scale(0.95);
  }
`

export async function GetPriceByDenom(denom: string): Promise<number> {
    var price = await fetch(QUBE_TESTNET_INFO.rest + `/core/oracle/v1beta1/denoms/${denom}/exchange_rate`)
    var pricejson = await price.json()
    return Number(pricejson.exchange_rate)
}

export const BorrowConfirm = () => {
    const [wallet, _] = useWallet();
    const [borrow_info, setBorrowInfo] = useAmountBorrowInfoStore()
    const [amtIn, setAmountBorrowEarnStore] = useAmountBorrowEarnStore()
    const [walletModalStatus, setWalletModalStatus] = useShowWalletModal();
    const [client, setClient] = useClient();
    const [assets, setAssets] = useAssetStore();
    const [risk_rate, setRiskRate] = useRiskRate();
    const [ShowTransactionModalBorrow, setShowTransactionModalBorrow] = useShowTransactionModalBorrow();
    const [theme, setTheme] = useToggleTheme();

    const open = () => { setShowTransactionModalBorrow({ b: true }) };
    const close = () => { setShowTransactionModalBorrow({ b: false }) };

    let Button;
    let temp_asset = assets.find((asset) => asset.Display == borrow_info.base)
    let denom = TOKEN_INFO.find((token) => token.Denom == amtIn.base)

    const ModalComponent = Modal(
        ShowTransactionModalBorrow.b,
        close,
        BorrowModal(
            theme.TextColor,
            borrow_info.logo,
            borrow_info.base,
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
        Button = <ButtonBlock onClick={() => { setWalletModalStatus({ b: true }) }}>
            <ConfirmButton>Connect wallet</ConfirmButton>
        </ButtonBlock>
    } else {
        if (borrow_info.base == "Select Token") {
            Button = <ButtonBlock>
                <InsufficientConfirmButton>Select Token</InsufficientConfirmButton>
            </ButtonBlock>
        } else if (amtIn.amt == '' || amtIn.amt == '0' || isNaN(Number(amtIn.amt))) {
            Button = <ButtonBlock>
                <InsufficientConfirmButton>Enter {borrow_info.base} amount</InsufficientConfirmButton>
            </ButtonBlock>
        } else if (risk_rate.value > 95) {
            Button = <ButtonBlock>
                <InsufficientConfirmButton>Big risk rate</InsufficientConfirmButton>
            </ButtonBlock>
        } else if (Number(temp_asset?.provide_value) < (Number(amtIn.amt) * 10 ** Number(denom?.Decimals))) {
            Button = <ButtonBlock>
                <InsufficientConfirmButton>Not enough liquidity</InsufficientConfirmButton>
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
    return (
        <>{Button}</>
    )
}