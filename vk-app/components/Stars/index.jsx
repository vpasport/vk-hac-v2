import React from 'react';
import styles from './style.module.scss';

const Stars = ({ userPoints, maxPoints }) => {
    let activeStars = 0;
    if (userPoints >= maxPoints * 0.85)
        activeStars = 3;
    else if (userPoints >= maxPoints * 0.65)
        activeStars = 2;
    else if (userPoints >= maxPoints * 0.5)
        activeStars = 1;
    return (
        <ul className='p-d-flex p-jc-center p-ai-center'>
            {(new Array(3).fill()).map((el, i) =>
                <li className={[styles.star, activeStars > i && styles.active].join(' ')} />
            )}
        </ul>
    )
}

export default Stars;