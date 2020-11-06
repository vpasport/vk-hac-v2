import React from 'react';
import { Button } from 'primereact/button';
import Container from '../components/Container';
import { ProgressBar } from 'primereact/progressbar';
import style from './test/style.module.scss';

export default function Home() {
  return (
    <Container>
      <div className=''>
        <header>
          <div className='p-d-flex p-jc-between p-ai-center'>
            <Button icon='pi pi-arrow-left' className='p-button-text p-button-rounded'/>
            <Button icon='pi pi-times' className='p-button-text p-button-rounded'/>
          </div>
          <ProgressBar value={15} showValue={false}/>
        </header>
        <div className={style.content}>
          1234
        </div>
        <Button>hello</Button>
      </div>
    </Container>
  )
}
