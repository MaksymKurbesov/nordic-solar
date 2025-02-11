import SolarFutureHero from "@assets/images/investments/solar-future-hero.webp";
import SolarFuture from "@assets/images/investments/solar-future.webp";
import WindProsperityHero from "@assets/images/investments/wind-prosperity-hero.webp";
import WindProsperity from "@assets/images/investments/wind-prosperity.webp";
import HydroPowerEdgeHero from "@assets/images/investments/hydro-hero.webp";
import HydroPowerEdge from "@assets/images/investments/hydro.webp";
import HydrogenHero from "@assets/images/investments/hydrogen-hero.webp";
import Hydrogen from "@assets/images/investments/hydrogen.webp";
import MiningHero from "@assets/images/investments/mining-farm-hero.webp";
import Mining from "@assets/images/investments/mining-farm.webp";
import { Trans } from "react-i18next";

export const getInvestments = (t) => {
  return [
    {
      title: "Solar Future",
      subtitle: <Trans i18nKey="solar_future_subtitle" components={{ span: <span />, br: <br /> }} />,
      heroImage: SolarFutureHero,
      thumbImage: SolarFuture,
      mainText: <Trans i18nKey="solar_future_maintext" components={{ span: <span />, br: <br /> }} />,
      subText: <Trans i18nKey="solar_future_subtext" components={{ br: <br /> }} />,
      link: "solar-future",
      value: "solar",
    },
    {
      title: "Wind Prosperity",
      subtitle: <Trans i18nKey="wind_prosperity_subtitle" components={{ span: <span />, br: <br /> }} />,
      heroImage: WindProsperityHero,
      thumbImage: WindProsperity,
      mainText: <Trans i18nKey="wind_prosperity_maintext" components={{ span: <span />, br: <br /> }} />,
      subText: <Trans i18nKey="wind_prosperity_subtext" components={{ br: <br /> }} />,
      link: "wind-prosperity",
      value: "wind",
    },
    {
      title: "Hydro PowerEdge",
      subtitle: <Trans i18nKey="hydro_poweredge_subtitle" components={{ span: <span />, br: <br /> }} />,
      heroImage: HydroPowerEdgeHero,
      thumbImage: HydroPowerEdge,
      mainText: <Trans i18nKey="hydro_poweredge_maintext" components={{ span: <span />, br: <br /> }} />,
      subText: <Trans i18nKey="hydro_poweredge_subtext" components={{ br: <br /> }} />,
      link: "hydro-poweredge",
      value: "hydro",
    },
    {
      title: "Hydrogen Horizons",
      subtitle: <Trans i18nKey="hydrogen_horizons_subtitle" components={{ span: <span />, br: <br /> }} />,
      heroImage: HydrogenHero,
      thumbImage: Hydrogen,
      mainText: <Trans i18nKey="hydrogen_horizons_maintext" components={{ span: <span />, br: <br /> }} />,
      subText: <Trans i18nKey="hydrogen_horizons_subtext" components={{ br: <br /> }} />,
      link: "hydrogen-horizons",
      value: "hydrogen",
    },
    {
      title: "Mining Farms",
      subtitle: <Trans i18nKey="mining_farms_subtitle" components={{ span: <span />, br: <br /> }} />,
      heroImage: MiningHero,
      thumbImage: Mining,
      mainText: <Trans i18nKey="mining_farms_maintext" components={{ span: <span />, br: <br /> }} />,
      subText: <Trans i18nKey="mining_farms_subtext" components={{ br: <br /> }} />,
      link: "mining-farms",
      value: "mining",
    },
  ];
};
