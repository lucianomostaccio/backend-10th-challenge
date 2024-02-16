// import { getDaoCarts } from '../daos/Carts/Carts.dao.js'
// import { getEmailService } from './email/email.service.js'
import { productsService } from './products.service.js'
// import { NewslettersService } from './newsletters.service.js'
// import { getSmsService } from './sms/sms.service.js'
// import { CartsService } from './Carts.service.js'
import { UsersService } from './users.service.js'
import { getDaoUsers } from '../daos/users/users.dao.js'
import { getDaoProducts } from '../daos/products/products.dao.js'

// const CartsDao = getDaoCarts()
// const emailService = getEmailService()
// export const CartsService = new CartsService({ CartsDao, productsService })

// const suscriptoresDao = getDaoSuscriptores()
// export const newslettersService = new NewslettersService({ suscriptoresDao, emailService })

// const smsService = getSmsService()
const usersDao = getDaoUsers()
const productsDao = getDaoProducts()
// export const usersService = new UsersService({ smsService, usersDao, productsDao })
export const usersService = new UsersService({ usersDao, productsDao })