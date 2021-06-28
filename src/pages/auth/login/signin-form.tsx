import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  LightMode,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import {UnderlineLink} from './underline-link'
import {FormikTouched, useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import {useUser} from 'store/user'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

interface Values {
  email: string
  password: string
}

const validationSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string(),
})

const initialValues = {email: '', password: ''}

const initialTouched: FormikTouched<Values> = {}

export const SigninForm = () => {
  const setUser = useUser(state => state.setUser)
  const router = useRouter()
  const user = useUser(state => state.user)
  useEffect(() => {
    if (user) {
      console.log('FOUND USER', {user})
      router.replace('/home')
    }
  }, [user, router])
  const {errors, handleSubmit, handleChange, handleBlur, touched} = useFormik({
    validationSchema,
    initialTouched,
    initialValues,
    onSubmit: async values => {
      console.log({values})
      const response = await axios.post('/api/v1/login', values)
      if (response.status === 200) {
        setUser(response.data.identity)
        router.push('/home')
      }
    },
  })
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="-px">
        <FormControl
          id="email"
          isInvalid={!!(touched.email && errors.email)}
          isRequired
        >
          <FormLabel srOnly>Email address</FormLabel>
          <Input
            size="lg"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder="Email address"
            bg={mode('white', 'gray.700')}
            fontSize="md"
            roundedBottom="0"
          />
          <FormErrorMessage>
            {touched.email && errors.email && errors.email}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel srOnly>Password</FormLabel>
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            size="lg"
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            bg={mode('white', 'gray.700')}
            fontSize="md"
            roundedTop="0"
            placeholder="Password"
          />
          <FormErrorMessage>
            {touched.password && errors.password && errors.password}
          </FormErrorMessage>
        </FormControl>
      </Stack>
      <Flex align="center" justify="space-between" mt="8">
        <LightMode>
          <Checkbox
            size="lg"
            colorScheme="blue"
            sx={{
              '.chakra-checkbox__control': {
                '&:not([data-checked])': {bg: mode('white', 'gray.700')},
                rounded: 'base',
                borderWidth: '1px',
              },
              '.chakra-checkbox__label': {fontSize: 'sm'},
            }}
          >
            Remember me
          </Checkbox>
        </LightMode>
        <UnderlineLink fontSize="sm">Forgot Password</UnderlineLink>
      </Flex>
      <LightMode>
        <Button
          size="lg"
          type="submit"
          mt="8"
          w="full"
          colorScheme="blue"
          fontSize="md"
          fontWeight="bold"
        >
          Sign in
        </Button>
      </LightMode>
    </form>
  )
}
