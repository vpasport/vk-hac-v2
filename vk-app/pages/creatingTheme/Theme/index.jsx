import React, {useState} from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import TestItem from './TestItem';
import styles from './style.module.scss';
import { Dropdown } from 'primereact/dropdown';

const Theme = ({index, part, setTheme, showThemes}) => {

    const [name, setName] = useState(part.name);
    const [blocks, setBlocks] = useState(part.blocks);
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [newType, setNewType] = useState(null);

    const types = [
        {label: 'Текст', value: 'text'},
        {label: 'Картинка', value: 'picture'},
        {label: 'Видео', value: 'video'}
    ]

    const addBlock = () => {
        let _blocks = [...blocks];
        _blocks.push({
            attachment: '',
            type: newType
        })
        setBlocks(_blocks);
        setVisibleDialog(false);
        setNewType(null);
    }

    const saveBlock = () => {
        setTheme({
            name: name,
            blocks
        })
    }

    return (
        <React.Fragment>
            <header>
                <Button 
                    icon='pi pi-list' 
                    className='p-button-text p-button-secondary p-button-rounded' 
                    onClick={() => showThemes(false)}
                />
            </header>
            <h3>Часть {index + 1}</h3>
            <label htmlFor="name" className='p-mt-3 p-d-block'>Название части</label>
            <InputText 
                id='name' 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                // onBlur={() => setTest((test.name = name, {...test}))}
                className={styles.input}
            />
            <ul className={styles.answersList}>
                {blocks.map((el, i) => 
                    <TestItem
                        el={el}
                        i={i}
                        blocks={blocks}
                        setBlocks={(e) => setBlocks(e)}
                        key={i}
                    />
                )}
            </ul>
            <Button 
                icon='pi pi-plus' 
                label='Добавить блок' 
                onClick={() => setVisibleDialog(true)}
            />
            <Button 
                label='Сохранить' 
                className={styles.blockButton}
                onClick={saveBlock}
            />

            <Dialog
                visible={visibleDialog}
                onHide={() => setVisibleDialog(false)}
                header='Тип блока'
                style={{width: '95%'}}
            >
                <label htmlFor="type" className='p-mt-3 p-d-block'>Выберите тип отображаемой информации</label>
                <Dropdown
                    options={types}
                    value={newType}
                    onChange={(e) => setNewType(e.value)}
                    placeholder='Тип вопроса'
                    className={styles.input}
                />
                <Button 
                    className={styles.blockButton} 
                    label='Добавить' 
                    onClick={addBlock}
                />
            </Dialog>
        </React.Fragment>
    )
}

export default Theme;