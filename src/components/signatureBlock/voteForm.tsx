import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Box, Button } from '@mui/material'
import { PercentageSlider } from './percentageSlider'
import { Modes, VoteFormProps, VoteFormValues } from './types'
import { initialVoteFormValues, modesMap } from './constants'
import { DeadlineInput } from './deadlineInput'

export const VoteForm: React.FC<VoteFormProps> = ({ startVote, disabled }) => {
  const onSubmit = (data: VoteFormValues) => {
    console.log(data)
    startVote(data)
  }

  const methods = useForm<VoteFormValues>({
    defaultValues: initialVoteFormValues,
    mode: 'onChange',
  })

  return (
    <FormProvider {...methods}>
      <Box
        component={'form'}
        onSubmit={(event) => void methods.handleSubmit(onSubmit)(event)}
      >
        <DeadlineInput />
        <PercentageSlider />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          {modesMap[Modes.Vote]}
        </Button>
      </Box>
    </FormProvider>
  )
}
