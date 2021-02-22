import faker from 'faker'

function buildAuth0User({firstName, lastName, ...overrides}) {
  const givenName = firstName ?? faker.name.firstName()
  const familyName = lastName ?? faker.name.lastName()
  const email = faker.internet.email(givenName, familyName)

  return {
    email,
    email_verified: true,
    family_name: familyName,
    given_name: givenName,
    locale: 'en',
    name: `${familyName} ${givenName}`,
    nickname: email.split('@')[0],
    picture: faker.image.imageUrl,
    sub: `auth0|${faker.random.number(21)}`,
    updated_at: faker.date.recent(),
    ...overrides,
  }
}

export {buildAuth0User}
