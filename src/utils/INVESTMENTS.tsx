import IndividualImage from '@assets/images/investments/individual-hero.webp';
import MutualFundsImage from '@assets/images/investments/mutual-fonds-hero.webp';
import DirectInvestmentImage from '@assets/images/investments/direct-investments-hero.webp';
import CorporateInvestmentImage from '@assets/images/investments/corporative-hero.webp';
import CrowdfundingImage from '@assets/images/investments/crowdfunding-hero.webp';
import PensionInvestmentImage from '@assets/images/investments/pension-hero.webp';

export const INVESTMENTS = [
  {
    title: 'Индивидуальные инвестиционные планы',
    subtitle: <><span>Персонализированное</span> управление портфелем, <br />{' '}
      индивидуальные консультации и регулярные отчеты</>,
    heroImage: IndividualImage,
    mainText: <><span>Индивидуальные планы,</span> разработанные с учетом <br /> ваших
      целей и потребностей</>,
    subText: <>Получите персонализированное управление портфелем, <br />
      индивидуальные консультации и регулярные отчеты</>,
    link: 'individual-investment-plans'
  },
  {
    title: 'Взаимные фонды зеленой энергетики',
    subtitle: (
      <>
        <span>Инвестируйте</span> в будущее с помощью <br />{' '}
        зеленых и устойчивых проектов
      </>
    ),
    heroImage: MutualFundsImage,
    mainText: (
      <>
        <span>Фонды зеленой энергетики</span> предоставляют возможность <br />
        инвестировать в устойчивое развитие и чистую энергию
      </>
    ),
    subText: (
      <>
        Участвуйте в финансировании экологически чистых проектов, <br />
        чтобы сделать мир лучше для будущих поколений
      </>
    ),
    link: 'mutual-fonds'
  },
  {
    title: 'Программы прямых инвестиций',
    subtitle: (
      <>
        <span>Прямые инвестиции</span> в компании и проекты, <br />{' '}
        предоставляющие уникальные возможности
      </>
    ),
    heroImage: DirectInvestmentImage,
    mainText: (
      <>
        <span>Программы прямых инвестиций</span> позволяют <br />
        получить доступ к приватным сделкам и проектам
      </>
    ),
    subText: (
      <>
        Откройте для себя инвестиционные возможности вне публичных рынков, <br />
        выбирая проекты с высокой доходностью
      </>
    ),
    link: 'direct-investments'
  },
  {
    title: 'Корпоративные инвестиционные планы',
    subtitle: (
      <>
        <span>Корпоративные инвестиционные решения</span> для <br />{' '}
        компаний, стремящихся к устойчивому росту
      </>
    ),
    heroImage: CorporateInvestmentImage,
    mainText: (
      <>
        <span>Корпоративные инвестиционные планы</span> нацелены на <br />
        управление капиталом в интересах бизнеса
      </>
    ),
    subText: (
      <>
        Оптимизируйте корпоративные финансы, <br />
        используя эффективные стратегии управления инвестициями
      </>
    ),
    link: 'corporate-investment-plans'
  },
  {
    title: 'Программы коллективных инвестиций (Crowdfunding)',
    subtitle: (
      <>
        <span>Инвестируйте коллективно</span> через краудфандинг, <br />{' '}
        поддерживайте инновации и стартапы
      </>
    ),
    heroImage: CrowdfundingImage,
    mainText: (
      <>
        <span>Программы коллективных инвестиций</span> позволяют <br />
        поддерживать проекты и получать прибыль вместе с другими
      </>
    ),
    subText: (
      <>
        Вложите свои средства в инновационные стартапы и проекты, <br />
        используя силу краудфандинга
      </>
    ),
    link: 'crowdfunding-investment-programs'
  },
  {
    title: 'Пенсионные инвестиционные планы',
    subtitle: (
      <>
        <span>Надежные инвестиционные</span> стратегии для <br />{' '}
        обеспечения вашей финансовой независимости на пенсии
      </>
    ),
    heroImage: PensionInvestmentImage,
    mainText: (
      <>
        <span>Пенсионные инвестиционные планы</span> помогут <br />
        вам сохранить и приумножить капитал для беззаботной пенсии
      </>
    ),
    subText: (
      <>
        Долгосрочные инвестиции с акцентом на стабильность и рост, <br />
        обеспечат вам достойный уровень жизни на пенсии
      </>
    ),
    link: 'pension-investment-plans'
  }
];