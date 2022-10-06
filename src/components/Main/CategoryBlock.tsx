import React from 'react';
import styled from 'styled-components';

type categoryBlockType = {
    category: string;
};

const CategoryBlock: React.FC<categoryBlockType> = ({ category }) => {
    return <CategoryBlockStyle>{category}</CategoryBlockStyle>;
};

export default CategoryBlock;

const CategoryBlockStyle = styled.div`
    width: 147.52px;
    height: 51px;
    background: #2b2c31;
    border-radius: 15px;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 29px;
    color: #ececec;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background: #e2e2e2;
        color: #2d2d2d;
    }
`;
