import styled from "styled-components";
import QubeLogo from '../../assets/svg/QubeLogo.webp'
import { Customlink } from "./CustomLink/CustomLink";
import { ConnectButton } from "../Buttton/ConnectButton/CoonectButton";
import { DefoultLinkBlock, MobileLinkBlock } from "./VariablesLink/BlockLink";
import { useMediaQuery } from 'react-responsive'
import { LinkButton } from '../Buttton/LinkButton/LinkButton';
import { ChangeTheme } from "../Buttton/ToggleTheme/ChangeTheme";
import { useToggleTheme } from "../../hooks/useToggleTheme";
import { HomePageLinkButton } from "./CustomLink/HomePageLinkButton";


const MainHeader = styled.div <{headerColor: string, mobHeaderColor: string}>`
    max-width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    background: ${props => props.headerColor};
    @media (max-width: 500px) {
        background: ${props => props.mobHeaderColor};
    }
`

const HeaderLogoBlock = styled.div`
    display: flex;
    align-items: center;
`

const HeaderLogoQUBE = styled.img`
    display: block;
    width: 55px;
    height: 55px;
    @media (max-width: 500px) {
        width: 40px;
        height: 40px;
    }
`






export const Header = () => {

    const [theme, setTheme] = useToggleTheme()

    const isDes = useMediaQuery({
        query: "(min-device-width: 1050px)",
    });
    const isMob = useMediaQuery({
        query: "(max-device-width: 1050px)",
    });

    return(
        <div style={{display: "flex", flexDirection: "column"}}>
            <MainHeader headerColor={theme.headerColor} mobHeaderColor={theme.mobHeaderColor}>
                <HeaderLogoBlock>
                    <HomePageLinkButton to="/">
                        <HeaderLogoQUBE style={{marginTop: "-5px"}} src={QubeLogo}></HeaderLogoQUBE>
                    </HomePageLinkButton>
                </HeaderLogoBlock>
                {isDes && <DefoultLinkBlock/>}
                <ChangeTheme/>
                <ConnectButton></ConnectButton>
            </MainHeader>
            {isMob && <MobileLinkBlock/>}
        </div>
    )
}
