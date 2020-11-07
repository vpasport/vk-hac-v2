import React from 'react';
import Container from '../../../components/Container';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import styles from '../style.module.scss';
import Dots from '../../../components/DotsProgress';
import { Button } from 'primereact/button';

const PageAdminCorporation = ({locations, corporationLocation, setCorporationLocation, adminCorporation, setAdminCorporation, setSecondPage}) => {
    return (
        <Container>
            <h2>Давай зарегистрируем твою корпорацию</h2>
            <span className='p-d-block p-mt-5'><b>В каком городе распологается корпорация?</b></span>
            <Dropdown
                value={corporationLocation}
                options={locations}
                onChange={(e) => setCorporationLocation(e.value)}
                filter
                filterBy='label'
                placeholder='Выберите город'
                className={styles.cityDropdown}
            />
            <span className='p-d-block p-mt-3'><b>Как называется твоя корпорация?</b></span>
            <InputText 
                value={adminCorporation}
                onChange={(e) => setAdminCorporation(e.target.value)}
                placeholder='Корпорация'
                className={styles.input}
            />
            <div className='p-mt-5'>
                <Dots dotsLength={3} activeDot={2}/>
            </div>
            <Button 
                label='Продолжить' 
                className={styles.button}
                onClick={() => setSecondPage('UserAbout')}
            />
        </Container>
    )
}

export default PageAdminCorporation;