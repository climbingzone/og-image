import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  'base64'
);
function getCss(background: string, fontSize: string) {
  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
        background: ${background};
        height: 100vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    * {
        margin: 0;
        padding: 0;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .text {
        color: white;
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        overflow: hidden;
        line-height: 1.3;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    .container {
        height: 100vh;
        width: 100vh;
        padding: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .logo {
        margin-bottom: 50px;
    }

    .subTitleContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .subTitle {
        color: white;
        margin-top: 50px;
        margin-bottom: 50px;
        -webkit-line-clamp: 1; /* number of lines to show */
    }

    .pill {
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        font-weight: bold;
        color: black;
        overflow: hidden;
        line-height: 1.3;
        text-overflow: ellipsis;
        border-radius: 100px;
        padding-left: 50px;
        padding-right: 50px;
        margin-right: 50px;
        display: inline;
        background-color: white;
        mix-blend-mode: screen;
    }

    .spacer {
        height: 50px;
    }

    /* MARKDOWN RESET */
    .text * {
        margin: 0 !important;
        padding: 0 !important;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { title, subTitle, md, fontSize, gradeColor, pillText, images } =
    parsedReq;
  const hasText = Boolean(title || subTitle || pillText);

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(gradeColor, fontSize)}
    </style>
    <body style="border-color: ${sanitizeHtml(gradeColor)};${
    images[0]
      ? ` background-image: url(${sanitizeHtml(
          images[0]
        )}); background-repeat: no-repeat; background-size: cover; background-position: center`
      : ''
  }">
    <div class="container">
            <svg class="logo" width="400px" height="400px" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="App/logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect id="Mask" fill-opacity="0" fill="#0000" x="0" y="0" width="72" height="72" rx="20"></rect>
                    <g id="Icon" fill="#fff"} transform="translate(0.000000, 1.000000)">
                        <path d="M29.479325,0.0499344429 C49.547339,1.10751823 54.8308423,5.41304055 62.2890965,13.7948139 C69.7473507,22.1765873 76.5552797,48.6797705 68.0687726,58.2817577 C60.5080492,66.8362747 29.479325,74.9487226 15.4442966,62.9216109 C8.31936473,56.816005 2.29754991,50.4457173 0.535369796,38.5860018 C-2.51278074,18.0715279 7.49761961,-1.10850083 29.479325,0.0499344429 Z M35.9427733,13.8099346 C33.1718867,13.7852812 30.5423494,13.8064431 28.5224225,13.8741904 C27.3646503,13.9130214 26.3972491,13.9668491 25.6105125,14.0419207 C25.0607569,14.0943793 24.5715338,14.1586048 24.08686,14.252758 C22.3155971,14.5968452 21.2373482,14.9584973 19.6247177,16.4874733 C18.6966073,17.3674384 18.1942148,18.1513501 17.7267111,19.0925229 C17.5200938,19.5084826 17.3422776,19.9290722 17.1701987,20.3851197 C16.9235548,21.038781 16.6773671,21.8004296 16.4234863,22.6735999 C15.9741711,24.2189266 15.4957241,26.1384251 15.0752847,28.0746339 C14.6265521,30.141139 14.2647285,32.1260084 14.0467415,33.782878 C13.9132689,34.7973734 13.8301562,35.707341 13.806814,36.5377099 C13.790885,37.1043647 13.8018362,37.6463375 13.8507891,38.1915915 C13.9333736,39.1114448 14.1092629,39.994257 14.4934724,40.9601271 C15.4890066,43.4628149 17.7464716,46.616923 20.6608201,50.0390507 C21.8752048,51.4650228 23.108191,52.8076028 24.1994311,53.884764 C24.828868,54.5060801 25.4200544,55.048856 25.9840042,55.513049 C26.9512036,56.309161 27.8267906,56.9009737 29.0096524,57.3775238 C29.962827,57.7615378 30.8091463,57.9414613 31.7568326,58.0579863 C32.3101339,58.1260187 32.8919459,58.1662406 33.5111139,58.1859002 C34.541556,58.2186184 35.7063514,58.1936235 36.8451497,58.1189467 C38.0659452,58.0388929 39.2254816,57.9051892 40.2284592,57.7121657 C40.9866696,57.5662477 41.683215,57.3854835 42.3930046,57.1164984 C43.0322157,56.8742601 43.6511015,56.5742102 44.294157,56.1457132 C45.615113,55.2655005 46.7513862,54.0685555 47.4882121,52.2500258 C47.5799594,52.023588 48.1619367,50.7987763 48.9466281,49.2081584 C49.8228279,47.432047 50.8976827,45.3014008 51.952629,43.252497 C53.1128671,40.9990971 54.1876113,38.9631245 55.0426142,37.4049796 C55.4891878,36.5911502 55.8659975,35.9256798 56.1539699,35.4416495 C56.2688939,35.2484826 56.3629,35.0956773 56.4295306,34.9920744 C57.5114142,33.5951513 57.9717555,32.1821836 58.1382909,30.7423849 C58.2219072,30.0194708 58.2143009,29.3679089 58.1528353,28.7194274 C58.0829857,27.982493 57.9439218,27.2796678 57.7487832,26.5313044 C57.4810919,25.5046992 57.0879176,24.3435735 56.6250531,23.1666053 C56.18044,22.0360466 55.6852527,20.9277629 55.20281,20.0030793 C54.882453,19.3890606 54.5592291,18.8354596 54.1975197,18.3128 C53.9035159,17.8879731 53.5870423,17.4857023 53.2032935,17.0807063 C52.3973817,16.2301729 51.4799977,15.5168137 50.1264759,14.9715082 C49.2911076,14.6349559 48.6284956,14.4852545 47.8141019,14.3586278 C47.4013343,14.2944483 46.9560611,14.2421709 46.4562489,14.1954996 C45.6456432,14.119807 44.6480729,14.0556419 43.4791589,14.0008896 C41.3534841,13.9013224 38.6666124,13.8341694 35.9427733,13.8099346 Z M34.4021297,22.125904 C39.952279,22.1414579 46.1509422,22.3567012 46.9864619,22.692735 C47.7454406,22.997985 50.3256832,29.3849946 49.8065651,30.0140393 C49.0653045,30.9122664 46.7055063,35.3043984 44.4565548,39.6707132 L44.0365976,40.4882353 C42.0171642,44.4298235 40.1775383,48.1695388 39.8048888,49.0876761 C39.5207983,49.7876209 33.3075218,50.1305444 32.123456,49.6543305 C30.4537029,48.9827803 23.428048,40.902004 22.2351719,37.9083787 C21.5178802,36.1082734 24.5051721,23.3535888 25.3653337,22.5394519 C25.6566467,22.2637262 29.1025334,22.1369399 33.1668259,22.1258074 Z" id="Combined-Shape"></path>
                    </g>
                </g>
            </svg>
            ${
              title
                ? `<div class="text">${emojify(
                    md ? marked(title) : sanitizeHtml(title)
                  )}</div>`
                : ''
            }
            ${
              pillText || subTitle
                ? `<div class="subTitleContainer">
                ${
                  pillText
                    ? `<div class="pill">${sanitizeHtml(pillText)}</div>`
                    : ''
                }
                <div class="text subTitle">
                    ${emojify(md ? marked(subTitle) : sanitizeHtml(subTitle))}
                </div>
            </div>`
                : ''
            }
            ${hasText ? '<div class="spacer" />' : ''}
        </div>
    </body>
</html>`;
}
