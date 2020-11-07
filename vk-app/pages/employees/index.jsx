import React from 'react';
import fetcher from '../../helpers/fetcher'

const Employees = ({users}) => {
    console.log(users)
    return (
        <div>123</div>
    )
}

export async function getServerSideProps(context) {
    let usersRequest = await fetcher('http://192.168.43.15:3001/user/companies/1', {
        method: 'POST',
        body: {
            status_id: -1
        }
    });
    let users = await usersRequest.json();

    return {
        props: {
            users
        }
    }
}

export default Employees;