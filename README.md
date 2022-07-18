
# Auth Portal (MERN)

It is a simple Authentication portal consisting sign in, sign up and a protected home page.


## Deployed App 🚀
App is deployed using Heroku(backend) and Netlify(frontend).

Link - https://login-portal.netlify.app/

## Requirements
1. axios
2. jwt
3. passport-jwt
4. bcrypt
5. Mongodb Atlas

## Overview

If user is already logged in, then it redirects to the protected page.

### Starting Page(for non-logged in user)
Sign In / Sign Up page interface:

![sign](https://i.ibb.co/SRrsJFq/image.png)

### Home (Protected)
After Successful login:

![home](https://i.ibb.co/SfRQJjX/image.png)

On logout user is logged out and accesing home route will redirect it to login page.
