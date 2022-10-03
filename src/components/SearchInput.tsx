import axios from 'axios';
import React, { useEffect, useState } from 'react';

export type corpType = {
    corpCode: string;
    corpName: string;
    corpCategory: string;
    corpLike: number;
};

const SearchInput: React.FC = () => {
    const [corps, setCorps] = useState<corpType[]>([]);
    const [value, setValue] = useState('');

    const datasetting = () => {
        axios
            .get('/accounter/corps')
            .then((res) => {
                setCorps(res.data.data);
                console.log(res.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        datasetting();
        console.log(corps);
    }, []);

    return (
        <>
            <input
                type="text"
                placeholder="작품 제목을 검색해보세요."
                onChange={(e) => {
                    setValue(e.target.value);
                    console.log(value);
                }}
            />
            <div>
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
                                    console.log(item.corpName);
                                    return item;
                                }
                            }
                        })
                        .map((item, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={index}>
                                <p>{item.corpName}</p>
                            </div>
                        ))}
            </div>
        </>
    );
};

export default SearchInput;
