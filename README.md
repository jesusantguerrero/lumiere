# lumiere

Project boilerplate for my firebase/vue projects

### Tech Stack
- Vue ^3
- Firebase ^9 or Supabase Auth
- TailwindCSS
- Storybook
- Testing Library Vue

### Features
- Login / Register
- Auth Flow: Authentication check + AuthState.
- Support Firebase and Supabase as Auth providers.

Roadmap
- Get everything from zen

## Installation

### Prerequisites

| Prerequisite                                          | Version |
| ------------------------------------------------------| ------- |
| [Supabase account](https://supabase.com/)* or         |         |
| [Firebase account](https://firebase.google.com/)*     |         |
| npm (comes with Node) or yarn (used)                  | `~ ^12.20.0`|
| npm (comes with Node) or yarn (used)                  | `~ ^6.14.8`  |

* Either firebase or supabase not both
```shell
node -v
```
#### Cloning the repo

1. Open a Terminal in your projects directory 
2. Clone this repo

```shell
$ git clone https://github.com/jesusantguerrero/lumiere
```

### setup
```bash
# Install NPM dependencies
npm install
# or If you like yarn
yarn install

```

copy .env.example to .env.local and change the API KEY:

```bash
cp .env.example .env.local
```

### running

```bash
# Start the development mode
npm run dev

# run storybook
npm run storybook
```

### testing
```
npm run test
```
