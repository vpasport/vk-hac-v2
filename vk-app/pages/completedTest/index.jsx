import React, { useState } from 'react';
import styles from './style.module.scss';
import { Button } from 'primereact/button';
import Command from './pages/Command';
import AllPoints from './pages/AllPoints';

const completedTest = () => {

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={styles.main}>
            <div className='container'>
                <header className={styles.header}>
                    <h1 className={styles.header__text}>Таблица рекордов</h1>
                    <Button icon='pi pi-times' className={['p-button-text', styles.header__button].join(' ')} />
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
                <Command />
                :
                <AllPoints />
            }
        </div>
    )
}

export default completedTest;