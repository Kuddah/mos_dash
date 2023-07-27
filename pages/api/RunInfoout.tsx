import PouchDB from "pouchdb";
import pouchdbFind from "pouchdb-find";

PouchDB.plugin(pouchdbFind);

const localDB = new PouchDB("db/runinfoout");
const remoteDBURL = `http://kuddah:kingdoms@127.0.0.1:5984/runinfoout`;
const remoteDB = new PouchDB(remoteDBURL);

const username = process.env.COUCHDB_USERNAME; // Update with your CouchDB username
const password = process.env.COUCHDB_PASSWORD;

async function syncDatabases() {
  return PouchDB.sync(localDB, remoteDB).on('complete', () => {
    console.log('Sync completed');
  }).on('error', (err) => {
    console.log('Sync error:', err);
  });
}

export type RunInfo = {
  _id?: string;
  _rev?: string;
  id: number;
  end_mw: number;
  depth_out: number;
  inc_out: number;
  azi_out: number;
  dateout: Date;
  datetd: Date;
  drillinghour: number;
  pumpinghour: number;
  brthour: number;
  jobrun: string;
};

export class RunInfooutApi {
  async getListOfRunInfo() {
    try {
      const response = await localDB.allDocs({ include_docs: true });
      const runInfoList = response.rows.map((row) => row.doc);
      await syncDatabases();
      return runInfoList;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async createRunInfo(runInfoFormData: RunInfo) {
    try {
      const response = await localDB.post(runInfoFormData);
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateRunInfo(runInfo: RunInfo): Promise<void> {
    try {
      await localDB.put(runInfo);
      await syncDatabases();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteRunInfo(runInfo: RunInfo) {
    try {
      // Specify the document ID when calling the remove function
      const response = await localDB.remove({
        _id: runInfo._id,
        _rev: runInfo._rev,
      });
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
