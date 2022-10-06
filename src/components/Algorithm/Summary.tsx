/* eslint-disable no-nested-ternary */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jStat from 'jstat';
import AccountingFraud from './AccountingFraud';
import Currentratio from './Currentratio';
import DelistReason from './DelistReason';
import RevenueStability from './RevenueStability';

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

type accountType = {
    account_nm: string; // 당기순이익(손실)
    sj_nm: string; // 포괄손익계산서
    thstrm_amount: string; // 영업이익
};

type SummaryType = {
    corpCode: string;
};
const Summary: React.FC<SummaryType> = ({ corpCode }) => {
    const [accountList1, setAccountList1] = useState<accountType[]>([]); // 2021
    const [accountList2, setAccountList2] = useState<accountType[]>([]); // 2020
    const [accountList3, setAccountList3] = useState<accountType[]>([]); // 2019
    const [accountList4, setAccountList4] = useState<accountType[]>([]); // 2018
    const [accountList5, setAccountList5] = useState<accountType[]>([]); // 2017
    const [error, setError] = useState(null);
    const [dataEx, setDataEx] = useState(true); // api 에러
    const [allRevenue, setAllRevenue] = useState([0, 0, 0, 0, 0]); // 2017 ~ 2021 영업수익
    const [calculationResult, setCalculationResult] = useState(0); // 상관계수 결과
    const [noDataPrint, setNoDataPrint] = useState(false); // 5개년 데이터 없을 시

    const CRTFC_KEY = '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0';

    useEffect(() => {
        setError(null);
        axios
            .all([
                axios.get(
                    `/api/fnlttSinglAcntAll.json?crtfc_key=${CRTFC_KEY}&corp_code=${corpCode}&bsns_year=2021&reprt_code=11011&fs_div=OFS`,
                ),
                axios.get(
                    `/api/fnlttSinglAcntAll.json?crtfc_key=${CRTFC_KEY}&corp_code=${corpCode}&bsns_year=2020&reprt_code=11011&fs_div=OFS`,
                ),
                axios.get(
                    `/api/fnlttSinglAcntAll.json?crtfc_key=${CRTFC_KEY}&corp_code=${corpCode}&bsns_year=2019&reprt_code=11011&fs_div=OFS`,
                ),
                axios.get(
                    `/api/fnlttSinglAcntAll.json?crtfc_key=${CRTFC_KEY}&corp_code=${corpCode}&bsns_year=2018&reprt_code=11011&fs_div=OFS`,
                ),
                axios.get(
                    `/api/fnlttSinglAcntAll.json?crtfc_key=${CRTFC_KEY}&corp_code=${corpCode}&bsns_year=2017&reprt_code=11011&fs_div=OFS`,
                ),
            ])
            .then(
                axios.spread((res2021, res2020, res2019, res2018, res2017) => {
                    setAccountList1(res2021.data.list);
                    setAccountList2(res2020.data.list);
                    setAccountList3(res2019.data.list);
                    setAccountList4(res2018.data.list);
                    setAccountList5(res2017.data.list);
                    setDataEx(true);
                }),
            )
            .catch((err) => {
                console.error(err);
            });
    }, []);

    if (dataEx === false) return <div>5개년치 데이터 없음요</div>;

    if (error) return <div>에러가 발생함요</div>;

    useEffect(() => {
        if (dataEx === true) {
            if (
                accountList1 !== null &&
                accountList1 !== undefined &&
                accountList2 !== null &&
                accountList2 !== undefined &&
                accountList3 !== null &&
                accountList3 !== undefined &&
                accountList4 !== null &&
                accountList4 !== undefined &&
                accountList5 !== null &&
                accountList5 !== undefined
            ) {
                const value1 = Object.values(accountList1).filter(
                    (v) =>
                        v.account_nm === '당기순이익(손실)' ||
                        v.sj_nm === '포괄손익계산서',
                );
                const value2 = Object.values(accountList2).filter(
                    (v) =>
                        v.account_nm === '당기순이익(손실)' ||
                        v.sj_nm === '포괄손익계산서',
                );
                const value3 = Object.values(accountList3).filter(
                    (v) =>
                        v.account_nm === '당기순이익(손실)' ||
                        v.sj_nm === '포괄손익계산서',
                );
                const value4 = Object.values(accountList4).filter(
                    (v) =>
                        v.account_nm === '당기순이익(손실)' ||
                        v.sj_nm === '포괄손익계산서',
                );
                const value5 = Object.values(accountList5).filter(
                    (v) =>
                        v.account_nm === '당기순이익(손실)' ||
                        v.sj_nm === '포괄손익계산서',
                );

                if (
                    value1[0] !== null &&
                    value1[0] !== undefined &&
                    value2[0] !== null &&
                    value2[0] !== undefined &&
                    value3[0] !== null &&
                    value3[0] !== undefined &&
                    value4 !== null &&
                    value4[0] !== undefined &&
                    value5 !== null &&
                    value5[0] !== undefined
                ) {
                    setAllRevenue([
                        Number(value5[0].thstrm_amount),
                        Number(value4[0].thstrm_amount),
                        Number(value3[0].thstrm_amount),
                        Number(value2[0].thstrm_amount),
                        Number(value1[0].thstrm_amount),
                    ]);
                    const result = [
                        Number(value5[0].thstrm_amount),
                        Number(value4[0].thstrm_amount),
                        Number(value3[0].thstrm_amount),
                        Number(value2[0].thstrm_amount),
                        Number(value1[0].thstrm_amount),
                    ];

                    const v: number = jStat.corrcoeff(
                        result,
                        [2017, 2018, 2019, 2020, 2021],
                    );

                    const revenueStabilityCal = () => {
                        if (v >= -1 && v < -0.5) {
                            setScore(25);
                        } else if (v >= -0.5 && v < 0) {
                            setScore(50);
                        } else if (v >= 0 && v < 0.5) {
                            setScore(75);
                        } else if (v >= 0.5 && v <= 1) {
                            setScore(100);
                        }
                    };

                    const countScore = () => {
                        let count = 0;
                        // eslint-disable-next-line no-plusplus
                        for (let i = 0; i < result.length; i++) {
                            if (result[i] < 0) {
                                // eslint-disable-next-line no-plusplus
                                count++;
                            }
                        }

                        if (count === 1) {
                            setScore((score) => score - 10);
                        } else if (count === 2) {
                            setScore((score) => score - 20);
                        } else if (count === 3) {
                            if (
                                (result[0] < 0 &&
                                    result[1] < 0 &&
                                    result[2] < 0) ||
                                (result[1] < 0 &&
                                    result[2] < 0 &&
                                    result[3] < 0) ||
                                (result[2] < 0 &&
                                    result[3] < 0 &&
                                    result[4] < 0) ||
                                (result[3] < 0 &&
                                    result[4] < 0 &&
                                    result[5] < 0)
                            ) {
                                setScore((score) => score - 40);
                            } else {
                                setScore((score) => score - 30);
                            }
                        }
                    };
                    setCalculationResult(v);

                    revenueStabilityCal();
                    countScore();
                }
            } else {
                setNoDataPrint(true);

                console.log('데이터없음');
            }
        }
    }, [accountList1, accountList2, accountList3, accountList4, accountList5]);

    const [score, setScore] = useState(0);

    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    const [name2, setName2] = useState<string>('');

    const [financialStatements2021, setFinancialStatements2021] = useState<
        currentRatioType[]
    >([]);
    const [financialStatements2020, setFinancialStatements2020] = useState<
        currentRatioType[]
    >([]);

    const [salesRevenue2021, setSalesRevenue2021] = useState<number>(0);
    const [salesRevenue2020, setSalesRevenue2020] = useState<number>(0);
    const [salesRevenuePoint, setSalesRevenuePoint] = useState<number>(0);

    const [capital2021, setCapital2021] = useState<number>(0);
    const [totalequity2021, setTotalequity2021] = useState<number>(0);
    let capitalImpairment2021 = 0;

    const [capitalImpairmentPoint, setCapitalImpairmentPoint] =
        useState<number>(0);
    const [delistReason, setDelistReason] = useState<number>(0);
    const [dataEx2, setDataEx2] = useState(true);

    const [noDataPrint2, setNoDataPrint2] = useState(false); // 2개년 데이터 없을 시

    useEffect(() => {
        axios({
            url: '/api/company.json',
            method: 'get',
            params: {
                crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
                corp_code: `${corpCode}`,
            },
        })
            .then((res) => {
                setName2(res.data.corp_name2);
            })
            .catch((err) => {
                console.error(err);
            });
        // open dart api를 통해 주식 종목명을 가져옴
    }, []);

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
                    setDataEx2(true);
                } else {
                    setDataEx2(false);
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
                } else {
                    setDataEx2(false);
                    console.log('dart open api에 데이터가 존재하지 않음');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (dataEx2 === true) {
            console.log('데이터 있음');
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
                            man.account_nm === '매출액',
                    );

                const currentAssetsArray2020: any =
                    financialStatements2020.filter(
                        (man: currentRatioType) =>
                            man.account_nm === '수익(매출액)' ||
                            man.account_nm === '매출액',
                    );

                const CapitalArray2021: any = financialStatements2021.filter(
                    (man: currentRatioType) => man.account_nm === '자본금',
                );
                const totalequity2021: any = financialStatements2021.filter(
                    (man: currentRatioType) => man.account_nm === '자본총계',
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
                setNoDataPrint2(true);
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
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    const [name, setName] = useState<string>('');
    // 종목명
    const [currentAssets, setCurrentAssets] = useState<any>(0);
    // 유동자산
    const [currentLiabilities, setCurrentLiabilities] = useState(0);
    // 유동부채
    let currentratio = 0;
    // 유동비율;
    let currentratioPoint = 0;
    // 유동비율 점수
    const [currentratioSafety, setCurrentratioSafety] = useState('');
    // 유동성키워드
    const [currentratioExplanation, setCurrentratioExplanation] = useState('');
    // 유동비율 설명
    const [fatherArray, setFatherArray] = useState<currentRatioType[]>([]);
    const [noDataEx3, setNoDataEx3] = useState(false);

    useEffect(() => {
        axios({
            url: '/api/company.json',
            method: 'get',
            params: {
                crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
                corp_code: `${corpCode}`,
            },
        })
            .then((res) => {
                setName(res.data.corp_name);
            })
            .catch((err) => {
                console.error(err);
            });
        // open dart api를 통해 주식 종목명을 가져옴
    }, []);

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
                    setNoDataEx3(false);
                } else {
                    setNoDataEx3(true);
                    console.log('dart open api에 데이터가 존재하지 않음');
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
    currentratioPoint = (currentratio / 200) * 100;
    // 유동비율을 200% 만점을 기준으로 점수를 계산함
    useEffect(() => {
        switch (true) {
            case currentratio <= 100:
                setCurrentratioSafety('위기');
                setCurrentratioExplanation(
                    '유동비율이 100% 미만이라는 것은 1년 이내 갚아야 할 부채가 운용할 수 있는 자금보다 더 많다는 것을 의미합니다. ',
                );
                break;
            case currentratio <= 150:
                setCurrentratioSafety('주의');
                break;
            case currentratio <= 200:
                setCurrentratioSafety('안정');
                break;
            case currentratio >= 200:
                setCurrentratioSafety('매우 안정');
                break;
            default:
                console.log('fail');
                break;
        }
    }, [currentratio]);

    const [name4, setName4] = useState<string>('');
    const [totalComprehensiveIncome2021, settotalComprehensiveIncome2021] =
        useState<number>(0);
    const [totalComprehensiveIncome2020, settotalComprehensiveIncome2020] =
        useState<number>(0);
    const [totalComprehensiveIncome2019, settotalComprehensiveIncome2019] =
        useState<number>(0);
    const [totalComprehensiveIncome2018, settotalComprehensiveIncome2018] =
        useState<number>(0);

    const [accountingFraudPoint, setaccountingFraudPoint] = useState(0);
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
    const [dataEx4, setDataEx4] = useState(true);
    const [noDataPrint4, setNoDataPrint4] = useState(false); // 4개년 데이터 없을 시

    useEffect(() => {
        axios({
            url: '/api/company.json',
            method: 'get',
            params: {
                crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
                corp_code: `${corpCode}`,
            },
        })
            .then((res) => {
                setName4(res.data.corp_name4);
            })
            .catch((err) => {
                console.error(err);
            });
        // open dart api를 통해 주식 종목명을 가져옴
    }, []);

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
                    setFatherArray2021(res.data.list);
                    setDataEx4(true);
                } else {
                    setDataEx4(false);
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
                    setFatherArray2020(res.data.list);
                    setDataEx4(true);
                } else {
                    setDataEx4(false);
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
                bsns_year: '2019',
                reprt_code: '11011',
                fs_div: 'OFS',
            },
            // open dart api를 통해 재무제표를 가져옴
        })
            .then((res) => {
                if (res !== null && res !== undefined) {
                    setFatherArray2019(res.data.list);
                    setDataEx4(true);
                } else {
                    setDataEx4(false);
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
                bsns_year: '2018',
                reprt_code: '11011',
                fs_div: 'OFS',
            },
            // open dart api를 통해 재무제표를 가져옴
        })
            .then((res) => {
                if (res !== null && res !== undefined) {
                    setFatherArray2018(res.data.list);
                    setDataEx4(true);
                } else {
                    setDataEx4(false);
                    console.log('dart open api에 데이터가 존재하지 않음');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (dataEx4 === true) {
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
                    (man: currentRatioType) => man.account_nm === '총포괄손익',
                );
                const currentAssetsArray2020: any = fatherArray2020.filter(
                    (man: currentRatioType) => man.account_nm === '총포괄손익',
                );
                const currentAssetsArray2019: any = fatherArray2019.filter(
                    (man: currentRatioType) => man.account_nm === '총포괄손익',
                );
                const currentAssetsArray2018: any = fatherArray2018.filter(
                    (man: currentRatioType) => man.account_nm === '총포괄손익',
                );
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
                setNoDataPrint4(true);
                console.log('데이터없음');
            }
        }
    }, [fatherArray2021, fatherArray2020, fatherArray2019, fatherArray2018]);
    useEffect(() => {
        if (totalComprehensiveIncome2018 === +1) {
            if (totalComprehensiveIncome2019 === +1) {
                if (totalComprehensiveIncome2020 === +1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint(100);
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint(90);
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint(90);
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint(60);
                    }
                }
            } else if (totalComprehensiveIncome2019 === -1) {
                if (totalComprehensiveIncome2020 === +1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint(90);
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint(80);
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint(80);
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint(30);
                    }
                }
            }
        } else if (totalComprehensiveIncome2018 === -1) {
            if (totalComprehensiveIncome2019 === +1) {
                if (totalComprehensiveIncome2020 === +1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint(90);
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint(90);
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint(80);
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint(60);
                    }
                }
            } else if (totalComprehensiveIncome2019 === -1) {
                if (totalComprehensiveIncome2020 === +1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint(80);
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint(70);
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint(80);
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint(0);
                    }
                }
            }
        }
    }, [totalComprehensiveIncome2018]);

    const [noSummary, setNoSummary] = useState(false);
    const [summaryScore, setSummaryScore] = useState(0);
    const [sliceLoading, setSliceLoading] = useState(false);
    const [calLoading, setCalLoading] = useState(false);

    useEffect(() => {
        const totalScore = [
            score,
            delistReason,
            currentratioPoint,
            accountingFraudPoint,
        ];
        const dataExValue = [
            noDataPrint,
            noDataPrint2,
            noDataEx3,
            noDataPrint4,
        ];
        console.log(dataExValue);

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < dataExValue.length; i++) {
            if (
                dataExValue[i] === true ||
                totalScore[i] === null ||
                totalScore[i] === undefined ||
                // eslint-disable-next-line use-isnan, no-restricted-globals
                isNaN(totalScore[i])
            ) {
                dataExValue.splice(i, 1);
                totalScore.splice(i, 1);
                // eslint-disable-next-line no-plusplus
                i--;
            }
        }
        setSliceLoading(true);
        console.log(sliceLoading);
        console.log(dataExValue);
        console.log(totalScore);

        const summaryCal = () => {
            if (sliceLoading) {
                if (noDataEx3 === true) {
                    setNoSummary(true);
                    setSummaryScore(0);
                } else if (dataExValue.length === 4) {
                    const v =
                        score * 0.25 +
                        delistReason * 0.25 +
                        currentratioPoint * 0.25 +
                        accountingFraudPoint * 0.25;
                    setSummaryScore(v);
                    setCalLoading(true);
                } else if (dataExValue.length === 3) {
                    const v = Math.round(
                        totalScore[0] * 0.33 +
                            totalScore[1] * 0.33 +
                            totalScore[2] * 0.33,
                    );

                    setSummaryScore(v);
                    setCalLoading(true);
                } else if (dataExValue.length === 2) {
                    const v = Math.round(
                        totalScore[0] * 0.5 + totalScore[1] * 0.5,
                    );
                    setSummaryScore(v);
                    setCalLoading(true);
                } else {
                    setSummaryScore(totalScore[0]);
                    setCalLoading(true);
                }
            }
        };

        console.log(calLoading);
        summaryCal();
        if (calLoading) {
            console.log(summaryScore);
        }
    }, [score, delistReason, currentratioPoint, accountingFraudPoint]);

    // 1번 결과 값 score
    // 2번 결과 값 delistReason
    // 3번 결과 값 currentratioPoint
    // 4번 결과 값 accountingFraudPoint
    return (
        <div>
            <div>
                {noSummary ? (
                    '와우~ 이 회사는 아~~무 정보가 없네용 퉤퉤'
                ) : calLoading ? (
                    <div>
                        <h1>1번 결과 : {score}</h1>
                        <h1>2번 결과 : {delistReason}</h1>
                        <h1>3번 결과 : {currentratioPoint}</h1>
                        <h1>4번 결과 : {accountingFraudPoint}</h1>
                        <h1>총점 {summaryScore}</h1>
                    </div>
                ) : (
                    '로딩중'
                )}

                {/* <RevenueStability corpCode={corpCode} />
                <DelistReason corpCode={corpCode} />
                <Currentratio corpCode={corpCode} />
                <AccountingFraud corpCode={corpCode} /> */}
            </div>
        </div>
    );
};

export default Summary;
