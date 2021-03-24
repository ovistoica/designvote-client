import {render, screen, within} from 'test/test-utils'
import faker from 'faker'

import {DesignStats} from '../design-stats'

let randomOpinions = faker.random.number({min: 1, max: 1500})
let randomVotes = faker.random.number({min: 1, max: 2000})
let designId = faker.random.uuid()

test('renders correctly', () => {
  render(
    <DesignStats
      totalOpinions={randomOpinions}
      totalVotes={randomVotes}
      designId={designId}
    />,
  )

  const shareButton = screen.getByRole('button', {name: /share/i})
  const previewButton = screen.getByRole('button', {name: /preview/i})

  expect(shareButton).toBeInTheDocument()
  expect(previewButton).toBeInTheDocument()

  const votes = screen.getByLabelText(/number of votes/i)
  const opinions = screen.getByLabelText(/number of opinions/i)

  expect(votes).toBeInTheDocument()
  expect(opinions).toBeInTheDocument()

  const numberOfVotes = within(votes).getByText(randomVotes)
  expect(numberOfVotes).toBeInTheDocument()

  const numberOfOpinions = within(votes).getByText(randomVotes)
  expect(numberOfOpinions).toBeInTheDocument()
})
