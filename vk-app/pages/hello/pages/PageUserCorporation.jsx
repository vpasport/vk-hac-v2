import React, { useState } from 'react';
import styles from '../style.module.scss';
import Container from '../../../components/Container';
import { Button } from 'primereact/button';
import Dots from '../../../components/DotsProgress/index';
import { Dropdown } from 'primereact/dropdown';

const Page1 = ({ setSecondPage, userCorporation, setUserCorporation, locations }) => {
    const [corporationLocation, setCorporationLocation] = useState(null);

    const corporations = [
        { label: 'Иркутская', locationId: 1, value: 1 },
        { label: 'Ангарская', locationId: 2, value: 2 },
        { label: 'Шелеховская', locationId: 3, value: 3 }
    ]

    const changeLocation = (value) => {
        setUserCorporation(null);
        setCorporationLocation(value);
    }

    return (
        <Container>
            <h2>Давай надем твою корпорацию!</h2>
            <span className={styles.label}>Город</span>
            <Dropdown
                value={corporationLocation}
                options={locations}
                onChange={(e) => changeLocation(e.value)}
                filter
                filterBy='label'
                placeholder='Выберите город'
                className={styles.cityDropdown}
            />
            <span className={styles.label}>Корпорация</span>
            <Dropdown
                value={userCorporation}
                options={corporations.filter(el => el.locationId === corporationLocation)}
                onChange={(e) => setUserCorporation(e.value)}
                filter
                filterBy='label'
                placeholder='Выберите корпорацию'
                disabled={!corporationLocation}
                className={styles.cityDropdown}
            />
            <Dots dotsLength={3} activeDot={1} />
            <Button
                className={styles.button}
                label='Продолжить'
                onClick={() => setSecondPage('UserAbout')}
            />

        </Container>
    )
}

export default Page1;