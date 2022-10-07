import React from 'react';
import styled from 'styled-components';

type TextType = {
    sliceSalesRevenueValue: string;
    salesRevenueUnitValue: string;
};

const CircleText: React.FC<TextType> = ({
    sliceSalesRevenueValue,
    salesRevenueUnitValue,
}) => {
    return (
        <SalesRevenueText>
            {sliceSalesRevenueValue}
            {salesRevenueUnitValue}
        </SalesRevenueText>
    );
};

const SalesRevenueText = styled.div`
    font-size: 20px;
    color: white;
`;
export default CircleText;
