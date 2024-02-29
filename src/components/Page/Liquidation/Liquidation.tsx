import styled from "styled-components";
import { useToggleTheme } from "../../../hooks/useToggleTheme";

const LiquidationBLock = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Block = styled.div <{backgroundColor: string}>`
    width: 100%;
    height: calc(100vh - 65px);
    background: ${props => props.backgroundColor};
    margin-top: -5px;
`

const TestText = styled.h1`
    font-size: 30px;
    margin-top: 14em;
    margin-left: -30px;
    background: linear-gradient(to right, #77bff9, #2d96ff);
    background-clip: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    @media (max-width: 500px) {
        margin-top: 11em;
    }
`

export const Liquidation = () => {

    const [theme, setTheme] = useToggleTheme()

    return(
        <Block backgroundColor={theme.backgroundColor}>
        <LiquidationBLock>
            <TestText>Soon</TestText>
        </LiquidationBLock>
        </Block>
    )
}