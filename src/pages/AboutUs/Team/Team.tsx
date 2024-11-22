import styles from './Team.module.scss'
import TeamMember1 from '@assets/images/team/1.png'
import TeamMember2 from '@assets/images/team/2.png'
import TeamMember3 from '@assets/images/team/3.png'
import TeamMember4 from '@assets/images/team/4.png'
import TeamMember5 from '@assets/images/team/5.png'
import TeamMember6 from '@assets/images/team/6.png'
import TeamMember7 from '@assets/images/team/7.png'

const TEAM = [
  {
    photo: TeamMember1,
    name: 'Jochen Wermuth',
    position: 'Генеральный директор (CEO)',
  },
  {
    photo: TeamMember2,
    name: 'Mark Dooley',
    position: 'Финансовый директор (CFO)',
  },
  {
    photo: TeamMember3,
    name: 'Vladimir Grachev',
    position: 'Технический директор (CTO)',
  },
  {
    photo: TeamMember4,
    name: 'Michael Liebreich',
    position: 'Директор по маркетингу',
  },
  {
    photo: TeamMember5,
    name: 'Martin Green',
    position: 'Главный инженер',
  },
  {
    photo: TeamMember6,
    name: 'Specialists from Eurasian Development Bank (EDB)',
    position: '',
  },
  {
    photo: TeamMember7,
    name: 'Representatives of Green Investment Group',
    position: '',
  },
]

const Team = () => {
  return (
    <div className={styles['team']}>
      <h4>Руководство компании</h4>
      <ul className={styles['team-list']}>
        {TEAM.map((member) => {
          return (
            <li key={member.name}>
              <img src={member.photo} alt={''} height={560} />
              <p>{member.name}</p>
              <span>{member.position}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Team
