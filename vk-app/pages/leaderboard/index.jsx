import React from 'react';
import fetcher from '../../helpers/fetcher';
import LeaderboardTable from '../../components/LeaderboardTable';
import Container from '../../components/Container';
import { Button } from 'primereact/button';
import styles from './style.module.scss';
import { useRouter } from 'next/router';

const Leaderboard = ({leaders}) => {
    const router = useRouter();
    return (
        <Container>
            <header className={`p-d-flex p-ai-center ${styles.header}`}>
                <Button
                    icon='pi pi-arrow-left'
                    className='p-button-text'
                    onClick={() => router.push('/')}
                />
                <h2 className={styles.header__text}>Лидеры</h2>
            </header>
            <LeaderboardTable leaders={leaders} />
        </Container>
    )
}

export async function getServerSideProps(){
    let usersRequest = await fetcher(`http://192.168.43.15:3001/user/liders`);
    let { liders: leaders } = await usersRequest.json();

    console.log(leaders)

    return {
        props: {
            leaders
        }
    }
}

export default Leaderboard;