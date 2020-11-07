import React from 'react';
import styles from './style.module.scss';

const Dots = ({dotsLength, activeDot}) => {
    return (
        <ul className={styles.dots}>
            {(new Array(dotsLength).fill()).map((el, i) =>
                <li className={[styles.dot, activeDot === i && styles.active ].join(' ')} />
            )}
        </ul>
    )
}

export default Dots;