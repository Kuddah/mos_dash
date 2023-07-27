export function ToolOrderInitialValues(selectedToolOrder) {
  return {
    date:
      selectedToolOrder && selectedToolOrder.date
        ? selectedToolOrder.date
        : new Date().toISOString().split("T")[0],
    jobnumber: selectedToolOrder ? selectedToolOrder.jobnumber : "",
    revision: selectedToolOrder ? selectedToolOrder.revision : "",
    jobtype: selectedToolOrder ? selectedToolOrder.jobtype : "",
    motortype: selectedToolOrder ? selectedToolOrder.motortype : "",
    toolsize: selectedToolOrder ? selectedToolOrder.toolsize : "",
    topconnection: selectedToolOrder ? selectedToolOrder.topconnection : "",
    client: selectedToolOrder ? selectedToolOrder.client : "",
    rigname: selectedToolOrder ? selectedToolOrder.rigname : "",
    requiredshippingdate:
      selectedToolOrder && selectedToolOrder.requiredshippingdate
        ? selectedToolOrder.requiredshippingdate
        : new Date().toISOString().split("T")[0],
    deviated: selectedToolOrder ? selectedToolOrder.deviated : "",
    bearingtype: selectedToolOrder ? selectedToolOrder.bearingtype : "",
    sleevestabsize: selectedToolOrder ? selectedToolOrder.sleevestabsize : "",
    bottomconnection: selectedToolOrder
      ? selectedToolOrder.bottomconnection
      : "",
    lobeconfig: selectedToolOrder ? selectedToolOrder.lobeconfig : "",
    numberofstage: selectedToolOrder ? selectedToolOrder.numberofstage : "",
    rubbertype: selectedToolOrder ? selectedToolOrder.rubbertype : "",
    bendangle: selectedToolOrder ? selectedToolOrder.bendangle : "",
    pulser: selectedToolOrder ? selectedToolOrder.pulser : "",
    mwd: selectedToolOrder ? selectedToolOrder.mwd : "",
    nmdccollarsize: selectedToolOrder ? selectedToolOrder.nmdccollarsize : "",
    gamma: selectedToolOrder ? selectedToolOrder.gamma : "",
    resistivity: selectedToolOrder ? selectedToolOrder.resistivity : "",
    density: selectedToolOrder ? selectedToolOrder.density : "",
    depthfrom: selectedToolOrder ? selectedToolOrder.depthfrom : "",
    depthto: selectedToolOrder ? selectedToolOrder.depthto : "",
    flowratemin: selectedToolOrder ? selectedToolOrder.flowratemin : "",
    flowratemax: selectedToolOrder ? selectedToolOrder.flowratemax : "",
    batterytype: selectedToolOrder ? selectedToolOrder.batterytype : "",
    orderedby: selectedToolOrder ? selectedToolOrder.orderedby : "",
    motortechnician: selectedToolOrder ? selectedToolOrder.motorTechnician : "",
    mwldwtechnician: selectedToolOrder ? selectedToolOrder.mwldwtechnician : "",
    approvedby: selectedToolOrder ? selectedToolOrder.approvedby : "",
    approvedbydate: selectedToolOrder ? selectedToolOrder.approvedbydate : "",
    expectedbtmholetemp: selectedToolOrder
      ? selectedToolOrder.expectedbtmholetemp
      : "",
    mwdbottomcon: selectedToolOrder ? selectedToolOrder.mwdbottomcon : "",
    mwdtopcon: selectedToolOrder ? selectedToolOrder.mwdtopcon : "",
  };
}
