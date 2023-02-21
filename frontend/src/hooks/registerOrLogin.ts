import { api } from "@/utils/api";
import { AxiosResponse } from "axios";
import { IAuthPayload, IAuthResponseData } from "@/types/AuthTypes";
import { setToken } from "@/store/modules/user";
import { useAppDispatch } from "@/store";
import { useNavigate } from "react-router-dom";

const useRegisterOrLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (isRegister: boolean, data: IAuthPayload) =>
    api
      .post(`auth/${isRegister ? "register" : "login"}`, data)
      .then((res: AxiosResponse<IAuthResponseData>) => {
        dispatch(setToken(res.data.token));
        navigate("/");
      });
};

export default useRegisterOrLogin;
