import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/config';
import { setCategory } from '../../store/slices/listCategorySlice';

type DrinkCategoryBtnType = {
    category: string;
};

const DrinkCategoryBtn: React.FC<DrinkCategoryBtnType> = ({ category }) => {
    const dispatch = useDispatch();

    const categoryRedux = useSelector((state: RootState) => {
        return state.listCategory.category;
    });

    const CluckBtn = () => {
        dispatch(setCategory(category));
    };

    return (
        <BtnWrap temp={categoryRedux} category={category} onClick={CluckBtn}>
            <p>{category}</p>
        </BtnWrap>
    );
};

export default DrinkCategoryBtn;

type BtnType = {
    temp: string;
    category: string;
};

const BtnWrap = styled.div<BtnType>`
    &:hover {
        background: #26272b;
        font-weight: 700;
        border-radius: 10px;
    }
    width: 198px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    cursor: pointer;
    margin-bottom: 15px;

    background: ${(props) =>
        props.temp === props.category ? `#26272B;` : `rgba(0, 0, 0, 0)`};
    font-weight: ${(props) => (props.temp === props.category ? `700` : `400`)};
    border-radius: ${(props) => (props.temp === props.category ? `10px` : `0`)};

    p {
        font-size: 15px;
        line-height: 23px;
        letter-spacing: -0.01em;
        margin: 2 12px;
        margin-left: 24px;
    }
`;
