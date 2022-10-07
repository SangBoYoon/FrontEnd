/* eslint-disable no-nested-ternary */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jStat from 'jstat';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ChartData,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const RevenueStability = ({ corpCode }) => {
    const [accountList1, setAccountList1] = useState([]); // 2021
    const [accountList2, setAccountList2] = useState([]); // 2020
    const [accountList3, setAccountList3] = useState([]); // 2019
    const [accountList4, setAccountList4] = useState([]); // 2018
    const [accountList5, setAccountList5] = useState([]); // 2017
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
                    // if (
                    //     res2021 !== null &&
                    //     res2021 !== undefined &&
                    //     res2020 !== null &&
                    //     res2020 !== undefined &&
                    //     res2019 !== null &&
                    //     res2019 !== undefined &&
                    //     res2018 !== null &&
                    //     res2018 !== undefined &&
                    //     res2017 !== null &&
                    //     res2017 !== undefined
                    // ) {
                    setAccountList1(res2021.data.list);
                    setAccountList2(res2020.data.list);
                    setAccountList3(res2019.data.list);
                    setAccountList4(res2018.data.list);
                    setAccountList5(res2017.data.list);
                    setDataEx(true);
                    // } else {
                    //     setDataEx(false);
                    //     console.log(dataEx);
                    //     console.log('axios에서부터 데이터가 없음');
                    // }
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

                    const v = jStat.corrcoeff(
                        result,
                        [2017, 2018, 2019, 2020, 2021],
                    );
                    console.log(v);
                    console.log(Math.round(v * 10) / 10);

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

                        console.log(count);
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

                    console.log(calculationResult);
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

    const options = {
        // 컨테이너가 수행 할 때 차트 캔버스의 크기를 조정(dafalut : true)
        responsive: true,
        // 크기 조정 이벤트 후 새 크기로 애니메이션하는 데 걸리는 시간(밀리 초) (defalut : 0)
        responsiveAnimationDuration: 1000,
        // (width / height) 크기를 조정할 떄 원래 캔버스 종횡비를 유지 (defalut : true)
        maintainAspectRatio: true,
        // 캔버스 종횡비( width / height, 정사각형 캔버스를 나타내는 값) 높이가 속성으로 또는 스타일 통해 명시적으로 정의된 경우이 옵션은 무시
        aspectRatio: 2,
        // 크기 조정이 발생할 때 호출

        hover: {
            mode: 'nearest',
            intersect: true,
        },
        scales: {
            x: {
                display: false,
                scaleLabel: {
                    display: true,
                },
            },
            y: {
                display: false,
                scaleLabel: {
                    display: true,
                },
            },
        },
    };

    const labels = ['2017', '2018', '2019', '2020', '2021'];
    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                data: [
                    allRevenue[0],
                    allRevenue[1],
                    allRevenue[2],
                    allRevenue[3],
                    allRevenue[4],
                ],
                borderColor: '#0064FF',
                backgroundColor: 'white',
                fill: true,
            },
        ],
    };

    const data2 = {
        labels,
        datasets: [
            {
                type: 'scatter',
                data: [
                    allRevenue[0],
                    allRevenue[1],
                    allRevenue[2],
                    allRevenue[3],
                    allRevenue[4],
                ],
                borderColor: '#0064FF',
                backgroundColor: 'white',
            },
        ],
    };

    return (
        <div>
            <div>
                {noDataPrint ? (
                    <NoData>
                        <h2>수익안전성</h2>
                        <div>입력된 데이터가 없어요 😥 </div>
                    </NoData>
                ) : (
                    <Inner>
                        <TopBoxWrapper>
                            <TopBox>
                                <span>
                                    <h1>영업수익 변화</h1>
                                    <h3>2017~2021년</h3>
                                </span>
                                <span>
                                    <Line
                                        options={options}
                                        type="line"
                                        data={data}
                                    />
                                </span>
                                <span>
                                    <h2>2017</h2>
                                    <h2>2018</h2>
                                    <h2>2019</h2>
                                    <h2>2020</h2>
                                    <h2>2021</h2>
                                </span>
                            </TopBox>
                            <TopBox>
                                <span>
                                    <h1>상관계수</h1>
                                    <h3>-1 ~ 1</h3>
                                </span>
                                <span>
                                    <Line
                                        options={options}
                                        type="scatter"
                                        data={data2}
                                    />
                                </span>
                                <span>
                                    <h1>
                                        {Math.round(calculationResult * 10) /
                                            10}
                                    </h1>
                                </span>
                            </TopBox>
                            <TopBox>
                                <span>
                                    <h1>영업수익의 적자</h1>
                                    <div />
                                </span>

                                <span>
                                    <span>
                                        <h4>1년 적자</h4>
                                        <h4>-10점</h4>
                                    </span>
                                    <span>
                                        <h4>2년 적자</h4>
                                        <h4>-20점</h4>
                                    </span>
                                    <span>
                                        <h4>3년 적자</h4>
                                        <h4>-30점</h4>
                                    </span>
                                    <span>
                                        <h4>3년 연속 적자</h4>
                                        <h4>-40점</h4>
                                    </span>
                                </span>
                            </TopBox>
                        </TopBoxWrapper>
                        <BottomBox>
                            <h3>영업수익 변화</h3>
                            <h5>
                                기업의 5개년 영업 수익을 통한 상관 계수와 영업
                                수익 적자별 점수를 합산하여 수익안전성 점검
                                점수를 산출합니다.
                            </h5>

                            <div>
                                <h1>
                                    {score <= 100 && score >= 75
                                        ? '🚀 수익이 계속 성장하고 있어요.'
                                        : // eslint-disable-next-line no-nested-ternary
                                        score < 75 && score >= 50
                                        ? '🔥 수익이 불안정하지만 성장하고 있어요. '
                                        : score < 50 && score >= 25
                                        ? '😣 수익이 불안정하고 하락세예요.'
                                        : '🥶 수익이 계속 하락하고 있어요.'}
                                </h1>
                                <h2>{score}점</h2>
                            </div>
                        </BottomBox>

                        <Info>
                            Accouter가 제공하는 금융 정보는 각 콘텐츠
                            제공업체로부터 받는 정보로 투자 참고사항이며, 오류가
                            발생하거나 지연될 수 있습니다. Accouter는 제공된
                            정보에 의한 투자결과에 법적책임을 지지 않습니다.
                            게시된 정보는 무단으로 배포할 수 없습니다.
                        </Info>
                    </Inner>
                )}
            </div>
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

const Info = styled.div`
    width: 913px;
    height: 265px;
`;

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BottomBox = styled.div`
    width: 913px;
    height: 265px;
    background: #ffffff;
    border-radius: 15px;
    margin-top: 19px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 50px;

    div {
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-weight: 700;
        font-size: 32px;
        color: #4f4f4f;
        font-weight: 700;
        margin-bottom: 9px;
    }

    h2 {
        font-size: 20px;
        line-height: 25px;
        color: #4f4f4f;
    }

    h3 {
        font-size: 15px;
        color: #4f4f4f;
    }

    h5 {
        margin-top: 5px;
        font-size: 13px;
    }
`;

const TopBoxWrapper = styled.div`
    display: flex;
    justify-content: center;

    div:first-child {
        display: flex;
        flex-direction: column;

        span {
            display: flex;
        }
        /* span:first-child {
            margin-bottom: 29px;
        } */
        span:nth-child(2) {
            width: 240px;
            height: 154px;
            margin: auto;
            /* background: linear-gradient(
                180deg,
                rgba(0, 100, 255, 0.55) 8.12%,
                rgba(255, 255, 255, 0) 95.78%
            ); */
        }
        h1 {
            width: fit-content;
            height: 16px;
            font-size: 13px;
            line-height: 16px;
            color: #4f4f4f;
            margin-right: 6px;
        }

        h3 {
            font-size: 10px;
            color: #828282;
        }

        h2 {
            margin-right: 15px;
            width: 29px;
            height: 15px;
            font-weight: 300;
            font-size: 12px;
            color: #4f4f4f;
            line-height: 15px;
        }

        h2:first-child {
            margin-left: 24px;
        }
    }

    div:nth-child(2) {
        margin: 0 19px;

        display: flex;
        flex-direction: column;

        span {
            display: flex;
        }

        span:nth-child(2) {
            width: 240px;
            height: 154px;
            margin: auto;
        }

        span:nth-child(3) {
            margin: 0 auto;
        }

        h1 {
            width: fit-content;
            height: 16px;
            font-size: 13px;
            line-height: 16px;
            color: #4f4f4f;
            margin-right: 6px;
        }

        h3 {
            font-size: 10px;
            color: #828282;
        }
    }

    div:nth-child(3) {
        display: flex;
        flex-direction: column;

        span:first-child {
            div {
                width: 252px;
                height: 0px;
                border-top: 1px solid #d2d2d2;
                margin: 17.5px 20px;
            }
        }

        span:nth-child(2) {
            span {
                display: flex;
                justify-content: space-between;

                h4 {
                    margin-bottom: 20px;
                    width: fit-content;
                }
            }
        }

        h1 {
            width: fit-content;
            height: 16px;
            font-size: 13px;
            line-height: 16px;
            color: #4f4f4f;
            margin-right: 6px;
        }

        h4 {
            font-weight: 300;
            font-size: 12px;
            line-height: 15px;
            color: #4f4f4f;
        }
    }
`;

const TopBox = styled.div`
    box-sizing: border-box;
    padding: 20px;
    width: 292px;
    height: 265px;
    background: #ffffff;
    border: 1px solid #7c7c7c;
    border-radius: 15px;
`;

export default RevenueStability;
