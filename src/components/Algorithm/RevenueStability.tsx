import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jStat from 'jstat';
import { useParams } from 'react-router-dom';

type accountType = {
    account_nm?: string; // 당기순이익(손실)
    sj_nm?: string; // 포괄손익계산서
    thstrm_amount?: string; // 영업이익
};

type RevenueStabilityType = {
    corpCode: string;
};

type corpType = {
    data: string[];
    corpCode: string;
    corpName: string;
    corpCategory: string;
    likeCount: number;
};

const RevenueStability: React.FC = () => {
    const { corpCode } = useParams();
    const fiveYears = ['2021', '2020', '2019', '2018', '2017'];

    const [allAccountList, setAllAccountList] = useState<accountType[]>([]);
    const [accountList1, setAccountList1] = useState<accountType[]>([]);
    const [accountList2, setAccountList2] = useState<accountType[]>([]);
    const [accountList3, setAccountList3] = useState<accountType[]>([]);
    const [accountList4, setAccountList4] = useState<accountType[]>([]);
    const [accountList5, setAccountList5] = useState<accountType[]>([]);

    const [account, setAorp] = useState<corpType[]>([]);

    const [revenue, setRevenue] = useState([0, 0, 0, 0, 0]);

    const [loading, setLoading] = useState(false);

    const CRTFC_KEY = '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0';

    useEffect(() => {
        axios
            .all([
                axios({
                    url: '/api/fnlttSinglAcntAll.json',
                    method: 'get',
                    params: {
                        crtfc_key: CRTFC_KEY,
                        corp_code: { corpCode },
                        bsns_year: '2021',
                        reprt_code: '11011',
                        fs_div: 'OFS',
                    },
                }),
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
                    setAccountList1(res2021.data);
                    setAccountList2(res2020.data);
                    setAccountList3(res2019.data);
                    setAccountList4(res2018.data);
                    setAccountList5(res2017.data);
                    console.log(accountList1);
                    console.log(accountList2);
                    setLoading(!loading);

                    //         if (loading) {
                    //             const value1 = Object.values(accountList1).filter(
                    //                 (v) =>
                    //                     v.account_nm === '당기순이익(손실)' &&
                    //                     v.sj_nm === '포괄손익계산서',
                    //             );
                    //             const value2 = Object.values(accountList2).filter(
                    //                 (v) =>
                    //                     v.account_nm === '당기순이익(손실)' &&
                    //                     v.sj_nm === '포괄손익계산서',
                    //             );
                    //             const value3 = Object.values(accountList3).filter(
                    //                 (v) =>
                    //                     v.account_nm === '당기순이익(손실)' &&
                    //                     v.sj_nm === '포괄손익계산서',
                    //             );
                    //             const value4 = Object.values(accountList4).filter(
                    //                 (v) =>
                    //                     v.account_nm === '당기순이익(손실)' &&
                    //                     v.sj_nm === '포괄손익계산서',
                    //             );
                    //             const value5 = Object.values(accountList5).filter(
                    //                 (v) =>
                    //                     v.account_nm === '당기순이익(손실)' &&
                    //                     v.sj_nm === '포괄손익계산서',
                    //             );

                    //             setRevenue([
                    //                 Number(value1[0].thstrm_amount),
                    //                 Number(value2[0].thstrm_amount),
                    //                 Number(value3[0].thstrm_amount),
                    //                 Number(value4[0].thstrm_amount),
                    //                 Number(value5[0].thstrm_amount),
                    //             ]);
                    //             // const result = [
                    //             //     value1[0].thstrm_amount,
                    //             //     value2[0].thstrm_amount,
                    //             //     value3[0].thstrm_amount,
                    //             //     value4[0].thstrm_amount,
                    //             //     value5[0].thstrm_amount,
                    //             // ];

                    //             // return result;
                    //         }
                }),
            )
            .catch((err) => {
                console.error(err);
            });
    }, []);

    console.log(revenue);

    // console.log(findAccount());

    // const Calculator = () => {
    //     return jStat.corrcoeff(findAccount(), [2021, 2020, 2019, 2018, 2017]);
    // };

    // console.log(Calculator());

    return (
        <div>
            <div>
                gd
                {/* {corploading &&
                    corp.map((v) => {
                        // eslint-disable-next-line react/jsx-key
                        return <li>{v.corpCode}</li>;
                    })} */}
            </div>
        </div>
    );
};

export default RevenueStability;
