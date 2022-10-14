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
const AccountingFraud: React.FC<corpCodeType> = ({ corpCode }) => {
    const [totalComprehensiveIncome2021, settotalComprehensiveIncome2021] =
        useState<number>(0);
    const [totalComprehensiveIncome2020, settotalComprehensiveIncome2020] =
        useState<number>(0);
    const [totalComprehensiveIncome2019, settotalComprehensiveIncome2019] =
        useState<number>(0);
    const [totalComprehensiveIncome2018, settotalComprehensiveIncome2018] =
        useState<number>(0);

    const [accountingFraudPoint, setaccountingFraudPoint] = useState('');
    const [fatherArray2021, setFatherArray2021] = useState<currentRatioType[]>(
        [],
    );
    const [fatherArray2020, setFatherArray2020] = useState<currentRatioType[]>(
        [],
    );
    const [fatherArray2019, setFatherArray2019] = useState<currentRatioType[]>(
        [],
    );
    const [fatherArray2018, setFatherArray2018] = useState<currentRatioType[]>(
        [],
    );

    const [result2021, setResult2021] = useState('');
    const [result2020, setResult2020] = useState('');
    const [result2019, setResult2019] = useState('');
    const [result2018, setResult2018] = useState('');

    const [accountingFraudMent, setAccountingFraudMent] = useState('');

    const [dataEx, setDataEx] = useState(true);
    const [noDataPrint, setNoDataPrint] = useState(false); // 4개년 데이터 없을 시

    useEffect(() => {
        axios({
            url: 'https://accountercors.herokuapp.com/https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json',
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
                    setFatherArray2021(res.data.list);
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
            url: 'https://accountercors.herokuapp.com/https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json',
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
                    setFatherArray2020(res.data.list);
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
            url: 'https://accountercors.herokuapp.com/https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json',
            method: 'get',
            params: {
                crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
                corp_code: `${corpCode}`,
                bsns_year: '2019',
                reprt_code: '11011',
                fs_div: 'OFS',
            },
            // open dart api를 통해 재무제표를 가져옴
        })
            .then((res) => {
                if (res !== null && res !== undefined) {
                    setFatherArray2019(res.data.list);
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
            url: 'https://accountercors.herokuapp.com/https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json',
            method: 'get',
            params: {
                crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
                corp_code: `${corpCode}`,
                bsns_year: '2018',
                reprt_code: '11011',
                fs_div: 'OFS',
            },
            // open dart api를 통해 재무제표를 가져옴
        })
            .then((res) => {
                if (res !== null && res !== undefined) {
                    setFatherArray2018(res.data.list);
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
        if (dataEx === true) {
            if (
                fatherArray2021 !== null &&
                fatherArray2021 !== undefined &&
                fatherArray2020 !== null &&
                fatherArray2020 !== undefined &&
                fatherArray2019 !== null &&
                fatherArray2019 !== undefined &&
                fatherArray2018 !== null &&
                fatherArray2018 !== undefined
            ) {
                const currentAssetsArray2021: any = fatherArray2021.filter(
                    (man: currentRatioType) =>
                        man.account_nm === '총포괄손익' ||
                        man.account_nm === '총포괄손익.' ||
                        man.account_nm === '당기총포괄손익',
                );
                const currentAssetsArray2020: any = fatherArray2020.filter(
                    (man: currentRatioType) =>
                        man.account_nm === '총포괄손익' ||
                        man.account_nm === '총포괄손익.' ||
                        man.account_nm === '당기총포괄손익',
                );
                const currentAssetsArray2019: any = fatherArray2019.filter(
                    (man: currentRatioType) =>
                        man.account_nm === '총포괄손익' ||
                        man.account_nm === '총포괄손익.' ||
                        man.account_nm === '당기총포괄손익',
                );
                const currentAssetsArray2018: any = fatherArray2018.filter(
                    (man: currentRatioType) =>
                        man.account_nm === '총포괄손익' ||
                        man.account_nm === '총포괄손익.' ||
                        man.account_nm === '당기총포괄손익',
                );
                console.log(currentAssetsArray2018);
                if (
                    currentAssetsArray2021[0] !== null &&
                    currentAssetsArray2021[0] !== undefined &&
                    currentAssetsArray2020[0] !== null &&
                    currentAssetsArray2020[0] !== undefined &&
                    currentAssetsArray2019[0] !== null &&
                    currentAssetsArray2019[0] !== undefined &&
                    currentAssetsArray2018[0] !== null &&
                    currentAssetsArray2018[0] !== undefined
                ) {
                    settotalComprehensiveIncome2021(
                        Math.sign(currentAssetsArray2021[0].thstrm_amount),
                    );
                    settotalComprehensiveIncome2020(
                        Math.sign(currentAssetsArray2020[0].thstrm_amount),
                    );
                    settotalComprehensiveIncome2019(
                        Math.sign(currentAssetsArray2019[0].thstrm_amount),
                    );
                    settotalComprehensiveIncome2018(
                        Math.sign(currentAssetsArray2018[0].thstrm_amount),
                    );
                }
            } else {
                setNoDataPrint(true);
                console.log('데이터없음');
            }
        }
    }, [fatherArray2021, fatherArray2020, fatherArray2019, fatherArray2018]);
    useEffect(() => {
        if (totalComprehensiveIncome2018 === +1) {
            if (totalComprehensiveIncome2019 === +1) {
                if (totalComprehensiveIncome2020 === +1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('100점');
                        setAccountingFraudMent('분식 가능성이 낮아요');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('90점');
                        setAccountingFraudMent('분식 가능성이 낮아요');
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('90점');
                        setAccountingFraudMent('분식 가능성이 낮아요');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('60점');
                        setAccountingFraudMent('분식 가능성이 다소 존재해요');
                    }
                }
            } else if (totalComprehensiveIncome2019 === -1) {
                if (totalComprehensiveIncome2020 === +1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('90점');
                        setAccountingFraudMent('분식 가능성이 낮아요');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('80점');
                        setAccountingFraudMent('분식 가능성이 낮아요');
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('80점');
                        setAccountingFraudMent('분식 가능성이 낮아요');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('30점');
                        setAccountingFraudMent('분식 가능성이 매우 커요');
                    }
                }
            }
        } else if (totalComprehensiveIncome2018 === -1) {
            if (totalComprehensiveIncome2019 === +1) {
                if (totalComprehensiveIncome2020 === +1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('90점');
                        setAccountingFraudMent('분식 가능성이 낮아요');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('90점');
                        setAccountingFraudMent('분식 가능성이 낮아요');
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('80점');
                        setAccountingFraudMent('분식 가능성이 낮아요');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('60점');
                        setAccountingFraudMent('분식 가능성이 다소 존재해요');
                    }
                }
            } else if (totalComprehensiveIncome2019 === -1) {
                if (totalComprehensiveIncome2020 === +1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('80점');
                        setAccountingFraudMent('분식 가능성이 낮아요');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('70점');
                        setAccountingFraudMent('분식 가능성이 다소 존재해요');
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('80점');
                        setAccountingFraudMent('분식 가능성이 낮아요');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('0점');
                        setAccountingFraudMent('분식 가능성이 매우 높아요');
                    }
                }
            }
        }
        if (totalComprehensiveIncome2018 === -1) {
            setResult2018('적자');
        } else {
            setResult2018('흑자');
        }
        if (totalComprehensiveIncome2019 === -1) {
            setResult2019('적자');
        } else {
            setResult2019('흑자');
        }
        if (totalComprehensiveIncome2020 === -1) {
            setResult2020('적자');
        } else {
            setResult2020('흑자');
        }
        if (totalComprehensiveIncome2021 === -1) {
            setResult2021('적자');
        } else {
            setResult2021('흑자');
        }
        console.log(result2021);
    }, [totalComprehensiveIncome2018]);

    return (
        <div>
            {noDataPrint ? (
                <NoData>
                    <h2>수익안전성</h2>
                    <div>입력된 데이터가 없어요 😥 </div>
                </NoData>
            ) : (
                <Inner>
                    <AccountingFraudContainer>
                        <LeftBox>
                            <LeftBoxHeader>
                                <WhiteBoxName>
                                    영업수익의 적자/흑자
                                </WhiteBoxName>
                            </LeftBoxHeader>
                            <LeftBoxLine />
                            <LeftBoxTupel
                                textShow={totalComprehensiveIncome2021}
                            >
                                <h1>2021</h1>
                                <p>{result2021}</p>
                            </LeftBoxTupel>
                            <LeftBoxTupel
                                textShow={totalComprehensiveIncome2020}
                            >
                                <h1>2020</h1>
                                <p>{result2020}</p>
                            </LeftBoxTupel>
                            <LeftBoxTupel
                                textShow={totalComprehensiveIncome2019}
                            >
                                <h1>2019</h1>
                                <p>{result2019}</p>
                            </LeftBoxTupel>
                            <LeftBoxTupel
                                textShow={totalComprehensiveIncome2018}
                            >
                                <h1>2018</h1>
                                <p>{result2018}</p>
                            </LeftBoxTupel>
                        </LeftBox>
                        <RightBox>
                            <WhiteBoxName>분식가능성 진단</WhiteBoxName>
                            <h2>
                                기업의 2개년 매출액과 30억을 비교하여 산출한
                                매출액 점수와 기업의 작년 자본금과 자본총계를
                                통해 계산한 자본 잠식률 점수를 합산해 기업의
                                관리 종목 지정/상장 폐지 가능성을 살핍니다
                            </h2>
                            <DownTupleContentContainer>
                                <p>{accountingFraudMent}</p>
                                <h2>{accountingFraudPoint}</h2>
                            </DownTupleContentContainer>
                        </RightBox>
                    </AccountingFraudContainer>
                    <div className="alert">
                        Accouter가 제공하는 금융 정보는 각 콘텐츠 제공업체로부터
                        받는 정보로 투자 참고사항이며, 오류가 발생하거나 지연될
                        수 있습니다. Accouter는 제공된 정보에 의한 투자결과에
                        법적책임을 지지 않습니다. 게시된 정보는 무단으로 배포할
                        수 없습니다.
                    </div>
                </Inner>
            )}
        </div>
    );
};

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .alert {
        width: 913px;
        margin-top: 65px;
        font-size: 13px;
    }
`;

const AccountingFraudContainer = styled.div`
    width: 912px;
    display: flex;
    justify-content: space-between;
`;

const LeftBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 292px;
    height: 265px;
    background-color: white;
    border-radius: 15px;
`;

const LeftBoxHeader = styled.div`
    width: 100%;
`;

const RightBox = styled.div`
    width: 602px;
    height: 265px;
    background-color: white;
    border-radius: 15px;
    h2 {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 5px;
        font-size: 13px;
    }
`;

const WhiteBoxName = styled.h1`
    font-size: 13px;
    color: #4f4f4f;
    margin-left: 20px;
    margin-top: 20px;
`;

const LeftBoxLine = styled.div`
    width: 252px;
    border: 1px solid #d2d2d2;
    height: 0px;
    margin-top: 10px;
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

const LeftBoxTupel = styled.div<{ textShow: number }>`
    display: flex;
    justify-content: space-between;
    width: 87%;
    display: flex;
    margin-top: 20px;
    p {
        color: ${(props) => (props.textShow === 1 ? '#0064FF' : '#BEBFC5')};
    }
`;
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
export default AccountingFraud;
