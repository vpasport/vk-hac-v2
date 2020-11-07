import React from 'react';
import styles from './style.module.scss';

const Dots = ({dotsLength, activeDot}) => {
    return (
        <ul className='p-d-flex p-jc-center p-ai-center'>
            {(new Array(dotsLength).fill()).map((el, i) =>
                <li 
                    className={[styles.dot, activeDot === i && styles.active ].join(' ')}
                    key={i}
                />
            )}
        </ul>
    )
}

export default Dots;