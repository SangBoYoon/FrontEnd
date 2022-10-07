import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/config';
import { setMypageCategory } from '../../store/slices/myPageCategorySlice';

const MyPageCategoryBtn: React.FC<{ category: string }> = ({ category }) => {
    const dispatch = useDispatch();

    const categoryRedux = useSelector((state: RootState) => {
        return state.myPageCategory.category;
    });

    const changeSetting = () => {
        dispatch(setMypageCategory(category));
    };

    return (
        <CustomListElement
            category={category}
            reduxCategory={categoryRedux}
            onClick={changeSetting}
            id="myList"
        >
            {category}
        </CustomListElement>
    );
};

export default MyPageCategoryBtn;

type CustomListType = {
    category: string;
    reduxCategory: string;
};

const CustomListElement = styled.li<CustomListType>`
    cursor: pointer;

    width: 278px;
    height: 73px;
    background: ${(props) =>
        props.category === props.reduxCategory ? '#323338' : '#1e1e1e'};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #ececec;
`;
