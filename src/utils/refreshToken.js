export const refreshTokenSetup = (res) => {

    let timingRefresh = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
        let newAuthRes = await res.reloadAuthResponse();
        timingRefresh = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
        
        //  setup timer for refresh
        setTimeout(refreshToken, timingRefresh);
    }
    setTimeout(refreshToken, timingRefresh)
}