import { Step, StepLabel, Stepper, useMediaQuery } from '@mui/material'
import styles from './OpenPlan.module.scss'

const customStyles = {
  '& .MuiStepLabel-label': {
    color: 'white',
  },
  '& .MuiStepLabel-label.Mui-active': { color: 'white ' },
  '& .MuiStepLabel-label.Mui-completed': { color: '#14cc74' },
  '& .MuiSvgIcon-root.Mui-active': { color: '#14cc74' },
  '& .MuiSvgIcon-root.Mui-completed': { color: '#14cc74' },
}

const MyStepper = ({ steps, activeStep }) => {
  const matches = useMediaQuery('(min-width:700px)')

  return (
    <Stepper
      className={styles['stepper']}
      activeStep={activeStep}
      sx={{ marginBottom: 5, marginTop: 5 }}
    >
      {steps.map((step, index) => {
        const stepProps: { completed?: boolean } = {}
        const labelProps = {}

        return (
          <Step key={step.title} {...stepProps}>
            <StepLabel {...labelProps} sx={customStyles}>
              {matches && step.title}
            </StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}

export default MyStepper
