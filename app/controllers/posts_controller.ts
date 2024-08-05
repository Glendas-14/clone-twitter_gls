import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import { createPostValidator, loginUserValidator } from '../validators/user.js'
import { Session } from '@adonisjs/session'
// import User from '../models/user.js'
import hash from '@adonisjs/core/services/hash'
import User from '../models/user.js'

export default class PostsController {

    register({ view }: HttpContext) {
        return view.render('pages/auth/register')
    }

    handle = async (ctx: HttpContext) => {
        const { user_name, file, email, password } = await ctx.request.validateUsing(createPostValidator)
        // const file = ctx.request.file(file)
        await file?.move(app.mailersPath('uploads/userprofil'), {
            name: `${cuid()}.${file.extname}}`
        })
        const user = new User
        user.user_name = user_name
        // user.file = image?.fileName
        user.email = email
        user.password = password
        const result = await user.save()
        ctx.auth.use('web').login(result)

        ctx.response.redirect().toRoute('home')
    }

    login({ view }: HttpContext) {
        return view.render('pages/auth/login')
    }

    handlelogin = async ({ request, response, auth,session }: HttpContext) => {
        const {email, password } = await request.validateUsing(loginUserValidator)
        // const {email, password } = request.only(['email','password'])
        const user = await User.verifyCredentials(email,password)

        await auth.use("web").login(user)  
        session.flash('success', 'login ok') 
      response.redirect('/home')
      return request.all()

    }
  logout = async ({response, auth, session }: HttpContext) => {
    await auth.use("web").logout()
    session.flash('success', 'logout ok') 
    return response.redirect('/login')

  }

    // router
    // .post('logout', async ({ auth, response }) => {
    //     await auth.use('web').logout()
    //     return response.redirect('/login')
    // })
    // .use(middleware.auth())
  
    // handlelogin = async ({ request, response }: HttpContext) => {
    //     const { email, password } = request.only(['email', 'password'])
    
    //     /**
    //      * Find a user by email. Return error if a user does
    //      * not exists
    //      */ 
    //     const user = await User.findBy('email', email)
    //     if (!user) {
    //       response.abort('Invalid credentials')
    //     }
    
    //     /**
    //      * Verify the password using the hash service
    //      */
    //     await hash.verify(password, password)
    
    //     /**
    //      * Now login the user or create a token for them
    //      */
    //     return response.redirect().toRoute('home')
    //   }
    
}
