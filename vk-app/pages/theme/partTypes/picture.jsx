import React from 'react';
import styles from '../style.module.scss';

const Photo = ({part}) => {
    return (
        <img src={part.attachment} alt="img" className={styles.image}/>
    )
}

export default Photo;