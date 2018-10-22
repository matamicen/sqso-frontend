import jsPDF from 'jspdf';
import canvg from 'canvg'
import ReactDOMServer from "react-dom/server"
import QRCode from "qrcode.react";
import React from "react";

export default async function QslCardPrint(props) {
    console.log(props.qso)
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
    pdf.addImage(imgData, 'PNG', 4.2, 0.3, 1, 1);
    pdf.setFontSize(8);
    pdf.text(4.2 , 1.5, 'Visit SuperQSO.com' );
    /* QR CODE End*/

    /*QRA OWNER Image Begin*/
    imgData = await getBase64Image(props.qso.profilepic)
    // imgData = await getBase64Image('https://picsum.photos/200/300')
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
    pdf.text(3.3, 0.7, "Date: " + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    pdf.text(3.3, 0.8, "QTR: " + date.getHours() + ':' + date.getMinutes());
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
        imgData = await getBase64Image(props.qso.qras[0].profilepic)
        await pdf.addImage(imgData, 'JPEG', 1, 1.2, 0.4, 0.4);
        /* QSO QRA TEXT */
        pdf.setFontSize(7)
        pdf.text(1, 1.7, props.qso.qras[0].qra);
        /* QSO QRA END */
    }
    if (props.qso.qras[1]) {
        imgData = await getBase64Image(props.qso.qras[1].profilepic)
        await pdf.addImage(imgData, 'JPEG', 1.5, 1.2, 0.4, 0.4);
        /* QSO QRA TEXT */
        pdf.setFontSize(7)
        pdf.text(1.5, 1.7, props.qso.qras[1].qra);
        /* QSO QRA END */
    }
    if (props.qso.qras[2]) {
        imgData = await getBase64Image(props.qso.qras[2].profilepic)
        await pdf.addImage(imgData, 'JPEG', 2, 1.2, 0.4, 0.4);
        /* QSO QRA TEXT */
        pdf.setFontSize(7)
        pdf.text(2, 1.7, props.qso.qras[2].qra);
        /* QSO QRA END */
    }
    if (props.qso.qras[3]) {
        imgData = await getBase64Image(props.qso.qras[3].profilepic)
        await pdf.addImage(imgData, 'JPEG', 2.5, 1.2, 0.4, 0.4);
        /* QSO QRA TEXT */
        pdf.setFontSize(7)
        pdf.text(2.5, 1.7, props.qso.qras[3].qra);
        /* QSO QRA END */
    }
    if (props.qso.qras[4]) {
        imgData = await getBase64Image(props.qso.qras[4].profilepic)
        await pdf.addImage(imgData, 'JPEG', 3, 1.2, 0.4, 0.4);
        /* QSO QRA TEXT */
        pdf.setFontSize(7)
        pdf.text(3, 1.7, props.qso.qras[4].qra);
        /* QSO QRA END */
    }
    // /* QRA Image End*/

    /*QSO Media Pic 1 Image Begin*/
    // console.log("QSO Media ")
    let picList = props
        .qso
        .media
        .filter((media) => media.type === "image");
    console.log(picList)
    if (picList[0]) {
        imgData = await getBase64Image(picList[0].url)
        await pdf.addImage(imgData, 'JPEG', 0.4, 2, 1.1, 1.1);
    }
    if (picList[1]) {
        imgData = await getBase64Image(picList[1].url)
        await pdf.addImage(imgData, 'JPEG', 1.6, 2, 1.1, 1.1);
    }
    if (picList[2]) {
        imgData = await getBase64Image(picList[2].url)
        await pdf.addImage(imgData, 'JPEG', 2.8, 2, 1.1, 1.1);
    }
    if (picList[3]) {
        imgData = await getBase64Image(picList[3].url)
        await pdf.addImage(imgData, 'JPEG', 4.0, 2, 1.1, 1.1);
    }

    /* QRA Image End*/

    var blob = await pdf.output("blob");
    await window.open(URL.createObjectURL(blob));
    // Print pdf.save('QSLCard.pdf');
}
async function getBase64Image(url) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = url;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            resolve(img);
        };
    });
}