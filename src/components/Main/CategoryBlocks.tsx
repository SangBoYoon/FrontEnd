import React from 'react';
import styled from 'styled-components';
import CategoryBlock from './CategoryBlock';

const CategoryBlocks: React.FC = () => {
    return (
        <CategoryBlocksStyle>
            <ul>
                <li>
                    <CategoryBlock category="IT" />
                </li>
                <li>
                    <CategoryBlock category="금융" />
                </li>
                <li>
                    <CategoryBlock category="교육" />
                </li>
                <li>
                    <CategoryBlock category="미디어" />
                </li>
                <li>
                    <CategoryBlock category="건강" />
                </li>
                <li>
                    <CategoryBlock category="생산성" />
                </li>
                <li>
                    <CategoryBlock category="커뮤니티" />
                </li>
            </ul>
        </CategoryBlocksStyle>
    );
};

export default CategoryBlocks;

const CategoryBlocksStyle = styled.div`
    display: flex;
    width: 100%;
    > ul {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        > li {
            list-style: none;
        }
    }
`;
