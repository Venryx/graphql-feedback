//import uuidV4 from 'uuid/v4';
import slugid from "slugid";
export function GenerateUUID() {
    //return uuidV4(options);
    return slugid.v4();
}
