import { Schema, model, ObjectId } from 'mongoose'

// products
const productSchema = new Schema({
  p_id: {
    type: ObjectId,
    ref: 'products',
    required: [true, '使用者購物車商品必填']
  },
  quantity: {
    type: Number,
    required: [true, '使用者購物車商品數量必填'],
    min: [1, '使用者購物車商品數量不符']
  }
})

// tickets
const ticketSchema = new Schema({
  t_id: {
    type: ObjectId,
    ref: 'tickets',
    required: [true, '使用者購物車票券必填']
  },
  quantity: {
    type: Number,
    required: [true, '使用者購物車票券數量必填'],
    min: [1, '使用者購物車票券數量不符']
  },
  description: {
    type: String,
    required: [true, '使用者購物車票券描述必填']
  },
  date: {
    type: Date,
    required: [true, '使用者購物車票券日期必填']
  }
})

// users
const schema = new Schema({
  user: {
    type: ObjectId,
    ref: 'users',
    required: [true, '訂單使用者必填']
  },
  cart_P: {
    type: [productSchema],
    validate: {
      validator (value) {
        return value.length > 0
      },
      message: '訂單購物車商品必填'
    }
  },
  cart_T: {
    type: [ticketSchema],
    validate: {
      validator (value) {
        return value.length > 0
      },
      message: '訂單購物車票券必填'
    }
  }
}, {
  versionKey: false,
  timestamps: true
})

export default model('orders', schema)