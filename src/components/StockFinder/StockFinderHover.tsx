/* eslint-disable camelcase */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BookmarkBtn from '../Common/BookmarkBtn';

type corpDetailType = {
    corp_name: string;
    hm_url: string;
    phn_no: string;
};

type corpPropsType = {
    corpCode: string;
};

const StockFinderHover: React.FC<corpPropsType> = ({ corpCode }) => {
    const [corpData, setCorpData] = useState<corpDetailType>({
        corp_name: '',
        hm_url: '',
        phn_no: '',
    });

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
                const { corp_name, hm_url, phn_no } = res.data;

                setCorpData({
                    corp_name,
                    hm_url,
                    phn_no,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    return (
        <HoverWrap>
            <BookmarkBtn corpCode={corpCode} />
            <Link to={`/corporations/${corpCode}`}>
                <HoverInner>
                    <HoverHead>
                        <p>{corpData.corp_name}</p>
                    </HoverHead>
                    <HoverContent>
                        {corpData.hm_url.length > 2 && (
                            <div>
                                <p>홈페이지</p>
                                <p>{corpData.hm_url}</p>
                            </div>
                        )}

                        <div>
                            <p>전화번호</p>
                            <p>{corpData.phn_no}</p>
                        </div>
                        <div>
                            <p>종목코드</p>
                            <p>{corpCode}</p>
                        </div>
                    </HoverContent>
                </HoverInner>
            </Link>
        </HoverWrap>
    );
};

export default StockFinderHover;

const HoverWrap = styled.div`
    top: 0;
    left: 0;
    position: absolute;
    width: 279px;
    height: 215px;
    background: rgba(226, 226, 226, 0.78);
    backdrop-filter: blur(2px);
    border-radius: 15px;
    > a {
        text-decoration: none;
    }
`;

const HoverInner = styled.div`
    margin: 21px;
    display: flex;
    flex-direction: column;
`;

const HoverHead = styled.div`
    border-bottom: 2px solid rgba(104, 104, 104, 0.17);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 31px;
    > p {
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 25px;
        color: #686868;
        margin-bottom: 6px;
    }
`;

const HoverContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 11px;
    > div {
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        p {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 300;
            font-size: 14px;
            line-height: 18px;
            color: #4a4b4f;
            &:nth-of-type(2) {
                width: calc(100% - 63px);
                margin-left: 10px;
                white-space: normal;
                word-wrap: break-word;
            }
            &:first-of-type {
                white-space: nowrap;
            }
        }
    }
`;
