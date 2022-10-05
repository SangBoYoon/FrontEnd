import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jStat from 'jstat';
import { useParams } from 'react-router-dom';
import { kMaxLength } from 'buffer';
import { ResultType } from '@remix-run/router/dist/utils';

type accountType = {
    account_nm: string; // 당기순이익(손실)
    sj_nm: string; // 포괄손익계산서
    thstrm_amount: string; // 영업이익
};

type RevenueStabilityType = {
    corpCode: string;
};

type RevenueType = {
    thstrm_amount: string; // 영업이익
};

const RevenueStability: React.FC<RevenueStabilityType> = ({ corpCode }) => {
    const [accountList1, setAccountList1] = useState<accountType[]>([]);
    const [accountList2, setAccountList2] = useState<accountType[]>([]);
    const [accountList3, setAccountList3] = useState<accountType[]>([]);
    const [accountList4, setAccountList4] = useState<accountType[]>([]);
    const [accountList5, setAccountList5] = useState<accountType[]>([]);
    const [error, setError] = useState(null);

    const [dataEx, setDataEx] = useState(true);

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
                    if (
                        res2021 !== null &&
                        res2021 !== undefined &&
                        res2020 !== null &&
                        res2020 !== undefined &&
                        res2019 !== null &&
                        res2019 !== undefined &&
                        res2018 !== null &&
                        res2018 !== undefined &&
                        res2017 !== null &&
                        res2017 !== undefined
                    ) {
                        setAccountList1(res2021.data.list);
                        setAccountList2(res2020.data.list);
                        setAccountList3(res2019.data.list);
                        setAccountList4(res2018.data.list);
                        setAccountList5(res2017.data.list);
                        setDataEx(true);
                    } else {
                        setDataEx(false);
                        console.log(dataEx);
                        console.log('axios에서부터 데이터가 없음');
                    }
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

                const resultObj = [
                    value1[0],
                    value2[0],
                    value3[0],
                    value4[0],
                    value5[0],
                ];
                console.log(resultObj);
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
                    const result = [
                        Number(value5[0].thstrm_amount),
                        Number(value4[0].thstrm_amount),
                        Number(value3[0].thstrm_amount),
                        Number(value2[0].thstrm_amount),
                        Number(value1[0].thstrm_amount),
                    ];

                    const Calculator = () => {
                        return jStat.corrcoeff(
                            result,
                            [2017, 2018, 2019, 2020, 2021],
                        );
                    };

                    console.log(Calculator());
                }
            } else {
                console.log('데이터없음');
            }
        }
    }, [accountList1, accountList2, accountList3, accountList4, accountList5]);

    return (
        <div>
            <div>
                sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfs
                {/* <h3>2021년 영업수익 {value1[0].thstrm_amount}</h3>
                <h3>2020년 영업수익 {value1[1].thstrm_amount}</h3>
                <h3>2019년 영업수익 {value1[2].thstrm_amount}</h3>
                <h3>2018년 영업수익 {value1[3].thstrm_amount}</h3>
                <h3>2017년 영업수익 {value1[4].thstrm_amount}</h3> */}
            </div>
        </div>
    );
};

export default RevenueStability;
