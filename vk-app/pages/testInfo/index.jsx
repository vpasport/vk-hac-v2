import React from 'react';
import fetcher from '../../helpers/fetcher';
import Container from '../../components/Container';
import styles from './style.module.scss';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';

const TestInfo = ({test}) => {
    const router = useRouter();
    return (
        <Container>
            <header className={`p-d-flex p-ai-center ${styles.header}`}>
                <Button
                    icon='pi pi-arrow-left'
                    className='p-button-text'
                    onClick={() => router.push('/userTests')}
                />
                <h2 className={styles.header__text}>Тест</h2>
            </header>
            <h3>{test.name}</h3>
            <p>{test.description}</p>
            <Button 
                label='Пройти тест' 
                className={`p-button-success ${styles.blockButton}`}
                onClick={() => router.push(`/test?id=${test.id}`)}
            />
        </Container>
    )
}

export async function getServerSideProps({query}){
    const id = query.id;

    let testResponse = await fetcher(`http://192.168.43.15:3001/test/${id}`);
    let { result: test } = await testResponse.json();

    return {
        props: {
            test
        }
    }
}

export default TestInfo;