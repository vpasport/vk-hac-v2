import React from 'react';
import styles from '../style.module.scss';
import Iframe from 'react-iframe';

const Video = ({part}) => {

    const videoURL = part.attachment.replace('watch?v=', 'embed/')

    return (
        <Iframe url={videoURL} className={styles.iframe} />
    )
}

export default Video;