<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[![Build and Deploy Next JS App on DigitalOcean K8s Cluster](https://github.com/real-token/realtoken-yam-interface/actions/workflows/ci-cd.yaml/badge.svg)](https://github.com/real-token/realtoken-yam-interface/actions/workflows/ci-cd.yaml)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

<!-- PROJECT LOGO -->
<br />
<div align="center" id="about-the-project">
  <a href="https://github.com/real-token/realtoken-yam-interface">
    <img src="logo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">RealToken YAM interface</h3>

  <p align="center">
    Peer-to-peer RealToken YAM Interface
    <br />
    <a href="https://realt.co/"><strong>Realt.co</strong></a>
    <br />
    <br />
    <a href="https://github.com/real-token/realtoken-yam-interface/issues">Report Bug</a>
    ·
    <a href="https://github.com/real-token/realtoken-yam-interface/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#roadmap">Roadmap</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li>
      <a href="#contributing">Contributing</a>
      <ul>
        <li><a href="#state">State management</a></li>
        <li><a href="#data-fetching--caching">Data Fetching & Caching</a></li>
        <li><a href="#logging-system">Logging System</a></li>
        <li><a href="#authentication-system">Authentication System</a></li>
        <li><a href="#recent-optimizations-phase-0">Recent Optimizations</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#built-with-hardhat">Built With Hardhat</a></li>
  </ol>
</details>

<!-- ROADMAP -->

# Roadmap

- Replicate interface for each offer type to modify modal ❌

  See the [open issues](https://github.com/real-token/realtoken-yam-interface/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

# Getting Started

## Requirements

### <a name="env">Environement</a>

To run the project you will need to set-up a `.env` file in the root folder:

```bash
# Required: Community API Key (for properties endpoint)
# Get it from: https://t.me/+XQyoaFfmN61yk7X0
COMMUNITY_API_KEY=XXXXXXXXXXXX

# Required: Environment (dev, staging, or production)
# Default: dev
NEXT_PUBLIC_ENV=development

# Required: API Gateway URL
NEXT_PUBLIC_API_URL=https://api.realtoken.network

# Authentication (Local development only - not needed in production)
# Option 1: Direct JWT token (recommended if you have one)
AUTH_TOKEN=your_jwt_token_here

# Option 2: Auto-login with credentials (will fetch JWT automatically)
AUTH_USER=your_email@example.com
AUTH_PASSWORD=your_password

# Note: In production, the server is authorized without login.
# These variables are only needed for local development.

# Optional: RPC URLs (defaults to public RPCs if not set)
# GNOSIS_RPC_URL=https://gnosis-rpc.publicnode.com
# ETHEREUM_RPC_URL=https://eth.llamarpc.com
# SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com

# Optional: Logging level (controls verbosity)
# Format: comma-separated list or single level (hierarchy mode)
# Examples: LOG_LEVEL=info,debug  or  LOG_LEVEL=debug
# Default: error + info only
# Available levels: error, warn, info, log, debug
LOG_LEVEL=info

# Optional: Other configuration
# NEXT_PUBLIC_SHOW_ALL_NETWORKS=false
# NEXT_PUBLIC_WALLET_CONNECT_KEY=your_wallet_connect_key
```

**Required variables:**

- `COMMUNITY_API_KEY`: Required for the `/api/properties` endpoint. Get it from the [telegram dev channel](https://t.me/+XQyoaFfmN61yk7X0).
- `NEXT_PUBLIC_ENV`: Used to hide/show features depending on the environment. Allowed values: `development`, `staging`, or `production`. Default: `development`.
- `NEXT_PUBLIC_API_URL`: URL of the API Gateway (e.g., `https://api.realtoken.network`).

**Authentication (Local development only):**

The authentication system works automatically on the server side:

1. **Priority 1**: If `AUTH_TOKEN` is set → uses the JWT token directly
2. **Priority 2**: If `AUTH_USER` and `AUTH_PASSWORD` are set → automatically logs in to get a JWT token
3. **Priority 3**: If neither is set → no token (works in production where server is authorized)

**Note**: In production, the server is authorized without login. These variables are only needed for local development when accessing protected endpoints.

**Optional variables:**

- `GNOSIS_RPC_URL`, `ETHEREUM_RPC_URL`, `SEPOLIA_RPC_URL`: RPC URLs for price fetching. If not set, public RPCs will be used by default.
- `LOG_LEVEL`: Controls logging verbosity. See [Logging System](#logging-system) section for details.
- Other `NEXT_PUBLIC_*` variables: See comments above for their usage.

### Node.js version

<strong>📣 Node.js needed version is `v18.12.1`</strong>

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/real-token/realtoken-yam-interface.git
   ```
2. Install NPM packages
   ```sh
   yarn
   ```
3. Create the env file (instructions [here](#env))
4. Start the application in dev mode
   ```sh
   yarn dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

# Contributing

The community is welcome to participate in the development of the YAM.

## Introduction

All commit's name must follows the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) convention.

<strong>⚠️ ALL PR need to be created from `staging` branch and should requested to be merge into `staging` branch. Otherwise PR will be refused.</strong>

## Create a PR (Pull request)

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Move to `staging` branch (`git checkout staging`)
3. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## Operation

If you want to improve the YAM there is few things you need to know.

### Technologies stack

#### [Node.js](https://nodejs.org/)

Node.js is a backend technology providing Javascript runtime environment outside server side.

#### [Nextjs](https://nextjs.org/)

Next.js is a framework used to create full-stack modern web application.

#### [React](https://reactjs.org/)

React is used to create dynamic interface.

#### [Typescript](https://www.typescriptlang.org/)

Typescript is a top-layer technology used to typed (add boolean, number etc...) types to javascript. It also significantly reduces errors during development.

#### [Mantine](https://mantine.dev/)

Mantine is the UI development kit we choosed to create the YAM interface.
We choose it because Mantine is under intensive developmenent and is opensource.
It also perfectly match with React, our front-end framework.

#### [web3-react](https://github.com/Uniswap/web3-react)

Web3-react is a typescript/javascript library used to connect YAM to blockchain through different wallet: Injected (Metamask, Frame, etc...), Coinbase, Wallet-connect, etc...

#### [React Query](https://tanstack.com/query/latest) (formerly react-query)

React Query is used for server state management, data fetching, caching, and synchronization.

- Automatic caching with configurable TTL per data type
- Parallel data loading with `useQueries`
- Background refetching and stale-while-revalidate pattern
- Optimistic updates support

See [Data Fetching & Caching](#data-fetching--caching) section for more information.

#### [Redux](https://redux.js.org)

Redux is a state manager used to store datas to store data accessible throughout the app.
</br>
See [state management](#state) for more informations.

#### [Jotai](https://jotai.org/)

Jotai is a small state manager.
</br>
See [state management](#state) for more informations.

#### [Eslint](https://eslint.org/) and [Prettier](https://github.com/prettier/prettier)

EsLint and Prettier are too software used to check and clean code, and check for synthax errors into the code.

#### [dotenv](https://www.npmjs.com/package/dotenv)

DotEnv is a library used to read environement variable from `.env` file.

### <a name="state">State management</a>

Three state managers are working together inside YAM app: [React Query](https://tanstack.com/query/latest), [Redux](https://redux.js.org/), and [Jotai](https://jotai.org/).

**React Query** (Server State):

- Manages server-side data (offers, properties, prices, balances)
- Handles caching, refetching, and synchronization
- Optimized parallel loading with `useQueries`
- See [Data Fetching & Caching](#data-fetching--caching) for details

**Redux** (Client State):

- Stores heavy client-side data (offers, properties, etc.)
- Global application state
- You can visualize the redux store with the [redux dev tool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

**Jotai** (Small State):

- Used to store data in cookies
- Small state shared between 1-2 components (not the whole application)

### Add a new display

At the moment only two displays are available: Table and Grid. But as a community driven projet you are encouraged to add new ones.
</br>
</br>
If you want to one more you will need:

1. Modify the enum file `src/types/Displays.ts`, to add a new display declaration.
2. Goto `src/components/Display/Display.tsx` file:
3. Add your brand new display in `availableDisplays` Map.
   ````ts
    const availableDisplays = useMemo(() => {
      return new Map<Displays,Display>([
        [Displays.TABLE, {
          display: Displays.TABLE,                // This is the enum key you created before
        title: "Table",                           // This is your display's name
          component: <MarketTable key={"table"}/> // This is your display's component
        }]
      ]);
    },[])```
   ````

Then everything is ready to works !

### <a name="data-fetching--caching">Data Fetching & Caching</a>

The application uses **React Query** (v3) for efficient data fetching and caching.

#### Architecture

- **Parallel Loading**: Uses `useQueries` to load prerequisites (properties, prices, wlProperties) in parallel
- **Adaptive TTL**: Different cache durations based on data type:
  - Properties: 24h staleTime, 7 days cacheTime
  - Prices: 1h staleTime, 24h cacheTime
  - WlProperties: 12h staleTime, 7 days cacheTime
  - Offers: Infinite staleTime (updated via blockchain events), 5min refetch interval

#### Key Hooks

- `useOffers()`: Main hook for loading offers with optimized parallel prerequisites
- `useOfferById()`: Load a specific offer by ID via RPC (works even if TheGraph is down)
- `useOfferDataForModal()`: Optimized hook for modals with user data (balance, allowance)
- `useProperties()`, `usePrices()`, `useWlProperties()`: Individual hooks for prerequisites

#### RPC Direct (Fallback)

For critical operations, the app uses direct RPC calls with **Multicall3**:

- Faster than TheGraph for single offer queries
- Works even if TheGraph is down
- Used in modals and offer detail pages

See `BILAN_PHASE_0.md` for more details on performance optimizations.

### <a name="logging-system">Logging System</a>

The application uses a configurable logging system with environment-based level control.

#### Configuration

Control logging verbosity via the `LOG_LEVEL` environment variable:

**Format 1: Precise Selection (Recommended)**

```bash
# Show only error (always) + info
LOG_LEVEL=info

# Show error (always) + debug (without info or log)
LOG_LEVEL=debug

# Show error (always) + info + debug (without log)
LOG_LEVEL=info,debug

# Show all levels
LOG_LEVEL=info,log,debug
```

**Format 2: Hierarchy Mode (Compatibility)**

```bash
# Shows error (always) + info + log
LOG_LEVEL=log

# Shows all levels (error + info + log + debug)
LOG_LEVEL=debug
```

**Default**: If `LOG_LEVEL` is not set, only `error` and `info` are shown.

#### Available Levels

1. **`error`**: Critical errors (always displayed, even if not specified)
2. **`warn`**: Warnings (displayed by default)
3. **`info`**: Important information (displayed by default)
4. **`log`**: General logs (requires `LOG_LEVEL=log` or higher)
5. **`debug`**: Detailed debug logs (requires `LOG_LEVEL=debug`)

#### Usage

```typescript
// Default logger (no prefix)
import { logger } from '@/utils/logger';
// Logger with prefix (recommended for modules)
import { createLogger } from '@/utils/logger';

logger.info('Message');
logger.error('Error message');

const apiLogger = createLogger('API');
apiLogger.info('Request received'); // [INFO][API] Request received
apiLogger.debug('Debug details'); // Only shown if LOG_LEVEL includes debug
```

See `src/utils/logger.README.md` for complete documentation.

### <a name="authentication-system">Authentication System</a>

The authentication system handles API authentication automatically on the server side.

#### How It Works

**Local Development:**

1. If `AUTH_TOKEN` is set → uses the JWT token directly
2. If `AUTH_USER` and `AUTH_PASSWORD` are set → automatically logs in to get a JWT token
3. Token is automatically refreshed if expired (for auto-login tokens)

**Production:**

- Server is authorized without login
- No authentication variables needed

#### Implementation Details

- Authentication happens **server-side only** (never exposed to client)
- Token is automatically added to API requests via Apollo Client authLink
- Token refresh is handled automatically for auto-login tokens
- Direct tokens (`AUTH_TOKEN`) cannot be refreshed (must be manually updated)

#### GraphQL Endpoint

All GraphQL queries go through `/api/graphql` which:

- Handles authentication automatically
- Compresses responses with gzip (reduces size, avoids 4MB limit)
- Routes to API Gateway which forwards to TheGraph if needed
- Returns proper error codes (401 for auth errors)

See `src/utils/auth/authService.ts` for implementation details.

### <a name="recent-optimizations-phase-0">Recent Optimizations (Phase 0)</a>

The following optimizations were completed:

- ✅ **RPC Direct with Multicall3**: Single offer queries via RPC (faster, works offline)
- ✅ **Optimized Parallel Loading**: `useQueries` for better control of prerequisite loading
- ✅ **Adaptive Caching**: TTL configured per data type for optimal performance
- ✅ **Modal Optimization**: Dedicated `useOfferDataForModal` hook for modals
- ✅ **IndexedDB Cache**: Persistent client-side cache for offline support
- ✅ **Mode Dégradé**: Application works even if TheGraph is down

**Performance Improvements:**

- Initial load time reduced from ~5-10s to ~1-2s (with cache)
- RPC calls reduced from N calls to 1 call (Multicall3)
- Network requests reduced thanks to React Query caching

See `BILAN_PHASE_0.md` for complete details.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

# License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

# Contact

- Support - [@RealTPlatform](https://twitter.com/RealTPlatform) - support@realt.co
- Testnet version: [YAM testnet channel](https://t.me/+ENPNiuYajY00ZjQ0)

Project Link: [https://github.com/real-token/realtoken-yam-interface](https://github.com/real-token/realtoken-yam-interface)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/real-token/realtoken-yam-interface.svg?style=for-the-badge
[contributors-url]: https://github.com/real-token/realtoken-yam-interface/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/real-token/realtoken-yam-interface.svg?style=for-the-badge
[forks-url]: https://github.com/real-token/realtoken-yam-interface/network/members
[stars-shield]: https://img.shields.io/github/stars/real-token/realtoken-yam-interface.svg?style=for-the-badge
[stars-url]: https://github.com/real-token/realtoken-yam-interface/stargazers
[issues-shield]: https://img.shields.io/github/issues/real-token/realtoken-yam-interface.svg?style=for-the-badge
[issues-url]: https://github.com/real-token/realtoken-yam-interface/issues
[license-shield]: https://img.shields.io/github/license/real-token/realtoken-yam-interface.svg?style=for-the-badge
[license-url]: https://github.com/real-token/realtoken-yam-interface/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/realtplatform/
[product-screenshot]: images/screenshot.png
[use-template]: images/delete_me.png
[use-url]: https://github.com/real-token/realtoken-yam-interface/generate
