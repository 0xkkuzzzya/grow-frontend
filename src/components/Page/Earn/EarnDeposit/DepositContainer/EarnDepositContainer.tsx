import styled from "styled-components";
import { EarnDepositHeader } from "../DepositHeader/EarnDepositHeader";
import { EarnDepositTokenField } from "../DepositTokenField/DepositTokenField";
import { EarnDepositConfirm } from "../DepositConfirm/EarnDepositConfirm";
import { EarnDepositAPR } from "../DepositARP/EarnDepositaAPR";

const ContrainerBlock = styled.div`
    width: 400px;
    height: 100%;
    padding: 20px;
`


export const EarnDepositContainer = () => {
    return(
        <ContrainerBlock>
            <EarnDepositHeader/>
            <EarnDepositTokenField/>
            <EarnDepositAPR/>
            <EarnDepositConfirm/>
        </ContrainerBlock>
    )
}