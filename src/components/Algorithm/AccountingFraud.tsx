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
    const [name, setName] = useState<string>('');
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
    const [dataEx, setDataEx] = useState(true);
    const [noDataPrint, setNoDataPrint] = useState(false); // 4개년 데이터 없을 시

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
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('90점');
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('90점');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('60점');
                    }
                }
            } else if (totalComprehensiveIncome2019 === -1) {
                if (totalComprehensiveIncome2020 === +1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('90점');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('80점');
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('80점');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('30점');
                    }
                }
            }
        } else if (totalComprehensiveIncome2018 === -1) {
            if (totalComprehensiveIncome2019 === +1) {
                if (totalComprehensiveIncome2020 === +1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('90점');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('90점');
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('80점');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('60점');
                    }
                }
            } else if (totalComprehensiveIncome2019 === -1) {
                if (totalComprehensiveIncome2020 === +1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('80점');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('70점');
                    }
                } else if (totalComprehensiveIncome2020 === -1) {
                    if (totalComprehensiveIncome2021 === +1) {
                        setaccountingFraudPoint('80점');
                    } else if (totalComprehensiveIncome2021 === -1) {
                        setaccountingFraudPoint('0점');
                    }
                }
            }
        }
    }, [totalComprehensiveIncome2018]);

    return (
        <Induty>
            {noDataPrint ? (
                '데이터 없슬 때 띄울 화면'
            ) : (
                <div>
                    <br />
                    <br />
                    종목명 : {name} <br />
                    1이면 양수(흑자)라는 뜻이고 -1이면 음수(적자)라는 뜻임{' '}
                    <br />
                    2021 :{totalComprehensiveIncome2021} <br />
                    2020 : {totalComprehensiveIncome2020} <br />
                    2019 : {totalComprehensiveIncome2019} <br />
                    2018 : {totalComprehensiveIncome2018} <br />
                    분식가능성점수 : {accountingFraudPoint} <br />
                </div>
            )}
        </Induty>
    );
};

const Induty = styled.h1`
    font-size: 50px;
`;

export default AccountingFraud;
