import React from 'react';
import axios from 'axios';

const RevenueStability = () => {
    axios({
        url: '/api/list.json',
        method: 'get',
        params: {
            crtfc_key: '1d00d3d38aaeb4136245a7f8fc10b595c5d6dab0',
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
