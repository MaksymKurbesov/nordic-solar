import SolarFutureHero from '@assets/images/investments/solar-future-hero.webp'
import SolarFuture from '@assets/images/investments/solar-future.webp'
import WindProsperityHero from '@assets/images/investments/wind-prosperity-hero.webp'
import WindProsperity from '@assets/images/investments/wind-prosperity.webp'
import HydroPowerEdgeHero from '@assets/images/investments/hydro-hero.webp'
import HydroPowerEdge from '@assets/images/investments/hydro.webp'
import HydrogenHero from '@assets/images/investments/hydrogen-hero.webp'
import Hydrogen from '@assets/images/investments/hydrogen.webp'

export const INVESTMENTS = [
  {
    title: 'Solar Future',
    subtitle: (
      <>
        <span> Индивидуальные</span> инвестиционные стратегии для солнечной
        энергетики, <br /> основанные на ваших целях.
      </>
    ),
    heroImage: SolarFutureHero,
    thumbImage: SolarFuture,
    mainText: (
      <>
        <span>Поддержите проекты,</span> преобразующие солнечную энергию <br />{' '}
        в устойчивый доход.
      </>
    ),
    subText: (
      <>
        Инвестируйте в экологически чистое будущее <br /> с помощью
        персонализированных решений.
      </>
    ),
    link: 'solar-future',
    value: 'solar',
  },
  {
    title: 'Wind Prosperity',
    subtitle: (
      <>
        <span>Стратегии</span>, направленные на развитие <br /> устойчивых
        ветроэнергетических проектов.
      </>
    ),
    heroImage: WindProsperityHero,
    thumbImage: WindProsperity,
    mainText: (
      <>
        <span>Ваше участие</span> в проектах ветроэнергетики – <br />
        шаг к глобальной экологической стабильности.
      </>
    ),
    subText: (
      <>
        Регулярные консультации и подробный анализ <br /> помогут вам управлять
        инвестициями уверенно.
      </>
    ),
    link: 'wind-prosperity',
    value: 'wind',
  },
  {
    title: 'Hydro PowerEdge',
    subtitle: (
      <>
        <span>Решения для развития </span> гидроэлектростанций, <br />{' '}
        основанные на коллективных инвестициях.
      </>
    ),
    heroImage: HydroPowerEdgeHero,
    thumbImage: HydroPowerEdge,
    mainText: (
      <>
        <span>Инвестируйте в проекты,</span> которые создают стабильные <br /> и
        надежные источники энергии
      </>
    ),
    subText: (
      <>
        Получите доступ к инновациям в гидроэнергетике <br /> через детально
        разработанные планы.
      </>
    ),
    link: 'hydro-poweredge',
    value: 'hydro',
  },
  {
    title: 'Hydrogen Horizons',
    subtitle: (
      <>
        <span>Инвестируйте</span> в проекты водородной энергетики <br /> для
        устойчивого будущего.
      </>
    ),
    heroImage: HydrogenHero,
    thumbImage: Hydrogen,
    mainText: (
      <>
        <span>Индивидуальные инвестиционные планы,</span> <br />
        нацеленные на развитие водородных технологий.
      </>
    ),
    subText: (
      <>
        Станьте частью новой эры энергетики <br /> с поддержкой инновационных
        решений.
      </>
    ),
    link: 'hydrogen-horizons',
    value: 'hydrogen',
  },
]
