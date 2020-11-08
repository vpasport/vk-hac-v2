import React from 'react';
import styles from './style.module.scss';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import LeaderboardTable from '../../../../components/LeaderboardTable';

const Command = ({ leaders }) => {
    let isAdmin = true;

    const router = useRouter();

    return (
        <div className='container'>
            <LeaderboardTable leaders={leaders} />
            <Button
                label='К списку тестов'
                className={styles.backButton}
                onClick={() => router.push(isAdmin ? '/allTestsAdmin' : '/userTests')}
            />
        </div>
    )
}

export default Command;