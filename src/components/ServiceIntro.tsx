import React from 'react';
import styled from 'styled-components';

const ServiceIntro: React.FC = () => {
    return (
        <Inner>
            <Top>
                <ServiceIntroImg
                    src="./images/serviceIntroImg.png"
                    alt="serviceIntroImg"
                />

                <ServiceIntroMent
                    src="./images/serviceIntroMent.png"
                    alt="serviceIntroImg"
                />
            </Top>
        </Inner>
    );
};
const ServiceIntroMent = styled.img`
    object-fit: contain;
    width: 562px;
    height: 143px;
    position: absolute;
    top: 340px;
`;
const Inner = styled.div`
    display: flex;
    justify-content: center;
    background-color: black;
    box-sizing: border-box;
    height: 1000vh;
`;
const ServiceIntroImg = styled.img`
    margin-top: 95px;
`;

const Top = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1920px;
    height: 648px;
    position: relative;
`;

export default ServiceIntro;
