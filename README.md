# Designvote - Client

Frontend application for [designvote](https://designvote.io)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### Code Splitting

This section has moved here:
https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here:
https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here:
https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here:
https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here:
https://facebook.github.io/create-react-app/docs/deployment

### `npm build` fails to minify

This section has moved here:
https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Screens

#### Home Screen

```http request
/
```

#### Latest Screen

```http request
/latest
```

The screen with the latest public designs

#### Popular Screen

```http request
/popular
```

The screen with the most popular designs

#### Public Design Screen

```http request
/design/{designId}
```

| Parameter  | Type     | Description                |
| :--------- | :------- | :------------------------- |
| `designId` | `string` | **Required**. Id of design |

The screen where users can vote on designs. If a user doesn't vote, he will not
see results

#### Designer screen

The designer screen

```http request
/${nickname}
```

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `nickname` | `string` | **Required**. Nickname of the designers |

#### Designer surveys

The designer screen

```http request
/${nickname}/surveys
```

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `nickname` | `string` | **Required**. Nickname of the designers |

#### Profile

```http request
/account/profile
```

The edit account settings
