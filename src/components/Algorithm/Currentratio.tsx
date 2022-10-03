/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Currentratio = () => {
    const [name, setName] = useState<string>('');
    // 종목명
    const [currentAssets, setCurrentAssets] = useState(0);
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

    useEffect(() => {
        axios({
            url: '/api/fnlttSinglAcntAll.json',
            method: 'get',
            params: {
                crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
                corp_code: '00447502',
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
                corp_code: '00447502',
                bsns_year: '2021',
                reprt_code: '11011',
                fs_div: 'OFS',
            },
            // open dart api를 통해 재무제표를 가져옴
        })
            .then((res) => {
                console.log(res.data.list);
                setCurrentAssets(res.data.list[0].thstrm_amount);
                setCurrentLiabilities(res.data.list[15].thstrm_amount);
            })
            .catch((err) => {
                console.error(err);
            });
        // 재무제표의 재무상태표-유동자산,유동부채 데이터를 가져옴
    }, []);
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

    return (
        <Induty>
            종목명 : {name} <br />
            유동자산 : {currentAssets} 원 <br />
            유동부채 : {currentLiabilities} 원
            <br />
            유동비율 : {currentratio}&#37; <br />
            점수 : {currentratioPoint} 점 <br />
            유동성 : {currentratioSafety} <br />
            설명 : {currentratioExplanation}
        </Induty>
    );
};

const Induty = styled.h1`
    font-size: 50px;
`;

export default Currentratio;
