import Ticket from "../models/ticket.js";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

// 創建票券 API
export const create = async (req, res) => {
	try {
		const result = await Ticket.create(req.body);
		res.status(StatusCodes.OK).json({
			success: true,
			message: "",
			result
		});
	} catch (error) {
		if (error.name === "ValidationError") {
			const key = Object.keys(error.errors)[0];
			const message = error.errors[key].message;
			res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message
			});
		} else {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: "未知錯誤"
			});
		}
	}
};

// 顯示全部
export const getAll = async (req, res) => {
	try {
		const sortBy = req.query.sortBy || "createdAt";
		const sortOrder = req.query.sortOrder || "desc";
		const itemsPerPage = req.query.itemsPerPage * 1 || 10;
		const page = req.query.page * 1 || 1;
		const regex = new RegExp(req.query.search || "", "i");

		const filter = {
			$or: [{ name: regex }, { description: regex }]
		};

		if (req.query.price) {
			filter.price = req.query.price;
		}

		const data = await Ticket.find(filter)
			.sort({ [sortBy]: sortOrder })
			.skip((page - 1) * itemsPerPage)
			.limit(itemsPerPage);

		const total = await Ticket.countDocuments(filter);
		res.status(StatusCodes.OK).json({
			success: true,
			message: "",
			result: {
				data,
				total
			}
		});
	} catch (error) {
		console.log(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: "未知錯誤"
		});
	}
};

// 編輯商品
export const edit = async (req, res) => {
	try {
		if (!validator.isMongoId(req.body.ticket)) throw new Error("ID");

		const idx = req.user.cart_T.findIndex((item) => item.t_id.toString() === req.body.ticket);
		if (idx > -1) {
			const quantity = req.user.cart_T[idx].quantity + parseInt(req.body.quantity);
			if (quantity <= 0) {
				req.user.cart_T.splice(idx, 1);
			} else {
				req.user.cart_T[idx].quantity = quantity;
			}
		} else {
			const ticket = await Ticket.findById(req.body.ticket).orFail(new Error("NOT FOUND"));
			req.user.cart_T.push({
				t_id: ticket._id,
				quantity: req.body.quantity,
				description: req.body.description,
				date: req.body.date,
				seat_row: req.body.seat_row,
				seat_number: req.body.seat_number
			});
		}

		await req.user.save();
		res.status(StatusCodes.OK).json({
			success: true,
			message: "",
			result: req.user.ticketQuantity
		});
	} catch (error) {
		if (error.name === "CastError" || error.message === "ID") {
			res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message: "票券 ID 格式錯誤"
			});
		} else if (error.message === "NOT FOUND") {
			res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: "查無票券"
			});
		} else if (error.message === "SELL") {
			res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message: "票券已下架"
			});
		} else if (error.name === "ValidationError") {
			const key = Object.keys(error.errors)[0];
			const message = error.errors[key].message;
			res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message
			});
		} else {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: "未知錯誤"
			});
		}
	}
};

// 顯示商品
export const get = async (req, res) => {
	try {
		const sortBy = req.query.sortBy || "createdAt";
		const sortOrder = req.query.sortOrder || "desc";
		const itemsPerPage = req.query.itemsPerPage * 1 || 10;
		const page = req.query.page * 1 || 1;
		const regex = new RegExp(req.query.search || "", "i");

		const data = await Ticket.find({
			sell: true,
			$or: [{ name: regex }, { description: regex }]
		})
			// const text = 'a'
			// const obj = { [text]: 1 }
			// obj.a --> 1
			.sort({ [sortBy]: sortOrder })
			// 如果一頁有 10 筆
			// 第一頁 = 1 ~ 10 = 跳過 0 筆 = (第 1 頁 - 1) * 10 = 0
			// 第二頁 = 11 ~ 20 = 跳過 10 筆 = (第 2 頁 - 1) * 10 = 10
			// 第三頁 = 21 ~ 30 = 跳過 20 筆 = (第 3 頁 - 1) * 10 = 20
			.skip((page - 1) * itemsPerPage)
			.limit(itemsPerPage);
		// 計算總數量
		const total = await Ticket.countDocuments({ sell: true });
		res.status(StatusCodes.OK).json({
			success: true,
			message: "",
			result: {
				data,
				total
			}
		});
	} catch (error) {
		console.log(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: "未知錯誤"
		});
	}
};

// 查詢商品
export const getId = async (req, res) => {
	try {
		// 驗證 ID 格式
		if (!validator.isMongoId(req.params.id)) throw new Error("ID");
		// 根據 ID 查找商品
		const result = await Ticket.findById(req.params.id).orFail(new Error("NOT FOUND"));

		res.status(StatusCodes.OK).json({
			success: true,
			message: "",
			result
		});
	} catch (error) {
		if (error.name === "CastError" || error.message === "ID") {
			res.status(StatusCodes.BAD_REQUEST).json({
				success: false,
				message: "商品 ID 格式錯誤"
			});
		} else if (error.message === "NOT FOUND") {
			res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: "查無商品"
			});
		} else {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: "未知錯誤"
			});
		}
	}
};
