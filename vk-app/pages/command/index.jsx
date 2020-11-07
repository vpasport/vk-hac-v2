import React from 'react';
import fetcher from '../../helpers/fetcher';
import styles from './style.module.scss';
import Container from '../../components/Container';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';

const Command = ({ command, tests }) => {

    const router = useRouter();
    console.log(command, tests)
    return (
        <Container>
            <header className={`p-d-flex p-ai-start ${styles.header}`}>
                <Button
                    icon='pi pi-arrow-left'
                    className='p-button-text'
                    onClick={() => router.push('/allCommands')}
                />
                <div className={styles.header__info}>
                    <h2 className={styles.header__text}>Комманда</h2>
                    <span className={styles.header__name}>{command.name}</span>
                </div>
            </header>
            <div className='p-d-flex p-jc-between p-ai-center p-mt-3'>
                <h3>Тесты</h3>
                <Button label='Редактировать' className='p-button-outlined p-button-xs' />
            </div>
            {tests.length ?
                <ul className={styles.list}>
                    {tests.map((el, i) =>
                        <li className={styles.item} key={i}>
                            <span className={styles.item__index}>{i + 1}</span>
                            <span className={styles.item__name}>{el.name}</span>
                        </li>
                    )}
                </ul>
                :
                <span>Тесты отсутствуют</span>
            }
            <div className='p-d-flex p-jc-between p-ai-center p-mt-4'>
                <h3>Участники</h3>
                <Button label='Редактировать' className='p-button-outlined p-button-xs' />
            </div>
            {command.users.length ?
                <ul className={styles.list}>
                    {command.users.map((el, i) =>
                        <li className={styles.item} key={i}>
                            <span className={styles.item__index}>{i + 1}</span>
                            <span className={styles.item__name}>{el.first_name} {el.last_name}</span>
                        </li>
                    )}
                </ul>
                :
                <span>Участники отсутствуют</span>
            }
        </Container>
    )
}

export async function getServerSideProps({ query }) {
    const id = query.id;

    const commandsResponse = await fetcher(`http://192.168.43.15:3001/user/command/${id}`);
    let { command } = await commandsResponse.json();

    const testsResponse = await fetcher(`http://192.168.43.15:3001/test/command/${id}`);
    let { tests } = await testsResponse.json();

    return {
        props: {
            command,
            tests
        }
    }
}

export default Command;