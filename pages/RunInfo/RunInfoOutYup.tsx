import * as Yup from "yup";
export function RunInfoVal() {
    return Yup.object().shape({
        end_mw: Yup.number().required(),
        depth_out: Yup.number().required(),
        inc_out: Yup.number().required(),
        azi_out: Yup.number().required(),
        dateout: Yup.date().required(),
        datetd: Yup.date().required(),
        drillinghour: Yup.number().required(),
        pumpinghour: Yup.number().required(),
        brthour: Yup.number().required(),
        jobrun: Yup.string().required(),
    });
}