import axios, {AxiosRequestConfig} from 'axios';
import {ExcuteResult, InputRegister, UseWaterRegister} from '../apiTypes';

const host = 'http://14.225.3.190:8911/api';
axios.defaults.baseURL = host;
const urlLogin = '/AppUser/auth?v=1.0';

// const urlDetail = '/NguoiDung/Detail?v=1.0';
const getUrlDetail = (userName: string) =>
  `/AppUser/detail?userName=${userName}&v=1.0`;

const urlActivateApp = '/App/active-app?v=1.0';

const urlGetTienichAnninhByNguoidung =
  '/CongViec/get-list-congviec-by-system-anninh?v=1.0';

// const urlGetListNoti = '/Noti/get-list-noti?v=1.0';
const getUrlGetListNoti = (typeApp: string): string => {
  return `Noti/get-list-noti?StrTypeApp=${typeApp}&v=1.0`;
};
export default class ApiRequest {
  // export const host = 'http://e874-113-185-51-101.ngrok.io'

  static GetListNoti = async (token: string): Promise<ExcuteResult> => {
    const tag = 'GetListNoti';
    const url = getUrlGetListNoti('nhanvien');
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
  static DetailInfoNguoiDung = async (
    token: string,
    userName: string,
  ): Promise<ExcuteResult> => {
    const tag = 'DetailInfoNguoiDung';
    const urlDetail = getUrlDetail(userName);
    console.log(`${tag} url:`, urlDetail);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(urlDetail, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
  static DetailWaterUserByUser = async (
    token: string,
    userName: string,
  ): Promise<ExcuteResult> => {
    const tag = 'DetailInfoNguoiDung';
    const url = `/WaterUser/all-by-user?userName=${userName}&v=1.0`;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, res.data);
    return res.data as ExcuteResult;
  };
  static TollAreaDetail = async (
    token: string,
    id: string,
  ): Promise<ExcuteResult> => {
    const tag = 'TollAreaDetail';
    const url = `/TollArea/detail?id=${id}&v=1.0`;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, res.data);
    return res.data as ExcuteResult;
  };
  static UnitTypeDetail = async (
    token: string,
    id: string,
  ): Promise<ExcuteResult> => {
    const tag = 'TollAreaDetail';
    const url = `/UnitType/detail?id=${id}&v=1.0`;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, res.data);
    return res.data as ExcuteResult;
  };

  static WaterIndexAllByWateruser = async (
    token: string,
    waterUserId: string,
  ): Promise<ExcuteResult> => {
    const tag = 'DetailInfoNguoiDung';
    const url = `/WaterIndex/all-by-wateruser?waterUserId=${waterUserId}&v=1.0`;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, res.data);
    return res.data as ExcuteResult;
  };

  static WaterInvoiceAllByWaterUser = async (
    token: string,
    waterUserId: string,
  ): Promise<ExcuteResult> => {
    const tag = 'WaterInvoiceAllByWaterUser';
    const url = `/WaterInvoice/all-by-wateruser?waterUserId=${waterUserId}&v=1.0`;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, res.data);
    return res.data as ExcuteResult;
  };
  static WaterInvoiceDetailByWaterUserYearMonth = async (
    token: string,
    waterUserId: string,
    year: string,
    month: string,
  ): Promise<ExcuteResult> => {
    const tag = 'WaterInvoiceAllByWaterUser';
    const url = `/WaterInvoice/detail-by-wateruser-year-month?waterUserId=${waterUserId}&year=${year}&month=${month}&v=1.0`;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, res.data);
    return res.data as ExcuteResult;
  };

  static DetailWaterIndex = async (
    token: string,
    id: string,
  ): Promise<ExcuteResult> => {
    const tag = 'detailWaterIndex';
    const url = `/WaterIndex/detail?id=${id}&v=1.0`;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, res.data);
    return res.data as ExcuteResult;
  };
  static GetListCongviecBySystemAnninh = async (data: {
    token: string;
  }): Promise<ExcuteResult> => {
    const tag = 'GetListCongviecBySystemAnninh';
    const url = urlGetTienichAnninhByNguoidung;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${data.token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
  static ActivateApp = async (input: {
    tokenAuth: string;
    tokenFirebase: string;
    typeApp: string;
  }): Promise<ExcuteResult> => {
    console.log('urlActivateApp ', urlActivateApp);

    const tag = 'ActivateApp';
    const config = {
      headers: {
        Authorization: `bearer ${input.tokenAuth}`,
        accept: 'text/plain',
      },
    };

    const bodyParameters = {
      token: input.tokenFirebase,
      typeApp: input.typeApp,
    };
    const res = await axios.post(urlActivateApp, bodyParameters, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);

    return res.data as ExcuteResult;
  };
  static LoginApi = async (input: {
    phone: string;
    password: string;
  }): Promise<ExcuteResult> => {
    console.log('urlLogin ', urlLogin);
    const res = await axios.post(urlLogin, {
      userName: input.phone,
      password: input.password,
    });
    console.log(res.data);
    return res.data as ExcuteResult;
  };
  static ChangeWaterFactory = async (input: {
    userName: string;
    waterFactoryId: string;
    token: string;
  }): Promise<ExcuteResult> => {
    console.log('ChangeWaterFactory ');
    const url = '/AppUser/change-water-factory?v=1.0';
    const tag = 'ChangeWaterFactory';
    const config = {
      headers: {
        Authorization: `bearer ${input.token}`,
        accept: 'text/plain',
      },
    };

    const bodyParameters = {
      userName: input.userName,
      waterFactoryId: input.waterFactoryId,
    };
    const res = await axios.post(url, bodyParameters, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);

    return res.data as ExcuteResult;
  };

  static RegisterApi = async (input: InputRegister): Promise<ExcuteResult> => {
    const urlRegister = '/AppUser/register?v=1.0';
    console.log('urlRegister ', urlRegister);
    const res = await axios.post(urlRegister, input);
    console.log(res.data);
    return res.data as ExcuteResult;
  };

  static TollAreaByReader = async (data: {
    token: string;
    userId: string;
  }): Promise<ExcuteResult> => {
    const tag = 'GetListTollAreaByReader';
    const url = `/TollArea/all-by-reader?userId=${data.userId}&v=1.0`;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${data.token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };

  static WaterUserAllByTollarea = async (data: {
    token: string;
    tollAreaId: string;
  }): Promise<ExcuteResult> => {
    const tag = 'GetWaterUserAllByTollarea';
    const url = `/WaterUser/all-by-tollarea?tollAreaId=${data.tollAreaId}&v=1.0`;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${data.token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };

  static GetProvinceAll = async (): Promise<ExcuteResult> => {
    const tag = 'GetProvinceAll';
    const url = '/Province/all?v=1.0';
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
  static GetDistrictByProvinceId = async ({
    provinceId,
  }: {
    provinceId: string;
  }): Promise<ExcuteResult> => {
    const tag = 'GetDistrictByProvinceId';
    const url = `/District/get-by-provinceId?provinceId=${provinceId}&v=1.0`;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
  static GetWardByDistrictId = async ({
    districtId,
  }: {
    districtId: string;
  }): Promise<ExcuteResult> => {
    const tag = 'GetDistrictByProvinceId';
    const url = `/Ward/get-by-districtId?districtId=${districtId}&v=1.0`;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
  static PostUseWaterRegisterAdd = async (
    input: UseWaterRegister,
  ): Promise<ExcuteResult> => {
    console.log('PostUseWaterRegisterAdd ');
    console.log(input);

    const url = '/UseWaterRegister/add?v=1.0';
    const config = {
      headers: {
        accept: 'text/plain',
      },
    };

    const bodyParameters = {
      ...input,
    };
    const res = await axios.post(url, bodyParameters, config);
    console.log(' data key.length :', Object.keys(res.data).length);

    return res.data as ExcuteResult;
  };
  static GetWaterFactoryAll = async (): Promise<ExcuteResult> => {
    const tag = 'GetWaterFactoryAll';
    const url = '/WaterFactory/all?v=1.0';
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
}
