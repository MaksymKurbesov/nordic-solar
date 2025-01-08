import { Box, Button } from '@mui/material'

const NavigationButtons = ({
  activeStep,
  handleBack,
  handleNext,
  steps,
  userHasRestriction,
}: any) => (
  <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
    <Button
      color="inherit"
      disabled={activeStep === 0}
      onClick={handleBack}
      sx={{
        mr: 1,
        background: 'white',
        color: 'black',
        width: '200px',
        fontSize: 12,
        fontFamily: 'inherit',
      }}
    >
      Назад
    </Button>
    <Button
      onClick={handleNext}
      sx={{
        background: 'white',
        color: '#14cc74',
        width: '200px',
        fontSize: 12,
        fontFamily: 'inherit',
      }}
      disabled={userHasRestriction}
    >
      {activeStep === steps.length - 1 ? 'Выполнить' : 'Дальше'}
    </Button>
  </Box>
)

export default NavigationButtons
