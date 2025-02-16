import styles from "./preview.module.scss";
import { Document, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from "react";
import Template1 from "./Templates/Template1";
import Template2 from "./Templates/Template2";
import Template3 from "./Templates/Template3";
import Template4 from "./Templates/Template4";
import defaultValues from "../../data/defaultValues";

const PDF = ({
  template,
  rows = defaultValues.rows,
  currencySymbol = 'MYR',
  formName = defaultValues.formName,
  logo = defaultValues.logo,
  logoUpdated = defaultValues.logoUpdated,
  email = defaultValues.email,
  businessName = defaultValues.businessName,
  address = defaultValues.address,
  city = defaultValues.city,
  zipcode = defaultValues.zipcode,
  phone = defaultValues.phone,
  owner = defaultValues.owner,
  clientName = defaultValues.clientName,
  clientEmail = defaultValues.clientEmail,
  clientAddress = defaultValues.clientAddress,
  clientCity = defaultValues.clientCity,
  clientZipcode = defaultValues.clientZipcode,
  clientPhone = defaultValues.clientPhone,
  date = defaultValues.date,
  InvoiceNo = defaultValues.InvoiceNo,
  website = defaultValues.website,
  notes = defaultValues.notes,
  totalAmount = 0
}) => {

  return (
    <Document
      author={owner}
      keywords="invoice, receipt"
      subject={`${businessName} Invoice`}
      title={`${clientName} ${formName} `}
    >
      {template === 'template1' &&
        <Template1
          logo={logo}
          formName={formName}
          businessName={businessName}
          InvoiceNo={InvoiceNo}
          date={date}
          clientName={clientName}
          clientEmail={clientEmail}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientZipcode={clientZipcode}
          clientPhone={clientPhone}
          rows={rows}
          currencySymbol={currencySymbol}
          totalAmount={totalAmount}
          notes={notes}
          owner={owner}
          address={address}
          phone={phone}
          email={email}
          city={city}
          zipcode={zipcode}
          website={website}
        />
      }
      {template === 'template2' &&
        <Template2
          logo={logo}
          formName={formName}
          businessName={businessName}
          InvoiceNo={InvoiceNo}
          date={date}
          clientName={clientName}
          clientEmail={clientEmail}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientZipcode={clientZipcode}
          clientPhone={clientPhone}
          rows={rows}
          currencySymbol={currencySymbol}
          totalAmount={totalAmount}
          notes={notes}
          owner={owner}
          address={address}
          phone={phone}
          email={email}
          city={city}
          zipcode={zipcode}
          website={website}
        />
      }
      {template === 'template3' &&
        <Template3
          logo={logo}
          logoUpdated={logoUpdated}
          formName={formName}
          businessName={businessName}
          InvoiceNo={InvoiceNo}
          date={date}
          clientName={clientName}
          clientEmail={clientEmail}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientZipcode={clientZipcode}
          clientPhone={clientPhone}
          rows={rows}
          currencySymbol={currencySymbol}
          totalAmount={totalAmount}
          notes={notes}
          owner={owner}
          address={address}
          city={city}
          zipcode={zipcode}
          email={email}
          phone={phone}
          website={website}
        />
      }
      {template === 'template4' &&
        <Template4
          logo={logo}
          formName={formName}
          businessName={businessName}
          InvoiceNo={InvoiceNo}
          date={date}
          clientName={clientName}
          clientEmail={clientEmail}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientZipcode={clientZipcode}
          clientPhone={clientPhone}
          rows={rows}
          currencySymbol={currencySymbol}
          totalAmount={totalAmount}
          notes={notes}
          owner={owner}
          address={address}
          city={city}
          zipcode={zipcode}
          phone={phone}
          email={email}
          website={website}
        />
      }
    </Document>
  );
}

const PDFView = ({
  template,
  rows = defaultValues.rows,
  currencySymbol = 'MYR',
  formName = defaultValues.formName,
  logo = defaultValues.logo,
  logoUpdated = defaultValues.logoUpdated,
  email = defaultValues.email,
  businessName = defaultValues.businessName,
  address = defaultValues.address,
  city = defaultValues.city,
  zipcode = defaultValues.zipcode,
  phone = defaultValues.phone,
  owner = defaultValues.owner,
  clientName = defaultValues.clientName,
  clientAddress = defaultValues.clientAddress,
  clientEmail = defaultValues.clientEmail,
  clientCity = defaultValues.clientCity,
  clientZipcode = defaultValues.clientZipcode,
  clientPhone = defaultValues.clientPhone,
  date = defaultValues.date,
  InvoiceNo = defaultValues.InvoiceNo,
  website = defaultValues.website,
  notes = defaultValues.notes
}) => {

  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const [inputRows, setInputRows] = useState(rows);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setInputRows(() => rows);
    handleTotalCalculation(rows);
  }, [rows]);

  const handleInputChange = (index, field, value) => {
    const newRows = [...inputRows];
    newRows[index][field] = value;
    newRows[index].amount = newRows[index].quantity * newRows[index].rate;
    setInputRows(newRows);
    handleTotalCalculation(newRows);
  };

  const handleTotalCalculation = (rows) => {
    let sum = 0;
    rows.forEach(row => {
      sum += parseFloat(row.amount);
    });
    setTotalAmount(numberWithCommas(sum.toFixed(2)));
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const pdf = (
    <PDF
      template={template}
      rows={inputRows}
      email={email}
      businessName={businessName}
      formName={formName}
      logo={logo}
      logoUpdated={logoUpdated}
      address={address}
      city={city}
      zipcode={zipcode}
      phone={phone}
      owner={owner}
      clientName={clientName}
      clientEmail={clientEmail}
      clientAddress={clientAddress}
      clientCity={clientCity}
      clientZipcode={clientZipcode}
      clientPhone={clientPhone}
      date={date}
      InvoiceNo={InvoiceNo}
      website={website}
      notes={notes}
      currencySymbol={currencySymbol}
      totalAmount={totalAmount}
    />
  );

  return (
    <>
      <PDFViewer className={styles.full}>
        {pdf}
      </PDFViewer>
     
    </>
  );
}

export default PDFView;
export { PDF };