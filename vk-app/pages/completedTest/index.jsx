import React, { useState } from 'react';
import styles from './style.module.scss';
import { Button } from 'primereact/button';
import Command from './pages/Command';
import AllPoints from './pages/AllPoints';
import { useRouter } from 'next/router';
import fetcher from '../../helpers/fetcher';

const completedTest = ({leaders}) => {

    const router = useRouter();

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={styles.main}>
            <div className='container'>
                <header className={styles.header}>
                    <h1 className={styles.header__text}>Таблица рекордов</h1>
                    <Button 
                        icon='pi pi-times' 
                        className={['p-button-text', styles.header__button].join(' ')} 
                        onClick={() => router.push('/')}
                    />
                </header>
                <span className={['p-buttonset p-d-flex p-jc-center p-ai-center', styles.buttons].join(' ')}>
                    <Button
                        label='Личный'
                        className={[activeTab === 0 && 'p-button-success p-button-raised'].join(' ')}
                        onClick={() => setActiveTab(0)}
                    />
                    <Button
                        label='Коммандный'
                        className={[activeTab === 1 && 'p-button-success p-button-raised'].join(' ')}
                        onClick={() => setActiveTab(1)}
                    />
                </span>
            </div>
            {!activeTab ?
                <Command 
                    leaders={leaders}
                />
                :
                <AllPoints />
            }
        </div>
    )
}

export async function getServerSideProps(){
    let usersRequest = await fetcher(`http://192.168.43.15:3001/user/liders`);
    let { liders: leaders } = await usersRequest.json();

    return {
        props: {
            leaders
        }
    }
}

export default completedTest;