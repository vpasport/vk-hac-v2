import React from 'react';
import styles from './style.module.scss';
import Avatar from '../Avatar';

const LeaderboardTable = ({ leaders }) => {
    return (
        <table className={styles.table}>
            <tr>
                <th className={styles.table__center}>№</th>
                <th>Имя</th>
                <th className={styles.table__right}>Баллы</th>
            </tr>
            {leaders.map((el, i) =>
                <tr>
                    <td>
                        <span className={[styles[`position${i + 1}`], styles.position].join(' ')}>{i + 1}</span>
                    </td>
                    <td>
                        <div className='p-d-flex p-ai-center'>
                            <Avatar url={el.photo} />
                            <span className='p-d-block p-ml-3'>{el.first_name} {el.last_name}</span>
                        </div>
                    </td>
                    <td className={[styles.pointPosition, styles[`pointPosition${i + 1}`]].join(' ')}>{el.score}</td>
                </tr>
            )}
        </table>
    )
}

export default LeaderboardTable;