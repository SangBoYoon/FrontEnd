/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

type currentRatioType = {
    account_detail: string;
    account_id: string;
    account_nm: string;
    bfefrmtrm_amount: string;
    bfefrmtrm_nm: string;
    bsns_year: string;
    corp_code: string;
    currency: string;
    frmtrm_amount: string;
    frmtrm_nm: string;
    ord: string;
    rcept_no: string;
    reprt_code: string;
    sj_div: string;
    sj_nm: string;
    thstrm_add_amount: string;
    thstrm_amount: string;
    thstrm_nm: string;
};

type corpCodeType = {
    corpCode: string;
};

const DelistReason: React.FC<corpCodeType> = ({ corpCode }) => {
    const [financialStatements2021, setFinancialStatements2021] = useState<
        currentRatioType[]
    >([]);
    const [financialStatements2020, setFinancialStatements2020] = useState<
        currentRatioType[]
    >([]);

    const [salesRevenue2021, setSalesRevenue2021] = useState<number>(0);
    const [salesRevenue2021Unit, setSalesRevenue2021Unit] = useState('');
    const [sliceSalesRevenue2021, setSliceSalesRevenue2021] = useState('');
    const [salesRevenue2020Unit, setSalesRevenue2020Unit] = useState('');
    const [sliceSalesRevenue2020, setSliceSalesRevenue2020] = useState('');

    const [salesRevenue2020, setSalesRevenue2020] = useState<number>(0);
    const [salesRevenuePoint, setSalesRevenuePoint] = useState<number>(0);

    const [capital2021, setCapital2021] = useState<number>(0);
    const [capital2021Unit, setCapital2021Unit] = useState('');
    const [sliceCapital2021, setSliceCapital2021] = useState('');
    const [totalequity2021, setTotalequity2021] = useState<number>(0);
    const [totalequity2021Unit, settotalequity2021Unit] = useState('');
    const [slicetotalequity2021, setSlicetotalequity2021] = useState('');
    let capitalImpairment2021 = 0;

    const [capitalImpairmentPoint, setCapitalImpairmentPoint] =
        useState<number>(0);
    const [delistReason, setDelistReason] = useState<number>(0);
    const [salesRevenue2021vs2020Color, setSalesRevenue2021vs2020Color] =
        useState(false);
    const [totalPointMent, setTotalPointMent] = useState('');

    const [dataEx, setDataEx] = useState(true);
    const [noDataPrint, setNoDataPrint] = useState(false); // 2개년 데이터 없을 시

    useEffect(() => {
        axios({
            url: '/api/fnlttSinglAcntAll.json',
            method: 'get',
            params: {
                crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
                corp_code: `${corpCode}`,
                bsns_year: '2021',
                reprt_code: '11011',
                fs_div: 'OFS',
            },
            // open dart api를 통해 재무제표를 가져옴
        })
            .then((res) => {
                if (res !== null && res !== undefined) {
                    setFinancialStatements2021(res.data.list);
                    setDataEx(true);
                } else {
                    setDataEx(false);
                    console.log('dart open api에 데이터가 존재하지 않음');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    useEffect(() => {
        axios({
            url: '/api/fnlttSinglAcntAll.json',
            method: 'get',
            params: {
                crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
                corp_code: `${corpCode}`,
                bsns_year: '2020',
                reprt_code: '11011',
                fs_div: 'OFS',
            },
            // open dart api를 통해 재무제표를 가져옴
        })
            .then((res) => {
                if (res !== null && res !== undefined) {
                    setFinancialStatements2020(res.data.list);
                    console.log(res.data.list);
                } else {
                    setDataEx(false);
                    console.log('dart open api에 데이터가 존재하지 않음');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (dataEx === true) {
            if (
                financialStatements2021 !== null &&
                financialStatements2021 !== undefined &&
                financialStatements2020 !== null &&
                financialStatements2020 !== undefined
            ) {
                const currentAssetsArray2021: any =
                    financialStatements2021.filter(
                        (man: currentRatioType) =>
                            man.account_nm === '수익(매출액)' ||
                            man.account_nm === '매출액' ||
                            man.account_nm === 'I. 매출액' ||
                            man.account_nm === '매출' ||
                            man.account_nm === '영업수익',
                    );

                const currentAssetsArray2020: any =
                    financialStatements2020.filter(
                        (man: currentRatioType) =>
                            man.account_nm === '수익(매출액)' ||
                            man.account_nm === '매출액' ||
                            man.account_nm === 'I. 매출액' ||
                            man.account_nm === '매출' ||
                            man.account_nm === '영업수익',
                    );

                const CapitalArray2021: any = financialStatements2021.filter(
                    (man: currentRatioType) =>
                        man.account_nm === '자본금' ||
                        man.account_nm === 'I. 자본금',
                );

                const totalequity2021: any = financialStatements2021.filter(
                    (man: currentRatioType) =>
                        man.account_nm === '자본총계' ||
                        man.account_nm === '자본과부채총계',
                );

                if (
                    currentAssetsArray2021[0] !== null &&
                    currentAssetsArray2021[0] !== undefined &&
                    currentAssetsArray2020[0] !== null &&
                    currentAssetsArray2020[0] !== undefined &&
                    CapitalArray2021[0] !== null &&
                    CapitalArray2021[0] !== undefined &&
                    totalequity2021[0] !== null &&
                    totalequity2021[0] !== undefined
                ) {
                    // console.log(currentAssetsArray2021[0].thstrm_amount);
                    setSalesRevenue2021(
                        currentAssetsArray2021[0].thstrm_amount,
                    );
                    setSalesRevenue2020(
                        currentAssetsArray2020[0].thstrm_amount,
                    );
                    setCapital2021(CapitalArray2021[0].thstrm_amount);
                    setTotalequity2021(totalequity2021[0].thstrm_amount);
                }
            } else {
                setNoDataPrint(true);
                console.log('데이터없음');
            }
        }
    }, [financialStatements2021, financialStatements2020]);
    useEffect(() => {
        if (salesRevenue2020 >= 3000000000) {
            if (salesRevenue2021 >= 3000000000) {
                setSalesRevenuePoint(100);
            } else if (salesRevenue2021 < 3000000000) {
                setSalesRevenuePoint(50);
            }
        } else if (salesRevenue2020 < 3000000000) {
            setSalesRevenuePoint(75);
        }
    }, [salesRevenue2021, salesRevenue2020]);

    capitalImpairment2021 = Math.floor(
        ((capital2021 - totalequity2021) / capital2021) * 100,
    );
    useEffect(() => {
        if (capitalImpairment2021 < 30) {
            setCapitalImpairmentPoint(100);
        } else if (capitalImpairment2021 >= 30 && capitalImpairment2021 < 50) {
            let capitalImpairmentRate2021 = 0;
            capitalImpairmentRate2021 =
                ((capitalImpairment2021 - 29) / 50) * 100;
            setCapitalImpairmentPoint(100 - capitalImpairmentRate2021 + 1);
        } else {
            let capitalImpairmentRate2021 = 0;
            capitalImpairmentRate2021 =
                ((capitalImpairment2021 - 49) / 50) * 100;
            setCapitalImpairmentPoint(49 - capitalImpairmentRate2021 + 2);
        }
    }, [salesRevenue2021]);
    useEffect(() => {
        setDelistReason(
            capitalImpairmentPoint * (50 / 100) +
                salesRevenuePoint * (50 / 100),
        );
    }, [capitalImpairmentPoint, salesRevenuePoint]);
    useEffect(() => {
        switch (true) {
            case delistReason <= 25:
                setTotalPointMent('주식이 매우 아파요');
                break;
            case delistReason <= 50:
                setTotalPointMent(
                    '상장폐지 및 관리종목에 지정될 가능성이 높아요',
                );

                break;
            case delistReason <= 75:
                setTotalPointMent('관리 종목에 지정될 가능성이 있어요');

                break;
            case delistReason <= 100:
                setTotalPointMent('상장폐지 걱정이 없어요');
                break;
            default:
                console.log('fail');
                break;
        }
    }, [delistReason]);

    useEffect(() => {
        if (String(salesRevenue2021).length === 8) {
            setSalesRevenue2021Unit('만원');
            setSliceSalesRevenue2021(String(salesRevenue2021).substring(0, 4));
        } else if (
            String(salesRevenue2021).length >= 9 ||
            String(salesRevenue2021).length < 13
        ) {
            setSalesRevenue2021Unit('억');
            switch (String(salesRevenue2021).length) {
                case 9:
                    setSliceSalesRevenue2021(
                        String(salesRevenue2021).substring(0, 1),
                    );
                    break;
                case 10:
                    setSliceSalesRevenue2021(
                        String(salesRevenue2021).substring(0, 2),
                    );
                    break;
                case 11:
                    setSliceSalesRevenue2021(
                        String(salesRevenue2021).substring(0, 3),
                    );
                    break;
                case 12:
                    setSliceSalesRevenue2021(
                        String(salesRevenue2021).substring(0, 4),
                    );
                    break;
                default:
                    console.log('err');
            }
        } else {
            setSalesRevenue2021Unit('조');
            switch (String(salesRevenue2021).length) {
                case 13:
                    setSliceSalesRevenue2021(
                        String(salesRevenue2021).substring(0, 1),
                    );
                    break;
                case 14:
                    setSliceSalesRevenue2021(
                        String(salesRevenue2021).substring(0, 2),
                    );
                    break;
                case 15:
                    setSliceSalesRevenue2021(
                        String(salesRevenue2021).substring(0, 3),
                    );
                    break;
                case 16:
                    setSliceSalesRevenue2021(
                        String(salesRevenue2021).substring(0, 4),
                    );
                    break;
                default:
                    console.log('err');
            }
        }

        if (String(salesRevenue2020).length === 8) {
            setSalesRevenue2020Unit('만원');
            setSliceSalesRevenue2020(String(salesRevenue2020).substring(0, 4));
        } else if (
            String(salesRevenue2020).length >= 9 ||
            String(salesRevenue2020).length < 13
        ) {
            setSalesRevenue2020Unit('억');
            switch (String(salesRevenue2020).length) {
                case 9:
                    setSliceSalesRevenue2020(
                        String(salesRevenue2020).substring(0, 1),
                    );
                    break;
                case 10:
                    setSliceSalesRevenue2020(
                        String(salesRevenue2020).substring(0, 2),
                    );
                    break;
                case 11:
                    setSliceSalesRevenue2020(
                        String(salesRevenue2020).substring(0, 3),
                    );
                    break;
                case 12:
                    setSliceSalesRevenue2020(
                        String(salesRevenue2020).substring(0, 4),
                    );
                    break;
                default:
                    console.log('err');
            }
        } else {
            setSalesRevenue2020Unit('조');
            switch (String(salesRevenue2020).length) {
                case 13:
                    setSliceSalesRevenue2020(
                        String(salesRevenue2020).substring(0, 1),
                    );
                    break;
                case 14:
                    setSliceSalesRevenue2020(
                        String(salesRevenue2020).substring(0, 2),
                    );
                    break;
                case 15:
                    setSliceSalesRevenue2020(
                        String(salesRevenue2020).substring(0, 3),
                    );
                    break;
                case 16:
                    setSliceSalesRevenue2020(
                        String(salesRevenue2020).substring(0, 4),
                    );
                    break;
                default:
                    console.log('err');
            }
        }

        if (String(capital2021).length === 8) {
            setCapital2021Unit('만원');
            setSliceCapital2021(String(capital2021).substring(0, 4));
        } else if (
            String(capital2021).length >= 9 ||
            String(capital2021).length < 13
        ) {
            setCapital2021Unit('억');
            switch (String(capital2021).length) {
                case 9:
                    setSliceCapital2021(String(capital2021).substring(0, 1));
                    break;
                case 10:
                    setSliceCapital2021(String(capital2021).substring(0, 2));
                    break;
                case 11:
                    setSliceCapital2021(String(capital2021).substring(0, 3));
                    break;
                case 12:
                    setSliceCapital2021(String(capital2021).substring(0, 4));
                    break;
                default:
                    console.log('err');
            }
        } else {
            setCapital2021Unit('조');
            switch (String(capital2021).length) {
                case 13:
                    setSliceCapital2021(String(capital2021).substring(0, 1));
                    break;
                case 14:
                    setSliceCapital2021(String(capital2021).substring(0, 2));
                    break;
                case 15:
                    setSliceCapital2021(String(capital2021).substring(0, 3));
                    break;
                case 16:
                    setSliceCapital2021(String(capital2021).substring(0, 4));
                    break;
                default:
                    console.log('err');
            }
        }

        if (String(totalequity2021).length === 8) {
            settotalequity2021Unit('만원');
            setSlicetotalequity2021(String(totalequity2021).substring(0, 4));
        } else if (
            String(totalequity2021).length > 8 ||
            String(totalequity2021).length < 13
        ) {
            settotalequity2021Unit('억');
            switch (String(totalequity2021).length) {
                case 9:
                    setSlicetotalequity2021(
                        String(totalequity2021).substring(0, 1),
                    );
                    break;
                case 10:
                    setSlicetotalequity2021(
                        String(totalequity2021).substring(0, 2),
                    );
                    break;
                case 11:
                    setSlicetotalequity2021(
                        String(totalequity2021).substring(0, 3),
                    );
                    break;
                case 12:
                    setSlicetotalequity2021(
                        String(totalequity2021).substring(0, 4),
                    );
                    break;
                default:
                    console.log('err');
            }
        } else {
            settotalequity2021Unit('조');
            switch (String(totalequity2021).length) {
                case 13:
                    setSlicetotalequity2021(
                        String(totalequity2021).substring(0, 2),
                    );
                    break;
                case 14:
                    setSlicetotalequity2021(
                        String(totalequity2021).substring(0, 3),
                    );
                    break;
                case 15:
                    setSlicetotalequity2021(
                        String(totalequity2021).substring(0, 4),
                    );
                    break;
                case 16:
                    setSlicetotalequity2021(
                        String(totalequity2021).substring(0, 5),
                    );
                    break;
                default:
                    console.log('err');
            }
        }
        if (salesRevenue2021 > salesRevenue2020) {
            setSalesRevenue2021vs2020Color(true);
        } else setSalesRevenue2021vs2020Color(false);
    }, [salesRevenue2020, salesRevenue2021, capital2021, totalequity2021]);

    return (
        <div>
            {noDataPrint ? (
                <NoData>
                    <h2>관리종목/상장폐지</h2>
                    <div>입력된 데이터가 없어요 😥 </div>
                </NoData>
            ) : (
                <>
                    <UpperTupel>
                        <WhiteBox>
                            <Header>
                                <WhiteBoxName>매출액의 변화</WhiteBoxName>
                            </Header>
                            <CurrentAssetsLiabilitiesContainer
                                salesRevenue2021vs2020Color={
                                    salesRevenue2021vs2020Color
                                }
                            >
                                <div className="blue">
                                    <p>
                                        {sliceSalesRevenue2020}
                                        {salesRevenue2020Unit}
                                    </p>
                                    <h2>2020</h2>
                                </div>
                                <div className="grey">
                                    <p>
                                        {sliceSalesRevenue2021}
                                        {salesRevenue2021Unit}
                                    </p>
                                    <h2>2021</h2>
                                </div>
                            </CurrentAssetsLiabilitiesContainer>
                        </WhiteBox>
                        <WhiteBox>
                            <Header>
                                <WhiteBoxName>자본잠식률</WhiteBoxName>
                            </Header>
                            <CapitalTotalequityContainer>
                                <h2>자본금</h2>
                                <p>
                                    {sliceCapital2021}
                                    {capital2021Unit}
                                </p>
                            </CapitalTotalequityContainer>
                            <CapitalTotalequityContainer>
                                <h2>자본총계</h2>
                                <p>
                                    {slicetotalequity2021}
                                    {totalequity2021Unit}
                                </p>
                            </CapitalTotalequityContainer>
                            <WhiteBoxLine />
                            <CapitalImpairment2021Container>
                                <h2>자본잠식률</h2>
                                <p>{capitalImpairment2021}%</p>
                            </CapitalImpairment2021Container>
                        </WhiteBox>
                        <WhiteBox>
                            <Header>
                                <WhiteBoxName>
                                    매출액점수/자본잠식률 점수
                                </WhiteBoxName>
                            </Header>
                            <PointContainer>
                                <PointConatinerColumn textColor="#0064FF">
                                    <p>{salesRevenuePoint}점</p>
                                    <Bar
                                        bgcolor="#0064FF"
                                        height={salesRevenuePoint}
                                    />
                                    <p>매출액 점수</p>
                                </PointConatinerColumn>
                                <PointConatinerColumn textColor="#4F4F4F">
                                    <p>{capitalImpairmentPoint}점</p>
                                    <Bar
                                        bgcolor="#D2D2D2"
                                        height={capitalImpairmentPoint}
                                    />
                                    <p>자본잠식률 점수</p>
                                </PointConatinerColumn>
                            </PointContainer>
                            <LineContainer
                                salesRevenuePoint={salesRevenuePoint}
                                capitalImpairmentPoint={capitalImpairmentPoint}
                            >
                                <h1>{delistReason}점</h1>
                                <AverageLine />
                            </LineContainer>
                        </WhiteBox>
                    </UpperTupel>
                    <DownTuple>
                        <h1>관리종목/상장폐지 가능성 분석</h1>
                        <h2>
                            기업의 2개년 매출액과 30억을 비교하여 산출한 매출액
                            점수와 기업의 작년 자본금과 자본총계를 통해 계산한
                            자본 잠식률 점수를 합산해 기업의 관리 종목 지정/상장
                            폐지 가능성을 살핍니다
                        </h2>
                        <DownTupleContentContainer>
                            <p>{totalPointMent}</p>
                            <h2>{delistReason}점</h2>
                        </DownTupleContentContainer>
                    </DownTuple>
                    <Alert>
                        Accouter가 제공하는 금융 정보는 각 콘텐츠 제공업체로부터
                        받는 정보로 투자 참고사항이며, 오류가 발생하거나 지연될
                        수 있습니다. Accouter는 제공된 정보에 의한 투자결과에
                        법적책임을 지지 않습니다. 게시된 정보는 무단으로 배포할
                        수 없습니다.
                    </Alert>
                </>
            )}
        </div>
    );
};

const NoData = styled.div`
    width: 292px;
    height: 265px;
    background: #ffffff;
    border-radius: 15px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    justify-content: center;

    h2 {
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;

        color: #4f4f4f;
    }

    div {
        font-size: 14px;
        line-height: 18px;
        /* identical to box height */

        text-align: center;

        color: #737373;
        margin: auto;
    }
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
    align-items: center;
    margin-left: 40px;
`;

const WhiteBox = styled.div`
    width: 292px;
    height: 265px;
    background-color: #ffffff;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const WhiteBoxName = styled.h1`
    font-size: 16px;
    color: rgb(79, 79, 79);
`;

const UpperTupel = styled.div`
    display: flex;
    justify-content: space-between;
    width: 914px;
`;

const CapitalTotalequityContainer = styled.div`
    width: 213px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #4f4f4f;
    h2 {
        font-weight: 400;
        font-size: 20px;
    }
    p {
        font-weight: 7000;
        font-size: 32px;
    }
`;

const CapitalImpairment2021Container = styled.div`
    width: 213px;
    height: 100%;

    display: flex;
    justify-content: space-between;

    align-items: center;
    color: #0064ff;
    h2 {
        font-weight: 300;
        font-size: 13px;
    }
    p {
        font-weight: 300;
        font-size: 28px;
    }
`;
const WhiteBoxLine = styled.div`
    width: 251px;
    height: 1px;
    background-color: #d2d2d2;
    margin-top: 20px;
`;

const PointContainer = styled.div`
    display: flex;
    width: 162px;
    justify-content: space-around;
    margin-top: 15px;
`;

const PointConatinerColumn = styled.div<{ textColor: string }>`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    align-items: center;
    p {
        margin-top: 7px;
        color: ${(props) => props.textColor};
    }
`;

const Bar = styled.div<{ bgcolor: string; height: number }>`
    width: 34px;
    height: ${(props) => props.height * 1.4}px;
    background-color: ${(props) => props.bgcolor};
    border-radius: 6px;
`;

const DownTuple = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 19px;
    width: 913px;
    height: 265px;
    background-color: #ffffff;
    border-radius: 15px;
    h1 {
        font-size: 13px;
        color: #4f4f4f;
        margin-left: 20px;
        padding-top: 20px;
    }
    h2 {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 5px;
        font-size: 13px;
    }
    .alert {
        color: #bebfc5;
        margin-top: 80px;
        margin-left: 20px;
        font-size: 12px;
    }
`;

const DownTupleContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    p {
        color: #4f4f4f;
        font-size: 32px;
        font-weight: 700;
    }
    h2 {
        font-size: 20px;
    }
`;
const AverageLine = styled.div`
    border: 1px dashed rgb(0, 100, 255);
    width: 199px;
    height: 0;
`;

const LineContainer = styled.div<{
    salesRevenuePoint: number;
    capitalImpairmentPoint: number;
}>`
    margin-right: 30px;
    display: flex;
    align-items: center;
    position: relative;
    top: -${(props) => (props.salesRevenuePoint + props.capitalImpairmentPoint) * 0.835}px;
    h1 {
        color: #0064ff;
        font-size: 9px;
        margin-right: 4px;
    }
`;

const CurrentAssetsLiabilitiesContainer = styled.div<{
    salesRevenue2021vs2020Color: boolean;
}>`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
        font-weight: 300;
        font-size: 14px;
    }
    p {
        font-weight: 300;
        font-size: 47px;
    }
    .blue {
        color: ${(props) =>
            props.salesRevenue2021vs2020Color ? '#737373' : '#146DF7'};
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .grey {
        color: ${(props) =>
            props.salesRevenue2021vs2020Color ? '#146DF7' : '#737373'};
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Alert = styled.div`
    width: 913px;
    margin-top: 65px;
    font-size: 13px;
`;

export default DelistReason;
