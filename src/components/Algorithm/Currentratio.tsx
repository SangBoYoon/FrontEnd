/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

type currentRatioType = {
    account_detail?: string;
    account_id?: string;
    account_nm?: string;
    bfefrmtrm_amount?: string;
    bfefrmtrm_nm?: string;
    bsns_year?: string;
    corp_code?: string;
    currency?: string;
    frmtrm_amount?: string;
    frmtrm_nm?: string;
    ord?: string;
    rcept_no?: string;
    reprt_code?: string;
    sj_div?: string;
    sj_nm?: string;
    thstrm_amount?: string;
    thstrm_nm?: string;
};

type corpCodeType = {
    corpCode: string;
};

const Currentratio: React.FC<corpCodeType> = ({ corpCode }) => {
    // 종목명
    const [currentAssets, setCurrentAssets] = useState<any>(0);
    // 유동자산
    const [currentLiabilities, setCurrentLiabilities] = useState(0);
    // 유동부채
    let currentratio = 0;
    // 유동비율;
    const [currentratioPoint, setCurrentratioPoint] = useState(0);
    // 유동비율 점수
    const [slicePoint, setSlicePoint] = useState(0);

    const [currentratioKeyword, setCurrentratioKeyword] = useState('');
    // 유동성키워드
    const [currentratioMent, setCurrentratioMent] = useState('');
    // 유동비율 설명
    const [currentRatioEmoji, setCurrentRatioEmoji] = useState('');
    const [dangerAlert, setDangerAlert] = useState(false);
    const [fatherArray, setFatherArray] = useState<currentRatioType[]>([]);
    const [dataEx, setDataEx] = useState(true);
    const [currentAssetsUnit, setCurrentAssetsUnit] = useState('');
    const [sliceCurrentratio, setSliceCurrentratio] = useState('');
    const [currentLiabilitiesUnit, setCurrentLiabilitiesUnit] = useState('');
    const [sliceCurrentLiabilities, setSliceCurrentLiabilities] = useState('');
    const [noDataPrint, setNoDataPrint] = useState(false); // 2개년 데이터 없을 시
    const [
        currentAssetsVScurrentLiabilities,
        setCurrentAssetsVScurrentLiabilities,
    ] = useState(true);

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
                    setFatherArray(res.data.list);
                    setDataEx(true);
                } else {
                    setDataEx(false);
                    console.log('dart open api에 데이터가 존재하지 않음');
                    setNoDataPrint(true);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (dataEx === true) {
            if (fatherArray !== null && fatherArray !== undefined) {
                const currentAssetsArray: any = fatherArray.filter(
                    (man: currentRatioType) => man.account_nm === '유동자산',
                );
                const currentLiabilitiesArray: any = fatherArray.filter(
                    (man: currentRatioType) => man.account_nm === '유동부채',
                );
                if (
                    currentAssetsArray[0] !== null &&
                    currentAssetsArray[0] !== undefined &&
                    currentLiabilitiesArray[0] !== null &&
                    currentLiabilitiesArray[0] !== undefined
                ) {
                    setCurrentAssets(currentAssetsArray[0].thstrm_amount);
                    setCurrentLiabilities(
                        currentLiabilitiesArray[0].thstrm_amount,
                    );
                }
            }
        }
    }, [fatherArray]);

    currentratio = Math.floor((currentAssets / currentLiabilities) * 100);
    // 유동자산,유동부채 데이터를 이용해 유동비율을 계산함

    // 유동비율을 200% 만점을 기준으로 점수를 계산함, 200%이상일 시 만점 처리함.

    useEffect(() => {
        if (currentratio >= 200) {
            setCurrentratioPoint(100);
        } else {
            setCurrentratioPoint((currentratio / 200) * 100);
        }
        if (currentratio < 100) {
            setDangerAlert(true);
        }
        switch (true) {
            case currentratio < 100:
                setCurrentratioKeyword('매우 위험');
                setCurrentratioMent('유동성이 매우 위험해요');
                setCurrentRatioEmoji('😱');
                break;
            case currentratio < 150:
                setCurrentratioKeyword('위험');
                setCurrentratioMent('유동성이 위험해요');
                setCurrentRatioEmoji('😮');
                break;
            case currentratio < 200:
                setCurrentratioKeyword('주의');
                setCurrentratioMent('유동성이 살짝 아쉬워요');
                setCurrentRatioEmoji('🤨');
                break;
            case currentratio >= 200:
                setCurrentratioKeyword('안정');
                setCurrentratioMent('유동성이 건강해요');
                setCurrentRatioEmoji('😊');
                break;
            default:
                console.log('fail');
                break;
        }
    }, [currentratio]);

    useEffect(() => {
        if (String(currentAssets).length === 8) {
            setCurrentAssetsUnit('만원');
            setSliceCurrentratio(String(currentAssets).substring(0, 5));
        } else {
            setCurrentAssetsUnit('억');
            switch (String(currentAssets).length) {
                case 9:
                    setSliceCurrentratio(String(currentAssets).substring(0, 1));
                    break;
                case 10:
                    setSliceCurrentratio(String(currentAssets).substring(0, 2));
                    break;
                case 11:
                    setSliceCurrentratio(String(currentAssets).substring(0, 3));
                    break;
                case 12:
                    setSliceCurrentratio(String(currentAssets).substring(0, 4));
                    break;
                default:
                    console.log('err');
            }
        }
        if (String(currentLiabilities).length === 8) {
            setCurrentLiabilitiesUnit('만원');
            setSliceCurrentLiabilities(
                String(currentLiabilities).substring(0, 5),
            );
        } else if (
            String(currentLiabilities).length > 8 ||
            String(currentLiabilities).length < 13
        ) {
            setCurrentLiabilitiesUnit('억');
            switch (String(currentLiabilities).length) {
                case 9:
                    setSliceCurrentLiabilities(
                        String(currentLiabilities).substring(0, 1),
                    );
                    break;
                case 10:
                    setSliceCurrentLiabilities(
                        String(currentLiabilities).substring(0, 2),
                    );
                    break;
                case 11:
                    setSliceCurrentLiabilities(
                        String(currentLiabilities).substring(0, 3),
                    );
                    break;
                case 12:
                    setSliceCurrentLiabilities(
                        String(currentLiabilities).substring(0, 4),
                    );
                    break;
                default:
                    console.log('err');
            }
        } else {
            setCurrentLiabilitiesUnit('조');
            switch (String(currentLiabilities).length) {
                case 13:
                    setSliceCurrentLiabilities(
                        String(currentLiabilities).substring(0, 1),
                    );
                    break;
                case 14:
                    setSliceCurrentLiabilities(
                        String(currentLiabilities).substring(0, 2),
                    );
                    break;
                case 15:
                    setSliceCurrentLiabilities(
                        String(currentLiabilities).substring(0, 3),
                    );
                    break;
                case 16:
                    setSliceCurrentLiabilities(
                        String(currentLiabilities).substring(0, 4),
                    );
                    break;
                default:
                    console.log('err');
            }
        }
        if (currentAssets > currentLiabilities) {
            setCurrentAssetsVScurrentLiabilities(true);
        } else setCurrentAssetsVScurrentLiabilities(false);
        setSlicePoint(Math.round(currentratioPoint));
    }, [currentAssets, currentratioPoint]);

    return (
        <Inner>
            {noDataPrint ? (
                <NoData>
                    <h2>유동비율</h2>
                    <div>입력된 데이터가 없어요 😥 </div>
                </NoData>
            ) : (
                <>
                    <UpperTupel>
                        <WhiteBox>
                            <WhiteBoxName>유동자산/유동부채</WhiteBoxName>
                            <CurrentAssetsLiabilitiesContainer
                                colorHow={currentAssetsVScurrentLiabilities}
                            >
                                <div className="blue">
                                    <p>
                                        {sliceCurrentratio}
                                        {currentAssetsUnit}
                                    </p>
                                    <h2>유동자산</h2>
                                </div>
                                <div className="grey">
                                    <p>
                                        {sliceCurrentLiabilities}
                                        {currentLiabilitiesUnit}
                                    </p>
                                    <h2>유동부채</h2>
                                </div>
                            </CurrentAssetsLiabilitiesContainer>
                        </WhiteBox>
                        <WhiteBox>
                            <WhiteBoxName>유동비율</WhiteBoxName>
                            <CurrentRatioP>{currentratio}&#37;</CurrentRatioP>
                        </WhiteBox>
                        <WhiteBox>
                            <WhiteBoxName>유동성 상태</WhiteBoxName>
                            <CurrentRatioStateContainer>
                                <p>{currentRatioEmoji}</p>
                                <h2>{currentratioKeyword} </h2>
                            </CurrentRatioStateContainer>
                        </WhiteBox>
                    </UpperTupel>
                    <DownTuple>
                        <h1>유동성 분석</h1>
                        <h2>
                            기업의 2개년 매출액과 30억을 비교하여 산출한 매출액
                            점수와 기업의 작년 자본금과 자본총계를 통해 계산한
                            자본 잠식률 점수를 합산해 기업의 관리 종목 지정/상장
                            폐지 가능성을 살핍니다
                        </h2>
                        <DownTupleContentContainer>
                            <p>{currentratioMent}</p>
                            <h2> {slicePoint}점</h2>
                        </DownTupleContentContainer>
                        <p className="alert">
                            {dangerAlert
                                ? '*유동비율이 100% 미만이라는 것은 1년 이내 갚아야 할 부채가 운용할 수 있는 자금보다 더 많다는 것을 의미합니다.'
                                : ''}
                        </p>
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
        </Inner>
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

const Inner = styled.div``;

const UpperTupel = styled.div`
    display: flex;
    justify-content: space-between;
    width: 914px;
`;

const WhiteBox = styled.div`
    width: 292px;
    height: 265px;
    background-color: #ffffff;
    border-radius: 15px;
`;

const WhiteBoxName = styled.h1`
    font-size: 13px;
    color: #4f4f4f;
    margin-left: 20px;
    margin-top: 20px;
`;

const CurrentAssetsLiabilitiesContainer = styled.div<{ colorHow: boolean }>`
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
        color: ${(props) => (props.colorHow ? '#146DF7' : '#737373')};
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .grey {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: ${(props) => (props.colorHow ? '#737373' : '#146DF7')};
    }
`;

const CurrentRatioP = styled.p`
    color: #737373;
    font-size: 47px;
    font-weight: 300;
    display: flex;
    justify-content: center;
    margin-top: 70px;
`;

const CurrentRatioStateContainer = styled.div`
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-size: 95px;
    }
    h2 {
        font-weight: 400;
        font-size: 13px;
        color: #4f4f4f;
    }
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

const Alert = styled.div`
    width: 913px;
    margin-top: 65px;
    font-size: 13px;
`;

export default Currentratio;
