/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';

const ToolsIntroductionTupel: React.FC<ToolsType> = ({
    toolsName,
    toolsHeading,
    toolsParagraph,
    srcValue,
    altValue,
    direction,
}) => {
    return (
        <ToolsIntroductionTupelInner direction={direction}>
            <ToolsIntroductionTextContainer>
                <span>{toolsName}</span>
                <h3>{toolsHeading}</h3>
                <p>{toolsParagraph}</p>
            </ToolsIntroductionTextContainer>
            <img src={srcValue} alt={altValue} />
        </ToolsIntroductionTupelInner>
    );
};

const ToolsIntroductionTupelInner = styled.div<{ direction: string }>`
    display: flex;
    flex-direction: ${(props) => props.direction};
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    margin-bottom: 164px;
`;

const ToolsIntroductionTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    span {
        color: #ffc22d;
        font-size: 20px;
    }
    h3 {
        color: #ececec;
        font-size: 40px;
        font-weight: 700;
        margin-top: 18px;
        margin-bottom: 18px;
    }
    p {
        font-size: 22px;
        color: #d9d9d9;
    }
`;
export default ToolsIntroductionTupel;

type ToolsType = {
    toolsName: string;
    toolsHeading: string;
    toolsParagraph: any;
    srcValue: string;
    altValue: string;
    direction: string;
};
