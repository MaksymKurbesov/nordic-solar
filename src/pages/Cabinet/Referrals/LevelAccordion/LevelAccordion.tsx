import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./LevelAccordion.module.scss";
import { parseTimestamp } from "@/utils/helpers/date.tsx";
import { IReferral } from "@/pages/Cabinet/Referrals/Referrals.tsx";
import { FC } from "react";
import { getReferralsCount } from "@/utils/helpers.tsx";
import { useTranslation } from "react-i18next";

const getColumns = (t) => {
  return [
    {
      field: "nickname",
      headerName: t("nickname"),
      flex: 1,
      resizable: false,
    },
    {
      field: "referredBy",
      headerName: t("sponsor"),
      flex: 1,
      resizable: false,
    },
    {
      field: "referrals",
      headerName: t("referrals_count"),
      flex: 1,
      resizable: false,
    },
    {
      field: "registrationDate",
      headerName: t("date_reg"),
      flex: 1,
      resizable: false,
    },
    {
      field: "invested",
      headerName: t("invested"),
      flex: 1,
      resizable: false,
    },
  ];
};

interface ILevelAccordionProps {
  level: number;
  referrals: IReferral[];
}

const LevelAccordion: FC<ILevelAccordionProps> = ({ level, referrals }) => {
  const { t } = useTranslation("referrals");
  const activeReferrals = referrals.filter((referral) => referral.invested > 0);
  const totalIncome = referrals.reduce((accum, currentValue) => accum + currentValue.invested, 0);

  return (
    <Accordion
      sx={{
        background: "none",
        // overflow: 'scroll',
        color: "white",
        border: "1px solid rgba(255,255, 255, 0.1)",
        borderRadius: "10px",
        marginBottom: "15px",
      }}
    >
      <AccordionSummary
        className={styles["accordion-summary"]}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          "& > div": {
            display: "grid",
            gridTemplateColumns: "15% 1fr 1fr 15%",
          },
          "& > div p:last-child": {
            textAlign: "right",
          },
        }}
      >
        <p>{level}</p>
        <p>
          {referrals.length} {t("quantity")}
        </p>
        <p>
          {activeReferrals.length} {t("quantity")}
        </p>
        <p>${totalIncome}</p>
      </AccordionSummary>
      <AccordionDetails className={styles["accordion-details"]}>
        <DataGrid
          className={styles["data-grid"]}
          sx={{
            color: "white",
            "& .MuiDataGrid-columnHeaderTitleContainer": { color: "white" },
            "& .MuiTablePagination-root": { color: "white" },
            "& .MuiDataGrid-container--top [role=row]": {
              background: "#14cc74",
            },
            "& .MuiDataGrid-virtualScroller": { overflow: "initial" },
            ".MuiButtonBase-root": { color: "white" },
          }}
          rows={referrals.map((item, index) => {
            if (!item) return;

            return {
              ...item,
              id: index,
              registrationDate: parseTimestamp(item.registrationDate),
              referrals: `${getReferralsCount(item.referredTo)} шт.`,
              invested: `$${item.invested}`,
            };
          })}
          columns={getColumns(t)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default LevelAccordion;
