import PouchDB from 'pouchdb';
import pouchdbFind from 'pouchdb-find';

PouchDB.plugin(pouchdbFind);

const localDB = new PouchDB('db/generals');
const remoteDBURL = `http://kuddah:kingdoms@127.0.0.1:5984/generals`;

const remoteDB = new PouchDB(remoteDBURL);


PouchDB.replicate(localDB, remoteDB);
async function syncDatabases() {
  return PouchDB.sync(localDB, remoteDB).on('complete', () => {
    console.log('Sync completed');
  }).on('error', (err) => {
    console.log('Sync error:', err);
  });
}
const sync = PouchDB.sync(localDB, remoteDB, {
  live: true,
  retry: true
}).on('change', function (info) {
  console.log('PouchDB change:', info);
}).on('paused', function (err) {
  console.log('PouchDB replication paused:', err);
}).on('active', function () {
  console.log('PouchDB replication is Active');
}).on('denied', function (err) {
  console.log('PouchDB replication is Active', err);
}).on('complete', function (info) {
  console.log('PouchDB replication is completed');
}).on('error', function (err) {
  console.log('PouchDB replication error:', err);
});

sync.cancel(); // Cancel replication whenever you want

export type General = {
  _id?: string;
  _rev?: string;
  id: number;
  jobno: string;
  loc: string;
  client: string;
  rig: string;
  field: string;
  statu: string;
  well: string;
};

export class GeneralApi {
  async getListOfGeneral() {
    try {
      const response = await localDB.allDocs({ include_docs: true });
      const generals = response.rows.map((row) => row.doc);
      await syncDatabases();
      return generals;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async createGeneral(generalFormData: General) {
    try {
      const response = await localDB.post(generalFormData);
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateGeneral(general: General) {
    try {
      const response = await localDB.put(general);
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteGeneral(general: General) {
    try {
      // Specify the document ID when calling the remove function
      const response = await localDB.remove({
        _id: general._id,
        _rev: general._rev,
      });
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
