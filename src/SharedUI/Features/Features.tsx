import styles from './Features.module.scss'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { useState } from 'react'

const Features = ({ features, images }) => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <div className={`${styles.features}`}>
      <Tabs
        className={styles['tabs']}
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <img
          className={styles['main-image']}
          src={images[tabIndex]}
          alt={''}
          height={'100%'}
          width={'100%'}
        />
        <div className={styles['features-wrapper']}>
          <h3>Основные функции и услуги</h3>
          <TabList className={styles['features-list']}>
            {features.map((feature) => {
              return (
                <Tab
                  key={feature.title}
                  selectedClassName={styles['selected-tab']}
                  className={`${styles['tab']}`}
                >
                  {feature.title}
                </Tab>
              )
            })}
          </TabList>
          <div className={styles['features-content']}>
            {features.map((feature, index) => {
              return (
                <TabPanel key={index}>
                  <ul>
                    {feature.description.map((item) => {
                      return <li key={item}>{item}</li>
                    })}
                  </ul>
                </TabPanel>
              )
            })}
          </div>
        </div>
      </Tabs>
    </div>
  )
}

export default Features
