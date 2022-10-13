/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BookmarkBtn from '../Common/BookmarkBtn';

type corpCodeType = {
    corpCode: string;
};

const CorpIntroduction: React.FC<corpCodeType> = ({ corpCode }) => {
    const [name, setName] = useState<string>('');
    // 종목명
    const [homePage, setHomePage] = useState<string>('');
    const [phoneNum, setPhoneNum] = useState<string>('');
    const [stockCode, setStockCode] = useState<string>('');
    const [stockCategory, setStockCategory] = useState<string>('');

    useEffect(() => {
        axios({
            url: 'https://accountercors.herokuapp.com/https://opendart.fss.or.kr/api/company.json',
            method: 'get',
            params: {
                crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
                corp_code: `${corpCode}`,
            },
        })
            .then((res) => {
                setName(res.data.corp_name);
                setHomePage(res.data.hm_url);
                setPhoneNum(res.data.phn_no);
                setStockCode(res.data.stock_code);
            })
            .catch((err) => {
                console.error(err);
            });
        axios({
            url: `http://54.180.19.84:8080/accounter/corp/${corpCode}`,
            method: 'get',
        })
            .then((res) => {
                setStockCategory(res.data.data.corpCategory);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <Inner>
            <Header>
                <CorpNameCategoryContainer>
                    <h1>{name}</h1>
                    <p>{stockCategory}</p>
                </CorpNameCategoryContainer>
            </Header>
            <Information>
                <InformatioTupel>홈페이지 {homePage}</InformatioTupel>
                <InformatioTupel>전화번호 {phoneNum}</InformatioTupel>
                <InformatioTupel>종목코드 {stockCode}</InformatioTupel>
            </Information>
            <BookmarkBtn corpCode={corpCode} />
        </Inner>
    );
};

const Inner = styled.div`
    position: relative;
    width: 912px;
    height: 167px;
    background-color: #ededed;
    border-radius: 15px;
`;

const Header = styled.div`
    display: flex;
`;

const CorpNameCategoryContainer = styled.div`
    margin-left: 27px;
    margin-top: 22px;
    display: flex;
    align-items: center;
    h1 {
        color: black;
        font-size: 20px;
        font-weight: 700;
    }
    p {
        font-size: 13px;
        color: #bebdbd;
        margin-left: 10px;
    }
`;

const Information = styled.div`
    margin-top: 17px;
    color: #4a4b4f;
    display: flex;
    flex-direction: column;
    margin-left: 27px;
`;

const InformatioTupel = styled.div`
    display: flex;
    margin-bottom: 10px;
    font-weight: 300;
    color: #4a4b4f;
`;

export default CorpIntroduction;
