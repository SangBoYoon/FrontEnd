import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { corpType, setCorps } from '../../store/slices/corpsLoadSlice';
import { RootState } from '../../store/config';
import BlockWrap from '../Common/BlockWrap';
import RecommendBlock from '../Main/RecommendBlock';

const RecommendCorp: React.FC = () => {
    const dispatch = useDispatch();
    const CorpsData = useSelector((state: RootState) => {
        return state.corpsLoad.array;
    });

    useEffect(() => {
        axios
            .get('/accounter/corps')
            .then((res) => {
                dispatch(setCorps(res.data.data));
            })
            .catch(() => {
                console.log('corporations load err');
            });
    }, []);
    return (
        <div>
            <Cover>
                <BackgroundCover>
                    <div>
                        <h1>
                            <span>A</span>CCOUNTER
                        </h1>
                        <p>좋아요 수를 기반으로 종목을 추천해드립니다.</p>
                    </div>
                </BackgroundCover>
            </Cover>
            <MainBody>
                <BlockWrap title="종목추천">
                    <BlockInner>
                        {CorpsData &&
                            CorpsData.length > 0 &&
                            CorpsData.map((item: corpType) => item)
                                .sort((a, b) => b.likeCount - a.likeCount)
                                .splice(0, 20)
                                .map((item, index) => {
                                    return (
                                        <RecommendBlock
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={index}
                                            corpCode={item.corpCode}
                                            likeCount={item.likeCount}
                                            corpName={item.corpName}
                                            mypage={false}
                                        />
                                    );
                                })}
                    </BlockInner>
                </BlockWrap>
            </MainBody>
        </div>
    );
};

export default RecommendCorp;

const MainBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 44px;
    margin-bottom: 106px;
`;

const Cover = styled.div`
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

        p {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 25px;
            /* identical to box height */

            text-align: center;

            color: #ffffff;
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

const BlockInner = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > div {
        margin-bottom: 26px;
    }
`;
