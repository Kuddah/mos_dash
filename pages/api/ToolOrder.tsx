import PouchDB from "pouchdb";
import pouchdbFind from "pouchdb-find";

PouchDB.plugin(pouchdbFind);

const localDB = new PouchDB("db/toolorder");
const remoteDBURL = `http://kuddah:kingdoms@127.0.0.1:5984/toolorder`;

const remoteDB = new PouchDB(remoteDBURL);

async function syncDatabases() {
  return PouchDB.sync(localDB, remoteDB).on('complete', () => {
    console.log('Sync completed');
  }).on('error', (err) => {
    console.log('Sync error:', err);
  });
}
const sync = PouchDB.sync(localDB, remoteDB, {
  live: true,
  retry: true,
})
  .on("change", function (info) {
    console.log("PouchDB change:", info);
  })
  .on("paused", function (err) {
    console.log("PouchDB replication paused:", err);
  })
  .on("active", function () {
    console.log("PouchDB replication is Active");
  })
  .on("denied", function (err) {
    console.log("PouchDB replication is Active", err);
  })
  .on("complete", function (info) {
    console.log("PouchDB replication is completed");
  })
  .on("error", function (err) {
    console.log("PouchDB replication error:", err);
  });

sync.cancel(); // Cancel replication whenever you want

export type ToolOrder = {
  _id?: string;
  _rev?: string;
  id: number;
  date: Date;
  jobnumber: string;
  revision: number;
  jobtype: string;
  motortype: string;
  toolsize: string;
  topconnection: string;
  client: string;
  rigname: string;
  requiredshippingdate: Date;
  deviated: string;
  bearingtype: string;
  sleevestabsize: string;
  bottomconnection: string;
  lobeconfig: string;
  numberofstage: string;
  rubbertype: string;
  bendangle: number;
  pulser: string;
  mwd: string;
  nmdccollarsize: string;
  gamma: string;
  resistivity: string;
  density: string;
  depthfrom: number;
  depthto: number;
  flowratemin: number;
  flowratemax: number;
  batterytype: string;
  orderedby: string;
  motortechnician: string;
  mwldwtechnician: string;
  approvedby: string;
  approvedbydate: Date;
  expectedbtmholetemp: number;
  mwdbottomcon: string;
  mwdtopcon: string;
};



export class ToolOrderApi {
  async getListOfToolOrder() {
    try {
      const response = await localDB.allDocs({ include_docs: true });
      const toolorders = response.rows.map((row) => row.doc);
      await syncDatabases();
      return toolorders;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async createToolOrder(ToolOrderFormData: ToolOrder) {
    try {
      const response = await localDB.post(ToolOrderFormData);
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateToolOrder(toolOrder: ToolOrder) {
    try {
      const response = await localDB.put(toolOrder);
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteToolOrder(toolOrder: ToolOrder) {
    try {
      // Specify the document ID when calling the remove function
      const response = await localDB.remove({
        _id: toolOrder._id,
        _rev: toolOrder._rev,
      });
      await syncDatabases();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}