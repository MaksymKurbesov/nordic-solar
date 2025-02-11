import styles from "./Team.module.scss";
import TeamMember1 from "@assets/images/team/1.png";
import TeamMember2 from "@assets/images/team/2.png";
import TeamMember3 from "@assets/images/team/3.png";
import TeamMember4 from "@assets/images/team/4.png";
import TeamMember5 from "@assets/images/team/5.png";
import TeamMember6 from "@assets/images/team/6.png";
import TeamMember7 from "@assets/images/team/7.png";
import { useTranslation } from "react-i18next";

const getTeam = (t) => {
  return [
    {
      photo: TeamMember1,
      name: "Jochen Wermuth",
      position: t("team1"),
    },
    {
      photo: TeamMember2,
      name: "Mark Dooley",
      position: t("team2"),
    },
    {
      photo: TeamMember3,
      name: "Vladimir Grachev",
      position: t("team3"),
    },
    {
      photo: TeamMember4,
      name: "Michael Liebreich",
      position: t("team4"),
    },
    {
      photo: TeamMember5,
      name: "Martin Green",
      position: t("team5"),
    },
    {
      photo: TeamMember6,
      name: t("team6"),
      position: "",
    },
    {
      photo: TeamMember7,
      name: t("team7"),
      position: "",
    },
  ];
};

const Team = () => {
  const { t } = useTranslation("aboutUs");

  return (
    <div className={styles["team"]}>
      <h4>{t("management")}</h4>
      <ul className={styles["team-list"]}>
        {getTeam(t).map((member) => {
          return (
            <li key={member.name}>
              <img src={member.photo} alt={""} height={560} />
              <p>{member.name}</p>
              <span>{member.position}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Team;
