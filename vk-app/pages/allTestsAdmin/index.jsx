import React from 'react';
import fetcher from '../../helpers/fetcher';
import Container from '../../components/Container';
import { Button } from 'primereact/button';
import styles from './style.module.scss';
import { useRouter } from 'next/router';

const AllTestsAdmin = ({allTests}) => {

    const router = useRouter();

    return (
        <Container>
            <header className={`p-d-flex p-jc-between p-ai-center ${styles.header}`}>
                <div className='p-d-flex p-jc-between p-ai-center'>
                    <Button 
                        icon='pi pi-arrow-left' 
                        className='p-button-text'
                        onClick={() => router.push('/')}
                    />
                    <h2 className={styles.header__text}>Тесты</h2>
                </div>
                <Button 
                    icon='pi pi-plus-circle' 
                    className='p-button-text' 
                    onClick={() => router.push('/creatingTest')}
                />
            </header>
            <ul className={styles.list}>
                {allTests.map((el, i) => 
                    <li 
                        className={styles.list__item} 
                        key={i}
                        onClick={() => router.push('/completedTest')}
                    >
                        <span className={styles.list__index}>{i + 1}</span>
                        <span>{el.name}</span>
                    </li>
                )}
            </ul>
        </Container>
    )
}

export async function getServerSideProps(context) {
    let allTestsRequest = await fetcher('http://192.168.43.15:3001/test/all/author/5');
    let {result: allTests} = await allTestsRequest.json();

    return {
        props: {
            allTests
        }
    }
}

export default AllTestsAdmin;