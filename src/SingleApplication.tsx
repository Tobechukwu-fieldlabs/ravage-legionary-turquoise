import { Application } from "./Applications";
import styles from "./SingleApplication.module.css";

function formatDate(date: string) {
  const newDate = new Date(date);

  const dateFormat = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(newDate);
  const [day, month, year] = dateFormat.split("/");
  return `${day}-${month}-${year}`;
}

function formatPrice(productPrice: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(productPrice);
}

const SingleApplication = ({ application }: { application: Application }) => {
  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        <span>{application.company}</span>
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        <span>
          {application.first_name} {application.last_name}
        </span>
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        <span>{application.email}</span>
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        <span>{formatPrice(application.loan_amount)}</span>
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        <span>{formatDate(application.date_created)}</span>
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        <span>{formatDate(application.expiry_date)}</span>
      </div>
    </div>
  );
};

export default SingleApplication;
