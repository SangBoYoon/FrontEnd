import React from 'react';
import styled from 'styled-components';

type blockWrapType = {
    title: string;
    children: React.ReactNode;
};

const BlockWrap: React.FC<blockWrapType> = ({ title, children }) => {
    return (
        <BlockWrapStyle>
            <Title>{title}</Title>
            <div>{children}</div>
        </BlockWrapStyle>
    );
};

export default BlockWrap;

const BlockWrapStyle = styled.div`
    width: 1200px;
    height: auto;
    display: flex;
    flex-direction: column;
    &:not(:last-of-type) {
        margin-bottom: 29px;
    }
`;

const Title = styled.div`
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 23px;
    line-height: 29px;
    color: #e2e2e2;
    margin-bottom: 16px;
`;
