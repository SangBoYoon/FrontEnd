import React from 'react';
import axios from 'axios';

const RevenueStability = () => {
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
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });

    return <div>ㅎddㅇ</div>;
};

export default RevenueStability;
