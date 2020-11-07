import React, { useState } from 'react';
import styles from './style.module.scss';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import fetcher from '../../../helpers/fetcher';
import { useRouter } from 'next/router';

const ThemesList = ({theme, setTheme, showTheme, addTheme}) => {

    const router = useRouter();
    const [name, setName] = useState(theme.name);

    const saveTheme = async () => {
        console.log(theme)
        let result = await fetcher('http://192.168.43.15:3001/theme', {
            method: "POST",
            body: theme
        })
        result = await result.json();
    }

    return (
        <React.Fragment>
            <header>
                <Button 
                    icon='pi pi-arrow-left' 
                    className='p-button-text p-button-rounded'
                    onClick={() => router.push('/allThemes')}
                />
            </header>
            <label htmlFor="name" className='p-mt-3 p-d-block'>Название темы</label>
            <InputText 
                id='name' 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                onBlur={() => setTheme((theme.name = name, {...theme}))}
                className={styles.input}
            />
            <h2>Список тем</h2>
            <ul className={styles.themesList}>
                {theme.parts.map((el, i) =>
                    <li 
                        className={styles.themesList__item}
                        key={i}
                        onClick={() => showTheme(i)}
                    >
                        {el.name}
                    </li>
                )}
            </ul>
            <Button 
                icon='pi pi-plus' 
                label='Добавить тему'
                onClick={addTheme}
            />

            <Button
                label='Сохранить'
                onClick={saveTheme}
                className={styles.blockButton}
            />
        </React.Fragment>
    )
}

export default ThemesList;