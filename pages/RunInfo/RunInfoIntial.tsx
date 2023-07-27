export function RunInfoValues(selectedRunInfo) {
    return {
        bha_run: selectedRunInfo ? selectedRunInfo.bha_run : "",
        jobno: selectedRunInfo ? selectedRunInfo.jobno : "",
        mud_type: selectedRunInfo ? selectedRunInfo.mud_type : "",
        casing_shoe: selectedRunInfo ? selectedRunInfo.casing_shoe : "",
        casing_size: selectedRunInfo ? selectedRunInfo.casing_size : "",
        casing_weight: selectedRunInfo ? selectedRunInfo.casing_weight : "",
        hole_size: selectedRunInfo ? selectedRunInfo.hole_size : "",
        depth_in: selectedRunInfo ? selectedRunInfo.depth_in : "",
        inc_in: selectedRunInfo ? selectedRunInfo.inc_in : "",
        azi_in: selectedRunInfo ? selectedRunInfo.azi_in : "",
        datein: selectedRunInfo ? selectedRunInfo.datein : "",
        borehole: selectedRunInfo ? selectedRunInfo.borehole : "",
        jobrun: selectedRunInfo ? selectedRunInfo.jobrun : "",
    };
        }
