import React from 'react';
import styled from 'styled-components';
import ToolsIntroductionTupel from './ToolsIntroductionTupel';

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
                <ToolsBody>
                    <ToolsIntroductionTupel
                        toolsName="😌 수익 안정성 분석"
                        toolsHeading="매출이 꾸준히 나와요."
                        toolsParagraph={
                            <>
                                어카운터에서는 매출이 꾸준히 유지되는
                                <br />
                                안정성 있는 기업을 알려줘요.
                            </>
                        }
                        srcValue="./images/toolsImg1.png"
                        altValue="toolsImg1"
                        direction="row"
                    />
                    <ToolsIntroductionTupel
                        toolsName="😮 관리종목/상장폐지 위험 분석"
                        toolsHeading="거래가 막힐 수도 있어요."
                        toolsParagraph={
                            <>
                                관리가 필요한 종목 및 상장폐지 위험이
                                <br />
                                있는 기업에 대한 분석결과를 제공해요.
                            </>
                        }
                        srcValue="./images/toolsImg2.png"
                        altValue="toolsImg2"
                        direction="row-reverse"
                    />
                    <ToolsIntroductionTupel
                        toolsName="🙂 유동비율 분석"
                        toolsHeading="기업의 자금이 유연해요."
                        toolsParagraph={
                            <>
                                기업의 유동자산과 유동부채에 대한 <br />
                                정보를 제공해요.
                            </>
                        }
                        srcValue="./images/toolsImg3.png"
                        altValue="toolsImg3"
                        direction="row"
                    />
                    <ToolsIntroductionTupel
                        toolsName="🤨 분식가능성 분석"
                        toolsHeading="기업의 이익이 수상해요."
                        toolsParagraph={
                            <>
                                기업의 이익의 변화와 분식가능성에 대한
                                <br />
                                정보를 제공해요.
                            </>
                        }
                        srcValue="./images/toolsImg4.png"
                        altValue="toolsImg4"
                        direction="row-reverse"
                    />
                </ToolsBody>
                <ToolsFooter>
                    <p>
                        어카운터는 4가지의 재무분석 알고리즘을 이용하여
                        <br />
                        투자자 분들에게 유용한 정보를 제공합니다.
                    </p>
                </ToolsFooter>
            </Tools>
            <Bottom>
                <BottomText>
                    투자자 여러분들의 <strong>성투</strong>를 기원합니다.
                </BottomText>
                <BottomImg
                    src="./images/serviceBottom.png"
                    alt="serviceBottom"
                />
            </Bottom>
        </Inner>
    );
};

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    background-color: #1a1b1e;
    padding-bottom: 300px;
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
    color: #ececec;
    strong {
        color: #0064ff;
    }
`;

const TopTextBoxParagraph = styled.div`
    text-align: center;
    margin-top: 50px;
    font-size: 20px;
    color: #ececec;
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
    color: #ececec;
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

const Tools = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ToolsHeader = styled.div`
    width: 100%;
    display: flex;
    margin-top: 114px;
    flex-direction: column;
    align-items: center;
    height: 731px;
    background: linear-gradient(180deg, #3c3d44 0%, rgba(60, 61, 68, 0) 100%);
`;

const ToolsHeaderHeading = styled.h2`
    text-align: center;
    font-size: 50px;
    font-weight: 700;
    margin-top: 128px;
    color: #ececec;
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

const ToolsBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ToolsFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 745px;
    height: 125px;
    border-radius: 29px;
    background-color: #d9d9d9;
    margin-top: 60px;
    p {
        text-align: center;
        font-size: 23px;
        color: black;
    }
`;

const Bottom = styled.div`
    margin-top: 400px;
`;
const BottomText = styled.p`
    color: #ececec;
    font-weight: 700;
    font-size: 40px;
    strong {
        color: #92d8c7;
    }
`;
const BottomImg = styled.img`
    position: relative;
    bottom: 100px;
    left: 240px;
`;
export default ServiceIntro;
