import Entries from "../models/entries";

exports.createData = async function (id, message) {
    try {
        let entries = {
            company_id:id,
            message:message,
            creation_date:new Date()
        }
        let finddata = await Entries.findOne({where: {company_id: id}});
        if(finddata) {
            let updatedata = await finddata.update(entries);
            if (updatedata) {
                console.log("done")
            }
        } else {
            Entries.create(entries);
        }
    } catch (e) {
       console.log(e)
    }
}
