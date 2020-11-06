import React, {useState} from 'react';
import * as pages from './pages';

const Hello = () => {
    const [secondPage, setSecondPage] = useState(0);

    return (
    <>
        {React.createElement(pages[`Page${secondPage}`], {
            setSecondPage: (i) => setSecondPage(i)
        })}
    </>
    )
}

export default Hello;