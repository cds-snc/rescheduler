import { CalendarFields, RegistrationFields } from '../validation'
import Validator from 'validatorjs'
import { cleanDates } from './sendmail'

import { captureMessage } from '../utils/serverUtils'

export const handleSubmitEmail = async (req, res) => {
  let input = Object.assign({}, req.body) // make a new object
  input.selectedDays = cleanDates(input.selectedDays)

  const validateReg = new Validator(input, RegistrationFields)

  if (!validateReg.passes()) {
    captureMessage('Register Page', validateReg)
    return res.redirect('/register?not-valid=true')
  }

  // validate the selected dates if availability explanation isn't found
  if (input.availabilityExplanation === '') {
    const validateCal = new Validator(input, CalendarFields)

    if (!validateCal.passes()) {
      captureMessage('Calendar Page', validateCal)
      return res.redirect('/calendar?not-valid=true')
    }
  }

  try {
    return res.redirect('/confirmation')
  } catch (e) {
    console.log(e) // eslint-disable-line no-console
    return res.redirect('/error')
  }
}
