import React, { useState } from 'react';
import fetcher from '../../helpers/fetcher';
import Container from '../../components/Container';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import * as PartTypes from './partTypes';
import styles from './style.module.scss';
import { useRouter } from 'next/router';

const Theme = ({ theme }) => {

    const router = useRouter();

    const [activeIndex, setActiveIndex] = useState(0);

    const activePart = theme.parts[activeIndex];

    console.log(theme)

    return (
        <Container>
            <header className='p-d-flex p-jc-between p-ai-center'>
                <Button 
                    icon='pi pi-arrow-left' 
                    className='p-button-text'
                    onClick={() => router.push('/allThemes')}
                />
            </header>
            <ProgressBar 
                value={100 / (theme.parts.length - 1) * activeIndex} 
                showValue={false}
                className='p-mt-2'
            />
            <span className={`p-d-flex p-jc-end p-mt-1 ${styles.progress}`}>{activeIndex + 1}/{theme.parts.length}</span>
            <h2>{activePart.name}</h2>
            <ul>
                {activePart.blocks.map((el, i) =>
                    <li key={i}>
                        {React.createElement(PartTypes[el.type], {
                            part: el
                        })}
                    </li>
                )}
            </ul>
            <div className={styles.buttonsBlock}>
                <Button 
                    label='Назад' 
                    onClick={() => setActiveIndex(activeIndex - 1)}
                    disabled={!activeIndex}
                    className='p-button-secondary'
                />
                <Button 
                    label='Далее' 
                    onClick={() => setActiveIndex(activeIndex + 1)}
                    disabled={activeIndex === theme.parts.length - 1}
                />
            </div>
        </Container>
    )
}

export async function getServerSideProps({ query }) {

    const id = query.id;
    const themeResonse = await fetcher(`http://192.168.43.15:3001/theme/${id}`);
    const { result: theme } = (await themeResonse.json());

    return {
        props: {
            theme
        }
    }
}

export default Theme;