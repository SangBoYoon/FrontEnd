import axios from 'axios';
import React from 'react';

const CorporationInfo = () => {
    axios({
        url: '/accounter/corps',
        method: 'get',
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });
    return <div>gd</div>;
};
export default CorporationInfo;
