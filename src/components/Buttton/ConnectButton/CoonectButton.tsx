import styled from "styled-components";
import { ConnectModal } from "../../Modal/ConnectModal/ConnectModal";

const ButtonBlock = styled.div`
    max-width: 100%;
    height: 35px;
    border: none;
    font-family: 'Metropolis', sans-serif;
    border-radius: 5px;
    margin-right: 25px;
    cursor: pointer;
    color: #fff;
    @media (max-width: 500px) {
        margin-right: 20px;
    }
    @media (min-width: 950px) {
        margin-right: 60px;
    }
`



export const ConnectButton = () => {

    return(
        <ButtonBlock>
            <ConnectModal></ConnectModal>
        </ButtonBlock>
    )
}