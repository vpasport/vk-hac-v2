import React from 'react';
import fetcher from '../../helpers/fetcher';
import Container from '../../components/Container';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import styles from './style.module.scss';

const AllCommands = ({ commands }) => {
    const router = useRouter();

    return (
        <Container>
            <header className={`p-d-flex p-ai-center ${styles.header}`}>
                <Button
                    icon='pi pi-arrow-left'
                    className='p-button-text'
                    onClick={() => router.push('/employees')}
                />
                <h2 className={styles.header__text}>Команды</h2>
            </header>
            <ul className={styles.list}>
                {commands.map((el, i) =>
                    <li className={`p-d-flex p-jc-between p-ai-center ${styles.item}`} key={i}>
                        <div>
                            <span className={styles.item__index}>{i + 1}</span>
                            <span className={styles.item__name}>{el.name}</span>
                        </div>
                        <Button
                            className='p-button-sm p-button-outlined'
                            label='ПОДРОБНЕЕ'
                            onClick={() => router.push(`/command?id=${el.id}`)}
                        />
                    </li>
                )}
            </ul>
        </Container>
    )
}

export async function getServerSideProps(context) {
    const commandsResponse = await fetcher('http://192.168.43.15:3001/user/commands');
    let { commands } = await commandsResponse.json();

    return {
        props: {
            commands
        }
    }
}

export default AllCommands;