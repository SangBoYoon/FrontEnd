import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/config';
import BlockWrap from '../Common/BlockWrap';
import CategoryBlocks from './CategoryBlocks';
import { CategoryData } from './CategoryData';
import IntroduceBlock from './IntroduceBlock';
import RecommendBlocks from './RecommendBlocks';
import SearchInput from './SearchInput';
import { bookmarkLoad } from '../../features/bookmark';
import { corpType, setCorps } from '../../store/slices/corpsLoadSlice';

const Main: React.FC = () => {
    const [newArr, setNewArr] = useState<Array<string>>([]);
    const [newCorps, setNewCorps] = useState<corpType[]>([]);
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => ({
        user: state.user.email,
    }));

    const BookmarkData = useSelector((state: RootState) => {
        return state.userBookmarkList.array;
    });

    const CorpsData = useSelector((state: RootState) => {
        return state.corpsLoad.array;
    });

    useEffect(() => {
        if (CorpsData.length > 1) {
            setNewCorps(
                CorpsData.map((item) => item)
                    .sort((a, b) => b.likeCount - a.likeCount)
                    .slice(0, 8),
            );
        }
    }, [CorpsData]);

    useEffect(() => {
        if (user) {
            bookmarkLoad(dispatch);
        }

        axios
            .get(`http://54.180.19.84:8080/accounter/corps`)
            .then((res) => {
                dispatch(setCorps(res.data.data));
            })
            .catch(() => {
                console.log('corporations load err');
            });

        const categoryTempData = CategoryData;
        const newTempArr = [];
        for (let i = 0; i < 7; i += 1) {
            const index = Math.floor(Math.random() * categoryTempData.length);
            newTempArr.push(categoryTempData[index]);
            categoryTempData.splice(index, 1);
        }
        setNewArr(newTempArr);
    }, []);

    return (
        <div className="main">
            <SearchWrap>
                <BackgroundCover>
                    <div>
                        <h1>
                            <span>A</span>CCOUNTER
                        </h1>
                        <div>
                            <SearchInput />
                        </div>
                    </div>
                </BackgroundCover>
            </SearchWrap>
            <MainBody>
                <BlockWrap title="추천 산업군">
                    <CategoryBlocks arr={newArr} />
                </BlockWrap>
                <BlockWrap title="추천 품목">
                    <RecommendBlocks type="recommend" data={newCorps} />
                </BlockWrap>
                <BlockWrap title="북마크">
                    <RecommendBlocks
                        type="bookmark"
                        bookmarkData={BookmarkData}
                    />
                </BlockWrap>
                <BlockWrap title="서비스 소개">
                    <IntroduceBlock />
                </BlockWrap>
            </MainBody>
        </div>
    );
};

export default Main;

const MainBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 44px;
    margin-bottom: 106px;
`;

const SearchWrap = styled.div`
    padding-top: 60px;
    width: 100%;
    height: 391px;
    background: rgba(60, 61, 68, 0.88);
    background-position: center;
    background-size: cover;
    background-image: url('https://s3-alpha-sig.figma.com/img/51ca/46bc/095250268dc0e1a366be8d8a9ab73e8e?Expires=1665964800&Signature=BRWscUNoRbZNRTWa11jBUx0WSBcBx7Id-cLabu9d8fWM1nWAFgnDSBCpk2jm4dvsKTmnEiIoRFB4iivUxTxcpgylAbaGTjEPuhO9Zo0QtfmorAAU5EbmBs0T-OOhFWCZhusDfTXq6MvBnvcWUpMFA2BFdh52dS4QhzEpWhn2NGxJodj5lvsOojmXVZp9ynsPkOtTBoGEV9IZe6EZxkz9Ne6kmTVg1Y~lr3KM~yhw48CZ0fnPvzmPlZ7PW~4gr5YiZvE83jYAc4g6fjRRgOj98zqLDh~Y3GVIRBWWuuxUOl1RRo27OVcMXwnf3y-ejA~AlNXHQADauNDqi7BeHorexQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA');
    > div > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'Spoqa Han Sans Neo';
        font-style: normal;
        font-weight: 700;
        font-size: 60px;
        line-height: 45px;
        text-align: center;
        color: #ececec;

        h1 {
            margin-bottom: 46px;
        }

        text-shadow: 0px 6px 23px rgba(0, 0, 0, 0.41);
        span {
            color: #0064ff;
        }
    }
`;
const BackgroundCover = styled.div`
    background: rgba(60, 61, 68, 0.88);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
