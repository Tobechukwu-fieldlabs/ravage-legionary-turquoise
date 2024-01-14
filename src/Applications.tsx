import { useEffect, useRef, useState } from "react";
import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Button } from "./ui/Button/Button";

export type Application = {
  guid: string;
  loan_amount: number;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  date_created: string;
  expiry_date: string;
};

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasPageLoaded = useRef(false);

  const getApplications = async () => {
    /**
     * This condition here improves the UI.
     * It prevents "setLoading" from being called after the first render.
     */
    if (!hasPageLoaded.current) setLoading(true);

    try {
      if (!hasPageLoaded.current) setLoading(true);
      const response = await fetch(
        `http://localhost:3001/api/applications?_page=${pageNumber}&_limit=5`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Something went wrong");
      const result: Application[] = await response.json();

      setError("");
      setApplications((prevState) => [...prevState, ...result]);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setApplications([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
    hasPageLoaded.current = true;
  }, [pageNumber]);

  const emails = applications.map((application) => application.email);
  const uniqueApplications = applications.filter(
    ({ email }, index) => !emails.includes(email, index + 1)
  );

  if (loading) return <h1>Loading...</h1>;

  if (error !== "") return <h1>{error}. Please refresh</h1>;

  return (
    <div className={styles.Applications}>
      <div className={styles.ApplicationContainer}>
        {uniqueApplications.map((application) => (
          <SingleApplication
            key={application.email}
            application={application}
          />
        ))}
      </div>

      <div className={styles.BtnContainer}>
        <Button onClick={() => setPageNumber((prevState) => prevState + 1)}>
          Load more
        </Button>
      </div>
    </div>
  );
};

export default Applications;
