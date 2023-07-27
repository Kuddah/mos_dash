import PouchDB from 'pouchdb';
import pouchdbFind from 'pouchdb-find';

PouchDB.plugin(pouchdbFind);

const localDB = new PouchDB('db/bonussheets');
const remoteDBURL = `http://kuddah:kingdoms@127.0.0.1:5984/bonussheets`;

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

export type BonusSheet = {
    _id?: string;
    _rev?: string;
    id: number;
    company_name: string;
    employeeNumber: string;
    employeename: string;
    employeegrade: string;
    month: string;
    segment: string;
    daily_records: Array<{
      date: number;
      well?: string;
      rig?: string;
      job_number?: string;
      status: string;
      tierType?: string;
      total?: number;
    }>;
    total_days: number;
    total_amount: number;
  };
  

export class BonusSheetApi {
  async getListOfBonusSheet() {
    try {
      const response = await localDB.allDocs({ include_docs: true });
      const BonusSheets = response.rows.map((row) => row.doc);
      await syncDatabases();
      return BonusSheets;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async createBonusSheet(BonusSheetFormData: BonusSheet) {
    try {
      console.log('BonusSheetFormData:', BonusSheetFormData);
      const response = await localDB.post(BonusSheetFormData);
      console.log('Create response:', response); // add this
      await syncDatabases();
      return response;
    } catch (error) {
      console.log('Create error:', error); // add this
      throw new Error(error);
    }
  }

  async updateBonusSheet(BonusSheet: BonusSheet) {
    try {
      const response = await localDB.put(BonusSheet);
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteBonusSheet(BonusSheet: BonusSheet) {
    try {
      // Specify the document ID when calling the remove function
      const response = await localDB.remove({
        _id: BonusSheet._id,
        _rev: BonusSheet._rev,
      });
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
