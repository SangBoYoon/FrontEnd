import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
    return (
        <FooterWrapper>
            <FooterLeft>
                <div>
                    <BoldText>개인정보처리방침</BoldText>
                    <BoldText>문의</BoldText>
                </div>
                <div>
                    <SemiBoldText>Financial advisor</SemiBoldText>
                    <Text>김태호</Text>
                </div>
                <div>
                    <SemiBoldText>Developer</SemiBoldText>
                    <Text>강상원 김희윤 박상민 이보현</Text>
                </div>
            </FooterLeft>
            <FooterRight>ACCOUNTER@gmail.com</FooterRight>
        </FooterWrapper>
    );
};

export default Footer;

const FooterWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 109px;
    background: #3c3d44;
`;

const BoldText = styled.p`
    width: 121px;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #ececec;
    display: flex;
    &:nth-of-type(1)::after {
        content: '';
        left: 107px;
        top: 2px;
        position: absolute;
        width: 1px;
        height: 12.69px;
        background-color: #fff;
    }
    margin-bottom: 18.18px;
`;

const SemiBoldText = styled.p`
    width: 121px;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    color: #ececec;
    margin-bottom: 6.74px;
`;

const Text = styled.p`
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 300;
    font-size: 10px;
    line-height: 13px;
    color: #ececec;
`;

const FooterLeft = styled.div`
    position: absolute;
    left: 34px;
    top: 20.37px;
    > div {
        display: flex;
    }
`;

const FooterRight = styled.p`
    position: absolute;
    top: 72.33px;
    right: 30px;

    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    color: #ececec;
`;
