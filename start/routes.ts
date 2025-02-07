/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { HttpContext } from "@adonisjs/core/http";
import PostsController from '../app/controllers/posts_controller.js';
import { register } from 'module';
import { middleware } from './kernel.js';

const tweets = [
  {
    id: 1,
    name: 'CNN',
    username: '@CNN',
    tweetAvatar: 'images/tweet-profile-photo.png',
    date: '7m',
    text: 'President Joe Biden touted a new agreement reached with the European Union to ease Trump-era tariffs on aluminum and steel as a "major breakthrough" that would serve to both strengthen the US steel industry and combat the global climate crisis.',
    comments: 57,
    retweets: 144,
    likes: 184,
    shares: 0,
    verified: true
  },
  {
    id: 2,
    name: 'The New York Times',
    username: '@nytimes',
    date: '2h',
    tweetAvatar: 'images/nytimes-avatar.png',
    text: 'Gardening boomed during the pandemic. Six Black writers share how it has helped them re-establish, and reimagine, a connection to cultivation and the land.',
    image: 'images/tweet-image.png',
    comments: 19,
    retweets: 48,
    likes: 484,
    shares: 0,
    verified: true
  },
  {
    id: 3,
    name: 'Tweeter',
    date: 'Oct 29',
    username: '@twitter',
    tweetAvatar: 'images/tweeter-avatar.png',
    text: 'BIG NEWS lol jk still Twitter' ,
    comments: "6.8K",
    retweets: "36.6K",
    likes: "267.1K",
    shares: 0,
    verified: true

  },
  {
    id: 4,
    name: 'Tweeter',
    date: 'Oct 04',
    username: '@twitter',
    tweetAvatar: 'images/tweeter-avatar.png',
    text: 'hello literally everyone' ,
    comments: "116.7K",
    retweets: "785.5K",
    likes: "3.3M",
    shares: 0,
    verified: true

  },
  {
    id: 5,
    name: 'Twitter',
    username: '@twitter',
    date: '04 Oct',
    tweetAvatar: 'images/tweeter-avatar.png',
    text: 'hello literally everyone',
    image: 'images/tweet-image.png',
    comments: 19,
    retweets: 48,
    likes: 484,
    shares: 0,
    verified: true

  },
];


router.get('/', async (ctx: HttpContext) => {
  return ctx.response.redirect().toRoute('homePage')
})


router.get('/home', async ({ view }) => {

  return view.render('pages/home', { tweets })
}).use(middleware.auth())

router.post('/home', async ({ view }) => {

  return view.render('pages/home', { tweets })
}).as('home')

router.get('/homePage', async ({ view }) => {
  return view.render('pages/homePage')
}).as('homePage')

router.get('/login', async ({ view}) => {
  return view.render('pages/login')
}).as('login')

// router.get('/login', [Authcontroller, 'register']).as('auth.login')

router.get('/register', async ({ view}) => {
  return view.render('pages/register')
}).as('register')

router.post('/register', [PostsController, 'handle'])
router.post('/login', [PostsController, 'handlelogin'])

router.delete('logout', [PostsController, 'logout'])

    // router.post('logout', async ({ auth, response }) => { await auth.use('web').logout()
    // return response.redirect('/login')}).use(middleware.auth())