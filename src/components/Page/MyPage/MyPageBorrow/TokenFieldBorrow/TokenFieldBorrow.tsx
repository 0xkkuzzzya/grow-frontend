import styled from "styled-components";
import USQLogo from '../../../../../assets/svg/USQLogo.webp'
import ATOMLogo from '../../../../../assets/svg/AtomLogo.webp'
import WBTCLogo from '../../../../../assets/svg/WBTCLogo.webp'
import GUSQLogo from '../../../../../assets/svg/GUSQLogo.webp'
import { EarnCustomLink } from "../../../Earn/EarnCustomLink/EarnCustomLink";
import { useMediaQuery } from "react-responsive";
import { useToggleTheme } from "../../../../../hooks/useToggleTheme";
import { useLoanStore } from "../../../../../hooks/usePositionStore";
import { TokenBalance } from "../../MyPageBalance/TokenFieldBalance/TokenFieldsBalance";
import { TOKEN_INFO } from "../../../../../constants";
import { myFixed } from "../../MyPageDeposit/TokenFieldDeposit/TokenFieldDeposit";

const FieldArrS = styled.div`
    overflow: auto;
    overflow-x: visible;
    height: 400px;
    scrollbar-color: rgba(87, 187, 242, 1) transparent;
    scrollbar-width: thin;
`

const FieldArr = styled.div`
    overflow: visible;
    margin-bottom: 100px;
`

const FieldBlock = styled.div <{BorderField: string}>`
    width: 99%;
    height: 60px;
    border: 2px solid red;
    border-radius: 17px;
    margin-top: 10px;
    font-family: 'Inter', sans-serif;
    border: ${props => props.BorderField};
    display: flex;
    align-items: center;
`

const TokenImg = styled.img`
    width: 45px;
    margin-left: 15px;
    border-radius: 50px;
`

const PriceBlock = styled.div <{TextColor: string}>`
    white-space: nowrap;
    text-align: left;
    color: ${props => props.TextColor};
    max-width: 100%;
    @media (max-width: 570px) {
        margin-left: auto;
    }
`

const PriceText = styled.a`
    font-size: 20px;
    font-weight: 700;
    text-align: left;
`

const TokenName = styled.a <{TextColor: string}>` 
    font-size: 20px;
    font-weight: 700;
    margin-left: 10px;
    color: ${props => props.TextColor};
`

const ButtonsBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: -5px;
    margin-right: 15px;
    margin-left: auto;
`

const EarnDepositButton = styled.button `
    width: 130px;
    height: 100%;
    color: white;
    border: none;
    border-radius: 50px;
    background: linear-gradient(to right, #3B9CFC, #6CBBFF);
    margin-right: 5px;
    margin-top: 5px;
    padding: 5px 15px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    cursor: pointer;
`

const EarnWithdrawalButton = styled.button`
    width: 130px;
    height: 100%;
    color: #3B9CFC;
    border: 2px solid #3B9CFC;
    border-radius: 50px;
    background:transparent;
    margin-left: 5px;
    margin-top: 5px;
    padding: 5px 15px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    cursor: pointer;
`


export const TokenFieldBorrow = () => {

    const [ theme, setTheme] = useToggleTheme()
    const [ loans, setLoan ] = useLoanStore();

    const isDes = useMediaQuery({
        query: "(min-device-width: 570px)",
    });
    const isMob = useMediaQuery({
        query: "(max-device-width: 570px)",
    });

    let temp_loan = loans

    temp_loan.sort(function(a, b) {
        return b.Amount - a.Amount
    });

    temp_loan = temp_loan.filter((e) => e.Display != "")

    let LoansComponent = temp_loan.map((loan) => 
        <FieldBlock BorderField={theme.BorderField}>
            <div style={{width: "165px", display: "flex", alignItems: "center"}}>
                <TokenImg src={loan.Logo}></TokenImg>
                <TokenName TextColor={theme.TextColor}>{loan.Display}</TokenName>
            </div>
            {isDes && <PriceBlock TextColor={theme.TextColor}> <PriceText>{myFixed(loan.Amount, 6)} {loan.Display}</PriceText> </PriceBlock>}
            {isMob && <PriceBlock TextColor={theme.TextColor} style={{marginRight: "15px"}}> <PriceText>{myFixed(loan.Amount, 6)} {loan.Display}</PriceText> </PriceBlock>}
            {isDes && <ButtonsBlock >
                    <EarnCustomLink to="/borrow">
                        <EarnDepositButton>Manage</EarnDepositButton>
                    </EarnCustomLink>
                </ButtonsBlock>}
            {isMob && <></>}
        </FieldBlock>
    ) 

    return(
        <FieldArr>
            {LoansComponent}
        </FieldArr>
    )
}