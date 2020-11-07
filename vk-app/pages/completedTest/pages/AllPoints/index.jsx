import React from 'react';
import styles from './styles.module.scss';
import { Button } from 'primereact/button';

const AllPoints = () => {
    let iswin = true;
    return (
        <div className={styles.container}>
            <div className='p-d-flex'>
                <div className={[styles.infoBlock, styles.infoBlock_light].join(' ')}>
                    <span className={styles.infoBlock__text}>
                        Комманда <br />
                        <span className={styles.infoBlock__text_color}>Добра</span>
                    </span>
                    <span className={styles.infoBlock__points}>50/60</span>
                    <img src="./img/monster_1.png" alt="good monster" className={styles.infoBlock__image}/>
                </div>
                <div className={[styles.infoBlock, styles.infoBlock_dark].join(' ')}>
                    <span className={styles.infoBlock__text}>
                        Комманда <br />
                        <span className={styles.infoBlock__text_color}>Зла</span>
                    </span>
                    <span className={styles.infoBlock__points}>50/60</span>
                    <img src="./img/Novy_proekt_7.png" alt="good monster" className={styles.infoBlock__image}/>
                </div>
            </div>
            <div className={[styles.message, iswin ? styles.message_good : styles.message_bad].join(' ')}>
                Побеждает комманда {iswin ? 'Добра' : 'Зла'}
            </div>
            <Button label='К списку тестов' className={styles.backButton}/>
        </div>
    )
}

export default AllPoints;