import { Timestamp } from "firebase/firestore";
import { IWallets } from "@/interfaces/IWallets.ts";
import { IRegistrationDate } from "@/pages/Cabinet/Referrals/Referrals.tsx";

export interface IRestrictions {
  isCheaterInReferral: boolean;
  isFinancialGateway: boolean;
  isMultiAcc: {
    isActive: boolean;
    users: string[];
  };
  isPrivateKey: boolean;
  isPrivateKeyInvalid: boolean;
  isReferralCheater: {
    isActive: boolean;
    users: string[];
  };
  isWithdrawnLimit: boolean;
  isMoneyLaundering: boolean;
}

interface ISettings {
  country: string;
  name: string;
  phone: string;
  social: string;
  surname: string;
}

export interface IDeposit {
  amount: number;
  charges: number;
  closeDate: string;
  days: number;
  isActive: boolean;
  lastAccrual: IRegistrationDate | Timestamp;
  openDate: string;
  plan: string;
  received: number;
  variant: string;
  wallet: string;
  willReceived: number;
}

export interface ITransaction {
  id: string;
  amount: number;
  date: Timestamp;
  executor: string;
  nickname: string;
  status: string;
  type: string;
}

export interface ITransformedTransaction {
  id: string;
  amount: string;
  date: IRegistrationDate;
  executor: string;
  nickname: string;
  status: string;
  type: string;
}

export interface IUser {
  earned: number;
  email: string;
  invested: number;
  nickname: string;
  privateKey: string;
  referrals: number;
  referredBy: string;
  registrationDate: Timestamp;
  restrictions: IRestrictions;
  settings: ISettings;
  wallets: IWallets;
  withdrawn: number;
}

export interface IExtendedUser extends IUser {
  deposits: IDeposit[];
  transactions: ITransformedTransaction[];
}
