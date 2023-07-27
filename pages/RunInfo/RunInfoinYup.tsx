import * as Yup from "yup";
export function RunInfoVal() {
    return Yup.object().shape({
        bha_run: Yup.number().required(),
        jobno: Yup.string().required(),
        mud_type: Yup.string().required(),
        casing_shoe: Yup.number().required(),
        casing_size: Yup.string().required(),
        casing_weight: Yup.string().required(),        
        hole_size: Yup.number().required(),
        depth_in: Yup.number().required(),        
        inc_in: Yup.number().required(),        
        azi_in: Yup.number().required(),        
        datein: Yup.date().required(),        
        borehole: Yup.string().required(),
        jobrun: Yup.string().required(),
    });
}