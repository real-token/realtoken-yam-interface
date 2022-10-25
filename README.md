<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[![Lint](https://github.com/real-token/realtoken-yam-interface/actions/workflows/lint.yml/badge.svg)](https://github.com/real-token/realtoken-yam-interface/actions/workflows/lint.yml)
[![Build pass](https://github.com/real-token/realtoken-yam-interface/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/real-token/realtoken-yam-interface/actions/workflows/node.js.yml)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

<!-- PROJECT LOGO -->
<br />
<div align="center" id="about-the-project">
  <a href="https://github.com/real-token/realtoken-yam-interface">
    <img src="images/logo.svg" alt="Logo" width="80" height="80">
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
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#built-with-hardhat">Built With Hardhat</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/real-token/realtoken-yam-interface.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Setup a `.env` file, with the following config

   > CoinMarketCap API Key [here](https://coinmarketcap.com/api/pricing/)

   > Infura API Key [here](https://infura.io/pricing)

   > Etherscan API Key [here](https://etherscan.io/apis)

   > Check [.env.example](.env.example)

4. Check available command

   ```
   npx hardhat --help
   ```

   > Hardhat Getting Started [here](https://hardhat.org/getting-started#running-tasks)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

> Have fun

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- AUDIT -->

## Audit

Auditing the solidity code in an important aspect of this language, we need to be confident with the code we ship to the customer to avoid malicious attacks

A lot of the auditing have been done during the contract construction using the `Solidity static analysis framework` [**Slither**](https://github.com/crytic/slither)

You can download Slither and use the following command to _audit_ the code

```sh
slither .
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- YAM interface with basic functionnalities ✅
- Add whitelisting token functionnalities ✅
- Testing ✅
- Slither analysis ✅
- Support for Hardware Wallet ❌

See the [open issues](https://github.com/real-token/realtoken-yam-interface/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- COVERAGE -->

## Coverage

```
npx hardhat coverage
```

<img src="images/coverage.png" alt="Coverage">

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GAS FEES -->

## Gas fees

```
npx hardhat test
```

<img src="images/gas.png" alt="Coverage">

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

<!-- CONTRIBUTING -->

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Support - [@RealTPlatform](https://twitter.com/RealTPlatform) - support@realt.co

Project Link: [https://github.com/real-token/realtoken-yam-interface](https://github.com/real-token/realtoken-yam-interface)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- BUILD WITH HARDHAT -->

## Built With Hardhat

- [Eslint](https://eslint.org/)
- [Chai](https://www.chaijs.com/guide/)
- [Solhint](https://github.com/protofire/solhint)
- [Prettier](https://github.com/prettier/prettier)
- [solidity-coverage](https://github.com/sc-forks/solidity-coverage)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Waffle](https://getwaffle.io/)
- [Typescript](https://www.typescriptlang.org/)

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
