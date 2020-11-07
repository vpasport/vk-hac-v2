import React from 'react';
import fetcher from '../../helpers/fetcher';
import Container from '../../components/Container';
import { Button } from 'primereact/button';
import styles from './style.module.scss';
import { useRouter } from 'next/router';

const AllThemes = ({allThemes}) => {

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
                    <h2 className={styles.header__text}>Темы</h2>
                </div>
                <Button 
                    icon='pi pi-plus-circle' 
                    className='p-button-text' 
                    onClick={() => router.push('/creatingTheme')}
                />
            </header>
            <ul className={styles.list}>
                {allThemes.map((el, i) => 
                    <li 
                        className={styles.list__item} 
                        key={i}
                        onClick={() => router.push(`/theme?id=${el.id}`)}
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
    let allTestsRequest = await fetcher('http://192.168.43.15:3001/theme');
    let {result: allThemes} = await allTestsRequest.json();

    return {
        props: {
            allThemes
        }
    }
}

export default AllThemes;