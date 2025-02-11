import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const NavigationButtons = ({ activeStep, handleBack, handleNext, steps, userHasRestriction }: any) => {
  const { t } = useTranslation("openPlan");

  return (
    <Box sx={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{
          mr: 1,
          background: "white",
          color: "black",
          width: "200px",
          fontSize: 12,
          fontFamily: "inherit",
        }}
      >
        {t("back")}
      </Button>
      <Button
        onClick={handleNext}
        sx={{
          background: "white",
          color: "#14cc74",
          width: "200px",
          fontSize: 12,
          fontFamily: "inherit",
        }}
        disabled={userHasRestriction}
      >
        {activeStep === steps.length - 1 ? t("confirm") : t("next")}
      </Button>
    </Box>
  );
};

export default NavigationButtons;
