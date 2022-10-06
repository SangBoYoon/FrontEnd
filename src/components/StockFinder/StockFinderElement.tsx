import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type corpType = {
    corpCode: string;
    corpName: string;
    corpCategory: string;
};

const DrinkListElement: React.FC<corpType> = ({
    corpCode,
    corpName,
    corpCategory,
}) => {
    return (
        <LinkWrap to={`/StockFinder/${corpCode}`} key={corpCode}>
            <CorpInfo>{corpName}</CorpInfo>
        </LinkWrap>
    );
};

export default DrinkListElement;

const LinkWrap = styled(Link)`
    text-decoration: none;
`;

const CorpInfo = styled.div`
    margin-bottom: 37px;
    margin-top: 18px;
    font-weight: 700;
    font-size: 20px;
    width: 279px;
    height: 215px;
    background: #26272b;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`;
