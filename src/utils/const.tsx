import TRC20Icon from "@assets/icons/tether.svg?react";
import TonIcon from "@assets/icons/ton.svg?react";
import BitcoinIcon from "@assets/icons/bitcoin.svg?react";
import EthereumIcon from "@assets/icons/ethereum.svg?react";

export const WALLETS = {
  trc20: {
    icon: <TRC20Icon />,
    name: "TRC20 Tether",
    currency: "USDT",
  },
  ton: {
    icon: <TonIcon />,
    name: "TON",
    currency: "TON",
  },
  bitcoin: {
    icon: <BitcoinIcon />,
    name: "Bitcoin",
    currency: "BTC",
  },
  ethereum: {
    icon: <EthereumIcon />,
    name: "Ethereum",
    currency: "ETH",
  },
  PM: {
    icon: <EthereumIcon />,
    name: "PM",
    currency: "PM",
  },
};

export const TRANSACTION_COLUMNS = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "Сумма",
    key: "amount",
  },
  {
    title: "Платежная система",
    key: "executor",
  },
  {
    title: "Дата",
    key: "date",
  },
  {
    title: "Статус",
    key: "status",
  },
];
