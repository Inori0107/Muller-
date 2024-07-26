import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, '票券名稱必填']
    },
    price: {
      type: Number,
      required: [true, '票券價格必填'],
      min: [0, '票價價格不能小於 0']
    },
    date: {
      type: Date,
      required: [true, '票券日期必填']
    },
    description: {
      type: String,
      required: [true, '票券位置必填']
    },
    sell: {
      type: Boolean,
      required: [true, '票券上架狀態必填']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('tickets', schema)
