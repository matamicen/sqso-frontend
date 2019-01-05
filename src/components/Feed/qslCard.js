import jsPDF from 'jspdf';
import canvg from 'canvg'
import ReactDOMServer from "react-dom/server"
import QRCode from "qrcode.react";
import React from "react";
import Storage from '@aws-amplify/storage';

export default async function QslCardPrint(props) {

    const pdf = new jsPDF('l', 'in', [5.5, 3.5]);
    /* Card Frame Begin*/
    pdf.setDrawColor(0)
    pdf.setFillColor(255, 255, 255)
    pdf.setLineWidth(0.01)
    pdf.roundedRect(0.2, 0.2, 5.1, 3.1, 0.1, 0.1, 'FD')
    /* Card Frame End*/

    /* QR CODE Begin*/
    var svg = ReactDOMServer.renderToStaticMarkup(<QRCode renderAs='svg' value={props.guid}/>);
    svg = svg
        .replace(/\r?\n|\r/g, '')
        .trim();
    var canvas = document.createElement('canvas');
    canvg(canvas, svg);
    var imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 4.4, 0.3, 0.5, 0.5);
    pdf.setFontSize(6);
    pdf.text(4.2, 0.9, 'Scan with SuperQSO App');
    
    /* QR CODE End*/

    /*QRA OWNER Image Begin*/
    imgData = await getImage(props.qso.profilepic, true)

    await pdf.addImage(imgData, 'JPEG', 0.4, 0.3, 0.4, 0.4);
    /* QRA Image End*/

    /* QRA TEXT */
    pdf.setFontSize(40)
    pdf.text(0.9, 0.7, props.qso.qra);
    /* QRA END */

    /* QSO HEADER DATA Begin */
    
    var date = new Date(props.qso.datetime);
    
    pdf.setFontSize(7)
    pdf.text(3.3, 0.4, "Type: " + props.qso.type);
    pdf.text(3.3, 0.5, "Mode: " + props.qso.mode);
    pdf.text(3.3, 0.6, "Band: " + props.qso.band);
    pdf.text(3.3, 0.7, "Date: " + date.toLocaleDateString("EN-US",{month:"short"}) + ' ' + date.getDate() + ', ' + date.getFullYear());
    pdf.text(3.3, 0.8, "QTR (UTC): " + date.getUTCHours() + ':' + date.getMinutes());
    /* QRA Header Data End */

    /* QRA TEXT */

    var text;
    switch (props.qso.type) {
        case "QSO":
            text = 'Worked a QSO with ';
            break;
        case "LISTEN":
            text = 'Listened a QSO with';
            break;
        default:
            return null;
    }
    pdf.setFontSize(15);
    pdf.text(0.9, 1, text);
    /* QRA END */

    /*QSO QRA  Image Begin*/
    pdf.setDrawColor(0)
    pdf.setFillColor(255, 255, 255)
    pdf.setLineWidth(0.01)
    pdf.roundedRect(0.9, 1.1, 2.6, 0.7, 0.1, 0.1, 'FD')

    if (props.qso.qras[0]) {

        imgData = await getImage(props.qso.qras[0].profilepic)
        await pdf.addImage(imgData, 'JPEG', 1, 1.2, 0.4, 0.4);
        /* QSO QRA TEXT */
        pdf.setFontSize(7)
        pdf.text(1, 1.7, props.qso.qras[0].qra);
        /* QSO QRA END */
    }
    if (props.qso.qras[1]) {

        imgData = await getImage(props.qso.qras[1].profilepic)
        await pdf.addImage(imgData, 'JPEG', 1.5, 1.2, 0.4, 0.4);
        /* QSO QRA TEXT */
        pdf.setFontSize(7)
        pdf.text(1.5, 1.7, props.qso.qras[1].qra);
        /* QSO QRA END */
    }
    if (props.qso.qras[2]) {

        imgData = await getImage(props.qso.qras[2].profilepic)
        await pdf.addImage(imgData, 'JPEG', 2, 1.2, 0.4, 0.4);
        /* QSO QRA TEXT */
        pdf.setFontSize(7)
        pdf.text(2, 1.7, props.qso.qras[2].qra);
        /* QSO QRA END */
    }
    if (props.qso.qras[3]) {

        imgData = await getImage(props.qso.qras[3].profilepic)
        await pdf.addImage(imgData, 'JPEG', 2.5, 1.2, 0.4, 0.4);
        /* QSO QRA TEXT */
        pdf.setFontSize(7)
        pdf.text(2.5, 1.7, props.qso.qras[3].qra);
        /* QSO QRA END */
    }
    if (props.qso.qras[4]) {

        imgData = await getImage(props.qso.qras[4].profilepic)
        await pdf.addImage(imgData, 'JPEG', 3, 1.2, 0.4, 0.4);
        /* QSO QRA TEXT */
        pdf.setFontSize(7)
        pdf.text(3, 1.7, props.qso.qras[4].qra);
        /* QSO QRA END */
    }
    // /* QRA Image End*/

    /*QSO Media Pic 1 Image Begin*/
    await showImages(props.qso.media, pdf)

    /* QRA Image End*/

    var blob = await pdf.output("blob");
    await window.open(URL.createObjectURL(blob));
    // Print pdf.save('QSLCard.pdf');
}
async function showImages(media, pdf) {
    let picList = media.filter((media) => media.type === "image");

    let imgData;
    let tot_width = 0.4;
    let picWidthEnd = 0;
    let picHeight = 1.1;

    for (let i = 0; i < picList.length; i++) {
        let ratio = picHeight * 105 / picList[i].height;

        let picWidth = picList[i].width * ratio / 105;
        picWidthEnd = tot_width + 0.1 + picWidth;

        if (picWidthEnd >= 5.2) {
            break;
        }

        imgData = await getImage(picList[i].url, true)

        await pdf.addImage(imgData, 'JPEG', tot_width, 2, picWidth, picHeight);
        tot_width = tot_width + picWidthEnd;
    }
}

async function getImage(url, own_profile) {

    var img;
    var newurl = new URL(url).pathname;
    console.log(url)
    console.log(newurl)
    var pathname = newurl.split('/');
console.log(pathname);
    var file = pathname[pathname.length - 2] + '/' + pathname[pathname.length - 1]
console.log(file);
console.log(own_profile);
    return new Promise(function (resolve, reject) {
        if (own_profile) {
            img = new Image();
                    img.src = url;
                    img.crossOrigin = 'Anonymous';
                    img.onload = function () {

                        resolve(img);
                    }
            // Storage
            //     .get(file, {level: pathname[4],
            //         identityId: decodeURIComponent(pathname[5])})
            //     .then(result => {
            //         img = new Image();
            //         img.src = result;
            //         img.crossOrigin = 'Anonymous';
            //         img.onload = function () {

            //             resolve(img);
            //         }
            //     })
            //     .catch(err => console.log(err));
        } else {

            Storage.get(file, {
                level: pathname[4],
                identityId: decodeURIComponent(pathname[5])
            }).then(result => {
                img = new Image();
                img.src = result;
                img.crossOrigin = 'Anonymous';
                img.onload = function () {

                    resolve(img);
                }
            }).catch(err => console.log(err));
        }
    });

}