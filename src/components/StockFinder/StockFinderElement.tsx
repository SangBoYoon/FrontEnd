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
            <Contents>
                <CorpsInfo>
                    <CorpInfo>
                        {corpName} {corpCode} {corpCategory}
                    </CorpInfo>
                </CorpsInfo>
            </Contents>
        </LinkWrap>
    );
};

export default DrinkListElement;

const LinkWrap = styled(Link)`
    text-decoration: none;
`;

const Contents = styled.div`
    margin-top: 103px;
`;

const CorpsInfo = styled.div``;

const CorpInfo = styled.div`
    width: 279px;
    height: 215px;
    background: #26272b;
    border-radius: 15px;

    display: flex;

    align-items: center;
    justify-content: center;

    color: white;
`;
