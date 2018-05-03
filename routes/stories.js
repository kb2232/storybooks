const express = require('express');
const mongoose = require('mongoose');
const Story = mongoose.model('storyCollection');
const { ensureAuthenticated, ensureGuest } = require('../helper/auth');

module.exports = app => {
	//index
	app.get('/api/stories', async (req, res) => {
		var existStory = await Story.find({ status: 'public' })
			.sort({ date: 'desc' })
			.populate('user')
			.sort({date:'desc'});
		res.render('stories/index', {
			istory: existStory,
		});
	});

	//add story
	app.get('/api/story/add', ensureAuthenticated, (req, res) => {
		res.render('stories/add');
	});

	//edit story
	app.get('/api/stories/edit/:id', ensureAuthenticated, async (req, res) => {
		var mystory = await Story.findOne({ _id: req.params.id });
		if(mystory.user != req.user.id)
			res.redirect('/api/stories');
		else
			res.render('stories/edit', { _mystory: mystory });
	});

	// show single story;
	app.get('/api/story/show/:id', async (req, res) => {
		var mystory = await Story.findOne({ _id: req.params.id })
		.populate('user')
		.populate('comments.commentUser');
		if(mystory.status =='public')
			res.render('stories/show', { _mystory: mystory });
		else
		{
			if(req.user)
			{
				if(req.user.id==mystory.user._id)
					res.render('stories/show', { _mystory: mystory });
				else
					res.redirect('/api/stories');
			}
			else 
				res.redirect('/api/stories');
		}
		
	});

	//post story at show.handlebars
	app.post('/api/stories', async (req, res) => {
		//check for allowComments
		let allowComments;
		if (req.body.allowComments) allowComments = true;
		else allowComments = false;

		//check for new story
		var newStory = {
			title: req.body.title,
			body: req.body.body,
			status: req.body.status,
			allowComments: allowComments,
			user: req.user.id,
		};

		//save into database
		var newSavedStory = await new Story(newStory).save();
		res.redirect(`/api/story/show/${newSavedStory.id}`);
	});

	//list stories from a user
	app.get('/api/stories/user/:userId', ensureAuthenticated,(req, res)=> {
		Story.find({user: req.params.userId, status:'public'})
		.populate('user')
		.then(mystories => {
			res.render('stories/index',{
				istory:mystories
			});
		});
	});

	//logged in user stories
	app.get('/api/story/my', (req, res)=> {
		Story.find({user: req.user.id})
		.populate('user')
		.then(mystories => {
			res.render('stories/index',{
				istory:mystories
			});
		});
	});

	//edit form process
	app.put('/api/stories/:id', ensureAuthenticated, (req, res) => {
		Story.findOne({ _id: req.params.id }).then(myStory => {
			//check for allowComments
			if (req.body.allowComments) allowComments = true;
			else allowComments = false;
			//new values
			myStory.title = req.body.title;
			myStory.body = req.body.body;
			myStory.status = req.body.status;
			myStory.allowComments = allowComments;
			myStory.save().then(mystory => {
				res.redirect('/api/dashboard');
			});
		});
	});

	//DELETE
	app.delete('/api/stories/delete/:id', ensureAuthenticated, (req, res) => {
		Story.remove({ _id: req.params.id }).then(() => {
			res.redirect('/api/dashboard');
		});
	});

	// Add Comment
	app.post('/api/stories/comment/:id', ensureAuthenticated,(req, res) => 
	{
		Story.findOne({
			_id: req.params.id,
		}).then(mstory => 
			{
				const newComment = 
				{
					commentBody: req.body.commentBody,
					commentUser: req.user.id
				}

				// Add to comments array
				//unshift adds to begining;
				//push adds to the end
				mstory.comments.unshift(newComment);
				mstory.save().then(mstory => 
				{
					res.redirect(`/api/story/show/${mstory.id}`);
				});
		});
	});
};
