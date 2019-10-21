import jsPDF from "jspdf";
import canvg from "canvg";
import ReactDOMServer from "react-dom/server";
import QRCode from "qrcode.react";
import React from "react";
import Storage from "@aws-amplify/storage";
import * as Sentry from "@sentry/browser";
export default async function QslCardPrint(props) {
  const pdf = new jsPDF("l", "in");

  /* Card Frame Begin*/
  pdf.setDrawColor(0);
  pdf.setFillColor(255, 255, 255);
  pdf.setLineWidth(0.01);
  pdf.roundedRect(2.2, 2.2, 5.1, 3.1, 0.1, 0.1, "FD");
  /* Card Frame End*/

  /* QR CODE Begin*/
  var svg = ReactDOMServer.renderToStaticMarkup(
    <QRCode renderAs="svg" value={props.guid} />
  );
  svg = svg.replace(/\r?\n|\r/g, "").trim();
  var canvas = document.createElement("canvas");
  canvg(canvas, svg);
  var imgData = canvas.toDataURL("image/png");
  pdf.addImage(imgData, "PNG", 6.4, 2.3, 0.5, 0.5);
  pdf.setFontSize(6);
  pdf.text(6.2, 2.9, "Scan with SuperQSO App");

  /* QR CODE End*/

  /*QRA OWNER Image Begin*/
  imgData = await getImage(props.qso.profilepic, true);

  pdf.addImage(imgData, "JPEG", 2.4, 2.3, 0.4, 0.4);
  /* QRA Image End*/

  /* QRA TEXT */
  pdf.setFontSize(40);
  pdf.text(2.9, 2.7, props.qso.qra);
  /* QRA END */

  /* QSO HEADER DATA Begin */

  var date = new Date(props.qso.datetime);

  pdf.setFontSize(7);
  pdf.text(5.3, 2.4, "Type: " + props.qso.type);
  pdf.text(5.3, 2.5, "Mode: " + props.qso.mode);
  pdf.text(5.3, 2.6, "Band: " + props.qso.band);
  pdf.text(
    5.3,
    2.7,
    "Date: " +
      date.toLocaleDateString("EN-US", { month: "short" }) +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear()
  );
  pdf.text(
    5.3,
    2.8,
    "QTR (UTC): " + date.getUTCHours() + ":" + date.getMinutes()
  );
  /* QRA Header Data End */

  /* QRA TEXT */

  var text;
  switch (props.qso.type) {
    case "QSO":
      text = "Worked a QSO with ";
      break;
    case "LISTEN":
      text = "Listened a QSO with";
      break;
    default:
      return null;
  }
  pdf.setFontSize(15);
  pdf.text(2.9, 3, text);
  /* QRA END */

  /*QSO QRA  Image Begin*/
  pdf.setDrawColor(0);
  pdf.setFillColor(255, 255, 255);
  pdf.setLineWidth(0.01);
  pdf.roundedRect(2.9, 3.1, 2.6, 0.7, 0.1, 0.1, "FD");

  /*QSO LOGO */
  imgData.src = "/logoMobile.jpg";
  pdf.addImage(imgData, "JPEG", 5.8, 3.1, 1.09, 0.7, "logo", "FAST");

  if (props.qso.qras[0]) {
    imgData = await getImage(props.qso.qras[0].profilepic);
    pdf.addImage(imgData, "JPEG", 3, 3.2, 0.4, 0.4);
    /* QSO QRA TEXT */
    pdf.setFontSize(7);
    pdf.text(3, 3.7, props.qso.qras[0].qra);
    /* QSO QRA END */
  }
  if (props.qso.qras[1]) {
    imgData = await getImage(props.qso.qras[1].profilepic);
    pdf.addImage(imgData, "JPEG", 3.5, 3.2, 0.4, 0.4);
    /* QSO QRA TEXT */
    pdf.setFontSize(7);
    pdf.text(3.5, 3.7, props.qso.qras[1].qra);
    /* QSO QRA END */
  }
  if (props.qso.qras[2]) {
    imgData = await getImage(props.qso.qras[2].profilepic);
    pdf.addImage(imgData, "JPEG", 4, 3.2, 0.4, 0.4);
    /* QSO QRA TEXT */
    pdf.setFontSize(7);
    pdf.text(4, 3.7, props.qso.qras[2].qra);
    /* QSO QRA END */
  }
  if (props.qso.qras[3]) {
    imgData = await getImage(props.qso.qras[3].profilepic);
    pdf.addImage(imgData, "JPEG", 4.5, 3.2, 0.4, 0.4);
    /* QSO QRA TEXT */
    pdf.setFontSize(7);
    pdf.text(4.5, 3.7, props.qso.qras[3].qra);
    /* QSO QRA END */
  }
  if (props.qso.qras[4]) {
    imgData = await getImage(props.qso.qras[4].profilepic);
    pdf.addImage(imgData, "JPEG", 5, 3.2, 0.4, 0.4);
    /* QSO QRA TEXT */
    pdf.setFontSize(7);
    pdf.text(5, 3.7, props.qso.qras[4].qra);
    /* QSO QRA END */
  }
  // /* QRA Image End*/

  /*QSO Media Pic 1 Image Begin*/
  await showImages(props.qso.media, pdf);

  /* QRA Image End*/

  var blob = pdf.output("blob");
  window.open(URL.createObjectURL(blob));
  // Print pdf.save('QSLCard.pdf');
}
async function showImages(media, pdf) {
  let picList = media.filter(media => media.type === "image");

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

    imgData = await getImage(picList[i].url, true);
    pdf.addImage(imgData, "JPEG", tot_width, 4, picWidth, picHeight);
    tot_width = tot_width + 0.1 + picWidth;
  }
}

async function getImage(url, own_profile) {
  var img;
  var pathname = new URL(url).pathname;
  pathname = url.split("/");

  var file =
    pathname[pathname.length - 2] + "/" + pathname[pathname.length - 1];

  return new Promise(function(resolve, reject) {
    if (own_profile) {
      Storage.get(file, {
        level: pathname[3],
        identityId: decodeURIComponent(pathname[4])
      })
        .then(result => {
          img = new Image();
          img.src = result;
          img.crossOrigin = "Anonymous";
          img.onload = function() {
            resolve(img);
          };
        })
        .catch(error => {
          if (process.env.NODE_ENV !== "production") {
            console.log(error);
          } else Sentry.captureException(error);
        });
    } else {
      Storage.get(file, {
        level: pathname[3],
        identityId: decodeURIComponent(pathname[4])
      })
        .then(result => {
          img = new Image();
          img.src = result;
          img.crossOrigin = "Anonymous";
          img.onload = function() {
            resolve(img);
          };
        })
        .catch(error => {
          if (process.env.NODE_ENV !== "production") {
            console.log(error);
          } else Sentry.captureException(error);
        });
    }
  });
}
