import React, {useState} from 'react';
import * as pages from './pages';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const Hello = () => {

    const [secondPage, setSecondPage] = useState('Start');
    const [userStatus, setUserStatus] = useState('user');
    const [userCorporation, setUserCorporation] = useState(null);
    const [adminCorporation, setAdminCorporation] = useState('');
    const [vkId, setVkId] = useState('');
    const [password, setPassword] = useState('');
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [requiredField, setRequiredField] = useState(null);
    const [corporationLocation, setCorporationLocation] = useState(null);

    const locations = [
        { label: 'Иркутск', value: 1 },
        { label: 'Ангарск', value: 2 },
        { label: 'Шелехов', value: 3 }
    ]

    const checkParams = () => {
        const params = [
            {
                name: 'Пароль',
                panel: 'UserAbout',
                field: password
            },
            {
                name: 'айди ВКонтакие',
                panel: 'UserAbout',
                field: vkId
            }
        ]

        if(userStatus === 'user'){
            params.unshift(
                {
                    name: 'Корпорация',
                    panel: 'UserCorporation',
                    field: userCorporation
                }
            )
        }
        else {
            params.unshift(
                {
                    name: 'Город',
                    panel: 'AdminCorporation',
                    field: corporationLocation
                },
                {
                    name: 'Корпорация',
                    panel: 'AdminCorporation',
                    field: adminCorporation
                }
            )
        }

        for(let param of params){
            if(!param.field){
                setRequiredField(param.name);
                setSecondPage(param.panel);
                setVisibleDialog(true)
                return;
            }
        }
    }

    return (
    <>
        {React.createElement(pages[`Page${secondPage}`], {
            setSecondPage: (i) => setSecondPage(i),
            userStatus: userStatus,
            setUserStatus: (status) => setUserStatus(status),
            userCorporation: userCorporation,
            setUserCorporation: (e) => setUserCorporation(e),
            vkId,
            setVkId: (value) => setVkId(value),
            password,
            setPassword: (value) => setPassword(value),
            checkParams,
            locations,
            corporationLocation,
            setCorporationLocation: (value) => setCorporationLocation(value),
            adminCorporation,
            setAdminCorporation: (value) => setAdminCorporation(value)
        })}

        <Dialog
            header='Заполните все поля'
            visible={visibleDialog}
            onHide={() => setVisibleDialog(false)}
            style={{width: '95%'}}
            footer={(
                <Button label='ОК' onClick={() => setVisibleDialog(false)} className='p-mt-4'/>
            )}
        >
            <span className='p-mt-4 p-d-block'>
                Заполните поле {requiredField}
            </span>
        </Dialog>
    </>
    )
}

export default Hello;