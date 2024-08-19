import TRC20Icon from "@assets/icons/tether.svg?react";
import TonIcon from "@assets/icons/ton.svg?react";
import BitcoinIcon from "@assets/icons/bitcoin.svg?react";
import EthereumIcon from "@assets/icons/ethereum.svg?react";

export const WALLETS = [
  {
    icon: <TRC20Icon />,
    name: "TRC20 Tether",
    currency: "USDT",
  },
  {
    icon: <TonIcon />,
    name: "TON",
    currency: "TON",
  },
  {
    icon: <BitcoinIcon />,
    name: "Bitcoin",
    currency: "BTC",
  },
  {
    icon: <EthereumIcon />,
    name: "Ethereum",
    currency: "ETH",
  },
  {
    icon: <BitcoinIcon />,
    name: "Bitcoin",
    currency: "BTC",
  },
  {
    icon: <EthereumIcon />,
    name: "Ethereum",
    currency: "ETH",
  },
];

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
    key: "paymentSystem",
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
