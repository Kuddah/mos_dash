import PouchDB from 'pouchdb';
import pouchdbFind from 'pouchdb-find';

PouchDB.plugin(pouchdbFind);

const localDB = new PouchDB('db/runinfo');
const remoteDBURL = `http://kuddah:kingdoms@127.0.0.1:5984/runinfo`;
const remoteDB = new PouchDB(remoteDBURL);

const username = process.env.COUCHDB_USERNAME; // Update with your CouchDB username
const password = process.env.COUCHDB_PASSWORD;
const auth = { username, password };
export type RunInfo = {
  _id?: string;
  _rev?: string;
  id: number;
  bha_run: number;
  jobno: string;
  mud_type: string;
  casing_shoe: number;
  casing_size: string;
  casing_weight: string;
  hole_size: number;
  depth_in: number;
  inc_in: number;
  azi_in: number;
  datein: Date;
  borehole: string;
  jobrun: string;
}
// const sync = PouchDB.sync(localDB, remoteDB, {
//   live: true,
//   retry: true
// }).on('change', function (info) {
//   console.log('PouchDB change:', info);
// }).on('paused', function (err) {
//   console.log('PouchDB replication paused:', err);
// }).on('active', function () {
//   console.log('PouchDB replication is Active');
// }).on('denied', function (err) {
//   console.log('PouchDB replication is Active', err);
// }).on('complete', function (info) {
//   console.log('PouchDB replication is completed');
// }).on('error', function (err) {
//   console.log('PouchDB replication error:', err);
// });

// sync.cancel(); // Cancel replication whenever you want
async function syncDatabases() {
  return PouchDB.sync(localDB, remoteDB).on('complete', () => {
    console.log('Sync completed');
  }).on('error', (err) => {
    console.log('Sync error:', err);
  });
}


export class RunInfoApi {

  async getListOfRunInfo() {
    try {
      const response = await localDB.allDocs({ include_docs: true });
      const runInfoList = response.rows.map(row => row.doc);
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
