import * as moment from 'moment';
import * as writtenNumber from 'written-number';
import 'moment/locale/es';
import {
  capitalizeFirstLetter,
  documentTypeToString,
  formatNumberToCurrency,
  getLastCharsOfId,
  scheduleTypeToString,
} from 'src/common/utils';

export const paymentReceiptHtml = (receipt) => {
  const {
    paymentHistoryId,
    payHistoryAmount,
    paymentCreatedAt,
    studentFirstName,
    studentLastName,
    studentDocumentType,
    studentIdentification,
    studentContactPhone,
    scheduleName,
    scheduleType,
    courseName,
    coursePrice,
    remainingDebt,
  } = receipt;

  const paymentDateFormated = moment(paymentCreatedAt).format('LL');
  const scheduleTypeFormated = scheduleTypeToString(scheduleType);
  const documentTypeFormated = documentTypeToString(studentDocumentType);
  const coursePriceFormated = formatNumberToCurrency(coursePrice);
  const payHistoryAmountFormated = formatNumberToCurrency(payHistoryAmount);
  const debtRemainingFormated = formatNumberToCurrency(remainingDebt);

  const payAmountInLetters = capitalizeFirstLetter(
    writtenNumber(payHistoryAmount, {
      lang: 'es',
    }),
  );

  const paymentIdIndicator = getLastCharsOfId(paymentHistoryId);

  const paymentReceipt = `<style type="text/css">
  .tg  {border-collapse:collapse;border-spacing:0;margin:0px auto;}
  .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:10px;
    overflow:hidden;padding:10px 5px;word-break:normal;}
  .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:10px;
    font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
  .tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top; font-size: 10px;}
  .tg .tg-7btt{border-color:inherit;font-weight:bold;text-align:center;vertical-align:top}
  </style>
  <table class="tg">
  <thead>
    <tr>
      <th class="tg-c3ow" rowspan="2">
      <img src="data:image/png;base64,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" alt="Image" width="200" height="75"></th>
      <th class="tg-c3ow" colspan="2">
      <span style="font-weight: bold;">REGISTRO DE CAJA</span>
      <br><span style="font-weight: bold;">TESORERÍA</span>
      <br>Consecutivo:
      <br>${paymentIdIndicator}<br/></th>
      <th class="tg-c3ow" colspan="2">
      <span style="font-weight: bold;">NIT: 901.500.148-5</span>
      <br>Personería Jurídica
      <br>Resolución: 2021060090546
      <br>Carrera 51 Nro. 49-07 Piso 2
      <br><span style="font-weight: bold;">Celular: 314 596 3000</span></th>
    </tr>
    <tr>
      <th class="tg-c3ow" colspan="2">Código: F-GF-01</th>
      <th class="tg-c3ow" colspan="2">Página: 1 de 1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="tg-c3ow"><span style="font-weight:bold">Fecha de Pago:</span><br>${paymentDateFormated}</td>
      <td class="tg-c3ow" colspan="2">Curso y/o seminario a matricular:<br><span style="font-weight:bold">${courseName.toUpperCase()}</span></td>
      <td class="tg-c3ow">Jornada:<br>${scheduleTypeFormated}</td>
      <td class="tg-c3ow">Horario:<br>${scheduleName}</td>
    </tr>
    <tr>
      <td class="tg-c3ow" colspan="5"><span style="font-weight:bold">DATOS PERSONALES</span></td>
    </tr>
    <tr>
      <td class="tg-c3ow" colspan="2"><span style="font-weight: bold;">Apellidos:</span><br>${studentLastName.toUpperCase()}</td>
      <td class="tg-c3ow" colspan="3"><span style="font-weight:bold">Nombres:</span><br>${studentFirstName.toUpperCase()}</td>
    </tr>
    <tr>
      <td class="tg-c3ow"><span style="font-weight:bold">Tipo de Documento:</span><br>${documentTypeFormated}</td>
      <td class="tg-c3ow" colspan="3"><span style="font-weight:bold">No. Documento:</span><br>${studentIdentification}</td>
      <td class="tg-c3ow"><span style="font-weight: bold;">Celular:</span><br>${studentContactPhone}</td>
    </tr>
    <tr>
      <td class="tg-c3ow" colspan="5"><span style="font-weight:bold">REGISTRO DE PAGO</span></td>
    </tr>
    <tr>
      <td class="tg-7btt"><span style="font-weight:bold">Valor del Curso: </span>${coursePriceFormated}<br><span style="font-weight:bold">Abono: </span>${payHistoryAmountFormated}
      <br>Restante: ${debtRemainingFormated} </td>
      <td class="tg-c3ow"><span style="font-weight:bold">En letras valor pagado:</span>
      <br>${payHistoryAmountFormated}<br>${payAmountInLetters} COP MLV</td>
      <td class="tg-c3ow" colspan="3"><span style="font-weight:bold">Firma y sello Academia Avanza</span></td>
    </tr>
  </tbody>
  </table>`;

  return paymentReceipt;
};
