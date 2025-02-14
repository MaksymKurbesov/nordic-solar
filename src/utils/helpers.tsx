import { IDeposit, IRestrictions } from "@/interfaces/IUser.ts";

export const generateSixDigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const getReferralsCount = (referrals): number => {
  if (!referrals) return 0;

  return Object.values(referrals).reduce((acc, array) => {
    return acc + array.length;
  }, 0);
};

export const getActiveReferralsCount = (referrals): number => {
  return Object.values(referrals).reduce((acc, array) => {
    return (
      acc +
      array.filter((item) => {
        if (!item) return;

        return item.invested > 0;
      }).length
    );
  }, 0);
};

export const getTotalStructureInvested = (referrals): number => {
  return Object.values(referrals).reduce((acc, array) => {
    return (
      acc +
      array.reduce((sum, item) => {
        if (!item) return;

        return sum + item.invested; // Добавляем только если есть поле deposited
      }, 0)
    );
  }, 0);
};

export const calculateTotalIncome = (
  initialAmount: number,
  dailyPercentage: number | null,
  days: number | null,
) => {
  if (isNaN(initialAmount)) {
    return 0;
  }

  if (!dailyPercentage || !days) {
    return 0;
  }

  return +(((initialAmount * dailyPercentage) / 100) * days).toFixed(2);
};

export const calculateDailyIncome = (initialAmount: number, dailyRate: number) => {
  if (!dailyRate || !initialAmount) return 0;

  return ((initialAmount * dailyRate) / 100).toFixed(2);
};

export const getClosestDeposit = (
  deposits: IDeposit[],
): { deposit: IDeposit; timeToAccrual: number } | null => {
  if (!deposits || deposits.length === 0) return null;

  const currentTime = new Date().getTime() / 1000;

  return deposits.reduce<{
    deposit: IDeposit;
    timeToAccrual: number;
  } | null>((closest, deposit) => {
    if (!deposit.lastAccrual) return closest;

    const timeToAccrual = deposit.lastAccrual._seconds + deposit.days * 86400 - currentTime;

    if (timeToAccrual > 0 && (!closest || (timeToAccrual < closest.timeToAccrual && deposit.isActive))) {
      return { deposit, timeToAccrual };
    }

    return closest;
  }, null);
};

export const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};

export const sortByAvailable = (wallets: IWallets): IWallets => {
  return Object.entries(wallets)
    .sort(([, a], [, b]) => b.available - a.available)
    .reduce<IWallets>((sortedObj, [key, value]) => {
      sortedObj[key] = value;
      return sortedObj;
    }, {});
};

export const logError = (message: string, error: unknown): void => {
  console.error(`[UserService] ${message}`, error);
};

export const getActiveRestriction = (restrictions: IRestrictions | undefined): keyof IRestrictions | null => {
  for (const key in restrictions) {
    const restrictionKey = key as keyof IRestrictions; // Явное приведение key

    if (
      typeof restrictions[restrictionKey] === "boolean" &&
      restrictions[restrictionKey] &&
      restrictionKey !== "isPrivateKey"
    ) {
      return restrictionKey;
    }

    if (typeof restrictions[restrictionKey] === "object" && restrictions[restrictionKey]?.isActive) {
      return restrictionKey;
    }
  }
  return null;
};

export const hasActiveRestrictions = (restrictions: IRestrictions | undefined): boolean => {
  if (!restrictions) return false;

  return Object.keys(restrictions).some((key) => {
    const restrictionKey = key as keyof IRestrictions; // Приведение key к типу keyof IRestrictions

    if (typeof restrictions[restrictionKey] === "boolean" && restrictionKey !== "isPrivateKey") {
      return restrictions[restrictionKey];
    }

    if (
      typeof restrictions[restrictionKey] === "object" &&
      restrictions[restrictionKey]?.isActive !== undefined
    ) {
      return restrictions[restrictionKey].isActive;
    }

    return false;
  });
};
