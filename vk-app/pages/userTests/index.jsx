import React from 'react';
import fetcher from '../../helpers/fetcher';
import Container from '../../components/Container';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import { Button } from 'primereact/button';

const UserTests = ({tests}) => {

    const router = useRouter(); 

    return (
        <Container>
            <header className={`p-d-flex p-ai-center ${styles.header}`}>
                <Button
                    icon='pi pi-arrow-left'
                    className='p-button-text'
                    onClick={() => router.push('/')}
                />
                <h2 className={styles.header__text}>Тесты</h2>
            </header>
            <ul className={styles.list}>
                {tests.map((el, i) => 
                    <li 
                        className={styles.list__item} 
                        key={i}
                        onClick={() => router.push(`/testInfo?id=${el.id}`)}
                    >
                        <span className={styles.list__index}>{i + 1}</span>
                        <span>{el.name}</span>
                    </li>
                )}
            </ul>
        </Container>
    )
}

export async function getServerSideProps(){
    const testsResponse = await fetcher('http://192.168.43.15:3001/user/tests/5');
    const { tests } = await testsResponse.json();

    return {
        props: {
            tests
        }
    }
}

export default UserTests;