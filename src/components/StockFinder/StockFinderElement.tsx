import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StockFinderHover from './StockFinderHover';

type corpType = {
    corpCode: string;
    corpName: string;
};

const DrinkListElement: React.FC<corpType> = ({ corpCode, corpName }) => {
    const [mouseOver, setMouseOver] = useState<boolean>(false);
    const boxMouseOverHandler = () => {
        setMouseOver(true);
    };
    const boxMouseOutHandler = () => {
        setMouseOver(false);
    };
    return (
        <LinkWrap
            onMouseOver={boxMouseOverHandler}
            onMouseOut={boxMouseOutHandler}
        >
            <div>
                <CorpInfo
                    to={`/corporations/${corpCode}`}
                    mouseOver={mouseOver}
                >
                    <p id="corpName">{corpName}</p>
                </CorpInfo>
                {mouseOver && <StockFinderHover corpCode={corpCode} />}
            </div>
        </LinkWrap>
    );
};

export default DrinkListElement;

const LinkWrap = styled.div`
    text-decoration: none;
    > div {
        position: relative;
    }
`;

type cardTextType = {
    mouseOver: boolean;
};

const CorpInfo = styled(Link)<cardTextType>`
    text-decoration: none;
    margin-bottom: 37px;
    margin-top: 18px;
    font-weight: 700;
    font-size: 20px;
    width: 279px;
    height: 215px;
    background: ${(props) => (props.mouseOver ? '#fff' : '#26272b')};
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => (props.mouseOver ? '#000000' : '#fff')};
`;
