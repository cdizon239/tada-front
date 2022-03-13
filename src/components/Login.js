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
        await fetch(process.env.REACT_APP_BACKEND_URL+'/sessions/signIn', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                givenName: res.profileObj.givenName,
                email: res.profileObj.email,
                googleId: res.profileObj.googleId,
                imageUrl: res.profileObj.imageUrl,
                id_token: id_token
            }),
            credentials: 'include'
        })
        navigate('/todos')
    }


    return (
        <>
            <div style={{...styles.container}}>
                <h1>Ta-dah</h1>
                <h4>Get your todos done today</h4>
                <GoogleLogin
                clientId={clientId}
                buttonText="Login with your Google account"
                onSuccess={onSuccess}
                cookiePolicy={process.env.REACT_APP_BACKEND_URL}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
            </div>
        </>
    )
}
