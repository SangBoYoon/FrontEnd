import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../store/config';

export type corpType = {
    corpCode: string;
    corpName: string;
    corpCategory: string;
    likeCount: number;
};

const SearchInput: React.FC = () => {
    const [corps, setCorps] = useState<corpType[]>([]);
    const [value, setValue] = useState('');

    const CorporationsData = useSelector((state: RootState): corpType[] => {
        return state.corpsLoad.array;
    });

    return (
        <SearchWrap>
            <SearchBar>
                <input
                    type="text"
                    placeholder="종목명 검색"
                    onClick={() => setCorps(CorporationsData)}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
                <svg
                    width="47"
                    height="49"
                    viewBox="0 0 47 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="19.8596"
                        cy="19.8596"
                        r="12.1337"
                        transform="rotate(51.5 19.8596 19.8596)"
                        stroke="#C9C9C9"
                        strokeWidth="4"
                    />
                    <line
                        x1="30.3897"
                        y1="28.7801"
                        x2="37.4165"
                        y2="35.1042"
                        stroke="#C9C9C9"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>
            </SearchBar>

            <SearchResult>
                {value.length >= 2 &&
                    corps
                        // eslint-disable-next-line array-callback-return, consistent-return
                        .filter((item) => {
                            if (item.corpCode) {
                                if (value === '') {
                                    return item;
                                }
                                // eslint-disable-next-line no-else-return
                                else if (item.corpName.includes(value)) {
                                    return item;
                                }
                            }
                        })
                        .splice(0, 5)
                        .map((item, index) => (
                            <Link
                                to={`/corporations/${item.corpCode}`}
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                            >
                                <p>{item.corpName}</p>
                            </Link>
                        ))}
            </SearchResult>
        </SearchWrap>
    );
};

export default SearchInput;

const SearchWrap = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SearchResult = styled.div`
    position: absolute;
    top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 240px;
    box-shadow: 0px 10px 39px 1px rgba(0, 0, 0, 0.48);

    > a {
        color: #262626;
        text-decoration: none;
        background-color: #fff;
        width: 100%;
        height: 50px;
        border: 1px solid #eee;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        &:last-of-type {
            border-bottom-right-radius: 12px;
            border-bottom-left-radius: 12px;
        }

        > p {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 700;
            font-size: 23px;
            line-height: 29px;
            text-align: center;
            color: #262626;
        }
    }
`;

const SearchBar = styled.div`
    background: #515154;
    box-shadow: 0px 10px 39px 1px rgba(0, 0, 0, 0.48);
    border-radius: 56px;
    border: none;
    width: 364px;
    height: 60px;

    padding: 0 20px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > input {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        height: 30px;
        width: 300px;
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 300;
        font-size: 23px;
        line-height: 29px;
        color: rgba(230, 230, 230, 0.54);
        &:focus {
            outline: none;
        }
    }
`;
