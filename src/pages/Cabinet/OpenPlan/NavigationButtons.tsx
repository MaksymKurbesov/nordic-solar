import { Box, Button } from '@mui/material';

const NavigationButtons = ({ activeStep, handleBack, handleNext, steps }: any) => (
  <Box sx={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
    <Button
      color="inherit"
      disabled={activeStep === 0}
      onClick={handleBack}
      sx={{ mr: 1, background: "white", color: "black", width: "200px" }}
    >
      Назад
    </Button>
    <Button onClick={handleNext} sx={{ background: "white", color: "#14cc74", width: "200px" }}>
      {activeStep === steps.length - 1 ? "Выполнить" : "Дальше"}
    </Button>
  </Box>
);

export default NavigationButtons;