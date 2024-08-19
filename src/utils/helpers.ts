export const generateUserData = (nickname, email) => {
  return {
    settings: {
      name: "",
      surname: "",
      phone: "",
      social: "",
      country: "",
    },
    earned: 0,
    invested: 0,
    withdrawn: 0,
    referrals: 0,
    wallets: {
      bitcoin: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
    },
    referredBy: "",
    privateKey: "",
    nickname,
    email,
    restrictions: {
      isFinancialGateway: false,
      isMultiAcc: {
        isActive: false,
        users: [],
      },
      isPrivateKey: false,
      isPrivateKeyInvalid: false,
      isReferralCheater: {
        isActive: false,
        users: [],
      },
      isWithdrawnLimit: false,
    },
  };
};
