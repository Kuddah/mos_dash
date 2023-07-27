import PouchDB from 'pouchdb';
import pouchdbFind from 'pouchdb-find';

PouchDB.plugin(pouchdbFind);

const localDB = new PouchDB('db/fieldinvestigation');
const remoteDBURL = `http://kuddah:kingdoms@127.0.0.1:5984/fieldinvestigation`;

const remoteDB = new PouchDB(remoteDBURL);

async function syncDatabases() {
  return PouchDB.sync(localDB, remoteDB).on('complete', () => {
    console.log('Sync completed');
  }).on('error', (err) => {
    console.log('Sync error:', err);
  });
}
export type FIR = {
  _id?: string;
  _rev?: string;
  id: number;
  submissionDate: Date;
  signedDocument: string;
  jobNumber: string;
  bhaNumber: number;
  runNumber: number;
  rig: string;
  wellName: string;
  client: string;
  holeSize: string;
  firNumber: string;
  bitGrading: string;
  tfa: string;
  bitType: string;
  offBtmPressure: number;
  bitMaker: string;
  iadc: string;
  bitModel: string;
  slackOffWeight: number;
  timelineAndCorrective: string;
  onBtmPressure: number;
  flowRate: number;
  offBtmTorque: number;
  wob: number;
  onBtmTorque: number;
  pickUpWeight: number;
  runUpload: File;
  mudreportUpload: File;
  bhaUpload: File;
  incidentType: string;
  operationAtTimeOfIncident: string;
  jarring: string;
  lcm:string;
  dd1: string;
  dd2: string;
  mwd1: string;
  mwd2: string;
  incidentSummary: string;
  fieldInvest: string;
  pvUpload:  File;
  mluUpload:  File;
  otherUpload:  File;
  firstName: string;
  lastName: string;
  employeeNumber: string;
};
export class FIRApi {
  async getListOfFir() {
    try {
      const response = await localDB.allDocs({ include_docs: true, attachments: true });
      const firPromises = response.rows.map(async (row) => {
        const doc = row.doc;
  
        // Fetch each attachment and add it to the doc
        if (doc._attachments) {
          for (const filename of Object.keys(doc._attachments)) {
            const blob = await localDB.getAttachment(doc._id, filename);
            doc[filename] = blob; // Add the blob to the doc
          }
        }
  
        return doc;
      });
  
      const fir = await Promise.all(firPromises);
  
      await syncDatabases();
      return fir;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  
async createFir(firFormData) {
  try {
    // Convert files to attachments
    const attachments = {};
    for (const file of firFormData.files) {
      const fileData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
      console.log(attachments); // log this just before the localDB.post statement

      // Cast fileData to string and remove the data URL prefix (data:*/*;base64,) from the string
      const base64Data = (fileData as string).replace(/^data:.*;base64,/, '');
      console.log(base64Data); // log this after the replace statement

      attachments[file.name] = {
        content_type: file.type,
        data: base64Data
      };
    }

    // Exclude files from the form data before saving it to the database
    const { files, ...restOfFirFormData } = firFormData;

    const response = await localDB.post({
      ...restOfFirFormData,
      _attachments: attachments,
    });
    console.log(response); // log the response from database
    await syncDatabases();
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

  
  

  async updateFir(firFormData: FIR) {
    try {
      const response = await localDB.put({
        ...firFormData,
        _attachments: {
          runUpload: {
            content_type: firFormData.runUpload.type,
            data: firFormData.runUpload
          },
          mudreportUpload: {
            content_type: firFormData.mudreportUpload.type,
            data: firFormData.mudreportUpload
          },
          bhaUpload: {
            content_type: firFormData.bhaUpload.type,
            data: firFormData.bhaUpload
          }
        }
      });
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteFir(firFormData: FIR) {
    try {
      // Specify the document ID when calling the remove function
      const response = await localDB.remove({
        _id: firFormData._id,
        _rev: firFormData._rev,
      });
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
