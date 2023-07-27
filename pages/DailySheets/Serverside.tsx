import axios from 'axios';

const COUCHDB_URL = process.env.REACT_APP_COUCHDB_URL;
export async function getServerSideProps(context) {
  
  const bonusResponse = await axios.get(`${COUCHDB_URL}/bonussheets/bonus`);
  const bonusArrayResponse = await axios.get(`${COUCHDB_URL}/bonussheets/bonusarray`);
  const footerResponse = await axios.get(`${COUCHDB_URL}/bonussheets/footer`);
  const employeeResponse = await axios.get(`${COUCHDB_URL}/bonussheets/employee`);
  const bonusstructureResponse = await axios.get(`${COUCHDB_URL}/bonussheets/bonusstructure`);
  const employee = employeeResponse.data;
  const bonusstructure = bonusstructureResponse.data;
  const bonus = bonusResponse.data;
  const bonusArray = bonusArrayResponse.data;
  const footers = footerResponse.data;

  // Pass data to the page via props
  return { props: { bonus, bonusArray, footers, employee, bonusstructure } }
}