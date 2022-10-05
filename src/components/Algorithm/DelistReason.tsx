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

const DelistReason = () => {
    const [name, setName] = useState<string>('');
    // 종목명
    const corpCode = '00447502';
    const [financialStatements2021, setFinancialStatements2021] = useState([]);
    const [financialStatements2020, setFinancialStatements2020] = useState([]);

    const [salesRevenue2021, setSalesRevenue2021] = useState<any>(0);
    const [salesRevenue2020, setSalesRevenue2020] = useState<any>(0);
    const [salesRevenuePoint, setSalesRevenuePoint] = useState<number>(0);

    const [capital2021, setCapital2021] = useState<any>(0);
    const [totalequity2021, setTotalequity2021] = useState<any>();
    let capitalImpairment2021 = 0;

    const [capitalImpairmentPoint, setCapitalImpairmentPoint] =
        useState<number>(0);
    const [delistReason, setDelistReason] = useState<number>(0);

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
                // console.log(res.data.list);
                setFinancialStatements2021(res.data.list);
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
                setFinancialStatements2020(res.data.list);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (financialStatements2021.length !== 0) {
            const currentAssetsArray2021: any = financialStatements2021.filter(
                (man: currentRatioType) => man.account_nm === '수익(매출액)',
            );
            const currentAssetsArray2020: any = financialStatements2020.filter(
                (man: currentRatioType) => man.account_nm === '수익(매출액)',
            );
            console.log(currentAssetsArray2021);
            setSalesRevenue2021(currentAssetsArray2021[0].thstrm_amount);
            setSalesRevenue2020(currentAssetsArray2020[0].thstrm_amount);
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
    }, [salesRevenue2021]);

    useEffect(() => {
        if (financialStatements2021.length !== 0) {
            const CapitalArray2021: any = financialStatements2021.filter(
                (man: currentRatioType) => man.account_nm === '자본금',
            );
            const totalequity2021: any = financialStatements2021.filter(
                (man: currentRatioType) => man.account_nm === '자본총계',
            );
            setCapital2021(CapitalArray2021[0].thstrm_amount);
            setTotalequity2021(totalequity2021[0].thstrm_amount);
        }
    }, [financialStatements2021, financialStatements2020]);
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

    return (
        <Induty>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            상장폐지이유 <br />
            종목명 : {name} <br />
            매출액 <br />
            2021 :{salesRevenue2021}원 <br />
            2020 : {salesRevenue2020}원 <br />
            매출액점수 : {salesRevenuePoint} <br />
            자본금 <br />
            2021:{capital2021} <br />
            자본총계 <br />
            2021 : {totalequity2021} <br />
            자본잠식률 <br />
            2021 : {capitalImpairment2021}% <br />
            자본잠식률 점수 : {capitalImpairmentPoint} <br />
            총점수:{delistReason}
            ㅎㅇ
        </Induty>
    );
};

const Induty = styled.div``;

export default DelistReason;
