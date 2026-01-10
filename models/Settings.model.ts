import mongoose from "mongoose"

interface ISignaure {
    name : string;
    image : string
}

interface ISettings {
    _id? : mongoose.Types.ObjectId;
    invoiceLogo? : string,
    signature? : ISignaure,
    userId : mongoose.Types.ObjectId,
    createAt? : Date,
    updateAt? : Date
}

const signatureSchema = new mongoose.Schema<ISignaure>({
    name : { type : String , default : null },
    image : { type : String , default : null }
}, {
    _id : false
})

const settingsSchema = new mongoose.Schema<ISettings>({
    invoiceLogo : { type : String, default : null},
    signature : signatureSchema,
    userId : { type : mongoose.Schema.Types.ObjectId, ref : "user", default : null, required : true }
}, {
    timestamps : true
})

const SettingModel = mongoose.models.setting || mongoose.model("setting", settingsSchema)

export default SettingModel