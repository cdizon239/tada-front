import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken'
import { useNavigate } from 'react-router-dom'

const clientId = process.env.REACT_APP_GCLIENT_ID

const styles = {
    container: {
        margin: '0 auto',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center'
    }
}

export const Login = () => {
    const navigate = useNavigate()

    const onSuccess = async (res) => {
        console.log(res.profileObj);
        const id_token = res.getAuthResponse().id_token
        console.log(id_token);
        refreshTokenSetup(res)
        let login = await fetch(process.env.REACT_APP_BACKEND_URL + '/sessions/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_token: id_token
            }),
            credentials: 'include'
        })
        let loginRes = await login.json()
        console.log(loginRes);
        if (loginRes.status === 201) {
            navigate('/todos')

        }
    }


    return (
        <>
            <div style={{ ...styles.container }}>
                <h1>Ta-dah</h1>
                <h4>Get your todos done today</h4>
                <GoogleLogin
                    clientId={clientId}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                    )}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    cookiePolicy={'single_host_origin'}
                />
                {/* <GoogleLogin
                    clientId={clientId}
                    buttonText="Login with your Google account"
                    onSuccess={onSuccess}
                    // cookiePolicy={process.env.REACT_APP_BACKEND_URL}
                    // cookiePolicy='single_host_origin'
                    style={{ marginTop: '100px' }}
                    isSignedIn={true}
                /> */}
            </div>
        </>
    )
}
