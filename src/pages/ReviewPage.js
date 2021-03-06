import React from 'react'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { css } from 'emotion'
import { Trans } from '@lingui/react'
import { NavLink } from 'react-router-dom'
import { theme, TopContainer } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import Chevron from '../components/Chevron'
import Summary from '../components/Summary'
import Reminder from '../components/Reminder'
import SubmissionForm from '../components/SubmissionForm'
import { sortSelectedDays } from '../utils/calendarDates'
import { dateToISODateString } from '../components/Time'
import FocusedH1 from '../components/FocusedH1'

const contentClass = css`
  p {
    padding-bottom: ${theme.spacing.lg};
  }
`

class ReviewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sending: false }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.setState({ sending: true })
  }

  translateReason(reason) {
    switch (reason) {
      case 'travel':
        return <Trans>Travel</Trans>
      case 'family':
        return <Trans>Family</Trans>
      case 'medical':
        return <Trans>Medical</Trans>
      case 'workOrSchool':
        return <Trans>Work or School</Trans>
      case 'other':
        return <Trans>Other</Trans>
      default:
        return null
    }
  }

  render() {
    let {
      context: {
        store: {
          register: {
            fullName,
            email,
            paperFileNumber,
            familyCheck,
            familyOption,
            reason,
            explanation,
          } = {},
          explanation: { explanationPage } = {},

          calendar: { selectedDays = [] } = {},
        } = {},
      } = {},
    } = this.props

    const { sending } = this.state

    let days = []

    if (selectedDays) {
      days = sortSelectedDays(
        selectedDays.map(day => {
          return new Date(dateToISODateString(day))
        }),
      )
    }

    return (
      <Layout contentClass={contentClass}>
        <Title path={this.props.match.path} />
        <TopContainer>
          <NavLink
            className="chevron-link"
            to={explanationPage ? '/explanation' : '/calendar'}
          >
            <Chevron dir="left" />
            <Trans>Go back</Trans>
          </NavLink>
        </TopContainer>
        <FocusedH1 id="review-header">
          <Trans>Review your request:</Trans>
        </FocusedH1>

        <section>
          <Summary
            fullName={fullName}
            paperFileNumber={paperFileNumber}
            familyCheck={familyCheck}
            familyOption={familyOption}
            email={email}
            explanation={explanation}
            reason={this.translateReason(reason)}
            selectedDays={days}
            availabilityExplanation={explanationPage}
          />
          {/* Note: if updating this text don't forget to update the email templates */}
          <Reminder>
            {explanationPage ? (
              <Trans>
                You should plan to attend your existing appointment until we
                contact you. This may take 1 week.
              </Trans>
            ) : (
              <React.Fragment>
                <Trans>
                  Sending this request will cancel your current appointment.
                </Trans>{' '}
                <strong>
                  <Trans> Do not attend your old appointment</Trans>
                </strong>{' '}
                <Trans>after you send this request.</Trans>
              </React.Fragment>
            )}
          </Reminder>
          <SubmissionForm
            fullName={fullName}
            email={email}
            paperFileNumber={paperFileNumber}
            familyCheck={familyCheck}
            familyOption={familyOption}
            explanation={explanation}
            reason={reason}
            selectedDays={selectedDays}
            availabilityExplanation={explanationPage}
            sending={sending}
            onSubmit={this.handleSubmit}
          />
        </section>
      </Layout>
    )
  }
}
ReviewPage.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}

export default withContext(ReviewPage)
