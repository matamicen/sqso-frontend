import * as Sentry from '@sentry/browser';
import canvg from 'canvg';
import QRCode from 'qrcode.react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { withTranslation } from 'react-i18next';
import packageJson from '../../../package.json';
const RELEASE = packageJson.version;
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://2f1b1ed20458466ab2c6c66716678605@sentry.io/1441458',
    release: RELEASE,
    environment: process.env.NODE_ENV,
    beforeSend(event, hint) {
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
    }
  });
}
 async function QslCardPrint(props) {
  const {t} = props;
  try {
    const jsPDF = require('jspdf');
    const pdf = new jsPDF('l', 'in');
    const emptyProfile = '/emptyprofile.png';
    /* Card Frame Begin*/
    pdf.setDrawColor(0);
    pdf.setFillColor(255, 255, 255);
    pdf.setLineWidth(0.01);
    pdf.roundedRect(2.2, 2.2, 5.1, 3.1, 0.1, 0.1, 'FD');
    /* Card Frame End*/

    /* QR CODE Begin*/
    var svg = ReactDOMServer.renderToStaticMarkup(
      <QRCode renderAs="svg" value={props.guid} />
    );
    svg = svg.replace(/\r?\n|\r/g, '').trim();
    var canvas = document.createElement('canvas');
    canvg(canvas, svg);
    var imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 6.4, 2.3, 0.5, 0.5);
    pdf.setFontSize(6);
    pdf.text(6.2, 2.9, 'Scan with SuperQSO App');

    /* QR CODE End*/

    /*QRA OWNER Image Begin*/
    if (props.qso.profilepic) imgData = await loadImage(props.qso.profilepic);
    else imgData = await loadImage(emptyProfile);

    pdf.addImage(imgData, 'JPEG', 2.4, 2.3, 0.4, 0.4);
    /* QRA Image End*/

    /* QRA TEXT */
    pdf.setFontSize(20);
    pdf.text(2.9, 2.7, props.qso.qra);
    /* QRA END */

    /* QSO HEADER DATA Begin */

    var date = new Date(props.qso.datetime);

    pdf.setFontSize(7);
    pdf.text(5.3, 2.4, 'Type: ' + props.qso.type);
    if (props.qso.type !== 'POST') {
      pdf.text(5.3, 2.5, 'Mode: ' + props.qso.mode);
      pdf.text(5.3, 2.6, 'Band: ' + props.qso.band);
      if (props.qso.db)
        pdf.text(5.3, 2.7, 'dB: ' + (props.qso.db ? props.qso.db : '59'));
      else pdf.text(5.3, 2.7, 'RST: ' + (props.qso.rst ? props.qso.rst : '59'));
    }
    pdf.text(
      'Date: ' +
        date.toLocaleDateString('EN-US', { month: 'short' }) +
        ' ' +
        date.getDate() +
        ', ' +
        date.getFullYear(),
      5.3,
      2.8
    );
    var text =
      'UTC: ' +
      date.getUTCHours() +
      ':' +
      (date.getMinutes() < 10 ? '0' : '') +
      date.getMinutes();
    pdf.text(text, 5.3, 2.9);
    /* QRA Header Data End */

    /* QRA TEXT */

    switch (props.qso.type) {
      case 'QSO':
        text = 'Worked a QSO with ';
        break;
      case 'LISTEN':
        text = 'Listened a QSO with';
        break;
      case 'POST':
        if (props.qso.qras.length > 0) text = 'Created a POST with';
        else text = 'Created a POST';
        break;
      default:
        break;
    }
    pdf.setFontSize(15);
    pdf.text(text, 2.9, 3);
    /* QRA END */

    /*QSO QRA  Image Begin*/
    if (props.qso.qras.length > 0) {
      pdf.setDrawColor(0);
      pdf.setFillColor(255, 255, 255);
      pdf.setLineWidth(0.01);
      pdf.roundedRect(2.9, 3.1, 2.6, 0.7, 0.1, 0.1, 'FD');
    }
    /*QSO LOGO */
    imgData = await loadImage('/logoMobile.jpg');
    pdf.addImage(imgData, 'JPEG', 5.8, 3.1, 1.09, 0.7, 'logo', 'FAST');

    if (props.qso.qras[0]) {
      if (props.qso.qras[0].profilepic)
        imgData = await loadImage(props.qso.qras[0].profilepic);
      else imgData = await loadImage(emptyProfile);

      pdf.addImage(imgData, 'JPEG', 3, 3.2, 0.4, 0.4);
      /* QSO QRA TEXT */
      pdf.setFontSize(7);
      pdf.text(3, 3.7, props.qso.qras[0].qra);
      /* QSO QRA END */
    }
    if (props.qso.qras[1]) {
      if (props.qso.qras[1].profilepic)
        imgData = await loadImage(props.qso.qras[1].profilepic);
      else imgData.src = emptyProfile;
      pdf.addImage(imgData, 'JPEG', 3.5, 3.2, 0.4, 0.4);
      /* QSO QRA TEXT */
      pdf.setFontSize(7);
      pdf.text(3.5, 3.7, props.qso.qras[1].qra);
      /* QSO QRA END */
    }
    if (props.qso.qras[2]) {
      if (props.qso.qras[2].profilepic)
        imgData = await loadImage(props.qso.qras[2].profilepic);
      else imgData.src = emptyProfile;
      pdf.addImage(imgData, 'JPEG', 4, 3.2, 0.4, 0.4);
      /* QSO QRA TEXT */
      pdf.setFontSize(7);
      pdf.text(4, 3.7, props.qso.qras[2].qra);
      /* QSO QRA END */
    }
    if (props.qso.qras[3]) {
      if (props.qso.qras[3].profilepic)
        imgData = await loadImage(props.qso.qras[3].profilepic);
      else imgData.src = emptyProfile;
      pdf.addImage(imgData, 'JPEG', 4.5, 3.2, 0.4, 0.4);
      /* QSO QRA TEXT */
      pdf.setFontSize(7);
      pdf.text(4.5, 3.7, props.qso.qras[3].qra);
      /* QSO QRA END */
    }
    if (props.qso.qras[4]) {
      if (props.qso.qras[4].profilepic)
        imgData = await loadImage(props.qso.qras[4].profilepic);
      else imgData.src = emptyProfile;
      pdf.addImage(imgData, 'JPEG', 5, 3.2, 0.4, 0.4);
      /* QSO QRA TEXT */
      pdf.setFontSize(7);
      pdf.text(5, 3.7, props.qso.qras[4].qra);
      /* QSO QRA END */
    }
    // /* QRA Image End*/

    /*QSO Media Pic 1 Image Begin*/
    await showImages(props.qso.media, pdf);

    /* QRA Image End*/

    var blob = pdf.output('blob');
    window.open(URL.createObjectURL(blob));
    // Print pdf.save('QSLCard.pdf');
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(e);
    } else Sentry.captureException(e);
  }
}

async function showImages(media, pdf) {
  let picList = media.filter(media => media.type === 'image');

  let imgData;
  let tot_width = 2.4;
  let picWidthEnd = 0;
  let picHeight = 1.1;

  for (let i = 0; i < picList.length; i++) {
    let ratio = (picHeight * 105) / picList[i].height;

    let picWidth = (picList[i].width * ratio) / 105;

    picWidthEnd = tot_width + 0.1 + picWidth;

    if (picWidthEnd >= 7.2) {
      break;
    }
    imgData = await loadImage(picList[i].url);

    pdf.addImage(imgData, 'JPEG', tot_width, 4, picWidth, picHeight);
    tot_width = tot_width + 0.1 + picWidth;
  }
}
async function loadImage(url) {
  return new Promise(resolve => {
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.setAttribute('crossorigin', 'anonymous');
    img.src = url + '?nocache=true';
  });
}
// async function getImage(url, own_profile) {
//   var img;
//   var pathname = new URL(url).pathname;
//   pathname = url.split('/');

//   var file =
//     pathname[pathname.length - 2] + '/' + pathname[pathname.length - 1];

//   return new Promise(function(resolve, reject) {
//     if (own_profile) {
//       Storage.get(file, {
//         level: pathname[3],
//         identityId: decodeURIComponent(pathname[4])
//       })
//         .then(result => {
//           img = new Image();
//           img.src = result;
//           img.crossOrigin = 'Anonymous';
//           img.onload = function() {
//             resolve(img);
//           };
//         })
//         .catch(error => {
//           if (process.env.NODE_ENV !== 'production') {
//             console.log(error);
//           } else { Sentry.configureScope(function (scope) {
//     scope.setExtra("ENV", process.env.NODE_ENV);
//   });
// Sentry.captureException(error);
// }
//         });
//     } else {
//       Storage.get(file, {
//         level: pathname[3],
//         identityId: decodeURIComponent(pathname[4])
//       })
//         .then(result => {
//           img = new Image();
//           img.src = result;
//           img.crossOrigin = 'Anonymous';
//           img.onload = function() {
//             resolve(img);
//           };
//         })
//         .catch(error => {
//           if (process.env.NODE_ENV !== 'production') {
//             console.log(error);
//           } else { Sentry.configureScope(function (scope) {
//     scope.setExtra("ENV", process.env.NODE_ENV);
//   });
// Sentry.captureException(error);
// }
//         });
//     }
//   });
// }
export default withTranslation()(QslCardPrint)