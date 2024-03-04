import styled from "styled-components";
import { Input } from "../Input/Input";
import { ModalWant } from "../../../../Modal/BorrowModal/ModalWant/ModalWant";
import { useToggleTheme } from "../../../../../hooks/useToggleTheme";

const Wont = styled.div`
    width: 90%;
    height: 60px;
`

const TextWont = styled.div `
    font-size: 15px;
    color: #BABABA;
    font-weight: 700;
    margin-bottom: 10px;
`

const FieldWont = styled.div <{BorderField: string}>`
    width: 100%;
    height: 100%;
    border: ${props => props.BorderField};
    border-radius: 20px;
    display: flex;
    align-items: center;
`

const TokenBlock = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
`

export const WantTo = () => {
    
    const [theme, setTheme] = useToggleTheme()

    return(
        <Wont>
            <TextWont>I wont to borrow</TextWont>
            <FieldWont BorderField={theme.BorderField}>
                <TokenBlock>
                    <ModalWant/>
                </TokenBlock>
                <Input></Input>
            </FieldWont>
        </Wont>
    )
}