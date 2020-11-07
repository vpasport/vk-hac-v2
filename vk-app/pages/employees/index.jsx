import React, {useState} from 'react';
import fetcher from '../../helpers/fetcher';
import Container from '../../components/Container';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

const Employees = ({usersData, unconfirmedUsersData}) => {

    const router = useRouter();
    const [users, setUsers] = useState(usersData.users);
    const [unconfirmedUsers, setUnconfirmedUsers] = useState(unconfirmedUsersData.users);

    const removeUser = async (index) => {
        const id = unconfirmedUsers[index].id;

        let removeUser = await fetcher(`http://192.168.43.15:3001/user/confirmed/${id}`,{
            method: 'POST',
            body: {
                status_id: 2
            }
        })
        removeUser = await removeUser.json();

        if(removeUser.isSuccess){
            const _unconfirmedUsers = [...unconfirmedUsers];
            _unconfirmedUsers.splice(index, 1);
            setUnconfirmedUsers(_unconfirmedUsers);
        }
        else{
            console.log('error')
        }

    }

    const addUser = async (index) => {
        const id = unconfirmedUsers[index].id;

        let confirmUser = await fetcher(`http://192.168.43.15:3001/user/confirmed/${id}`,{
            method: 'POST',
            body: {
                status_id: 1
            }
        })
        confirmUser = await confirmUser.json();

        if(confirmUser.isSuccess){
            const _unconfirmedUsers = [...unconfirmedUsers];
            const _users = [...users];
            _users.unshift(_unconfirmedUsers[index]);
            _unconfirmedUsers.splice(index, 1);
            setUnconfirmedUsers(_unconfirmedUsers)
            setUsers(_users)
        }
        else{
            console.log('error')
        }
    }
    
    return (
        <Container>
            <header className={`p-d-flex p-jc-between p-ai-center ${styles.header}`}>
                <div className='p-d-flex p-jc-between p-ai-center'>
                    <Button 
                        icon='pi pi-arrow-left' 
                        className='p-button-text'
                        onClick={() => router.push('/')}
                    />
                    <h2 className={styles.header__text}>Сотрудники</h2>
                </div>
                <Button 
                    label='Команды' 
                    className='p-button-outlined p-button-sm' 
                    onClick={() => router.push('/allCommands')}
                />
            </header>
            <h3>Заявки</h3>
            {unconfirmedUsers.length ? 
            <ul className={styles.unconfirmedList}>
                    {unconfirmedUsers.map((el, i) => 
                        <li className={styles.unconfirmedItem} key={i}>
                            <span className={styles.unconfirmedItem__index}>{i + 1}</span>
                            <div className={styles.unconfirmedItem__info}>
                                <span>{`${el.first_name} ${el.last_name}`}</span>
                                <div className={styles.unconfirmedItem__buttons}>
                                    <Button 
                                        label='отклонить' 
                                        className='p-button-secondary'
                                        onClick={() => removeUser(i)}
                                    />
                                    <Button 
                                        label='Добавить' 
                                        icon='pi pi-plus'
                                        onClick={() => addUser(i)}
                                    />
                                </div>
                            </div>
                        </li>
                    )}
            </ul>
            :
                <span>Заявки отсутствуют</span>
            }
            {users.length ? 
                <ul className={styles.confirmedList}>
                    {users.map((el, i) => 
                        <li className={styles.confirmedItem} key={i}>
                            <span className={styles.confirmedItem__index}>{i + 1}</span>
                            <span className={styles.confirmedItem__info}>{`${el.first_name} ${el.last_name}`}</span>
                        </li>
                    )}
                </ul>
            :
                <span>У вас нет сотрудников</span>
            }
        </Container>
    )
}

export async function getServerSideProps(context) {
    let usersRequest = await fetcher('http://192.168.43.15:3001/user/companies/1', {
        method: 'POST',
        body: {
            status_id: 1
        }
    });
    let { result: users } = (await usersRequest.json());

    usersRequest = await fetcher('http://192.168.43.15:3001/user/companies/1', {
        method: 'POST',
        body: {
            status_id: 3
        }
    })
    let { result: unconfirmedUsers } = (await usersRequest.json());

    return {
        props: {
            usersData: users,
            unconfirmedUsersData: unconfirmedUsers
        }
    }
}

export default Employees;