import React from 'react';
import styled from 'styled-components';

const ServiceIntro: React.FC = () => {
    return (
        <Inner>
            <Top>
                <ServiceIntroImg
                    src="./images/OBJECTS.png"
                    alt="serviceIntroImg"
                />
                <TopTextBox>
                    <TopTextBoxSmallHeading>
                        건강검진은 닥터,
                    </TopTextBoxSmallHeading>
                    <TopTextBoxBigHeading>
                        기업검진은 <strong>어카운터</strong>
                    </TopTextBoxBigHeading>
                    <TopTextBoxParagraph>
                        어렵고 까다로운 주식정보, <br />
                        어카운터와 함께라면 문제없습니다.
                    </TopTextBoxParagraph>
                </TopTextBox>
            </Top>
            <Reason>
                <ReasonHeader>
                    <ReasonHeaderBigHeading>
                        WHY
                        <br />
                        ACCOUNTER
                    </ReasonHeaderBigHeading>
                    <ReasonHeaderSmallHeading>
                        왜 어카운터여야만 하는가?
                    </ReasonHeaderSmallHeading>
                </ReasonHeader>
                <ReasonIllustrationCardContainer>
                    <ReasonIllustrationCard marginValue={0}>
                        <ReasonIllustrationBox>
                            <ReasonIllustrationImgShadow />
                            <img
                                src="./images/serviceReasonGraph.png"
                                alt="serviceReasonGraph"
                            />
                        </ReasonIllustrationBox>
                        <ReasonIllustrationParagraph>
                            코스피보다 규모가 작은 코스닥 종목에 대한
                            <br />
                            투자는 비교적 높은 리스크가 동반됩니다.
                        </ReasonIllustrationParagraph>
                    </ReasonIllustrationCard>
                    <ReasonIllustrationCard marginValue={100}>
                        <ReasonIllustrationBox>
                            <ReasonIllustrationImgShadow />
                            <img
                                src="./images/serviceReasonPerson.png"
                                alt="serviceReasonPerson"
                                style={{
                                    marginRight: '30px',
                                }}
                            />
                        </ReasonIllustrationBox>
                        <ReasonIllustrationParagraph>
                            코스닥 종목에 대한 재무건전성 분석,
                            <br />
                            어카운터가 도와드립니다.
                        </ReasonIllustrationParagraph>
                    </ReasonIllustrationCard>
                </ReasonIllustrationCardContainer>
            </Reason>
            <Tools>
                <ToolsHeader>
                    <ToolsHeaderHeading>
                        어카운터는 <br /> 검증된 재무제표를 바탕으로 <br />
                        4가지 분석 도구를
                        <br />
                        사용합니다.
                    </ToolsHeaderHeading>
                    <ToolsHeaderTag colorValue="#C2D3FF;" widthValue={174}>
                        수익 안정성 분석
                    </ToolsHeaderTag>
                    <ToolsHeaderTag colorValue="#A4BDFF;" widthValue={270}>
                        관리종목/상장폐지 위험 분석
                    </ToolsHeaderTag>
                    <ToolsHeaderTag colorValue="#96D9C9;" widthValue={149}>
                        유동비율 분석
                    </ToolsHeaderTag>
                    <ToolsHeaderTag colorValue="#50BFA5;" widthValue={174}>
                        분식가능성 분석
                    </ToolsHeaderTag>
                </ToolsHeader>
            </Tools>
        </Inner>
    );
};

const Inner = styled.div`
    height: 700vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    background-color: #1a1b1e;
`;
const ServiceIntroImg = styled.img`
    margin-top: 95px;
`;

const Top = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const TopTextBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: -380px;
`;

const TopTextBoxSmallHeading = styled.h1`
    color: #bbbbbb;
    font-size: 42px;
    font-weight: 700;
`;

const TopTextBoxBigHeading = styled.p`
    font-size: 66px;
    font-weight: 700;
    color: #ffffff;
    strong {
        color: #0064ff;
    }
`;

const TopTextBoxParagraph = styled.div`
    text-align: center;
    margin-top: 50px;
    font-size: 20px;
`;

const Reason = styled.section``;

const ReasonHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ReasonHeaderBigHeading = styled.h2`
    text-align: center;
    font-size: 50px;
    font-weight: 700;
`;
const ReasonHeaderSmallHeading = styled.p`
    font-size: 20px;
    color: #d9d9d9;
`;

const ReasonIllustrationCardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 888px;
    margin-top: 49px;
`;

const ReasonIllustrationCard = styled.div<{ marginValue: number }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: ${(props) => props.marginValue}px;
`;

const ReasonIllustrationBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background: linear-gradient(180deg, #3c3d44 0%, rgba(60, 61, 68, 0) 100%);
    border-radius: 28px;
    width: 429px;
    height: 423px;
`;

const ReasonIllustrationImgShadow = styled.div`
    width: 429px;
    height: 423px;
    position: relative;
    top: 350px;
    background: linear-gradient(to bottom, transparent, 1a1b1e);
`;

const ReasonIllustrationParagraph = styled.p`
    text-align: center;
    margin-top: 20px;
    font-size: 20px;
    color: #d9d9d9;
`;

const Tools = styled.section``;

const ToolsHeader = styled.div`
    display: flex;
    margin-top: 114px;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 731px;
    background: linear-gradient(180deg, #3c3d44 0%, rgba(60, 61, 68, 0) 100%);
`;

const ToolsHeaderHeading = styled.h2`
    text-align: center;
    font-size: 50px;
    font-weight: 700;
    margin-top: 128px;
`;

interface ToolsHeaderTagTypes {
    colorValue: string;
    widthValue: number;
}
const ToolsHeaderTag = styled.button<ToolsHeaderTagTypes>`
    background-color: ${(props) => props.colorValue}px;
    width: ${(props) => props.widthValue}px;
    color: black;
    border: none;
    border-radius: 13px;
    font-weight: 500;
    font-size: 20px;
    padding: 10px;
    margin-top: 11px;
`;

const ToolsBody = styled.div``;

export default ServiceIntro;
