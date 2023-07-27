export function RunInfoValues(selectedRunInfo) {
  return {
    end_mw: selectedRunInfo ? selectedRunInfo.end_mw : "",
    depth_out: selectedRunInfo ? selectedRunInfo.depth_out : "",
    inc_out: selectedRunInfo ? selectedRunInfo.inc_out : "",
    azi_out: selectedRunInfo ? selectedRunInfo.azi_out : "",
    dateout: selectedRunInfo ? selectedRunInfo.dateout : "",
    datetd: selectedRunInfo ? selectedRunInfo.datetd : "",
    drillinghour: selectedRunInfo ? selectedRunInfo.drillinghour : "",
    pumpinghour: selectedRunInfo ? selectedRunInfo.pumpinghour : "",
    brthour: selectedRunInfo ? selectedRunInfo.brthour : "",
    jobrun: selectedRunInfo ? selectedRunInfo.jobrun : "",
  };
}
