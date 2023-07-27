//Include Both Helper File with needed methods
import { getFirebaseBackend } from "Components/helper/firebase_helper";
import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';

const fireBaseBackend = getFirebaseBackend();

export const loginUser = (user: any, router : any) => async (dispatch: any) => {
  try {
    let response;
    response = await fireBaseBackend.loginUser(user.email, user.password);
    if (response) {
      localStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
      router.push('/dashboard', undefined, { shallow: true });
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch: any) => {
  try {
    localStorage.removeItem("authUser");
    const response = await fireBaseBackend.logout();
    dispatch(logoutUserSuccess(response));
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (data: any, type: any) => async (dispatch: any) => {
  try {
    let response;
    response = await fireBaseBackend.socialLoginUser(data, type);
    if (response) {
      localStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
      window.location.pathname = "/";
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch: any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
