export interface IInfoTP {
    key: React.Key;
    ProvinceID: number;
    ProvinceName: string;
}

export interface IInfoHuyen {
    key: React.Key;
    ProvinceID: number;
    DistrictName: string;
    DistrictID: number;
}

export interface IInfoXa {
    key: React.Key;
    WardCode: string;
    DistrictID: number;
    WardName: string;
}

export interface IInfoMoneyFee {
    key: React.Key;
    total: number;
    service_fee: number;
    insurance_fee: string;
}