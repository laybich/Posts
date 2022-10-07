const express = require('express')
const api = express.Router()
const statusMessages = require('../db/statusMessages')
const PostsSchema = require('../components/posts/PostsSchema')

function raExpressMongoose(app, model = PostsSchema, options) {
	const {
		q,
		allowedRegexFields = [],
		readOnlyFields,
		inputTransformer = input => input,
		listQuery,
		extraSelects,
		maxRows = 100,
		capabilities,
		aclName,
		// router = Router(),
		ACLMiddleware
	} = options ?? {};

	const {
		list: canList = true,
		get: canGet = true,
		create: canCreate = true,
		update: canUpdate = true,
		delete: canDelete = true
	} = capabilities ?? {};

	/** getList, getMany, getManyReference */
	if (canList) {
		const getList = async (req, res) => {
			let query = PostsSchema.find({
				...listQuery,
			})
			
			if (req.query._sort && req.query._order)
				query = query.sort({
					[typeof req.query._sort === 'string'
						? req.query._sort === 'id'
							? 'id'
							: req.query._sort
						: 'id']: req.query._order === 'ASC' ? 1 : -1
				})
			
			if (req.query._start)
				query = query.skip(
					parseInt(
						typeof req.query._start === 'string' ? req.query._start : '0'
					)
				)

			if (req.query._end)
				query = query.limit(
					Math.min(parseInt(
						typeof req.query._end === 'string' ? req.query._end : '0'
					) - (req.query._start
						? parseInt(
							typeof req.query._start === 'string'
                        ? req.query._start
                        : '0'
						)
						: 0),
						maxRows
					)
				)
			else query = query.limit(maxRows);

			if (extraSelects) query = query.select(extraSelects);

			res.set('Access-Control-Expose-Headers', 'X-Total-Count')
			res.set('X-Total-Count',
				(await model.countDocuments({
					...listQuery,
				})).toString()
			)

			return res.json(
				await query.lean()
			)
		}

		api.route('/api/admin/posts').get(getList)

		api.route('/api/admin/s').get(getList)
	}

	/** getOne, getMany */
	if (canGet) {
		api.route('/api/admin/posts/:id').get(async (req, res) => {
			await model
				.findOne({id: req.params.id})
				.select(extraSelects)
				.lean()
				.then(result => res.json(result))
				.catch(e => statusMessages.error(res, 400, e))
		})
	}

	/** create */
	if (canCreate)
	api.route('/api/admin/posts/').post(async (req, res) => {
		const result = await inputTransformer(req.body, readOnlyFields)
		const newData = {
			id: Date.now(),
			pubDate: (new Date).toLocaleString(),
			creator: 'user',
			...result,
		}

		const newEntry = new PostsSchema(newData);
		await newEntry
			.save()
			.then(result => res.json(result))
			.catch(e => statusMessages.error(res, 400, e))
	})

	/** update */
	if (canUpdate) {
		api.route('/api/admin/posts/:id').put(async (req, res) => {
			const updateData = {
			 	...(await inputTransformer(req.body, readOnlyFields))
			}
	 
			await model
				.findOneAndUpdate({ id: req.params.id }, updateData, {
					new: true,
					runValidators: true
				})
				.lean()
				.then(result => res.json(result))
				.catch(e =>	statusMessages.error(res, 400, e))
			}
		)
	}

	/** delete */
	if (canDelete)
		api.route('/api/admin/posts/:id').delete(async (req, res) => {
			await PostsSchema
				.findOneAndDelete({ id: req.params.id })
				.then(result => res.json(result))
				.catch(e => statusMessages.error(res, 400, e))
			}
   	)

	app.use(api)
}

module.exports = raExpressMongoose;