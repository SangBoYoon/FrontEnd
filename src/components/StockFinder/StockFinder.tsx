import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import StockCategoryBtn from './StockCategoryBtn';
import StockFinderElement from './StockFinderElement';
import { RootState } from '../store/config';

type corpType = {
    corpCode: string;
    corpName: string;
    corpCategory: string;
    corpLike: number;
};

const StockFinder: React.FC = () => {
    const [corps, setCorps] = useState<corpType[]>([]);
    const [sortedCoprs, setSortedCorps] = useState<corpType[]>([]);

    const category = useSelector((state: RootState) => {
        return state.listCategory.category;
    });

    const getAxiosCategory = (category: string) => {
        axios
            .get('/accounter/corps')
            .then((res) => {
                setCorps(res.data.data);
                setSortedCorps(
                    corps.filter((v) => v.corpCategory === category),
                );
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (category !== '전체') {
            getAxiosCategory(category);
        } else {
            axios
                .get('/accounter/corps')
                .then((res) => {
                    setCorps(res.data.data);
                    setSortedCorps(res.data.data);
                })
                .catch((err) => console.log(err));
        }
    }, [category]);

    useEffect(() => {
        switch (category) {
            case '전체':
                break;
            case '금속':
                break;
            case '제약':
                break;
            case '음식료·담배':
                break;
            case '운송장비·부품':
                break;
            case '금융':
                break;
            case '비금속':
                break;
            case '종이·목재':
                break;
            case '유통':
                break;
            case 'IT부품':
                break;
            case '기계·장비':
                break;
            case '건설':
                break;
            case '화학':
                break;
            case '일반전기전자':
                break;
            case '컴퓨터서비스':
                break;
            case '정보기기':
                break;
            case '의료·정밀기기':
                break;
            case '반도체':
                break;
            case '기타제조':
                break;
            case '광업':
                break;
            case '운송':
                break;
            case '통신장비':
                break;
            case '숙박·음식':
                break;
            case '디지털컨텐츠':
                break;
            case '출판·매체복제':
                break;
            case '기타서비스':
                break;
            case '섬유·의류':
                break;
            case '통신서비스':
                break;
            case '오락·문화':
                break;
            case '농업':
                break;
            case '방송서비스':
                break;
            case '소프트웨어':
                break;
            case '인터넷':
                break;
            case '전기·가스·수도':
                break;
            default:
                break;
        }
    }, [category]);

    const allCategory = corps.map((v) => {
        return v.corpCategory;
    });

    return (
        <Inner>
            <TopBanner>dd</TopBanner>
            <ContentsWrapper>
                <Category>
                    <ul>
                        {allCategory
                            .filter((a, b) => allCategory.indexOf(a) === b)
                            .map((v, index) => {
                                return (
                                    // eslint-disable-next-line react/jsx-key, react/no-array-index-key
                                    <li key={index}>
                                        <StockCategoryBtn category={v} />
                                    </li>
                                );
                            })}
                    </ul>
                </Category>
                <Corps>
                    <CorpsCategory>
                        <h1>{category}</h1>
                    </CorpsCategory>
                    <ul>
                        {sortedCoprs.map((v) => {
                            return (
                                <li key={v.corpCode}>
                                    <StockFinderElement
                                        corpCode={v.corpCode}
                                        corpName={v.corpName}
                                        corpCategory={v.corpCategory}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </Corps>
            </ContentsWrapper>
        </Inner>
    );
};

const CorpsCategory = styled.div`
    width: 214px;
    height: 36px;
    h1 {
        width: 214px;
        height: 36px;
        font-weight: 700;
        font-size: 29px;
        color: #ececec;
    }
`;
const ContentsWrapper = styled.div`
    display: flex;
`;
const TopBanner = styled.div`
    width: 100%;
    height: 391px;
    background: #ededed;

    margin-bottom: 166px;
`;

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    ul,
    li {
        list-style: none;
    }
`;

const Corps = styled.div`
    width: 1300px;

    ul {
        display: flex;
        flex-wrap: wrap;
    }

    li {
        margin-right: 37px;
    }
`;

const Category = styled.div`
    margin-right: 60px;

    font-size: 18px;
    text-align: center;
    color: #ececec;
`;

export default StockFinder;
