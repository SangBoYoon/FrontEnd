import React from 'react';
import styled from 'styled-components';
import CategoryBlock from './CategoryBlock';

type arrType = {
    arr: Array<string>;
};
const CategoryBlocks: React.FC<arrType> = ({ arr }) => {
    return (
        <CategoryBlocksStyle>
            <ul>
                {arr.map((item, index) => {
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={index}>
                            <CategoryBlock category={item} />
                        </li>
                    );
                })}
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
