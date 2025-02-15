import SolarEnergyHero from "@assets/images/products/solar-energy/hero.webp";
import MiningFarmsHero from "@assets/images/products/mining-farms/hero.webp";
import HydrogenTechHero from "@assets/images/products/hydrogen-tech/hero.webp";
import WindTurbinesHero from "@assets/images/products/wind-turbines/hero.webp";
import HydroplantHero from "@assets/images/products/hydroplant/hero.webp";
import SolarImage1 from "@assets/images/products/solar-energy/gallery1.png";
import SolarImage2 from "@assets/images/products/solar-energy/gallery2.png";
import SolarImage3 from "@assets/images/products/solar-energy/gallery3.png";
import MiningImage1 from "@assets/images/products/mining-farms/gallery1.webp";
import MiningImage2 from "@assets/images/products/mining-farms/gallery2.webp";
import MiningImage3 from "@assets/images/products/mining-farms/gallery3.webp";
import HydroGenImage1 from "@assets/images/products/hydrogen-tech/gallery1.webp";
import HydroGenImage2 from "@assets/images/products/hydrogen-tech/gallery2.webp";
import HydroGenImage3 from "@assets/images/products/hydrogen-tech/gallery3.webp";
import WindTurbinesImage1 from "@assets/images/products/wind-turbines/gallery1.webp";
import WindTurbinesImage2 from "@assets/images/products/wind-turbines/gallery2.webp";
import WindTurbinesImage3 from "@assets/images/products/wind-turbines/gallery3.webp";
import HydroPlantImage1 from "@assets/images/products/hydroplant/gallery1.webp";
import HydroPlantImage2 from "@assets/images/products/hydroplant/gallery2.webp";
import HydroPlantImage3 from "@assets/images/products/hydroplant/gallery3.webp";
import { ReactElement } from "react";
import { Trans } from "react-i18next";

export interface IQuestion {
  title: string;
  answer: string;
}

interface IProduct {
  title: string;
  subtitle: ReactElement;
  heroImage: string;
  mainText: ReactElement;
  subText: ReactElement;
  galleryImages: string[];
  link: string;
  questions: IQuestion[];
}

export const getProducts = (t) => {
  return [
    {
      title: t("solar"),
      subtitle: <Trans i18nKey="solar_subtitle" components={{ span: <span />, br: <br /> }} />,
      heroImage: SolarEnergyHero,
      mainText: <Trans i18nKey="solar_maintext" components={{ span: <span /> }} />,
      subText: <Trans i18nKey="solar_subtext" components={{ span: <span /> }} />,
      galleryImages: [SolarImage1, SolarImage2, SolarImage3],
      link: "solar-energy",
      questions: [
        {
          title: t("solar_question1"),
          answer: t("solar_answer1"),
        },
        {
          title: t("solar_question2"),
          answer: t("solar_answer2"),
        },
        {
          title: t("solar_question3"),
          answer: t("solar_answer3"),
        },
      ],
    },
    {
      title: t("mining"),
      subtitle: <Trans i18nKey="mining_subtitle" components={{ span: <span />, br: <br /> }} />,
      heroImage: MiningFarmsHero,
      mainText: <Trans i18nKey="mining_maintext" components={{ span: <span /> }} />,
      subText: <Trans i18nKey="mining_subtext" components={{ span: <span /> }} />,
      galleryImages: [MiningImage1, MiningImage2, MiningImage3],
      link: "mining-farms",
      questions: [
        {
          title: t("mining_question1"),
          answer: t("mining_answer1"),
        },
        {
          title: t("mining_question2"),
          answer: t("mining_answer2"),
        },
        {
          title: t("mining_question3"),
          answer: t("mining_answer3"),
        },
      ],
    },
    {
      title: t("hydrogen"),
      subtitle: <Trans i18nKey="hydrogen_subtitle" components={{ span: <span />, br: <br /> }} />,
      heroImage: HydrogenTechHero,
      mainText: <Trans i18nKey="hydrogen_maintext" components={{ span: <span /> }} />,
      subText: <Trans i18nKey="hydrogen_subtext" components={{ span: <span /> }} />,
      galleryImages: [HydroGenImage1, HydroGenImage2, HydroGenImage3],
      link: "hydrogen-tech",
      questions: [
        {
          title: t("hydrogen_question1"),
          answer: t("hydrogen_answer1"),
        },
        {
          title: t("hydrogen_question2"),
          answer: t("hydrogen_answer2"),
        },
        {
          title: t("hydrogen_question3"),
          answer: t("hydrogen_answer3"),
        },
      ],
    },
    {
      title: t("wind"),
      subtitle: <Trans i18nKey="wind_subtitle" components={{ span: <span />, br: <br /> }} />,
      heroImage: WindTurbinesHero,
      mainText: <Trans i18nKey="wind_maintext" components={{ span: <span /> }} />,
      subText: <Trans i18nKey="wind_subtext" components={{ span: <span /> }} />,
      galleryImages: [WindTurbinesImage1, WindTurbinesImage2, WindTurbinesImage3],
      link: "wind-turbines",
      questions: [
        {
          title: t("wind_question1"),
          answer: t("wind_answer1"),
        },
        {
          title: t("wind_question2"),
          answer: t("wind_answer2"),
        },
        {
          title: t("wind_question3"),
          answer: t("wind_answer3"),
        },
      ],
    },
    {
      title: t("hydro"),
      subtitle: <Trans i18nKey="hydro_subtitle" components={{ span: <span />, br: <br /> }} />,
      heroImage: HydroplantHero,
      mainText: <Trans i18nKey="hydro_maintext" components={{ span: <span /> }} />,
      subText: <Trans i18nKey="hydro_subtext" components={{ span: <span /> }} />,
      galleryImages: [HydroPlantImage1, HydroPlantImage2, HydroPlantImage3],
      link: "hydro-energy",
      questions: [
        {
          title: t("hydro_question1"),
          answer: t("hydro_answer1"),
        },
        {
          title: t("hydro_question2"),
          answer: t("hydro_answer2"),
        },
        {
          title: t("hydro_question3"),
          answer: t("hydro_answer3"),
        },
      ],
    },
  ];
};

export const PRODUCTS: IProduct[] = [
  {
    title: "Cолнечные фермы",
    subtitle: (
      <>
        <span>Инновационный</span> способ использования возобновляемых <br /> источников энергии{" "}
        <span>для выработки электричества</span>
      </>
    ),
    heroImage: SolarEnergyHero,
    mainText: (
      <>
        <span>Наши солнечные фермы</span> <span>обеспечивают</span> чистую и возобновляемую энергию,{" "}
        <span>снижая углеродный след и способствуя устойчивому развитию</span>
      </>
    ),
    subText: (
      <>
        <span>Мы установили более</span> 100,000 солнечных панелей, <span>которые генерируют свыше</span> 50
        мегаватт (МВт) энергии ежегодно. <span>Это эквивалентно</span> снижению выбросов CO2 на 25,000 тонн в
        год, <span>что сравнимо с посадкой</span> 1 миллиона деревьев.
      </>
    ),
    galleryImages: [SolarImage1, SolarImage2, SolarImage3],
    link: "solar-energy",
    questions: [
      {
        title: "Солнечные панели работают лучше в жаркие дни?",
        answer:
          "В тех местностях, где суши мало, плавающие солнечные фермы позволяют создавать возобновляемые источники энергии, не занимая места, необходимого для земледелия или других целей. Охлаждающий эффект воды позволяет плавающим солнечным элементам работать более эффективно, чем на суше. Большинство плавающих солнечных ферм установлены на искусственных озерах или водохранилищах. Например, крупнейшая в мире плавающая солнечная ферма, недавно открывшаяся в Китае недалеко от города Хуайнань, находится на вершине бывшего участка добычи угля, который был затоплен. Покрывая поверхность воды, плавающие солнечные фермы уменьшают испарение, экономя воду.",
      },
      {
        title: "Какие солнечные фермы лучше — плавающие или наземные?",
        answer:
          "В тех местностях, где суши мало, плавающие солнечные фермы позволяют создавать возобновляемые источники энергии, не занимая места, необходимого для земледелия или других целей. Охлаждающий эффект воды позволяет плавающим солнечным элементам работать более эффективно, чем на суше. Большинство плавающих солнечных ферм установлены на искусственных озерах или водохранилищах. Например, крупнейшая в мире плавающая солнечная ферма, недавно открывшаяся в Китае недалеко от города Хуайнань, находится на вершине бывшего участка добычи угля, который был затоплен. Покрывая поверхность воды, плавающие солнечные фермы уменьшают испарение, экономя воду.",
      },
      {
        title: "Насколько сложен монтаж солнечной станции?",
        answer:
          "В тех местностях, где суши мало, плавающие солнечные фермы позволяют создавать возобновляемые источники энергии, не занимая места, необходимого для земледелия или других целей. Охлаждающий эффект воды позволяет плавающим солнечным элементам работать более эффективно, чем на суше. Большинство плавающих солнечных ферм установлены на искусственных озерах или водохранилищах. Например, крупнейшая в мире плавающая солнечная ферма, недавно открывшаяся в Китае недалеко от города Хуайнань, находится на вершине бывшего участка добычи угля, который был затоплен. Покрывая поверхность воды, плавающие солнечные фермы уменьшают испарение, экономя воду.",
      },
    ],
  },
  {
    title: "Майнинговые фермы",
    subtitle: (
      <>
        <span>Эффективные</span> и экологичные решения для <br /> майнинга криптовалют{" "}
        <span>с минимальными энергозатратами</span>
      </>
    ),
    heroImage: MiningFarmsHero,
    mainText: (
      <>
        <span>Наши майнинговые фермы</span> <span>используют</span> инновационные охлаждающие технологии,{" "}
        <span>позволяя снижать энергозатраты</span> и{" "}
        <span>оптимизировать производительность оборудования</span>.
      </>
    ),
    subText: (
      <>
        <span>Фермы оборудованы</span> новейшими ASIC-устройствами, <span>которые позволяют добывать</span>{" "}
        криптовалюты с высокой энергоэффективностью. <span>Мы также работаем над тем, чтобы</span>{" "}
        использовать возобновляемые источники энергии для питания наших объектов.
      </>
    ),
    galleryImages: [MiningImage1, MiningImage2, MiningImage3],
    link: "mining-farms",
    questions: [
      {
        title: "Какие требования к охлаждению оборудования на майнинговых фермах?",
        answer:
          "В процессе майнинга оборудование выделяет значительное количество тепла. Эффективные системы охлаждения помогают поддерживать оптимальную температуру для работы оборудования и продлевают срок его службы. В районах с низкими температурами можно использовать естественное охлаждение, тогда как в жарких регионах необходимы специальные системы кондиционирования и охлаждения.",
      },
      {
        title: "Насколько важен выбор локации для майнинговой фермы?",
        answer:
          "Локация имеет критическое значение для успешной работы майнинговой фермы. Важные факторы включают стоимость электроэнергии, климатические условия для охлаждения оборудования, доступность интернет-соединения и законодательные нормы региона. Например, некоторые страны предоставляют льготные тарифы на электроэнергию для майнинга, что делает их привлекательными для размещения ферм.",
      },
      {
        title: "Каковы затраты на электроэнергию при майнинге криптовалют?",
        answer:
          "Майнинг требует значительных объемов электроэнергии, что является одним из основных факторов расходов. Для некоторых криптовалют, таких как Bitcoin, энергозатраты могут достигать значительных величин, делая майнинг экономически невыгодным в регионах с высокой стоимостью электричества.",
      },
    ],
  },
  {
    title: "Водородные технологии",
    subtitle: (
      <>
        <span>Будущее</span> энергетики основано на <br /> инновационных <span>водородных технологиях</span>
      </>
    ),
    heroImage: HydrogenTechHero,
    mainText: (
      <>
        <span>Наши водородные установки</span> <span>способствуют</span> переходу на{" "}
        <span>безуглеродную экономику</span> и <span>обеспечивают чистую энергию</span> для транспортных
        систем и промышленности.
      </>
    ),
    subText: (
      <>
        <span>Мы активно внедряем</span> технологию водородных топливных элементов,{" "}
        <span>которая позволяет сократить выбросы CO2</span> и{" "}
        <span>повысить экологическую безопасность</span>. <span>Наша система</span> генерации водорода
        безопасна и высокоэффективна.
      </>
    ),
    galleryImages: [HydroGenImage1, HydroGenImage2, HydroGenImage3],
    link: "hydrogen-tech",
    questions: [
      {
        title: "Какие существуют способы производства водорода?",
        answer:
          "Водород можно производить с использованием разных технологий, включая электролиз воды, реформинг метана и биохимические процессы. Каждый метод имеет свои преимущества и недостатки в плане стоимости, экологической чистоты и масштабируемости.",
      },
      {
        title: "Насколько безопасно использование водорода в качестве топлива?",
        answer:
          "Водород — это высокоэнергетичное топливо, но его хранение и транспортировка могут быть сложными из-за его взрывоопасности и низкой плотности. Современные технологии включают использование композитных баллонов и специальные меры безопасности, чтобы снизить риски.",
      },
      {
        title: "Может ли водород заменить традиционные виды топлива?",
        answer:
          "Водород рассматривается как перспективная замена ископаемых видов топлива благодаря отсутствию выбросов углекислого газа при его сгорании. Однако широкомасштабное внедрение водородных технологий требует решения вопросов с инфраструктурой, стоимостью производства и устойчивым источником энергии для его производства.",
      },
    ],
  },
  {
    title: "Ветровые турбины",
    subtitle: (
      <>
        <span>Энергия</span> ветра — мощный ресурс <br /> для устойчивого <span>электроснабжения</span>
      </>
    ),
    heroImage: WindTurbinesHero,
    mainText: (
      <>
        <span>Наши ветровые турбины</span> <span>используют</span> передовые технологии для{" "}
        <span>оптимизации выработки энергии</span> и <span>минимизации влияния на окружающую среду</span>.
      </>
    ),
    subText: (
      <>
        <span>Мы установили</span> более 500 турбин, <span>которые генерируют</span> свыше 300 мегаватт
        энергии ежегодно. <span>Это позволяет</span> нам снабжать тысячи домов и{" "}
        <span>сокращать выбросы парниковых газов</span>.
      </>
    ),
    galleryImages: [WindTurbinesImage1, WindTurbinesImage2, WindTurbinesImage3],
    link: "wind-turbines",
    questions: [
      {
        title: "Какие факторы влияют на эффективность ветровых турбин?",
        answer:
          "Эффективность ветровых турбин зависит от скорости и стабильности ветра, высоты установки и дизайна лопастей. Размещение турбин в местах с постоянными ветровыми потоками значительно повышает их производительность.",
      },
      {
        title: "Какие виды ветровых турбин существуют?",
        answer:
          "Существуют горизонтально-осевые и вертикально-осевые турбины. Горизонтально-осевые наиболее распространены и эффективны для больших ветропарков, тогда как вертикально-осевые имеют преимущества при установке в городских условиях из-за меньшего шума и компактности.",
      },
      {
        title: "Как влияют ветровые турбины на окружающую среду?",
        answer:
          "Ветровые турбины являются экологически чистым источником энергии, однако они могут оказывать влияние на местные экосистемы, включая изменение маршрутов миграции птиц и изменение ландшафта. Важно учитывать эти факторы при проектировании и строительстве ветропарков.",
      },
    ],
  },
  {
    title: "Гидроэлектростанции",
    subtitle: (
      <>
        <span>Эффективные</span> гидроэлектростанции <br /> обеспечивают{" "}
        <span>экологически чистую энергию</span>
      </>
    ),
    heroImage: HydroplantHero,
    mainText: (
      <>
        <span>Наши гидроэлектростанции</span> <span>обеспечивают</span> стабильную выработку энергии,{" "}
        <span>сокращая</span> зависимость от ископаемого топлива и <span>снижая углеродные выбросы</span>.
      </>
    ),
    subText: (
      <>
        <span>Мы разработали и внедрили</span> более 10 гидроэлектростанций,{" "}
        <span>способных генерировать</span> свыше 100 мегаватт энергии в год. <span>Это соответствует</span>{" "}
        потребностям тысяч домохозяйств и <span>способствует улучшению экологической ситуации</span>.
      </>
    ),
    galleryImages: [HydroPlantImage1, HydroPlantImage2, HydroPlantImage3],
    link: "hydro-energy",
    questions: [
      {
        title:
          "Какие преимущества имеют гидроэлектростанции по сравнению с другими видами генерации энергии?",
        answer:
          "Гидроэлектростанции обеспечивают стабильный и предсказуемый источник энергии, не зависящий от погодных условий. Они имеют высокий коэффициент полезного действия и могут служить резервными источниками в энергосистемах благодаря возможности быстро наращивать мощность.",
      },
      {
        title: "Какие экологические последствия связаны с строительством гидроэлектростанций?",
        answer:
          "Строительство плотин и водохранилищ для гидроэлектростанций может изменить экосистемы рек, повлиять на миграцию рыб и привести к затоплению больших площадей. Это требует тщательной оценки экологического воздействия и разработки мер по минимизации негативных последствий.",
      },
      {
        title: "Насколько надежны гидроэлектростанции в условиях изменения климата?",
        answer:
          "Изменение климата может повлиять на количество осадков и уровень рек, что в свою очередь скажется на работе гидроэлектростанций. Регулирование водных потоков и управление водохранилищами становится критически важным для поддержания устойчивой выработки энергии в меняющихся климатических условиях.",
      },
    ],
  },
];
