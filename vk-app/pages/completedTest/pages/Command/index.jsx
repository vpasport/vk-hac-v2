import React from 'react';
import styles from './style.module.scss';
import { Button } from 'primereact/button';

const Command = () => {
    return (
        <div className='container'>
            <table className={styles.table}>
                <tr>
                    <th className={styles.table__center}>№</th>
                    <th>Имя</th>
                    <th className={styles.table__right}>Баллы</th>
                </tr>
                <tr>
                    <td>
                        <span className={[styles[`position${1}`], styles.position].join(' ')}>1</span>
                    </td>
                    <td>Жуков Макс</td>
                    <td className={[styles.pointPosition, styles[`pointPosition${1}`]].join(' ')}>100</td>
                </tr>
            </table>
            <Button label='К списку тестов' className={styles.backButton}/>
        </div>
    )
}

export default Command;