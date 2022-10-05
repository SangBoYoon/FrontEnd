/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import RevenueStability from './RevenueStability';

const CorpAnalysis: React.FC = () => {
    const { corpCode } = useParams<{ corpCode: string }>();
    console.log(corpCode);
    const [viewSelect, setViewSelect] = useState([
        true,
        false,
        false,
        false,
        false,
        false,
    ]);

    return (
        <>
            <TopBanner>dd</TopBanner>
            <Inner>
                <NavWrapper>
                    <button
                        onClick={() =>
                            setViewSelect([
                                true,
                                false,
                                false,
                                false,
                                false,
                                false,
                            ])
                        }
                    >
                        기업소개
                    </button>
                    <button
                        onClick={() =>
                            setViewSelect([
                                false,
                                true,
                                false,
                                false,
                                false,
                                false,
                            ])
                        }
                    >
                        수익안전성
                    </button>
                    <button
                        onClick={() =>
                            setViewSelect([
                                false,
                                false,
                                true,
                                false,
                                false,
                                false,
                            ])
                        }
                    >
                        관리종목/상장폐지
                    </button>
                    <button
                        onClick={() =>
                            setViewSelect([
                                false,
                                false,
                                false,
                                true,
                                false,
                                false,
                            ])
                        }
                    >
                        유동비율
                    </button>
                    <button
                        onClick={() =>
                            setViewSelect([
                                false,
                                false,
                                false,
                                false,
                                true,
                                false,
                            ])
                        }
                    >
                        분석가능성
                    </button>
                    <button
                        onClick={() =>
                            setViewSelect([
                                false,
                                false,
                                false,
                                false,
                                false,
                                true,
                            ])
                        }
                    >
                        분석가능성
                    </button>
                </NavWrapper>
                <div>
                    {viewSelect[0] ? (
                        '기업소개다.'
                    ) : viewSelect[1] ? (
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        <RevenueStability corpCode={corpCode!} />
                    ) : viewSelect[2] ? (
                        '세번째거다.'
                    ) : viewSelect[3] ? (
                        '네번째거다.'
                    ) : viewSelect[4] ? (
                        '많다 다섯번째거다.'
                    ) : (
                        '드디어마지막'
                    )}
                </div>
            </Inner>
        </>
    );
};
const NavWrapper = styled.div``;
const TopBanner = styled.div`
    width: 100%;
    height: 391px;
    background: #ededed;

    margin-bottom: 166px;
`;

const Inner = styled.div`
    margin: 0 504px;
`;

export default CorpAnalysis;
