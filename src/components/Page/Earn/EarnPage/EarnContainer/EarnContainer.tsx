import styled from "styled-components";
import { EarnHeader } from "../EarnHeader/EarnHeader";
import { EarnSerach } from "../EarnSearch/EarnSearch";
import { EarnFields } from "../EarnFields/EarnFields";
import { useToggleTheme } from "../../../../../hooks/useToggleTheme";

const ContainerBlock = styled.div`
    width: 500px;
    height: 100%;
    display: flex;
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 20px;
    flex-direction: column;
    align-items: center;
`

const ContainerBlockH = styled.div <{TextColor: string}>`
    width: 100%;
    text-align: center;
    color: ${props => props.TextColor};
`

export const EarnContainer = () => {

    const [theme, setTheme] = useToggleTheme()

    return(
        <ContainerBlock>
            <EarnHeader/>
            <EarnSerach/>
            <EarnFields/>
            {/* <ContainerBlockH TextColor={theme.TextColor}>
                <h1 style={{fontSize: "27px"}}>No vaults</h1>
            </ContainerBlockH> */}
        </ContainerBlock>
    )
}