import React from 'react';
import styles from './style.module.scss';

const Avatar = ({url}) => {
    return (
        <div className={styles.avatar}>
            <img src={url} alt='avatar' />
        </div>
    )
}

export default Avatar;