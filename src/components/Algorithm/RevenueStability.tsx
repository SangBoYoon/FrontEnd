import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jStat from 'jstat';

type accountType = {
    account_nm: string; // 당기순이익(손실)
    sj_nm: string; // 포괄손익계산서
    thstrm_amount: string; // 영업이익
};

type corpType = {
    data: string[];
    corpCode: string;
    corpName: string;
    corpCategory: string;
    likeCount: number;
};

const RevenueStability: React.FC = () => {
    const fiveYears = ['2021', '2020', '2019', '2018', '2017'];

    const [accountList1, setAccountList1] = useState<accountType[]>([]);
    const [accountList2, setAccountList2] = useState<accountType[]>([]);
    const [accountList3, setAccountList3] = useState<accountType[]>([]);
    const [accountList4, setAccountList4] = useState<accountType[]>([]);
    const [accountList5, setAccountList5] = useState<accountType[]>([]);
    const [corp, setCorp] = useState<corpType[]>([]);
    const [corpCode, setCorpCode] = useState('');
    const [revenue, setRevenue] = useState([]);
    const [corpID, setCorpID] = useState([]);
    const [corploading, setCoprLoading] = useState(false);
    const [loading, setLoading] = useState([false, false, false, false, false]);

    const CRTFC_KEY = '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0';

    useEffect(() => {
        axios
            .get('/accounter/corps')
            .then((res) => {
                setCoprLoading(!corploading);
                setCorp(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);
    console.log(corp[0].corpCode);

    const coprsCode = corp.map((v) => {
        return v.corpCode;
    });
    console.log(coprsCode);

    // useEffect(() => {
    //     axios
    //         .all([
    //             axios.get(
    //                 `/api/fnlttSinglAcntAll.json?crtfc_key=${CRTFC_KEY}&corp_code=00126380&bsns_year=2018&reprt_code=11011&fs_div=OFS`,
    //             ),
    //             axios.get(
    //                 `${YOUTUBE_API_URL}&pageToken=${nextPageToken[1]}&maxResults=50&key=${key}`,
    //             ),
    //             axios.get(
    //                 `${YOUTUBE_API_URL}&pageToken=${nextPageToken[2]}&maxResults=50&key=${key}`,
    //             ),
    //         ])
    //         .then(
    //             axios.spread((res1, res2, res3, res4) => {
    //                 const data1 = res1.data.items;
    //                 const data2 = res2.data.items;
    //                 const data3 = res3.data.items;
    //                 const data4 = res4.data.items;
    //                 const res = [...data1, ...data2, ...data3, ...data4];
    //                 setPlaylist(res);
    //                 setLoading(false);
    //             }),
    //         )
    //         .catch(() => {});
    // }, []);

    // useEffect(() => {
    //     axios({
    //         url: '/api/fnlttSinglAcntAll.json',
    //         method: 'get',
    //         params: {
    //             crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
    //             corp_code: '00447502',
    //             bsns_year: '2021',
    //             reprt_code: '11011',
    //             fs_div: 'OFS',
    //         },
    //     })
    //         .then((res) => {
    //             setAccountList1(res.data.list);
    //             setLoading([true, false, false, false, false]);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    //     axios({
    //         url: '/api/fnlttSinglAcntAll.json',
    //         method: 'get',
    //         params: {
    //             crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
    //             corp_code: '00447502',
    //             bsns_year: '2020',
    //             reprt_code: '11011',
    //             fs_div: 'OFS',
    //         },
    //     })
    //         .then((res) => {
    //             setAccountList2(res.data.list);
    //             setLoading([true, true, false, false, false]);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    //     axios({
    //         url: '/api/fnlttSinglAcntAll.json',
    //         method: 'get',
    //         params: {
    //             crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
    //             corp_code: '00447502',
    //             bsns_year: '2019',
    //             reprt_code: '11011',
    //             fs_div: 'OFS',
    //         },
    //     })
    //         .then((res) => {
    //             setAccountList3(res.data.list);
    //             setLoading([true, true, true, false, false]);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    //     axios({
    //         url: '/api/fnlttSinglAcntAll.json',
    //         method: 'get',
    //         params: {
    //             crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
    //             corp_code: '00447502',
    //             bsns_year: '2018',
    //             reprt_code: '11011',
    //             fs_div: 'OFS',
    //         },
    //     })
    //         .then((res) => {
    //             setAccountList4(res.data.list);
    //             setLoading([true, true, true, true, false]);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    //     axios({
    //         url: '/api/fnlttSinglAcntAll.json',
    //         method: 'get',
    //         params: {
    //             crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
    //             corp_code: '00447502',
    //             bsns_year: '2017',
    //             reprt_code: '11011',
    //             fs_div: 'OFS',
    //         },
    //     })
    //         .then((res) => {
    //             setAccountList5(res.data.list);
    //             setLoading([true, true, true, true, true]);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, []);

    // const findAccount = () => {
    //     if (
    //         loading[0] === true &&
    //         loading[1] === true &&
    //         loading[2] === true &&
    //         loading[3] === true &&
    //         loading[4] === true
    //     ) {
    //         const value1 = accountList1.filter(
    //             (v) =>
    //                 v.account_nm === '당기순이익(손실)' &&
    //                 v.sj_nm === '포괄손익계산서',
    //         );
    //         const value2 = accountList2.filter(
    //             (v) =>
    //                 v.account_nm === '당기순이익(손실)' &&
    //                 v.sj_nm === '포괄손익계산서',
    //         );
    //         const value3 = accountList3.filter(
    //             (v) =>
    //                 v.account_nm === '당기순이익(손실)' &&
    //                 v.sj_nm === '포괄손익계산서',
    //         );
    //         const value4 = accountList4.filter(
    //             (v) =>
    //                 v.account_nm === '당기순이익(손실)' &&
    //                 v.sj_nm === '포괄손익계산서',
    //         );
    //         const value5 = accountList5.filter(
    //             (v) =>
    //                 v.account_nm === '당기순이익(손실)' &&
    //                 v.sj_nm === '포괄손익계산서',
    //         );
    //         const valueArr = { value1, value2, value3, value4, value5 };
    //         const result = [
    //             value1[0].thstrm_amount,
    //             value2[0].thstrm_amount,
    //             value3[0].thstrm_amount,
    //             value4[0].thstrm_amount,
    //             value5[0].thstrm_amount,
    //         ];

    //         return result;
    //     }
    //     return '데이터가 불려오지 않음';
    // };
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
